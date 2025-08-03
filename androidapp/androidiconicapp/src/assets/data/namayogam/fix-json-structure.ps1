# Fix all namayogam JSON files to match the interface structure
$files = Get-ChildItem "*.json" | Where-Object { $_.Name -ne "create-namayogam-files.ps1" }

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    
    $content = Get-Content $file.Name -Raw -Encoding UTF8
    
    # Replace 'benefits' with 'keyBenefits'
    $content = $content -replace '"benefits":', '"keyBenefits":'
    
    # Replace activities structure
    $content = $content -replace '"activities":\s*\{\s*"favorable":\s*\[(.*?)\],\s*"unfavorable":\s*\[(.*?)\]\s*\}', '"favorableActivities": [$1], "unfavorableActivities": [$2]'
    
    # Replace 'remedies' with proper pariharam structure
    $content = $content -replace '"remedies":\s*\[(.*?)\]', '"pariharam": { "dailyPractices": [$1], "offerings": ["தாமரை மலர்கள்", "நெய் தீபம்", "பழங்கள்", "இனிப்புகள்"], "gems": { "primary": "மாணிக்கம்", "alternative": "முத்து", "benefits": "நல்ல பலன்களை தரும்" }, "mantras": [{ "name": "முதன்மை மந்திரம்", "text": "ॐ नमः शिवाय", "count": "108 முறை" }] }'
    
    # Add activationProcess if not present
    if ($content -notmatch '"activationProcess"') {
        $content = $content -replace '("duration".*?"frequency".*?)(\})\s*$', '$1, "activationProcess": [{ "title": "தயாரிப்பு", "description": "சுத்தமாக குளித்து தயாராகவும்", "details": "முறையான ஆடைகள் அணியவும்" }, { "title": "ஆவாஹனம்", "description": "தெய்வங்களை ஆவாஹனம் செய்யவும்", "details": "மந்திரங்களை ஜபிக்கவும்" }, { "title": "செயல்படுத்துதல்", "description": "திட்டங்களை நடைமுறைப்படுத்தவும்", "details": "பலன்களை அனுபவிக்கவும்" }]$2'
    }
    
    # Write back to file
    $content | Out-File $file.Name -Encoding UTF8 -NoNewline
}

Write-Host "All files processed successfully!"
