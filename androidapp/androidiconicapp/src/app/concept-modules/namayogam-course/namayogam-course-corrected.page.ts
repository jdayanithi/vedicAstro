import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface Namayogam {
  id: string;
  name: string;
  englishName: string;
  nakshatra: string;
  nakshatraEnglish: string;
  weekday: string;
  weekdayEnglish: string;
  effect: string;
  effectEnglish: string;
  rulingPlanet: string;
  element: string;
  quality: string;
  bestTime: string;
  description: string;
  characteristics: string[];
  keyBenefits: string[];
  favorableActivities: string[];
  unfavorableActivities: string[];
  lifeImpact: {
    career: string;
    health: string;
    relationships: string;
    spirituality: string;
  };
  pariharam: {
    dailyPractices: string[];
    offerings: string[];
    gems: {
      primary: string;
      alternative: string;
      benefits: string;
    };
    mantras: {
      name: string;
      text: string;
      count: string;
    }[];
  };
  activationProcess: {
    title: string;
    description: string;
    details?: string;
  }[];
}

@Component({
  selector: 'app-namayogam-course',
  templateUrl: './namayogam-course.page.html',
  styleUrls: ['./namayogam-course.page.scss'],
})
export class NamayogamCoursePage implements OnInit {
  searchTerm: string = '';
  isModalOpen: boolean = false;
  selectedNamayogam: Namayogam | null = null;
  filteredNamayogam: Namayogam[] = [];
  completedNamayogam: string[] = [];
  favoriteNamayogam: string[] = [];

