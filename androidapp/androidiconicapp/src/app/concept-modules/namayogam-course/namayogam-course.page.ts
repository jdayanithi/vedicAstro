import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface Namayogam {
  id: string;
  name: string;
  englishName: string;
  nakshatra: string;
  weekday: string;
  effect: string;
  rulingPlanet: string;
  element: string;
  quality: string;
  bestTime: string;
  description: string;
  keyBenefits: string[];
  favorableActivities: string[];
  unfavorableActivities: string[];
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

  namayogamList: Namayogam[] = [
    {
      id: 'vishkumba_sunday',
      name: 'விஷ்கும்ப ஞாயிறு',
      englishName: 'Vishkumba Sunday',
      nakshatra: 'Ashwini',
      weekday: 'Sunday',
      effect: 'Victory',
      rulingPlanet: 'Sun + Ketu',
      element: 'Fire',
      quality: 'Rajasic',
      bestTime: 'Morning 6-9 AM',
      description: 'விஷ்கும்ப ஞாயிறு வெற்றி மற்றும் தலைமைத்துவத்திற்கு மிகவும் உகந்த நாமயோகம். இந்த நாளில் தொடங்கும் செயல்கள் பெரும் வெற்றியை தரும்.',
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
        },
        {
          title: 'Strength Meditation',
          description: 'Meditate on inner strength',
          details: 'Feel the powerful Sun energy within you'
        },
        {
          title: 'Success Dedication',
          description: 'Dedicate success to divine',
          details: 'Promise to use victory for greater good'
        }
      ]
    },
    {
      id: 'priti_monday',
      name: 'பிரீதி திங்கள்',
      englishName: 'Priti Monday',
      nakshatra: 'Bharani',
      weekday: 'Monday',
      effect: 'Love & Harmony',
      rulingPlanet: 'Moon + Venus',
      element: 'Water',
      quality: 'Satvic',
      bestTime: 'Evening 6-9 PM',
      description: 'பிரீதி திங்கள் அன்பு, நீர்மை மற்றும் உறவுகளுக்கு சிறந்த நாமயோகம். இந்த நாளில் காதல் மற்றும் குடும்ப விஷயங்கள் சாதகமாக முடியும்.',
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
        },
        {
          title: 'Peace Meditation',
          description: 'Meditate on inner peace',
          details: 'Let Moon energy calm your mind'
        },
        {
          title: 'Relationship Blessing',
          description: 'Bless all your relationships',
          details: 'Send love to everyone in your life'
        }
      ]
    },
    {
      id: 'ayushmana_tuesday',
      name: 'ஆயுஷ்மான் செவ்வாய்',
      englishName: 'Ayushmana Tuesday',
      nakshatra: 'Krittika',
      weekday: 'Tuesday',
      effect: 'Longevity',
      rulingPlanet: 'Mars + Jupiter',
      element: 'Fire',
      quality: 'Satvic',
      bestTime: 'Morning 9-12 PM',
      description: 'ஆயுஷ்மான் செவ்வாய் நீண்ட ஆயுள், ஆரோக்கியம் மற்றும் வலிமைக்கு உகந்த நாமயோகம். இந்த நாளில் மருத்துவ சிகிச்சைகள் மிகவும் பலனளிக்கும்.',
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
      pariharam: {
        dailyPractices: [
          'Practice yoga and pranayama',
          'Eat nutritious food',
          'Chant Mrityunjaya mantra',
          'Help sick people'
        ],
        offerings: [
          'Yellow flowers to Jupiter',
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
          details: 'Call upon healing energies of Mars and Jupiter'
        },
        {
          title: 'Healing Prayer',
          description: 'Pray for perfect health',
          details: 'Ask for healing of body, mind, and spirit'
        },
        {
          title: 'Energy Meditation',
          description: 'Meditate on life energy',
          details: 'Visualize golden healing light in your body'
        },
        {
          title: 'Longevity Commitment',
          description: 'Commit to healthy living',
          details: 'Promise to take care of your body temple'
        }
      ]
    },
    {
      id: 'saubhagya_wednesday',
      name: 'சௌபாக்ய புதன்',
      englishName: 'Saubhagya Wednesday',
      nakshatra: 'Rohini',
      weekday: 'Wednesday',
      effect: 'Good Fortune',
      rulingPlanet: 'Mercury + Moon',
      element: 'Earth',
      quality: 'Rajasic',
      bestTime: 'Afternoon 12-3 PM',
      description: 'சௌபாக்ய புதன் அதிர்ஷ்டம், செல்வம் மற்றும் நல்வாழ்வுக்கு உகந்த நாமயோகம். இந்த நாளில் வணிகம் மற்றும் முதலீடுகள் லாபம் தரும்.',
      keyBenefits: [
        'அதிர்ஷ்ட அதிகரிப்பு',
        'செல்வ வளர்ச்சி',
        'வணிக வெற்றி',
        'நல்வாழ்வு'
      ],
      favorableActivities: [
        'Business deals',
        'Investments',
        'Shopping',
        'Property buying',
        'Financial planning'
      ],
      unfavorableActivities: [
        'Lending money',
        'Gambling',
        'Risky investments',
        'Charity without planning'
      ],
      pariharam: {
        dailyPractices: [
          'Worship Goddess Lakshmi',
          'Keep workplace clean',
          'Practice gratitude',
          'Help needy people'
        ],
        offerings: [
          'Gold flowers to Lakshmi',
          'Sweets and fruits',
          'Money to temples',
          'Food to poor families'
        ],
        gems: {
          primary: 'Emerald',
          alternative: 'Green Tourmaline',
          benefits: 'Brings good fortune and material prosperity'
        },
        mantras: [
          {
            name: 'Lakshmi Mantra',
            text: 'ॐ श्री लक्ष्म्यै नमः',
            count: '108 times'
          },
          {
            name: 'Fortune Mantra',
            text: 'ॐ सौभाग्य वर्धनाय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Fortune Altar',
          description: 'Create altar for fortune deities',
          details: 'Use gold items and prosperity symbols'
        },
        {
          title: 'Abundance Invocation',
          description: 'Invoke divine abundance',
          details: 'Ask for legitimate wealth and prosperity'
        },
        {
          title: 'Gratitude Practice',
          description: 'Practice gratitude for current blessings',
          details: 'Appreciate what you already have'
        },
        {
          title: 'Prosperity Meditation',
          description: 'Meditate on abundance',
          details: 'Visualize golden light of prosperity'
        },
        {
          title: 'Sharing Commitment',
          description: 'Commit to sharing wealth',
          details: 'Promise to help others when successful'
        }
      ]
    },
    {
      id: 'shobhana_thursday',
      name: 'சோபன வியாழன்',
      englishName: 'Shobhana Thursday',
      nakshatra: 'Mrigashira',
      weekday: 'Thursday',
      effect: 'Beauty & Grace',
      rulingPlanet: 'Jupiter + Venus',
      element: 'Air',
      quality: 'Satvic',
      bestTime: 'Morning 6-9 AM',
      description: 'சோபன வியாழன் அழகு, கருணை மற்றும் ஆன்மீக வளர்ச்சிக்கு உகந்த நாமயோகம். இந்த நாளில் கல்வி மற்றும் கலை செயல்பாடுகள் சிறப்பாக நடக்கும்.',
      keyBenefits: [
        'அழகு அதிகரிப்பு',
        'கருணை வளர்ச்சி',
        'ஞான விளக்கம்',
        'கலை திறன்'
      ],
      favorableActivities: [
        'Educational pursuits',
        'Artistic activities',
        'Beauty treatments',
        'Spiritual practices',
        'Cultural events'
      ],
      unfavorableActivities: [
        'Ugly behavior',
        'Harsh criticism',
        'Destroying art',
        'Insulting teachers'
      ],
      pariharam: {
        dailyPractices: [
          'Study sacred texts',
          'Practice arts and music',
          'Beautify surroundings',
          'Teach or learn something'
        ],
        offerings: [
          'Yellow flowers to Jupiter',
          'Books and art supplies',
          'Beautiful ornaments',
          'Sweets to students'
        ],
        gems: {
          primary: 'Yellow Sapphire',
          alternative: 'Citrine',
          benefits: 'Enhances beauty, wisdom and artistic abilities'
        },
        mantras: [
          {
            name: 'Saraswati Mantra',
            text: 'ॐ ऐं सरस्वत्यै नमः',
            count: '108 times'
          },
          {
            name: 'Beauty Mantra',
            text: 'ॐ शोभनाय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Beauty Altar',
          description: 'Create beautiful sacred space',
          details: 'Use flowers, art, and beautiful objects'
        },
        {
          title: 'Grace Invocation',
          description: 'Invoke divine grace and beauty',
          details: 'Ask for inner and outer beauty'
        },
        {
          title: 'Artistic Expression',
          description: 'Express your creativity',
          details: 'Engage in any form of art or music'
        },
        {
          title: 'Wisdom Seeking',
          description: 'Seek divine wisdom',
          details: 'Study spiritual or educational material'
        },
        {
          title: 'Beauty Sharing',
          description: 'Share beauty with others',
          details: 'Make others smile and feel beautiful'
        }
      ]
    },
    {
      id: 'atiganda_friday',
      name: 'அதிகண்ட வெள்ளி',
      englishName: 'Atiganda Friday',
      nakshatra: 'Ardra',
      weekday: 'Friday',
      effect: 'Challenges',
      rulingPlanet: 'Venus + Rahu',
      element: 'Water',
      quality: 'Tamasic',
      bestTime: 'Late evening 9-12 PM',
      description: 'அதிகண்ட வெள்ளி சவால்கள் மற்றும் தடைகளை உருவாக்கும் நாமயோகம். இந்த நாளில் எச்சரிக்கையுடன் செயல்பட வேண்டும். ஆன்மீக பயிற்சிகள் மேற்கொள்ளலாம்.',
      keyBenefits: [
        'ஆன்மீக வலிமை',
        'தடை நீக்கம்',
        'பொறுமை வளர்ச்சி',
        'கர்ம சுத்திகரிப்பு'
      ],
      favorableActivities: [
        'Spiritual practices',
        'Meditation',
        'Penance',
        'Obstacle removal rituals',
        'Charity work'
      ],
      unfavorableActivities: [
        'Starting new ventures',
        'Marriage ceremonies',
        'Travel plans',
        'Important meetings'
      ],
      pariharam: {
        dailyPractices: [
          'Chant protective mantras',
          'Visit temples',
          'Help suffering people',
          'Practice patience'
        ],
        offerings: [
          'Black sesame to Saturn',
          'Iron items to temples',
          'Food to beggars',
          'Oil lamps in temples'
        ],
        gems: {
          primary: 'Blue Sapphire',
          alternative: 'Amethyst',
          benefits: 'Provides protection and removes obstacles'
        },
        mantras: [
          {
            name: 'Shani Mantra',
            text: 'ॐ शं शनैश्चराय नमः',
            count: '108 times'
          },
          {
            name: 'Protection Mantra',
            text: 'ॐ गं गणपतये विघ्न नाशाय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Protection Setup',
          description: 'Create protective environment',
          details: 'Use protective symbols and mantras'
        },
        {
          title: 'Challenge Acceptance',
          description: 'Accept challenges as learning',
          details: 'View obstacles as opportunities for growth'
        },
        {
          title: 'Patience Cultivation',
          description: 'Cultivate patience and perseverance',
          details: 'Practice staying calm under pressure'
        },
        {
          title: 'Spiritual Focus',
          description: 'Focus on spiritual development',
          details: 'Use this time for inner growth'
        },
        {
          title: 'Service to Suffering',
          description: 'Serve those who are suffering',
          details: 'Help others overcome their challenges'
        }
      ]
    },
    {
      id: 'sukarma_saturday',
      name: 'சுகர்ம சனி',
      englishName: 'Sukarma Saturday',
      nakshatra: 'Punarvasu',
      weekday: 'Saturday',
      effect: 'Good Deeds',
      rulingPlanet: 'Saturn + Jupiter',
      element: 'Air',
      quality: 'Satvic',
      bestTime: 'Evening 6-9 PM',
      description: 'சுகர்ம சனி நல்ல செயல்கள், தர்மம் மற்றும் நீதிக்கு உகந்த நாமயோகம். இந்த நாளில் தர்ம செயல்களில் ஈடுபடுவது மிகுந்த புண்ணியத்தை தரும்.',
      keyBenefits: [
        'புண்ணிய சேர்க்கை',
        'தர்ம வாழ்க்கை',
        'நீதி நிலைப்பு',
        'கர்ம சுத்திகரிப்பு'
      ],
      favorableActivities: [
        'Charitable activities',
        'Religious ceremonies',
        'Justice-related work',
        'Helping elderly',
        'Community service'
      ],
      unfavorableActivities: [
        'Dishonest activities',
        'Cheating others',
        'Selfish behavior',
        'Ignoring needy'
      ],
      pariharam: {
        dailyPractices: [
          'Help elderly and poor',
          'Visit temples and ashrams',
          'Practice truthfulness',
          'Support justice causes'
        ],
        offerings: [
          'Black sesame and oil',
          'Iron tools to temples',
          'Blankets to poor',
          'Food to hungry people'
        ],
        gems: {
          primary: 'Blue Sapphire',
          alternative: 'Lapis Lazuli',
          benefits: 'Promotes dharmic living and good karma'
        },
        mantras: [
          {
            name: 'Dharma Mantra',
            text: 'ॐ धर्माय नमः',
            count: '108 times'
          },
          {
            name: 'Good Karma Mantra',
            text: 'ॐ सुकर्मणे नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Dharma Commitment',
          description: 'Commit to righteous living',
          details: 'Promise to follow dharmic principles'
        },
        {
          title: 'Service Offering',
          description: 'Offer service to community',
          details: 'Find ways to help society'
        },
        {
          title: 'Justice Support',
          description: 'Support justice and truth',
          details: 'Stand up for what is right'
        },
        {
          title: 'Karma Purification',
          description: 'Purify past negative karma',
          details: 'Do good deeds to balance karma'
        },
        {
          title: 'Merit Dedication',
          description: 'Dedicate merit to all beings',
          details: 'Share good karma with everyone'
        }
      ]
    }
    // Note: This is a sample of 7 Namayogam. In a complete implementation, 
    // you would include all 27 combinations (each nakshatra with each weekday)
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.loadData();
    this.filteredNamayogam = [...this.namayogamList];
  }

  loadData() {
    const completed = localStorage.getItem('completedNamayogam');
    const favorites = localStorage.getItem('favoriteNamayogam');
    
    if (completed) {
      this.completedNamayogam = JSON.parse(completed);
    }
    
    if (favorites) {
      this.favoriteNamayogam = JSON.parse(favorites);
    }
  }

  filterNamayogam(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchTerm = searchTerm;
    
    if (!searchTerm) {
      this.filteredNamayogam = [...this.namayogamList];
    } else {
      this.filteredNamayogam = this.namayogamList.filter(namayogam =>
        namayogam.name.toLowerCase().includes(searchTerm) ||
        namayogam.englishName.toLowerCase().includes(searchTerm) ||
        namayogam.nakshatra.toLowerCase().includes(searchTerm) ||
        namayogam.weekday.toLowerCase().includes(searchTerm) ||
        namayogam.keyBenefits.some(benefit => benefit.toLowerCase().includes(searchTerm))
      );
    }
  }

  openNamayogamDetail(namayogam: Namayogam) {
    this.selectedNamayogam = namayogam;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedNamayogam = null;
  }

  toggleFavorite(namayogamId: string, event: Event) {
    event.stopPropagation();
    
    const index = this.favoriteNamayogam.indexOf(namayogamId);
    if (index > -1) {
      this.favoriteNamayogam.splice(index, 1);
    } else {
      this.favoriteNamayogam.push(namayogamId);
    }
    
    localStorage.setItem('favoriteNamayogam', JSON.stringify(this.favoriteNamayogam));
  }

  isFavorite(namayogamId: string): boolean {
    return this.favoriteNamayogam.includes(namayogamId);
  }

  markAsCompleted(namayogamId: string) {
    if (!this.completedNamayogam.includes(namayogamId)) {
      this.completedNamayogam.push(namayogamId);
      localStorage.setItem('completedNamayogam', JSON.stringify(this.completedNamayogam));
    }
    this.closeModal();
  }

  isNamayogamCompleted(namayogamId: string): boolean {
    return this.completedNamayogam.includes(namayogamId);
  }

  getProgressPercentage(): number {
    return this.completedNamayogam.length / this.namayogamList.length;
  }

  shareContent() {
    if (navigator.share) {
      navigator.share({
        title: 'நாமயோகம் Course - 27 Sacred Star-Day Combinations',
        text: 'Learn about the 27 sacred Namayogam with pariharam and activation processes',
        url: window.location.href
      });
    }
  }
}
