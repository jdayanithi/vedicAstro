import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Rasi {
  id: string;
  number: number;
  name: string;
  nameEnglish: string;
  sanskritName: string;
  symbol: string;
  symbolUnicode?: string;
  photoUrl?: string;
  chinnam?: string;
  element: string; // பஞ்சபூதம்
  rulingPlanet: string;
  lordPlanet: string;
  quality: string; // கார்டினல், ஃபிக்ஸ்ட், மியூட்டபிள்
  gender: string;
  nature: string; // பிருத்வி, ஜல, வாயு, அக்னி
  tamilMonth?: string;
  river?: string;
  nakshatras?: string[];
  gems?: string[];
  ratnams?: string[];
  bodyParts: string[];
  diseases: string[];
  characteristics: string[];
  positiveTraits: string[];
  negativeTraits: string[];
  careerOptions: string[];
  businessSuitable: string[];
  education: string[];
  marriageCompatibility: string[];
  incompatibleRasis: string[];
  luckyNumbers: number[];
  luckyColors: string[];
  luckyDays: string[];
  luckyStones: string[];
  metals: string[];
  directions: string[];
  flowers: string[];
  trees: string[];
  animals: string[];
  deities: string[];
  mantras: string[];
  pathams108?: string[];
  pariharam?: string[];
  varalakshmi?: string[];
  remedies: string[];
  healthTips: string[];
  financialTips: string[];
  relationshipTips: string[];
  expanded?: boolean;
}

interface RasiAnalysis {
  rasi: string;
  rasiName: string;
  strength: 'excellent' | 'good' | 'average' | 'challenging';
  currentPeriod: string;
  predictions: string[];
  remedies: string[];
}

@Component({
  selector: 'app-rasi-karakathuvam',
  templateUrl: './rasi-karakathuvam.page.html',
  styleUrls: ['./rasi-karakathuvam.page.scss'],
})
export class RasiKarakathuvamPage implements OnInit {

  selectedSegment = 'overview';
  isBookmarked = false;
  showAnalysisView = false;
  currentRasiIndex = 0;
  searchTerm = '';
  filteredRasis: Rasi[] = [];
  selectedFilter = 'all';
  selectedElement = 'all';
  showAllPathams = false;
  compatibilityRasi1: Rasi | null = null;
  compatibilityRasi2: Rasi | null = null;
  compatibilityResult: any = null;

