#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DEFAULT_SIDEBAR = path.join(ROOT_DIR, "docs", "src", ".vuepress", "sidebar.ts");

const DEFAULT_TARGETS = [
  {
    route: "/sidebar/itwanger/ai/",
    dir: "docs/src/sidebar/itwanger/ai",
    fallbackGroup: "其他",
  },
];

function printHelp() {
  console.log(`Usage:
  npm run sidebar:check
  npm run sidebar:sync
  node scripts/sync-sidebar.js [options]

Options:
  --write                 Rewrite sidebar.ts. Default is dry-run only.
  --check                 Exit with code 1 if sidebar.ts is out of sync.
  --sidebar <path>        Sidebar file. Default: docs/src/.vuepress/sidebar.ts
  --route <route>         Route to sync, for example /sidebar/itwanger/ai/
  --dir <path>            Markdown directory for --route.
  --fallback <text>       Group text for new files. Default: 其他
  --verbose               Print unchanged targets too.
  --help                  Show this help.

Without --route/--dir, the script syncs the built-in targets:
${DEFAULT_TARGETS.map((target) => `  - ${target.route} <= ${target.dir}`).join("\n")}
`);
}

function parseArgs(argv) {
  const options = {
    write: false,
    check: false,
    sidebar: DEFAULT_SIDEBAR,
    route: null,
    dir: null,
    fallbackGroup: "其他",
    verbose: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--write") {
      options.write = true;
    } else if (arg === "--check") {
      options.check = true;
    } else if (arg === "--verbose") {
      options.verbose = true;
    } else if (arg === "--sidebar") {
      options.sidebar = path.resolve(ROOT_DIR, requireValue(argv, index));
      index += 1;
    } else if (arg.startsWith("--sidebar=")) {
      options.sidebar = path.resolve(ROOT_DIR, arg.slice("--sidebar=".length));
    } else if (arg === "--route") {
      options.route = normalizeRoute(requireValue(argv, index));
      index += 1;
    } else if (arg.startsWith("--route=")) {
      options.route = normalizeRoute(arg.slice("--route=".length));
    } else if (arg === "--dir") {
      options.dir = requireValue(argv, index);
      index += 1;
    } else if (arg.startsWith("--dir=")) {
      options.dir = arg.slice("--dir=".length);
    } else if (arg === "--fallback") {
      options.fallbackGroup = requireValue(argv, index);
      index += 1;
    } else if (arg.startsWith("--fallback=")) {
      options.fallbackGroup = arg.slice("--fallback=".length);
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  if ((options.route && !options.dir) || (!options.route && options.dir)) {
    throw new Error("--route and --dir must be used together");
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

function normalizeRoute(route) {
  if (!route.startsWith("/")) {
    route = `/${route}`;
  }
  if (!route.endsWith("/")) {
    route = `${route}/`;
  }
  return route;
}

function createTargets(options) {
  if (options.route) {
    return [
      {
        route: options.route,
        dir: options.dir,
        fallbackGroup: options.fallbackGroup,
      },
    ];
  }
  return DEFAULT_TARGETS;
}

function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    if (options.help) {
      printHelp();
      return;
    }

    if (!fs.existsSync(options.sidebar)) {
      throw new Error(`Sidebar file not found: ${options.sidebar}`);
    }

    let source = fs.readFileSync(options.sidebar, "utf8");
    const originalSource = source;
    const reports = [];

    for (const target of createTargets(options)) {
      const result = syncTarget(source, target);
      source = result.source;
      reports.push(result.report);
    }

    const changed = source !== originalSource;
    for (const report of reports) {
      if (options.verbose || report.added.length > 0 || report.removed.length > 0 || report.warnings.length > 0) {
        printReport(report);
      }
    }

    if (options.write && changed) {
      fs.writeFileSync(options.sidebar, source);
      console.log(`Updated ${path.relative(ROOT_DIR, options.sidebar)}`);
    } else if (!changed) {
      console.log("Sidebar is already in sync.");
    } else {
      console.log("Dry run only. Re-run with --write to update sidebar.ts.");
    }

    if (options.check && changed) {
      process.exitCode = 1;
    }
  } catch (error) {
    console.error(`sync-sidebar: ${error.message}`);
    process.exitCode = 1;
  }
}

function syncTarget(source, target) {
  const dir = path.resolve(ROOT_DIR, target.dir);
  const report = {
    route: target.route,
    dir: path.relative(ROOT_DIR, dir),
    added: [],
    removed: [],
    warnings: [],
  };

  if (!fs.existsSync(dir)) {
    throw new Error(`Markdown directory not found: ${target.dir}`);
  }

  const files = collectMarkdownSlugs(dir);
  const blockRange = findRouteArray(source, target.route);
  if (!blockRange) {
    throw new Error(`Route not found in sidebar.ts: ${target.route}`);
  }

  let block = source.slice(blockRange.start, blockRange.end + 1);
  const refs = collectRefs(block);
  const listedSlugs = new Set(refs.map((ref) => ref.slug));
  const fileSlugs = new Set(files.map((file) => file.slug));

  const staleSlugs = [...listedSlugs].filter((slug) => !fileSlugs.has(slug));
  if (staleSlugs.length > 0) {
    const removal = removeStaleStringEntries(block, staleSlugs);
    block = removal.block;
    report.removed = removal.removed;

    for (const slug of staleSlugs) {
      if (!removal.removed.includes(slug)) {
        report.warnings.push(`Stale ref "${slug}" is not a plain string entry; remove it manually if needed.`);
      }
    }
  }

  const refsAfterRemoval = collectRefs(block);
  const listedAfterRemoval = new Set(refsAfterRemoval.map((ref) => ref.slug));
  const missingFiles = files.filter((file) => !listedAfterRemoval.has(file.slug));

  if (missingFiles.length > 0) {
    const insertion = appendMissingEntries(block, missingFiles, target.fallbackGroup);
    block = insertion.block;
    report.added = insertion.added;
    report.warnings.push(...insertion.warnings);
  }

  const nextSource = source.slice(0, blockRange.start) + block + source.slice(blockRange.end + 1);
  return { source: nextSource, report };
}

function collectMarkdownSlugs(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => {
      const basename = entry.name.slice(0, -".md".length);
      return {
        slug: basename,
        entry: basename === "readme" ? "readme.md" : basename,
      };
    })
    .filter((file) => file.slug.length > 0)
    .sort((a, b) => a.slug.localeCompare(b.slug, "en"));
}

