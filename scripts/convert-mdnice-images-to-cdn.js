#!/usr/bin/env node

const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DEFAULT_TARGET = path.join(ROOT_DIR, "docs", "src");
const DEFAULT_DOMAINS = ["files.mdnice.com"];
const DEFAULT_PREFIX = "tobebetterjavaer/images/mdnice";
const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".avif",
]);
const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  ".vuepress/.cache",
  ".vuepress/.temp",
]);

function printHelp() {
  console.log(`Usage:
  npm run images:cdn -- [options] [file-or-dir ...]

Options:
  --write                 Download, upload to OSS, and rewrite Markdown files.
  --env <path>            Env file path. Default: .env
  --domains <domains>     Comma-separated source domains. Default: files.mdnice.com
  --prefix <prefix>       OSS object key prefix. Default: ${DEFAULT_PREFIX}
  --concurrency <n>       Upload concurrency. Default: 4
  --limit <n>             Process at most n unique image URLs.
  --verbose               Print matched URLs and rewritten files.
  --help                  Show this help.

Without --write this command only scans and prints a dry-run summary.`);
}

function parseArgs(argv) {
  const options = {
    write: false,
    envFile: path.join(ROOT_DIR, ".env"),
    domains: null,
    prefix: null,
    concurrency: 4,
    limit: null,
    verbose: false,
    targets: [],
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--write") {
      options.write = true;
    } else if (arg === "--verbose") {
      options.verbose = true;
    } else if (arg === "--env") {
      options.envFile = path.resolve(ROOT_DIR, requireValue(argv, i));
      i += 1;
    } else if (arg.startsWith("--env=")) {
      options.envFile = path.resolve(ROOT_DIR, arg.slice("--env=".length));
    } else if (arg === "--domains") {
      options.domains = parseList(requireValue(argv, i));
      i += 1;
    } else if (arg.startsWith("--domains=")) {
      options.domains = parseList(arg.slice("--domains=".length));
    } else if (arg === "--prefix") {
      options.prefix = requireValue(argv, i);
      i += 1;
    } else if (arg.startsWith("--prefix=")) {
      options.prefix = arg.slice("--prefix=".length);
    } else if (arg === "--concurrency") {
      options.concurrency = parsePositiveInt(requireValue(argv, i), "--concurrency");
      i += 1;
    } else if (arg.startsWith("--concurrency=")) {
      options.concurrency = parsePositiveInt(arg.slice("--concurrency=".length), "--concurrency");
    } else if (arg === "--limit") {
      options.limit = parsePositiveInt(requireValue(argv, i), "--limit");
      i += 1;
    } else if (arg.startsWith("--limit=")) {
      options.limit = parsePositiveInt(arg.slice("--limit=".length), "--limit");
    } else if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      options.targets.push(path.resolve(ROOT_DIR, arg));
    }
  }

  if (options.targets.length === 0) {
    options.targets.push(DEFAULT_TARGET);
  }

  return options;
}

function requireValue(argv, index) {
  const value = argv[index + 1];
  if (!value || value.startsWith("-")) {
    throw new Error(`Missing value for ${argv[index]}`);
  }
  return value;
}

