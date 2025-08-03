import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, AlertController, IonModal } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Padal {
  id: string;
  name: string;
  deity: string;
  text?: string;
  meaning?: string;
  benefits: string[];
  howToSing?: string;
  bestTime?: string;
  duration?: string;
  author?: string;
  verses?: number;
  webLink?: string;
  videoLink?: string;
  specialFeatures?: string[];
  individualSongs?: Padal[];
}

interface PadalCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  mantras: Padal[];
}

@Component({
  selector: 'app-theiva-vazhipadu-padalgal',
  templateUrl: './theiva-vazhipadu-padalgal.page.html',
  styleUrls: ['./theiva-vazhipadu-padalgal.page.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ height: '0px', opacity: 0, overflow: 'hidden' }),
        animate('300ms ease-in-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ height: '0px', opacity: 0, overflow: 'hidden' }))
      ])
    ])
  ]
})
export class TheivaValzipaduPadalgalPage implements OnInit {

  @ViewChild('detailModal', { static: true }) detailModal!: IonModal;
  @ViewChild('previewModal', { static: true }) previewModal!: IonModal;

  selectedSegment = 'categories';
  selectedCategory = '';
  selectedPadal: Padal | null = null;
  selectedPadalForPreview: any = null;
  searchTerm = '';
  isPlaying = false;
  currentAudio: HTMLAudioElement | null = null;
  favoritePadalIds: string[] = [];
  isBookmarked = false;
  
  // Additional properties for padal categories
  selectedPadalCategory: any = null;
  expandedCategories: { [key: string]: boolean } = {};
  favoritePadalCategoryIds: string[] = [];
  