function collectRefs(block) {
  const refs = [];
  const lines = block.split(/\r?\n/);

  for (const line of lines) {
    const simpleEntry = line.match(/^\s*["']([^"']+)["'],?\s*(?:\/\/.*)?$/);
    if (simpleEntry) {
      const slug = normalizeRef(simpleEntry[1]);
      if (slug) {
        refs.push({ slug, value: simpleEntry[1], kind: "entry" });
      }
      continue;
    }

    const linkEntry = line.match(/\blink\s*:\s*["']([^"']+)["']/);
    if (linkEntry) {
      const slug = normalizeRef(linkEntry[1]);
      if (slug) {
        refs.push({ slug, value: linkEntry[1], kind: "link" });
      }
    }
  }

  return refs;
}

function normalizeRef(value) {
  if (
    !value ||
    value.startsWith("/") ||
    value.startsWith("#") ||
    /^[a-z]+:\/\//i.test(value) ||
    value.endsWith("/") ||
    value.includes("/")
  ) {
    return null;
  }

  return value.endsWith(".md") ? value.slice(0, -".md".length) : value;
}

function removeStaleStringEntries(block, staleSlugs) {
  const stale = new Set(staleSlugs);
  const removed = [];
  const lines = block.split(/\r?\n/);
  const nextLines = [];

  for (const line of lines) {
    const simpleEntry = line.match(/^\s*["']([^"']+)["'],?\s*(?:\/\/.*)?$/);
    const slug = simpleEntry ? normalizeRef(simpleEntry[1]) : null;
    if (slug && stale.has(slug)) {
      removed.push(slug);
      continue;
    }
    nextLines.push(line);
  }

  return {
    block: nextLines.join("\n"),
    removed,
  };
}

