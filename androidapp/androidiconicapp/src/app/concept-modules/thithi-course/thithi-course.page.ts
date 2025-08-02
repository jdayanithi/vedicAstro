import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface Thithi {
  id: string;
  name: string;
  englishName: string;
  deity: string;
  element: string;
  color: string;
  moonIcon: string;
  lunarPhase: string;
  energyLevel: string;
  description: string;
  bestActivities: string[];
  keyBenefits: string[];
  prohibitedActivities: string[];
  pariharam: {
    dailyPractices: string[];
    offerings: string[];
    fasting: {
      type: string;
      duration: string;
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
  selector: 'app-thithi-course',
  templateUrl: './thithi-course.page.html',
  styleUrls: ['./thithi-course.page.scss'],
})
export class ThithiCoursePage implements OnInit {
  searchTerm: string = '';
  isModalOpen: boolean = false;
  selectedThithi: Thithi | null = null;
  filteredThithi: Thithi[] = [];
  completedThithi: string[] = [];
  favoriteThithi: string[] = [];

  thithiList: Thithi[] = [
    {
      id: 'pratipadha',
      name: 'பிரதிபதை',
      englishName: 'Pratipadha',
      deity: 'Brahma',
      element: 'Fire',
      color: 'Red',
      moonIcon: 'moon-outline',
      lunarPhase: 'New Moon + 1',
      energyLevel: 'Beginning Energy',
      description: 'பிரதிபதை புதிய தொடக்கங்களுக்கு மிகவும் உகந்த திதி. இந்த நாளில் தொடங்கப்படும் செயல்கள் வெற்றிகரமாக நிறைவேறும்.',
      bestActivities: ['New projects', 'Learning', 'Worship', 'Planning'],
      keyBenefits: [
        'புதிய தொடக்கங்கள்',
        'படைப்பு சக்தி',
        'வெற்றி'
      ],
      prohibitedActivities: [
        'Ending projects',
        'Destructive activities',
        'Arguments'
      ],
      pariharam: {
        dailyPractices: [
          'Pray to Lord Brahma',
          'Light ghee lamp',
          'Read sacred texts',
          'Meditate on new beginnings'
        ],
        offerings: [
          'Red flowers to Brahma',
          'Sesame seeds and jaggery',
          'New clothes donation',
          'Feed hungry people'
        ],
        fasting: {
          type: 'Partial fast',
          duration: 'Until sunset',
          benefits: 'Purifies mind and increases spiritual energy'
        },
        mantras: [
          {
            name: 'Brahma Mantra',
            text: 'ॐ ब्रह्मणे नमः',
            count: '108 times'
          },
          {
            name: 'New Beginning Mantra',
            text: 'ॐ श्री गणेश ब्रह्मणे नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Morning Purification',
          description: 'Take bath before sunrise',
          details: 'Use turmeric and sandalwood'
        },
        {
          title: 'Brahma Worship',
          description: 'Set up altar for Lord Brahma',
          details: 'Use red flowers and ghee lamp'
        },
        {
          title: 'Intention Setting',
          description: 'Clearly state your new goals',
          details: 'Write them down and offer to deity'
        },
        {
          title: 'Energy Activation',
          description: 'Chant mantras with devotion',
          details: 'Face east direction while chanting'
        },
        {
          title: 'Blessing Seeking',
          description: 'Pray for divine guidance',
          details: 'Ask for strength to achieve goals'
        }
      ]
    },
    {
      id: 'dvitiya',
      name: 'துவிதீயை',
      englishName: 'Dvitiya',
      deity: 'Vidya Devi',
      element: 'Earth',
      color: 'White',
      moonIcon: 'moon',
      lunarPhase: 'Waxing Crescent',
      energyLevel: 'Learning Energy',
      description: 'துவிதீயை கல்வி மற்றும் ஞான வளர்ச்சிக்கு உகந்த திதி. இந்த நாளில் கற்கும் விஷயங்கள் நன்றாக நினைவில் நிற்கும்.',
      bestActivities: ['Education', 'Reading', 'Teaching', 'Research'],
      keyBenefits: [
        'கல்வி முன்னேற்றம்',
        'ஞான வளர்ச்சி',
        'நினைவாற்றல்'
      ],
      prohibitedActivities: [
        'Gambling',
        'Wasteful activities',
        'Ignorant behavior'
      ],
      pariharam: {
        dailyPractices: [
          'Study sacred texts',
          'Practice meditation',
          'Help students',
          'Respect teachers'
        ],
        offerings: [
          'White flowers to Saraswati',
          'Books and pens to students',
          'Yellow rice and turmeric',
          'Honey and milk'
        ],
        fasting: {
          type: 'Light food only',
          duration: 'All day',
          benefits: 'Enhances mental clarity and focus'
        },
        mantras: [
          {
            name: 'Saraswati Mantra',
            text: 'ॐ ऐं सरस्वत्यै नमः',
            count: '108 times'
          },
          {
            name: 'Knowledge Mantra',
            text: 'ॐ गं गणपतये विद्यावरदाय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Knowledge Invocation',
          description: 'Pray to Goddess Saraswati',
          details: 'Light white candles and incense'
        },
        {
          title: 'Study Setup',
          description: 'Organize learning materials',
          details: 'Create peaceful study environment'
        },
        {
          title: 'Learning Commitment',
          description: 'Commit to daily learning',
          details: 'Set specific learning goals'
        },
        {
          title: 'Wisdom Seeking',
          description: 'Meditate on gaining wisdom',
          details: 'Ask for guidance in understanding'
        },
        {
          title: 'Knowledge Sharing',
          description: 'Teach or help others learn',
          details: 'Share knowledge freely with others'
        }
      ]
    },
    {
      id: 'tritiya',
      name: 'திருதீயை',
      englishName: 'Tritiya',
      deity: 'Gauri',
      element: 'Fire',
      color: 'Green',
      moonIcon: 'moon',
      lunarPhase: 'Waxing Crescent',
      energyLevel: 'Growth Energy',
      description: 'திருதீயை வளர்ச்சி மற்றும் முன்னேற்றத்திற்கு உகந்த திதி. இந்த நாளில் செய்யப்படும் முயற்சிகள் நல்ல பலன் தரும்.',
      bestActivities: ['Business growth', 'Agriculture', 'Investments', 'Development'],
      keyBenefits: [
        'வணிக வளர்ச்சி',
        'செல்வ அதிகரிப்பு',
        'முன்னேற்றம்'
      ],
      prohibitedActivities: [
        'Cutting plants',
        'Destructive criticism',
        'Wasteful spending'
      ],
      pariharam: {
        dailyPractices: [
          'Water plants and trees',
          'Feed green vegetables to cows',
          'Practice gratitude',
          'Help in growth of others'
        ],
        offerings: [
          'Green leaves to Gauri',
          'Fresh fruits and vegetables',
          'Green cloth donation',
          'Plant new trees'
        ],
        fasting: {
          type: 'Green foods only',
          duration: 'Day time',
          benefits: 'Promotes physical and material growth'
        },
        mantras: [
          {
            name: 'Gauri Mantra',
            text: 'ॐ गौर्यै नमः',
            count: '108 times'
          },
          {
            name: 'Growth Mantra',
            text: 'ॐ श्रीं ह्रीं गौर्यै वृद्धि दाय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Growth Altar',
          description: 'Create altar with green items',
          details: 'Use green cloth, plants, and leaves'
        },
        {
          title: 'Prosperity Prayer',
          description: 'Pray for legitimate growth',
          details: 'Ask for growth that benefits all'
        },
        {
          title: 'Investment Blessing',
          description: 'Seek blessings for investments',
          details: 'Make ethical investment decisions'
        },
        {
          title: 'Nature Connection',
          description: 'Connect with nature',
          details: 'Spend time in gardens or with plants'
        },
        {
          title: 'Growth Commitment',
          description: 'Commit to sustainable growth',
          details: 'Promise to grow responsibly'
        }
      ]
    },
    {
      id: 'chaturthi',
      name: 'சதுர்த்தி',
      englishName: 'Chaturthi',
      deity: 'Ganesha',
      element: 'Earth',
      color: 'Yellow',
      moonIcon: 'moon',
      lunarPhase: 'Waxing Crescent',
      energyLevel: 'Obstacle Removal',
      description: 'சதுர்த்தி விக்னங்களை நீக்கி வெற்றியை தரும் திதி. இந்த நாளில் கணேசரை வணங்குவது மிகவும் சிறப்பு.',
      bestActivities: ['New ventures', 'Problem solving', 'Worship', 'Blessing seeking'],
      keyBenefits: [
        'விக்னம் நீக்கல்',
        'வெற்றி உறுதி',
        'புத்தி கூர்மை'
      ],
      prohibitedActivities: [
        'Looking at moon (on Ganesha Chaturthi)',
        'Creating obstacles for others',
        'Dishonest activities'
      ],
      pariharam: {
        dailyPractices: [
          'Worship Lord Ganesha',
          'Offer modak and laddu',
          'Remove obstacles for others',
          'Practice honesty'
        ],
        offerings: [
          'Yellow flowers to Ganesha',
          'Modak and sweet offerings',
          'Donation of food',
          'Help remove others obstacles'
        ],
        fasting: {
          type: 'Traditional Ganesha fast',
          duration: 'Full day',
          benefits: 'Removes all obstacles and brings wisdom'
        },
        mantras: [
          {
            name: 'Ganesha Mantra',
            text: 'ॐ गं गणपतये नमः',
            count: '108 times'
          },
          {
            name: 'Obstacle Removal Mantra',
            text: 'ॐ विघ्न नाशाय गणेशाय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Ganesha Invocation',
          description: 'Invoke Lord Ganesha',
          details: 'Set up Ganesha idol with flowers'
        },
        {
          title: 'Obstacle Identification',
          description: 'Identify current obstacles',
          details: 'List all challenges you face'
        },
        {
          title: 'Removal Prayer',
          description: 'Pray for obstacle removal',
          details: 'Ask Ganesha to clear your path'
        },
        {
          title: 'Wisdom Seeking',
          description: 'Seek divine wisdom',
          details: 'Ask for intelligence to solve problems'
        },
        {
          title: 'Success Blessing',
          description: 'Seek blessings for success',
          details: 'Promise to use success for good'
        }
      ]
    },
    {
      id: 'panchami',
      name: 'பஞ்சமி',
      englishName: 'Panchami',
      deity: 'Saraswati',
      element: 'Space',
      color: 'White/Yellow',
      moonIcon: 'moon',
      lunarPhase: 'Waxing Crescent',
      energyLevel: 'Creative Energy',
      description: 'பஞ்சமி கலை, இசை மற்றும் கல்விக்கான திதி. இந்த நாளில் படைப்பாற்றல் மற்றும் கலைத் திறன் அதிகரிக்கும்.',
      bestActivities: ['Arts', 'Music', 'Learning', 'Creative work'],
      keyBenefits: [
        'கலை வளர்ச்சி',
        'படைப்பாற்றல்',
        'அறிவு விளக்கம்'
      ],
      prohibitedActivities: [
        'Destroying books or instruments',
        'Disrespecting teachers',
        'Uncreative activities'
      ],
      pariharam: {
        dailyPractices: [
          'Play musical instruments',
          'Practice arts and crafts',
          'Read poetry or literature',
          'Respect all forms of knowledge'
        ],
        offerings: [
          'White and yellow flowers to Saraswati',
          'Books and musical instruments',
          'Sweet rice and milk',
          'Donation to educational institutions'
        ],
        fasting: {
          type: 'Saraswati fast',
          duration: 'Until evening',
          benefits: 'Enhances creativity and artistic abilities'
        },
        mantras: [
          {
            name: 'Saraswati Mantra',
            text: 'ॐ ऐं सरस्वत्यै नमः',
            count: '108 times'
          },
          {
            name: 'Creativity Mantra',
            text: 'ॐ वागीश्वर्यै विद्महे कामराजाय धीमहि',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Creative Altar',
          description: 'Set up altar with artistic items',
          details: 'Include books, instruments, art supplies'
        },
        {
          title: 'Inspiration Prayer',
          description: 'Pray for creative inspiration',
          details: 'Ask Saraswati for artistic guidance'
        },
        {
          title: 'Skill Practice',
          description: 'Practice your art or skill',
          details: 'Dedicate time to creative expression'
        },
        {
          title: 'Knowledge Honoring',
          description: 'Honor all forms of knowledge',
          details: 'Respect teachers and learning materials'
        },
        {
          title: 'Creative Sharing',
          description: 'Share your creative gifts',
          details: 'Teach or perform for others'
        }
      ]
    },
    {
      id: 'shashthi',
      name: 'ஷஷ்டி',
      englishName: 'Shashthi',
      deity: 'Kartikeya',
      element: 'Fire',
      color: 'Red/Orange',
      moonIcon: 'moon',
      lunarPhase: 'Waxing Gibbous',
      energyLevel: 'Victory Energy',
      description: 'ஷஷ்டி போர் மற்றும் வெற்றிக்கான திதி. இந்த நாளில் எதிரிகளை வெல்லும் சக்தி கிடைக்கும்.',
      bestActivities: ['Competition', 'Legal matters', 'Courage building', 'Protection'],
      keyBenefits: [
        'எதிரி ஜெயம்',
        'தைரியம்',
        'பாதுகாப்பு'
      ],
      prohibitedActivities: [
        'Cowardly behavior',
        'Avoiding challenges',
        'Harming innocent people'
      ],
      pariharam: {
        dailyPractices: [
          'Pray to Lord Kartikeya',
          'Practice martial arts or exercise',
          'Help those in need of protection',
          'Face challenges bravely'
        ],
        offerings: [
          'Red flowers to Kartikeya',
          'Offerings of weapons (toy/symbolic)',
          'Red cloth and vermillion',
          'Food to soldiers or police'
        ],
        fasting: {
          type: 'Kartikeya fast',
          duration: 'Day time',
          benefits: 'Increases courage and removes enemies'
        },
        mantras: [
          {
            name: 'Kartikeya Mantra',
            text: 'ॐ सरवणभवाय नमः',
            count: '108 times'
          },
          {
            name: 'Victory Mantra',
            text: 'ॐ शं शक्तये कार्तिकेयाय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Warrior Preparation',
          description: 'Prepare for challenges ahead',
          details: 'Strengthen body and mind'
        },
        {
          title: 'Courage Invocation',
          description: 'Invoke divine courage',
          details: 'Call upon Kartikeya for strength'
        },
        {
          title: 'Protection Seeking',
          description: 'Seek divine protection',
          details: 'Ask for shield against enemies'
        },
        {
          title: 'Victory Prayer',
          description: 'Pray for righteous victory',
          details: 'Ensure your cause is just'
        },
        {
          title: 'Strength Dedication',
          description: 'Dedicate strength to good',
          details: 'Use power to protect others'
        }
      ]
    },
    {
      id: 'saptami',
      name: 'சப்தமி',
      englishName: 'Saptami',
      deity: 'Surya',
      element: 'Fire',
      color: 'Golden',
      moonIcon: 'moon',
      lunarPhase: 'Waxing Gibbous',
      energyLevel: 'Solar Energy',
      description: 'சப்தமி சூர்ய சக்தி மற்றும் ஆரோக்கியத்திற்கான திதி. இந்த நாளில் உடல் மற்றும் மன வலிமை அதிகரிக்கும்.',
      bestActivities: ['Health improvement', 'Leadership', 'Solar worship', 'Energy building'],
      keyBenefits: [
        'ஆரோக்கிய மேம்பாடு',
        'சூர்ய சக்தி',
        'தலைமைத்துவம்'
      ],
      prohibitedActivities: [
        'Staying in darkness',
        'Lazy behavior',
        'Disrespecting father figures'
      ],
      pariharam: {
        dailyPractices: [
          'Surya namaskara at sunrise',
          'Offer water to Sun',
          'Eat healthy sattvic food',
          'Help improve others health'
        ],
        offerings: [
          'Red flowers and water to Sun',
          'Golden colored items',
          'Copper vessels to temple',
          'Medicine to needy patients'
        ],
        fasting: {
          type: 'Surya fast',
          duration: 'Sunrise to sunset',
          benefits: 'Improves health and increases life force'
        },
        mantras: [
          {
            name: 'Surya Mantra',
            text: 'ॐ सूर्याय नमः',
            count: '108 times'
          },
          {
            name: 'Health Mantra',
            text: 'ॐ आरोग्य दाय सूर्याय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Solar Connection',
          description: 'Connect with Sun energy',
          details: 'Face east and greet the Sun'
        },
        {
          title: 'Health Prayer',
          description: 'Pray for perfect health',
          details: 'Ask for vitality and strength'
        },
        {
          title: 'Energy Activation',
          description: 'Activate inner solar energy',
          details: 'Practice pranayama and yoga'
        },
        {
          title: 'Leadership Blessing',
          description: 'Seek leadership qualities',
          details: 'Ask for wisdom to lead others'
        },
        {
          title: 'Light Sharing',
          description: 'Share your light with others',
          details: 'Help illuminate others paths'
        }
      ]
    },
    {
      id: 'ashtami',
      name: 'அஷ்டமி',
      englishName: 'Ashtami',
      deity: 'Durga',
      element: 'Fire',
      color: 'Dark Red',
      moonIcon: 'moon',
      lunarPhase: 'Waxing Gibbous',
      energyLevel: 'Powerful Energy',
      description: 'அஷ்டமி தெய்வீக சக்தி மற்றும் பாதுகாப்புக்கான திதி. இந்த நாளில் தேவி சக்தி மிகவும் வலிமையாக இருக்கும்.',
      bestActivities: ['Devi worship', 'Protection rituals', 'Spiritual practices', 'Power meditation'],
      keyBenefits: [
        'தெய்வீக சக்தி',
        'பாதுகாப்பு',
        'ஆன்மீக வலிமை'
      ],
      prohibitedActivities: [
        'Negative thinking',
        'Harming women',
        'Disrespecting divine feminine'
      ],
      pariharam: {
        dailyPractices: [
          'Worship Goddess Durga',
          'Chant Devi mantras',
          'Respect all women',
          'Practice spiritual disciplines'
        ],
        offerings: [
          'Red flowers to Durga',
          'Kumkum and turmeric',
          'Sweet offerings to Devi',
          'Help and respect women'
        ],
        fasting: {
          type: 'Durga Ashtami fast',
          duration: 'Full day',
          benefits: 'Grants divine protection and spiritual power'
        },
        mantras: [
          {
            name: 'Durga Mantra',
            text: 'ॐ दुं दुर्गायै नमः',
            count: '108 times'
          },
          {
            name: 'Protection Mantra',
            text: 'ॐ सर्व मंगल मांगल्ये शिवे सर्वार्थ साधिके',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Divine Feminine Invocation',
          description: 'Invoke the Divine Mother',
          details: 'Set up altar with Durga image'
        },
        {
          title: 'Power Awakening',
          description: 'Awaken inner spiritual power',
          details: 'Practice intense meditation'
        },
        {
          title: 'Protection Seeking',
          description: 'Seek divine protection',
          details: 'Ask for shield from all negativity'
        },
        {
          title: 'Strength Prayer',
          description: 'Pray for spiritual strength',
          details: 'Ask for power to overcome challenges'
        },
        {
          title: 'Service Offering',
          description: 'Offer service to divine feminine',
          details: 'Help and protect women and children'
        }
      ]
    },
    {
      id: 'navami',
      name: 'நவமி',
      englishName: 'Navami',
      deity: 'Jagadamba',
      element: 'Fire',
      color: 'Orange',
      moonIcon: 'moon',
      lunarPhase: 'Waxing Gibbous',
      energyLevel: 'Supreme Energy',
      description: 'நவமி தெய்வீக அன்னையின் பரம சக்தியை அனுபவிக்கும் திதி. இந்த நாளில் ஆன்மீக சக்தி உச்சத்தில் இருக்கும்.',
      bestActivities: ['Devi worship', 'Spiritual completion', 'Divine union', 'Blessing others'],
      keyBenefits: [
        'பரம சக்தி',
        'ஆன்மீக முழுமை',
        'தெய்வீக கிருபை'
      ],
      prohibitedActivities: [
        'Material pursuits',
        'Ego-driven actions',
        'Ignoring spiritual duties'
      ],
      pariharam: {
        dailyPractices: [
          'Intensive Devi worship',
          'Complete spiritual practices',
          'Serve devotees',
          'Practice divine love'
        ],
        offerings: [
          'All types of flowers to Devi',
          'Complete meal offerings',
          'Gold and precious items',
          'Serve food to devotees'
        ],
        fasting: {
          type: 'Navami fast',
          duration: 'Extended fast',
          benefits: 'Achieves spiritual perfection and divine grace'
        },
        mantras: [
          {
            name: 'Jagadamba Mantra',
            text: 'ॐ जगदम्बायै नमः',
            count: '108 times'
          },
          {
            name: 'Divine Grace Mantra',
            text: 'ॐ श्री महाशक्त्यै कृपा कराय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Supreme Invocation',
          description: 'Invoke the Supreme Divine Mother',
          details: 'Create elaborate altar with devotion'
        },
        {
          title: 'Spiritual Culmination',
          description: 'Reach spiritual heights',
          details: 'Practice advanced meditation'
        },
        {
          title: 'Divine Union',
          description: 'Seek union with the Divine',
          details: 'Surrender completely to Divine will'
        },
        {
          title: 'Grace Reception',
          description: 'Receive divine grace',
          details: 'Open heart to receive blessings'
        },
        {
          title: 'Blessing Distribution',
          description: 'Become channel of blessings',
          details: 'Share divine grace with others'
        }
      ]
    },
    {
      id: 'dashami',
      name: 'தசமி',
      englishName: 'Dashami',
      deity: 'Vishnu',
      element: 'Water',
      color: 'Blue',
      moonIcon: 'moon',
      lunarPhase: 'Waxing Gibbous',
      energyLevel: 'Completion Energy',
      description: 'தசமி நிறைவு மற்றும் சாதனைக்கான திதி. இந்த நாளில் தொடங்கிய செயல்கள் வெற்றிகரமாக முடிவடையும்.',
      bestActivities: ['Completion of projects', 'Achievement', 'Vishnu worship', 'Success rituals'],
      keyBenefits: [
        'நிறைவு',
        'சாதனை',
        'வெற்றி உறுதி'
      ],
      prohibitedActivities: [
        'Leaving work incomplete',
        'Procrastination',
        'Dishonoring commitments'
      ],
      pariharam: {
        dailyPractices: [
          'Worship Lord Vishnu',
          'Complete pending tasks',
          'Honor all commitments',
          'Celebrate achievements'
        ],
        offerings: [
          'Blue flowers to Vishnu',
          'Tulsi leaves and water',
          'Yellow cloth and ornaments',
          'Feed devotees and poor'
        ],
        fasting: {
          type: 'Ekadashi preparation',
          duration: 'Light eating',
          benefits: 'Prepares for spiritual elevation'
        },
        mantras: [
          {
            name: 'Vishnu Mantra',
            text: 'ॐ विष्णवे नमः',
            count: '108 times'
          },
          {
            name: 'Success Mantra',
            text: 'ॐ नमो भगवते वासुदेवाय',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Completion Focus',
          description: 'Focus on completing projects',
          details: 'List and finish pending tasks'
        },
        {
          title: 'Achievement Prayer',
          description: 'Pray for successful completion',
          details: 'Ask Vishnu for strength to finish'
        },
        {
          title: 'Success Blessing',
          description: 'Seek blessings for success',
          details: 'Request divine support for goals'
        },
        {
          title: 'Gratitude Expression',
          description: 'Express gratitude for progress',
          details: 'Thank divine for achievements'
        },
        {
          title: 'Victory Celebration',
          description: 'Celebrate completed goals',
          details: 'Share success with others'
        }
      ]
    },
    {
      id: 'ekadashi',
      name: 'ஏகாதசி',
      englishName: 'Ekadashi',
      deity: 'Hari (Vishnu)',
      element: 'Space',
      color: 'Golden White',
      moonIcon: 'moon',
      lunarPhase: 'Near Full Moon',
      energyLevel: 'Spiritual Energy',
      description: 'ஏகாதசி மிகவும் புனிதமான திதி. இந்த நாளில் உபவாசம் இருப்பது மோட்சத்தை தரும்.',
      bestActivities: ['Fasting', 'Vishnu worship', 'Meditation', 'Spiritual practices'],
      keyBenefits: [
        'பாவ மோசனம்',
        'ஆன்மீக முன்னேற்றம்',
        'மோட்ச பாதை'
      ],
      prohibitedActivities: [
        'Eating grains',
        'Material activities',
        'Negative thoughts'
      ],
      pariharam: {
        dailyPractices: [
          'Complete fasting',
          'Continuous Vishnu worship',
          'Reading sacred texts',
          'Helping poor and needy'
        ],
        offerings: [
          'Tulsi leaves to Vishnu',
          'Fruits and milk',
          'Sacred books donation',
          'Food to fasting devotees'
        ],
        fasting: {
          type: 'Complete Ekadashi fast',
          duration: '24 hours',
          benefits: 'Grants moksha and removes all sins'
        },
        mantras: [
          {
            name: 'Hari Mantra',
            text: 'ॐ हरि ॐ हरि ॐ',
            count: '1008 times'
          },
          {
            name: 'Moksha Mantra',
            text: 'ॐ नमो नारायणाय',
            count: '108 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Sacred Preparation',
          description: 'Prepare for holy fast',
          details: 'Purify body and mind completely'
        },
        {
          title: 'Vishnu Devotion',
          description: 'Dedicate day to Vishnu',
          details: 'Continuous worship throughout day'
        },
        {
          title: 'Spiritual Focus',
          description: 'Focus completely on spiritual matters',
          details: 'Avoid all worldly activities'
        },
        {
          title: 'Meditation Practice',
          description: 'Practice extended meditation',
          details: 'Meditate on Vishnu form'
        },
        {
          title: 'Liberation Seeking',
          description: 'Seek spiritual liberation',
          details: 'Pray for freedom from rebirth'
        }
      ]
    },
    {
      id: 'dvadashi',
      name: 'துவாதசி',
      englishName: 'Dvadashi',
      deity: 'Madhav',
      element: 'Water',
      color: 'Light Blue',
      moonIcon: 'moon',
      lunarPhase: 'Full Moon-1',
      energyLevel: 'Nourishing Energy',
      description: 'துவாதசி ஏகாதசி உபவாசத்தை முறையாக முடிக்கும் திதி. இந்த நாளில் உணவு உண்பது பிரத்தியேகமான பலனை தரும்.',
      bestActivities: ['Breaking fast', 'Charity', 'Nourishment', 'Blessing others'],
      keyBenefits: [
        'உபவாச பூர்த்தி',
        'புண்ணிய சேர்க்கை',
        'ஆசீர்வாத பலன்'
      ],
      prohibitedActivities: [
        'Improper fast breaking',
        'Overeating',
        'Wasting food'
      ],
      pariharam: {
        dailyPractices: [
          'Proper fast breaking',
          'Feed hungry people',
          'Worship with gratitude',
          'Share blessed food'
        ],
        offerings: [
          'First food to Vishnu',
          'Elaborate meals to devotees',
          'Donation of grains',
          'Water vessels to temples'
        ],
        fasting: {
          type: 'Proper fast breaking',
          duration: 'Morning ritual',
          benefits: 'Completes Ekadashi benefits and adds merit'
        },
        mantras: [
          {
            name: 'Madhav Mantra',
            text: 'ॐ माधवाय नमः',
            count: '108 times'
          },
          {
            name: 'Gratitude Mantra',
            text: 'ॐ कृतज्ञता माधवाय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Sacred Conclusion',
          description: 'Properly conclude Ekadashi fast',
          details: 'Follow traditional breaking procedure'
        },
        {
          title: 'Gratitude Offering',
          description: 'Offer gratitude to Vishnu',
          details: 'Thank for spiritual benefits received'
        },
        {
          title: 'Nourishment Blessing',
          description: 'Bless the food before eating',
          details: 'Offer first portion to deity'
        },
        {
          title: 'Charity Distribution',
          description: 'Distribute food to others',
          details: 'Share blessed food with needy'
        },
        {
          title: 'Merit Multiplication',
          description: 'Multiply spiritual merit',
          details: 'Perform additional charitable acts'
        }
      ]
    },
    {
      id: 'trayodashi',
      name: 'திரயோதசி',
      englishName: 'Trayodashi',
      deity: 'Kamadeva',
      element: 'Water',
      color: 'Pink',
      moonIcon: 'moon',
      lunarPhase: 'Near Full Moon',
      energyLevel: 'Love Energy',
      description: 'திரயோதசி காதல், அன்பு மற்றும் உறவுகளுக்கான திதி. இந்த நாளில் காமதேவனை வணங்குவது விசேஷம்.',
      bestActivities: ['Romance', 'Relationships', 'Beauty', 'Love rituals'],
      keyBenefits: [
        'காதல் வெற்றி',
        'உறவு மேம்பாடு',
        'அழகு அதிகரிப்பு'
      ],
      prohibitedActivities: [
        'Hatred',
        'Breaking relationships',
        'Ugly behavior'
      ],
      pariharam: {
        dailyPractices: [
          'Worship Kamadeva and Rati',
          'Express love to family',
          'Beautify surroundings',
          'Spread love and harmony'
        ],
        offerings: [
          'Pink and red flowers',
          'Sweet fragrances',
          'Beautiful ornaments',
          'Gifts to loved ones'
        ],
        fasting: {
          type: 'Beauty enhancing fast',
          duration: 'Day time',
          benefits: 'Enhances physical beauty and attracts love'
        },
        mantras: [
          {
            name: 'Kamadeva Mantra',
            text: 'ॐ कामदेवाय नमः',
            count: '108 times'
          },
          {
            name: 'Love Mantra',
            text: 'ॐ क्लीं कामदेवाय विद्महे',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Love Altar',
          description: 'Create altar for love deities',
          details: 'Use pink flowers and beautiful items'
        },
        {
          title: 'Relationship Blessing',
          description: 'Seek blessings for relationships',
          details: 'Pray for harmony in all relationships'
        },
        {
          title: 'Beauty Enhancement',
          description: 'Pray for inner and outer beauty',
          details: 'Ask for attractiveness and charm'
        },
        {
          title: 'Love Expression',
          description: 'Express love to others',
          details: 'Show affection to family and friends'
        },
        {
          title: 'Harmony Creation',
          description: 'Create loving atmosphere',
          details: 'Spread love and positive energy'
        }
      ]
    },
    {
      id: 'chaturdashi',
      name: 'சதுர்தசி',
      englishName: 'Chaturdashi',
      deity: 'Kali',
      element: 'Fire',
      color: 'Dark Blue/Black',
      moonIcon: 'moon',
      lunarPhase: 'Near Full Moon',
      energyLevel: 'Destructive Energy',
      description: 'சதுர்தசி தீய சக்திகளை அழிக்கும் திதி. இந்த நாளில் காளியை வணங்குவது எதிரிகளை அழிக்கும்.',
      bestActivities: ['Enemy destruction', 'Protection rituals', 'Kali worship', 'Tantric practices'],
      keyBenefits: [
        'எதிரி நாசம்',
        'தீய சக்தி அழிப்பு',
        'சக்தி வாய்ந்த பாதுகாப்பு'
      ],
      prohibitedActivities: [
        'Peaceful negotiations with enemies',
        'Weak behavior',
        'Avoiding necessary confrontations'
      ],
      pariharam: {
        dailyPractices: [
          'Worship Goddess Kali',
          'Chant powerful mantras',
          'Perform protection rituals',
          'Face challenges boldly'
        ],
        offerings: [
          'Dark blue flowers to Kali',
          'Weapons and iron items',
          'Black sesame and oil',
          'Feed fierce animals (safely)'
        ],
        fasting: {
          type: 'Kali Chaturdashi fast',
          duration: 'Full day',
          benefits: 'Destroys enemies and provides ultimate protection'
        },
        mantras: [
          {
            name: 'Kali Mantra',
            text: 'ॐ क्रीं कालिकायै नमः',
            count: '108 times'
          },
          {
            name: 'Destruction Mantra',
            text: 'ॐ ह्रीं श्रीं क्रीं परमेश्वर्यै स्वाहा',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Fierce Invocation',
          description: 'Invoke fierce Goddess Kali',
          details: 'Create powerful altar with dark items'
        },
        {
          title: 'Enemy Identification',
          description: 'Identify enemies and obstacles',
          details: 'List all negative forces in life'
        },
        {
          title: 'Destruction Prayer',
          description: 'Pray for enemy destruction',
          details: 'Ask Kali to destroy all enemies'
        },
        {
          title: 'Protection Seeking',
          description: 'Seek fierce protection',
          details: 'Ask for invincible divine protection'
        },
        {
          title: 'Power Integration',
          description: 'Integrate destructive power',
          details: 'Use power only for righteousness'
        }
      ]
    },
    {
      id: 'purnima',
      name: 'பூர்ணிமா',
      englishName: 'Purnima (Full Moon)',
      deity: 'Chandra',
      element: 'Water',
      color: 'Silver White',
      moonIcon: 'radio-button-on',
      lunarPhase: 'Full Moon',
      energyLevel: 'Complete Energy',
      description: 'பூர்ணிமா முழு சந்திரன் நாள். இந்த நாளில் சக்திகள் பூர்த்தியடைந்து இருக்கும். ஆன்மீக பயிற்சிகள் மிகவும் பலனளிக்கும்.',
      bestActivities: ['Meditation', 'Spiritual practices', 'Moon worship', 'Completion rituals'],
      keyBenefits: [
        'சக்தி பூர்த்தி',
        'மன அமைதி',
        'ஆன்மீக உயர்வு'
      ],
      prohibitedActivities: [
        'Starting new projects',
        'Cutting hair or nails',
        'Eating heavy food'
      ],
      pariharam: {
        dailyPractices: [
          'Moon worship at night',
          'Meditation under moonlight',
          'Chant moon mantras',
          'Practice gratitude'
        ],
        offerings: [
          'White flowers to Moon',
          'Milk and rice offerings',
          'Silver items to temple',
          'Feed white animals'
        ],
        fasting: {
          type: 'Purnima fast',
          duration: 'Sunset to moonrise',
          benefits: 'Grants mental peace and spiritual elevation'
        },
        mantras: [
          {
            name: 'Chandra Mantra',
            text: 'ॐ चन्द्राय नमः',
            count: '108 times'
          },
          {
            name: 'Full Moon Mantra',
            text: 'ॐ श्री चन्द्र देवाय नमः',
            count: '21 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Lunar Connection',
          description: 'Connect with full moon energy',
          details: 'Spend time under moonlight'
        },
        {
          title: 'Completion Ceremony',
          description: 'Complete ongoing spiritual practices',
          details: 'Finish what you started in this lunar cycle'
        },
        {
          title: 'Gratitude Expression',
          description: 'Express gratitude for blessings',
          details: 'Thank for all good things received'
        },
        {
          title: 'Energy Absorption',
          description: 'Absorb lunar energy',
          details: 'Meditate and absorb moon power'
        },
        {
          title: 'Spiritual Culmination',
          description: 'Reach spiritual peak',
          details: 'Achieve highest state of consciousness'
        }
      ]
    }
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.loadData();
    this.filteredThithi = [...this.thithiList];
  }

  loadData() {
    const completed = localStorage.getItem('completedThithi');
    const favorites = localStorage.getItem('favoriteThithi');
    
    if (completed) {
      this.completedThithi = JSON.parse(completed);
    }
    
    if (favorites) {
      this.favoriteThithi = JSON.parse(favorites);
    }
  }

  filterThithi(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchTerm = searchTerm;
    
    if (!searchTerm) {
      this.filteredThithi = [...this.thithiList];
    } else {
      this.filteredThithi = this.thithiList.filter(thithi =>
        thithi.name.toLowerCase().includes(searchTerm) ||
        thithi.englishName.toLowerCase().includes(searchTerm) ||
        thithi.deity.toLowerCase().includes(searchTerm) ||
        thithi.keyBenefits.some(benefit => benefit.toLowerCase().includes(searchTerm))
      );
    }
  }

  openThithiDetail(thithi: Thithi) {
    this.selectedThithi = thithi;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedThithi = null;
  }

  toggleFavorite(thithiId: string, event: Event) {
    event.stopPropagation();
    
    const index = this.favoriteThithi.indexOf(thithiId);
    if (index > -1) {
      this.favoriteThithi.splice(index, 1);
    } else {
      this.favoriteThithi.push(thithiId);
    }
    
    localStorage.setItem('favoriteThithi', JSON.stringify(this.favoriteThithi));
  }

  isFavorite(thithiId: string): boolean {
    return this.favoriteThithi.includes(thithiId);
  }

  markAsCompleted(thithiId: string) {
    if (!this.completedThithi.includes(thithiId)) {
      this.completedThithi.push(thithiId);
      localStorage.setItem('completedThithi', JSON.stringify(this.completedThithi));
    }
    this.closeModal();
  }

  isThithiCompleted(thithiId: string): boolean {
    return this.completedThithi.includes(thithiId);
  }

  getProgressPercentage(): number {
    return this.completedThithi.length / this.thithiList.length;
  }

  shareContent() {
    if (navigator.share) {
      navigator.share({
        title: 'திதி Course - 15 Sacred Lunar Days',
        text: 'Learn about the 15 sacred Thithi with pariharam and activation processes',
        url: window.location.href
      });
    }
  }
}
