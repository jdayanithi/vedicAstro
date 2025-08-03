import json
import os

# Define the base directory
base_dir = r"c:\Users\jdaya\git\vedicAstro\androidapp\androidiconicapp\src\assets\data\kiraga-serkai"

# Comprehensive astrological data for each combination
astrological_data = {
    'surya-chandra': {
        'description': 'சூரியன் மற்றும் சந்திரன் சேர்க்கை ஒருவரின் ஆன்மா மற்றும் மனதின் ஒற்றுமையை குறிக்கிறது.',
        'characteristics': [
            'வலுவான தலைமைத்துவ குணங்கள்',
            'உணர்ச்சி வசப்படாமல் சிந்திக்கும் திறன்',
            'பிதா மாதா ஆசீர்வாதம்',
            'ராஜ யோக பலன்கள்'
        ],
        'palangal': [
            'அரசு பதவி வாய்ப்பு',
            'குடும்ப மரியாதை அதிகரிப்பு',
            'மன அமைதி',
            'செல்வாக்கு பெருக்கம்'
        ],
        'effects': {
            'positive': ['உயர் பதவி பெறுதல்', 'குடும்ب ஒற்றுமை', 'மன பலம்', 'ஆரோக்கியம்'],
            'negative': ['அகம்பாவம்', 'கோபம்', 'மன உளைச்சல்', 'குடும்ப பிரச்னை'],
            'remedial': ['தான தர்மம்', 'சுய கட்டுப்பாடு', 'யோக பயிற்சி', 'தியானம்']
        }
    },
    'surya-mangal': {
        'description': 'சூரியன் மற்றும் செவ்வாய் சேர்க்கை வீரம், தைரியம் மற்றும் ஆற்றலை வழங்குகிறது.',
        'characteristics': [
            'போர்வீரன் குணங்கள்',
            'தலைமைத்துவம்',
            'விரைவான முடிவெடுக்கும் திறன்',
            'உடல் வலிமை'
        ],
        'palangal': [
            'இராணுவ சேவை வாய்ப்பு',
            'விளையாட்டில் சாதனை',
            'தொழில் வெற்றி',
            'எதிரிகள் மீது வெற்றி'
        ],
        'effects': {
            'positive': ['தைரியம்', 'வீரம்', 'தலைமைத்துவம்', 'உடல் வலிமை'],
            'negative': ['கோபம்', 'அவசரப்படுதல்', 'வன்முறை சிந்தனை', 'விபத்து வாய்ப்பு'],
            'remedial': ['பொறுமை பயிற்சி', 'தியானம்', 'மன அமைதி', 'ஆன்மீக வழிபாடு']
        }
    },
    'surya-budhan': {
        'description': 'சூரியன் மற்றும் புதன் சேர்க்கை அறிவு, பேச்சுத்திறன் மற்றும் தொழில் நுணுக்கத்தை வழங்குகிறது.',
        'characteristics': [
            'சிறந்த பேச்சுத்திறன்',
            'கூர்மையான அறிவு',
            'தொழில் நுணுக்கம்',
            'எழுத்து திறன்'
        ],
        'palangal': [
            'கல்வியில் சிறப்பு',
            'தொழில் முன்னேற்றம்',
            'புத்தக வெளியீடு',
            'ஊடக துறையில் வெற்றி'
        ],
        'effects': {
            'positive': ['அறிவுத்திறன் அதிகரிப்பு', 'தொழில் திறமை', 'பேச்சு சக்தி', 'கல்வி ஆர்வம்'],
            'negative': ['அதிக சிந்தனை', 'குழப்பம்', 'அவசரப்படுதல்', 'மன அழுத்தம்'],
            'remedial': ['தியானம்', 'ஆன்மீக படிப்பு', 'யோக பயிற்சி', 'பிராணாயாமம்']
        }
    },
    'surya-guru': {
        'description': 'சூரியன் மற்றும் குரு சேர்க்கை ஞானம், நீதி மற்றும் ஆன்மீக உயர்வை வழங்குகிறது.',
        'characteristics': [
            'ஞான சிந்தனை',
            'நீதி உணர்வு',
            'ஆன்மீக ஆர்வம்',
            'அறக்கட்டளை மனப்பான்மை'
        ],
        'palangal': [
            'அரசாங்க பதவி',
            'ஆன்மீக குருத்துவம்',
            'நீதித்துறை வேலை',
            'சமூக மரியாதை'
        ],
        'effects': {
            'positive': ['ஞான வளர்ச்சி', 'நீதி உணர்வு', 'அறிவுத்திறன்', 'ஆன்மீக முன்னேற்றம்'],
            'negative': ['அகம்பாவம்', 'கர்வம்', 'அதிக எதிர்பார்ப்பு', 'மற்றவர்களை குறை கூறுதல்'],
            'remedial': ['தான தர்மம்', 'பணிவு', 'ஆன்மீக சாதனை', 'கருணை பண்பு']
        }
    },
    'surya-sukran': {
        'description': 'சூரியன் மற்றும் சுக்ரன் சேர்க்கை கலை, அழகு மற்றும் காதல் விஷயங்களில் ஆர்வத்தை வழங்குகிறது.',
        'characteristics': [
            'கலை ஆர்வம்',
            'அழகு உணர்வு',
            'காதல் பிரியர்',
            'செல்வ ஆசை'
        ],
        'palangal': [
            'கலைத்துறையில் வெற்றி',
            'அழகு தொழில்',
            'திருமண சுபம்',
            'பொருளாதார வெற்றி'
        ],
        'effects': {
            'positive': ['கலை திறமை', 'அழகு உணர்வு', 'செல்வம்', 'பிரபல்யம்'],
            'negative': ['செல்வ மோகம்', 'கலையில் அதிக ஈடுபாடு', 'காதல் பிரச்னை', 'ஆடம்பர வாழ்க்கை'],
            'remedial': ['நடுநிலைமை', 'ஆன்மீக வாழ்க்கை', 'தான தர்மம்', 'சுய கட்டுப்பாடு']
        }
    },
    'surya-sani': {
        'description': 'சூரியன் மற்றும் சனி சேர்க்கை கடின உழைப்பு, பொறுமை மற்றும் நீதியை வழங்குகிறது.',
        'characteristics': [
            'கடும் உழைப்பு',
            'பொறுமை',
            'நீதி உணர்வு',
            'தாமதமான வெற்றி'
        ],
        'palangal': [
            'நீண்ட கால வெற்றி',
            'நீதித்துறை பணி',
            'கர்ம சுத்தி',
            'ஆன்மீக முன்னேற்றம்'
        ],
        'effects': {
            'positive': ['கடின உழைப்பு', 'பொறுமை', 'நீதி உணர்வு', 'ஆன்மீக வளர்ச்சி'],
            'negative': ['தாமதம்', 'போராட்டம்', 'மன அழுத்தம்', 'தந்தையுடன் பிரச்னை'],
            'remedial': ['பொறுமை', 'ஆன்மீக சாதனை', 'சமூக சேவை', 'தான தர்மம்']
        }
    },
    'chandra-mangal': {
        'description': 'சந்திரன் மற்றும் செவ்வாய் சேர்க்கை உணர்ச்சி வசப்படுதல் மற்றும் தைரியத்தை வழங்குகிறது.',
        'characteristics': [
            'உணர்ச்சி வசப்படுதல்',
            'மன வலிமை',
            'தைரியம்',
            'தாய் பக்தி'
        ],
        'palangal': [
            'போர் வீரத்தில் புகழ்',
            'உணவு தொழில்',
            'நீர் சம்பந்தப்பட்ட வேலை',
            'பெண்கள் ஆதரவு'
        ],
        'effects': {
            'positive': ['மன வலிமை', 'உணர்ச்சி கட்டுப்பாடு', 'தைரியம்', 'பெண்கள் ஆதரவு'],
            'negative': ['கோபம்', 'மன உளைச்சல்', 'அவசரப்படுதல்', 'உணர்ச்சி வசப்படுதல்'],
            'remedial': ['தியானம்', 'யோக பயிற்சி', 'மன அமைதி', 'ஆன்மீக வழிபாடு']
        }
    }
}

