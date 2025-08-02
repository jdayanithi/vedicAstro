import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';

interface Remedy {
  type: string;
  title: string;
  description: string;
  timing?: string;
}

interface Mantra {
  name: string;
  text: string;
  count: string;
  timing: string;
}

interface ModakuBhavam {
  id: number;
  number: string;
  name: string;
  description: string;
  negativeEffects: string[];
  positiveEffects?: string[];
  remedies: Remedy[];
  mantras?: Mantra[];
  severityLevel: string;
}

@Component({
  selector: 'app-modaku-pariharangal',
  templateUrl: './modaku-pariharangal.page.html',
  styleUrls: ['./modaku-pariharangal.page.scss'],
})
export class ModakuPariharangalPage implements OnInit {
  @ViewChild('detailModal', { static: true }) detailModal!: IonModal;

  searchTerm: string = '';
  isModalOpen: boolean = false;
  selectedBhavam: ModakuBhavam | null = null;
  completedBhavams: number[] = [];
  favoriteBhavams: number[] = [];
  filteredBhavams: ModakuBhavam[] = [];

  bhavamList: ModakuBhavam[] = [
    {
      id: 1,
      number: '1',
      name: 'தனு பாவம் (லக்னம்)',
      description: 'ஆள்மையம், உடல்நலம், ஆயுள், செல்வாக்கு',
      negativeEffects: [
        'உடல்நலக் குறைபாடுகள் மற்றும் நோய்வாய்ப்பு',
        'ஆளுமைத் தன்மையில் குறைபாடு',
        'தன்னம்பிக்கையின்மை',
        'தலைவலி மற்றும் கண் சார்ந்த பிரச்சனைகள்',
        'முகத்தில் கறுப்பு திட்டுகள் அல்லது குறிகள்',
        'அடிக்கடி காய்ச்சல் மற்றும் உடல் சோர்வு'
      ],
      positiveEffects: [
        'சரியான பரிகாரத்தால் வலுவான ஆளுமை',
        'உடல்நலத்தில் முன்னேற்றம்'
      ],
      remedies: [
        {
          type: 'மந்திர பரிகாரம்',
          title: 'மகா மிருத்யுஞ்சய மந்திரம்',
          description: 'ஓம் த்ர்யம்பகம் யஜாமஹே சுகந்திம் புஷ்டிவர்த்தனம் - 108 முறை',
          timing: 'தினமும் காலையில் சூரியோதயத்திற்கு முன்'
        },
        {
          type: 'தானம்',
          title: 'கருப்பு எள் தானம்',
          description: 'சனிக்கிழமை ஏழை மக்களுக்கு கருப்பு எள், அரிசி, துணிகள் வழங்குதல்',
          timing: 'ஒவ்வொரு சனிக்கிழமையும்'
        },
        {
          type: 'வழிபாடு',
          title: 'நவகிரக பூஜை',
          description: 'நவகிரக கோயிலில் சென்று விஷேஷ பூஜை செய்தல்',
          timing: 'மாதம் ஒரு முறை'
        },
        {
          type: 'ஆயுர்வேத',
          title: 'நீம் இலை தேநீர்',
          description: 'வாரம் 3 முறை நீம் இலை தேநீர் அருந்துதல்',
          timing: 'காலை வெறும் வயிற்றில்'
        }
      ],
      mantras: [
        {
          name: 'சூர்ய மந்திரம்',
          text: 'ஓம் சூர்யாய நமஃ',
          count: '108 முறை',
          timing: 'சூரியோதயத்தின் போது'
        }
      ],
      severityLevel: 'அதிக'
    },
    {
      id: 2,
      number: '2',
      name: 'தன பாவம்',
      description: 'செல்வம், குடும்பம், பேச்சு, உணவு',
      negativeEffects: [
        'பண நஷ்டம் மற்றும் கடன் சுமை',
        'குடும்ப உறுப்பினர்களுடன் வாக்குவாதம்',
        'பேச்சில் குறைபாடு அல்லது தவறான வார்த்தைகள்',
        'உணவு செரிமானக் கோளாறுகள்',
        'சேமிப்பு செய்ய இயலாமை',
        'பணக்கார நண்பர்களின் பிரிவு'
      ],
      positiveEffects: [
        'பரிகாரத்தால் பண வரவு அதிகரிப்பு',
        'குடும்ப ஒற்றுமை மேம்பாடு'
      ],
      remedies: [
        {
          type: 'தானம்',
          title: 'வெள்ளி தானம்',
          description: 'வெள்ளிக்கிழமை வெள்ளி நாணயம் அல்லது வெள்ளிப் பொருட்கள் தானம்',
          timing: 'வெள்ளிக்கிழமை மாலை'
        },
        {
          type: 'வழிபாடு',
          title: 'லக்ஷ்மி பூஜை',
          description: 'வீட்டில் தினமும் லக்ஷ்மி தேவியை வழிபடுதல்',
          timing: 'மாலை 6 மணி'
        },
        {
          type: 'உணவுப் பரிகாரம்',
          title: 'பசுவுக்கு உணவு',
          description: 'பசுவுக்கு புல், கூழ் அல்லது பிற உணவுகள் கொடுத்தல்',
          timing: 'தினமும் காலை'
        },
        {
          type: 'யோகம்',
          title: 'பிராணாயாமம்',
          description: 'தினமும் 15 நிமிடம் பிராணாயாம பயிற்சி',
          timing: 'காலை மற்றும் மாலை'
        }
      ],
      mantras: [
        {
          name: 'லக்ஷ்மி மந்திரம்',
          text: 'ஓம் ஶ்ரீம் ஹ்ரீம் ஶ்ரீம் கமலே கமலாலயே ப்ரசீத ப்ரசீத ஶ்ரீம் ஹ்ரீம் ஶ்ரீம் ஓம் மஹாலக்ஷ்மியே நமஃ',
          count: '108 முறை',
          timing: 'வெள்ளிக்கிழமை மாலை'
        }
      ],
      severityLevel: 'நடுத்தர'
    },
    {
      id: 3,
      number: '3',
      name: 'சகோதர பாவம்',
      description: 'தைரியம், சகோதரர்கள், குறு பயணம்',
      negativeEffects: [
        'தைரியமின்மை மற்றும் பயம்',
        'சகோதர உறவுகளில் பிரச்சனைகள்',
        'பயணத்தில் தடைகள் மற்றும் விபத்துக்கள்',
        'கை மற்றும் தோள்பட்டை வலிகள்',
        'எழுதுதல் மற்றும் தொடர்பு செய்வதில் சிக்கல்கள்',
        'நண்பர்களுடன் மனக்கசப்பு'
      ],
      positiveEffects: [
        'பரிகாரத்தால் தைரியம் வளர்ச்சி',
        'சகோதர உறவுகள் மேம்பாடு'
      ],
      remedies: [
        {
          type: 'மந்திர பரிகாரம்',
          title: 'ஹனுமான் சாலீசா',
          description: 'ஹனுமான் சாலீசா பாராயணம் செய்தல்',
          timing: 'செவ்வாய் மற்றும் சனிக்கிழமை'
        },
        {
          type: 'தானம்',
          title: 'செம்பு பாத்திரம் தானம்',
          description: 'செம்பு பாத்திரம் மற்றும் செம்பு நாணயங்கள் தானம்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'வழிபாடு',
          title: 'முருகன் வழிபாடு',
          description: 'முருகன் கோயிலில் சென்று வழிபாடு செய்தல்',
          timing: 'வெள்ளிக்கிழமை'
        },
        {
          type: 'உடல் பயிற்சி',
          title: 'கை மற்றும் தோள் பயிற்சி',
          description: 'தினமும் கை மற்றும் தோள்பட்டை பயிற்சிகள்',
          timing: 'காலை'
        }
      ],
      mantras: [
        {
          name: 'முருகன் மந்திரம்',
          text: 'ஓம் சரவணபவாய நமஃ',
          count: '108 முறை',
          timing: 'வெள்ளிக்கிழமை மாலை'
        }
      ],
      severityLevel: 'நடுத்தர'
    },
    {
      id: 4,
      number: '4',
      name: 'சுக பாவம்',
      description: 'தாய், வீடு, மனநிறைவு, வாகனம்',
      negativeEffects: [
        'தாயுடன் உறவில் பிரச்சனைகள்',
        'வீட்டில் அமைதியின்மை மற்றும் கலகம்',
        'மனநிறைவின்மை மற்றும் மன அழுத்தம்',
        'வாகன பிரச்சனைகள் மற்றும் விபத்துக்கள்',
        'நிலம் மற்றும் சொத்து விஷயங்களில் சிக்கல்கள்',
        'மார்பு மற்றும் நுரையீரல் பிரச்சனைகள்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் வீட்டில் அமைதி',
        'தாய் உறவு மேம்பாடு'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'சந்திரன் வழிபாடு',
          description: 'சந்திர கிரக வழிபாடு மற்றும் சந்திர மந்திரம்',
          timing: 'திங்கள்கிழமை மாலை'
        },
        {
          type: 'தானம்',
          title: 'வெள்ளை பொருட்கள் தானம்',
          description: 'வெள்ளை அரிசி, பால், வெள்ளை துணிகள் தானம்',
          timing: 'திங்கள்கிழமை'
        },
        {
          type: 'வீட்டு பரிகாரம்',
          title: 'வீட்டில் துளசி வளர்த்தல்',
          description: 'வீட்டில் துளசி செடி வளர்த்து தினமும் நீர் ஊற்றுதல்',
          timing: 'தினமும் காலை மற்றும் மாலை'
        },
        {
          type: 'ஆரோக்கிய பரிகாரம்',
          title: 'பால் மற்றும் பாதாம் சேவை',
          description: 'தினமும் பால் மற்றும் பாதாம் சேர்த்துக்கொள்ளுதல்',
          timing: 'இரவு உணவிற்கு பின்'
        }
      ],
      mantras: [
        {
          name: 'சந்திர மந்திரம்',
          text: 'ஓம் சோம் சோமாய நமஃ',
          count: '108 முறை',
          timing: 'திங்கள்கிழமை மாலை'
        }
      ],
      severityLevel: 'அதிக'
    },
    {
      id: 5,
      number: '5',
      name: 'புத்திர பாவம்',
      description: 'மக்கள், படிப்பு, புத்தி, பூர்வ புண்ணியம்',
      negativeEffects: [
        'மக்கள் பெறுவதில் தாமதம் அல்லது சிக்கல்கள்',
        'கல்வியில் கவனமின்மை மற்றும் மோசமான மதிப்பெண்கள்',
        'புத்தி மந்தம் மற்றும் முடிவெடுப்பதில் சிக்கல்',
        'ஆசிரியர் மற்றும் மாணவர்களுடன் பிரச்சனைகள்',
        'வயிறு மற்றும் இதய நோய்கள்',
        'புத்த மதம் சார்ந்த நம்பிக்கைகளில் குழப்பம்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் கல்வியில் முன்னேற்றம்',
        'மக்கள் பாக்கியம் கிடைத்தல்'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'குரு பகவான் வழிபாடு',
          description: 'வியாழக்கிழமை குரு பகவானை வழிபடுதல்',
          timing: 'வியாழக்கிழமை மாலை'
        },
        {
          type: 'தானம்',
          title: 'மஞ்சள் பொருட்கள் தானம்',
          description: 'மஞ்சள், மஞ்சள் துணிகள், வாழைப்பழம் தானம்',
          timing: 'வியாழக்கிழமை'
        },
        {
          type: 'கல்விப் பரிகாரம்',
          title: 'சரஸ்வதி பூஜை',
          description: 'சரஸ்வதி தேவியை வழிபட்டு கல்விக்காக பிரார்த்தனை',
          timing: 'வசந்த பஞ்சமி நாள்'
        },
        {
          type: 'மருத்துவ பரிகாரம்',
          title: 'மஞ்சள் நீர் அருந்துதல்',
          description: 'வெந்நீரில் மஞ்சள் கலந்து வாரம் 3 முறை அருந்துதல்',
          timing: 'காலை வெறும் வயிற்றில்'
        }
      ],
      mantras: [
        {
          name: 'சரஸ்வதி மந்திரம்',
          text: 'ஓம் ஐம் சரஸ்வதியை நமஃ',
          count: '108 முறை',
          timing: 'காலை பூஜை நேரம்'
        }
      ],
      severityLevel: 'நடுத்தர'
    },
    {
      id: 6,
      number: '6',
      name: 'ரிபு பாவம்',
      description: 'எதிரிகள், நோய், கடன், சேவை',
      negativeEffects: [
        'எதிரிகள் எண்ணிக்கை அதிகரிப்பு மற்றும் பகைமை',
        'நீண்டகால நோய்கள் மற்றும் மருத்துவ செலவுகள்',
        'கடன் சுமை மற்றும் நிதி நெருக்கடி',
        'வேலையில் சிக்கல்கள் மற்றும் சேவைத் துறையில் பிரச்சனைகள்',
        'மலபந்தம் மற்றும் செரிமான கோளாறுகள்',
        'தாழ்வு மனப்பான்மை மற்றும் பிறரின் அடிமை நிலை'
      ],
      positiveEffects: [
        'பரிகாரத்தால் எதிரிகள் நீங்குதல்',
        'சேவைத் துறையில் முன்னேற்றம்'
      ],
      remedies: [
        {
          type: 'மந்திர பரிகாரம்',
          title: 'ஹனுமான் சாலீசா',
          description: 'தினமும் ஹனுமான் சாலீசா பாராயணம்',
          timing: 'செவ்வாய் மற்றும் சனிக்கிழமை'
        },
        {
          type: 'தானம்',
          title: 'இரும்பு பொருட்கள் தானம்',
          description: 'இரும்பு பாத்திரங்கள், இரும்பு நாணயங்கள் தானம்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'சேவை',
          title: 'ஏழைகளுக்கு சேவை',
          description: 'ஏழைகளுக்கு உணவு மற்றும் மருந்து வழங்குதல்',
          timing: 'வாரம் ஒரு முறை'
        },
        {
          type: 'ஆரோக்கிய பரிகாரம்',
          title: 'நீம் இலை கஷாயம்',
          description: 'வாரம் 2 முறை நீம் இலை கஷாயம் அருந்துதல்',
          timing: 'காலை வெறும் வயிற்றில்'
        }
      ],
      mantras: [
        {
          name: 'மகாவீர் மந்திரம்',
          text: 'ஓம் ஹனுமதே நமஃ',
          count: '108 முறை',
          timing: 'செவ்வாய்க்கிழமை மாலை'
        }
      ],
      severityLevel: 'அதிக'
    },
    {
      id: 7,
      number: '7',
      name: 'கலத்திர பாவம்',
      description: 'மனைவி/கணவர், கூட்டாளி, திருமணம்',
      negativeEffects: [
        'திருமணத் தாமதம் அல்லது விவாகரத்து',
        'கணவன்/மனைவியுடன் அடிக்கடி சண்டை',
        'கூட்டாளிகளுடன் மனக்கசப்பு மற்றும் வியாபார நஷ்டம்',
        'பாலியல் உறவுகளில் சிக்கல்கள்',
        'சிறுநீரக மற்றும் இனப்பெருக்க உறுப்பு பிரச்சனைகள்',
        'வியாபாரத்தில் பங்குதாரர்களுடன் ஏமாற்றம்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் திருமண பந்தம் வலுப்படுதல்',
        'கூட்டாளிகளுடன் நல்ல உறவு'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'உமை மகேஸ்வர் பூஜை',
          description: 'சிவ பார்வதி வழிபாடு மற்றும் விரத அனுஷ்டானம்',
          timing: 'திங்கள்கிழமை'
        },
        {
          type: 'தானம்',
          title: 'வெண்ணை தானம்',
          description: 'வெண்ணை, வெள்ளை துணிகள், வெள்ளி பொருட்கள் தானம்',
          timing: 'வெள்ளிக்கிழமை'
        },
        {
          type: 'திருமண பரிகாரம்',
          title: 'துளசி விவாகம்',
          description: 'கார்த்திகை மாதத்தில் துளசி விவாக வைபவம் நடத்துதல்',
          timing: 'கார்த்திகை மாதம்'
        },
        {
          type: 'ஆரோக்கிய பரிகாரம்',
          title: 'வெள்ளை பூசணி சேவை',
          description: 'வாரம் 2 முறை வெள்ளை பூசணி சாம்பார் செய்து சாப்பிடுதல்',
          timing: 'வெள்ளிக்கிழமை'
        }
      ],
      mantras: [
        {
          name: 'சுக்ர மந்திரம்',
          text: 'ஓம் ஶுக்ராய நமஃ',
          count: '108 முறை',
          timing: 'வெள்ளிக்கிழமை மாலை'
        }
      ],
      severityLevel: 'அதிக'
    },
    {
      id: 8,
      number: '8',
      name: 'ஆயுர் பாவம்',
      description: 'மரணம், இடுக்கண், ரகசியம், மாற்றம்',
      negativeEffects: [
        'அனேக நோய்கள் மற்றும் மரண பயம்',
        'அடிக்கடி விபத்துக்கள் மற்றும் காயங்கள்',
        'ரகசிய விஷயங்கள் வெளியாகுதல்',
        'மன அழுத்தம் மற்றும் தற்கொலை எண்ணம்',
        'குடல் மற்றும் இனப்பெருக்க உறுப்பு நோய்கள்',
        'கண்ணாடிகள் உடைதல் மற்றும் மர்ம சம்பவங்கள்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் ஆயுள் வளர்ச்சி',
        'மர்ம சக்திகள் கிடைத்தல்'
      ],
      remedies: [
        {
          type: 'மந்திர பரிகாரம்',
          title: 'மிருத்யுஞ்சய மந்திரம்',
          description: 'மகா மிருத்யுஞ்சய மந்திரம் தினமும் 108 முறை',
          timing: 'ராஹு காலத்தில்'
        },
        {
          type: 'தானம்',
          title: 'கருப்பு பொருட்கள் தானம்',
          description: 'கருப்பு எள், கருப்பு துணிகள், இரும்பு பொருட்கள் தானம்',
          timing: 'சனிக்கிழமை'
        },
        {
          type: 'வழிபாடு',
          title: 'காலபைரவர் வழிபாடு',
          description: 'காலபைரவர் கோயிலில் சென்று விஷேஷ பூஜை',
          timing: 'சனிக்கிழமை இரவு'
        },
        {
          type: 'பாதுகாப்பு பரிகாரம்',
          title: 'ருத்ராக்ஷ அணிதல்',
          description: '5 முகம் ருத்ராக்ஷ மாலை அணிதல்',
          timing: 'எப்போதும்'
        }
      ],
      mantras: [
        {
          name: 'சனி மந்திரம்',
          text: 'ஓம் ஶனைஶ்சராய நமஃ',
          count: '108 முறை',
          timing: 'சனிக்கிழமை மாலை'
        }
      ],
      severityLevel: 'அதிக'
    },
    {
      id: 9,
      number: '9',
      name: 'பாக்கிய பாவம்',
      description: 'பாக்கியம், தந்தை, குரு, மதம், தர்மம்',
      negativeEffects: [
        'தந்தையுடன் உறவில் பிரச்சனைகள்',
        'குருவை அல்லது ஆசானை அவமதித்தல்',
        'பாக்கியம் குறைதல் மற்றும் அதிர்ஷ்டமின்மை',
        'மத நம்பிக்கையில் சந்தேகம்',
        'தர்ம காரியங்களில் ஆர்வமின்மை',
        'தொடை மற்றும் இடுப்பு பகுதி பிரச்சனைகள்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் பாக்கியம் அதிகரிப்பு',
        'தந்தை உறவு மேம்பாடு'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'குரு வழிபாடு',
          description: 'வியாழக்கிழமை குரு பகவான் வழிபாடு மற்றும் குரு வந்தனை',
          timing: 'வியாழக்கிழமை மாலை'
        },
        {
          type: 'தானம்',
          title: 'மஞ்சள் பொருட்கள் தானம்',
          description: 'மஞ்சள், மஞ்சள் வஸ்திரம், வாழைப்பழம், கோல்ட் தானம்',
          timing: 'வியாழக்கிழமை'
        },
        {
          type: 'தர்ம காரியம்',
          title: 'பிராமண பந்திகள்',
          description: 'பிராமணர்களுக்கு உணவு படைத்து ஆசிர்வாதம் பெறுதல்',
          timing: 'வியாழக்கிழமை'
        },
        {
          type: 'ஆரோக்கிய பரிகாரம்',
          title: 'மஞ்சள் பால் சேவை',
          description: 'இரவில் மஞ்சள் பால் அருந்துதல்',
          timing: 'தினமும் இரவு'
        }
      ],
      mantras: [
        {
          name: 'குரு மந்திரம்',
          text: 'ஓம் குரவே நமஃ',
          count: '108 முறை',
          timing: 'வியாழக்கிழமை மாலை'
        }
      ],
      severityLevel: 'நடுத்தர'
    },
    {
      id: 10,
      number: '10',
      name: 'கர்ம பாவம்',
      description: 'தொழில், புகழ், அரசியல், சமுதாய நிலை',
      negativeEffects: [
        'தொழிலில் தடைகள் மற்றும் வேலையின்மை',
        'புகழ் குறைதல் மற்றும் சமுதாய மதிப்பின்மை',
        'அரசியல் விஷயங்களில் தோல்வி',
        'அலுவலகத்தில் மேலதிகாரிகளுடன் பிரச்சனைகள்',
        'மூட்டுகள் மற்றும் எலும்பு பிரச்சனைகள்',
        'கெட்ட பெயர் மற்றும் அவமானம்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் தொழிலில் உயர்வு',
        'சமுதாய மதிப்பு அதிகரிப்பு'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'சனி வழிபாடு',
          description: 'சனிக்கிழமை சனி பகவான் வழிபாடு மற்றும் விரதம்',
          timing: 'சனிக்கிழமை'
        },
        {
          type: 'தானம்',
          title: 'கருப்பு பொருட்கள் தானம்',
          description: 'கருப்பு எள், இரும்பு, கருப்பு உருந்து தானம்',
          timing: 'சனிக்கிழமை'
        },
        {
          type: 'சேவை',
          title: 'தொழிலாளர்களுக்கு உதவி',
          description: 'ஏழை தொழிலாளர்களுக்கு உணவு மற்றும் பொருளாதார உதவி',
          timing: 'மாதம் ஒரு முறை'
        },
        {
          type: 'மருத்துவ பரிகாரம்',
          title: 'எலும்பு வலிமைக்கான உணவு',
          description: 'கால்ஷியம் நிறைந்த உணவுகள் மற்றும் சூரிய ஒளி',
          timing: 'தினமும்'
        }
      ],
      mantras: [
        {
          name: 'சனி மந்திரம்',
          text: 'ஓம் ப்ரம் ப்ரீம் ப்ரௌம் ஸ: ஶனைஶ்சராய நமஃ',
          count: '108 முறை',
          timing: 'சனிக்கிழமை மாலை'
        }
      ],
      severityLevel: 'அதிக'
    },
    {
      id: 11,
      number: '11',
      name: 'லாப பாவம்',
      description: 'லாபம், நண்பர்கள், ஆசைகள், மூத்த சகோதரர்',
      negativeEffects: [
        'எதிர்பார்த்த லாபம் கிடைக்காமை',
        'நண்பர்களால் ஏமாற்றம் மற்றும் துரோகம்',
        'ஆசைகள் நிறைவேறாமை',
        'மூத்த சகோதரர்களுடன் பிரச்சனைகள்',
        'கால் மற்றும் கணுக்கால் பிரச்சனைகள்',
        'நெட்வொர்க்கிங் மற்றும் சமூக உறவுகளில் சிக்கல்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் அனுகூல நண்பர்கள்',
        'லாபம் அதிகரிப்பு'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'விஷ்ணு வழிபாடு',
          description: 'சனிக்கிழமை விஷ்ணு பகவான் வழிபாடு',
          timing: 'சனிக்கிழமை மாலை'
        },
        {
          type: 'தானம்',
          title: 'நீல பொருட்கள் தானம்',
          description: 'நீல துணிகள், நீல நிற பொருட்கள், நீலகல் தானம்',
          timing: 'சனிக்கிழமை'
        },
        {
          type: 'நட்பு பரிகாரம்',
          title: 'நல்ல நண்பர்களுடன் சத்சங்கம்',
          description: 'நேர்மையான நண்பர்களுடன் நல்ல செயல்களில் ஈடுபடுதல்',
          timing: 'வாரம் ஒரு முறை'
        },
        {
          type: 'ஆரோக்கிய பரிகாரம்',
          title: 'கால் பயிற்சி',
          description: 'தினமும் கால் பயிற்சி மற்றும் மசாஜ்',
          timing: 'மாலை நேரம்'
        }
      ],
      mantras: [
        {
          name: 'விஷ்ணு மந்திரம்',
          text: 'ஓம் நமோ நாராயணாய',
          count: '108 முறை',
          timing: 'சனிக்கிழமை மாலை'
        }
      ],
      severityLevel: 'நடுத்தர'
    },
    {
      id: 12,
      number: '12',
      name: 'வியய பாவம்',
      description: 'இழப்பு, விதேச், மோக்ஷம், கனவுகள்',
      negativeEffects: [
        'பணம் மற்றும் சொத்து இழப்புகள்',
        'வெளிநாட்டு விஷயங்களில் தடைகள்',
        'நித்திரையின்மை மற்றும் கெட்ட கனவுகள்',
        'ஆன்மீக முன்னேற்றத்தில் தடைகள்',
        'கண் மற்றும் கால் பிரச்சனைகள்',
        'மறைமுக எதிரிகள் மற்றும் சூழ்ச்சிகள்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் ஆன்மீக முன்னேற்றம்',
        'வெளிநாட்டு வாய்ப்புகள்'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'கேது வழிபாடு',
          description: 'கேது கிரக வழிபாடு மற்றும் விரத அனுஷ்டானம்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'தானம்',
          title: 'பல வர்ண பொருட்கள் தானம்',
          description: 'கலந்த நிறங்களில் துணிகள், கலந்த தானியங்கள் தானம்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'ஆன்மீக பரிகாரம்',
          title: 'தியானம் மற்றும் யோகா',
          description: 'தினமும் தியானம் மற்றும் யோகா பயிற்சி',
          timing: 'தினமும் காலை மற்றும் மாலை'
        },
        {
          type: 'மருத்துவ பரிகாரம்',
          title: 'கண் பராமரிப்பு',
          description: 'கண்களுக்கு ஆரோக்கியமான உணவு மற்றும் கண் பயிற்சி',
          timing: 'தினமும்'
        }
      ],
      mantras: [
        {
          name: 'கேது மந்திரம்',
          text: 'ஓம் கேதவே நமஃ',
          count: '108 முறை',
          timing: 'செவ்வாய்க்கிழமை மாலை'
        }
      ],
      severityLevel: 'அதிக'
    }
  ];

  commonRemedies = {
    daily: [
      'மகா மிருத்யுஞ்சய மந்திரம் 21 முறை ஜபம்',
      'நவகிரக வணக்கம் செய்தல்',
      'பசுவுக்கு உணவு அல்லது நீர் கொடுத்தல்',
      'துளசி செடிக்கு நீர் ஊற்றுதல்'
    ],
    weekly: [
      'சனிக்கிழமையில் ஏழைகளுக்கு தானம்',
      'வியாழக்கிழமையில் குரு வழிபாடு',
      'திங்கள்கிழமையில் சிவ வழிபாடு',
      'வெள்ளிக்கிழமையில் லக்ஷ்மி வழிபாடு'
    ],
    monthly: [
      'அமாவாசை நாளில் முன்னோர் வழிபாடு',
      'பௌர்ணமி நாளில் சத்ய நாராயண பூஜை',
      'மாதம் ஒரு முறை நவகிரக கோயில் சென்று வழிபாடு',
      'மாதம் ஒரு முறை ஏதேனும் தர்ம காரியம் செய்தல்'
    ]
  };

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadCompletedBhavams();
    this.loadFavoriteBhavams();
    this.filteredBhavams = [...this.bhavamList];
  }

  loadCompletedBhavams() {
    const completed = localStorage.getItem('completedModakuBhavams');
    if (completed) {
      this.completedBhavams = JSON.parse(completed);
    }
  }

  loadFavoriteBhavams() {
    const favorites = localStorage.getItem('favoriteModakuBhavams');
    if (favorites) {
      this.favoriteBhavams = JSON.parse(favorites);
    }
  }

  searchBhavams() {
    if (!this.searchTerm.trim()) {
      this.filteredBhavams = [...this.bhavamList];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredBhavams = this.bhavamList.filter(bhavam =>
      bhavam.name.toLowerCase().includes(term) ||
      bhavam.description.toLowerCase().includes(term) ||
      bhavam.negativeEffects.some(effect => effect.toLowerCase().includes(term)) ||
      (bhavam.positiveEffects && bhavam.positiveEffects.some(effect => effect.toLowerCase().includes(term)))
    );
  }

  trackByBhavamId(index: number, bhavam: ModakuBhavam): number {
    return bhavam.id;
  }

  getProgressPercentage(): number {
    return this.completedBhavams.length / this.bhavamList.length;
  }

  isBhavamCompleted(bhavamId: number): boolean {
    return this.completedBhavams.includes(bhavamId);
  }

  isFavorite(bhavam: ModakuBhavam): boolean {
    return this.favoriteBhavams.includes(bhavam.id);
  }

  toggleFavorite(bhavam: ModakuBhavam, event: Event) {
    event.stopPropagation();
    
    const index = this.favoriteBhavams.indexOf(bhavam.id);
    if (index > -1) {
      this.favoriteBhavams.splice(index, 1);
    } else {
      this.favoriteBhavams.push(bhavam.id);
    }
    
    localStorage.setItem('favoriteModakuBhavams', JSON.stringify(this.favoriteBhavams));
    this.showToast(index > -1 ? 'விருப்பம் நீக்கப்பட்டது' : 'விருப்பத்தில் சேர்க்கப்பட்டது');
  }

  openBhavamDetail(bhavam: ModakuBhavam) {
    this.selectedBhavam = bhavam;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedBhavam = null;
  }

  markAsCompleted(bhavam: ModakuBhavam) {
    if (!this.completedBhavams.includes(bhavam.id)) {
      this.completedBhavams.push(bhavam.id);
      localStorage.setItem('completedModakuBhavams', JSON.stringify(this.completedBhavams));
      this.showToast('கற்றுக்கொண்டது என குறிக்கப்பட்டது');
    }
  }

  async showCommonRemedies() {
    const modal = await this.modalController.create({
      component: 'common-remedies-modal',
      componentProps: {
        remedies: this.commonRemedies
      }
    });
    
    await modal.present();
  }

  async shareContent() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'மோதக பரிகாரங்கள்',
          text: '12 பாவங்களில் மோதக தோஷத்தின் விளைவுகள் மற்றும் பரிகார முறைகள் பற்றி அறிந்து கொள்ளுங்கள்'
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const text = 'மோதக பரிகாரங்கள் - 12 பாவங்களில் மோதக தோஷத்தின் விளைவுகள் மற்றும் பரிகார முறைகள்';
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          this.showToast('உள்ளடக்கம் நகலெடுக்கப்பட்டது');
        }
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  }

  async shareBhavam(bhavam: ModakuBhavam) {
    try {
      const shareText = `${bhavam.name} - மோதக பரிகாரங்கள்: ${bhavam.negativeEffects[0]}`;
      if (navigator.share) {
        await navigator.share({
          title: `${bhavam.name} - மோதக பரிகாரங்கள்`,
          text: shareText
        });
      } else {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareText);
          this.showToast('உள்ளடக்கம் நகலெடுக்கப்பட்டது');
        }
      }
    } catch (error) {
      console.log('Error sharing bhavam:', error);
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }
}
