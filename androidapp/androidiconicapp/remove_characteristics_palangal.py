#!/usr/bin/env python3
"""
Script to remove 'characteristics' and 'palangal' fields from all kiraga-serkai JSON files.
These correspond to "சிறப்பு குணாதிசயங்கள்" (special characteristics) and 
"கிரக ஒருங்கிணைப்பு பலன்கள்" (planetary combination benefits).
"""

import json
import os
import glob

def remove_fields_from_combination(file_path):
    """Remove characteristics and palangal fields from a single JSON file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Track if any changes were made
        changed = False
        
        # Remove characteristics field if it exists
        if 'characteristics' in data:
            del data['characteristics']
            changed = True
            print(f"Removed 'characteristics' from {file_path}")
        
        # Remove palangal field if it exists
        if 'palangal' in data:
            del data['palangal']
            changed = True
            print(f"Removed 'palangal' from {file_path}")
        
        # Write back to file if changes were made
        if changed:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"Updated {file_path}")
        else:
            print(f"No changes needed for {file_path}")
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def main():
    # Get all JSON files in the kiraga-serkai directory except index.json
    json_dir = "src/assets/data/kiraga-serkai"
    
    if not os.path.exists(json_dir):
        print(f"Directory {json_dir} does not exist!")
        return
    
    json_files = glob.glob(os.path.join(json_dir, "*.json"))
    
    # Filter out index.json
    combination_files = [f for f in json_files if not f.endswith("index.json")]
    
    if not combination_files:
        print("No combination JSON files found!")
        return
    
    print(f"Found {len(combination_files)} combination files to process...")
    
    for file_path in combination_files:
        remove_fields_from_combination(file_path)
    
    print(f"\nProcessed {len(combination_files)} files.")
    print("Removed 'characteristics' and 'palangal' fields from all combinations.")

if __name__ == "__main__":
    main()