# Function to create complete data for any combination
def get_complete_data(combo_id, description, characteristics, palangal, effects):
    planets = combo_id.split('-')
    planet_map = {
        'surya': 'சூரியன்', 'chandra': 'சந்திரன்', 'mangal': 'செவ்வாய்',
        'budhan': 'புதன்', 'guru': 'குரு', 'sukran': 'சுக்ரன்', 
        'sani': 'சனி', 'rahu': 'ராகு', 'ketu': 'கேது'
    }
    
    # Get planet specific remedial data
    remedial_data = {
        'surya': {
            'practices': ['சூரிய நமஸ்காரம்', 'ஆதித்ய ஹ்ருதயம்', 'பித்ரு சேவை', 'தான தர்மம்'],
            'materials': ['செம்பு பாத்திரம்', 'சிவப்பு உடை', 'மாணிக்க ரத்தினம்', 'குங்குமம்'],
            'timings': ['சூரிய உதய வேளை', 'ஞாயிறு காலை', 'சூரிய ஹோரை', 'சங்கிராந்தி']
        },
        'chandra': {
            'practices': ['சந்திர வழிபாடு', 'பூர்ணிமை விரதம்', 'தாய் சேவை', 'பால் தானம்'],
            'materials': ['வெள்ளி பாத்திரம்', 'வெள்ளை உடை', 'முத்து ரத்தினம்', 'சந்தனம்'],
            'timings': ['பூர்ணிமை மாலை', 'திங்கள் இரவு', 'சந்திர ஹோரை', 'சந்திர தரிசனம்']
        },
        'mangal': {
            'practices': ['ஹனுமான் சாலிசா', 'செவ்வாய் விரதம்', 'முருகன் வழிபாடு', 'உடற்பயிற்சி'],
            'materials': ['செம்பு வளையல்', 'சிவப்பு உடை', 'பவளம் ரத்தினம்', 'குங்குமம்'],
            'timings': ['செவ்வாய் காலை', 'அங்காரக ஹோரை', 'கார்த்திகை நட்சத்திரம்', 'சூரிய உதயம்']
        }
    }
    
    # Default data for combinations not in the detailed list
    return {
        'practices': remedial_data.get(planets[0], {}).get('practices', ['தினசரி வழிபாடு', 'மந்திர ஜபம்', 'தியானம்', 'ஆன்மீக பயிற்சி']),
        'materials': remedial_data.get(planets[0], {}).get('materials', ['பொருத்தமான ரத்தினம்', 'சிறப்பு உடை', 'மாலை', 'திலகம்']),
        'timings': remedial_data.get(planets[0], {}).get('timings', ['சிறப்பு ஹோரை', 'உதய வேளை', 'சந்தி வேளை', 'வழிபாட்டு நேரம்'])
    }

