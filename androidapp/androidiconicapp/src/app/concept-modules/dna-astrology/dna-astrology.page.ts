import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

interface Planet {
  id: string;
  name: string;
  nameEnglish: string;
  icon: string;
  color: string;
  doshamNakshatrams: string[];
  doshamDetails: {
    name: string;
    traits: string[];
    color: string;
  }[];
  generalTraits: string[];
  remedies: {
    dharma: string[];
    career: string[];
    spiritual: string[];
  };
  expanded?: boolean;
}

interface CompatibilityData {
  planet: string;
  planetEnglish: string;
  icon: string;
  color: string;
  doshamNakshatrams: string[];
  adhikamNakshatrams: string[];
  birthNakshathram: string;
  notes: string;
  rows: {
    dosham: string[];
    adhikam: string[];
    birth?: string;
    note?: string;
  }[];
}

@Component({
  selector: 'app-dna-astrology',
  templateUrl: './dna-astrology.page.html',
  styleUrls: ['./dna-astrology.page.scss'],
})
export class DnaAstrologyPage implements OnInit {
  isBookmarked = false;
  showOverview = false;
  showSuriyan = false;
  
  compatibilityData: CompatibilityData[] = [
    {
      planet: 'சூரியன்',
      planetEnglish: 'Sun',
      icon: 'sunny',
      color: 'warning',
      doshamNakshatrams: ['1. ஆஸ்வினி', '9. ஆயில்யம்', '17. அனுராதா', '25. பூர்வட்டாதி'],
      adhikamNakshatrams: ['3 கார்த்திகை', '9 ஆயில்யம்', '21 உத்திராடம்'],
      birthNakshathram: '13 ஹஸ்தம்',
      notes: 'சூரின் தோஷம் - கொடுவான ஜன்மகள்',
      rows: [
        { dosham: ['1. ஆஸ்வினி'], adhikam: ['3 கார்த்திகை'], birth: '', note: '' },
        { dosham: ['9. ஆயில்யம்'], adhikam: ['12 உத்திரம்'], birth: '13 ஹஸ்தம்', note: '(சூரு)' },
        { dosham: ['17. அனுராதா'], adhikam: ['21 உத்திராடம்'], birth: '', note: '' },
        { dosham: ['25. பூர்வட்டாதி'], adhikam: [''], birth: '', note: '' }
      ]
    },
    {
      planet: 'சந்திரன்',
      planetEnglish: 'Moon',
      icon: 'moon',
      color: 'medium',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['2 பரணி'], adhikam: ['4 ரோகிணி'], birth: '', note: '' },
        { dosham: ['10 மகம்'], adhikam: ['13 ஹஸ்தம்'], birth: '5 மிருகசீரிஷம்', note: '(குரு)' },
        { dosham: ['18 கேட்டை'], adhikam: ['22 திருவோணம்'], birth: '', note: '' },
        { dosham: ['26 உத்திரட்டாதி'], adhikam: [''], birth: '', note: '' }
      ]
    },
    {
      planet: 'செவ்வாய்',
      planetEnglish: 'Mars',
      icon: 'flash',
      color: 'danger',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['3 கார்த்திகை'], adhikam: ['5 மிருகசீரிஷம்'], birth: '', note: '' },
        { dosham: ['11 பூரம்'], adhikam: ['14 சித்திரை'], birth: '21 உத்திராடம்', note: '(குரு)' },
        { dosham: ['19 மூலம்'], adhikam: ['23 அவிட்டம்'], birth: '', note: '' },
        { dosham: ['27 ரேவதி'], adhikam: [''], birth: '', note: '' }
      ]
    },
    {
      planet: 'புதன்',
      planetEnglish: 'Mercury',
      icon: 'chatbubbles',
      color: 'success',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['4 ரோகிணி'], adhikam: ['9 ஆயில்யம்'], birth: '', note: '' },
        { dosham: ['12 உத்திரம்'], adhikam: ['18 கேட்டை'], birth: '23 அவிட்டம்', note: '(சனி)' },
        { dosham: ['20 பூராடம்'], adhikam: ['27 ரேவதி'], birth: '', note: '' }
      ]
    },
    {
      planet: 'குரு',
      planetEnglish: 'Jupiter',
      icon: 'school',
      color: 'primary',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['5 மிருகசீரிஷம்'], adhikam: ['7 புனர்பூசம்'], birth: '', note: '' },
        { dosham: ['13 ஹஸ்தம்'], adhikam: ['16 விசாகம்'], birth: '8 பூசம்', note: 'Ragu' },
        { dosham: ['21 உத்திராடம்'], adhikam: ['25 பூரட்டாதி '], birth: '', note: '' }
      ]
    },
    {
      planet: 'சுக்கிரன்',
      planetEnglish: 'Venus',
      icon: 'heart',
      color: 'danger',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['6 திருவாதிரை'], adhikam: ['2 பரணி'], birth: '', note: '' },
        { dosham: ['14 சித்திரை'], adhikam: ['11 பூரம்'], birth: '10 மகம்', note: '(சந்திரன்)' },
        { dosham: ['22 திருவோணம்'], adhikam: ['20 பூராடம்'], birth: '', note: '' }
      ]
    },
    {
      planet: 'சனி',
      planetEnglish: 'Saturn',
      icon: 'time',
      color: 'dark',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['7 புனர்பூசம்'], adhikam: ['8 பூசம்'], birth: '27 ரேவதி', note: 'செவ்வாய்' },
        { dosham: ['15 சுவாதி'], adhikam: ['17 அனுஷம்'], birth: '', note: '' },
        { dosham: ['23 அவிட்டம்'], adhikam: ['26 உத்திரட்டாதி'], birth: '', note: '' }
      ]
    },
    {
      planet: 'ராகு',
      planetEnglish: 'Rahu',
      icon: 'eye',
      color: 'tertiary',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['8 பூசம்'], adhikam: ['6 திருவாதிரை'], birth: '', note: 'Chandiran' },
        { dosham: ['16 விசாகம்'], adhikam: ['15 சுவாதி'], birth: '2 பரணி', note: '' },
        { dosham: ['24 சதயம்'], adhikam: ['24 சதயம்'], birth: '', note: '' }
      ]
    },
    {
      planet: 'கேது',
      planetEnglish: 'Ketu',
      icon: 'triangle',
      color: 'secondary',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: [''], adhikam: ['1 அஸ்வினி'], birth: '', note: 'Suriyan' },
        { dosham: [''], adhikam: ['10 மகம்'], birth: '9 ஆயில்யம்', note: '' },
        { dosham: [''], adhikam: ['19 மூலம்'], birth: '', note: '' }
      ]
    }
  ];
  
  planets: Planet[] = [
    {
      id: 'suriyan',
      name: 'சூரியன்',
      nameEnglish: 'Sun',
      icon: 'sunny',
      color: 'warning',
      doshamNakshatrams: ['அஸ்வினி', 'ஆயில்யம்', 'அனுஷம்', 'பூரட்டாதி'],
      doshamDetails: [
        {
          name: 'அஸ்வினி (குறிய ஜோஷியம்) (கேது)',
          traits: [
            'முக்கிய குணங்கள்: வேகம்(செ) + ஆன்ம(க) + Healing(கேது)',
            'அரசாங்க தோஷம் கொண்ட',
            'நெற்றிக்கண் கொண்டவர்',
            'Healer (மாற்று மருத்துவர்) / மருத்துவர்',
            'குழு தோஷம் கொண்ட தொஷம்',
            'ஆண்மை, அனுபவம் சார்ந்த',
            'கட்டாய கருக்கலைப்பு / voluntary abortion',
            'நல்ல intuition power, சொன்னது நடக்கும் (3rd eye opening)',
            'யாருக்கும் அடங்காத, psycho, argumentative',
            'Medicine/Abortion, Medical field, pharmacy, மாற்று மருத்துவம்'
          ],
          color: 'yellow'
        },
        {
          name: 'ஆயில்யம் (துரிய தோஷம்) (புதன் – கேது)',
          traits: [
            'தன்னலம்(தற்+तलैமை), கடகம் தன்னலம் கொண்டது',
            'தாய்மை உள்ளம் கொண்டது, கேது - detachment',
            'தற்கொலை நோக்கம் கொண்ட (பயந்துகொண்டு)',
            'மூத்த தலைமுறையில் தூரம் கண்டிப்பாக இருக்கும்',
            'தலைமைப் பொறுப்பில் நோக்கம் இருப்பார்கள்',
            'ஆரம்ப தோஷத்தில் இருப்பவர்களுக்கு சுலபமாக உயர்ந்த பதவி கிடைக்கும்',
            'திருமணம் சிறந்தது (early marriage will reach success)',
            'நினைத்த வேலை கிடைக்காது. கிடைத்ததை விடக்கூடாது'
          ],
          color: 'blue'
        },
        {
          name: 'அனுஷம் (சூரிய தோஷம்) (சனி- வாயு பகவான்)',
          traits: [
            'மாமியார் தோஷம் பெற்ற',
            'ஆணுக்கு அனுஷம் - வீட்டோடு மாப்பிள்ளை அல்லது மனைவி குடும்பத்திற்கு அருகில் இருப்பார்',
            'மாமியார் மூலமாக சுகம் அனுபவிக்க முடியாது',
            'பெண்கள் கணவனின் தேவைகளை முழுமையாக பூர்த்தி செய்ய வேண்டும்',
            'மருத்துவம் குறைவு (medical field)',
            'Sexual counselling, Event organizer/co-ordinator',
            'நிர்வாகம், தந்தையின் ஆதரவு குறையும்'
          ],
          color: 'purple'
        },
        {
          name: 'பூரட்டாதி (துரிய தோஷம்) (குரு - குபேரன், கர்ணன்)',
          traits: [
            'வட்டத்தொழில்: Finance / Banking சம்பந்தம்',
            'அரசு அரசாங்கம்/அரசு கருவிகள்/மருத்துவம் சம்பந்தப்பட்ட தொழில்',
            'கூட்டுறவில் பிரச்சனைகள், 2 தார தொழில் கொண்ட – (மறுமணம்)',
            'உடன் கொடுக்கலாவது ஆகாது, சொத்துக்களை மேடை உடன் பார்க்கக்கூடாது',
            'வாகனம் விரையும்: (repair/damage/ no vehicle lending)',
            'கடன் தருவது, ஜாமீன், Guarantee போடக்கூடாது',
            'தந்தையின் ஆசிர்வாதம் முழுமையாக கிடைக்காது',
            'மருத்துவர்கள் வர வர தேவறங்கள் குறையும்'
          ],
          color: 'pink'
        }
      ],
      generalTraits: [
        'ஆனவம், அகங்காரம், ஆளுமை குணங்கள் கொண்டவர்கள்',
        'அரசு/அரசாங்கம்/அரசியல்/சட்டம் / தொழில்கள் சம்பந்தப்படும்',
        'மருத்துவம் / மற்றும் மருத்துவம் சம்பந்தப்படும்',
        'அரசாங்க வேலைகளில் சிக்கல் வரலாம்',
        'சட்டத்திற்கு புறம்பாக செயல்படக்கூடாது',
        'அப்பா, மூத்த மகன், மாமனார், உடன் வேலை செய்பவர்கள் தோஷம்',
        'இவர்களை கஷ்டப்படுத்தவோ பகைக்கவோ கூடாது',
        'தந்தையின் ஆதரவு, பொருள் / உறவு மூலமாக குறைபடலாம்',
        'தலை, முதுகெலும்பு, கண் பார்வை, உடலெங்கும் போன்ற உடல் உபாதைகள் சம்பந்தப்படும்',
        'இத்துடன், ஒவ்வொரு நட்சத்திரத்திற்கான கர்மங்களும் சேர்ந்து செயல்படும்'
      ],
      remedies: {
        dharma: [
          'பிள்ளைகளால் கைவிடப்பட்ட தந்தைகளுக்கு முடிந்த வகையில் ஆதரவு கொடுப்பது',
          'Helping strange deserted fathers on roadside',
          'வயது முதிர்ந்த ஆண்களின் ஆசிர்வாதம் பெறுவது'
        ],
        career: [
          'MBA administration, HR, Head Master, Managerial skills',
          'Giving colleague\'s works - பணியில் பிறரின் வேலையை பகிர்ந்துக்கொள்வது',
          'ஆளுமை/நிதானம் பொறுமையை வேலையில் காட்டக்கூடாது',
          'தனக்குக் கீழ் பணி செய்பவரை தாழ்வாக நடத்தக்கூடாது'
        ],
        spiritual: [
          'சூரிய நமஸ்காரம் வழிபாடு செய்வது',
          'சூரிய நமஸ்காரம் செய்வது',
          'சூரியனுக்கு நீர் அர்ப்பணிப்பது',
          'சிவ லிங்கத்திற்கு அபிஷேகம் செய்வது',
          'ஆதித்ய ஹிருதயம் படிப்பது/கேட்பது',
          'சூரிய காயத்ரி மந்திரம் சொல்வது',
          'அசைவ உணவு (முட்டை உடபட) தவிர்க்க வேண்டும்'
        ]
      }
    },
    {
      id: 'chandiran',
      name: 'சந்திரன்',
      nameEnglish: 'Moon',
      icon: 'moon',
      color: 'medium',
      doshamNakshatrams: ['பரணி', 'மகம்', 'கேட்டை', 'உத்திரட்டாதி'],
      doshamDetails: [
        {
          name: 'பரணி (யம தோஷம்) (சுக்கிரன்)',
          traits: [
            'மரண தோஷம் கொண்ட',
            'கர்ப்ப விளக்கம் சம்பந்தப்பட்ட',
            'அதிக காம உணர்வு',
            'பெண்மை குணங்கள் அதிகம்'
          ],
          color: 'red'
        }
      ],
      generalTraits: [
        'மன அமைதியின்மை',
        'தாய் உறவில் பிரச்சனைகள்',
        'சந்திர தோஷம் சம்பந்தப்பட்ட பிரச்சனைகள்'
      ],
      remedies: {
        dharma: ['தாய்மார்களுக்கு உதவி செய்வது'],
        career: ['பெண்களுடன் பணி செய்வது'],
        spiritual: ['சந்திர நமஸ்காரம்', 'சிவ வழிபாடு']
      }
    },
    {
      id: 'sevvai',
      name: 'செவ்வாய்',
      nameEnglish: 'Mars',
      icon: 'flash',
      color: 'danger',
      doshamNakshatrams: ['கார்த்திகை', 'பூரம்', 'மூலம்', 'ரேவதி'],
      doshamDetails: [
        {
          name: 'கார்த்திகை (அக்னி தோஷம்)',
          traits: ['கோபம் அதிகம்', 'தீ சம்பந்தப்பட்ட விபத்துகள்'],
          color: 'orange'
        }
      ],
      generalTraits: ['கோபம் அதிகம்', 'விபத்துக்கள்', 'சகோதர பிரச்சனைகள்'],
      remedies: {
        dharma: ['கோபத்தை கட்டுப்படுத்துவது'],
        career: ['காவல் துறை, இராணுவம்'],
        spiritual: ['அனுமான் வழிபாடு', 'மங்கள நமஸ்காரம்']
      }
    },
    {
      id: 'budhan',
      name: 'புதன்',
      nameEnglish: 'Mercury',
      icon: 'chatbubbles',
      color: 'success',
      doshamNakshatrams: ['ரோகிணி', 'பூரம்', 'உத்திராடம்', 'அஸ்வினி'],
      doshamDetails: [
        {
          name: 'ரோகிணி (பிரம்ம தோஷம்)',
          traits: ['கல்வியில் தடை', 'தகவல் தொடர்பு பிரச்சனை'],
          color: 'green'
        }
      ],
      generalTraits: ['மனக்கோளாறு', 'நரம்பு பிரச்சனைகள்', 'தகவல் தொடர்பு சிக்கல்கள்'],
      remedies: {
        dharma: ['கல்வி உதவி செய்வது'],
        career: ['எழுத்து, பேச்சு சார்ந்த தொழில்கள்'],
        spiritual: ['விஷ்ணு வழிபாடு', 'புத நமஸ்காரம்']
      }
    },
    {
      id: 'guru',
      name: 'குரு',
      nameEnglish: 'Jupiter',
      icon: 'school',
      color: 'tertiary',
      doshamNakshatrams: ['புனர்வசு', 'விசாகம்', 'பூர்வட்டாதி'],
      doshamDetails: [
        {
          name: 'புனர்வசு (அதிதி தோஷம்)',
          traits: ['குரு தோஷம்', 'ஆன்மீக வழிகாட்டல் தேவை'],
          color: 'yellow'
        }
      ],
      generalTraits: ['குரு தோஷம்', 'ஞானம் பெறுவதில் தடை', 'சம்பத்து குறைவு'],
      remedies: {
        dharma: ['குருக்களுக்கு உதவி செய்வது'],
        career: ['கல்வி துறை', 'ஆன்மீக வழிகாட்டல்'],
        spiritual: ['பிரகஸ்பதி வழிபாடு', 'குரு நமஸ்காரம்']
      }
    },
    {
      id: 'sukran',
      name: 'சுக்கிரன்',
      nameEnglish: 'Venus',
      icon: 'heart',
      color: 'secondary',
      doshamNakshatrams: ['பரணி', 'பூரம்', 'பூராடம்'],
      doshamDetails: [
        {
          name: 'பரணி (யம தோஷம்)',
          traits: ['காம வாசனை அதிகம்', 'அழகு சம்பந்தப்பட்ட பிரச்சனைகள்'],
          color: 'pink'
        }
      ],
      generalTraits: ['காம வாசனை', 'திருமண தாமதம்', 'சுக போகங்களில் பிரச்சனை'],
      remedies: {
        dharma: ['பெண்களுக்கு மரியாதை கொடுப்பது'],
        career: ['கலை, அழகு சம்பந்தப்பட்ட தொழில்கள்'],
        spiritual: ['லக்ஷ்மி வழிபாடு', 'சுக்கிர நமஸ்காரம்']
      }
    },
    {
      id: 'sani',
      name: 'சனி',
      nameEnglish: 'Saturn',
      icon: 'time',
      color: 'dark',
      doshamNakshatrams: ['புஷ்ய', 'அனுராதா', 'உத்திரட்டாதி'],
      doshamDetails: [
        {
          name: 'புஷ்ய (பிருஹஸ்பதி தோஷம்)',
          traits: ['சனி தோஷம்', 'தாமதம்', 'கஷ்டங்கள்'],
          color: 'dark'
        }
      ],
      generalTraits: ['தாமதம்', 'கஷ்டங்கள்', 'விபத்துக்கள்', 'நீதி சம்பந்தப்பட்ட பிரச்சனைகள்'],
      remedies: {
        dharma: ['ஏழைகளுக்கு உதவி செய்வது'],
        career: ['கடின உழைப்பு', 'தொழிலாளர் வேலைகள்'],
        spiritual: ['சனிஸ்வர வழிபாடு', 'சனி நமஸ்காரம்']
      }
    },
    {
      id: 'rahu',
      name: 'ராகு',
      nameEnglish: 'Rahu',
      icon: 'planet',
      color: 'warning',
      doshamNakshatrams: ['ஸ்வாதி', 'சதையம்', 'ஆர்த்திரா'],
      doshamDetails: [
        {
          name: 'ஸ்வாதி (வாயு தோஷம்)',
          traits: ['மாயை', 'குழப்பம்', 'வெளிநாட்டு தொடர்பு'],
          color: 'purple'
        }
      ],
      generalTraits: ['மாயை', 'குழப்பம்', 'அச்சம்', 'வெளிநாட்டு சார்ந்த பிரச்சனைகள்'],
      remedies: {
        dharma: ['பாம்பு கடிபட்டவர்களுக்கு உதவி'],
        career: ['தொழில்நுட்பம்', 'வெளிநாட்டு வேலைகள்'],
        spiritual: ['நாக வழிபாடு', 'ராகு நமஸ்காரம்']
      }
    },
    {
      id: 'ketu',
      name: 'கேது',
      nameEnglish: 'Ketu',
      icon: 'eye',
      color: 'medium',
      doshamNakshatrams: ['அஸ்வினி', 'மகம்', 'மூலம்'],
      doshamDetails: [
        {
          name: 'அஸ்வினி (அஸ்வினி குமார தோஷம்)',
          traits: ['ஆன்மீக விழிப்புணர்வு', 'மருத்துவ சக்தி', 'உளவியல் பிரச்சனைகள்'],
          color: 'orange'
        }
      ],
      generalTraits: ['ஆன்மீக தேடல்', 'மூட நம்பிக்கைகள்', 'மருத்துவ சக்தி'],
      remedies: {
        dharma: ['மருത்துவ உதவி செய்வது'],
        career: ['ஆன்மீகம்', 'மாற்று மருத்துவம்'],
        spiritual: ['கேது வழிபாடு', 'கணபதி வழிபாடு']
      }
    }
  ];

  constructor(private toastController: ToastController) { }
  sectionOpen: { [key: string]: boolean } = {};

  toggleSection(section: string): void {
    this.sectionOpen[section] = !this.sectionOpen[section];
  }

  ngOnInit() {
    // Initialize sectionOpen for all planets
    this.planets.forEach(planet => {
      this.sectionOpen[planet.id] = false;
    });
    
    // Check if this concept is bookmarked
    this.checkBookmarkStatus();
  }

  togglePlanet(planet: Planet) {
    planet.expanded = !planet.expanded;
  }

  toggleOverview() {
    this.showOverview = !this.showOverview;
  }

  toggleSuriyan() {
    this.showSuriyan = !this.showSuriyan;
  }

  checkBookmarkStatus() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
    this.isBookmarked = bookmarks.includes('dna_astrology_001');
  }

  async toggleBookmark() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
    
    if (this.isBookmarked) {
      // Remove bookmark
      const index = bookmarks.indexOf('dna_astrology_001');
      if (index > -1) {
        bookmarks.splice(index, 1);
      }
      this.isBookmarked = false;
      await this.showToast('Bookmark removed', 'warning');
    } else {
      // Add bookmark
      bookmarks.push('dna_astrology_001');
      this.isBookmarked = true;
      await this.showToast('Bookmarked successfully', 'success');
    }
    
    localStorage.setItem('bookmarkedConcepts', JSON.stringify(bookmarks));
  }

  async shareContent() {
    try {
      // Use Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: 'DNA ஜோதிஷம் - DNA Astrology',
          text: 'மரபணு அறிவியலுடன் இணைந்த நவீன ஜோதிட ஆராய்ச்சி மற்றும் கணிப்புகள்',
          url: window.location.href
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        await this.showToast('Link copied to clipboard', 'success');
      }
    } catch (error) {
      console.log('Error sharing:', error);
      await this.showToast('Sharing not available', 'warning');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}
