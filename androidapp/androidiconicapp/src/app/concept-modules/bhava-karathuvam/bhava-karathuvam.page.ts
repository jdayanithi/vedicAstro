import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Bhava {
  id: string;
  number: number;
  name: string;
  nameEnglish: string;
  sanskritName: string;
  lord: string;
  lordEnglish: string;
  element: string;
  nature: string;
  significances: string[];
  significancesEnglish: string[];
  bodyParts: string[];
  relationships: string[];
  karakatva: string[];
  goodPlanets: string[];
  badPlanets: string[];
  remedies: string[];
  expanded?: boolean;
}

interface BhavaAnalysis {
  bhava: number;
  bhavaName: string;
  strength: 'strong' | 'moderate' | 'weak';
  planets: string[];
  aspects: string[];
  prediction: string;
  remedies: string[];
}

@Component({
  selector: 'app-bhava-karathuvam',
  templateUrl: './bhava-karathuvam.page.html',
  styleUrls: ['./bhava-karathuvam.page.scss'],
})
export class BhavaKarathuvamPage implements OnInit {

  selectedSegment = 'overview';
  isBookmarked = false;
  showAnalysisView = false;
  currentBhavaIndex = 0;
  searchTerm = '';
  filteredBhavas: Bhava[] = [];

  bhavas: Bhava[] = [
    {
      id: 'bhava_1',
      number: 1,
      name: 'லக்னம்',
      nameEnglish: 'Lagna/Ascendant',
      sanskritName: 'தனு பாவம்',
      lord: 'ராசி அதிபதி',
      lordEnglish: 'Sign Lord',
      element: 'அக்னி',
      nature: 'கேந்திரம்',
      significances: [
        'ஆளுமை மற்றும் தோற்றம்',
        'உடல் நலம் மற்றும் வலிமை',
        'சுயமரியாதை மற்றும் தன்னம்பிக்கை',
        'ஆயுள் மற்றும் உயிர்வாழ்வு',
        'பிறப்பு மற்றும் ஆரம்பம்'
      ],
      significancesEnglish: [
        'Personality and appearance',
        'Physical health and strength',
        'Self-respect and confidence',
        'Longevity and vitality',
        'Birth and beginnings'
      ],
      bodyParts: ['தலை', 'முகம்', 'மூளை'],
      relationships: ['தனிப்பட்ட அடையாளம்', 'சுய வெளிப்பாடு'],
      karakatva: ['சூரியன்'],
      goodPlanets: ['குரு', 'சுக்கிரன்', 'புதன்'],
      badPlanets: ['சனி', 'ராகு', 'கேது'],
      remedies: [
        'சூரிய நமஸ்காரம் தினமும்',
        'மஞ்சள் வஸ்திரம் அணியவும்',
        'ஞாயிற்றுக்கிழமை சூரிய வழிபாடு'
      ]
    },
    {
      id: 'bhava_2',
      number: 2,
      name: 'தன பாவம்',
      nameEnglish: 'Dhana Bhava',
      sanskritName: 'தன பாவம்',
      lord: 'இரண்டாம் வீட்டு அதிபதி',
      lordEnglish: 'Second House Lord',
      element: 'பூமி',
      nature: 'மாரகம்',
      significances: [
        'செல்வம் மற்றும் சம்பாத்தியம்',
        'குடும்பம் மற்றும் பேச்சு',
        'உணவு மற்றும் ருசி',
        'கல்வி மற்றும் அறிவு',
        'முகம் மற்றும் கண்கள்'
      ],
      significancesEnglish: [
        'Wealth and earnings',
        'Family and speech',
        'Food and taste',
        'Education and knowledge',
        'Face and eyes'
      ],
      bodyParts: ['முகம்', 'கண்கள்', 'வாய்', 'கழுத்து'],
      relationships: ['குடும்ப உறுப்பினர்கள்', 'பேச்சு திறமை'],
      karakatva: ['குரு', 'புதன்'],
      goodPlanets: ['குரு', 'புதன்', 'சுக்கிரன்'],
      badPlanets: ['சனி', 'செவ்வாய்'],
      remedies: [
        'லக்ஷ்மி ஸ்தோத்திரம் பாராயணம்',
        'வெள்ளிக்கிழமை சுக்கிர வழிபாடு',
        'குபேர மந்திரம் ஜபம்'
      ]
    },
    {
      id: 'bhava_3',
      number: 3,
      name: 'சகோதர பாவம்',
      nameEnglish: 'Sahaja Bhava',
      sanskritName: 'சஹஜ பாவம்',
      lord: 'மூன்றாம் வீட்டு அதிபதி',
      lordEnglish: 'Third House Lord',
      element: 'வாயு',
      nature: 'உபசயம்',
      significances: [
        'சகோதர சகோதரிகள்',
        'தைரியம் மற்றும் வீரம்',
        'கலை மற்றும் திறமைகள்',
        'குறுகிய பயணங்கள்',
        'தகவல் தொடர்பு'
      ],
      significancesEnglish: [
        'Brothers and sisters',
        'Courage and valor',
        'Arts and skills',
        'Short journeys',
        'Communication'
      ],
      bodyParts: ['கைகள்', 'தோள்கள்', 'மார்பு'],
      relationships: ['சகோதரர்கள்', 'நண்பர்கள்'],
      karakatva: ['செவ்வாய்', 'புதன்'],
      goodPlanets: ['செவ்வாய்', 'புதன்', 'சூரியன்'],
      badPlanets: ['சனி', 'ராகு'],
      remedies: [
        'ஹனுமான் சாலிசா பாராயணம்',
        'செவ்வாய்க்கிழமை ஹனுமான் வழிபாடு',
        'சிவந்த பூக்களால் அர்ச்சனை'
      ]
    },
    {
      id: 'bhava_4',
      number: 4,
      name: 'சுக பாவம்',
      nameEnglish: 'Sukha Bhava',
      sanskritName: 'சுக பாவம்',
      lord: 'நான்காம் வீட்டு அதிபதி',
      lordEnglish: 'Fourth House Lord',
      element: 'நீர்',
      nature: 'கேந்திரம்',
      significances: [
        'தாய் மற்றும் மகிழ்ச்சி',
        'வீடு மற்றும் சொத்துக்கள்',
        'கல்வி மற்றும் மனநிலை',
        'வாகனங்கள் மற்றும் நிலம்',
        'உள்ளம் மற்றும் அமைதி'
      ],
      significancesEnglish: [
        'Mother and happiness',
        'Home and properties',
        'Education and mind',
        'Vehicles and land',
        'Heart and peace'
      ],
      bodyParts: ['மார்பு', 'இதயம்', 'நுரையீரல்'],
      relationships: ['தாய்', 'உறவினர்கள்'],
      karakatva: ['சந்திரன்', 'புதன்'],
      goodPlanets: ['சந்திரன்', 'குரு', 'சுக்கிரன்'],
      badPlanets: ['சனி', 'செவ்வாய்', 'ராகு'],
      remedies: [
        'சந்திர மந்திரம் ஜபம்',
        'திங்கட்கிழமை சிவ வழிபாடு',
        'வெள்ளை வஸ்திரம் அணியவும்'
      ]
    },
    {
      id: 'bhava_5',
      number: 5,
      name: 'புத்திர பாவம்',
      nameEnglish: 'Putra Bhava',
      sanskritName: 'புத்ர பாவம்',
      lord: 'ஐந்தாம் வீட்டு அதிபதி',
      lordEnglish: 'Fifth House Lord',
      element: 'அக்னி',
      nature: 'திரிகோணம்',
      significances: [
        'மக்கள் மற்றும் சந்ததி',
        'புத்தி மற்றும் அறிவு',
        'கல்வி மற்றும் படிப்பு',
        'பூர்வ புண்ணியம்',
        'மந்திரம் மற்றும் தந்திரம்'
      ],
      significancesEnglish: [
        'Children and progeny',
        'Intelligence and wisdom',
        'Education and learning',
        'Past life merits',
        'Mantras and tantras'
      ],
      bodyParts: ['வயிறு', 'குடல்', 'கல்லீரல்'],
      relationships: ['மக்கள்', 'மாணவர்கள்'],
      karakatva: ['குரு', 'சூரியன்'],
      goodPlanets: ['குரு', 'சூரியன்', 'புதன்'],
      badPlanets: ['சனி', 'ராகு', 'கேது'],
      remedies: [
        'சரஸ்வதி வந்தனை',
        'வியாழக்கிழமை குரு வழிபாடு',
        'மஞ்சள் வஸ்திரம் அணியவும்'
      ]
    },
    {
      id: 'bhava_6',
      number: 6,
      name: 'ரிபு பாவம்',
      nameEnglish: 'Ripu Bhava',
      sanskritName: 'ரிபு பாவம்',
      lord: 'ஆறாம் வீட்டு அதிபதி',
      lordEnglish: 'Sixth House Lord',
      element: 'பூமி',
      nature: 'உபசயம்',
      significances: [
        'எதிரிகள் மற்றும் போராட்டம்',
        'நோய் மற்றும் மருத்துவம்',
        'கடன் மற்றும் சேவை',
        'வழக்கு மற்றும் சட்ட பிரச்சனைகள்',
        'மாமா மற்றும் தந்தையின் சகோதரர்கள்'
      ],
      significancesEnglish: [
        'Enemies and struggles',
        'Disease and medicine',
        'Debts and service',
        'Litigation and legal issues',
        'Maternal uncle and paternal brothers'
      ],
      bodyParts: ['குடல்', 'சிறுநீரகம்', 'இடுப்பு'],
      relationships: ['எதிரிகள்', 'சேவகர்கள்'],
      karakatva: ['செவ்வாய்', 'சனி'],
      goodPlanets: ['செவ்வாய்', 'சனி', 'ராகு'],
      badPlanets: ['குரு', 'சுக்கிரன்', 'சந்திரன்'],
      remedies: [
        'ஹனுமான் சாலிசா தினமும்',
        'செவ்வாய்க்கிழமை முருகன் வழிபாடு',
        'சிவந்த பூக்களால் அர்ச்சனை'
      ]
    },
    {
      id: 'bhava_7',
      number: 7,
      name: 'கலத்திர பாவம்',
      nameEnglish: 'Kalatra Bhava',
      sanskritName: 'கலத்ர பாவம்',
      lord: 'ஏழாம் வீட்டு அதிபதி',
      lordEnglish: 'Seventh House Lord',
      element: 'வாயு',
      nature: 'கேந்திரம்',
      significances: [
        'திருமணம் மற்றும் கணவர்/மனைவி',
        'கூட்டாளிகள் மற்றும் வியாபாரம்',
        'பாலியல் உறவு',
        'பொது வாழ்க்கை',
        'மரணம் (மாரக ஸ்தானம்)'
      ],
      significancesEnglish: [
        'Marriage and spouse',
        'Partners and business',
        'Sexual relations',
        'Public life',
        'Death (Maraka sthana)'
      ],
      bodyParts: ['சிறுநீரக வழி', 'இனப்பெருக்க உறுப்புகள்'],
      relationships: ['கணவர்/மனைவி', 'கூட்டாளிகள்'],
      karakatva: ['சுக்கிரன்'],
      goodPlanets: ['சுக்கிரன்', 'புதன்', 'குரு'],
      badPlanets: ['சனி', 'செவ்வாய்', 'சூரியன்'],
      remedies: [
        'சிவ பார்வதி வழிபாடு',
        'வெள்ளிக்கிழமை சுக்கிர வழிபாடு',
        'வெள்ளை வஸ்திரம் அணியவும்'
      ]
    },
    {
      id: 'bhava_8',
      number: 8,
      name: 'ஆயுர் பாவம்',
      nameEnglish: 'Ayur Bhava',
      sanskritName: 'ரந்திர பாவம்',
      lord: 'எட்டாம் வீட்டு அதிபதி',
      lordEnglish: 'Eighth House Lord',
      element: 'நீர்',
      nature: 'துஸ்தானம்',
      significances: [
        'ஆயுள் மற்றும் மரணம்',
        'ரகசியம் மற்றும் மர்மம்',
        'விபத்து மற்றும் அறுவை சிகிச்சை',
        'மாற்றம் மற்றும் உருமாற்றம்',
        'ஜோதிடம் மற்றும் தந்திரம்'
      ],
      significancesEnglish: [
        'Longevity and death',
        'Secrets and mysteries',
        'Accidents and surgery',
        'Transformation and change',
        'Astrology and occult'
      ],
      bodyParts: ['இனப்பெருக்க உறுப்புகள்', 'குதம்'],
      relationships: ['மர்ம நண்பர்கள்', 'குரு'],
      karakatva: ['சனி', 'ராகு'],
      goodPlanets: ['சனி', 'ராகு', 'கேது'],
      badPlanets: ['சூரியன்', 'சந்திரன்', 'குரு'],
      remedies: [
        'மகா மிருத்யுஞ்சய மந்திரம்',
        'சனிக்கிழமை சனீஸ்வர வழிபாடு',
        'கருப்பு எள் தானம்'
      ]
    },
    {
      id: 'bhava_9',
      number: 9,
      name: 'பாக்கிய பாவம்',
      nameEnglish: 'Bhagya Bhava',
      sanskritName: 'தர்ம பாவம்',
      lord: 'ஒன்பதாம் வீட்டு அதிபதி',
      lordEnglish: 'Ninth House Lord',
      element: 'அக்னி',
      nature: 'திரிகோணம்',
      significances: [
        'தந்தை மற்றும் குரு',
        'பாக்கியம் மற்றும் அதிர்ஷ்டம்',
        'தர்மம் மற்றும் மதம்',
        'நீண்ட பயணம்',
        'உயர் கல்வி மற்றும் ஞானம்'
      ],
      significancesEnglish: [
        'Father and guru',
        'Fortune and luck',
        'Dharma and religion',
        'Long journeys',
        'Higher education and wisdom'
      ],
      bodyParts: ['தொடை', 'இடுப்பு'],
      relationships: ['தந்தை', 'குரு', 'ஆசான்'],
      karakatva: ['குரு', 'சூரியன்'],
      goodPlanets: ['குரு', 'சூரியன்', 'செவ்வாய்'],
      badPlanets: ['சனி', 'ராகு', 'கேது'],
      remedies: [
        'விஷ்ணு ஸஹஸ்ரநாமம்',
        'வியாழக்கிழமை குரு வழிபாடு',
        'மஞ்சள் வஸ்திரம் அணியவும்'
      ]
    },
    {
      id: 'bhava_10',
      number: 10,
      name: 'கர்ம பாவம்',
      nameEnglish: 'Karma Bhava',
      sanskritName: 'கர்ம பாவம்',
      lord: 'பத்தாம் வீட்டு அதிபதி',
      lordEnglish: 'Tenth House Lord',
      element: 'பூமி',
      nature: 'கேந்திரம்',
      significances: [
        'தொழில் மற்றும் வேலை',
        'அந்தஸ்து மற்றும் மதிப்பு',
        'அரசு மற்றும் அதிகாரம்',
        'புகழ் மற்றும் கீர்த்தி',
        'சமுதாய சேவை'
      ],
      significancesEnglish: [
        'Career and profession',
        'Status and reputation',
        'Government and authority',
        'Fame and glory',
        'Social service'
      ],
      bodyParts: ['முழங்கால்', 'எலும்புகள்'],
      relationships: ['முதலாளி', 'அரசு அதிகாரிகள்'],
      karakatva: ['சூரியன்', 'செவ்வாய்', 'சனி'],
      goodPlanets: ['சூரியன்', 'செவ்வாய்', 'சனி', 'புதன்'],
      badPlanets: ['சந்திரன்', 'ராகு'],
      remedies: [
        'சூரிய கவசம் பாராயணம்',
        'ஞாயிற்றுக்கிழமை சூரிய வழிபாடு',
        'மஞ்சள் வஸ்திரம் அணியவும்'
      ]
    },
    {
      id: 'bhava_11',
      number: 11,
      name: 'லாப பாவம்',
      nameEnglish: 'Labha Bhava',
      sanskritName: 'லாப பாவம்',
      lord: 'பதினொன்றாம் வீட்டு அதிபதி',
      lordEnglish: 'Eleventh House Lord',
      element: 'வாயு',
      nature: 'உபசயம்',
      significances: [
        'லாபம் மற்றும் வருமானம்',
        'நண்பர்கள் மற்றும் குழுக்கள்',
        'ஆசைகள் மற்றும் எதிர்பார்ப்புகள்',
        'மூத்த சகோதரர்/சகோதரி',
        'சமூக வலையமைப்பு'
      ],
      significancesEnglish: [
        'Gains and income',
        'Friends and groups',
        'Desires and aspirations',
        'Elder brother/sister',
        'Social network'
      ],
      bodyParts: ['கணுக்கால்', 'கால்கள்'],
      relationships: ['நண்பர்கள்', 'மூத்த சகோதரர்கள்'],
      karakatva: ['குரு'],
      goodPlanets: ['குரு', 'செவ்வாய்', 'சனி'],
      badPlanets: ['சூரியன்', 'சந்திரன்'],
      remedies: [
        'கணபதி ஸ்தோத்திரம்',
        'வியாழக்கிழமை குரு வழிபாடு',
        'மஞ்சள் வஸ்திரம் அணியவும்'
      ]
    },
    {
      id: 'bhava_12',
      number: 12,
      name: 'வ்யய பாவம்',
      nameEnglish: 'Vyaya Bhava',
      sanskritName: 'மோக்ஷ பாவம்',
      lord: 'பன்னிரண்டாம் வீட்டு அதிபதி',
      lordEnglish: 'Twelfth House Lord',
      element: 'நீர்',
      nature: 'துஸ்தானம்',
      significances: [
        'செலவு மற்றும் இழப்பு',
        'மோக்ஷம் மற்றும் முக்தி',
        'வெளிநாடு மற்றும் தூர பயணம்',
        'கனவுகள் மற்றும் ஆழ் உளவியல்',
        'தானம் மற்றும் தியாகம்'
      ],
      significancesEnglish: [
        'Expenses and losses',
        'Moksha and liberation',
        'Foreign lands and distant travel',
        'Dreams and subconscious',
        'Charity and sacrifice'
      ],
      bodyParts: ['பாதங்கள்', 'கண்கள்'],
      relationships: ['வெளிநாட்டு நண்பர்கள்', 'ஆன்மீக குரு'],
      karakatva: ['சனி', 'கேது'],
      goodPlanets: ['சனி', 'கேது', 'ராகு'],
      badPlanets: ['சூரியன்', 'சந்திரன்', 'குரு'],
      remedies: [
        'விஷ்ணு ஸஹஸ்ரநாமம்',
        'சனிக்கிழமை விஷ்ணு வழிபாடு',
        'நீல வஸ்திரம் அணியவும்'
      ]
    }
  ];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.filteredBhavas = [...this.bhavas];
  }

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
  }

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    this.showToast(this.isBookmarked ? 'புத்தகக்குறிக்கு சேர்க்கப்பட்டது' : 'புத்தகக்குறியிலிருந்து நீக்கப்பட்டது');
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  searchBhavas() {
    if (!this.searchTerm) {
      this.filteredBhavas = [...this.bhavas];
      return;
    }

    this.filteredBhavas = this.bhavas.filter(bhava =>
      bhava.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      bhava.nameEnglish.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      bhava.significances.some(sig => sig.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  toggleBhavaExpansion(bhava: Bhava) {
    bhava.expanded = !bhava.expanded;
  }

  async showBhavaDetails(bhava: Bhava) {
    const alert = await this.alertController.create({
      header: `${bhava.number}. ${bhava.name}`,
      subHeader: bhava.nameEnglish,
      message: `
        <strong>संस्कृत नाम:</strong> ${bhava.sanskritName}<br>
        <strong>प्रकृति:</strong> ${bhava.nature}<br>
        <strong>तत्व:</strong> ${bhava.element}<br>
        <strong>कारकत्व:</strong> ${bhava.karakatva.join(', ')}
      `,
      buttons: ['ठीक है']
    });

    await alert.present();
  }

  navigateToAnalysis() {
    this.showAnalysisView = true;
    this.selectedSegment = 'analysis';
  }

  goBack() {
    if (this.showAnalysisView) {
      this.showAnalysisView = false;
      this.selectedSegment = 'overview';
    } else {
      this.router.navigate(['/concepts']);
    }
  }

  nextBhava() {
    if (this.currentBhavaIndex < this.bhavas.length - 1) {
      this.currentBhavaIndex++;
    }
  }

  previousBhava() {
    if (this.currentBhavaIndex > 0) {
      this.currentBhavaIndex--;
    }
  }

  getCurrentBhava(): Bhava {
    return this.bhavas[this.currentBhavaIndex];
  }
}