  // Divine Worship Songs Structure
  padalCategories: PadalCategory[] = [
    {
      id: 'vinayagar',
      name: 'விநாயகர் பாடல்கள்',
      icon: '🐘',
      color: 'primary',
      mantras: [
        {
          id: 'vinayagar_agaval',
          name: 'விநாயகர் அகவல்',
          deity: 'விநாயகர்',
          text: 'சீதக் களபச் செந்தா மரைப்பூம்\nபாதச் சிலம்பு பலவிசை பாடப்\nபொன்னரை ஞாணும் பூந்துகில் ஆடையும்\nவன்னமருங்கில் வளர்ந்தழ கெறிப்பப்\nபேழை வயிறும் பெரும்பாரக் கோடும்\n\nவேழ முகமும் விளங்குசிந் தூரமும்\nஅஞ்சு கரமும் அங்குச பாசமும்\nநெஞ்சிற் குடிகொண்ட நீல மேனியும்\nநான்ற வாயும் நாலிரு புயமும்\nமூன்று கண்ணும் மும்மதச் சுவடும்\n\nஇரண்டு செவியும் இலங்குபொன் முடியும்\nதிரண்டமுப் புரிநூல் திகழொளி மார்பும்\nசொற்பதம் கடந்த துரியமெய்ஞ் ஞான\nஅற்புதம் நின்ற கற்பகக் களிறே!\nமுப்பழ நுகரும் மூஷிக வாகன!\n\nஇப்பொழு தென்னை ஆட்கொள வேண்டித்\nதாயா யெனக்குத் தானெழுந் தருளி\nமாயாப் பிறவி மயக்கம் அறுத்துத்\nதிருந்திய முதலைந் தெழுத்தும் தெளிவாய்ப்\nபொருந்தவே வந்தென் உளந்தனில் புகுந்து\n\nகுருவடி வாகிக் குவலயந் தன்னில்\nதிருவடி வைத்துத் திறமிது பொருளென\nவாடா வகைதான் மகிழ்ந்தெனக் கருளிக்\nகோடா யுதத்தால் கொடுவினை களைந்தே\nஉவட்டா உபதேசம் புகட்டியென் செவியில்\n\nதெவிட்டாத ஞானத் தெளிவையும் காட்டி\nஐம்புலன் தன்னை அடக்கும் உபாயம்\nஇன்புறு கருணையின் இனிதெனக் கருளிக்\nகருவிக ளொடுங்கும் கருத்தினை யறிவித்து\nஇருவினை தன்னை அறுத்திருள் கடிந்து\n\nதலமொரு நான்கும் தந்தெனக் கருளி\nமலமொரு மூன்றின் மயக்கம் அறுத்தே\nஒன்பது வாயில் ஒருமந் திரத்தால்\nஐம்புலக் கதவை அடைப்பதும் காட்டி\nஆறா தாரத்து அங்குச நிலையும்\n\nபேறா நிறுத்திப் பேச்சுரை யறுத்தே\nஇடைபிங் கலையின் எழுத்தறி வித்துக்\nகடையிற் சுழுமுனைக் கபாலமும் காட்டி\nமூன்றுமண் டலத்தின் முட்டிய தூணின்\nநான்றெழு பாம்பின் நாவில் உணர்த்திக்\n\nகுண்டலி யதனிற் கூடிய அசபை\nவிண்டெழு மந்திரம் வெளிப்பட உரைத்து\nமூலா தாரத்தின் மூண்டெழு கனலைக்\nகாலால் எழுப்பும் கருத்தறி வித்தே\nஅமுத நிலையும் ஆதித்தன் இயக்கமும்\n\nகுமுத சகாயன் குணத்தையும் கூறி\nஇடைச்சக் கரத்தின் ஈரெட்டு நிலையும்\nஉடல்சக் கரத்தின் உறுப்பையும் காட்டிச்\nசண்முக தூலமும் சதுர்முக சூக்கமும்\nஎண் முகமாக இனிதெனக் கருளிப்\n\nபுரியட்ட காயம் புலப்பட எனக்குத்\nதெரியெட்டு நிலையும் தெரிசனப் படுத்திக்\nகருத்தினில் கபால வாயில் காட்டி\nஇருத்தி முத்தி யினிதெனக் கருளி\nஎன்னை யறிவித்து எனக்கருள் செய்து\n\nமுன்னை வினையின் முதலைக் களைந்து\nவாக்கும் மனமும் இல்லா மனோலயம்\nதேக்கியே யென்றன் சிந்தை தெளிவித்து\nஇருள்வெளி யிரண்டுக்கு ஒன்றிடம் என்ன\nஅருள்தரும் ஆனந்தத்து அழுத்தியென் செவியில்\n\nஎல்லை யில்லா ஆனந் தம்அளித்து\nஅல்லல் களைந்தே அருள்வழி காட்டிச்\nசத்தத்தின் உள்ளே சதாசிவம் காட்டிச்\nசித்தத்தின் உள்ளே சிவலிங்கம் காட்டி\nஅணுவிற்கு அணுவாய் அப்பாலுக்கு அப்பாலாய்க்\n\nகணுமுற்றி நின்ற கரும்புள்ளே காட்டி\nவேடமும் நீறும் விளங்க நிறுத்திக்\nகூடுமெய்த் தொண்டர் குழாத்துடன் கூட்டி\nஅஞ்சக் கரத்தின் அரும்பொருள் தன்னை\nநெஞ்சக் கருத்தின் நிலையறி வித்துத்\n\nதத்துவ நிலையைத் தந்தெனை யாண்ட\nவித்தக விநாயக விரைகழல் சரணே!\n\nஓம் விக்ன விநாயகா போற்றி...',
          benefits: ['விக்னங்கள் நீங்கும்', 'ஞான வளர்ச்சி', 'புத்தி கூர்மை', 'சகல காரியங்களும் வெற்றி', 'ஆன்மீக விமோசனம்', 'மன அமைதி', 'கல்வி சிறப்பு', 'ஞான தீபம்'],
          author: 'அவ்வையார்',
          verses: 72,
          howToSing: 'பக்தியுடன் தெளிவான உச்சரிப்புடன், ஒவ்வொரு வரியும் உணர்ந்து பாடவும்',
          bestTime: 'விநாயக சதுர்த்தி, புதன்கிழமை, காலை 6-8 மணி',
          duration: '45-60 நிமிடங்கள்'
        }
      ]
    },
    {
      id: 'murugan',
      name: 'முருகன் பாடல்கள்',
      icon: '🦚',
      color: 'secondary',
      mantras: [
        {
          id: 'sakalakala_valli_malai',
          name: 'சகலகலாவல்லி மாலை',
          deity: 'முருகன்',
          text: 'சகலகலாவல்லி தனையடைந்து\nசங்கரநின் புதல்வன் பதம்பணிந்து\nசுகமுறு நாளெல்லாம் துன்பகலந்து\nசுந்தரவல்லிக்கு மணாளனே\nஅகிலாண்ட கோடி பிரபஞ்சனே\nஅருமுகம் ஆறுடை யப்பனே',
          benefits: ['கல்வி சிறப்பு', 'கலை வளர்ச்சி', 'பிள்ளைகள் நலம்', 'வல்லி தேவசேனாபதி அருள்'],
          author: 'குமரகுருபரர்',
          verses: 100,
          howToSing: 'மெல்லிய இசையுடன் பக்தியுடன்',
          bestTime: 'கார்த்திகை மாதம், செவ்வாய்கிழமை',
          duration: '1-1.5 மணி நேரம்'
        },
        {
          id: 'sasti_kavasam',
          name: 'சஷ்டி கவசம்',
          deity: 'முருகன்',
          text: 'ஆதி அந்தம் இல்லாத ஆனந்த வல்லியே\nஆதிசக்தி ஆனந்தம் ஆறுமுக வல்லியே\nபாதமலர் சூடுகின்ற பாரத வல்லியே\nபால முகங்கள் ஆறுடைய பண்பு வல்லியே\nவேதம் புகழும் விமல வல்லியே\nமேலோர் அனைவரும் வணங்கும் வல்லியே',
          benefits: ['பயம் நீக்கம்', 'ஆபத்து நிவாரணம்', 'சத்ரு சங்காரம்', 'முருகன் பாதுகாப்பு'],
          author: 'தேவராய சுவாமிகள்',
          verses: 244,
          howToSing: 'வீரமான குரலில் பக்தியுடன்',
          bestTime: 'செவ்வாய், வெள்ளிக்கிழமை',
          duration: '45-60 நிமிடங்கள்'
        }
      ]
    },
    {
      id: 'shiva',
      name: 'சிவன் பாடல்கள்',
      icon: '🕉️',
      color: 'tertiary',
      mantras: [
        {
          id: 'thiruvasagam',
          name: 'திருவாசகம் (சிறப்பு பாடல்கள்)',
          deity: 'சிவபெருமான்',
          text: 'அடியேன் உணர்வு கெட்டி பொய்ம்மை செய்தால்\nஅடியேனைக் கொல்க அரன் என்கோ\nபடியேறும் உம்பர் பலர் தொழுது ஏத்த\nபண்ணின் இசை ஞானம் பகர்ந்தோனே\nதடமேனி நீறணி சென்னியனே\nதனிமூர்த்தி என்றன் தயாநிதியே',
          benefits: ['ஆன்மீக விமோசனம்', 'சிவ கடாக்ஷம்', 'பாவ விமோசனம்', 'மன சுத்தி'],
          author: 'மாணிக்கவாசகர்',
          verses: 658,
          howToSing: 'ஆத்ம பக்தியுடன் மனதார',
          bestTime: 'சிவராத்திரி, திங்கட்கிழமை',
          duration: '2-3 மணி நேரம்'
        }
      ]
    },
    {
      id: 'amman',
      name: 'அம்மன் பாடல்கள்',
      icon: '🪔',
      color: 'danger',
      mantras: [
        {
          id: 'lalitha_sahasranamam',
          name: 'லலிதா சஹஸ்ர நாமம் (தமிழ்)',
          deity: 'லலிதா அம்பிகை',
          text: 'ஶ்ரீமாதா ஶ்ரீமஹாராஜ்ஞீ ஶ்ரீமத்சிம்ஹாஸனேஶ்வரீ\nசித்ராக்ரணி சக்தி சக்திமத்ப்ரியா\nசித்ராகண நாதசக்தி சத்ருப்பா ஸமக்னித்யா\nசித்ராநந்த லஹரீ சாமக நவ ரூபிணீ',
          benefits: ['சர்வ ஐஸ்வர்யம்', 'அம்பிகை அருள்', 'சௌந்தர்ய வர்த்தனை', 'சகல சித்திகள்'],
          author: 'அகஸ்தியர்',
          verses: 1000,
          howToSing: 'சந்தோஷமான மனதுடன் மெதுவாக',
          bestTime: 'வெள்ளிக்கிழமை, நவராத்திரி',
          duration: '1.5-2 மணி நேரம்',
          webLink: 'https://aanmeegam.co.in/blogs/lyrics/lalitha-sahasranamam-lyrics-tamil/',
          videoLink: 'https://youtu.be/DtSBLpQStT4'
        },
        {
          id: 'abhirami_anthathi',
          name: 'அபிராமி அந்தாதி',
          deity: 'அபிராமி அம்பிகை',
          text: 'தார் அமர் கொன்றையும் சங்கரன் செண்டு அலகும் மடந்தையர் பங்கன் மலர்ந்து அருள் கூர்ந்து\nநார் அயல் வேணியும் நாகமும் ஆடையும் பூண் அணி மார்பினில் போல வளர்ந்து\nபார் உயர் கொங்கையும் பாம்பணை மேகலையும் சுரும்பு அலி கேசரையும் வியக்கும்\nகார் உயர் மேனியும் கண் இமை போலவே நம் அபிராமி கவின் திருமேனியே',
          meaning: 'அபிராமி அம்பிகையின் திருமேனியழகு மற்றும் அருளாசியைப் போற்றும் அற்புதமான நூல். அபிராமித்தபதர் என்னும் சுப்பிரமணிய பாரதியாரால் இயற்றப்பட்ட 100 பாடல்களின் அந்தாதி.',
          benefits: [
            'அம்பிகை அருள் பெறுதல்',
            'அழகு வளர்ச்சி',
            'திருமணத் தடைகள் நீங்குதல்',
            'குலதெய்வ அருள்',
            'ஞான வளர்ச்சி',
            'மன அமைதி',
            'பராசக்தி அனுபவம்',
            'வேத ஞானம்',
            'ஆன்மீக விமோசனம்',
            'சர்வ சௌபாக்கியம்'
          ],
          author: 'அபிராமித்தபதர் (சுப்பிரமணிய பாரதியார்)',
          verses: 100,
          howToSing: 'பக்தியுடன் மெதுவாக ஒவ்வொரு பாடலாக சொல்லவும். அம்பிகையின் திருவுருவத்தை மனதில் நினைத்துக் கொண்டு பாடவும்.',
          bestTime: 'வெள்ளிக்கிழமை, அமாவாசை, பௌர்ணமி, நவராத்திரி காலங்கள்',
          duration: '45-60 நிமிடங்கள்',
          webLink: 'https://ta.wikisource.org/wiki/அபிராமி_அந்தாதி',
          videoLink: 'https://youtu.be/AbhiramiAnthathi',
          specialFeatures: [
            'ஒவ்வொரு பாடலும் அந்தாதி பாணியில் அமைந்துள்ளது',
            'அம்பிகையின் வெவ்வேறு ரூபங்களை வர்ணிக்கிறது',
            'தமிழ் இலக்கியத்தின் சிறந்த படைப்புகளில் ஒன்று',
            'ஆன்மீக ஞானம் மற்றும் பக்தி உணர்வை வளர்க்கிறது'
          ]
        }
      ]
    },
    {
      id: 'vishnu',
      name: 'விஷ்ணு பாடல்கள்',
      icon: '🐚',
      color: 'success',
      mantras: [
        {
          id: 'vishnu_sahasranamam',
          name: 'விஷ்ணு சஹஸ்ர நாமம்',
          deity: 'விஷ்ணு',
          text: 'விஶ்வம் விஷ்ணுர்வஷட்காரோ பூத பவ்ய பவத் ப்ரபு:\nபூதகृத் பூதபூர்த் பாவோ பூதாத்மா பூதபாவன:\nபூர்ணகாமோ அகாமஹா காம கோடீ பிருப் பிருது:\nவர தோ வருத ஈசோ வருண ஓ மாருத ஓமருத:',
          benefits: ['விஷ்ணு அனுக்ரஹம்', 'லோக கல்யாணம்', 'பாப நாசம்', 'மோக்ஷ பிராப்தி'],
          author: 'வேத வியாசர்',
          verses: 1000,
          howToSing: 'ஓம் உச்சரிப்புடன் சாந்தமாக',
          bestTime: 'ஏகாதசி, வியாழக்கிழமை',
          duration: '1-1.5 மணி நேரம்'
        }
      ]
    },
    {
      id: 'natchithram',
      name: 'நட்சத்திரம் பாடல்கள்',
      icon: '⭐',
      color: 'medium',
      mantras: [
        {
          id: 'kolaru_thirupathigam',
          name: 'கோளறு திருப்பதிகம்',
          deity: 'சிவபெருமான்',
          text: 'வேயுறு தோளி பங்கன் விடமுண்ட கண்டன் மிக நல்ல வீணை தடவி\nமாசறு திங்கள் கங்கை முடி மேல் அணிந்து என் உளமே புகுந்த அதனால்\nஞாயிறு திங்கள் செவ்வாய் புதன் வியாழன் வெள்ளி சனி பாம்பிரண்டும் உடனே\nஆசறு நல்லநல்ல அவை நல்லநல்ல அடியாரவர்க்கு மிகவே!\n\nஎன்பொடு கொம்பொடு ஆமை இவை மார்பிலங்க எருதேறி ஏழையுடனே\nபொன்பொதி மத்தமாலை புனல் சூடி வந்தென் உளமே புகுந்த அதனால்\nஒன்பதொடு ஒன்றொடு ஏழு பதினெட்டொடாறும் உடனாய நாள்களவை தாம்\nஅன்பொடு நல்லநல்ல அவை நல்லநல்ல அடியாரவர்க்கு மிகவே!\n\nஉருவளர் பவளமேனி ஒளி நீறணிந்து உமையோடும் வெள்ளை விடை மேல்\nமுருகலர் கொன்றை திங்கள் முடிமேல் அணிந்தென் உளமே புகுந்த அதனால்\nதிருமகள் கலையதூர்தி செயமாது பூமி திசை தெய்வமான பலவும்\nஅருநெதி நல்லநல்ல அவை நல்லநல்ல அடியார் அவர்க்கு மிகவே.\n\nமதிநுதல் மங்கையோடு வடவாலி ருந்து மறையோதும் எங்கள் பரமன்\nநதியொடு கொன்றை மாலை முடிமே லணிந்தென் உளமே புகுந்த அதனால்\nகொதியுறு காலனங்கி நமனோடு தூதர் கொடுநோய் களான பலவும்\nஅதிகுணம் நல்லநல்ல அவை நல்லநல்ல அடியாரவர்க்கு மிகவே.\n\nநஞ்சணி கண்டன் எந்தை மடவாள் தனோடும் விடையேறு நங்கள் பரமன்\nதுஞ்சிருள் வன்னி கொன்றை முடிமேலணிந்தென் உளமே புகுந்த அதனால்\nவெஞ்சின அவுணரோடும் உருமிடியும் மின்னும் மிகையான பூத மவையும்\nஅஞ்சிடும் நல்லநல்ல அவை நல்லநல்ல அடியாரவர்க்கு மிகவே.\n\nவாள்வரி யதளதாடை வரிகோ வணத்தர் மடவாள் தனோடும் உடனாய்\nநாண்மலர் வன்னிகொன்றை நதிசூடி வந்தென் உளமே புகுந்த அதனால்\nகோளரி யுழுவையோடு கொலையானை கேழல் கொடுநாக மோடு கரடி\nஆளரி நல்லநல்ல அவை நல்லநல்ல அடியாரவர்க்கு மிகவே.\n\nசெப்பிள முலைநன்மங்கை ஒரு பாகமாக விடையேறு செல்வ னடைவார்\nஒப்பிள மதியும்அப்பும் முடிமே லணிந்தென் உளமே புகுந்த அதனால்\nவெப்பொடு குளிரும்வாதம் மிகையான பித்தும் வினையான வந்து நலியா\nஅப்படி நல்லநல்ல அவை நல்லநல்ல அடியாரவர்க்கு மிகவே.\n\nவேள்பட விழி செய்தன்று விடைமேலிருந்து மடவாள் தனோடும் உடனாய்\nவாண்மதி வன்னிகொன்றை மலர்சூடி வந்தென் உளமே புகுந்த அதனால்\nஏழ்கடல் சூழிலங்கை அரையன்றனோடும் இடரான வந்து நலியா\nஆழ்கடல் நல்லநல்ல அவை நல்லநல்ல அடியாரவர்க்கு மிகவே.\n\nபலபல வேடமாகும் பரனாரி பாகன் பசுவேறும் எங்கள் பரமன்\nசலமகளோடு எருக்கு முடிமேலணிந்தென் உளமே புகுந்த அதனால்\nமலர்மிசை யோனுமாலும் மறையோடு தேவர் வருகால மான பலவும்\nஅலைகடல் மேருநல்ல அவை நல்லநல்ல அடியாரவர்க்கு மிகவே.\n\nகொத்தலர் குழலியோடு விசயற்கு நல்கு குணமாய வேட விகிர்தன்\nமத்தமு மதியுநாகம் முடிமே லணிந்தென் உளமே புகுந்த அதனால்\nபுத்தரோடமணை வாதில் அழிவிக்கும் அண்ணல் திருநீறு செம்மை திடமே\nஅத்தகு நல்ல நல்ல அவை நல்ல நல்ல அடியார் அவர்க்கு மிகவே.',
          meaning: 'நவக்கிரகங்களால் ஏற்படும் பாதிப்புகள் நீங்கி மனதில் நினைத்த நல்லன எல்லாம் நிறைவேற தினமும் ஓத வேண்டிய அற்புதமான தேவார பதிகம். ஞானசம்பந்தர் அருளிய இந்த பதிகம் நவக்கிரக தோஷங்களை நீக்கும் சக்தி கொண்டது.',
          benefits: [
            'நவக்கிரக தோஷ நிவாரணம்',
            'கால தோஷம் நீங்குதல்',
            'நட்சத்திர தோஷம் நீங்குதல்',
            'சர்வ தோஷ நிவாரணம்',
            'ஆபத்து நிவாரணம்',
            'நோய் நீக்கம்',
            'மன அமைதி',
            'சிவ அருள் பெறுதல்',
            'துன்பங்கள் விலகுதல்',
            'சகல மங்களங்கள்',
            'வானுலக பிராப்தி',
            'பக்தி வளர்ச்சி'
          ],
          author: 'திருஞானசம்பந்தர்',
          verses: 11,
          howToSing: 'தினமும் காலை மாலை இரு வேளையிலும் பக்தியுடன் பாடவும். சிவலிங்கம் முன் அல்லது சிவன் படம் முன் இருந்து பாடினால் மிக சிறப்பு.',
          bestTime: 'திங்கட்கிழமை, சிவராத்திரி, பிரதோஷ காலம், ஆதி மாதம், கோள் தோஷ காலங்கள்',
          duration: '25-30 நிமிடங்கள்',
          webLink: 'https://ta.wikisource.org/wiki/கோளறு_பதிகம்',
          specialFeatures: [
            'நவக்கிரக தோஷங்களை நீக்கும் தெய்வீக சக்தி',
            'தேவார மூவரில் ஒருவரான ஞானசம்பந்தரின் அருளிய பாடல்',
            'ஒவ்வொரு பாடலும் "நல்ல நல்ல" என்ற வாக்கால் முடிவது',
            'கோள்கள் மற்றும் நட்சத்திரங்களின் பாதிப்பை நீக்கும் மந்திர சக்தி',
            'தமிழ் சைவ மரபின் முக்கியமான பாடல்களில் ஒன்று'
          ]
        }
      ]
    },
    {
      id: 'hanuman',
      name: 'ஹனுமான் பாடல்கள்',
      icon: '🐒',
      color: 'warning',
      mantras: [
        {
          id: 'hanuman_chalisa_tamil',
          name: 'ஹனுமான் சாலீசா (தமிழ்)',
          deity: 'ஹனுமான்',
          text: 'ஜெய் ஹனுமான் ஞான குண சாகர்\nஜெய் கபீச திகுண் லோக உஜாகர்\nராம தூத் அதுலித் பல் தாமா\nஅஞ்ஜனி புத்ர பவன் சுத் நாமா',
          benefits: ['பயம் நீக்கம்', 'பல சேர்க்கை', 'பக்தி வளர்ச்சி', 'ஆபத்து நிவாரணம்'],
          author: 'துளசிதாஸ்',
          verses: 40,
          howToSing: 'உற்சாகமான குரலில்',
          bestTime: 'செவ்வாய், சனிக்கிழமை',
          duration: '15-20 நிமிடங்கள்'
        }
      ]
    }
  ];