  // Namayogam = Weekday + Yoga combination (not mixed with nakshatra)
  namayogamList: Namayogam[] = [
    {
      id: 'vishkumba_sunday',
      name: 'விஷ்கும்ப ஞாயிறு',
      englishName: 'Vishkumba Sunday',
      nakshatra: 'அஸ்வினி', // This is separate info, not part of namayogam name
      nakshatraEnglish: 'Ashwini',
      weekday: 'ஞாயிறு',
      weekdayEnglish: 'Sunday',
      effect: 'வெற்றி',
      effectEnglish: 'Victory',
      rulingPlanet: 'Sun',
      element: 'Fire',
      quality: 'Rajasic',
      bestTime: 'Morning 6-9 AM',
      description: 'விஷ்கும்ப ஞாயிறு வெற்றி மற்றும் தலைமைத்துவத்திற்கு மிகவும் உகந்த நாமயோகம். இந்த நாளில் தொடங்கும் செயல்கள் பெரும் வெற்றியை தரும்.',
      characteristics: [
        'தலைமைத்துவ குணங்கள்',
        'விரைவான செயல்பாடு',
        'வீர குணம்',
        'முன்முயற்சி',
        'சாகச உணர்வு',
        'எதிரி ஜெயம்'
      ],
      keyBenefits: [
        'வெற்றி உறுதி',
        'தலைமைத்துவம்',
        'எதிரி ஜெயம்',
        'சக்தி அதிகரிப்பு'
      ],
      favorableActivities: [
        'Starting new business',
        'Leadership roles',
        'Competitions',
        'Legal matters',
        'Government work'
      ],
      unfavorableActivities: [
        'Marriage ceremonies',
        'Partnership agreements',
        'Peaceful negotiations',
        'Meditation retreats'
      ],
      lifeImpact: {
        career: 'Leadership positions and entrepreneurial success',
        health: 'Strong vitality and quick recovery',
        relationships: 'Dominant but protective nature',
        spirituality: 'Action-oriented spiritual practices'
      },
      pariharam: {
        dailyPractices: [
          'Surya namaskara at sunrise',
          'Chant Gayatri mantra 108 times',
          'Offer red flowers to Sun',
          'Help leaders and authorities'
        ],
        offerings: [
          'Red flowers and kumkum to Sun deity',
          'Copper vessel with water',
          'Ghee lamp lighting',
          'Food to government servants'
        ],
        gems: {
          primary: 'Ruby',
          alternative: 'Red Coral',
          benefits: 'Enhances leadership qualities and ensures victory'
        },
        mantras: [
          {
            name: 'Surya Mantra',
            text: 'ॐ सूर्याय नमः',
            count: '108 times'
          },
          {
            name: 'Victory Mantra',
            text: 'ॐ जयन्ती विष्कुम्भाय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Solar Connection',
          description: 'Connect with Sun energy at sunrise',
          details: 'Face east and offer water to the rising Sun'
        },
        {
          title: 'Victory Invocation',
          description: 'Invoke the energy of victory',
          details: 'Visualize yourself achieving your goals'
        },
        {
          title: 'Leadership Blessing',
          description: 'Seek blessings for leadership',
          details: 'Ask for wisdom to lead others righteously'
        }
      ]
    },
    {
      id: 'priti_monday',
      name: 'பிரீதி திங்கள்',
      englishName: 'Priti Monday',
      nakshatra: 'பரணி', // Separate nakshatra info, not mixed with namayogam
      nakshatraEnglish: 'Bharani',
      weekday: 'திங்கள்',
      weekdayEnglish: 'Monday',
      effect: 'அன்பு',
      effectEnglish: 'Love & Harmony',
      rulingPlanet: 'Moon',
      element: 'Water',
      quality: 'Satvic',
      bestTime: 'Evening 6-9 PM',
      description: 'பிரீதி திங்கள் அன்பு, நீர்மை மற்றும் உறவுகளுக்கு சிறந்த நாமயோகம். இந்த நாளில் காதல் மற்றும் குடும்ப விஷயங்கள் சாதகமாக முடியும்.',
      characteristics: [
        'அன்பு மற்றும் கருணை',
        'உணர்ச்சி வசப்படுதல்',
        'பாதுகாப்பு உணர்வு',
        'தியாக மனப்பான்மை',
        'குடும்ப பாசம்',
        'உறவுகள் மேம்பாடு'
      ],
      keyBenefits: [
        'காதல் வெற்றி',
        'குடும்ப நல்லிணக்கம்',
        'மன அமைதி',
        'உறவு மேம்பாடு'
      ],
      favorableActivities: [
        'Marriage proposals',
        'Family gatherings',
        'Romantic activities',
        'Peace making',
        'Artistic pursuits'
      ],
      unfavorableActivities: [
        'Legal disputes',
        'Breaking relationships',
        'Aggressive actions',
        'Military activities'
      ],
      lifeImpact: {
        career: 'Success in creative and nurturing professions',
        health: 'Reproductive health and emotional wellbeing',
        relationships: 'Deep emotional bonds and family harmony',
        spirituality: 'Devotional practices and divine love'
      },
      pariharam: {
        dailyPractices: [
          'Worship Moon deity at night',
          'Offer white flowers to Moon',
          'Drink milk and eat sweet rice',
          'Express love to family members'
        ],
        offerings: [
          'White flowers and milk to Moon',
          'Silver ornaments to temple',
          'Sweet rice to devotees',
          'Gifts to beloved ones'
        ],
        gems: {
          primary: 'Pearl',
          alternative: 'Moonstone',
          benefits: 'Brings love, peace and emotional harmony'
        },
        mantras: [
          {
            name: 'Chandra Mantra',
            text: 'ॐ चन्द्राय नमः',
            count: '108 times'
          },
          {
            name: 'Love Mantra',
            text: 'ॐ प्रीत्यै चन्द्राय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Lunar Connection',
          description: 'Connect with Moon energy at night',
          details: 'Sit under moonlight and meditate'
        },
        {
          title: 'Love Invocation',
          description: 'Invoke divine love energy',
          details: 'Open your heart to universal love'
        },
        {
          title: 'Harmony Creation',
          description: 'Create harmonious atmosphere',
          details: 'Resolve conflicts with family and friends'
        }
      ]
    },
    {
      id: 'ayushmana_tuesday',
      name: 'ஆயுஷ்மான் செவ்வாய்',
      englishName: 'Ayushmana Tuesday',
      nakshatra: 'கார்த்திகை', // Separate nakshatra info
      nakshatraEnglish: 'Krittika',
      weekday: 'செவ்வாய்',
      weekdayEnglish: 'Tuesday',
      effect: 'நீண்ட ஆயுள்',
      effectEnglish: 'Longevity',
      rulingPlanet: 'Mars',
      element: 'Fire',
      quality: 'Satvic',
      bestTime: 'Morning 9-12 PM',
      description: 'ஆயுஷ்மான் செவ்வாய் நீண்ட ஆயுள், ஆரோக்கியம் மற்றும் வலிமைக்கு உகந்த நாமயோகம். இந்த நாளில் மருத்துவ சிகிச்சைகள் மிகவும் பலனளிக்கும்.',
      characteristics: [
        'நீண்ட ஆயுள்',
        'வலுவான ஆரோக்கியம்',
        'தீக்ஷண்ய புத்தி',
        'வெட்டித் தெளிவு',
        'தீர்மான சக்தி',
        'சுத்திகரிப்பு ஆற்றல்'
      ],
      keyBenefits: [
        'நீண்ட ஆயுள்',
        'ஆரோக்கிய மேம்பாடு',
        'வலிமை அதிகரிப்பு',
        'நோய் நிவாரணம்'
      ],
      favorableActivities: [
        'Medical treatments',
        'Health checkups',
        'Exercise programs',
        'Yoga practice',
        'Ayurvedic treatments'
      ],
      unfavorableActivities: [
        'Dangerous activities',
        'Risky ventures',
        'Unhealthy eating',
        'Stress-inducing work'
      ],
      lifeImpact: {
        career: 'Success in healthcare and leadership fields',
        health: 'Excellent physical and mental health',
        relationships: 'Protective and caring nature',
        spirituality: 'Fire ceremonies and purification practices'
      },
      pariharam: {
        dailyPractices: [
          'Practice yoga and pranayama',
          'Eat nutritious food',
          'Chant Mrityunjaya mantra',
          'Help sick people'
        ],
        offerings: [
          'Red flowers to Sun and Mars',
          'Turmeric and jaggery',
          'Medicine to hospitals',
          'Food to health workers'
        ],
        gems: {
          primary: 'Yellow Sapphire',
          alternative: 'Topaz',
          benefits: 'Grants long life and perfect health'
        },
        mantras: [
          {
            name: 'Mrityunjaya Mantra',
            text: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्',
            count: '108 times'
          },
          {
            name: 'Ayushmana Mantra',
            text: 'ॐ आयुष्मते नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Health Assessment',
          description: 'Assess your current health status',
          details: 'Check vital signs and overall wellbeing'
        },
        {
          title: 'Vitality Invocation',
          description: 'Invoke divine life force',
          details: 'Call upon healing energies of Mars'
        },
        {
          title: 'Healing Prayer',
          description: 'Pray for perfect health',
          details: 'Ask for healing of body, mind, and spirit'
        }
      ]
    }
    // Note: This shows proper namayogam structure (weekday + yoga, not nakshatra)
    // Nakshatra information is kept separate for reference
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.loadCompletedNamayogam();
    this.loadFavoriteNamayogam();
    this.filterNamayogam();
  }

  loadCompletedNamayogam() {
    const completed = localStorage.getItem('completedNamayogam');
    if (completed) {
      this.completedNamayogam = JSON.parse(completed);
    }
  }

  loadFavoriteNamayogam() {
    const favorites = localStorage.getItem('favoriteNamayogam');
    if (favorites) {
      this.favoriteNamayogam = JSON.parse(favorites);
    }
  }

  filterNamayogam() {
    if (!this.searchTerm) {
      this.filteredNamayogam = this.namayogamList;
    } else {
      this.filteredNamayogam = this.namayogamList.filter(namayogam =>
        namayogam.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        namayogam.englishName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        namayogam.weekday.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        namayogam.effect.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  onSearchChange() {
    this.filterNamayogam();
  }

  async openNamayogamDetail(namayogam: Namayogam) {
    this.selectedNamayogam = namayogam;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedNamayogam = null;
  }

  toggleCompleted(namayogamId: string) {
    if (this.completedNamayogam.includes(namayogamId)) {
      this.completedNamayogam = this.completedNamayogam.filter(id => id !== namayogamId);
    } else {
      this.completedNamayogam.push(namayogamId);
    }
    localStorage.setItem('completedNamayogam', JSON.stringify(this.completedNamayogam));
  }

  toggleFavorite(namayogamId: string) {
    if (this.favoriteNamayogam.includes(namayogamId)) {
      this.favoriteNamayogam = this.favoriteNamayogam.filter(id => id !== namayogamId);
    } else {
      this.favoriteNamayogam.push(namayogamId);
    }
    localStorage.setItem('favoriteNamayogam', JSON.stringify(this.favoriteNamayogam));
  }

  isCompleted(namayogamId: string): boolean {
    return this.completedNamayogam.includes(namayogamId);
  }

  isFavorite(namayogamId: string): boolean {
    return this.favoriteNamayogam.includes(namayogamId);
  }

  getCompletionPercentage(): number {
    return Math.round((this.completedNamayogam.length / this.namayogamList.length) * 100);
  }
}
