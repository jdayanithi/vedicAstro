import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Bhava {
  id: string;
  number: number;
  name: string;
  significances: string[];
  bodyParts: string[];
  relationships: string[];
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

  // Detailed introduction content
  introduction = {
    title: 'சோதிடத்தில் பாவங்களின் விளக்கம்',
    subtitle: 'Significations of Bhavas in Astrology',
    basicIntro: {
      title: 'பாவம், வீடு மற்றும் அதிபதி - ஒரு எளிய அறிமுகம்',
      description: 'ஜோதிடத்தில் ஒருவரின் வாழ்க்கையை விரிவாகப் புரிந்துகொள்ளப் பயன்படுத்தப்படும் அடிப்படைச் சொற்கள்தான் பாவம், வீடு, மற்றும் அதிபதி. இவை ஒவ்வொன்றும் என்ன என்பதையும், அவற்றுக்கு இடையேயான தொடர்பையும் இங்கு விளக்கமாகக் காணலாம்.',
      sections: [
        {
          title: '1. பாவம் என்றால் என்ன?',
          content: [
            'பொருள்: \'பாவம்\' என்றால் ஒருவரின் வாழ்க்கையின் ஒரு குறிப்பிட்ட பகுதி அல்லது துறை என்று பொருள். மனிதனின் வாழ்க்கை பல்வேறு அம்சங்களால் ஆனது. எடுத்துக்காட்டாக, ஆரோக்கியம், செல்வம், குடும்பம், திருமணம், தொழில், கல்வி போன்றவை. இந்த ஒவ்வொரு அம்சத்தையும் விளக்குவதற்கு ஒரு பாவம் பயன்படுத்தப்படுகிறது.',
            'எண்ணிக்கை: ஒரு ஜாதகத்தில் மொத்தம் 12 பாவங்கள் உள்ளன. இவை முதல் பாவம் முதல் பன்னிரண்டாம் பாவம் வரை வரிசையாக அமையும்.',
            'பாவங்களின் பிரிவுகள்: முதல் பாவம்: உடல், தோற்றம், ஆரோக்கியம். இரண்டாம் பாவம்: செல்வம், குடும்பம், பேச்சு. நான்காம் பாவம்: தாய், வீடு, வாகனம். ஏழாம் பாவம்: மனைவி/கணவன், திருமணம். பத்தாம் பாவம்: தொழில், கௌரவம்.',
            'முக்கியத்துவம்: ஒருவரின் ஜாதகத்தில் எந்தப் பாவம் வலுவாக இருக்கிறதோ, அந்தப் பாவத்தின் காரகத்துவங்கள் (விஷயங்கள்) அவருக்குச் சிறப்பாக இருக்கும். மாறாக, ஒரு பாவம் பலவீனமாக இருந்தால், அந்தப் பாவத்தின் விஷயங்களில் அவருக்குச் சிக்கல்கள் வரலாம்.'
          ]
        },
        {
          title: '2. வீடு என்றால் என்ன?',
          content: [
            'பொருள்: \'வீடு\' என்பதும் பாவத்தையே குறிக்கும் மற்றொரு சொல். \'வீடு\' என்பது ஒரு ராசியைக் குறிக்கும். ராசிக் கட்டத்தில் மேஷம், ரிஷபம், மிதுனம் என 12 ராசிகள் உள்ளன. ஒரு பாவம் எந்த ராசியில் அமைகிறதோ, அந்த ராசியே அந்தப் பாவத்தின் வீடாகக் கருதப்படுகிறது.',
            'விளக்கம்: ஜோதிடத்தில் 12 ராசிகள் உள்ளன. ஒவ்வொரு பாவமும் ஒரு ராசியைக் குறிக்கும். உதாரணமாக, உங்கள் ஜாதகத்தில் முதல் பாவம் மேஷ ராசியில் இருந்தால், முதல் வீடாகிய மேஷம் உங்கள் லக்னம் (முதல் பாவம்) என்று அழைக்கப்படும்.',
            'தொடர்பு: பாவம் என்பது வாழ்க்கையின் துறையைக் குறிக்கும் ஒரு பெயர், வீடு என்பது அந்தத் துறையைச் சுட்டிக்காட்டும் ராசியைக் குறிக்கும் ஒரு இடம். இரண்டும் ஒன்றோடொன்று தொடர்புடையவை.'
          ]
        },
        {
          title: '3. அதிபதி என்றால் என்ன?',
          content: [
            'பொருள்: \'அதிபதி\' என்றால் ஒரு வீட்டிற்கு (ராசிக்கு) சொந்தக்காரர் அல்லது தலைவர் என்று பொருள். ஒவ்வொரு ராசிக்கும் ஒரு குறிப்பிட்ட கிரகம் அதிபதியாக இருக்கும்.',
            'முக்கியத்துவம்: ஒரு பாவத்தின் அதிபதியான கிரகம் ஜாதகத்தில் வலுவாக இருந்தால், அந்தப் பாவத்தின் காரகத்துவங்கள் சிறப்பாக இருக்கும். உதாரணமாக, திருமணத்தைக் குறிக்கும் ஏழாம் பாவத்தின் அதிபதியான கிரகம் நல்ல நிலையில் இருந்தால், அவருக்கு நல்ல திருமண வாழ்க்கை அமையும்.'
          ],
          rasiAthipathi: [
            'மேஷம் (Aries): செவ்வாய் (Mars)',
            'ரிஷபம் (Taurus): சுக்கிரன் (Venus)',
            'மிதுனம் (Gemini): புதன் (Mercury)',
            'கடகம் (Cancer): சந்திரன் (Moon)',
            'சிம்மம் (Leo): சூரியன் (Sun)',
            'கன்னி (Virgo): புதன் (Mercury)',
            'துலாம் (Libra): சுக்கிரன் (Venus)',
            'விருச்சிகம் (Scorpio): செவ்வாய் (Mars)',
            'தனுசு (Sagittarius): குரு (Jupiter)',
            'மகரம் (Capricorn): சனி (Saturn)',
            'கும்பம் (Aquarius): சனி (Saturn)',
            'மீனம் (Pisces): குரு (Jupiter)'
          ]
        }
      ],
      summary: {
        title: 'சுருக்கமாக:',
        points: [
          'பாவம்: வாழ்க்கையின் துறை (எ.கா: குடும்பம்)',
          'வீடு: அந்தத் துறை அமைந்திருக்கும் ராசி (எ.கா: கடக ராசி)',
          'அதிபதி: அந்த ராசியின் சொந்தக்காரர் (எ.கா: சந்திரன்)'
        ],
        conclusion: 'இந்த மூன்று கூறுகளின் நிலைப்பாட்டை வைத்துத்தான் ஒருவரின் வாழ்க்கை நிகழ்வுகள் கணிக்கப்படுகின்றன.'
      }
    },
    description: 'சோதிடத்தில், ஒவ்வொரு பாவமும் (வீடும்) ஒருவரின் வாழ்க்கையின் பல்வேறு அம்சங்களை விளக்குகிறது.',
    classifications: [
      {
        type: 'உயிர் உள்ள / உயிர் உடல் (Living / Animate)',
        description: 'இது ஒருவரின் வாழ்க்கையில் இருக்கும் மனிதர்கள், உறவுகள், மற்றும் உயிருள்ள தொடர்புகளைக் குறிக்கும்.'
      },
      {
        type: 'உயிர் அற்ற (Non-living)',
        description: 'இது பொருட்கள், சொத்துக்கள், நிகழ்வுகள், மற்றும் உணர்வுபூர்வமான கருத்துகள் போன்ற உயிரற்ற விஷயங்களைக் குறிக்கும்.'
      },
      {
        type: 'உடல் உறுப்புகள் (Body Parts)',
        description: 'இது ஒவ்வொரு பாவமும் உடலின் எந்தப் பகுதியைக் குறிக்கிறது என்பதை விளக்குகிறது.'
      }
    ]
  };

  bhavas: Bhava[] = [
    {
      id: 'bhava_1',
      number: 1,
      name: 'லக்னம்',
      significances: [
        'ஆளுமை மற்றும் தோற்றம்',
        'உடல் நலம் மற்றும் வலிமை',
        'சுயமரியாதை மற்றும் தன்னம்பிக்கை',
        'ஆயுள் மற்றும் உயிர்வாழ்வு',
        'பிறப்பு மற்றும் ஆரம்பம்'
      ],
      bodyParts: ['தலை', 'முகம்', 'மூளை'],
      relationships: ['தனிப்பட்ட அடையாளம்', 'சுய வெளிப்பாடு'],
      remedies: [
      ]
    },
    {
      id: 'bhava_2',
      number: 2,
      name: 'தன பாவம்',
      significances: [
        'செல்வம் மற்றும் சம்பாத்தியம்',
        'குடும்பம் மற்றும் பேச்சு',
        'உணவு மற்றும் ருசி',
        'கல்வி மற்றும் அறிவு',
        'முகம் மற்றும் கண்கள்'
      ],
      bodyParts: ['முகம்', 'கண்கள்', 'வாய்', 'கழுத்து'],
      relationships: ['குடும்ப உறுப்பினர்கள்', 'பேச்சு திறமை'],
      remedies: [
      ]
    },
    {
      id: 'bhava_3',
      number: 3,
      name: 'சகோதர பாவம்',
      significances: [
        'சகோதர சகோதரிகள்',
        'தைரியம் மற்றும் வீரம்',
        'கலை மற்றும் திறமைகள்',
        'குறுகிய பயணங்கள்',
        'தகவல் தொடர்பு'
      ],
      bodyParts: ['கைகள்', 'தோள்கள்', 'மார்பு'],
      relationships: ['சகோதரர்கள்', 'நண்பர்கள்'],
      remedies: [
      ]
    },
    {
      id: 'bhava_4',
      number: 4,
      name: 'சுக பாவம்',
      significances: [
        'தாய் மற்றும் மகிழ்ச்சி',
        'வீடு மற்றும் சொத்துக்கள்',
        'கல்வி மற்றும் மனநிலை',
        'வாகனங்கள் மற்றும் நிலம்',
        'உள்ளம் மற்றும் அமைதி'
      ],
      bodyParts: ['மார்பு', 'இதயம்', 'நுரையீரல்'],
      relationships: ['தாய்', 'உறவினர்கள்'],
      remedies: [
      ]
    },
    {
      id: 'bhava_5',
      number: 5,
      name: 'புத்திர பாவம்',
      significances: [
        'மக்கள் மற்றும் சந்ததி',
        'புத்தி மற்றும் அறிவு',
        'கல்வி மற்றும் படிப்பு',
        'பூர்வ புண்ணியம்',
        'மந்திரம் மற்றும் தந்திரம்'
      ],
      bodyParts: ['வயிறு', 'குடல்', 'கல்லீரல்'],
      relationships: ['மக்கள்', 'மாணவர்கள்'],
      remedies: [
      ]
    },
    {
      id: 'bhava_6',
      number: 6,
      name: 'ரிபு பாவம்',
      significances: [
        'எதிரிகள் மற்றும் போராட்டம்',
        'நோய் மற்றும் மருத்துவம்',
        'கடன் மற்றும் சேவை',
        'வழக்கு மற்றும் சட்ட பிரச்சனைகள்',
        'மாமா மற்றும் தந்தையின் சகோதரர்கள்'
      ],
      bodyParts: ['குடல்', 'சிறுநீரகம்', 'இடுப்பு'],
      relationships: ['எதிரிகள்', 'சேவகர்கள்'],
      remedies: [
      ]
    },
    {
      id: 'bhava_7',
      number: 7,
      name: 'கலத்திர பாவம்',
      significances: [
        'திருமணம் மற்றும் கணவர்/மனைவி',
        'கூட்டாளிகள் மற்றும் வியாபாரம்',
        'பாலியல் உறவு',
        'பொது வாழ்க்கை',
        'மரணம் (மாரக ஸ்தானம்)'
      ],
      bodyParts: ['சிறுநீரக வழி', 'இனப்பெருக்க உறுப்புகள்'],
      relationships: ['கணவர்/மனைவி', 'கூட்டாளிகள்'],
     remedies: [
      ]
    },
    {
      id: 'bhava_8',
      number: 8,
      name: 'ஆயுர் பாவம்',
      significances: [
        'ஆயுள் மற்றும் மரணம்',
        'ரகசியம் மற்றும் மர்மம்',
        'விபத்து மற்றும் அறுவை சிகிச்சை',
        'மாற்றம் மற்றும் உருமாற்றம்',
        'ஜோதிடம் மற்றும் தந்திரம்'
      ],
      bodyParts: ['இனப்பெருக்க உறுப்புகள்', 'குதம்'],
      relationships: ['மர்ம நண்பர்கள்', 'குரு'],
      remedies: [
      ]
    },
    {
      id: 'bhava_9',
      number: 9,
      name: 'பாக்கிய பாவம்',
      significances: [
        'தந்தை மற்றும் குரு',
        'பாக்கியம் மற்றும் அதிர்ஷ்டம்',
        'தர்மம் மற்றும் மதம்',
        'நீண்ட பயணம்',
        'உயர் கல்வி மற்றும் ஞானம்'
      ],
      bodyParts: ['தொடை', 'இடுப்பு'],
      relationships: ['தந்தை', 'குரு', 'ஆசான்'],
      remedies: [
      ]
    },
    {
      id: 'bhava_10',
      number: 10,
      name: 'கர்ம பாவம்',
      significances: [
        'தொழில் மற்றும் வேலை',
        'அந்தஸ்து மற்றும் மதிப்பு',
        'அரசு மற்றும் அதிகாரம்',
        'புகழ் மற்றும் கீர்த்தி',
        'சமுதாய சேவை'
      ],
      bodyParts: ['முழங்கால்', 'எலும்புகள்'],
      relationships: ['முதலாளி', 'அரசு அதிகாரிகள்'],
      remedies: [
      ]
    },
    {
      id: 'bhava_11',
      number: 11,
      name: 'லாப பாவம்',
      significances: [
        'லாபம் மற்றும் வருமானம்',
        'நண்பர்கள் மற்றும் குழுக்கள்',
        'ஆசைகள் மற்றும் எதிர்பார்ப்புகள்',
        'மூத்த சகோதரர்/சகோதரி',
        'சமூக வலையமைப்பு'
      ],
      bodyParts: ['கணுக்கால்', 'கால்கள்'],
      relationships: ['நண்பர்கள்', 'மூத்த சகோதரர்கள்'],
      remedies: [
      ]
    },
    {
      id: 'bhava_12',
      number: 12,
      name: 'வ்யய பாவம்',
      significances: [
        'செலவு மற்றும் இழப்பு',
        'மோக்ஷம் மற்றும் முக்தி',
        'வெளிநாடு மற்றும் தூர பயணம்',
        'கனவுகள் மற்றும் ஆழ் உளவியல்',
        'தானம் மற்றும் தியாகம்'
      ],
      bodyParts: ['பாதங்கள்', 'கண்கள்'],
      relationships: ['வெளிநாட்டு நண்பர்கள்', 'ஆன்மீக குரு'],
      remedies: [
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
      bhava.significances.some(sig => sig.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  toggleBhavaExpansion(bhava: Bhava) {
    bhava.expanded = !bhava.expanded;
  }

  async showBhavaDetails(bhava: Bhava) {
    const alert = await this.alertController.create({
      header: `${bhava.number}. ${bhava.name}`,
      message: `
        <strong>பாவ எண்:</strong> ${bhava.number}<br>
        <strong>பெயர்:</strong> ${bhava.name}<br>
        <strong>முக்கிய அம்சங்கள்:</strong><br>
        ${bhava.significances.join('<br>• ')}
      `,
      buttons: ['ठीक है']
    });

    await alert.present();
  }

  navigateToAnalysis() {
    this.selectedSegment = 'bhavas';
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
