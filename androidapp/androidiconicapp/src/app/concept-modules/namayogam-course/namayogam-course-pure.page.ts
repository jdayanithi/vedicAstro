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

  // Pure Yoga names only - completely separate from nakshatra and weekday
  namayogamList: Namayogam[] = [
    {
      id: 'vishkumba',
      name: 'விஷ்கும்ப',
      englishName: 'Vishkumba',
      nakshatra: 'அஸ்வினி', // Reference info only - not part of yoga name
      nakshatraEnglish: 'Ashwini',
      weekday: 'ஞாயிறு', // Reference info only - not part of yoga name
      weekdayEnglish: 'Sunday',
      effect: 'வெற்றி',
      effectEnglish: 'Victory',
      rulingPlanet: 'Jupiter',
      element: 'Ether',
      quality: 'Rajasic',
      bestTime: 'Morning 6-9 AM',
      description: 'விஷ்கும்ப யோகம் வெற்றி மற்றும் தலைமைத்துவத்திற்கு மிகவும் உகந்த யோகம். இந்த யோகத்தில் தொடங்கும் செயல்கள் பெரும் வெற்றியை தரும்.',
      characteristics: [
        'வெற்றி குணம்',
        'தலைமைத்துவம்',
        'சக்தி வாய்ந்த ஆற்றல்',
        'முன்னேற்றம்',
        'சாதனை உணர்வு',
        'எதிர்ப்பை வெல்லுதல்'
      ],
      keyBenefits: [
        'வெற்றி உறுதி',
        'தலைமைத்துவம்',
        'சக்தி அதிகரிப்பு',
        'முன்னேற்றம்'
      ],
      favorableActivities: [
        'Starting new ventures',
        'Leadership initiatives',
        'Competitive activities',
        'Goal achievement',
        'Overcoming obstacles'
      ],
      unfavorableActivities: [
        'Peaceful negotiations',
        'Surrender activities',
        'Passive meditation',
        'Rest and relaxation'
      ],
      lifeImpact: {
        career: 'Leadership success and achievement',
        health: 'Strong vitality and energy',
        relationships: 'Commanding but protective',
        spirituality: 'Victory over inner obstacles'
      },
      pariharam: {
        dailyPractices: [
          'Meditate on victory mantras',
          'Visualize achieving goals',
          'Practice leadership skills',
          'Help others overcome obstacles'
        ],
        offerings: [
          'Yellow flowers to Jupiter',
          'Turmeric and jaggery',
          'Gold ornaments to temple',
          'Food to successful people'
        ],
        gems: {
          primary: 'Yellow Sapphire',
          alternative: 'Topaz',
          benefits: 'Enhances victory and leadership qualities'
        },
        mantras: [
          {
            name: 'Guru Mantra',
            text: 'ॐ गुरवे नमः',
            count: '108 times'
          },
          {
            name: 'Victory Mantra',
            text: 'ॐ विष्कुम्भाय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Goal Setting',
          description: 'Set clear victory goals',
          details: 'Define what victory means for you'
        },
        {
          title: 'Energy Invocation',
          description: 'Invoke victorious energy',
          details: 'Call upon the power of achievement'
        },
        {
          title: 'Action Planning',
          description: 'Plan your victory strategy',
          details: 'Create actionable steps toward success'
        }
      ]
    },
    {
      id: 'priti',
      name: 'பிரீதி',
      englishName: 'Priti',
      nakshatra: 'பரணி', // Reference info only
      nakshatraEnglish: 'Bharani',
      weekday: 'திங்கள்', // Reference info only
      weekdayEnglish: 'Monday',
      effect: 'அன்பு',
      effectEnglish: 'Love & Joy',
      rulingPlanet: 'Venus',
      element: 'Water',
      quality: 'Satvic',
      bestTime: 'Evening 6-9 PM',
      description: 'பிரீதி யோகம் அன்பு, மகிழ்ச்சி மற்றும் உறவுகளுக்கு சிறந்த யோகம். இந்த யோகத்தில் காதல் மற்றும் குடும்ப விஷயங்கள் சாதகமாக முடியும்.',
      characteristics: [
        'அன்பு மற்றும் கருணை',
        'மகிழ்ச்சி தரும் தன்மை',
        'உறவுகள் மேம்பாடு',
        'இனிமையான குணம்',
        'சந்தோஷம்',
        'பாசம் வெளிப்பாடு'
      ],
      keyBenefits: [
        'அன்பு பெருக்கம்',
        'மகிழ்ச்சி அதிகரிப்பு',
        'உறவு நல்லிணக்கம்',
        'மன அமைதி'
      ],
      favorableActivities: [
        'Expressing love',
        'Family bonding',
        'Artistic creation',
        'Celebration',
        'Gift giving'
      ],
      unfavorableActivities: [
        'Conflicts',
        'Harsh words',
        'Breaking relationships',
        'Anger expression'
      ],
      lifeImpact: {
        career: 'Success in creative and people-oriented fields',
        health: 'Emotional wellbeing and heart health',
        relationships: 'Deep love and joyful connections',
        spirituality: 'Devotional love and divine joy'
      },
      pariharam: {
        dailyPractices: [
          'Express love to family',
          'Practice gratitude',
          'Share joy with others',
          'Create beautiful things'
        ],
        offerings: [
          'Pink and white flowers to Venus',
          'Sweet offerings',
          'Beautiful ornaments',
          'Gifts to loved ones'
        ],
        gems: {
          primary: 'Diamond',
          alternative: 'White Sapphire',
          benefits: 'Brings love, joy and harmonious relationships'
        },
        mantras: [
          {
            name: 'Shukra Mantra',
            text: 'ॐ शुक्राय नमः',
            count: '108 times'
          },
          {
            name: 'Love Mantra',
            text: 'ॐ प्रीत्यै नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Heart Opening',
          description: 'Open your heart to love',
          details: 'Feel the joy and love within you'
        },
        {
          title: 'Love Expression',
          description: 'Express love freely',
          details: 'Share your love with others'
        },
        {
          title: 'Joy Cultivation',
          description: 'Cultivate inner joy',
          details: 'Find reasons to be happy and grateful'
        }
      ]
    },
    {
      id: 'ayushmana',
      name: 'ஆயுஷ்மான்',
      englishName: 'Ayushmana',
      nakshatra: 'கார்த்திகை', // Reference info only
      nakshatraEnglish: 'Krittika',
      weekday: 'செவ்வாய்', // Reference info only
      weekdayEnglish: 'Tuesday',
      effect: 'நீண்ட ஆயுள்',
      effectEnglish: 'Longevity & Health',
      rulingPlanet: 'Jupiter',
      element: 'Earth',
      quality: 'Satvic',
      bestTime: 'Morning 9-12 PM',
      description: 'ஆயுஷ்மான் யோகம் நீண்ட ஆயுள், ஆரோக்கியம் மற்றும் வலிமைக்கு உகந்த யோகம். இந்த யோகத்தில் மருத்துவ சிகிச்சைகள் மிகவும் பலனளிக்கும்.',
      characteristics: [
        'நீண்ட ஆயுள்',
        'வலுவான ஆரோக்கியம்',
        'வாழ்வின் நீட்சி',
        'நல்ல உடல்நலம்',
        'ஆற்றல் வளம்',
        'வாழ்வு சக்தி'
      ],
      keyBenefits: [
        'நீண்ட வாழ்க்கை',
        'நல்ல ஆரோக்கியம்',
        'வலிமை அதிகரிப்பு',
        'நோய் நிவாரணம்'
      ],
      favorableActivities: [
        'Health treatments',
        'Medical procedures',
        'Fitness activities',
        'Longevity practices',
        'Healing ceremonies'
      ],
      unfavorableActivities: [
        'Risky behaviors',
        'Unhealthy habits',
        'Dangerous activities',
        'Stress-inducing work'
      ],
      lifeImpact: {
        career: 'Success in healthcare and wellness fields',
        health: 'Excellent physical and mental vitality',
        relationships: 'Long-lasting and nurturing bonds',
        spirituality: 'Practices for spiritual longevity'
      },
      pariharam: {
        dailyPractices: [
          'Practice yoga and meditation',
          'Eat healthy nutritious food',
          'Exercise regularly',
          'Help heal others'
        ],
        offerings: [
          'Green vegetables to Jupiter',
          'Medicinal herbs',
          'Health supplies to hospitals',
          'Food to elderly people'
        ],
        gems: {
          primary: 'Emerald',
          alternative: 'Green Tourmaline',
          benefits: 'Grants long life and perfect health'
        },
        mantras: [
          {
            name: 'Dhanvantari Mantra',
            text: 'ॐ धन्वन्तरये नमः',
            count: '108 times'
          },
          {
            name: 'Longevity Mantra',
            text: 'ॐ आयुष्मते नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Health Assessment',
          description: 'Evaluate your current health',
          details: 'Check your physical and mental wellbeing'
        },
        {
          title: 'Vitality Enhancement',
          description: 'Enhance your life force',
          details: 'Practice breathing and energy exercises'
        },
        {
          title: 'Longevity Planning',
          description: 'Plan for long healthy life',
          details: 'Create sustainable health habits'
        }
      ]
    }
    // Note: These are pure yoga names without mixing with nakshatra or weekday
    // Nakshatra and weekday are kept as separate reference information only
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