# Update all JSON files
for filename in os.listdir(base_dir):
    if filename.endswith('.json') and filename != 'index.json':
        combo_id = filename.replace('.json', '')
        file_path = os.path.join(base_dir, filename)
        
        # Load existing data
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Get specific data if available, otherwise use defaults
        if combo_id in astrological_data:
            specific_data = astrological_data[combo_id]
            data['description'] = specific_data['description']
            data['characteristics'] = specific_data['characteristics']
            data['palangal'] = specific_data['palangal']
            data['effects'] = specific_data['effects']
        else:
            # For combinations not specifically defined, create appropriate generic content
            planets = combo_id.split('-')
            planet_map = {
                'surya': 'சூரியன்', 'chandra': 'சந்திரன்', 'mangal': 'செவ்வாய்',
                'budhan': 'புதன்', 'guru': 'குரு', 'sukran': 'சுக்ரன்', 
                'sani': 'சனி', 'rahu': 'ராகு', 'ketu': 'கேது'
            }
            
            planet1 = planet_map[planets[0]]
            planet2 = planet_map[planets[1]]
            
            data['description'] = f"{planet1} மற்றும் {planet2} சேர்க்கை சிறப்பு ज्योतिषीय பலன்கள் மற்றும் பரிகாரங்களை வழங்குகிறது."
            data['characteristics'] = [
                'கிரக ஒருங்கிணைப்பு பலன்கள்',
                'சிறப்பு குணாதிசயங்கள்',
                'ஆன்மீக வளர்ச்சி',
                'வாழ்க்கை மேம்பாடு'
            ]
            data['palangal'] = [
                'தொழில் வளர்ச்சி',
                'குடும்ப நலன்',
                'ஆரோக்கியம்',
                'மன அமைதி'
            ]
            data['effects'] = {
                'positive': ['நல்ல பலன்கள்', 'வெற்றி வாய்ப்பு', 'ஆன்மீக முன்னேற்றம்', 'மன பலம்'],
                'negative': ['சவால்கள்', 'தாமதம்', 'மன அழுத்தம்', 'பிரச்னைகள்'],
                'remedial': ['ஆன்மீக வழிபாடு', 'தியானம்', 'தான தர்மம்', 'சுய கட்டுப்பாடு']
            }
        
        # Update remedial data
        remedial_info = get_complete_data(combo_id, '', [], [], {})
        data['vazhviayalPariharam']['practices'] = remedial_info['practices']
        data['vazhviayalPariharam']['materials'] = remedial_info['materials']  
        data['vazhviayalPariharam']['timings'] = remedial_info['timings']
        
        # Update temple and prayer info with more specific data
        data['templePariharam']['temples'] = [
            'நவகிரக கோவில்கள்',
            'சிறப்பு ஆலயங்கள்',
            'ஆன்மீக ஸ்தலங்கள்',
            'புண்ணிய தலங்கள்'
        ]
        data['templePariharam']['offerings'] = [
            'மாலை அர்ச்சனை',
            'பூ நிவேதனம்',
            'அபிஷேகம்',
            'வஸ்திர அர்ப்பணம்'
        ]
        data['templePariharam']['prayers'] = [
            'கிரக ஸ்தோத்திரம்',
            'மந்திர ஜபம்',
            'வேத பாராயணம்',
            'ஆராதனை'
        ]
        data['templePariharam']['specialDays'] = [
            'கிரக சார்ந்த நாள்கள்',
            'சிறப்பு நட்சத்திரங்கள்',
            'பண்டிகை தினங்கள்',
            'அமாவாசை/பூர்ணிமை'
        ]
        
        # Save updated data
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"Updated: {filename}")

print(f"\nUpdated all kiraga serkai combination files with proper astrological content!")