function appendMissingEntries(block, missingFiles, fallbackGroup) {
  const warnings = [];
  const entries = missingFiles.map((file) => file.entry);
  const fallback = fallbackGroup ? findFallbackChildren(block, fallbackGroup) : null;

  if (fallback) {
    const childrenBlock = block.slice(fallback.start, fallback.end + 1);
    const indent = detectChildIndent(childrenBlock, "        ");
    const insertion = entries.map((entry) => `${indent}"${entry}",`).join("\n");
    const insertAt = findLineStart(block, fallback.end);
    const prefix = block.slice(0, insertAt);
    const suffix = block.slice(insertAt);
    const separator = prefix.endsWith("\n") ? "" : "\n";
    return {
      block: `${prefix}${separator}${insertion}\n${suffix}`,
      added: entries,
      warnings,
    };
  }

  warnings.push(`Fallback group "${fallbackGroup}" not found; appended new refs at route root.`);
  const indent = detectChildIndent(block, "    ");
  const insertAt = findLineStart(block, block.length - 1);
  const insertion = entries.map((entry) => `${indent}"${entry}",`).join("\n");
  const prefix = block.slice(0, insertAt);
  const suffix = block.slice(insertAt);
  const separator = prefix.endsWith("\n") ? "" : "\n";

  return {
    block: `${prefix}${separator}${insertion}\n${suffix}`,
    added: entries,
    warnings,
  };
}

function detectChildIndent(block, fallback) {
  const lines = block.split(/\r?\n/).reverse();
  for (const line of lines) {
    const match = line.match(/^(\s*)["'][^"']+["'],?\s*$/);
    if (match) {
      return match[1];
    }
  }
  return fallback;
}

function findFallbackChildren(block, fallbackGroup) {
  const textPattern = new RegExp(`\\btext\\s*:\\s*["']${escapeRegExp(fallbackGroup)}["']`, "g");
  let textMatch;

  while ((textMatch = textPattern.exec(block)) !== null) {
    const childrenPattern = /\bchildren\s*:\s*\[/g;
    childrenPattern.lastIndex = textMatch.index + textMatch[0].length;
    const childrenMatch = childrenPattern.exec(block);
    if (!childrenMatch) {
      continue;
    }

    const arrayStart = childrenMatch.index + childrenMatch[0].lastIndexOf("[");
    const arrayEnd = findMatchingBracket(block, arrayStart);
    if (arrayEnd !== -1) {
      return { start: arrayStart, end: arrayEnd };
    }
  }

  return null;
}

function findLineStart(source, index) {
  const lineBreak = source.lastIndexOf("\n", index);
  return lineBreak === -1 ? 0 : lineBreak + 1;
}

function findRouteArray(source, route) {
  const routePattern = new RegExp(`(["'])${escapeRegExp(route)}\\1\\s*:\\s*\\[`);
  const match = routePattern.exec(source);
  if (!match) {
    return null;
  }

  const arrayStart = match.index + match[0].lastIndexOf("[");
  const arrayEnd = findMatchingBracket(source, arrayStart);
  if (arrayEnd === -1) {
    throw new Error(`Could not parse route array: ${route}`);
  }
  return { start: arrayStart, end: arrayEnd };
}

function findMatchingBracket(source, openIndex) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (lineComment) {
      if (char === "\n") {
        lineComment = false;
      }
      continue;
    }

    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "[") {
      depth += 1;
    } else if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
}

function printReport(report) {
  console.log(`${report.route} <= ${report.dir}`);
  if (report.removed.length > 0) {
    console.log(`  removed: ${report.removed.join(", ")}`);
  }
  if (report.added.length > 0) {
    console.log(`  added: ${report.added.join(", ")}`);
  }
  for (const warning of report.warnings) {
    console.log(`  warning: ${warning}`);
  }
  if (report.removed.length === 0 && report.added.length === 0 && report.warnings.length === 0) {
    console.log("  no changes");
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

main();
