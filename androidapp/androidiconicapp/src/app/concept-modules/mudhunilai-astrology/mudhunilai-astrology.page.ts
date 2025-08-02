import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, AlertController, IonModal } from '@ionic/angular';

interface Topic {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  duration: string;
  difficulty: string;
  rarity: string;
  secretLevel?: string;
  ancientSource?: string;
  sourceDescription?: string;
  gemstone?: string;
  gemstoneProperties?: string;
  keyPoints: string[];
  content: string;
  benefits: string[];
  sacredPractices?: string[];
  applications?: string[];
  isStudied?: boolean;
}

@Component({
  selector: 'app-mudhunilai-astrology',
  templateUrl: './mudhunilai-astrology.page.html',
  styleUrls: ['./mudhunilai-astrology.page.scss'],
})
export class MudhunilaiAstrologyPage implements OnInit {

  @ViewChild('detailModal', { static: true }) detailModal!: IonModal;

  selectedTopic: Topic | null = null;
  searchTerm = '';
  isBookmarked = false;
  favoriteTopicIds: string[] = [];
  studiedTopicIds: string[] = [];
  presentingElement: any = null;

  topics: Topic[] = [
    {
      id: 'nava_ratna_secrets',
      title: 'நவரத்ன ரகசியங்கள்',
      description: 'ஒன்பது புனித ரத்னங்களின் அரிய ஜோதிட ரகசியங்கள் மற்றும் அவற்றின் கிரக சம்பந்தங்கள்',
      category: 'ரத்ன ஞானம்',
      icon: 'diamond',
      color: '#e91e63',
      duration: '50 நிமிடங்கள்',
      difficulty: 'சிறப்பு நிலை',
      rarity: 'அரிய ஞானம்',
      secretLevel: 'உயர் ரகசியம்',
      ancientSource: 'கருட புராணம்',
      sourceDescription: 'பண்டைய இந்திய ரத்ன சாஸ்திர ஆதாரம்',
      gemstone: 'நவரத்னங்கள்',
      gemstoneProperties: 'ஒன்பது கிரகங்களின் சம்பூர்ண சக்தி',
      keyPoints: [
        'மாணிக்கம் - சூரியனின் சக்தி',
        'முத்து - சந்திரனின் குளிர்ச்சி',
        'பவளம் - செவ்வாயின் வீரம்',
        'மரகதம் - புதனின் புத்திசாலித்தனம்',
        'புஷ்பராகம் - குருவின் ஞானம்',
        'வைரம் - சுக்ரனின் அழகு',
        'நீலம் - சனியின் நீதி',
        'கோமேதகம் - ராகுவின் ரகசியம்',
        'வைடூர்யம் - கேதுவின் மோக்ஷம்'
      ],
      content: `
        <p><strong>நவரத்ன ரகசியங்கள்</strong> என்பது பண்டைய ஋ஷிகளால் கண்டுபிடிக்கப்பட்ட மிக சக்திவாய்ந்த ஜோதிட அறிவாகும்.</p>
        
        <p><strong>மாணிக்கம் (ரூபி):</strong><br>
        சூரியனின் பிரதிநிधியாக இருக்கும் இந்த ரத்னம் தலைமை, வெற்றி, புகழ் ஆகியவற்றைக் கொடுக்கும். உட்புறம் கொதித்துக்கொண்டிருக்கும் நெருப்பு போன்ற சக்தி கொண்டது.</p>
        
        <p><strong>முத்து (பேர்ல்):</strong><br>
        சந்திரனின் சாந்த சக்தியைக் கொண்ட இந்த ரத்னம் மன அமைதி, உணர்ச்சி நிலைத்தன்மை, தாய்மையின் ஆசீர்வாதம் ஆகியவற்றைக் கொடுக்கும்.</p>
        
        <p><strong>பவளம் (கோரல்):</strong><br>
        செவ்வாயின் வீர சக்தியைக் கொண்டது. பகைவர்களை வெல்லுதல், நிலம் சொத்து பெருக்கம், ரத்த நோய்கள் குணமாக்கும்.</p>
        
        <p>இவ்வாறு ஒவ்வொரு ரத்னமும் தனக்கெனத் தனிச்சிறப்பு வாய்ந்த சக்திகளைக் கொண்டுள்ளது.</p>
      `,
      benefits: [
        'ஒன்பது கிரக சக்திகளின் ஆசீர்வாதம்',
        'எல்லா வகை நோய்களிலிருந்து பாதுகாப்பு',
        'செல்வம், புகழ், அதிகாரம்',
        'ஆன்மீக முன்னேற்றம்',
        'குடும்ப ஒற்றுமை',
        'எதிரிகளின் தீய சக்திகளிலிருந்து பாதுகாப்பு'
      ],
      sacredPractices: [
        'வெள்ளிக்கிழமை அணியவும்',
        'முழு நிலவு நாட்களில் சந்தன நீரில் குளிக்கவைக்கவும்',
        'சூரிய உதயத்தில் வணங்கவும்',
        'மந்திரம் சொல்லி அணியவும்'
      ],
      applications: [
        'கிரக தோஷ நிவர்த்தியில் பயன்படும்',
        'ஜாதக பலம் அதிகரிக்கும்',
        'மங்கல பரிகாரங்களில் பயன்படும்',
        'ஆயுள் விருத்தியில் உதவும்'
      ]
    },
    {
      id: 'pancha_pakshi_secrets',
      title: 'பஞ்ச பக்ஷி ரகசியம்',
      description: 'ஐந்து புனித பறவைகளின் அடிப்படையில் நேர முகூர்த்த கணிப்பின் மிக உயர்ந்த ரகசிய முறை',
      category: 'காலக் கணிப்பு',
      icon: 'airplane',
      color: '#00bcd4',
      duration: '45 நிமிடங்கள்',
      difficulty: 'சிறப்பு நிலை',
      rarity: 'மிக அரிதான கலை',
      secretLevel: 'மிக ரகசியம்',
      ancientSource: 'பஞ்ச பக்ஷி சாஸ்திரம்',
      sourceDescription: 'தமிழ் ஜோதிட மரபின் சிகரம்',
      gemstone: 'மரகதம்',
      gemstoneProperties: 'புத்தி கூர்மை மற்றும் நேர உணர்வு',
      keyPoints: [
        'வல்லூறு - சூரிய காலம்',
        'ஆந்தை - சந்திர காலம்',
        'காகம் - செவ்வாய் காலம்',
        'சேவல் - புதன் காலம்',
        'மயில் - குரு காலம்'
      ],
      content: `
        <p><strong>பஞ்ச பக்ஷி ரகசியம்</strong> தமிழ் ஜோதிடத்தின் மிக உயர்ந்த கலையாகும். இது ஐந்து புனித பறவைகளின் செயல்பாடுகளை அடிப்படையாகக் கொண்டது.</p>
        
        <p><strong>வல்லூறு (கழுகு):</strong><br>
        சூரிய காலத்தைக் குறிக்கும். இந்நேரத்தில் முக்கிய வேலைகள், புதிய தொழில் ஆரம்பம், அரசு வேலைகள் சிறப்பாக நடக்கும்.</p>
        
        <p><strong>ஆந்தை:</strong><br>
        சந்திர காலத்தைக் குறிக்கும். இரவு நேர தியானம், ஆன்மீக பயிற்சிகள், இரகசிய ஆலோசனைகள் செய்ய ஏற்ற நேரம்.</p>
        
        <p><strong>காகம்:</strong><br>
        செவ்வாய் காலத்தைக் குறிக்கும். வீர தொழில்கள், அறுவை சிகிச்சை, நிலம் சொத்து வாங்குதல் ஆகியவற்றிற்கு ஏற்ற நேரம்.</p>
        
        <p><strong>சேவல்:</strong><br>
        புதன் காலத்தைக் குறிக்கும். கல்வி, வியாபாரம், எழுத்து வேலைகள், கணக்கு வேலைகள் செய்ய ஏற்ற நேரம்.</p>
        
        <p><strong>மயில்:</strong><br>
        குரு காலத்தைக் குறிக்கும். கல்வி கற்றல், குரு தேடல், திருமணம், சுப காரியங்கள் செய்ய மிக்க ஏற்ற நேரம்.</p>
      `,
      benefits: [
        'நேர் ஏற்ற முகூர்த்த அறிவு',
        'தினசரி வேலைகளில் வெற்றி',
        'இயற்கையுடன் இணைவு',
        'உள்ளுணர்வு வளர்ச்சி',
        'தீய செய்கைகளிலிருந்து தடுப்பு',
        'சுப நிகழ்வுகள் அதிகரிப்பு'
      ],
      sacredPractices: [
        'தினமும் பறவைகளின் இயற்கையை கவனிக்கவும்',
        'காலை 5 மணிக்கு பக்ஷி காலம் கணக்கிடவும்',
        'சந்திர திதியுடன் ஒப்பிட்டு பார்க்கவும்',
        'முக்கிய முடிவுகள் எடுப்பதற்கு முன் கணிக்கவும்'
      ],
      applications: [
        'தினசரி அட்டவணை அமைப்பில் பயன்படும்',
        'வியாபார நேர முடிவுகளில் உதவும்',
        'பயண நேர தேர்வில் வழிகாட்டும்',
        'கல்யாண முகூர்த்த நிர்ணயத்தில் பயன்படும்'
      ]
    },
    {
      id: 'moola_mantra_sciences',
      title: 'மூல மந்திர விஞ்ஞானம்',
      description: 'பிரபஞ்சத்தின் ஆதி ஒலிகளின் மறைபொருள் மற்றும் அவற்றின் ஜோதிட தொடர்புகள்',
      category: 'மந்திர விஞ்ஞானம்',
      icon: 'musical-notes',
      color: '#9c27b0',
      duration: '60 நிமிடங்கள்',
      difficulty: 'சிறப்பு நிலை',
      rarity: 'புனித ஞானம்',
      secretLevel: 'பரம ரகசியம்',
      ancientSource: 'வேத ஆகமங்கள்',
      sourceDescription: 'நான்கு வேதங்களின் சாரம்',
      gemstone: 'ஸ்படிகம்',
      gemstoneProperties: 'ஆன்மீக அதிர்வுகளை பெருக்கும் சக்தி',
      keyPoints: [
        'ஓம் - பிரபஞ்ச ஆதி ஒலி',
        'ஹ்ரீம் - மாயா சக்தி மந்திரம்',
        'ஸ்ரீம் - லக்ஷ்மி பீஜம்',
        'க்லீம் - காம பீஜம்',
        'ஐம் - சரஸ்வதி பீஜம்',
        'த்ரீம் - லக்ஷ்மி நாராயண பீஜம்',
        'ஹ்ரிம் - மஹாமாயா மந்திரம்',
        'ஸ்ட்ரீம் - துர்கா பீஜம்'
      ],
      content: `
        <p><strong>மூல மந்திர விஞ்ஞானம்</strong> வேத காலத்திலிருந்து பாதுகாக்கப்பட்டு வரும் மிக உயர்ந்த ஆன்மீக அறிவாகும்.</p>
        
        <p><strong>ஓம் (AUM):</strong><br>
        இது பிரபஞ்சத்தின் ஆதி ஒலியாகும். A-உற்பத்தி, U-நிலைத்திருத்தல், M-அழிவு ஆகிய மூன்று கோணங்களையும் குறிக்கிறது. சூரிய கிரகத்துடன் நேரடி தொடர்பு.</p>
        
        <p><strong>ஹ்ரீம் (HREEM):</strong><br>
        இது மாயா சக்தியின் பீஜ மந்திரம். சந்திர கிரகத்துடன் தொடர்பு. இந்த மந்திரம் மனதின் ஆழத்தில் மறைந்திருக்கும் சக்திகளை வெளிக்கொணரும்.</p>
        
        <p><strong>ஸ்ரீம் (SREEM):</strong><br>
        லக்ஷ்மி தேவியின் பீஜ மந்திரம். சுக்ரன் கிரகத்துடன் தொடர்பு. செல்வம், சௌபாக்கியம், வளம் ஆகியவற்றைக் கொடுக்கும்.</p>
        
        <p><strong>க்லீம் (KLEEM):</strong><br>
        இது கர்ஷண சக்தி பீஜம். மனங்களை கவரும் சக்தி, காதல், திருமணம் ஆகியவற்றில் பயன்படும். சுக்ரன் மற்றும் சந்திரனுடன் தொடர்பு.</p>
      `,
      benefits: [
        'மன ஒருமைப்பாடு',
        'ஆன்மீக சக்தி அதிகரிப்பு',
        'நோய் நீக்கும் சக்தி',
        'செல்வ வளம் அதிகரிப்பு',
        'பகைவர் பாதுகாப்பு',
        'மன அமைதி',
        'அருள் சக்தி பெருக்கம்'
      ],
      sacredPractices: [
        'பிரம்ம முகூர்த்தத்தில் ஜபம் செய்யவும்',
        '108 முறை அல்லது 1008 முறை சொல்லவும்',
        'ருத்ராக்ஷ மாலையில் எண்ணவும்',
        'சந்தனம் பூசி உச்சரிக்கவும்'
      ],
      applications: [
        'தியான பயிற்சியில் பயன்படும்',
        'கிரக தோஷ நிவர்த்தியில் உதவும்',
        'மன நோய் குணப்படுத்தும்',
        'ஆன்மீக முன்னேற்றத்திற்கு வழிவகுக்கும்'
      ]
    },
    {
      id: 'kala_sarpa_dosha_secrets',
      title: 'கால சர்ப்ப தோஷ ரகசியங்கள்',
      description: 'ராகு கேது சாபத்தின் மிக ரகசியமான வகைகள் மற்றும் அவற்றின் சிறப்பு பரிகார முறைகள்',
      category: 'தோஷ நிவர்த்தி',
      icon: 'infinite',
      color: '#795548',
      duration: '55 நிமிடங்கள்',
      difficulty: 'சிறப்பு நிலை',
      rarity: 'மிக அபூர்வம்',
      secretLevel: 'ரகசிய ஞானம்',
      ancientSource: 'சர்ப்ப ராஜ தந்திரம்',
      sourceDescription: 'நாக வம்சத்தின் புராதன அறிவு',
      gemstone: 'கோமேதகம்',
      gemstoneProperties: 'ராகு தோஷ நிவர்த்தி சக்தி',
      keyPoints: [
        'அனந்த கால சர்ப்பம் - முழு தோஷம்',
        'பார்சவ கால சர்ப்பம் - பாதி தோஷம்',
        'ஆர்த்த கால சர்ப்பம் - மிதமான தோஷம்',
        'அசாம்பூர்ண கால சர்ப்பம் - குறைந்த தோஷம்',
        '12 வகை சர்ப்ப வரிசைகள்'
      ],
      content: `
        <p><strong>கால சர்ப்ப தோஷம்</strong> ஜோதிட சாஸ்திரத்தில் மிகவும் சக்திவாய்ந்த மற்றும் சிக்கலான தோஷமாகும்.</p>
        
        <p><strong>கால சர்ப்ப தோஷம் உருவாதல்:</strong><br>
        ஜாதகத்தில் ஏழு கிரகங்களும் (சூரியன், சந்திரன், செவ்வாய், புதன், குரு, சுக்ரன், சனி) ராகு கேதுவுக்கு இடையே மாட்டிக்கொண்டிருக்கும்போது கால சர்ப்ப தோஷம் உருவாகிறது.</p>
        
        <p><strong>அனந்த கால சர்ப्पம்:</strong><br>
        ராகு முதல் பாவத்திலும் கேது ஏழாம் பாவத்திலும் இருந்தால் அனந்த கால சர्प தோஷம். இது மிக கடுமையான தோஷம். வாழ்க்கையில் கடும் தடைகள், திருமண தாமதம், குழந்தை பாக்கியம் தாமதம் ஆகியவை உண்டாகும்.</p>
        
        <p><strong>வாசுகி கால சர्पम்:</strong><br>
        ராகு 2-ம் பாவத்திலும் கேது 8-ம் பாவத்திலும் இருந்தால் வாசுகி கால சर्प தோஷம். பொருளாதார தொல்லைகள், குடும்ப பிரச்சனைகள் உண்டாகும்.</p>
        
        <p>இவ்வாறு 12 வகையான கால சर্প தோஷங்கள் உள்ளன.</p>
      `,
      benefits: [
        'கால சர्प தோஷ விளைவுகளிலிருந்து விடுபட்டல்',
        'வாழ்க்கையில் தடைகள் நீங்குதல்',
        'திருமண வாழ்க்கை சுமுகமாதல்',
        'குழந்தை பாக்கியம் கிடைத்தல்',
        'தொழில் முன்னேற்றம்',
        'மன அமைதி பெறுதல்'
      ],
      sacredPractices: [
        'நாக பஞ்சமி நாளில் பரிகாரம் செய்யவும்',
        'திருமணியல் சுக்கில் பாகத்தில் பூஜை செய்யவும்',
        'ராகு காலத்தில் சர்ப்ப ஹோமம் செய்யவும்',
        'நாக தோஷ நிவர்த்தி மந்திரம் ஜபிக்கவும்'
      ],
      applications: [
        'கடும் கால சர्प தோஷ பரிகாரத்தில் பயன்படும்',
        'திருமண தடைகள் நீக்கும்',
        'ராகு கேது தசைகளில் நிவாரணம் கொடுக்கும்',
        'குழந்தையின்மை பிரச்சனை தீர்க்கும்'
      ]
    },
    {
      id: 'ancient_yantras_power',
      title: 'பண்டைய யந்திர சக்திகள்',
      description: 'மறைக்கப்பட்ட புனித ஜ்யோமிதி வடிவங்கள் மற்றும் அவற்றின் கிரக சக்தி இழுக்கும் திறன்',
      category: 'யந்திர சாஸ்திரம்',
      icon: 'apps',
      color: '#ff5722',
      duration: '40 நிமிடங்கள்',
      difficulty: 'சிறப்பு நிலை',
      rarity: 'புராதன ரகசியம்',
      secretLevel: 'மிக ரகசியம்',
      ancientSource: 'யந்திர சர்வஸ்வம்',
      sourceDescription: 'தந்திர சாஸ்திரத்தின் யந்திர பாகம்',
      gemstone: 'ஸ்படிகம்',
      gemstoneProperties: 'யந்திர சக்தியை பெருக்கும் ஆற்றல்',
      keyPoints: [
        'ஸ்ரீ யந்திரம் - மஹாலக்ஷ்மி சக்தி',
        'நவகிரக யந்திரம் - கிரக சக்திகள்',
        'காலி யந்திரம் - தீய சக்தி அழிப்பு',
        'கண்டபத யந்திரம் - விக்ன நாசம்',
        'நடஸ்வர யந்திரம் - கல்வி வளர்ச்சி'
      ],
      content: `
        <p><strong>பண்டைய யந்திர சக்திகள்</strong> நம் முன்னோர்களால் கண்டுபிடிக்கப்பட்ட அபூர்வமான ஆன்மீக தொழில்நுட்பமாகும்.</p>
        
        <p><strong>ஸ்ரீ யந்திரம்:</strong><br>
        இது மிக சக்திவாய்ந்த யந்திரம். 9 முக்கோணங்கள், 43 குறுக்கு வெட்டுக்கள், 54 சிறிய முக்கோணங்கள் கொண்டது. மஹாலக்ஷ்மியின் சக்தியை பூர்த்தியாக இழுக்கும் சக்தி கொண்டது.</p>
        
        <p><strong>நவகிரக யந்திரம்:</strong><br>
        ஒன்பது கிரகங்களின் சக்திகளையும் ஒரே யந்திரத்தில் கொண்டுவரும் அரிய வடிவம். மையத்தில் சூரியன், சுற்றிலும் எட்டு கிரகங்கள் வைக்கப்படும்.</p>
        
        <p><strong>காலி யந்திரம்:</strong><br>
        எதிரிகள், தீய சக்திகள், கருங்கண் ஆகியவற்றை அழிக்கும் சக்தி கொண்டது. இது அதி சக்திவாய்ந்தது என்பதால் மிக கவனமாக பயன்படுத்த வேண்டும்.</p>
      `,
      benefits: [
        'கிரக சக்திகளின் நேர்மறை பாதிப்பு',
        'வீட்டில் நேர்மறை ஆற்றல் பெருக्कम்',
        'தீய சக்திகளிलிருந்து பாதुகாப்பு',
        'மன ஒருக்கமப்பாடு',
        'செல்வ வளம் அதிகรिप्पு',
        'ஆன्मীक முன्नेற்றम்'
      ],
      sacredPractices: [
        'புனித நாளில் யந்திரம் எழுதவும்',
        'குங்குமம், சந்தனம் கொண்டு பூஜை செய்யவும்',
        'தினம் அகர்பத்தி கொளுत्तவும்',
        'சம्पूர्ण मन्त्रम् सोळिकर यन्त्र चैत्न्य करवम्'
      ],
      applications: [
        'വ്याപार വর്द്ധനയില് ഉപയോগിക്കാം',
        'गृह शান्ति के लिए स्थापित करें',
        'कुंडली দোষ निवारण में करें',
        'संतान प्राप्ति के लिए उपयोग करें'
      ]
    }
  ];

