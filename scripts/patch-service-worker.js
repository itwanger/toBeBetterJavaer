#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const targetPath = process.argv[2];

if (!targetPath) {
  console.error("Usage: patch-service-worker.js <service-worker-path>");
  process.exit(1);
}

const resolvedPath = path.resolve(targetPath);

if (!fs.existsSync(resolvedPath)) {
  console.error(`Service worker not found: ${resolvedPath}`);
  process.exit(1);
}

const source = fs.readFileSync(resolvedPath, "utf8");
const marker = "self.__JAVABETTER_PWA_REFRESH_FIX__=true,";

if (source.includes(marker)) {
  process.exit(0);
}

const needle = '"use strict";';
const injection =
  '"use strict";' +
  "self.__JAVABETTER_PWA_REFRESH_FIX__=true," +
  'self.addEventListener("install",(event=>{event.waitUntil(self.skipWaiting())})),' +
  'self.addEventListener("activate",(event=>{event.waitUntil((async()=>{const clients=await self.clients.matchAll({type:"window",includeUncontrolled:true});for(const client of clients)try{await client.navigate(client.url)}catch{}})())})),'; 

if (!source.includes(needle)) {
  console.error(`Could not find injection point in: ${resolvedPath}`);
  process.exit(1);
}

const patched = source.replace(needle, injection);
fs.writeFileSync(resolvedPath, patched);