  rasis: Rasi[] = [
    {
      id: 'mesha',
      number: 1,
      name: 'மேஷம்',
      nameEnglish: 'Aries',
      sanskritName: 'Mesha',
      symbol: 'ஆட்டுக்கிடா',
      element: 'அக்னி',
      rulingPlanet: 'செவ்வ��ய்',
      lordPlanet: 'அங்காரகன்',
      quality: 'கார்டினல்',
      gender: 'ஆண்',
      nature: 'தேஜஸ்',
      bodyParts: ['தலை', 'முகம்', 'மூளை', 'கண்கள்'],
      diseases: ['தலைவலி', 'மூளை நோய்கள்', 'கண் பிரச்சினைகள்', 'காய்ச்சல்', 'இரத்த அழுத்தம்'],
      characteristics: [
        'தலைமைத்துவ குணம்',
        'வீரம் மற்றும் தைரியம்',
        'சுறுசுறுப்பு',
        'புதிய விஷயங்களில் ஆர்வம்',
        'விரைவான முடிவெடுப்பு'
      ],
      positiveTraits: ['தைரியம்', 'தலைமை', 'ஆற்றல்', 'உற்சாகம்', 'நேர்மை'],
      negativeTraits: ['அவசரப்படுதல்', 'கோபம்', 'பொறுமையின்மை', 'ஆணவம்', 'சுயநலம்'],
      careerOptions: ['இராணுவம்', 'காவல்துறை', 'விளையாட்ட��', 'தொழில்முனைவு', 'மருத்துவம்'],
      businessSuitable: ['இரும்பு வணிகம்', 'விளையாட்டு சாமான்கள்', 'ஆட்டோமொபைல்', 'பாதுகாப்பு சேவை'],
      education: ['பொறியியல்', 'மருத்துவம்', 'விளையாட்டு அறிவியல்', 'இராணுவ கல���வி'],
      marriageCompatibility: ['சிம்மம்', 'தனுசு', 'மிதுனம்', 'கும்பம்'],
      incompatibleRasis: ['கடகம்', 'மகரம்', 'துலாம்'],
      luckyNumbers: [1, 8, 17, 26, 35, 44],
      luckyColors: ['சிவப்பு', 'ஆரஞ்சு', 'மஞ்சள்'],
      luckyDays: ['செவ்வாய்', 'ஞாயிறு'],
      luckyStones: ['பவளம்', 'மாணிக்கம்', 'செம்பட்டை'],
      metals: ['செம்பு', 'இரும்பு'],
      directions: ['கிழக்கு', 'தெற்கு'],
      flowers: ['செம்பருத்தி', 'சிவப்பு ரோஜா', 'கனகாம்பரம்'],
      trees: ['வேம்பு', 'அரசு', 'பலா'],
      animals: ['ஆடு', 'குதிரை', 'சிங்கம்'],
      deities: ['முருகன்', 'ஹனுமான்', 'துர்க்கா'],
      mantras: [
        'Om Gam Ganapataye Namah',
        'Om Mangalaya Namah',
        'Mesha Rasi Mantra'
      ],
      remedies: [
        'செவ்வாய்க்கிழமை முருகன் வழிபாடு',
        'சிவப்பு வஸ்திரம் அணியவும்',
        'பவளம் அணியவும்',
        'ஹனுமான் சாலிசா பாராயணம்'
      ],
      symbolUnicode: '♈',
      photoUrl: 'assets/rasi-images/mesha.jpg',
      chinnam: 'ஆட்டின் தலை - வீரம் மற்றும் தலைமையின் அடையாளம்',
      tamilMonth: 'சித்திரை - வைகாசி',
      river: 'கங்கை',
      nakshatras: ['அசுவினி', 'பரணி', 'கிருத்திகை (1/4)'],
      gems: ['மாணிக்கம்', 'பவளம்', 'செம்பட்டை'],
      pathams108: [
        'Om Ashwini Kumaraya Namah', 'Om Bharani Shaktaye Namah', 'Om Krittika Agnaye Namah',
        'Om Mesha Rashaya Namah', 'Om Mangala Grahaya Namah', 'Om Rakta Varnaya Namah',
        'சிவஜி சரணம்', 'முருகா சரணம்', 'கணபதி சரணம்'
      ],
      pariharam: [
        'செவ்வாய் கிரஹப் பீடிதம் நீங்க ஹனுமான் வழிபாடு',
        'சிவப்பு வஸ்திரம் தானம்',
        'மசூர் தால் தானம்',
        'செம்பருத்தி மலர் சாத்து'
      ],
      varalakshmi: [
        'சிவப்பு கலர் அலங்காரம்',
        'வெள்ளிக்கிழமை விரதம்',
        'மஹாலக்ஷ்மி மந்திரம்',
        'செம்பருத்தி மலர் மாலை'
      ],
      healthTips: [
        'தலை பகுதியை பாதுகாக்கவும்',
        'இரத்த அழுத்தத்தை கண்காணிக்கவும்',
        'கோபத்தை கட்டுப்படுத்தவும்',
        'வழக்கமான உடற்பயிற்சி'
      ],
      financialTips: [
        'அவசரமான முதலீடுகளை தவிர்க்கவும்',
        'இரும்பு, எஃகு வணிகம் நல்லது',
        'விளையாட்டு துறையில் முதலீடு',
        'ரிஸ்க் எடுக்கும் முன் யோசிக்கவும்'
      ],
      relationshipTips: [
        'பொறுமையாக இருங்கள்',
        'பார்ட்னரின் கருத்துகளை மதிக்கவும்',
        'கோபத்தை கட்டுப்படுத்தவும்',
        'நேரத்தை ஒதுக்கி கவனம் செலுத்தவும்'
      ]
    },
    {
      id: 'vrishabha',
      number: 2,
      name: 'ரிஷபம்',
      nameEnglish: 'Taurus',
      sanskritName: 'Vrishabha',
      symbol: 'காளை',
      element: 'பூமி',
      rulingPlanet: 'சுக்கிரன்',
      lordPlanet: 'சுக்கிரன்',
      quality: 'ஃபிக்ஸ்ட்',
      gender: 'பெண்',
      nature: 'பிருத்வி',
      bodyParts: ['கழுத்து', 'தொண்டை', 'முகம்', 'காது'],
      diseases: ['தொண்டை பிரச்சினைகள்', 'கழுத்து வலி', 'தைராய்டு', 'பல் பிரச்சினைகள்'],
      characteristics: [
        'நிலைத்தன்மை',
        'பொறுமை',
        'கலை ரசனை',
        'ஆடம்பர விருப்பம்',
        'நம்பகத்தன்மை'
      ],
      positiveTraits: ['பொறுமை', 'நம்பகம்', 'கலை ரசனை', 'உறுதி', 'அன்பு'],
      negativeTraits: ['பிடிவாதம்', 'சோம்பல்', 'பொருட்ஆசை', 'மாற்றத்திற்கு எதிர்ப்பு'],
      careerOptions: ['கலை', 'இசை', 'வங்கி', 'நிதி', 'உணவு தொழில்', 'அழகு சாதனம்'],
      businessSuitable: ['நகைகள்', 'ஆடைகள்', 'சௌந்தர்ய பொருட்கள்', 'உணவு வணிகம்'],
      education: ['க���ை', 'இசை', 'நிதி', 'ஃபேஷன் டிசைன்', 'சமையல் கலை'],
      marriageCompatibility: ['கன்னி', 'மகரம்', 'கடகம்', 'மீனம்'],
      incompatibleRasis: ['சிம்மம்', 'கும்பம்', 'விருச்சிகம்'],
      luckyNumbers: [2, 7, 16, 25, 34, 43],
      luckyColors: ['வெள்ளை', 'இளஞ்சிவப்பு', 'பச்சை', 'நீலம்'],
      luckyDays: ['வெள்ளி', 'திங்கள்'],
      luckyStones: ['வைரம்', 'ஓபல்', 'எமரால்ட்'],
      metals: ['வெள்ளி', 'பித்தளை'],
      directions: ['தென்கிழக்கு', 'வடக்கு'],
      flowers: ['வெள்ளை ரோஜா', 'மல்லிகை', 'சாமந்தி'],
      trees: ['பனை', 'தென்னை', 'அத்தி'],
      animals: ['காளை', 'யானை', 'பசு'],
      deities: ['லக்ஷ்மி', 'சரஸ்வதி', 'பார்வதி'],
      mantras: [
        'Om Shukraya Namah',
        'Om Shreem Lakshmiyai Namah',
        'Vrishabha Rasi Mantra'
      ],
      remedies: [
        'வெள்ளிக்கிழமை லக்ஷ்மி வழிபாடு',
        'வெள்ளை அல்லது இளஞ்சிவப்பு உடைகள்',
        'வைரம் அல்லது ஓபல் அணியவும்',
        'இனிப்பு பொருட்கள் தானம்'
      ],
      symbolUnicode: '♉',
      photoUrl: 'assets/rasi-images/vrishabha.jpg',
      chinnam: 'காளையின் முகம் - நிலைத்தன்மை மற்றும் பொறுமையின் அடையாளம்',
      tamilMonth: 'வைகாசி - ஆனி',
      river: 'யமுனை',
      nakshatras: ['கிருத்திகை (3/4)', 'ரோஹிணி', 'மிருகசீர்ஷம் (1/2)'],
      gems: ['வைரம்', 'ஓபல்', 'வெள்ளை மூங்கில்'],
      pathams108: [
        'Om Krittika Agnaye Namah', 'Om Rohini Chandraya Namah', 'Om Mrigashira Mangalaya Namah',
        'Om Vrishabha Rashaya Namah', 'Om Shukra Grahaya Namah', 'Om Sthiratvaya Namah',
        'லக்ஷ்மி சரணம்', 'சுக்கிர சரணம்', 'சிவ சரணம்'
      ],
      pariharam: [
        'சுக்கிர கிரஹப் பீடிதம் நீங்க லக்ஷ்மி வழிபாடு',
        'வெள்ளை வஸ்திரம் தானம்',
        'சர்க்கரை மற்றும் இனிப்பு தானம்',
        'வெள்ளை பூவின் மாலை சாத்து'
      ],
      varalakshmi: [
        'வெள்ளை மற்றும் இளஞ்சிவப்பு அலங்காரம்',
        'வெள்ளிக்கிழமை விரதம்',
        'மஹாலக்ஷ்மி அஷ்டோத்தரம்',
        'வெள்ளை ரோஜா மாலை'
      ],
      healthTips: [
        'கழுத்து பகுதியை பாதுகாக்கவும்',
        'தொண்டையை ஈரப்பதத்துடன் வைக்கவும்',
        'தைராய்டு பரிசோதனை வழக்கமாக',
        'அதிக இனிப்பு தவிர்க்கவும்'
      ],
      financialTips: [
        'நிலையான முதலீடுகள் சிறந்தவை',
        'தங்கம், வெள்ளி முதலீடு',
        'சொத்து முதலீடு நல்லது',
        'அவசர கடன் தவிர்க்கவும்'
      ],
      relationshipTips: [
        'அன்பை வெளிப்படுத்தவும்',
        'பிடிவாதத்தை குறைக்கவும்',
        'பார்ட்னரின் விருப்பங்களை மதிக்கவும்',
        'ஆடம்பரமான இடங்களுக்கு அழைத்துச் செல்லவும்'
      ]
    },
    {
      id: 'mithuna',
      number: 3,
      name: 'மிதுனம்',
      nameEnglish: 'Gemini',
      sanskritName: 'Mithuna',
      symbol: 'இரட்டையர்கள்',
      element: 'வாயு',
      rulingPlanet: 'புதன்',
      lordPlanet: 'புதன்',
      quality: 'மியூட்டபிள்',
      gender: 'ஆண்',
      nature: 'வாயு',
      bodyParts: ['கைகள்', 'தோள்கள்', 'நுரையீரல்', 'நரம்பு மண்டலம்'],
      diseases: ['ஆஸ்துமா', 'நுரையீரல் பிரச்சினைகள்', 'நரம்பு பிரச்சினைகள்', 'கை வலி'],
      characteristics: [
        'புத்திசாலித்தனம்',
        '���ொடர்பு திறன்',
        'ஆர்வம்',
        'மாறுபட்ட விருப்பங்கள்',
        'சிந்தனை திறன்'
      ],
      positiveTraits: ['புத்திசாலி', 'பேச்சுத்திறன்', 'ஆர்வம்', 'நகைச்சுவை', 'மாற்றுத்திறன்'],
      negativeTraits: ['நிலையற்றது', 'மனம் மாறுதல்', 'மேலோட்டமான அறிவு', 'பொறுமையின்மை'],
      careerOptions: ['பத்திாகை', 'எழுத்து', 'விற்பனை', 'தொலைத்தொடர்பு', 'மொழிபெயர்ப்பு'],
      businessSuitable: ['தொடர்பு சாதனங்கள்', 'புத்தகங்கள்', 'வானொலி-தொலைக்காட்சி', 'பயணம்'],
      education: ['இலக்கியம்', 'தொடர்பு', 'கணினி', 'மொழிகள்', 'பத்திरிகை'],
      marriageCompatibility: ['துலாம்', 'கும்பம்', 'மேஷம்', 'சிம்மம்'],
      incompatibleRasis: ['கன்னி', 'மீனம்', 'தனுசு'],
      luckyNumbers: [3, 12, 21, 30, 39, 48],
      luckyColors: ['பச்சை', 'மஞ்சள்', 'ஆரஞ்சு'],
      luckyDays: ['புதன்', 'ஞாயிறு'],
      luckyStones: ['எமரால்ட்', 'அக்வாமரைன்', 'ஜேட்'],
      metals: ['பித்தளை', 'வெண்கலம்'],
      directions: ['வடக்கு', 'வடகிழக்கு'],
      flowers: ['மல்லிகை', 'மஞ்சள் ரோஜா', 'தேனும்பூ'],
      trees: ['மாவு', 'பனானா', 'யூகாலிப்டஸ்'],
      animals: ['குரங்கு', 'பறவைகள்', 'செல்லப்பிராணிகள்'],
      deities: ['விஷ்ணு', 'கிருஷ்ணன்', 'சர��்வதி'],
      mantras: [
        'Om Budhaya Namah',
        'Om Ganeshaya Namah',
        'Mithuna Rasi Mantra'
      ],
      remedies: [
        'புதன்கிழமை விஷ்ணு வழிபாடு',
        'பச்சை வஸ்திரம் அணியவும்',
        'எமரால்ட் அணியவும்',
        'கல்வித்துறையில் தானம்'
      ],
      symbolUnicode: '♊',
      photoUrl: 'assets/rasi-images/mithuna.jpg',
      chinnam: 'இரட்டையர்கள் - இருமைத்தன்மை மற்றும் சுறுசுறுப்பின் அடையாளம்',
      tamilMonth: 'ஆனி - ஆடி',
      river: 'சரஸ்வதி',
      nakshatras: ['மிருகசீர்ஷம் (1/2)', 'ஆர்த்ரா', 'புனர்வசு (3/4)'],
      gems: ['எமரால்ட்', 'அக்வாமரைன்', 'ஜேட்'],
      pathams108: [
        'Om Mrigashira Mangalaya Namah', 'Om Ardra Shivaya Namah', 'Om Punarvasu Brahmane Namah',
        'Om Mithuna Rashaya Namah', 'Om Budha Grahaya Namah', 'Om Vayu Tattvaya Namah',
        'விஷ்ணு சரணம்', 'கிருஷ்ணா சரணம்', 'சரஸ்வதி சரணம்'
      ],
      pariharam: [
        'புதன் கிரஹப் பீடிதம் நீங்க விஷ்ணு வழிபாடு',
        'பச்சை வஸ்திரம் தானம்',
        'புத்தகங்கள் மற்றும் எழுது பொருட்கள் தானம்',
        'மல்லிகை மலர் சாத்து'
      ],
      varalakshmi: [
        'பச்சை மற்றும் மஞ்சள் அலங்காரம்',
        'புதன்கிழமை விரதம்',
        'சரஸ்வதி மந்திரம்',
        'துளசி மாலை சாத்து'
      ],
      healthTips: [
        'நுரையீரல் பராமரிப்பு',
        'மூச்சுப்பயிற்சி',
        'நரம்புத்தளர்ச்சி தவிர்க்கவும்',
        'மன அழுத்தம் குறைக்கவும்'
      ],
      financialTips: [
        'பல்வேறு துறைகளில் முதலீடு',
        'தொழில்நுட்ப பங்குகள்',
        'குறுகிய கால முதலீடுகள்',
        'ரிஸ்க் பரவலாக்கம்'
      ],
      relationshipTips: [
        'தொடர்பில் இருங்கள்',
        'சுதந்திரம் கொடுங்கள்',
        'புதிய அனுபவங்களை பகிருங்கள்',
        'பல்வேறு விஷயங்களில் ஆர்வம் காட்டுங்கள்'
      ]
    },
    {
      id: 'karka',
      number: 4,
      name: 'கடகம்',
      nameEnglish: 'Cancer',
      sanskritName: 'Karka',
      symbol: 'நண்டு',
      element: 'நீர்',
      rulingPlanet: 'சந்திரன்',
      lordPlanet: 'சந்திரன்',
      quality: 'கார்டினல்',
      gender: 'பெண்',
      nature: 'ஜல',
      bodyParts: ['மார்பு', 'வயிறு', 'நுரையீரல்', 'கல்லீரல்'],
      diseases: ['வயிற்று பிரச்சினைகள்', 'நீர்க்கோர்வை', 'மார்பக நோய்கள்', 'மன அழுத்தம்'],
      characteristics: [
        'உணர்ச்சிவசப்படுதல்',
        'பாதுகாப்பு உணர்வு',
        'குடும்ப பற்று',
        'உள்ளுணர்வு',
        'கற்பனை சக்தி'
      ],
      positiveTraits: ['அன்பு', 'பர��மரிப்பு', 'உ��்ளுணர்வு', 'நம்பகம்', 'குடும்ப பற்று'],
      negativeTraits: ['மூட் மாற்றம்', 'அதிக உணர்ச்சி', 'பிடிவாதம்', 'கோபம்'],
      careerOptions: ['சமையல்', 'ஹோட்டல்', 'குழந்தைகள் பராமரிப்பு', 'மருத்துவம்', 'கல்வி'],
      businessSuitable: ['உணவு வணிகம்', 'நீர் வணிகம்', 'ரியல் எஸ்டேட்', 'கல்வி நிறுவனம்'],
      education: ['ஹோட்டல் மேனேஜ்மென்ட்', 'குழந்தைகள் கல்வி', 'மருத்துவம்', 'உளவியல்'],
      marriageCompatibility: ['விருச்சிகம்', 'மீனம்', 'ரிஷபம்', 'கன்னி'],
      incompatibleRasis: ['மேஷம்', 'துலாம்', 'மகரம்'],
      luckyNumbers: [2, 7, 11, 16, 25, 29],
      luckyColors: ['வெள்ளை', 'வெள்ளி', 'கிரீம்', 'பால் நிறம்'],
      luckyDays: ['திங்கள்', 'வெள்ளி'],
      luckyStones: ['முத்து', 'மூன்ஸ்டோன்', 'ஓபல்'],
      metals: ['வெள்ளி', 'பிளாட்டினம்'],
      directions: ['வடமேற்கு', 'வடக்கு'],
      flowers: ['வெள்ளை தாமரை', 'மல்லிகை', 'சாமந்தி'],
      trees: ['வில்வம்', 'தென்னை', 'வாழை'],
      animals: ['நண்டு', 'கடல் விலங்குகள்', 'நாய்'],
      deities: ['பார்வதி', 'கெளரி', 'சந்திர பகவான்'],
      mantras: [
        'Om Chandraya Namah',
        'Om Gauryai Namah',
        'Karka Rasi Mantra'
      ],
      remedies: [
        'திங்கட்கிழமை சிவ வழிபாடு',
        'வெள்ளை வஸ்திரம் அணியவும்',
        'முத்து அணியவும்',
        'நீர் தானம் செய்யவும்'
      ],
      symbolUnicode: '♋',
      photoUrl: 'assets/rasi-images/karka.jpg', 
      chinnam: 'நண்டு - பாதுகாப்பு மற்றும் உணர்ச்சிவசம் தன்மையின் அடையாளம்',
      tamilMonth: 'ஆடி - ஆவணி',
      river: 'கங்கை',
      nakshatras: ['புனர்வசு (1/4)', 'புஷ்யம்', 'ஆஸ்லேஷா'],
      gems: ['முத்து', 'மூன்ஸ்டோன்', 'வெள்ளை கோரல்'],
      pathams108: [
        'Om Punarvasu Brahmane Namah', 'Om Pushya Brahmaspataye Namah', 'Om Ashlesha Bhujangaya Namah',
        'Om Karka Rashaya Namah', 'Om Chandra Grahaya Namah', 'Om Jala Tattvaya Namah',
        'சந்திர சரணம்', 'பார்வதி சரணம்', 'கெளரி சரணம்'
      ],
      pariharam: [
        'சந்திர கிரஹப் பீடிதம் நீங்க சிவ வழிபாடு',
        'வெள்ளை வஸ்திரம் தானம்',
        'பால் மற்றும் நீர் தானம்',
        'வெள்ளை தாமரை பூ சாத்து'
      ],
      varalakshmi: [
        'வெள்ளை மற்றும் வெள்ளி அலங்காரம்',
        'பவுர்ணமி விரதம்',
        'சந்திர மந்திரம்',
        'முத்து மாலை சாத்து'
      ],
      healthTips: [
        'வயிற்று பராமரிப்பு',
        'மன அழுத்தம் குறைக்கவும்',
        'நீர் அதிகம் குடிக்கவும்',
        'புளிப்பு தவிர்க்கவும்'
      ],
      financialTips: [
        'நீர் சம்பந்தப்பட்ட வணிகம்',
        'ரியல் எஸ்டேட் முதலீடு',
        'உணவு வணிகம் நல்லது',
        'பாதுகாப்பான முதலீடுகள்'
      ],
      relationshipTips: [
        'உணர்ச்சிகளை பகிருங்கள்',
        'குடும்ப நேரம் ஒதுக்குங்கள்',
        'பார்ட்னரை பாதுகாக்கவும்',
        'நம்பிக்கை வளர்க்கவும்'
      ]
    },
    {
      id: 'simha',
      number: 5,
      name: 'சிம்மம்',
      nameEnglish: 'Leo',
      sanskritName: 'Simha',
      symbol: 'சிங்கம்',
      element: 'அக்னி',
      rulingPlanet: 'சூரியன்',
      lordPlanet: 'சூரியன்',
      quality: 'ஃபிக்ஸ்ட்',
      gender: 'ஆண்',
      nature: 'தேஜஸ்',
      bodyParts: ['இதயம்', 'முதுகு', 'முதுகெலும்பு', 'மார்பு'],
      diseases: ['இதய நோய்கள்', 'முதுகு வலி', 'இரத்த அழுத்தம்', 'காய்ச்சல்'],
      characteristics: [
        'தலைமைத்துவம்',
        'பெருமை',
        'உதாரத்தனம்',
        'கலை ரசனை',
        'நம்பிக்கை'
      ],
      positiveTraits: ['தலைமை', 'தைரியம்', 'உதாரம்', 'விசுவாசம்', 'ஆற்றல்'],
      negativeTraits: ['ஆணவம்', 'அகந்தை', 'கோபம்', 'காட்சி அடிக்கதல்'],
      careerOptions: ['நடிப்பு', 'அரசியல்', 'நிர்வாகம்', 'விளையாட்டு', 'கலை'],
      businessSuitable: ['தங்க வணிகம்', 'ஆடம்பர பொருட்கள்', 'கலை வணிகம்', 'என்டர்டெயின்மென்ட்'],
      education: ['கலை', 'அரசியல் அறிவியல்', 'நிர்வாகம்', 'நடிப்பு'],
      marriageCompatibility: ['மேஷம்', 'தனுசு', 'மிதுனம்', 'துலாம்'],
      incompatibleRasis: ['ரிஷபம்', 'விருச்சிகம்', 'கும்பம்'],
      luckyNumbers: [1, 4, 10, 13, 19, 22],
      luckyColors: ['தங்க நிறம்', 'ஆரஞ்சு', 'சிவப்பு', 'மஞ்சள்'],
      luckyDays: ['ஞாயிறு', 'செவ்வாய்'],
      luckyStones: ['மாணிக்கம்', 'சூர்யகான்த மணி', 'அம்பர்'],
      metals: ['தங்கம்', 'செம்பு'],
      directions: ['கிழக்கு', 'வடகிழக்கு'],
      flowers: ['சூரியகாந்தி', 'மரிகோல்ட்', 'தங்க ரோஜா'],
      trees: ['அசோக்', 'சீமை கருவேலம்', 'தாமரை'],
      animals: ['சிங்கம்', 'புலி', 'பூனை'],
      deities: ['சூரிய பகவான்', 'நரசிம்மர்', 'அம்பிகை'],
      mantras: [
        'Om Suryaya Namah',
        'Om Nrisimhaya Namah',
        'Simha Rasi Mantra'
      ],
      remedies: [
        'ஞாயிற்றுக்கிழமை சூரிய வழிபாடு',
        'தங்க நிற உடைகள்',
        'மாணிக்கம் அணியவும்',
        'சூரிய நமஸ்காரம்'
      ],
      healthTips: [
        'இதய பராமரிப்பு',
        'முதுகு வலி தவிர்க்கவும்',
        'அதிக கோபம் தவிர்க்கவும்',
        'யோகா பயிற்சி'
      ],
      financialTips: [
        'தங்க முதலீடு நல்லது',
        'ஆடம்பர பொருட்கள் வணிகம்',
        'என்டர்டெயின்மென்ட் துறை',
        'பெரி��� திட்டங்களில் முதலீடு'
      ],
      relationshipTips: [
        'பெருமையை கட்டுப்படுத்தவும்',
        'பார்ட்னரை பாராட்டவும்',
        'கவனம் பகிர்ந்து கொள்ளவும்',
        'விசுவாசமாக இருங்கள்'
      ]
    },
    {
      id: 'kanya',
      number: 6,
      name: 'கன்னி',
      nameEnglish: 'Virgo',
      sanskritName: 'Kanya',
      symbol: 'கன்னி',
      element: 'பூமி',
      rulingPlanet: 'புதன்',
      lordPlanet: 'புதன்',
      quality: 'ஃபிக்ஸ்ட்',
      gender: 'பெண்',
      nature: 'பிருத்வி',
      bodyParts: ['தோல்', 'கண்', 'மூளை', 'கழுத்து'],
      diseases: ['தோல் பிரச்சினைகள்', 'கண் பிரச்சினைகள்', 'மூளை நோய்கள்', 'கழுத்து வலி'],
      characteristics: [
        'விவேகசாலித்தனம்',
        'அறிவுத்திறன்',
        'விருப்பம்',
        'சுய சிந்தனை',
        'விவரமானது'
      ],
      positiveTraits: ['அறிவு', 'விவேகம்', 'சுயமரியாதை', 'நிர்வாகம்', 'உதவி'],
      negativeTraits: ['அதிக விமர்சனம்', 'பிடிவாதம்', 'சோ���்பல்', 'மனமாறுதல்'],
      careerOptions: ['ஆசிரியர்', 'ஆராய்ச்சி', 'எழுத்து', 'வங்கி', 'மருத்துவம்'],
      businessSuitable: ['புத்தகங்கள்', 'கணினி', 'ஆராய்ச்சி', 'கல்வி'],
      education: ['கணிதம்', 'அறிவியல்', 'மருத்துவம்', 'உளவியல்'],
      marriageCompatibility: ['மிதுனம்', 'துலாம்', 'மேஷம்', 'சிம்மம்'],
      incompatibleRasis: ['கடகம்', 'மகரம்', 'விருச்சிகம்'],
      luckyNumbers: [5, 14, 23, 32, 41, 50],
      luckyColors: ['பச்சை', 'மஞ்சள்', 'வெள்ளை'],
      luckyDays: ['வியாழன்', 'திங்கள்'],
      luckyStones: ['எமரால்ட்', 'சோபா', 'வெள்ளி'],
      metals: ['வ���ள்ளி', 'பித்தளை'],
      directions: ['வடக்கு', 'மேற்கு'],
      flowers: ['வெள்ளை மல்லிகை', 'சாமந்தி', 'ஜெரானியம்'],
      trees: ['பனை', 'மாம்பழம்', 'சேலம்'],
      animals: ['குரங்கு', 'பறவை', 'முயல்'],
      deities: ['சரஸ்வதி', 'லட்ச்மி', 'விஷ்ணு'],
      mantras: [
        'Om Budhaya Namah',
        'Om Saraswati Namah',
        'Kanya Rasi Mantra'
      ],
      remedies: [
        'புதன்கிழமை சரஸ்வதி வழிபாடு',
        'பச்சை அல்லது வெள்ளை உடைகள்',
        'எமரால்ட் அல்லது சோபா அணியவும்',
        'கல்வி தொடர்பான தானம்'
      ],
      healthTips: [
        'தோல் மற்றும் கண்களை பாதுகாக்கவும்',
        'மூளை ஆரோக்கியம்',
        'கழுத்து வலியை தவிர்க்கவும்',
        'வழக்கமான உடற்பயிற்சி'
      ],
      financialTips: [
        'நிலையான முதலீடுகள்',
        'வங்கி சேவைகள்',
        'கல்வி மற்றும் ஆராய்ச்சி துறையில் முதலீடு',
        'புதிய தொழில்நுட்பங்களில் முதலீடு'
      ],
      relationshipTips: [
        'அன்பை வெளிப்படுத்தவும்',
        'பார்ட்னரின் கருத்துகளை மதிக்கவும்',
        'சமயத்தில் கவனம் செலுத்தவும்',
        'பொறுமையாக இருங்கள்'
      ]
    },
    {
      id: 'tula',
      number: 7,
      name: 'துலாம்',
      nameEnglish: 'Libra',
      sanskritName: 'Tula',
      symbol: 'தெராசு',
      element: 'வாயு',
      rulingPlanet: 'சுக்கிரன்',
      lordPlanet: 'சுக்கிரன்',
      quality: 'கார்டினல்',
      gender: 'ஆண்',
      nature: 'வாயு',
      bodyParts: ['இடுப்பு', 'சிறுநீரகம்', 'முதுகு கீழ் பகுதி'],
      diseases: ['சிறுநீரக பிரச்சினைகள்', 'இடுப்பு வலி', 'சர்க்கரை நோய்'],
      characteristics: [
        'சமநிலை',
        'நீதி உணர்வு',
        'அழகு உணர்வு',
        'இராஜதந்திரம்',
        'கூட்டு பணி'
      ],
      positiveTraits: ['நீத��', 'அழகு உணர்வு', 'நட்பு', 'சமநிலை', 'சமாதானம்'],
      negativeTraits: ['தீர்மானமின்மை', 'சோம்பல்', 'மற்றவர் சார்ந்து இருத்தல்'],
      careerOptions: ['சட்டம்', 'கலை', 'வடிவமைப்பு', 'இராஜதந்திரம்', 'ஆலோசனை'],
      businessSuitable: ['அழகு சாதனம்', 'ஃபேஷன்', 'நகைகள்', 'கலை'],
      education: ['சட்டம்', 'கலை', 'வடிவமைப்பு', 'சமூக அறிவியல்'],
      marriageCompatibility: ['ம��துனம்', 'கும்பம்', 'சிம்மம்', 'தனுசு'],
      incompatibleRasis: ['கடகம்', 'மகரம்', 'மேஷம்'],
      luckyNumbers: [6, 15, 24, 33, 42, 51],
      luckyColors: ['இளஞ்சிவப்பு', 'நீலம்', 'பச்சை', 'வெள்ளை'],
      luckyDays: ['வெள்ளி', 'சனி'],
      luckyStones: ['வைரம்', 'ஓபல்', 'சபைர்'],
      metals: ['வெள்ளி', 'தாமிரம்'],
      directions: ['மேற்கு', 'தென்கிழக்கு'],
      flowers: ['ரோஜா', 'அல்லி', 'ஆர்க்கிட்'],
      trees: ['ஆப்பிள்', 'அத்தி', 'சர்ரி'],
      animals: ['புறா', 'லிஸார்ட்', 'முயல்'],
      deities: ['லக்ஷ்மி', 'சரஸ்வதி', 'விஷ்ணு'],
      mantras: [
        'Om Shukraya Namah',
        'Om Shreem Namah',
        'Tula Rasi Mantra'
      ],
      remedies: [
        'வெள்ளிக்கிழமை லக்ஷ்மி வழிபாடு',
        'இளஞ்சிவப்பு வஸ்திரம்',
        'வைரம் அணியவும்',
        'நீதி சம்பந்தமான தானம்'
      ],
      healthTips: [
        'சிறுநீரக பராமரிப்பு',
        'இடுப்பு வலி தவிர்க்கவும்',
        'சமச்சீர் உணவு',
        'அதிக இனிப்பு தவிர்க்கவும்'
      ],
      financialTips: [
        'கூட்டு முதலீடுகள்',
        'அழகு சாதன வணிகம்',
        'கலை சம்பந்தமான முதலீடு',
        'பார்ட்னர்ஷிப் வணிகம்'
      ],
      relationshipTips: [
        'தீர்மானம் எடுக்க கற்றுக்கொள்ளுங்கள்',
        'சமநிலை பராமரிக்கவும்',
        'காதலை வெளிப்படுத்தவும்',
        'சர்ச்சைகளை தவிர்க்கவும்'
      ]
    },
    {
      id: 'vrischika',
      number: 8,
      name: 'விருச்சிகம்',
      nameEnglish: 'Scorpio',
      sanskritName: 'Vrischika',
      symbol: 'தேள்',
      element: 'நீர்',
      rulingPlanet: 'செவ்வாய்',
      lordPlanet: 'அங்காரகன்',
      quality: 'ஃபிக்ஸ்ட்',
      gender: 'பெண்',
      nature: 'ஜல',
      bodyParts: ['பிறப்புறுப்பு', 'மூலதனம்', 'மலக்குடல்'],
      diseases: ['பாலியல் நோய்கள்', 'மூல நோய்', 'இரத்த நோய்கள்'],
      characteristics: [
        'ஆழமான உணர்வுகள்',
        'ரகசிய விருப்பம்',
        'தீவிரம்',
        'மாற்றம்',
        'ஆராய்ச்சி மனப்பான்மை'
      ],
      positiveTraits: ['உறுதி', 'ஆராய்ச்சி', 'விசுவாசம்', 'தைரியம்', 'குணமாக்கும் சக்தி'],
      negativeTraits: ['பழிவாங்கும் குணம்', 'சந்தேகம்', 'கோபம்', 'ரகசியம்'],
      careerOptions: ['ஆராய்ச்சி', 'மருத்துவம்', 'உளவியல்', 'ஜாசூசி', 'அறுவை சிகிச்சை'],
      businessSuitable: ['ரசாயனம்', 'மருந்து', 'ஆராய்ச்சி', 'கண்டுபிடிப்பு'],
      education: ['மருத்துவம்', 'ஆராய்ச்சி', 'உளவியல்', 'ரசாயனம்'],
      marriageCompatibility: ['கடகம்', 'மீனம்', 'கன்னி', 'மகரம்'],
      incompatibleRasis: ['சிம்மம்', 'கும்பம்', 'ரிஷபம்'],
      luckyNumbers: [4, 13, 18, 22, 27, 31],
      luckyColors: ['சிவப்பு', 'மெரூன்', 'கருப்பு', 'அடக்கமான நிறங்கள்'],
      luckyDays: ['செவ்வாய்', 'வியாழன்'],
      luckyStones: ['பவளம்', 'டோபாஸ்', 'பெரிடோட்'],
      metals: ['இரும்பு', 'எஃகு'],
      directions: ['வடக்கு', 'தெற்கு'],
      flowers: ['சிவப்பு ரோஜா', 'மரிகோல்ட்', 'ஜெரானியம்'],
      trees: ['ப்ளாக்தோர்ன்', 'ஹோலி', 'ரோட்டன்ட்ரான்'],
      animals: ['தேள்', 'பாம்பு', 'கழுகு'],
      deities: ['காளி', 'துர்க்கா', 'ஹனுமான்'],
      mantras: [
        'Om Angarakaya Namah',
        'Om Mahakalyai Namah',
        'Vrischika Rasi Mantra'
      ],
      remedies: [
        'செவ்வாய்க்கிழமை ஹனுமான் வழிபாடு',
        'சிவப்பு வஸ்திரம்',
        'பவளம் அணியவும்',
        'காளி வழிபாடு'
      ],
      healthTips: [
        'பாலியல் ஆரோக்கியம்',
        'இரத்த பரிசோதனை வழக்கமாக',
        'மன அழுத்தம் குறைக்கவும்',
        'புகை, மதுவை தவிர்க்கவும்'
      ],
      financialTips: [
        'மருத்துவ ��ுறை முதலீடு',
        'ஆராய்ச்சி சம்பந்தமான பங்குகள்',
        'ரகசிய முதலீடுகள்',
        'நீண்�� கால திட்டங்கள்'
      ],
      relationshipTips: [
        'சந்தேகத்தை குறைக்கவும்',
        'வெளிப்படையாக இருங்கள்',
        'பழிவாங்கும் குணத்தை தவிர்க்கவும்',
        'ஆழமான பிணைப்பு உருவாக்குங்கள்'
      ]
    },
    {
      id: 'dhanu',
      number: 9,
      name: 'தனுசு',
      nameEnglish: 'Sagittarius',
      sanskritName: 'Dhanu',
      symbol: 'வில்லும் அம்பும்',
      element: 'அக்னி',
      rulingPlanet: 'குரு',
      lordPlanet: 'பிரகஸ்பதி',
      quality: 'மியூட்டபிள்',
      gender: 'ஆண்',
      nature: 'தேஜஸ்',
      bodyParts: ['தொடைகள்', 'இடுப்பு', 'கல்லீரல்'],
      diseases: ['தொடை பிரச்சினைகள்', 'இடுப்பு வலி', 'கல்லீரல் நோய்கள்'],
      characteristics: [
        'சாகசம்',
        'தத்துவம்',
        'சுதந்திரம்',
        'உற்சாகம்',
        'கல்வி விருப்பம்'
      ],
      positiveTraits: ['நேர்மை', 'சாகசம்', 'நம்பிக்கை', 'கற்பித்தல்', 'உற்சாகம்'],
      negativeTraits: ['அவசரம்', 'நிலையற்றது', 'அபிப்ராய முரண்பாடு', 'அதிக பேச்சு'],
      careerOptions: ['கல்வி', 'மதம்', 'பயணம���', 'வெளிநாட்டு வேலை', 'வெளியீடு'],
      businessSuitable: ['கல்வி', 'பயண சேவை', 'வெளியீடு', 'வெளிநாட்டு வணிகம்'],
      education: ['தத்துவம்', 'மதம்', 'சட்டம்', 'வெளிநாட்டு மொழி'],
      marriageCompatibility: ['மேஷம்', 'சிம்மம்', 'துலாம்', 'கும்பம்'],
      incompatibleRasis: ['கன்னி', 'மீனம்', 'மிதுனம்'],
      luckyNumbers: [3, 9, 12, 21, 30, 39],
      luckyColors: ['மஞ்சள்', 'ஆரஞ்சு', 'சிவப்பு', 'பர்பிள்'],
      luckyDays: ['வியாழன்', 'ஞாயிறு'],
      luckyStones: ['புஷ்பராகம்', 'சிட்ரின்', 'டர்கொய்ஸ்'],
      metals: ['தங்கம்', 'வெண்கலம்'],
      directions: ['வடகிழக்கு', 'கிழக்கு'],
      flowers: ['கார்னேஷன்', 'டாஃபோடில்', 'செர்ரி ப்ளாஸம்'],
      trees: ['ஓக்', 'பிர்ச்', 'முலபெர்ரி'],
      animals: ['குதிரை', 'சென்டார்', 'இலை'],
      deities: ['விஷ்ணு', 'குரு', 'ஹனுமான்'],
      mantras: [
        'Om Gurave Namah',
        'Om Brihaspataye Namah',
        'Dhanu Rasi Mantra'
      ],
      remedies: [
        'வியாழக்கிழமை விஷ்ணு வழிபாடு',
        'மஞ்சள் வஸ்திரம்',
        'புஷ்பராகம் அணியவும்',
        'கல்வி தானம்'
      ],
      healthTips: [
        'தொடை வலி தவிர்க்கவும்',
        'கல்லீரல் பராமரிப்பு',
        'அதிக உணவு தவிர்க்கவும்',
        'வழக்கமான உடற்பயிற���சி'
      ],
      financialTips: [
        'கல்வித் துறை முதலீடு',
        'வெளிநாட்டு முதலீடுகள்',
        'பயண சம்பந்தமான வணிகம்',
        'தத்துவ சம்பந்த புத்தகங்கள்'
      ],
      relationshipTips: [
        'சுதந்திரம் கொடுங்கள்',
        'புதிய இடங்களுக்கு பயணம்',
        'கல்வி விஷயங்களை பகிருங்கள்',
        'மனித��ேயம் காட்டுங்கள்'
      ]
    },
    {
      id: 'makara',
      number: 10,
      name: 'மகரம்',
      nameEnglish: 'Capricorn',
      sanskritName: 'Makara',
      symbol: 'முதலை',
      element: 'பூமி',
      rulingPlanet: 'சனி',
      lordPlanet: 'சனைஸ்வரன்',
      quality: 'கார்டினல்',
      gender: 'பெண்',
      nature: 'பிருத்வி',
      bodyParts: ['முழங்கால்கள்', 'எலும்புகள்', 'தோல்'],
      diseases: ['முழங்கால் பிரச்சினைகள்', 'எலும்பு நோய்கள்', 'மூட்டு வாதம்'],
      characteristics: [
        'பொறுப்பு உணர்வு',
        'லட்சிய உணர்வு',
        'கடுமை',
        'நடைமுறை அணுகுமுறை',
        'பொறுமை'
      ],
      positiveTraits: ['பொறுப்பு', 'கடுமை', 'லட்சியம்', 'நம்பகம்', 'நடைமுறை'],
      negativeTraits: ['கடுமை', 'பிடிவாதம்', 'அதிக எதிர்பார்ப்பு', 'சோகம்'],
      careerOptions: ['நிர்��ாகம்', 'அரசு', 'வங்கி', 'என்ஜினீயரிங்', 'கட்டுமானம்'],
      businessSuitable: ['ரியல் எஸ்டேட்', 'கட்டுமானம்', 'வங்கி', 'இயந்திரங்கள்'],
      education: ['என்ஜினீயரிங்', 'நிர்வாகம்', 'நிதி', 'கட்டடக்கலை'],
      marriageCompatibility: ['ரிஷபம்', 'கன்னி', 'விருச்சிகம்', 'மீனம்'],
      incompatibleRasis: ['மேஷம்', 'கடகம்', 'துலாம்'],
      luckyNumbers: [8, 10, 17, 26, 35, 44],
      luckyColors: ['கருப்பு', 'நீலம்', 'கிரே', 'பிரவுன்'],
      luckyDays: ['சனி', 'வியாழன்'],
      luckyStones: ['நீலம்', '⁣ஆனிக்ஸ்', 'கார்னெட்'],
      metals: ['இரும்பு', 'லேட்ஸ்'],
      directions: ['மேற்கு', 'தென்மேற்கு'],
      flowers: ['ஐவி', 'ப்ரிம்ரோஸ்', 'பான்சி'],
      trees: ['பைன்', 'எல்ம்', 'ப்ரர்'],
      animals: ['ஆடு', 'ஆமை', 'முதலை'],
      deities: ['சனி பகவான்', 'விநாயகர்', 'சிவன்'],
      mantras: [
        'Om Shanaischaraya Namah',
        'Om Shivaya Namah',
        'Makara Rasi Mantra'
      ],
      remedies: [
        'சனிக்கிழமை ஹனுமான் வழிபாடு',
        'கருப்பு வஸ்திரம்',
        'நீலம் அணியவும்',
        'ஏழைகளுக்கு தானம்'
      ],
      healthTips: [
        'முழங்கால் பராமரிப்பு',
        'எலும்பு வலிமைக்கு கால்சியம்',
        'சோகத்தை தவிர்க்கவும்',
        'வழக்கமான மருத்துவ பரிசோதனை'
      ],
      financialTips: [
        'நீண்ட கால முதலீடுகள்',
        'ரியல் எஸ்டேட் முதலீடு',
        'பாதுகாப்பான திட்டங்கள்',
        'பதற்றமில்லாத முதலீடு'
      ],
      relationshipTips: [
        'கடுமையை குறைக்கவும்',
        'வேலை மற்றும் வாழ்க்கையில் சமநிலை',
        'உணர்ச்சிகளை வெளிப்படுத்தவும்',
        'நேரம் ஒதுக்குங்கள்'
      ]
    },
    {
      id: 'kumbha',
      number: 11,
      name: 'கும்பம்',
      nameEnglish: 'Aquarius',
      sanskritName: 'Kumbha',
      symbol: 'நீர் குடம்',
      element: 'வாயு',
      rulingPlanet: 'சனி',
      lordPlanet: 'சனைஸ்வரன்',
      quality: 'ஃபிக்ஸ்ட்',
      gender: '���ண்',
      nature: 'வாயு',
      bodyParts: ['கணுக்கால்கள்', 'கால்கள்', 'இரத்த ஓட்டம்'],
      diseases: ['கணுக்கால் பிரச்சினைகள்', 'இரத்த ஓட்ட பிரச்சினைகள்', 'நரம்பு பிரச்சினைகள்'],
      characteristics: [
        'சுதந்திர சிந்தனை',
        'புரட்சிகர எண்ணம்',
        'மனிதநேயம்',
        'நவீனம்',
        'தனித்துவம்'
      ],
      positiveTraits: ['சுதந்திரம்', 'நவீனம்', 'மனிதநேயம்', 'நேர்மை', 'நட்பு'],
      negativeTraits: ['பிடிவாதம்', 'ஏகாந்த விருப்பம்', 'உணர்ச்சி அற்றது', 'கொள்ளை நேரம்'],
      careerOptions: ['தொழில்நுட்பம்', 'விஞ்ஞானம்', 'சமூக சேவை', 'கண்டுபிடிப்பு', 'ஆராய்ச்சி'],
      businessSuitable: ['தொழில்நுட்பம்்', 'வானொலி-தொலைக்காட்சி', 'கணினி', 'விஞ்ஞானம்'],
      education: ['தொழில்நுட்பம்', 'விஞ்ஞானம்', 'சமூகவியல்', 'கணினி'],
      marriageCompatibility: ['மிதுனம்', 'துலாம்', 'மேஷம்', 'தனுசு'],
      incompatibleRasis: ['ரிஷபம்', 'சிம்மம்', 'விருச்சிகம்'],
      luckyNumbers: [4, 8, 13, 17, 22, 26],
      luckyColors: ['நீலம்', 'பச்சை', 'தூர்க்வொய்ஸ்', 'அக்வா'],
      luckyDays: ['சனி', 'ஞாயிறு'],
      luckyStones: ['அமெதிஸ்��்', 'அக்வாமரைன்', 'கார்னெட்'],
      metals: ['ஈயம்', 'அலுமினியம்'],
      directions: ['மேற்கு', 'தென்மேற்கு'],
      flowers: ['ஆர்க்கிட்', 'பர்ட் ஆப் பாரடைஸ்', 'கோல்டன் ரேன்'],
      trees: ['ஃப்ரூட் ட்ரீஸ்', 'ரேடியம் ட்ரீ', 'ப்யூரிஃபயர் ட்ரீஸ்'],
      animals: ['பெரிய பறவைகள்', 'கழுகு', 'அல்லிகெடர்'],
      deities: ['வரு��ன்', 'சனி பகவான்', 'இந்திரன்'],
      mantras: [
        'Om Shanaischaraya Namah',
        'Om Varunaya Namah',
        'Kumbha Rasi Mantra'
      ],
      remedies: [
        'சனிக்கிழமை சனி வழிபாடு',
        'நீல வஸ்திரம்',
        'அமெதிஸ்ட் அணியவும்',
        'சமூக சேவை செய்யவும்'
      ],
      healthTips: [
        'கணுக்கால் பரா���ரிப்பு',
        'இரத்த ஓட்டம் மேம்படுத்தவும்',
        'மன அழுத்��ம் குறைக்கவும்',
        'நல்ல கால்சலை அணியவும்'
      ],
      financialTips: [
        'தொழில்நுட்ப பங்குகள்',
        'புதுமையான முதலீடுகள்',
        'சமூக வணிகம்',
        'குழு முதலீடுகள்'
      ],
      relationshipTips: [
        'சுதந்திரம் கொடுங்கள்',
        'புதுமைகளை பகிருங்கள்',
        'நண்பர்களுடன் நேரம் செலவிடுங்கள்',
        'உணர்ச்சிகளை வெளிப்படுத்தவும்'
      ]
    },
    {
      id: 'meena',
      number: 12,
      name: 'மீனம்',
      nameEnglish: 'Pisces',
      sanskritName: 'Meena',
      symbol: 'இரண்டு மீன்கள்',
      element: 'நீர்',
      rulingPlanet: 'குரு',
      lordPlanet: 'பிரகஸ்பதி',
      quality: 'மியூட்டபிள்',
      gender: 'பெண்',
      nature: 'ஜல',
      bodyParts: ['கால்கள்', 'இம்யூன் சிஸ்டம்', 'லிம்ஃபாட்டிக் சிஸ்டம்'],
      diseases: ['கால் பிரச்சினைகள்', 'அலர்ஜி', 'உணர்ச்சி பிரச்சினைகள்'],
      characteristics: [
        'கற்பனை சக்தி',
        'அனுதாபம்',
        'ஆன்மீகம்',
        'கலை திறன்',
        'உள்ளுணர்வு'
      ],
      positiveTraits: ['அனுதாபம்', 'கற்பனை', 'கலை', 'ஆன்மீகம்', 'உதவும் குணம்'],
      negativeTraits: ['அதிக உணர்ச்சி', 'நிலையற்றது', 'தெளிவின்மை', 'சோம்பல்'],
      careerOptions: ['கலை', 'இசை', 'ஆன்மீகம்', 'சமூக சேவை', 'மருத்துவம்'],
      businessSuitable: ['மருந்து', 'திரவங்கள்', 'கலை', 'மருத்���ுவம்'],
      education: ['கலை', 'இசை', 'ஆன்மீகம்', 'உளவியல்', 'மருத்துவம்'],
      marriageCompatibility: ['கடகம்', 'விருச்சிகம்', 'ரிஷபம்', 'மகரம்'],
      incompatibleRasis: ['மிதுனம்', 'தனுசு', 'கன்னி'],
      luckyNumbers: [3, 7, 12, 16, 21, 25],
      luckyColors: ['கடல் பச்சை', 'வெள்ளை', 'பர்பிள்', 'சில்வர்'],
      luckyDays: ['வியாழன்', 'திங்கள்'],
      luckyStones: ['அமெதிஸ்ட்', 'அக்வாமரைன்', 'புஷ்பராகம்'],
      metals: ['டின்', 'பிளாட்டினம்'],
      directions: ['வடகிழக்கு', 'வடக்கு'],
      flowers: ['வாட்டர் லில்லி', 'பெளர்', 'ஜாஸ்மின்'],
      trees: ['வில்லோ', 'எல்ம்', 'ஃபிக் ட்ரீ'],
      animals: ['மீன்', 'டால்ஃபின்', 'சீல்'],
      deities: ['விஷ்ணு', 'வருணன்', 'சரஸ்வதி'],
      mantras: [
        'Om Gurave Namah',
        'Om Varunaya Namah',
        'Meena Rasi Mantra'
      ],
      remedies: [
        'வியாழக்கிழமை விஷ்ணு வழிபாடு',
        'வெள்ளை வஸ்திரம்',
        'புஷ்பராகம் அணியவும்',
        'நீர் தானம் செய்யவும்'
      ],
      healthTips: [
        'கால் பராமரிப்பு',
        'அலர்ஜி பரிசோதனை',
        'மன நிலை பராமரிப்பு',
        'நீர் அதிகம் குடிக்கவும்'
      ],
      financialTips: [
        'கலை சம்பந்தமான முதலீடு',
        'ஆன்மீக வணிகம்',
        'மருத்துவ துறை',
        'உள்ளுணர்வு அடிப்படையில் முதலீடு'
      ],
      relationshipTips: [
        'உணர்ச்சிகளை பகிருங்கள்',
        'கலை மற்றும் இசையை பகிருங்கள்',
        'ஆன்மீக பயணம் செய்யுங்கள்',
        'அனுதாபம் காட்டுங்கள்'
      ]
    }
  ];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.filteredRasis = this.rasis;
    this.updateFilteredRasis();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  bookmarkRasi() {
    this.isBookmarked = !this.isBookmarked;
    const message = this.isBookmarked ? 'Added to bookmarks' : 'Removed from bookmarks';
    this.presentToast(message);
  }

