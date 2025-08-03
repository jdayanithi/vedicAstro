# Final cleanup script for remaining English phrases in details sections

$detailsTranslations = @{
    '"Practice energizing activities"' = '"ஆற்றல் பெருக்கும் செயல்களை பயிலுங்கள்"'
    '"Engage in artistic and creative activities"' = '"கலை மற்றும் படைப்பு செயல்களில் ஈடுபடுங்கள்"'
    '"Take protective measures"' = '"பாதுகாப்பு நடவடிக்கைகள் எடுங்கள்"'
    '"Focus on spiritual growth"' = '"ஆன்மீக வளர்ச்சியில் கவனம் செலுத்துங்கள்"'
    '"Practice patience and persistence"' = '"பொறுமை மற்றும் விடாமுயற்சியை பயிலுங்கள்"'
    '"Maintain stability in actions"' = '"செயல்களில் நிலைத்தன்மையை பராமரியுங்கள்"'
    '"Be careful and cautious"' = '"கவனமாகவும் எச்சரிக்கையாகவும் இருங்கள்"'
    '"Express joy and happiness"' = '"மகிழ்ச்சி மற்றும் சந்தோஷத்தை வெளிப்படுத்துங்கள்"'
    '"Work on removing obstacles"' = '"தடைகளை நீக்கும் வேலையில் ஈடுபடுங்கள்"'
    '"Focus on achievement and success"' = '"சாதனை மற்றும் வெற்றியில் கவனம் செலுத்துங்கள்"'
    '"Practice love and compassion"' = '"அன்பு மற்றும் கருணையை பயிலுங்கள்"'
    '"Enhance beauty and creativity"' = '"அழகு மற்றும் படைப்பாற்றலை மேம்படுத்துங்கள்"'
    '"Build wealth and prosperity"' = '"செல்வம் மற்றும் செழிப்பை கட்டியெழுப்புங்கள்"'
    '"Focus on health and vitality"' = '"ஆரோக்கியம் மற்றும் உயிர்ச்சக்தியில் கவனம் செலுத்துங்கள்"'
    '"Develop spiritual powers"' = '"ஆன்மீக சக்திகளை வளர்த்துக் கொள்ளுங்கள்"'
    '"Practice purification"' = '"தூய்மையை பயிலுங்கள்"'
    '"Make wise choices"' = '"புத்திசாலித்தனமான தேர்வுகள் செய்யுங்கள்"'
    '"Focus on growth and expansion"' = '"வளர்ச்சி மற்றும் விரிவாக்கத்தில் கவனம் செலுத்துங்கள்"'
}

$files = Get-ChildItem -Filter "*.json"

foreach ($file in $files) {
    Write-Host "Final cleanup for $($file.Name)..."
    
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    foreach ($english in $detailsTranslations.Keys) {
        $tamil = $detailsTranslations[$english]
        if ($content -match [regex]::Escape($english)) {
            $content = $content -replace [regex]::Escape($english), $tamil
            Write-Host "  Final detail: $english -> $tamil"
        }
    }
    
    $content | Out-File $file.FullName -Encoding UTF8 -NoNewline
}

Write-Host "Final cleanup completed!"
