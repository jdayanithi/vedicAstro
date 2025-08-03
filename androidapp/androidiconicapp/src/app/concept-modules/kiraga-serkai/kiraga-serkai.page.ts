import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface KiragaSerkai {
  id: string;
  name: string;
  englishName: string;
  planets: string[];
  description: string;
  characteristics: string[];
  palangal: string[];
  vazhviayalPariharam: {
    title: string;
    practices: string[];
    materials: string[];
    timings: string[];
  };
  templePariharam: {
    temples: string[];
    offerings: string[];
    prayers: string[];
    specialDays: string[];
  };
  effects: {
    positive: string[];
    negative: string[];
    remedial: string[];
  };
}

@Component({
  selector: 'app-kiraga-serkai',
  templateUrl: './kiraga-serkai.page.html',
  styleUrls: ['./kiraga-serkai.page.scss'],
})
export class KiragaSerkaiPage implements OnInit {
  searchTerm: string = '';
  isModalOpen: boolean = false;
  selectedKiragaSerkai: KiragaSerkai | null = null;
  filteredKiragaSerkai: KiragaSerkai[] = [];
  completedKiragaSerkai: string[] = [];
  favoriteKiragaSerkai: string[] = [];

  kiragaSerkaiList: KiragaSerkai[] = [
    {
      id: 'surya-chandra',
      name: 'சூரிய சந்திர கிரக சேர்க்கை',
      englishName: 'Sun-Moon Combination',
      planets: ['சூரியன்', 'சந்திரன்'],
      description: 'சூரியன் மற்றும் சந்திரன் சேர்க்கை ஒருவரின் ஆன்மா மற்றும் மனதின் ஒற்றுமையை குறிக்கிறது.',
      characteristics: [
        'வலுவான தலைமைத்துவ குணங்கள்',
        'உணர்ச்சி வசப்படாமல் சிந்திக்கும் திறன்',
        'பிதா மாதா ஆசீர்வாதம்',
        'ராஜ யோக பலன்கள்'
      ],
      palangal: [
        'அரசு பதவி வாய்ப்பு',
        'குடும்ப மரியாதை அதிகரிப்பு',
        'மன அமைதி',
        'செல்வாக்கு பெருக்கம்'
      ],
      vazhviayalPariharam: {
        title: 'வாழ்வியல் பரிகாரம்',
        practices: [
          'தினமும் காலை சூரிய நமஸ்காரம்',
          'பூர்ணிமை தினம் சந்திர தரிசனம்',
          'தாய் தந்தையருக்கு சேவை',
          'பால் தானம்'
        ],
        materials: [
          'செம்பு பாத்திரத்தில் நீர் வைத்து சூரிய ஒளியில் காய்ச்சி பருகுதல்',
          'வெள்ளி நகை அணிதல்',
          'சிவப்பு மற்றும் வெள்ளை உடை',
          'கோமூத்திர ஆர்க் உபயோகம்'
        ],
        timings: [
          'சூரிய உதயத்தில் தியானம்',
          'பூர்ணிமை இரவு பூஜை',
          'ஞாயிறு மற்றும் திங்கள் விரதம்',
          'சங்கிராந்தி காலம் சிறப்பு வழிபாடு'
        ]
      },
      templePariharam: {
        temples: [
          'திருவண்ணாமலை அருணாசலேஸ்வரர் கோவில்',
          'திருவாரூர் தியாகராஜர் கோவில்',
          'சிதம்பரம் நடராஜர் கோவில்',
          'கோணேஸ்வரம் கோவில்'
        ],
        offerings: [
          'வெண்ணெய் அர்ச்சனை',
          'பால் அபிஷேகம்',
          'செங்கழுநீர் மாலை',
          'தாமரை பூ சமர்ப்பணம்'
        ],
        prayers: [
          'ஆதித்ய ஹ்ருதயம்',
          'சந்திர சாலிசா',
          'சிவ பஞ்சாக்ஷர மந்திரம்',
          'மகாலக்ஷ்மி ஸ்தோத்திரம்'
        ],
        specialDays: [
          'ஞாயிற்றுக்கிழமை',
          'திங்கட்கிழமை',
          'பூர்ணிமை',
          'அமாவாசை'
        ]
      },
      effects: {
        positive: [
          'உயர் பதவி பெறுதல்',
          'குடும்ப ஒற்றுமை',
          'மன பலம்',
          'ஆரோக்கியம்'
        ],
        negative: [
          'அகம்பாவம்',
          'கோபம்',
          'மன உளைச்சல்',
          'குடும்ப பிரச்னை'
        ],
        remedial: [
          'தான தர்மம்',
          'சுய கட்டுப்பாடு',
          'யோக பயிற்சி',
          'தியானம்'
        ]
      }
    },
    {
      id: 'surya-mangal',
      name: 'சூரிய செவ்வாய் கிரக சேர்க்கை',
      englishName: 'Sun-Mars Combination',
      planets: ['சூரியன்', 'செவ்வாய்'],
      description: 'சூரியன் மற்றும் செவ்வாய் சேர்க்கை வீரம், தைரியம் மற்றும் ஆற்றலை வழங்குகிறது.',
      characteristics: [
        'போர்வீரன் குணங்கள்',
        'தலைமைத்துவம்',
        'விரைவான முடிவெடுக்கும் திறன்',
        'உடல் வலிமை'
      ],
      palangal: [
        'இராணுவ சேவை வாய்ப்பு',
        'விளையாட்டில் சாதனை',
        'தொழில் வெற்றி',
        'எதிரிகள் மீது வெற்றி'
      ],
      vazhviayalPariharam: {
        title: 'வாழ்வியல் பரிகாரம்',
        practices: [
          'தினமும் ஹனுமான் சாலிசா பாராயணம்',
          'செவ்வாய்க்கிழமை உபவாசம்',
          'சூரிய நமஸ்காரம்',
          'உடற்பயிற்சி'
        ],
        materials: [
          'சிவப்பு பவளம் அணிதல்',
          'செம்பு பாத்திரம் உபயோகம்',
          'சிவப்பு உடை',
          'குங்குமம் பூசுதல்'
        ],
        timings: [
          'செவ்வாய்க்கிழமை காலை',
          'அங்காரக ஹோரை',
          'சூரிய உதயம்',
          'மங்கள வார விரதம்'
        ]
      },
      templePariharam: {
        temples: [
          'பழனி முruகன் கோவில்',
          'திருச்செந்தூர் முருகன் கோவில்',
          'வைத்தீஸ்வரன் கோவில்',
          'ஹனுமான் கோவில்கள்'
        ],
        offerings: [
          'வெல்லம் பொங்கல்',
          'சிவப்பு பூ மாலை',
          'எண்ணெய் அர்ச்சனை',
          'வேல் பூஜை'
        ],
        prayers: [
          'சுப்ரபாத ஸ்தோத்திரம்',
          'ஹனுமான் சாலிசா',
          'முருக பெருமான் வேல் வழிபாடு',
          'மங்கள ஸ்தோத்திரம்'
        ],
        specialDays: [
          'செவ்வாய்க்கிழமை',
          'ஞாயிற்றுக்கிழமை',
          'கார்த்திகை நட்சத்திரம்',
          'அசுவினி நட்சத்திரம்'
        ]
      },
      effects: {
        positive: [
          'தைரியம்',
          'வீரம்',
          'தலைமைத்துவம்',
          'உடல் வலிமை'
        ],
        negative: [
          'கோபம்',
          'அவசரப்படுதல்',
          'வன்முறை சிந்தனை',
          'விபத்து வாய்ப்பு'
        ],
        remedial: [
          'பொறுமை பயிற்சி',
          'தியானம்',
          'மன அமைதி',
          'ஆன்மீக வழிபாடு'
        ]
      }
    },
    {
      id: 'surya-budhan',
      name: 'சூரிய புதன் கிரக சேர்க்கை',
      englishName: 'Sun-Mercury Combination',
      planets: ['சூரியன்', 'புதன்'],
      description: 'சூரியன் மற்றும் புதன் சேர்க்கை அறிவு, பேச்சுத்திறன் மற்றும் தொழில் நுணுக்கத்தை வழங்குகிறது.',
      characteristics: [
        'சிறந்த பேச்சுத்திறன்',
        'கூர்மையான அறிவு',
        'தொழில் நுணுக்கம்',
        'எழுத்து திறன்'
      ],
      palangal: [
        'கல்வியில் சிறப்பு',
        'தொழில் முன்னேற்றம்',
        'புத்தக வெளியீடு',
        'ஊடக துறையில் வெற்றி'
      ],
      vazhviayalPariharam: {
        title: 'வாழ்வியல் பரிகாரம்',
        practices: [
          'தினமும் சரஸ்வதி வந்தனம்',
          'புத்தகம் படித்தல்',
          'கீதை பாராயணம்',
          'மௌனம் கடைப்பிடித்தல்'
        ],
        materials: [
          'பச்சை நிற உடை அணிதல்',
          'மரகத ரத்தினம்',
          'துளசி மாலை',
          'பஞ்சமுக ருத்ராக்ஷம்'
        ],
        timings: [
          'புதன்கிழமை காலை',
          'பிரம்ம முহூர்த்தம்',
          'புதன் ஹோரை',
          'சூரிய உதய வேளை'
        ]
      },
      templePariharam: {
        temples: [
          'சரஸ்வதி கோவில்கள்',
          'திருவையாறு சரஸ்வதி கோவில்',
          'வெங்கடேஸ்வர கோவில்',
          'மன்னார்குடி ராஜகோபால கோவில்'
        ],
        offerings: [
          'பச்சை வஸ்திரம்',
          'பூ மாலை',
          'தேன் நிவேதனம்',
          'சரஸ்வதி வீணை அர்ப்பணம்'
        ],
        prayers: [
          'சரஸ்வதி ஸ்தோத்திரம்',
          'வேத பாராயணம்',
          'விஷ்ணு சஹஸ்ரநாமம்',
          'மேதா ஸுக்த'
        ],
        specialDays: [
          'புதன்கிழமை',
          'ஞாயிற்றுக்கிழமை',
          'சரஸ்வதி பூஜை',
          'வாசந்த பஞ்சமி'
        ]
      },
      effects: {
        positive: [
          'அறிவுத்திறன் அதிகரிப்பு',
          'தொழில் திறமை',
          'பேச்சு சக்தி',
          'கல்வி ஆர்வம்'
        ],
        negative: [
          'அதிக சிந்தனை',
          'குழப்பம்',
          'அவசரப்படுதல்',
          'மன அழுத்தம்'
        ],
        remedial: [
          'தியானம்',
          'ஆன்மீக படிப்பு',
          'யோக பயிற்சி',
          'பிராணாயாமம்'
        ]
      }
    },
    {
      id: 'surya-guru',
      name: 'சூரிய குரு கிரக சேர்க்கை',
      englishName: 'Sun-Jupiter Combination',
      planets: ['சூரியன்', 'குரு'],
      description: 'சூரியன் மற்றும் குரு சேர்க்கை ஞானம், நீதி மற்றும் ஆன்மீக உயர்வை வழங்குகிறது.',
      characteristics: [
        'ஞான சிந்தனை',
        'நீதி உணர்வு',
        'ஆன்மீக ஆர்வம்',
        'அறக்கட்டளை மனப்பான்மை'
      ],
      palangal: [
        'அரசாங்க பதவி',
        'ஆன்மீக குருத்துவம்',
        'நீதித்துறை வேலை',
        'சமூக மரியாதை'
      ],
      vazhviayalPariharam: {
        title: 'வாழ்வியல் பரிகாரம்',
        practices: [
          'தினமும் விஷ்ணு சஹஸ்ரநாமம்',
          'வியாழக்கிழமை விரதம்',
          'குரு மந்திர ஜபம்',
          'வேத பாராயணம்'
        ],
        materials: [
          'மஞ்சள் நிற உடை',
          'புஷ்பராகம் ரத்தினம்',
          'ருத்ராக்ஷ மாலை',
          'கோல்டன் ஆபரணங்கள்'
        ],
        timings: [
          'வியாழக்கிழமை காலை',
          'குரு ஹோரை',
          'பிரம்ம முহூர்த்தம்',
          'சூரிய உதய வேளை'
        ]
      },
      templePariharam: {
        temples: [
          'திருப்பதி வெங்கடேஸ்வர கோவில்',
          'அல்வார் திருநகரி',
          'திருவரங்கம் ரங்கநாத கோவில்',
          'கும்பகோணம் சாரங்கபாணி கோவில்'
        ],
        offerings: [
          'மஞ்சள் வஸ்திரம்',
          'பாதாம் பராமி',
          'வெண்ணெய் நிவேதனம்',
          'மஞ்சள் பூ மாலை'
        ],
        prayers: [
          'விஷ்ணு சஹஸ்ரநாமம்',
          'புருஷ சுக்தம்',
          'நாராயண ஸ்தவ',
          'பஜகோவிந்தம்'
        ],
        specialDays: [
          'வியாழக்கிழமை',
          'ஞாயிற்றுக்கிழமை',
          'புனர்வசு நட்சத்திரம்',
          'விசாகம் நட்சத்திரம்'
        ]
      },
      effects: {
        positive: [
          'ஞான வளர்ச்சி',
          'நீதி உணர்வு',
          'அறிவுத்திறன்',
          'ஆன்மீக முன்னேற்றம்'
        ],
        negative: [
          'அகம்பாவம்',
          'கர்வம்',
          'அதிக எதிர்பார்ப்பு',
          'மற்றவர்களை குறை கூறுதல்'
        ],
        remedial: [
          'தான தர்மம்',
          'பணிவு',
          'ஆன்மீக சாதனை',
          'கருணை பண்பு'
        ]
      }
    },
    {
      id: 'surya-sukran',
      name: 'சூரிய சுக்ர கிரக சேர்க்கை',
      englishName: 'Sun-Venus Combination',
      planets: ['சூரியன்', 'சுக்ரன்'],
      description: 'சூரியன் மற்றும் சுக்ரன் சேர்க்கை கலை, அழகு மற்றும் காதல் விஷயங்களில் ஆர்வத்தை வழங்குகிறது.',
      characteristics: [
        'கலை ஆர்வம்',
        'அழகு உணர்வு',
        'காதல் பிரியர்',
        'செல்வ ஆசை'
      ],
      palangal: [
        'கலைத்துறையில் வெற்றி',
        'அழகு தொழில்',
        'திருமண சுபம்',
        'பொருளாதார வெற்றி'
      ],
      vazhviayalPariharam: {
        title: 'வாழ்வியல் பரிகாரம்',
        practices: [
          'வெள்ளிக்கிழமை மஹாலக்ஷ்மி வழிபாடு',
          'சுக்ர மந்திர ஜபம்',
          'கலை பயிற்சி',
          'தாமரை பூ வழிபாடு'
        ],
        materials: [
          'வெள்ளை மற்றும் இளம் நிற உடை',
          'வைரம் அல்லது ஜிர்கன்',
          'வெள்ளி ஆபரணங்கள்',
          'சந்தன திலகம்'
        ],
        timings: [
          'வெள்ளிக்கிழமை காலை',
          'சுக்ர ஹோரை',
          'சூரிய உதய வேளை',
          'பிற்பகல் வேளை'
        ]
      },
      templePariharam: {
        temples: [
          'மஹாலக்ஷ்மி கோவில்கள்',
          'கன்னிமார அம்மன் கோவில்',
          'காமாக்ஷி அம்மன் கோவில்',
          'லக்ஷ்மி நரசிம்மர் கோவில்'
        ],
        offerings: [
          'வெள்ளை வஸ்திரம்',
          'தாமரை பூ',
          'தேன் நிவேதனம்',
          'செல்வி கல்யாண அலங்காரம்'
        ],
        prayers: [
          'மஹாலக்ஷ்மி அஷ்டகம்',
          'சுக்ர காவசம்',
          'தாமரை பூ ஆராதனை',
          'அம்பிகை மாலை'
        ],
        specialDays: [
          'வெள்ளிக்கிழமை',
          'ஞாயிற்றுக்கிழமை',
          'பரணி நட்சத்திரம்',
          'பூரட்டாதி நட்சத்திரம்'
        ]
      },
      effects: {
        positive: [
          'கலை திறமை',
          'அழகு உணர்வு',
          'செல்வம்',
          'பிரபல்யம்'
        ],
        negative: [
          'செல்வ மோகம்',
          'கலையில் அதிக ஈடுபாடு',
          'காதல் பிரச்னை',
          'ஆடம்பர வாழ்க்கை'
        ],
        remedial: [
          'நடுநிலைமை',
          'ஆன்மீக வாழ்க்கை',
          'தான தர்மம்',
          'சுய கட்டுப்பாடு'
        ]
      }
    },
    {
      id: 'surya-sani',
      name: 'சூரிய சனி கிரக சேர்க்கை',
      englishName: 'Sun-Saturn Combination',
      planets: ['சூரியன்', 'சனி'],
      description: 'சூரியன் மற்றும் சனி சேர்க்கை கடின உழைப்பு, பொறுமை மற்றும் நீதியை வழங்குகிறது.',
      characteristics: [
        'கடும் உழைப்பு',
        'பொறுமை',
        'நீதி உணர்வு',
        'தாமதமான வெற்றி'
      ],
      palangal: [
        'நீண்ட கால வெற்றி',
        'நீதித்துறை பணி',
        'கர்ம சுத்தி',
        'ஆன்மீக முன்னேற்றம்'
      ],
      vazhviayalPariharam: {
        title: 'வாழ்வியல் பரிகாரம்',
        practices: [
          'சனிக்கிழமை விரதம்',
          'ஹனுமான் வழிபாடு',
          'சனி மந்திர ஜபம்',
          'தான தர்மம்'
        ],
        materials: [
          'கருநிற உடை',
          'நீலகல் ரத்தினம்',
          'இரும்பு வளையல்',
          'எண்ணெய் தான'
        ],
        timings: [
          'சனிக்கிழமை மாலை',
          'சனி ஹோரை',
          'சூரிய அஸ்தமன வேளை',
          'இரவு நேர வழிபாடு'
        ]
      },
      templePariharam: {
        temples: [
          'திருநல்லாறু தர்பாரண்யேஸ்வரர் கோவில்',
          'ஹனுமான் கோவில்கள்',
          'சனீஸ்வர கோவில்கள்',
          'ஐயப்பன் கோவில்கள்'
        ],
        offerings: [
          'கருப்பு எள்',
          'எண்ணெய் தீபம்',
          'கருநிற வஸ்திரம்',
          'இரும்பு பாத்திரங்கள்'
        ],
        prayers: [
          'ஹனுமான் சாலிசா',
          'சனி காவசம்',
          'மிருத்யுஞ்ஜய மந்திரம்',
          'சிவ பஞ்சாக்ஷர மந்திரம்'
        ],
        specialDays: [
          'சனிக்கிழமை',
          'ஞாயிற்றுக்கிழமை',
          'புஷ்ய நட்சத்திரம்',
          'உத்திரட்டாதி நட்சத்திரம்'
        ]
      },
      effects: {
        positive: [
          'கடின உழைப்பு',
          'பொறுமை',
          'நீதி உணர்வு',
          'ஆன்மீக வளர்ச்சி'
        ],
        negative: [
          'தாமதம்',
          'போராட்டம்',
          'மன அழுத்தம்',
          'தந்தையுடன் பிரச்னை'
        ],
        remedial: [
          'பொறுமை',
          'ஆன்மீக சாதனை',
          'சமூக சேவை',
          'தான தர்மம்'
        ]
      }
    },
    // Continue with Moon combinations...
    {
      id: 'chandra-mangal',
      name: 'சந்திர செவ்வாய் கிரக சேர்க்கை',
      englishName: 'Moon-Mars Combination',
      planets: ['சந்திரன்', 'செவ்வாய்'],
      description: 'சந்திரன் மற்றும் செவ்வாய் சேர்க்கை உணர்ச்சி வசப்படுதல் மற்றும் தைரியத்தை வழங்குகிறது.',
      characteristics: [
        'உணர்ச்சி வசப்படுதல்',
        'மன வலிமை',
        'தைரியம்',
        'தாய் பக்தி'
      ],
      palangal: [
        'போர் வீரத்தில் புகழ்',
        'உணவு தொழில்',
        'நீர் சம்பந்தப்பட்ட வேலை',
        'பெண்கள் ஆதரவு'
      ],
      vazhviayalPariharam: {
        title: 'வாழ்வியல் பரிகாரம்',
        practices: [
          'திங்கள் செவ்வாய் உபவாசம்',
          'தாய் சேவை',
          'பார்வதி வழிபாடு',
          'நீர் தானம்'
        ],
        materials: [
          'வெள்ளி செவ்வாய் நிற உடை',
          'முத்து மற்றும் பவளம்',
          'பால் பொங்கல்',
          'தயிர் சாதம்'
        ],
        timings: [
          'திங்கள் செவ்வாய் சந்தி வேளை',
          'பூர்ணிமை மாலை',
          'சந்திர தரிசன வேளை',
          'செவ்வாய் ஹோரை'
        ]
      },
      templePariharam: {
        temples: [
          'காமாக்ஷி அம்மன் கோவில்',
          'பழனி முருகன் கோவில்',
          'திருவரங்கம் ரங்கநாத்',
          'மீனாக்ஷி அம்மன் கோவில்'
        ],
        offerings: [
          'சிவப்பு வெள்ளை மாலை',
          'பால் பாயசம்',
          'கூடை பழங்கள்',
          'தயிர் அபிஷேகம்'
        ],
        prayers: [
          'தேவி மாஹாத்ம்யம்',
          'முருக பெருமான் ஸ்துதி',
          'சந்திர காவசம்',
          'அங்காரக ஸ்தவம்'
        ],
        specialDays: [
          'திங்கட்கிழமை',
          'செவ்வாய்க்கிழமை',
          'பூர்ணிமை',
          'கார்த்திகை'
        ]
      },
      effects: {
        positive: [
          'மன வலிமை',
          'உணர்ச்சி கட்டுப்பாடு',
          'தைரியம்',
          'பெண்கள் ஆதரவு'
        ],
        negative: [
          'கோபம்',
          'மன உளைச்சல்',
          'அவசரப்படுதல்',
          'உணர்ச்சி வசப்படுதல்'
        ],
        remedial: [
          'தியானம்',
          'யோக பயிற்சி',
          'மன அமைதி',
          'ஆன்மீக வழிபாடு'
        ]
      }
    }
    // Additional combinations would continue here...
  ];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.filteredKiragaSerkai = this.kiragaSerkaiList;
    this.loadProgress();
  }

  ionViewWillEnter() {
    this.filteredKiragaSerkai = this.kiragaSerkaiList;
  }

  searchKiragaSerkai() {
    const term = this.searchTerm.toLowerCase();
    this.filteredKiragaSerkai = this.kiragaSerkaiList.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.englishName.toLowerCase().includes(term) ||
      item.planets.some(planet => planet.toLowerCase().includes(term)) ||
      item.description.toLowerCase().includes(term)
    );
  }

  async openKiragaSerkaiDetail(kiragaSerkai: KiragaSerkai) {
    this.selectedKiragaSerkai = kiragaSerkai;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedKiragaSerkai = null;
  }

  toggleComplete(kiragaSerkaiId: string) {
    const index = this.completedKiragaSerkai.indexOf(kiragaSerkaiId);
    if (index > -1) {
      this.completedKiragaSerkai.splice(index, 1);
    } else {
      this.completedKiragaSerkai.push(kiragaSerkaiId);
    }
    this.saveProgress();
  }

  toggleFavorite(kiragaSerkaiId: string) {
    const index = this.favoriteKiragaSerkai.indexOf(kiragaSerkaiId);
    if (index > -1) {
      this.favoriteKiragaSerkai.splice(index, 1);
    } else {
      this.favoriteKiragaSerkai.push(kiragaSerkaiId);
    }
    this.saveProgress();
  }

  isCompleted(kiragaSerkaiId: string): boolean {
    return this.completedKiragaSerkai.includes(kiragaSerkaiId);
  }

  isFavorite(kiragaSerkaiId: string): boolean {
    return this.favoriteKiragaSerkai.includes(kiragaSerkaiId);
  }

  private saveProgress() {
    localStorage.setItem('kiragaSerkaiCompleted', JSON.stringify(this.completedKiragaSerkai));
    localStorage.setItem('kiragaSerkaiFavorites', JSON.stringify(this.favoriteKiragaSerkai));
  }

  private loadProgress() {
    const completed = localStorage.getItem('kiragaSerkaiCompleted');
    const favorites = localStorage.getItem('kiragaSerkaiFavorites');

    if (completed) {
      this.completedKiragaSerkai = JSON.parse(completed);
    }

    if (favorites) {
      this.favoriteKiragaSerkai = JSON.parse(favorites);
    }
  }

  getProgressPercentage(): number {
    if (this.kiragaSerkaiList.length === 0) return 0;
    return Math.round((this.completedKiragaSerkai.length / this.kiragaSerkaiList.length) * 100);
  }
}