function parseList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parsePositiveInt(value, optionName) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${optionName} must be a positive integer`);
  }
  return parsed;
}

function loadEnv(envFile) {
  if (!fs.existsSync(envFile)) {
    return {};
  }

  const env = {};
  const content = fs.readFileSync(envFile, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) {
      continue;
    }
    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function validateOssConfig(config) {
  const required = [
    "PAICODING_OSS_AK",
    "PAICODING_OSS_SK",
    "PAICODING_OSS_ENDPOINT",
    "PAICODING_OSS_BUCKET",
    "PAICODING_OSS_HOST",
  ];
  const missing = required.filter((key) => !config[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
}

function collectMarkdownFiles(targets) {
  const files = [];
  for (const target of targets) {
    if (!fs.existsSync(target)) {
      throw new Error(`Path not found: ${target}`);
    }
    const stat = fs.statSync(target);
    if (stat.isDirectory()) {
      walkDir(target, files);
    } else if (target.endsWith(".md")) {
      files.push(target);
    }
  }
  return [...new Set(files)].sort();
}

function walkDir(dir, files) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(ROOT_DIR, fullPath);
    if (entry.isDirectory()) {
      if (!shouldSkipDir(relativePath)) {
        walkDir(fullPath, files);
      }
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
}

function shouldSkipDir(relativePath) {
  const normalized = relativePath.split(path.sep).join("/");
  if (SKIP_DIRS.has(normalized)) {
    return true;
  }
  return normalized.split("/").some((part) => SKIP_DIRS.has(part));
}

function scanFiles(files, domains) {
  const urlToFiles = new Map();
  const fileContents = new Map();
  let referenceCount = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    fileContents.set(file, content);

    const matches = findImageUrls(content, domains);
    if (matches.length === 0) {
      continue;
    }

    for (const url of matches) {
      referenceCount += 1;
      if (!urlToFiles.has(url)) {
        urlToFiles.set(url, new Set());
      }
      urlToFiles.get(url).add(file);
    }
  }

  return {
    fileContents,
    referenceCount,
    urls: [...urlToFiles.keys()].sort(),
    urlToFiles,
  };
}

function findImageUrls(content, domains) {
  const urls = new Set();
  const urlPattern = /https?:\/\/[^\s<>"')]+/g;
  let match;
  while ((match = urlPattern.exec(content)) !== null) {
    const url = trimTrailingPunctuation(match[0]);
    if (shouldProcessUrl(url, domains)) {
      urls.add(url);
    }
  }
  return [...urls];
}

function trimTrailingPunctuation(url) {
  return url.replace(/[.,;:!?]+$/g, "");
}

function shouldProcessUrl(url, domains) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }

  if (!domains.some((domain) => hostMatches(parsed.hostname, domain))) {
    return false;
  }

  return IMAGE_EXTENSIONS.has(path.extname(parsed.pathname).toLowerCase());
}

function hostMatches(hostname, domain) {
  return hostname === domain || hostname.endsWith(`.${domain}`);
}

function plannedCdnUrl(url, ossHost, prefix) {
  return joinUrl(ossHost || "https://cdn.example.com", objectKeyForUrl(url, prefix));
}

function objectKeyForUrl(url, prefix) {
  const parsed = new URL(url);
  const basename = sanitizeFileName(path.basename(parsed.pathname));
  const extension = path.extname(basename).toLowerCase();
  const hash = crypto.createHash("sha1").update(url).digest("hex").slice(0, 12);
  const fileName = basename && basename.length <= 120 ? `${hash}-${basename}` : `${hash}${extension || ".img"}`;
  return `${trimSlashes(prefix)}/${fileName}`;
}

function sanitizeFileName(fileName) {
  const decoded = safeDecodeURIComponent(fileName);
  return decoded.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}

function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function trimSlashes(value) {
  return String(value || "").replace(/^\/+|\/+$/g, "");
}

function joinUrl(baseUrl, key) {
  return `${String(baseUrl).replace(/\/+$/g, "")}/${trimSlashes(key)}`;
}

async function uploadAll(urls, options, config, prefix) {
  const results = new Map();
  const failures = [];
  let completed = 0;

  await runPool(urls, options.concurrency, async (url) => {
    const objectKey = objectKeyForUrl(url, prefix);
    const cdnUrl = joinUrl(config.PAICODING_OSS_HOST, objectKey);
    try {
      const image = await downloadImage(url);
      await putOssObject({
        endpoint: config.PAICODING_OSS_ENDPOINT,
        bucket: config.PAICODING_OSS_BUCKET,
        accessKeyId: config.PAICODING_OSS_AK,
        accessKeySecret: config.PAICODING_OSS_SK,
        objectKey,
        body: image.body,
        contentType: image.contentType || contentTypeForPath(objectKey),
      });
      results.set(url, cdnUrl);
      completed += 1;
      console.log(`Uploaded ${completed}/${urls.length}: ${cdnUrl}`);
    } catch (error) {
      failures.push({ url, error });
      completed += 1;
      console.error(`Failed ${completed}/${urls.length}: ${url}`);
      console.error(`  ${error.message}`);
    }
  });

  return { results, failures };
}

async function runPool(items, concurrency, worker) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index], index);
    }
  });
  await Promise.all(workers);
}

async function downloadImage(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "toBeBetterJavaer-image-cdn/1.0",
    },
  });
  if (!response.ok) {
    throw new Error(`Download failed with HTTP ${response.status}`);
  }
  const contentType = normalizeContentType(response.headers.get("content-type"));
  if (contentType && !contentType.startsWith("image/") && contentType !== "application/octet-stream") {
    throw new Error(`Unexpected content type: ${contentType}`);
  }
  const body = Buffer.from(await response.arrayBuffer());
  if (body.length === 0) {
    throw new Error("Downloaded file is empty");
  }
  return { body, contentType };
}

function normalizeContentType(contentType) {
  if (!contentType) {
    return "";
  }
  return contentType.split(";")[0].trim().toLowerCase();
}

function contentTypeForPath(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  switch (extension) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    case ".svg":
      return "image/svg+xml";
    case ".avif":
      return "image/avif";
    default:
      return "application/octet-stream";
  }
}

function putOssObject(options) {
  const endpoint = normalizeEndpoint(options.endpoint);
  const objectPath = `/${encodeObjectKey(options.objectKey)}`;
  const hostname = `${options.bucket}.${endpoint.hostname}`;
  const date = new Date().toUTCString();
  const contentType = options.contentType || "application/octet-stream";
  const headers = {
    Date: date,
    "Content-Type": contentType,
    "Content-Length": options.body.length,
    Authorization: ossAuthorization({
      method: "PUT",
      bucket: options.bucket,
      objectKey: options.objectKey,
      accessKeyId: options.accessKeyId,
      accessKeySecret: options.accessKeySecret,
      date,
      contentType,
    }),
  };

  const requestOptions = {
    method: "PUT",
    protocol: endpoint.protocol,
    hostname,
    path: objectPath,
    headers,
  };

  const transport = endpoint.protocol === "http:" ? http : https;

  return new Promise((resolve, reject) => {
    const request = transport.request(requestOptions, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve();
          return;
        }
        const body = Buffer.concat(chunks).toString("utf8").trim();
        reject(new Error(`OSS upload failed with HTTP ${response.statusCode}${body ? `: ${body}` : ""}`));
      });
    });
    request.on("error", reject);
    request.write(options.body);
    request.end();
  });
}

function normalizeEndpoint(endpoint) {
  const value = endpoint.startsWith("http://") || endpoint.startsWith("https://")
    ? endpoint
    : `https://${endpoint}`;
  const parsed = new URL(value);
  return {
    protocol: parsed.protocol,
    hostname: parsed.hostname,
  };
}

