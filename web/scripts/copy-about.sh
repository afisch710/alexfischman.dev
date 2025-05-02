#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to the web directory (one level up from scripts)
cd "$SCRIPT_DIR/.."

# Run the TypeScript file
npx ts-node scripts/copy-about.ts 