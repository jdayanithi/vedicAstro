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
      sanskritName: 'तनु भाव',
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
      sanskritName: 'धन भाव',
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
      sanskritName: 'सहज भाव',
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
      sanskritName: 'सुख भाव',
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
      sanskritName: 'पुत्र भाव',
      lord: 'ஐந்தாம் வீட்டு அதிபதி',
      lordEnglish: 'Fifth House Lord',
      element: 'அக்னி',
      nature: 'திரிகோணம்',
      significances: [
        'குழந்தைகள் மற்றும் சந்ததி',
        'படைப்பாற்றல் மற்றும் கலை',
        'அறிவு மற்றும் புத்திசாலித்தனம்',
        'பூர்வ புண்ணியம் மற்றும் மந்திரம்',
        'காதல் மற்றும் உறவுகள்'
      ],
      significancesEnglish: [
        'Children and progeny',
        'Creativity and arts',
        'Intelligence and wisdom',
        'Past merit and mantras',
        'Love and relationships'
      ],
      bodyParts: ['வயிறு', 'இரைப்பை', 'கல்லீரல்'],
      relationships: ['குழந்தைகள்', 'மாணவர்கள்'],
      karakatva: ['குரு', 'சூரியன்'],
      goodPlanets: ['குரு', 'சூரியன்', 'சந்திரன்'],
      badPlanets: ['சனி', 'ராகு', 'கேது'],
      remedies: [
        'குரு மந்திரம் ஜபம்',
        'வியாழக்கிழமை வழிபாடு',
        'மஞ்சள் நிற உடைகள்'
      ]
    },
    {
      id: 'bhava_6',
      number: 6,
      name: 'ரிபு பாவம்',
      nameEnglish: 'Ripu/Shatru Bhava',
      sanskritName: 'शत्रु भाव',
      lord: 'ஆறாம் வீட்டு அதிபதி',
      lordEnglish: 'Sixth House Lord',
      element: 'பூமி',
      nature: 'உபசயம்',
      significances: [
        'எதிரிகள் மற்றும் போராட்டங்கள்',
        'நோய்கள் மற்றும் உடல்நலம்',
        'கடன்கள் மற்றும் சேவை',
        'வழக்குகள் மற்றும் சிக்கல்கள்',
        'மாமா மற்றும் பணியாளர்கள்'
      ],
      significancesEnglish: [
        'Enemies and struggles',
        'Diseases and health',
        'Debts and service',
        'Litigation and problems',
        'Maternal uncle and servants'
      ],
      bodyParts: ['இடுப்பு', 'சிறுநீரகம்', 'குடல்'],
      relationships: ['எதிரிகள்', 'பணியாளர்கள்'],
      karakatva: ['செவ்வாய்', 'சனி'],
      goodPlanets: ['செவ்வாய்', 'சனி', 'சூரியன்'],
      badPlanets: ['குரு', 'சுக்கிரன்', 'சந்திரன்'],
      remedies: [
        'ஹனுமான் சாலிசா பாராயணம்',
        'செவ்வாய்க்கிழமை முருகன் வழிபாடு',
        'சிவந்த நிற உடைகள்'
      ]
    },
    {
      id: 'bhava_7',
      number: 7,
      name: 'கலத்திர பாவம்',
      nameEnglish: 'Kalatra Bhava',
      sanskritName: 'कलत्र भाव',
      lord: 'ஏழாம் வீட்டு அதிபதி',
      lordEnglish: 'Seventh House Lord',
      element: 'வாயு',
      nature: 'கேந்திரம்',
      significances: [
        'திருமணம் மற்றும் வாழ்க்கைத் துணை',
        'கூட்டாளிகள் மற்றும் வணிகம்',
        'பயணங்கள் மற்றும் வெளிநாடு',
        'மரணம் மற்றும் மாற்றங்கள்',
        'காம வாசனை மற்றும் உறவுகள்'
      ],
      significancesEnglish: [
        'Marriage and life partner',
        'Partners and business',
        'Travels and foreign lands',
        'Death and transformations',
        'Sexual desires and relationships'
      ],
      bodyParts: ['இடுப்பு', 'சிறுநீர்ப்பை', 'பிறப்புறுப்பு'],
      relationships: ['மனைவி/கணவன்', 'கூட்டாளிகள்'],
      karakatva: ['சுக்கிரன்', 'குரு'],
      goodPlanets: ['சுக்கிரன்', 'புதன்', 'சனி'],
      badPlanets: ['செவ்வாய்', 'சூரியன்', 'கேது'],
      remedies: [
        'சுக்கிர மந்திரம் ஜபம்',
        'வெள்ளிக்கிழமை லக்ஷ்மி வழிபாடு',
        'வெள்ளை அல்லது இளஞ்சிவப்பு நிற உடைகள்'
      ]
    },
    {
      id: 'bhava_8',
      number: 8,
      name: 'ஆயுர் பாவம்',
      nameEnglish: 'Ayur Bhava',
      sanskritName: 'आयुर भाव',
      lord: 'எட்டாம் வீட்டு அதிபதி',
      lordEnglish: 'Eighth House Lord',
      element: 'நீர்',
      nature: 'துஷ்டானம்',
      significances: [
        'ஆயுள் மற்றும் மரணம்',
        'ரகசியங்கள் மற்றும் மறைவான விஷயங்கள்',
        'மாற்றங்கள் மற்றும் புரட்சிகள்',
        'அதிர்ஷ்ட லாபம் மற்றும் பணம்',
        'ஆன்மீகம் மற்றும் ஜோதிடம்'
      ],
      significancesEnglish: [
        'Longevity and death',
        'Secrets and hidden matters',
        'Transformations and revolutions',
        'Sudden gains and money',
        'Spirituality and astrology'
      ],
      bodyParts: ['பிறப்புறுப்பு', 'மலக்குடல்', 'வெளியேற்ற உறுப்புகள்'],
      relationships: ['மாமியார்', 'கணவன் குடும்பம்'],
      karakatva: ['சனி', 'ராகு'],
      goodPlanets: ['சனி', 'ராகு', 'கேது'],
      badPlanets: ['சூரியன்', 'சந்திரன்', 'குரு'],
      remedies: [
        'சனி மந்திரம் ஜபம்',
        'சனிக்கிழமை ஹனுமான் வழிபாடு',
        'நீல நிற உடைகள் அணியவும்'
      ]
    },
    {
      id: 'bhava_9',
      number: 9,
      name: 'பாக்கிய பாவம்',
      nameEnglish: 'Bhagya Bhava',
      sanskritName: 'भाग्य भाव',
      lord: 'ஒன்பதாம் வீட்டு அதிபதி',
      lordEnglish: 'Ninth House Lord',
      element: 'அக்னி',
      nature: 'திரிகோணம்',
      significances: [
        'அதிர்ஷ்டம் மற்றும் பாக்கியம்',
        'தந்தை மற்றும் குரு',
        'தர்மம் மற்றும் மதம்',
        'நீண்ட பயணங்கள் மற்றும் தீர்த்த யாத்திரை',
        'உயர் கல்வி மற்றும் ஞானம்'
      ],
      significancesEnglish: [
        'Fortune and luck',
        'Father and guru',
        'Dharma and religion',
        'Long journeys and pilgrimage',
        'Higher education and wisdom'
      ],
      bodyParts: ['தொடைகள்', 'இடுப்பு', 'கல்லீரல்'],
      relationships: ['தந்தை', 'குரு', 'ஆசிரியர்கள்'],
      karakatva: ['குரு', 'சூரியன்'],
      goodPlanets: ['குரு', 'சூரியன்', 'செவ்வாய்'],
      badPlanets: ['சனி', 'ராகு', 'கேது'],
      remedies: [
        'குரு மந்திரம் ஜபம்',
        'வியாழக்கிழமை விஷ்ணு வழிபாடு',
        'மஞ்சள் நிற உடைகள் அணியவும்'
      ]
    },
    {
      id: 'bhava_10',
      number: 10,
      name: 'கர்ம பாவம்',
      nameEnglish: 'Karma Bhava',
      sanskritName: 'कर्म भाव',
      lord: 'பத்தாம் வீட்டு அதிபதி',
      lordEnglish: 'Tenth House Lord',
      element: 'பூமி',
      nature: 'கேந்திரம்',
      significances: [
        'தொழில் மற்றும் பணி',
        'அதிகாரம் மற்றும் நிலை',
        'புகழ் மற்றும் கீர்த்தி',
        'அரசாங்கம் மற்றும் ஆட்சி',
        'சமூக மதிப்பு மற்றும் மரியாதை'
      ],
      significancesEnglish: [
        'Career and profession',
        'Authority and status',
        'Fame and reputation',
        'Government and rule',
        'Social respect and honor'
      ],
      bodyParts: ['முழங்கால்கள்', 'எலும்புகள்', 'மூட்டுகள்'],
      relationships: ['அரசு', 'அதிகாரிகள்', 'முதலாளி'],
      karakatva: ['சூரியன்', 'செவ்வாய்', 'சனி'],
      goodPlanets: ['சூரியன்', 'செவ்வாய்', 'சனி'],
      badPlanets: ['சந்திரன்', 'சுக்கிரன்'],
      remedies: [
        'சூரிய மந்திரம் ஜபம்',
        'ஞாயிற்றுக்கிழமை சூரிய வழிபாடு',
        'சிவந்த அல்லது மஞ்சள் நிற உடைகள்'
      ]
    },
    {
      id: 'bhava_11',
      number: 11,
      name: 'லாப பாவம்',
      nameEnglish: 'Labha Bhava',
      sanskritName: 'लाभ भाव',
      lord: 'பதினொன்றாம் வீட்டு அதிபதி',
      lordEnglish: 'Eleventh House Lord',
      element: 'வாயு',
      nature: 'உபசயம்',
      significances: [
        'லாபம் மற்றும் வருமானம்',
        'நண்பர்கள் மற்றும் சமூகம்',
        'மூத்த சகோதரர்/சகோதரி',
        'ஆசைகள் மற்றும் கனவுகள்',
        'குழு நடவடிக்கைகள் மற்றும் நெட்வொர்க்'
      ],
      significancesEnglish: [
        'Gains and income',
        'Friends and society',
        'Elder siblings',
        'Desires and dreams',
        'Group activities and network'
      ],
      bodyParts: ['கணுக்கால்கள்', 'கால்கள்', 'சுழற்சி அமைப்பு'],
      relationships: ['நண்பர்கள்', 'மூத்த சகோதரர்கள்'],
      karakatva: ['குரு', 'சூரியன்'],
      goodPlanets: ['அனைத்து கிரகங்களும் நல்லவை'],
      badPlanets: ['எதுவும் இல்லை - அனைத்தும் லாபம்'],
      remedies: [
        'லக்ஷ்மி மந்திரம் ஜபம்',
        'வெள்ளிக்கிழமை லக்ஷ்மி வழிபாடு',
        'பச்சை நிற உடைகள் அணியவும்'
      ]
    },
    {
      id: 'bhava_12',
      number: 12,
      name: 'வ்யய பாவம்',
      nameEnglish: 'Vyaya Bhava',
      sanskritName: 'व्यय भाव',
      lord: 'பன்னிரெண்டாம் வீட்டு அதிபதி',
      lordEnglish: 'Twelfth House Lord',
      element: 'நீர்',
      nature: 'துஷ்டானம்',
      significances: [
        'செலவு மற்றும் இழப்புகள்',
        'வெளிநாடு மற்றும் தனிமை',
        'முக்தி மற்றும் மோக்ஷம்',
        'தூக்கம் மற்றும் ஆன்மீக சாதனை',
        'ரகசிய விகாரங்கள் மற்றும் எதிரிகள்'
      ],
      significancesEnglish: [
        'Expenses and losses',
        'Foreign lands and isolation',
        'Liberation and moksha',
        'Sleep and spiritual practices',
        'Secret affairs and hidden enemies'
      ],
      bodyParts: ['கால்கள்', 'இடது கண்', 'நரம்பு மண்டலம்'],
      relationships: ['ரகசிய எதிரிகள்', 'வெளிநாட்டவர்கள்'],
      karakatva: ['சனி', 'கேது', 'ராகு'],
      goodPlanets: ['சனி', 'கேது', 'செவ்வாய்'],
      badPlanets: ['சூரியன்', 'சந்திரன்', 'குரு'],
      remedies: [
        'சிவ மந்திரம் ஜபம்',
        'திங்கட்கிழமை சிவ வழிபாடு',
        'வெள்ளை அல்லது நீல நிற உடைகள்'
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
