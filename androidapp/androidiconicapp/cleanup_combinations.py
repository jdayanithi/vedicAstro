import json
import os

# Define the base directory
base_dir = r"c:\Users\jdaya\git\vedicAstro\androidapp\androidiconicapp\src\assets\data\kiraga-serkai"

# Fields to remove
fields_to_remove = [
    'offerings', 'prayers', 'specialDays', 'remedial', 'materials', 'practices'
]

print("Cleaning up kiraga serkai JSON files...")

# Update all JSON files
for filename in os.listdir(base_dir):
    if filename.endswith('.json') and filename != 'index.json':
        file_path = os.path.join(base_dir, filename)
        
        # Load existing data
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Remove offerings, prayers, specialDays from templePariharam
        if 'templePariharam' in data:
            if 'offerings' in data['templePariharam']:
                del data['templePariharam']['offerings']
            if 'prayers' in data['templePariharam']:
                del data['templePariharam']['prayers']
            if 'specialDays' in data['templePariharam']:
                del data['templePariharam']['specialDays']
        
        # Remove remedial from effects
        if 'effects' in data and 'remedial' in data['effects']:
            del data['effects']['remedial']
        
        # Remove materials and practices from vazhviayalPariharam
        if 'vazhviayalPariharam' in data:
            if 'materials' in data['vazhviayalPariharam']:
                del data['vazhviayalPariharam']['materials']
            if 'practices' in data['vazhviayalPariharam']:
                del data['vazhviayalPariharam']['practices']
        
        # Save updated data
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"Cleaned: {filename}")

print(f"\nSuccessfully cleaned all kiraga serkai combination files!")
