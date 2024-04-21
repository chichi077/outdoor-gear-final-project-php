#!/bin/bash

# Directory where the zip files are located
dir="./public/3d-models"

echo "Unzipping 3D models in $dir"

# Loop over each subdirectory in the 3d-models directory
for category in "$dir"/*; do
  # Check if it's a directory
  if [ -d "$category" ]; then

    echo "Processing category: $(basename -- "$category")"

    # Loop over each zip file in the category directory
    for zipfile in "$category"/*.zip; do
      # Get the base name of the zip file (without extension)
      base=$(basename -- "$zipfile")
      base="${base%.*}"

      # if the base starts with * then skip
      if [[ $base == "*" ]]; then
        continue
      fi

      echo "Processing file: $base"

      # If the directory already exists, suffix the name with a number
      if [ -d "$category/$base" ]; then
        i=1
        while [ -d "$category/$base-$i" ]; do
          i=$((i + 1))
        done
        base="$base-$i"
      fi

      # Create a directory with the same name as the zip file
      mkdir -p "$category/$base"

      # Unzip the zip file into the new directory
      unzip -o "$zipfile" -d "$category/$base"

      # Remove the zip file
      rm "$zipfile"
    done
  fi
done