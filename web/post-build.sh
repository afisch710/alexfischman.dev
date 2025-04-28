#!/bin/bash

# Path to the Next.js output directory
OUT_DIR="./out"

# Function to process HTML files and create directory structure
process_html_files() {
  # Find all HTML files in the output directory (excluding index.html)
  find "$OUT_DIR" -name "*.html" | grep -v "index.html" | while read -r file; do
    # Get the directory and filename
    dir=$(dirname "$file")
    filename=$(basename "$file")
    
    # Skip if the file is already in a directory with the same name
    if [[ "$dir/$filename" == "$dir/${filename%.html}/index.html" ]]; then
      continue
    fi
    
    # Create a directory with the same name as the file (without .html)
    new_dir="$dir/${filename%.html}"
    mkdir -p "$new_dir"
    
    # Move the HTML file to index.html inside the new directory
    mv "$file" "$new_dir/index.html"
    
    echo "Moved $file to $new_dir/index.html"
  done
}

# Main function
main() {
  echo "Starting post-build processing..."
  
  # Process HTML files
  process_html_files
  
  echo "Post-build processing complete!"
}

# Run the main function
main 