  toggleAnalysis() {
    this.showAnalysisView = !this.showAnalysisView;
  }

  selectRasi(index: number) {
    this.currentRasiIndex = index;
    this.showAnalysisView = false;
  }

  applyFilter() {
    if (this.selectedFilter === 'all') {
      this.filteredRasis = this.rasis;
    } else {
      this.filteredRasis = this.rasis.filter(rasi => rasi.quality === this.selectedFilter);
    }
  }

  goToDetailPage(rasi: Rasi) {
    this.router.navigate(['/rasi-detail', { rasi: JSON.stringify(rasi) }]);
  }

  // New methods for the beautiful UI

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
  }

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    this.presentToast(this.isBookmarked ? 'புத்தகக்குறி சேர்க்கப்பட்டது' : 'புத்தகக்குறி நீக்கப்பட்டது');
  }

  navigateToRasis() {
    this.selectedSegment = 'rasis';
  }

  searchRasis() {
    this.updateFilteredRasis();
  }

  filterByElement(element: string) {
    this.selectedElement = element;
    this.updateFilteredRasis();
  }

  updateFilteredRasis() {
    this.filteredRasis = this.getFilteredRasis();
  }

  getFilteredRasis(): Rasi[] {
    let filtered = this.rasis;
    
    // Filter by element
    if (this.selectedElement !== 'all') {
      filtered = filtered.filter(r => r.element === this.selectedElement);
    }

    // Filter by search term
    if (this.searchTerm) {
      filtered = filtered.filter(r => 
        r.name.includes(this.searchTerm) || 
        r.nameEnglish.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.sanskritName.includes(this.searchTerm)
      );
    }

    return filtered;
  }

  getElementColor(element: string): string {
    switch (element) {
      case 'அக்னி': return 'danger';
      case 'பூமி': return 'success';
      case 'வாயு': return 'tertiary';
      case 'நீர்': return 'secondary';
      default: return 'medium';
    }
  }

  getElementIcon(element: string): string {
    switch (element) {
      case 'அக்னி': return 'flame';
      case 'பூமி': return 'earth';
      case 'வாயு': return 'cloud';
      case 'நீர்': return 'water';
      default: return 'help';
    }
  }

  toggleRasiExpansion(rasi: Rasi) {
    rasi.expanded = !rasi.expanded;
  }

  togglePathams() {
    this.showAllPathams = !this.showAllPathams;
  }

  async showDetailedInfo(rasi: Rasi) {
    const alert = await this.alertController.create({
      header: rasi.name,
      subHeader: rasi.nameEnglish,
      message: `
        <strong>சின্নम:</strong> ${rasi.symbol}<br>
        <strong>தत্துवম:</strong> ${rasi.element}<br>
        <strong>அதিপতি:</strong> ${rasi.rulingPlanet}<br>
        <strong>தমিழ் মাসম:</strong> ${rasi.tamilMonth || 'N/A'}<br>
        <strong>নদী:</strong> ${rasi.river || 'N/A'}
      `,
      buttons: ['சরি']
    });

    await alert.present();
  }

  async showCompatibility(rasi: Rasi) {
    this.selectedSegment = 'compatibility';
    this.compatibilityRasi1 = rasi;
  }

  getCurrentRasi(): Rasi {
    return this.rasis[this.currentRasiIndex];
  }

  previousRasi() {
    if (this.currentRasiIndex > 0) {
      this.currentRasiIndex--;
    }
  }

  nextRasi() {
    if (this.currentRasiIndex < this.rasis.length - 1) {
      this.currentRasiIndex++;
    }
  }

  checkCompatibility() {
    if (!this.compatibilityRasi1 || !this.compatibilityRasi2) return;

    // Simple compatibility logic based on elements and compatibility arrays
    const rasi1 = this.compatibilityRasi1;
    const rasi2 = this.compatibilityRasi2;

    let score = 50; // Base score
    let level = 'average';
    let description = 'சராসरி பொருத্তম';
    let details = '';

    // Check if they are in each other's compatibility list
    if (rasi1.marriageCompatibility?.includes(rasi2.name) || 
        rasi2.marriageCompatibility?.includes(rasi1.name)) {
      score += 30;
      level = 'excellent';
      description = 'மிகச் சிறপ্ত பொருத্তম';
      details = 'இரண্டு ராসিকळും একে অপরের সাথে খুব ভাল পொরুত্ত।';
    } else if (rasi1.incompatibleRasis?.includes(rasi2.name) || 
               rasi2.incompatibleRasis?.includes(rasi1.name)) {
      score -= 30;
      level = 'challenging';
      description = 'கষ্টকর পொরুত্ত';
      details = 'এই দুই ראসি একসাথে চ্যালেঞ্জিং হতে পারে।';
    } else {
      // Check element compatibility
      if (rasi1.element === rasi2.element) {
        score += 10;
        details = 'একই তত্ত্বের কারणে ভাল বোঝাপড়া।';
      } else if ((rasi1.element === 'অগ্নি' && rasi2.element === 'বায়ু') ||
                 (rasi1.element === 'বায়ু' && rasi2.element === 'অগ্নি') ||
                 (rasi1.element === 'পৃথিবী' && rasi2.element === 'জল') ||
                 (rasi1.element === 'জল' && rasi2.element === 'পৃথিবী')) {
        score += 15;
        details = 'তত্ত্বের সামঞ্জস্যের কারণে ভাল মিল।';
      }
      
      if (score >= 70) {
        level = 'good';
        description = 'ভাল পொরुত্ত';
      }
    }

    this.compatibilityResult = {
      score: Math.min(Math.max(score, 0), 100),
      level: level,
      description: description,
      details: details
    };
  }
}