function ossAuthorization(options) {
  const canonicalizedResource = `/${options.bucket}/${options.objectKey}`;
  const stringToSign = [
    options.method,
    "",
    options.contentType,
    options.date,
    canonicalizedResource,
  ].join("\n");
  const signature = crypto
    .createHmac("sha1", options.accessKeySecret)
    .update(stringToSign)
    .digest("base64");
  return `OSS ${options.accessKeyId}:${signature}`;
}

function encodeObjectKey(objectKey) {
  return objectKey
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function rewriteFiles(fileContents, replacements, verbose) {
  const changedFiles = [];
  for (const [file, content] of fileContents.entries()) {
    let nextContent = content;
    for (const [sourceUrl, cdnUrl] of replacements.entries()) {
      nextContent = nextContent.split(sourceUrl).join(cdnUrl);
    }
    if (nextContent !== content) {
      fs.writeFileSync(file, nextContent, "utf8");
      changedFiles.push(file);
      if (verbose) {
        console.log(`Rewritten: ${path.relative(ROOT_DIR, file)}`);
      }
    }
  }
  return changedFiles;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const env = loadEnv(options.envFile);
  const domains = options.domains || parseList(env.IMAGE_CDN_SOURCE_DOMAINS || "") || DEFAULT_DOMAINS;
  const normalizedDomains = domains.length > 0 ? domains : DEFAULT_DOMAINS;
  const prefix = options.prefix || env.PAICODING_OSS_PREFIX || DEFAULT_PREFIX;
  const files = collectMarkdownFiles(options.targets);
  const scan = scanFiles(files, normalizedDomains);
  const urls = options.limit ? scan.urls.slice(0, options.limit) : scan.urls;
  const ossHost = env.PAICODING_OSS_HOST || "";

  console.log(`Scanned files: ${files.length}`);
  console.log(`Matched references: ${scan.referenceCount}`);
  console.log(`Unique source image URLs: ${scan.urls.length}`);
  console.log(`Source domains: ${normalizedDomains.join(", ")}`);
  console.log(`OSS key prefix: ${prefix}`);
  if (options.limit) {
    console.log(`Limit: ${options.limit}`);
  }

  if (urls.length === 0) {
    return;
  }

  if (options.verbose || !options.write) {
    for (const url of urls) {
      console.log(`${url} -> ${plannedCdnUrl(url, ossHost, prefix)}`);
    }
  }

  if (!options.write) {
    console.log("Dry run only. Add --write to upload and rewrite Markdown files.");
    return;
  }

  validateOssConfig(env);
  const upload = await uploadAll(urls, options, env, prefix);
  const changedFiles = rewriteFiles(scan.fileContents, upload.results, options.verbose);

  console.log(`Uploaded images: ${upload.results.size}`);
  console.log(`Failed images: ${upload.failures.length}`);
  console.log(`Rewritten files: ${changedFiles.length}`);

  if (upload.failures.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
