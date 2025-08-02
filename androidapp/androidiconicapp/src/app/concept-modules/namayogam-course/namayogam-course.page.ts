import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface Namayogam {
  id: string;
  name: string;
  englishName: string;
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
  yogi: {
    name: string;
    englishName: string;
    direction: string;
    benefits: string[];
    significance: string;
  };
  avayogi: {
    name: string;
    englishName: string;
    direction: string;
    effects: string[];
    precautions: string;
  };
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

  // Pure Yoga names with Yogi and Avayogi details
  namayogamList: Namayogam[] = [
    {
      id: 'vishkumba',
      name: 'விஷ்கும்ப',
      englishName: 'Vishkumba',
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
      yogi: {
        name: 'விஷ்கும்ப யோகி',
        englishName: 'Vishkumba Yogi',
        direction: 'East',
        benefits: [
          'வெற்றி சக்தி',
          'தலைமைத்துவ குணம்',
          'முன்னேற்றம்',
          'சாதனை உணர்வு'
        ],
        significance: 'விஷ்கும்ப யோகியின் ஆசி பெற்றால் அனைத்து செயல்களிலும் வெற்றி கிடைக்கும்'
      },
      avayogi: {
        name: 'விஷ்கும்ப அவயோகி',
        englishName: 'Vishkumba Avayogi',
        direction: 'West',
        effects: [
          'வெற்றியில் தாமதம்',
          'தலைமைத்துவ பிரச்சினைகள்',
          'முன்னேற்றத்தில் தடை',
          'சாதனையில் இடையூறு'
        ],
        precautions: 'மேலை திசையை தவிர்த்து முக்கியமான செயல்களை தொடங்கவும்'
      },
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
      yogi: {
        name: 'பிரீதி யோகி',
        englishName: 'Priti Yogi',
        direction: 'North',
        benefits: [
          'அன்பு பெருக்கம்',
          'மகிழ்ச்சி அதிகரிப்பு',
          'உறவு நல்லிணக்கம்',
          'மன அமைதி'
        ],
        significance: 'பிரீதி யோகியின் ஆசி பெற்றால் வாழ்க்கையில் அன்பும் மகிழ்ச்சியும் நிரம்பும்'
      },
      avayogi: {
        name: 'பிரீதி அவயோகி',
        englishName: 'Priti Avayogi',
        direction: 'South',
        effects: [
          'அன்பில் பிரச்சினை',
          'உறவுகளில் தடை',
          'மன அசமாதானம்',
          'குடும்ப பிரச்சினை'
        ],
        precautions: 'தென் திசையை தவிர்த்து காதல் மற்றும் குடும்ப விஷயங்களை கையாளவும்'
      },
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
      yogi: {
        name: 'ஆயுஷ்மான் யோகி',
        englishName: 'Ayushmana Yogi',
        direction: 'Northeast',
        benefits: [
          'நீண்ட வாழ்க்கை',
          'நல்ல ஆரோக்கியம்',
          'வலிமை அதிகரிப்பு',
          'நோய் நிவாரணம்'
        ],
        significance: 'ஆயுஷ்மான் யோகியின் ஆசி பெற்றால் நீண்ட ஆரோக்கியமான வாழ்க்கை கிடைக்கும்'
      },
      avayogi: {
        name: 'ஆயுஷ்மான் அவயோகி',
        englishName: 'Ayushmana Avayogi',
        direction: 'Southwest',
        effects: [
          'ஆரோக்கிய பிரச்சினை',
          'ஆயுள் குறைவு',
          'வலிமை இழப்பு',
          'நோய் தொல்லை'
        ],
        precautions: 'தென்மேற்கு திசையை தவிர்த்து சுகாதார விஷயங்களை கையாளவும்'
      },
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
    },
    {
      id: 'saubhagya',
      name: 'சௌபாக்யம்',
      englishName: 'Saubhagya',
      effect: 'செல்வம்',
      effectEnglish: 'Fortune & Prosperity',
      rulingPlanet: 'Mercury',
      element: 'Air',
      quality: 'Rajasic',
      bestTime: 'Afternoon 12-3 PM',
      description: 'சௌபாக்யம் யோகம் செல்வம், அதிர்ஷ்டம் மற்றும் வளமைக்கு உகந்த யோகம். இந்த யோகத்தில் தொடங்கும் வணிக நடவடிக்கைகள் பெரும் லாபம் தரும்.',
      characteristics: [
        'செல்வ செழிப்பு',
        'அதிர்ஷ்டம்',
        'வணிக வெற்றி',
        'பண வரவு',
        'வளமான வாழ்க்கை',
        'சொத்து சேர்க்கை'
      ],
      keyBenefits: [
        'செல்வ வளர்ச்சி',
        'அதிர்ஷ்டம்',
        'வணிக லாபம்',
        'பண வரவு'
      ],
      favorableActivities: [
        'Business ventures',
        'Investment decisions',
        'Property purchase',
        'Financial planning',
        'Wealth creation'
      ],
      unfavorableActivities: [
        'Overspending',
        'Risky investments',
        'Lending money',
        'Gambling'
      ],
      yogi: {
        name: 'சௌபாக்ய யோகி',
        englishName: 'Saubhagya Yogi',
        direction: 'Southeast',
        benefits: [
          'செல்வ வளர்ச்சி',
          'வணிக வெற்றி',
          'பண வரவு அதிகரிப்பு',
          'அதிர்ஷ்டம் சேர்ப்பு'
        ],
        significance: 'சௌபாக்ய யோகியின் ஆசி பெற்றால் வாழ்க்கையில் செல்வமும் வளமும் பெருகும்'
      },
      avayogi: {
        name: 'சௌபாக்ய அவயோகி',
        englishName: 'Saubhagya Avayogi',
        direction: 'Northwest',
        effects: [
          'செல்வ இழப்பு',
          'வணிக நஷ்டம்',
          'பண பிரச்சினை',
          'அதிர்ஷ்டமின்மை'
        ],
        precautions: 'வடமேற்கு திசையை தவிர்த்து பணம் சம்பந்தமான விஷயங்களை கையாளவும்'
      },
      lifeImpact: {
        career: 'Great success in business and finance',
        health: 'Good health through proper nutrition',
        relationships: 'Prosperity brings family harmony',
        spirituality: 'Material wealth supports spiritual growth'
      },
      pariharam: {
        dailyPractices: [
          'Worship Lakshmi daily',
          'Practice gratitude for wealth',
          'Share prosperity with others',
          'Maintain honest business'
        ],
        offerings: [
          'Gold coins to Lakshmi',
          'Yellow rice and turmeric',
          'Donations to poor',
          'Business offerings'
        ],
        gems: {
          primary: 'Citrine',
          alternative: 'Yellow Sapphire',
          benefits: 'Attracts wealth and business success'
        },
        mantras: [
          {
            name: 'Lakshmi Mantra',
            text: 'ॐ श्रीं लक्ष्म्यै नमः',
            count: '108 times'
          },
          {
            name: 'Wealth Mantra',
            text: 'ॐ सौभाग्याय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Wealth Mindset',
          description: 'Develop abundance thinking',
          details: 'Visualize prosperity and success'
        },
        {
          title: 'Business Planning',
          description: 'Plan your financial growth',
          details: 'Create strategic wealth building plans'
        },
        {
          title: 'Gratitude Practice',
          description: 'Be thankful for current blessings',
          details: 'Express gratitude for existing wealth'
        }
      ]
    },
    {
      id: 'shobhana',
      name: 'சோபன',
      englishName: 'Shobhana',
      effect: 'அழகு',
      effectEnglish: 'Beauty & Grace',
      rulingPlanet: 'Venus',
      element: 'Water',
      quality: 'Satvic',
      bestTime: 'Evening 3-6 PM',
      description: 'சோபன யோகம் அழகு, அலங்காரம் மற்றும் கலைத்திறனுக்கு உகந்த யோகம். இந்த யோகத்தில் அழகு மற்றும் கலை சார்ந்த செயல்கள் சிறப்பாக அமையும்.',
      characteristics: [
        'அழகு அதிகரிப்பு',
        'கலை ஆர்வம்',
        'அலங்கார விருப்பம்',
        'இனிமையான குணம்',
        'ஈர்ப்பு சக்தி',
        'அழகான தோற்றம்'
      ],
      keyBenefits: [
        'அழகு மேம்பாடு',
        'கலைத்திறன்',
        'ஈர்ப்பு சக்தி',
        'அலங்கார ஆர்வம்'
      ],
      favorableActivities: [
        'Beauty treatments',
        'Artistic creation',
        'Fashion design',
        'Interior decoration',
        'Cultural events'
      ],
      unfavorableActivities: [
        'Neglecting appearance',
        'Ugly behavior',
        'Destroying beauty',
        'Harsh activities'
      ],
      yogi: {
        name: 'சோபன யோகி',
        englishName: 'Shobhana Yogi',
        direction: 'North',
        benefits: [
          'அழகு அதிகரிப்பு',
          'கலைத்திறன் மேம்பாடு',
          'ஈர்ப்பு சக்தி வளர்ச்சி',
          'அலங்கார விருப்பம்'
        ],
        significance: 'சோபன யோகியின் ஆசி பெற்றால் உள்ளும் வெளியும் அழகு பெறலாம்'
      },
      avayogi: {
        name: 'சோபன அவயோகி',
        englishName: 'Shobhana Avayogi',
        direction: 'South',
        effects: [
          'அழகு குறைவு',
          'கலை திறமையின்மை',
          'ஈர்ப்பின்மை',
          'அலங்கார அக்கறையின்மை'
        ],
        precautions: 'தென் திசையை தவிர்த்து அழகு மற்றும் கலை செயல்களை மேற்கொள்ளவும்'
      },
      lifeImpact: {
        career: 'Success in beauty, fashion and arts',
        health: 'Glowing skin and attractive appearance',
        relationships: 'Charming and lovable personality',
        spirituality: 'Finding divine beauty in everything'
      },
      pariharam: {
        dailyPractices: [
          'Maintain personal beauty',
          'Create beautiful things',
          'Appreciate natural beauty',
          'Practice graceful behavior'
        ],
        offerings: [
          'Fresh flowers to Venus',
          'Beautiful ornaments',
          'Artistic creations',
          'Perfumes and cosmetics'
        ],
        gems: {
          primary: 'Rose Quartz',
          alternative: 'Pink Sapphire',
          benefits: 'Enhances beauty and artistic talents'
        },
        mantras: [
          {
            name: 'Shukra Mantra',
            text: 'ॐ शुक्राय नमः',
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
          title: 'Beauty Recognition',
          description: 'Recognize inner and outer beauty',
          details: 'Appreciate beauty in yourself and others'
        },
        {
          title: 'Artistic Expression',
          description: 'Express your creativity',
          details: 'Create something beautiful daily'
        },
        {
          title: 'Grace Cultivation',
          description: 'Develop graceful behavior',
          details: 'Practice elegant and refined conduct'
        }
      ]
    },
    {
      id: 'atiganda',
      name: 'அதிகண்ட',
      englishName: 'Atiganda',
      effect: 'தடை நீக்கம்',
      effectEnglish: 'Obstacle Removal',
      rulingPlanet: 'Mars',
      element: 'Fire',
      quality: 'Rajasic',
      bestTime: 'Morning 9-12 PM',
      description: 'அதிகண்ட யோகம் எல்லா தடைகளையும் நீக்கி வெற்றி பெற உதவும் யோகம். இந்த யோகத்தில் சிக்கலான விஷயங்களை தீர்க்க முடியும்.',
      characteristics: [
        'தடை நீக்கம்',
        'சிக்கல் தீர்வு',
        'வெற்றிக்கு வழி',
        'எதிர்ப்பை வெல்லுதல்',
        'முன்னேற்ற பாதை',
        'தடையற்ற வாழ்க்கை'
      ],
      keyBenefits: [
        'தடை நீக்கம்',
        'சிக்கல் தீர்வு',
        'வெற்றி பாதை',
        'முன்னேற்றம்'
      ],
      favorableActivities: [
        'Removing obstacles',
        'Problem solving',
        'Legal matters',
        'Conflict resolution',
        'Breakthrough activities'
      ],
      unfavorableActivities: [
        'Creating new problems',
        'Avoiding challenges',
        'Procrastination',
        'Giving up easily'
      ],
      yogi: {
        name: 'அதிகண்ட யோகி',
        englishName: 'Atiganda Yogi',
        direction: 'East',
        benefits: [
          'தடை நீக்கம்',
          'சிக்கல் தீர்வு',
          'வெற்றி உறுதி',
          'முன்னேற்ற வழி'
        ],
        significance: 'அதிகண்ட யோகியின் ஆசி பெற்றால் எல்லா தடைகளும் நீங்கும்'
      },
      avayogi: {
        name: 'அதிகண்ட அவயோகி',
        englishName: 'Atiganda Avayogi',
        direction: 'West',
        effects: [
          'தடைகள் அதிகரிப்பு',
          'சிக்கல் பெருக்கம்',
          'வெற்றியில் தாமதம்',
          'முன்னேற்றத்தில் இடையூறு'
        ],
        precautions: 'மேலை திசையை தவிர்த்து முக்கிய தீர்வுகளை மேற்கொள்ளவும்'
      },
      lifeImpact: {
        career: 'Breakthrough in stalled projects',
        health: 'Recovery from chronic issues',
        relationships: 'Resolution of conflicts',
        spirituality: 'Removal of spiritual obstacles'
      },
      pariharam: {
        dailyPractices: [
          'Face challenges bravely',
          'Seek solutions actively',
          'Help others overcome obstacles',
          'Practice persistence'
        ],
        offerings: [
          'Red flowers to Mars',
          'Iron objects to temple',
          'Help to struggling people',
          'Tools for problem solving'
        ],
        gems: {
          primary: 'Red Coral',
          alternative: 'Carnelian',
          benefits: 'Gives courage to overcome all obstacles'
        },
        mantras: [
          {
            name: 'Mangal Mantra',
            text: 'ॐ मंगलाय नमः',
            count: '108 times'
          },
          {
            name: 'Obstacle Removal Mantra',
            text: 'ॐ अतिगण्डाय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Problem Identification',
          description: 'Identify your main obstacles',
          details: 'List all challenges blocking your progress'
        },
        {
          title: 'Solution Strategy',
          description: 'Develop removal strategies',
          details: 'Plan systematic approach to overcome blocks'
        },
        {
          title: 'Action Execution',
          description: 'Take decisive action',
          details: 'Implement solutions with determination'
        }
      ]
    },
    {
      id: 'sukarma',
      name: 'சுகர்மா',
      englishName: 'Sukarma',
      effect: 'நல்ல செயல்',
      effectEnglish: 'Good Deeds',
      rulingPlanet: 'Jupiter',
      element: 'Ether',
      quality: 'Satvic',
      bestTime: 'Morning 6-9 AM',
      description: 'சுகர்மா யோகம் நல்ல செயல்கள், தர்ம காரியங்கள் மற்றும் புண்ணிய செயல்களுக்கு மிகவும் உகந்த யோகம். இந்த யோகத்தில் செய்யும் நல்ல செயல்கள் பெரும் பலன் தரும்.',
      characteristics: [
        'நல்ல செயல் ஆர்வம்',
        'தர்ம நெறி',
        'புண்ணிய காரியம்',
        'சேவை மனப்பான்மை',
        'நீதி உணர்வு',
        'நல்லொழுக்கம்'
      ],
      keyBenefits: [
        'புண்ணிய பேறு',
        'தர்ம வளர்ச்சி',
        'நல்ல கர்மா',
        'மன திருப்தி'
      ],
      favorableActivities: [
        'Charitable work',
        'Religious ceremonies',
        'Helping others',
        'Dharmic activities',
        'Social service'
      ],
      unfavorableActivities: [
        'Selfish actions',
        'Harmful deeds',
        'Unethical behavior',
        'Ignoring others needs'
      ],
      yogi: {
        name: 'சுகர்மா யோகி',
        englishName: 'Sukarma Yogi',
        direction: 'Northeast',
        benefits: [
          'புண்ணிய பேறு',
          'தர்ம வளர்ச்சி',
          'நல்ல செயல் ஊக்கம்',
          'மன அமைதி'
        ],
        significance: 'சுகர்மா யோகியின் ஆசி பெற்றால் நல்ல செயல்களில் ஈடுபாடு பெருகும்'
      },
      avayogi: {
        name: 'சுகர்மா அவயோகி',
        englishName: 'Sukarma Avayogi',
        direction: 'Southwest',
        effects: [
          'நல்ல செயலில் தடை',
          'தர்ம குழப்பம்',
          'பாவ கர்மா',
          'மன அசமாதானம்'
        ],
        precautions: 'தென்மேற்கு திசையை தவிர்த்து தர்ம காரியங்களை மேற்கொள்ளவும்'
      },
      lifeImpact: {
        career: 'Success through ethical practices',
        health: 'Good health through good deeds',
        relationships: 'Loving bonds through service',
        spirituality: 'Rapid spiritual advancement'
      },
      pariharam: {
        dailyPractices: [
          'Do one good deed daily',
          'Practice compassion',
          'Help those in need',
          'Follow dharmic principles'
        ],
        offerings: [
          'Food to hungry people',
          'Books to students',
          'Medicine to sick',
          'Donations to charities'
        ],
        gems: {
          primary: 'Yellow Sapphire',
          alternative: 'Topaz',
          benefits: 'Inspires righteous actions and good karma'
        },
        mantras: [
          {
            name: 'Guru Mantra',
            text: 'ॐ गुरवे नमः',
            count: '108 times'
          },
          {
            name: 'Good Deed Mantra',
            text: 'ॐ सुकर्माय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Dharma Understanding',
          description: 'Understand righteous path',
          details: 'Study ethical principles and values'
        },
        {
          title: 'Service Planning',
          description: 'Plan your service activities',
          details: 'Identify ways to help others'
        },
        {
          title: 'Action Implementation',
          description: 'Put good intentions into action',
          details: 'Start doing good deeds regularly'
        }
      ]
    },
    {
      id: 'dhriti',
      name: 'த்ருதி',
      englishName: 'Dhriti',
      effect: 'உறுதி',
      effectEnglish: 'Determination',
      rulingPlanet: 'Saturn',
      element: 'Earth',
      quality: 'Tamasic',
      bestTime: 'Evening 6-9 PM',
      description: 'த்ருதி யோகம் உறுதி, நிலைத்தன்மை மற்றும் பொறுமைக்கு உகந்த யோகம். இந்த யோகத்தில் தொடங்கும் நீண்ட கால திட்டங்கள் வெற்றியடையும்.',
      characteristics: [
        'மன உறுதி',
        'நிலைத்தன்மை',
        'பொறுமை',
        'தீர்மானம்',
        'விடாமுயற்சி',
        'ஸ்திரத்தன்மை'
      ],
      keyBenefits: [
        'மன பலம்',
        'உறுதியான குணம்',
        'பொறுமை வளர்ச்சி',
        'நிலைத்த வெற்றி'
      ],
      favorableActivities: [
        'Long-term planning',
        'Building foundations',
        'Patience practices',
        'Steady progress',
        'Commitment activities'
      ],
      unfavorableActivities: [
        'Hasty decisions',
        'Impulsive actions',
        'Giving up easily',
        'Inconsistent behavior'
      ],
      yogi: {
        name: 'த்ருதி யோகி',
        englishName: 'Dhriti Yogi',
        direction: 'South',
        benefits: [
          'மன உறுதி',
          'நிலைத்தன்மை',
          'பொறுமை வளர்ச்சி',
          'தீர்மான சக்தி'
        ],
        significance: 'த்ருதி யோகியின் ஆசி பெற்றால் எதிலும் உறுதியுடன் நிற்க முடியும்'
      },
      avayogi: {
        name: 'த்ருதி அவயோகி',
        englishName: 'Dhriti Avayogi',
        direction: 'North',
        effects: [
          'மன அலைச்சல்',
          'நிலையற்ற தன்மை',
          'பொறுமையின்மை',
          'தீர்மானமின்மை'
        ],
        precautions: 'வட திசையை தவிர்த்து முக்கிய முடிவுகளை எடுக்கவும்'
      },
      lifeImpact: {
        career: 'Steady progress and lasting success',
        health: 'Strong immunity and endurance',
        relationships: 'Loyal and committed bonds',
        spirituality: 'Steady spiritual discipline'
      },
      pariharam: {
        dailyPractices: [
          'Practice meditation daily',
          'Build steady routines',
          'Exercise patience',
          'Keep commitments'
        ],
        offerings: [
          'Black sesame to Saturn',
          'Iron objects to temple',
          'Help to elderly people',
          'Support for long-term causes'
        ],
        gems: {
          primary: 'Blue Sapphire',
          alternative: 'Amethyst',
          benefits: 'Grants steady determination and patience'
        },
        mantras: [
          {
            name: 'Shani Mantra',
            text: 'ॐ शनैश्चराय नमः',
            count: '108 times'
          },
          {
            name: 'Determination Mantra',
            text: 'ॐ धृत्यै नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Goal Setting',
          description: 'Set clear long-term goals',
          details: 'Define what you want to achieve steadily'
        },
        {
          title: 'Patience Building',
          description: 'Develop patience practices',
          details: 'Learn to wait and persist'
        },
        {
          title: 'Commitment Making',
          description: 'Make firm commitments',
          details: 'Decide to stick with your path'
        }
      ]
    },
    {
      id: 'shoola',
      name: 'சூல',
      englishName: 'Shoola',
      effect: 'வலி நீக்கம்',
      effectEnglish: 'Pain Relief',
      rulingPlanet: 'Mars',
      element: 'Fire',
      quality: 'Tamasic',
      bestTime: 'Afternoon 12-3 PM',
      description: 'சூல யோகம் வலி, துக்கம் மற்றும் கஷ்டங்களை நீக்கும் யோகம். இந்த யோகத்தில் வலி நிவாரண சிகிச்சைகள் மற்றும் துக்க நிவாரணம் சிறப்பாக நடக்கும்.',
      characteristics: [
        'வலி நீக்கம்',
        'துக்க நிவாரணம்',
        'கஷ்ட தீர்வு',
        'நோய் குணம்',
        'மன வேதனை தீர்வு',
        'சிகிச்சை பலன்'
      ],
      keyBenefits: [
        'வலி நிவாரணம்',
        'துக்க தீர்வு',
        'நோய் குணம்',
        'மன அமைதி'
      ],
      favorableActivities: [
        'Medical treatments',
        'Pain relief therapies',
        'Healing ceremonies',
        'Surgery',
        'Counseling'
      ],
      unfavorableActivities: [
        'Causing pain to others',
        'Ignoring health issues',
        'Creating suffering',
        'Harsh behavior'
      ],
      yogi: {
        name: 'சூல யோகி',
        englishName: 'Shoola Yogi',
        direction: 'Southeast',
        benefits: [
          'வலி நிவாரணம்',
          'துக்க தீர்வு',
          'சிகிச்சை வெற்றி',
          'மன அமைதி'
        ],
        significance: 'சூல யோகியின் ஆசி பெற்றால் எல்லா வலிகளும் நீங்கும்'
      },
      avayogi: {
        name: 'சூல அவயோகி',
        englishName: 'Shoola Avayogi',
        direction: 'Northwest',
        effects: [
          'வலி அதிகரிப்பு',
          'துக்கம் பெருக்கம்',
          'சிகிச்சையில் தடை',
          'மன வேதனை'
        ],
        precautions: 'வடமேற்கு திசையை தவிர்த்து சிகிச்சை விஷயங்களை கையாளவும்'
      },
      lifeImpact: {
        career: 'Success in healing professions',
        health: 'Relief from chronic pain and illness',
        relationships: 'Healing of emotional wounds',
        spirituality: 'Liberation from spiritual suffering'
      },
      pariharam: {
        dailyPractices: [
          'Practice healing meditation',
          'Help sick people',
          'Avoid causing pain to others',
          'Use natural remedies'
        ],
        offerings: [
          'Medicinal herbs to temple',
          'Help to hospitals',
          'Food to suffering people',
          'Donations for medical care'
        ],
        gems: {
          primary: 'Red Coral',
          alternative: 'Garnet',
          benefits: 'Provides relief from pain and suffering'
        },
        mantras: [
          {
            name: 'Dhanvantari Mantra',
            text: 'ॐ धन्वन्तरये नमः',
            count: '108 times'
          },
          {
            name: 'Pain Relief Mantra',
            text: 'ॐ शूलाय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Pain Assessment',
          description: 'Identify sources of pain',
          details: 'Recognize physical and emotional pain'
        },
        {
          title: 'Healing Invocation',
          description: 'Call upon healing energies',
          details: 'Connect with divine healing power'
        },
        {
          title: 'Relief Application',
          description: 'Apply healing methods',
          details: 'Use appropriate treatments and therapies'
        }
      ]
    },
    {
      id: 'ganda',
      name: 'கண்ட',
      englishName: 'Ganda',
      effect: 'சிக்கல் தீர்வு',
      effectEnglish: 'Problem Solving',
      rulingPlanet: 'Saturn',
      element: 'Air',
      quality: 'Tamasic',
      bestTime: 'Evening 3-6 PM',
      description: 'கண்ட யோகம் சிக்கல்கள், பிரச்சினைகள் மற்றும் குழப்பங்களை தீர்க்கும் யோகம். இந்த யோகத்தில் சிக்கலான விஷயங்களுக்கு தீர்வு கிடைக்கும்.',
      characteristics: [
        'சிக்கல் தீர்வு',
        'பிரச்சினை நீக்கம்',
        'குழப்ப தீர்வு',
        'மன தெளிவு',
        'விவாத தீர்வு',
        'நீதி கிடைத்தல்'
      ],
      keyBenefits: [
        'பிரச்சினை தீர்வு',
        'மன தெளிவு',
        'நீதி கிடைத்தல்',
        'சிக்கல் நீக்கம்'
      ],
      favorableActivities: [
        'Legal consultations',
        'Problem solving',
        'Mediation',
        'Counseling',
        'Dispute resolution'
      ],
      unfavorableActivities: [
        'Creating new problems',
        'Avoiding issues',
        'Complicating matters',
        'Unfair behavior'
      ],
      yogi: {
        name: 'கண்ட யோகி',
        englishName: 'Ganda Yogi',
        direction: 'West',
        benefits: [
          'சிக்கல் தீர்வு',
          'பிரச்சினை நீக்கம்',
          'மன தெளிவு',
          'நீதி கிடைத்தல்'
        ],
        significance: 'கண்ட யோகியின் ஆசி பெற்றால் எல்லா சிக்கல்களும் தீரும்'
      },
      avayogi: {
        name: 'கண்ட அவயோகி',
        englishName: 'Ganda Avayogi',
        direction: 'East',
        effects: [
          'சிக்கல் பெருக்கம்',
          'பிரச்சினை அதிகரிப்பு',
          'மன குழப்பம்',
          'நீதியின்மை'
        ],
        precautions: 'கிழக்கு திசையை தவிர்த்து சிக்கல் தீர்வு முயற்சிகளை மேற்கொள்ளவும்'
      },
      lifeImpact: {
        career: 'Resolution of workplace conflicts',
        health: 'Solving complex health issues',
        relationships: 'Clearing misunderstandings',
        spirituality: 'Solving spiritual confusions'
      },
      pariharam: {
        dailyPractices: [
          'Practice clear thinking',
          'Help solve others problems',
          'Avoid creating complications',
          'Seek fair solutions'
        ],
        offerings: [
          'Black sesame to Saturn',
          'Help to courts and lawyers',
          'Support for justice causes',
          'Donations for problem solving'
        ],
        gems: {
          primary: 'Black Onyx',
          alternative: 'Smoky Quartz',
          benefits: 'Brings clarity and solutions to problems'
        },
        mantras: [
          {
            name: 'Shani Mantra',
            text: 'ॐ शनैश्चराय नमः',
            count: '108 times'
          },
          {
            name: 'Problem Solving Mantra',
            text: 'ॐ गण्डाय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Problem Identification',  
          description: 'Clearly identify the problem',
          details: 'Define the exact nature of difficulties'
        },
        {
          title: 'Solution Analysis',
          description: 'Analyze possible solutions',
          details: 'Consider all available options'
        },
        {
          title: 'Resolution Implementation',
          description: 'Implement the best solution',
          details: 'Take systematic action to resolve'
        }
      ]
    }
    // Note: Pure yoga names with Yogi and Avayogi details for comprehensive understanding
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

  filterNamayogam(event?: any) {
    if (event) {
      this.searchTerm = event.detail.value;
    }
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

  toggleFavorite(namayogamId: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
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

  isNamayogamCompleted(namayogamId: string): boolean {
    return this.completedNamayogam.includes(namayogamId);
  }

  isFavorite(namayogamId: string): boolean {
    return this.favoriteNamayogam.includes(namayogamId);
  }

  getCompletionPercentage(): number {
    return Math.round((this.completedNamayogam.length / this.namayogamList.length) * 100);
  }

  getProgressPercentage(): number {
    return this.getCompletionPercentage() / 100;
  }

  shareContent() {
    // Implementation for sharing content
    if (navigator.share) {
      navigator.share({
        title: 'நாமயோகம் Course - LDML Online Astro',
        text: 'Learn about the 27 sacred Namayogam combinations for divine timing',
        url: window.location.href
      });
    }
  }

  markAsCompleted(namayogamId: string) {
    this.toggleCompleted(namayogamId);
    // Optionally close modal or show success message
  }
}
