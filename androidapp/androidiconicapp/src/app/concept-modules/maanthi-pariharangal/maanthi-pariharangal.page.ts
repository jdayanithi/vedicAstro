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

interface MaanthiBhavam {
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
  selector: 'app-maanthi-pariharangal',
  templateUrl: './maanthi-pariharangal.page.html',
  styleUrls: ['./maanthi-pariharangal.page.scss'],
})
export class MaanthiPariharangalPage implements OnInit {
  @ViewChild('detailModal', { static: true }) detailModal!: IonModal;

  searchTerm: string = '';
  isModalOpen: boolean = false;
  selectedBhavam: MaanthiBhavam | null = null;
  completedBhavams: number[] = [];
  favoriteBhavams: number[] = [];
  filteredBhavams: MaanthiBhavam[] = [];

  bhavamList: MaanthiBhavam[] = [
    {
      id: 1,
      number: '1',
      name: 'தனு பாவம் (லக்னம்)',
      description: 'ஆள்மையம், உடல்நலம், ஆயுள், செல்வாக்கு',
      negativeEffects: [
        'ஆளுமை பலவீனம் மற்றும் தன்னம்பிக்கையின்மை',
        'உடல்நலத்தில் நீண்டகால பிரச்சனைகள்',
        'தலையில் அடிக்கடி காயங்கள் மற்றும் அறுவை சிகிச்சைகள்',
        'ஆயுட்காலம் குறைதல் மற்றும் மரண பயம்',
        'தலைமைத்துவ குணத்தில் குறைபாடு',
        'ஜாதக பலன்களில் தாமதம் மற்றும் தடைகள்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் வலுவான ஆளுமை வளர்ச்சி',
        'உடல்நலத்தில் குணாதிசயம்'
      ],
      remedies: [
        {
          type: 'மந்திர பரிகாரம்',
          title: 'மார்க்கண்டேய மந்திரம்',
          description: 'ஓம் ஜும் ஸ: மார்க்கண்டேயாய நமஃ - 108 முறை ஜபம்',
          timing: 'செவ்வாய்க்கிழமை காலை'
        },
        {
          type: 'தானம்',
          title: 'செவ்வை நிற பொருட்கள் தானம்',
          description: 'சிவப்பு துணிகள், சிவப்பு பூக்கள், செம்பு பொருட்கள் தானம்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'வழிபாடு',
          title: 'ஹனுமான் வழிபாடு',
          description: 'செவ்வாய்க்கிழமை ஹனுமான் கோயிலில் சிறப்பு பூஜை',
          timing: 'செவ்வாய்க்கிழமை மாலை'
        },
        {
          type: 'யோக பரிகாரம்',
          title: 'சூர்ய நமஸ்காரம்',
          description: 'தினமும் 12 செட் சூர்ய நமஸ்காரம் செய்தல்',
          timing: 'சூரியோதயத்தின் பொழுது'
        }
      ],
      mantras: [
        {
          name: 'அங்காரக மந்திரம்',
          text: 'ஓம் அங் அங்காரகாய நமஃ',
          count: '108 முறை',
          timing: 'செவ்வாய்க்கிழமை காலை'
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
        'குடும்ப சொத்துக்களில் வழக்குகள் மற்றும் பிரிவுகள்',
        'பேச்சில் கடுமை மற்றும் அவசர குணம்',
        'உணவு பழக்கத்தில் ஒழுங்கின்மை',
        'சேமிப்பு இல்லாமை மற்றும் பண ஆசை',
        'வாய் மற்றும் பல் பிரச்சனைகள்',
        'குடும்ப மரபுகளை மீறுதல்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் குடும்ப ஒற்றுமை',
        'வாக்குச் சக்தி வளர்ச்சி'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'மங்கள் கௌரி பூஜை',
          description: 'செவ்வாய்க்கிழமை மங்கள் கௌரி வழிபாடு',
          timing: 'செவ்வாய்க்கிழமை காலை'
        },
        {
          type: 'தானம்',
          title: 'தங்க நாணயம் தானம்',
          description: 'தங்க நாணயம் அல்லது தங்க ஆபரணங்கள் தானம்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'உணவு பரிகாரம்',
          title: 'இனிப்பு தானம்',
          description: 'ஏழைக் குழந்தைகளுக்கு லட்டு, அல்வா போன்ற இனிப்புகள் வழங்குதல்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'மருத்துவ பரிகாரம்',
          title: 'மஞ்சள் நீர் கொப்பளித்தல்',
          description: 'தினமும் மஞ்சள் நீரில் வாய் கொப்பளித்தல்',
          timing: 'காலை மற்றும் இரவு'
        }
      ],
      mantras: [
        {
          name: 'சுக்ர மந்திரம்',
          text: 'ஓம் ஶும் ஶுக்ராய நமஃ',
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
        'சகோதரர்களுடன் சண்டை சச்சரவுகள்',
        'தைரியமின்மை மற்றும் பயமுறுத்தும் கனவுகள்',
        'பயணங்களில் விபத்துக்கள் மற்றும் தாமதங்கள்',
        'கை, கழுத்து, தோள்பட்டை பிரச்சனைகள்',
        'தொழில் முன்னேற்றத்தில் தடைகள்',
        'தற்காப்பு உணர்வின் அதிகரிப்பு'
      ],
      positiveEffects: [
        'பரிகாரத்தால் சகோதர உறவு மேம்பாடு',
        'தைரியம் மற்றும் வீர குணம் வளர்ச்சி'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'கார்த்திகேய வழிபாடு',
          description: 'செவ்வாய்க்கிழமை முருகன் கோயிலில் சிறப்பு பூஜை',
          timing: 'செவ்வாய்க்கிழமை மாலை'
        },
        {
          type: 'தானம்',
          title: 'வேல் பொருட்கள் தானம்',
          description: 'வேல், கத்தி போன்ற கூர்மையான பொருட்கள் தானம்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'ஆன்மீக பரிகாரம்',
          title: 'வீர மந்திர ஜபம்',
          description: 'வீர மந்திரங்கள் ஜபம் செய்து தைரியம் பெறுதல்',
          timing: 'செவ்வாய்க்கிழமை காலை'
        },
        {
          type: 'உடல் பயிற்சி',
          title: 'தற்காப்பு கலை பயிற்சி',
          description: 'கராத்தே, குத்துச்சண்டை போன்ற தற்காப்பு கலைகள் கற்றுக்கொள்ளுதல்',
          timing: 'வாரம் 3 முறை'
        }
      ],
      mantras: [
        {
          name: 'முருகன் மந்திரம்',
          text: 'ஓம் சரவணபவாய நமஃ',
          count: '108 முறை',
          timing: 'செவ்வாய்க்கிழமை மாலை'
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
        'தாயின் உடல்நலத்தில் சிக்கல்கள்',
        'வீட்டில் அமைதியின்மை மற்றும் வாஸ்து தோஷம்',
        'வாகன விபத்துக்கள் மற்றும் பழுதுகள்',
        'மனதில் அமைதியின்மை மற்றும் கோபம்',
        'நிலம் மற்றும் சொத்து வழக்குகள்',
        'மார்பு மற்றும் இதய பிரச்சனைகள்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் வீட்டில் சாந்தி',
        'தாய் சந்தோஷம் மற்றும் ஆசிர்வாதம்'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'அன்னபூர்ணி வழிபாடு',
          description: 'செவ்வாய்க்கிழமை அன்னபூர்ணி தேவியை வழிபடுதல்',
          timing: 'செவ்வாய்க்கிழமை காலை'
        },
        {
          type: 'வீட்டு பரிகாரம்',
          title: 'வாஸ்து சாந்தி',
          description: 'வீட்டில் வாஸ்து சாந்தி பூஜை நடத்துதல்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'தானம்',
          title: 'வெள்ளி பாத்திரம் தானம்',
          description: 'வெள்ளி அல்லது வெள்ளை நிற பாத்திரங்கள் தானம்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'தாய் சேவை',
          title: 'தாய்க்கு சிறப்பு அன்பு காட்டுதல்',
          description: 'தாய்க்கு சிறப்பு சேவை மற்றும் மதிப்பு கொடுத்தல்',
          timing: 'தினமும்'
        }
      ],
      mantras: [
        {
          name: 'சந்திர மந்திரம்',
          text: 'ஓம் சும் சோமாய நமஃ',
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
        'மக்கள் பெறுவதில் மருத்துவ சிக்கல்கள்',
        'கல்வியில் கவனமின்மை மற்றும் தோல்விகள்',
        'புத்தி மட்டுப்பாடு மற்றும் ஞாபக சக்தி குறைவு',
        'ஆசிரியர்களுடன் வாக்குவாதம்',
        'போட்டித் தேர்வுகளில் தோல்வி',
        'வயிறு மற்றும் செரிமான கோளாறுகள்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் கல்விக்கான அறிவு வளர்ச்சி',
        'மக்கள் பாக்கியம் கிடைத்தல்'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'சரஸ்வதி வழிபாடு',
          description: 'செவ்வாய்க்கிழமை சரஸ்வதி தேவியை வழிபடுதல்',
          timing: 'செவ்வாய்க்கிழமை காலை'
        },
        {
          type: 'கல்விப் பரிகாரம்',
          title: 'ஆசிரியர் தக்ஷிணை',
          description: 'ஆசிரியர்களுக்கு மரியாதை மற்றும் தக்ஷிணை கொடுத்தல்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'தானம்',
          title: 'கல்வி உபகரணங்கள் தானம்',
          description: 'ஏழை மாணவர்களுக்கு புத்தகம், எழுதும் பொருட்கள் தானம்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'பக்தி பரிகாரம்',
          title: 'ராமாயண பாராயணம்',
          description: 'வாரம் ஒரு முறை ராமாயண பாராயணம் செய்தல்',
          timing: 'செவ்வாய்க்கிழமை'
        }
      ],
      mantras: [
        {
          name: 'ஸரஸ்வதி மந்திரம்',
          text: 'ஓம் ஐம் ஸரஸ்வதியை நமஃ',
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
        'பகைவர் எண்ணிக்கை அதிகரிப்பு',
        'நீண்டகால நோய்கள் மற்றும் சிகிச்சை செலவுகள்',
        'கடன் பிரச்சனைகள் மற்றும் வட்டி சுமை',
        'வேலையில் துன்புறுத்தல் மற்றும் அநீதி',
        'சட்ட வழக்குகள் மற்றும் நீதிமன்ற செலவுகள்',
        'தாழ்வு நிலை உணர்வு மற்றும் மானசீக அழுத்தம்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் எதிரிகள் நட்பாக மாறுதல்',
        'நோய் குணமாதல் மற்றும் சேவை வாய்ப்புகள்'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'துர்கா வழிபாடு',
          description: 'செவ்வாய்க்கிழமை துர்கா தேவியை வழிபடுதல்',
          timing: 'செவ்வாய்க்கிழமை மாலை'
        },
        {
          type: 'தானம்',
          title: 'மருந்து தானம்',
          description: 'ஏழை நோயாளிகளுக்கு மருந்து மற்றும் மருத்துவ உதவி',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'சேவை',
          title: 'மருத்துவமனை சேவை',
          description: 'மருத்துவமனையில் நோயாளிகளுக்கு சேவை செய்தல்',
          timing: 'வாரம் ஒரு முறை'
        },
        {
          type: 'ஆன்மீக பரிகாரம்',
          title: 'துர்க்கா சப்தசதி பாராயணம்',
          description: 'மாதம் ஒரு முறை துர்க்கா சப்தசதி பாராயணம்',
          timing: 'நவராத்திரி காலம்'
        }
      ],
      mantras: [
        {
          name: 'துர்கா மந்திரம்',
          text: 'ஓம் துர்கையை நமஃ',
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
        'திருமண தாமதம் மற்றும் சுயம்வர சிக்கல்கள்',
        'கணவன்/மனைவியுடன் அடிக்கடி சண்டைகள்',
        'வியாபார கூட்டாளிகளுடன் மோதல்கள்',
        'பாலியல் உறவில் சிக்கல்கள்',
        'விவாகரத்து மற்றும் பிரிவு சம்பவங்கள்',
        'சிறுநீரக மற்றும் இனப்பெருக்க உறுப்பு நோய்கள்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் திருமண வாழ்க்கை சிறப்பு',
        'கூட்டாளிகளுடன் நல்ல ஒத்துழைப்பு'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'சிவ பார்வதி வழிபாடு',
          description: 'செவ்வாய்க்கிழமை சிவ பார்வதியை வழிபடுதல்',
          timing: 'செவ்வாய்க்கிழமை மாலை'
        },
        {
          type: 'விரத அனுஷ்டானம்',
          title: 'மங்கல கௌரி விரதம்',
          description: 'செவ்வாய்க்கிழமை மங்கல கௌரி விரதம் இருத்தல்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'தானம்',
          title: 'சிவப்பு வஸ்திரம் தானம்',
          description: 'சிவப்பு மற்றும் மஞ்சள் துணிகள் தானம்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'சம்பந்த பரிகாரம்',
          title: 'தம்பதிகள் சேர்ந்து பூஜை',
          description: 'கணவன் மனைவி சேர்ந்து லக்ஷ்மி நாராயண பூஜை',
          timing: 'வெள்ளிக்கிழமை'
        }
      ],
      mantras: [
        {
          name: 'சுக்ர மந்திரம்',
          text: 'ஓம் ஶும் ஶுக்ராய நமஃ',
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
        'திடீர் விபத்துக்கள் மற்றும் காயங்கள்',
        'மர்ம சம்பவங்கள் மற்றும் ரகசிய எதிரிகள்',
        'மரண பயம் மற்றும் அச்ச உணர்வு',
        'ஆயுட்காலம் குறைதல்',
        'குடல் மற்றும் இனப்பெருக்க உறுப்பு நோய்கள்',
        'ரகசிய வியாதிகள் மற்றும் மனநோய்கள்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் ஆயுள் வளர்ச்சி',
        'ரகசிய ஞானம் மற்றும் ஆன்மீக முன்னேற்றம்'
      ],
      remedies: [
        {
          type: 'மந்திர பரிகாரம்',
          title: 'மகா மிருத்யுஞ்சய மந்திரம்',
          description: 'மகா மிருத்யுஞ்சய மந்திரம் 108 முறை ஜபம்',
          timing: 'செவ்வாய்க்கிழமை ராஹு காலம்'
        },
        {
          type: 'தானம்',
          title: 'கருப்பு பொருட்கள் தானம்',
          description: 'கருப்பு எள், கருப்பு உருந்து, இரும்பு பொருட்கள் தானம்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'வழிபாடு',
          title: 'காலபைரவர் வழிபாடு',
          description: 'செவ்வாய்க்கிழமை காலபைரவர் கோயிலில் பூஜை',
          timing: 'செவ்வாய்க்கிழமை இரவு'
        },
        {
          type: 'பாதுகாப்பு பரிகாரம்',
          title: 'ருத்ராக்ஷ தாரணை',
          description: '5 முகம் ருத்ராக்ஷ அணிந்து பாதுகாப்பு பெறுதல்',
          timing: 'எப்போதும்'
        }
      ],
      mantras: [
        {
          name: 'மிருத்யுஞ்சய மந்திரம்',
          text: 'ஓம் த்ர்யம்பகம் யஜாமஹே சுகந்திம் புஷ்டிவர்த்தனம்',
          count: '108 முறை',
          timing: 'செவ்வாய்க்கிழமை ராஹு காலம்'
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
        'தந்தையின் உடல்நலத்தில் சிக்கல்கள்',
        'குரு மற்றும் ஆசானை அவமதித்தல்',
        'பாக்கியம் குறைதல் மற்றும் தோல்விகள்',
        'மத நம்பிக்கையில் சந்தேகம்',
        'தர்ம காரியங்களில் இடையூறுகள்',
        'தொடை மற்றும் இடுப்பு பகுதி பிரச்சனைகள்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் தந்தை ஆசிர்வாதம்',
        'குரு கிருபை மற்றும் ஞான வளர்ச்சி'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'தட்சிணாமூர்த்தி வழிபாடு',
          description: 'செவ்வாய்க்கிழமை தட்சிணாமூர்த்தி வழிபாடு',
          timing: 'செவ்வாய்க்கிழமை காலை'
        },
        {
          type: 'குரு சேவை',
          title: 'ஆசிரியர் தக்ஷிணை',
          description: 'ஆன்மீக ஆசிரியர்களுக்கு தக்ஷிணை வழங்குதல்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'தர்ம காரியம்',
          title: 'கோ தானம்',
          description: 'பசுவுக்கு தானம் மற்றும் சேவை செய்தல்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'தந்தை சேவை',
          title: 'தந்தைக்கு மரியாதை',
          description: 'தந்தைக்கு சிறப்பு மரியாதை மற்றும் சேவை',
          timing: 'தினமும்'
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
        'தொழிலில் முன்னேற்றமின்மை மற்றும் பதவி இழப்பு',
        'சமுதாயத்தில் மதிப்பின்மை மற்றும் அவமானம்',
        'அரசியல் மற்றும் அதிகார விஷயங்களில் தோல்வி',
        'மேலதிகாரிகளுடன் மோதல்கள்',
        'எலும்பு மற்றும் மூட்டு பிரச்சனைகள்',
        'கெட்ட பெயர் மற்றும் புகழ் குறைவு'
      ],
      positiveEffects: [
        'பரிகாரத்தால் தொழிலில் வெற்றி',
        'சமுதாய மதிப்பு மற்றும் பதவி உயர்வு'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'சனி பகவான் வழிபாடு',
          description: 'செவ்வாய்க்கிழமை சனி பகவான் வழிபாடு',
          timing: 'செவ்வாய்க்கிழமை மாலை'
        },
        {
          type: 'சேவை',
          title: 'தொழிலாளர் சேவை',
          description: 'ஏழை தொழிலாளர்களுக்கு உணவு மற்றும் உதவி',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'தானம்',
          title: 'இரும்பு தானம்',
          description: 'இரும்பு பொருட்கள் மற்றும் கரும்பு தானம்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'விரத அனுஷ்டானம்',
          title: 'மங்கல வார விரதம்',
          description: 'செவ்வாய்க்கிழமை விரதம் இருத்தல்',
          timing: 'ஒவ்வொரு செவ்வாய்க்கிழமையும்'
        }
      ],
      mantras: [
        {
          name: 'சனி மந்திரம்',
          text: 'ஓம் ஸம் ஸனைஶ்சராய நமஃ',
          count: '108 முறை',
          timing: 'செவ்வாய்க்கிழமை மாலை'
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
        'எதிர்பார்த்த வருமானம் கிடைக்காமை',
        'நண்பர்களால் மோசடி மற்றும் துரோகம்',
        'ஆசைகள் நிறைவேறாமை மற்றும் ஏமாற்றம்',
        'மூத்த சகோதரர்களுடன் சண்டை',
        'கால் மற்றும் கணுக்கால் பிரச்சனைகள்',
        'சமூக நெட்வொர்க்கில் சிக்கல்கள்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் நல்ல நண்பர்கள் கிடைத்தல்',
        'எதிர்பாராத லாபம் மற்றும் வருமானம்'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'விஷ்ணு பகவான் வழிபாடு',
          description: 'செவ்வாய்க்கிழமை விஷ்ணு பகவான் வழிபாடு',
          timing: 'செவ்வாய்க்கிழமை மாலை'
        },
        {
          type: 'தானம்',
          title: 'கீரை வகைகள் தானம்',
          description: 'சிவப்பு நிற கீரைகள் மற்றும் காய்கறிகள் தானம்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'நட்பு பரிகாரம்',
          title: 'நல்ல நண்பர்களுடன் சத்சங்கம்',
          description: 'ஆன்மீக விஷயங்களில் ஆர்வமுள்ள நண்பர்களுடன் நேரம் செலவிடுதல்',
          timing: 'வாரம் ஒரு முறை'
        },
        {
          type: 'ஆரோக்கிய பரிகாரம்',
          title: 'கால் மசாஜ்',
          description: 'வாரம் 2 முறை கால் பயிற்சி மற்றும் மசாஜ்',
          timing: 'செவ்வாய் மற்றும் வெள்ளிக்கிழமை'
        }
      ],
      mantras: [
        {
          name: 'விஷ்ணு மந்திரம்',
          text: 'ஓம் நமோ நாராயணாய',
          count: '108 முறை',
          timing: 'செவ்வாய்க்கிழமை மாலை'
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
        'வெளிநாட்டு பயணங்களில் சிக்கல்கள்',
        'தூக்கமின்மை மற்றும் கனவுகளில் பயம்',
        'பணம் மற்றும் சொத்து இழப்புகள்',
        'ஆன்மீக முன்னேற்றத்தில் தடைகள்',
        'மறைமுக எதிரிகளின் சூழ்ச்சிகள்',
        'கண் மற்றும் கால் பிரச்சனைகள்'
      ],
      positiveEffects: [
        'பரிகாரத்தால் ஆன்மீக வளர்ச்சி',
        'வெளிநாட்டு வாய்ப்புகள் மற்றும் மோக்ஷம்'
      ],
      remedies: [
        {
          type: 'வழிபாடு',
          title: 'கேது கிரக வழிபாடு',
          description: 'செவ்வாய்க்கிழமை கேது கிரக வழிபாடு',
          timing: 'செவ்வாய்க்கிழமை மாலை'
        },
        {
          type: 'தானம்',
          title: 'பல வர்ண பொருட்கள் தானம்',
          description: 'கலந்த நிறங்களில் துணிகள் மற்றும் பொருட்கள் தானம்',
          timing: 'செவ்வாய்க்கிழமை'
        },
        {
          type: 'ஆன்மீக பரிகாரம்',
          title: 'தியானம் மற்றும் யோகா',
          description: 'தினமும் தியானம் மற்றும் ஆன்மீக பயிற்சிகள்',
          timing: 'தினமும् காலை மற்றும் மாலை'
        },
        {
          type: 'விதேச பரிகாரம்',
          title: 'தீர்த்த யாத்திரை',
          description: 'புண்ணிய தலங்களுக்கு யாத்திரை செய்தல்',
          timing: 'வருடம் ஒரு முறை'
        }
      ],
      mantras: [
        {
          name: 'கேது மந்திரம்',
          text: 'ஓம் கேம் கேதவே நமஃ',
          count: '108 முறை',
          timing: 'செவ்வாய்க்கிழமை மாலை'
        }
      ],
      severityLevel: 'அதிக'
    }
  ];

  commonRemedies = {
    daily: [
      'ஹனுமான் சாலீசா பாராயணம்',
      'செவ்வாய் கிரக வணக்கம்',
      'சிவப்பு பூ அணிதல்',
      'முருகன் வழிபாடு செய்தல்'
    ],
    weekly: [
      'செவ்வாய்க்கிழமையில் விரதம் இருத்தல்',
      'செவ்வாய்க்கிழமையில் ஹனுமான் கோயில் செல்லுதல்',
      'சிவப்பு நிற உணவு தவிர்த்தல்',
      'செவ்வாய்க்கிழமையில் தானம் செய்தல்'
    ],
    monthly: [
      'அங்காரக சதுர்த்தி விரதம்',
      'மங்கல கௌரி பூஜை',
      'மாதம் ஒரு முறை முருகன் கோயில் வழிபாடு',
      'சிவப்பு நிற துணிகள் தானம்'
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
    const completed = localStorage.getItem('completedManthiBhavams');
    if (completed) {
      this.completedBhavams = JSON.parse(completed);
    }
  }

  loadFavoriteBhavams() {
    const favorites = localStorage.getItem('favoriteManthiBhavams');
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

  trackByBhavamId(index: number, bhavam: MaanthiBhavam): number {
    return bhavam.id;
  }

  getProgressPercentage(): number {
    return this.completedBhavams.length / this.bhavamList.length;
  }

  isBhavamCompleted(bhavamId: number): boolean {
    return this.completedBhavams.includes(bhavamId);
  }

  isFavorite(bhavam: MaanthiBhavam): boolean {
    return this.favoriteBhavams.includes(bhavam.id);
  }

  toggleFavorite(bhavam: MaanthiBhavam, event: Event) {
    event.stopPropagation();
    
    const index = this.favoriteBhavams.indexOf(bhavam.id);
    if (index > -1) {
      this.favoriteBhavams.splice(index, 1);
    } else {
      this.favoriteBhavams.push(bhavam.id);
    }
    
    localStorage.setItem('favoriteManthiBhavams', JSON.stringify(this.favoriteBhavams));
    this.showToast(index > -1 ? 'விருப்பம் நீக்கப்பட்டது' : 'விருப்பத்தில் சேர்க்கப்பட்டது');
  }

  openBhavamDetail(bhavam: MaanthiBhavam) {
    this.selectedBhavam = bhavam;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedBhavam = null;
  }

  markAsCompleted(bhavam: MaanthiBhavam) {
    if (!this.completedBhavams.includes(bhavam.id)) {
      this.completedBhavams.push(bhavam.id);
      localStorage.setItem('completedManthiBhavams', JSON.stringify(this.completedBhavams));
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
          title: 'மந்தி பரிகாரங்கள்',
          text: '12 பாவங்களில் மந்தி தோஷத்தின் விளைவுகள் மற்றும் பரிகார முறைகள் பற்றி அறிந்து கொள்ளுங்கள்'
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const text = 'மந்தி பரிகாரங்கள் - 12 பாவங்களில் மந்தி தோஷத்தின் விளைவுகள் மற்றும் பரிகார முறைகள்';
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          this.showToast('உள்ளடக்கம் நகலெடுக்கப்பட்டது');
        }
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  }

  async shareBhavam(bhavam: MaanthiBhavam) {
    try {
      const shareText = `${bhavam.name} - மந்தி பரிகாரங்கள்: ${bhavam.negativeEffects[0]}`;
      if (navigator.share) {
        await navigator.share({
          title: `${bhavam.name} - மந்தி பரிகாரங்கள்`,
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