  filteredTopics: Topic[] = [];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.filteredTopics = this.topics;
    this.loadFavorites();
    this.loadStudiedTopics();
    this.presentingElement = document.querySelector('.ion-page');
  }

  loadFavorites() {
    const stored = localStorage.getItem('favoriteMudhunilaiTopicIds');
    if (stored) {
      this.favoriteTopicIds = JSON.parse(stored);
    }
  }

  saveFavorites() {
    localStorage.setItem('favoriteMudhunilaiTopicIds', JSON.stringify(this.favoriteTopicIds));
  }

  loadStudiedTopics() {
    const stored = localStorage.getItem('studiedMudhunilaiTopicIds');
    if (stored) {
      this.studiedTopicIds = JSON.parse(stored);
    }
  }

  saveStudiedTopics() {
    localStorage.setItem('studiedMudhunilaiTopicIds', JSON.stringify(this.studiedTopicIds));
  }

  searchTopics() {
    if (!this.searchTerm.trim()) {
      this.filteredTopics = this.topics;
      return;
    }

    this.filteredTopics = this.topics.filter(topic =>
      topic.title.includes(this.searchTerm) ||
      topic.description.includes(this.searchTerm) ||
      topic.category.includes(this.searchTerm) ||
      topic.keyPoints.some(point => point.includes(this.searchTerm)) ||
      (topic.ancientSource && topic.ancientSource.includes(this.searchTerm)) ||
      (topic.gemstone && topic.gemstone.includes(this.searchTerm))
    );
  }

  openTopicDetail(topic: Topic) {
    this.selectedTopic = topic;
    this.detailModal.present();
  }

  closeTopicDetail() {
    this.detailModal.dismiss();
    this.selectedTopic = null;
  }

  toggleFavorite(topic: Topic, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    const index = this.favoriteTopicIds.indexOf(topic.id);
    if (index > -1) {
      this.favoriteTopicIds.splice(index, 1);
      this.presentToast(topic.title + ' விருப்பங்களிலிருந்து நீக்கப்பட்டது');
    } else {
      this.favoriteTopicIds.push(topic.id);
      this.presentToast(topic.title + ' விருப்பங்களில் சேர்க்கப்பட்டது');
    }
    this.saveFavorites();
  }

  isFavorite(topic: Topic): boolean {
    return this.favoriteTopicIds.includes(topic.id);
  }

  markAsStudied(topic: Topic) {
    if (!this.studiedTopicIds.includes(topic.id)) {
      this.studiedTopicIds.push(topic.id);
      this.saveStudiedTopics();
      this.presentToast(topic.title + ' ரத்ன ஞானம் பெற்றது என்று குறிக்கப்பட்டது');
    }
    this.closeTopicDetail();
  }

  isStudied(topic: Topic): boolean {
    return this.studiedTopicIds.includes(topic.id);
  }

  shareTopic(topic: Topic, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    const shareText = `${topic.title}\n\n${topic.description}\n\nமுத்துநிலை ஜோதிஷம் - வேத ஆஸ்ட்ரோ ஆப்`;
    
    if (navigator.share) {
      navigator.share({
        title: topic.title,
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        this.presentToast('அரிய தலைப்பு கிளிப்போர்டில் நகலெடுக்கப்பட்டது');
      });
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    this.presentToast(this.isBookmarked ? 'புத்தகக்குறி சேர்க்கப்பட்டது' : 'புத்தகக்குறி நீக்கப்பட்டது');
  }

  trackByTopicId(index: number, topic: Topic): string {
    return topic.id;
  }
}
