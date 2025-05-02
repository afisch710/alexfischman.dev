// @ts-nocheck
const fs = require("fs");
const path = require("path");

// Get paths relative to the web directory
const aboutSourcePath = path.join(process.cwd(), "..", "content", "about.json");
const aboutDestPath = path.join(process.cwd(), "src", "data", "about.json");

// Read the source file
const aboutData = JSON.parse(fs.readFileSync(aboutSourcePath, "utf8"));

// Write to destination with pretty formatting
fs.writeFileSync(aboutDestPath, JSON.stringify(aboutData, null, 2)); 