  filteredPadals: Padal[] = [];


  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadFavorites();
    this.loadFavoritePadals();
    this.loadAbhiramiAnthathiSongs();
  }

  loadAbhiramiAnthathiSongs() {
    this.http.get<any[]>('assets/data/abhirami-anthanthi.json').subscribe(songs => {
      const ammanCategory = this.padalCategories.find(cat => cat.id === 'amman');
      if (ammanCategory) {
        const abhiramiIndex = ammanCategory.mantras.findIndex(m => m.id === 'abhirami_anthathi');
        
        if (abhiramiIndex !== -1) {
          // Add individual songs as sub-items
          ammanCategory.mantras[abhiramiIndex].individualSongs = songs.map(song => ({
            id: `abhirami_${song.id}`,
            name: song.name,
            deity: 'அபிராமி',
            text: song.text,
            meaning: song.meaning,
            benefits: song.benefits || ['அம்பிகை அருள்', 'பாதுகாப்பு', 'பக்தி', 'மோக்ஷம்'],
            author: 'அபிராமித்தபதர்',
            verses: 1,
            howToSing: 'பக்தியுடன் மெதுவாக',
            bestTime: 'வெள்ளிக்கிழமை',
            duration: '2-3 நிமிடங்கள்'
          }));
        }
      }
    });
  }

  loadFavorites() {
    const stored = localStorage.getItem('favoritePadalIds');
    if (stored) {
      this.favoritePadalIds = JSON.parse(stored);
    }
  }

  loadFavoritePadals() {
    const stored = localStorage.getItem('favoritePadalCategoryIds');
    if (stored) {
      this.favoritePadalCategoryIds = JSON.parse(stored);
    }
  }

  saveFavorites() {
    localStorage.setItem('favoritePadalIds', JSON.stringify(this.favoritePadalIds));
  }

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
    if (this.selectedSegment === 'categories') {
      this.selectedCategory = '';
    }
  }

  searchPadals() {
    // Filter songs based on search term
    if (this.searchTerm.trim()) {
      const searchTerm = this.searchTerm.toLowerCase().trim();
      // You can implement search logic here if needed
      // For now, just keeping it simple since we use expandable categories
    }
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.selectedSegment = 'padals';
  }

  openPadalDetail(padal: any) {
    this.selectedPadal = padal;
    this.previewModal.dismiss(); // Close preview modal if open
    this.detailModal.present();
  }

  closePadalDetail() {
    this.selectedPadal = null;
    this.detailModal.dismiss();
    this.stopAudio();
  }

  openPadalPreview(padal: any) {
    this.selectedPadalForPreview = padal;
    this.previewModal.present();
  }

  closePadalPreview() {
    this.selectedPadalForPreview = null;
    this.previewModal.dismiss();
  }

  toggleFavorite(padal: Padal) {
    const index = this.favoritePadalIds.indexOf(padal.id);
    if (index > -1) {
      this.favoritePadalIds.splice(index, 1);
      this.presentToast(padal.name + ' விருப்பங்களிலிருந்து நீக்கப்பட்டது');
    } else {
      this.favoritePadalIds.push(padal.id);
      this.presentToast(padal.name + ' விருப்பங்களில் சேர்க்கப்பட்டது');
    }
    this.saveFavorites();
  }

  isFavorite(padal: Padal): boolean {
    return this.favoritePadalIds.includes(padal.id);
  }

  playAudio(padal: Padal) {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
    // Audio implementation would go here
    this.isPlaying = true;
  }

  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
      this.isPlaying = false;
    }
  }

  sharePadal(padal: any) {
    const shareText = `${padal.name}\n\n${padal.text}\n\nபலன்கள்:\n${padal.benefits ? padal.benefits.join('\n') : ''}`;
    if (navigator.share) {
      navigator.share({
        title: padal.name,
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        this.presentToast('பாடல் கிளிப்போர்டில் நகலெடுக்கப்பட்டது');
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

  async showFullBenefits(padal: Padal) {
    const alert = await this.alertController.create({
      header: padal.name + ' - பலன்கள்',
      message: padal.benefits.map((benefit, index) => (index + 1) + '. ' + benefit).join('<br>'),
      buttons: ['சரி']
    });
    await alert.present();
  }

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    this.presentToast(this.isBookmarked ? 'புத்தகக்குறி சேர்க்கப்பட்டது' : 'புத்தகக்குறி நீக்கப்பட்டது');
  }

  // Padal-specific methods
  selectPadalCategory(category: any) {
    this.selectedPadalCategory = category;
  }

  toggleCategory(categoryId: string) {
    this.expandedCategories[categoryId] = !this.expandedCategories[categoryId];
  }

  copyPadal(padal: any) {
    const text = `${padal.name}\n\n${padal.text}\n\nபலன்கள்:\n${padal.benefits.join('\n')}`;
    navigator.clipboard.writeText(text).then(() => {
      this.presentToast('பாடல் நகலெடுக்கப்பட்டது');
    });
  }

  toggleFavoritePadal(padal: any) {
    const index = this.favoritePadalCategoryIds.indexOf(padal.id);
    if (index > -1) {
      this.favoritePadalCategoryIds.splice(index, 1);
      this.presentToast('விருப்பங்களிலிருந்து நீக்கப்பட்டது');
    } else {
      this.favoritePadalCategoryIds.push(padal.id);
      this.presentToast('விருப்பங்களில் சேர்க்கப்பட்டது');
    }
    localStorage.setItem('favoritePadalCategoryIds', JSON.stringify(this.favoritePadalCategoryIds));
  }

  isFavoritePadal(padal: any): boolean {
    return this.favoritePadalCategoryIds.includes(padal.id);
  }

  trackByPadalId(index: number, padal: any): string {
    return padal.id;
  }

  openWebLink(padal: any) {
    if (padal.webLink) {
      window.open(padal.webLink, '_blank');
    }
  }

  openVideoLink(padal: any) {
    if (padal.videoLink) {
      window.open(padal.videoLink, '_blank');
    }
  }

  viewSongDetail(song: Padal) {
    this.selectedPadal = song;
  }

  async viewAllAbhiramiSongs() {
    const alert = await this.alertController.create({
      header: 'அபிராமி அந்தாதி - முழு தொகுப்பு',
      message: 'இது 100 பாடல்களின் முழுமையான தொகுப்பு. ஒவ்வொரு பாடலும் அம்பிகையின் வெவ்வேறு அம்சங்களை விவரிக்கிறது. முழு பாடல்களையும் காண விரும்புகிறீர்களா?',
      buttons: [
        {
          text: 'இல்லை',
          role: 'cancel'
        },
        {
          text: 'ஆம்',
          handler: () => {
            this.showAllAbhiramiSongs();
          }
        }
      ]
    });
    await alert.present();
  }

  async showAllAbhiramiSongs() {
    const ammanCategory = this.padalCategories.find(cat => cat.id === 'amman');
    const abhiramiPadal = ammanCategory?.mantras.find(m => m.id === 'abhirami_anthathi');
    
    if (abhiramiPadal?.individualSongs) {
      let songsHtml = '<div class="all-songs-container">';
      abhiramiPadal.individualSongs.forEach((song, index) => {
        songsHtml += `
          <div class="song-item">
            <h4>பாடல் ${index + 1}: ${song.name}</h4>
            <p class="song-text">${song.text}</p>
            ${song.meaning ? `<p class="song-meaning"><strong>பொருள்:</strong> ${song.meaning}</p>` : ''}
            <div class="song-benefits">
              <strong>பலன்கள்:</strong> ${song.benefits.join(', ')}
            </div>
            <hr>
          </div>
        `;
      });
      songsHtml += '</div>';

      const alert = await this.alertController.create({
        header: 'அபிராமி அந்தாதி - அனைத்து பாடல்கள்',
        message: songsHtml,
        cssClass: 'custom-alert-large',
        buttons: [
          {
            text: 'நகல் எடு',
            handler: () => {
              const fullText = abhiramiPadal.individualSongs?.map((song, i) => 
                `பாடல் ${i + 1}: ${song.name}\n${song.text}\n${song.meaning ? 'பொருள்: ' + song.meaning + '\n' : ''}பலன்கள்: ${song.benefits.join(', ')}\n\n`
              ).join('');
              navigator.clipboard.writeText(fullText || '').then(() => {
                this.presentToast('அனைத்து பாடல்களும் நகலெடுக்கப்பட்டது');
              });
            }
          },
          {
            text: 'மூடு',
            role: 'cancel'
          }
        ]
      });
      await alert.present();
    }
  }
}
