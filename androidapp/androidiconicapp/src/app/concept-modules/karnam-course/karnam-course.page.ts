import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface Karnam {
  id: string;
  name: string;
  englishName: string;
  duration: string;
  deity: string;
  element: string;
  description: string;
  characteristics: string[];
  keyBenefits: string[];
  pariharam: {
    dailyPractices: string[];
    offerings: string[];
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
  bestTimes: {
    daily: string;
    weekly: string;
    monthly: string;
  };
}

@Component({
  selector: 'app-karnam-course',
  templateUrl: './karnam-course.page.html',
  styleUrls: ['./karnam-course.page.scss'],
})
export class KarnamCoursePage implements OnInit {
  searchTerm: string = '';
  isModalOpen: boolean = false;
  selectedKarnam: Karnam | null = null;
  filteredKarnam: Karnam[] = [];
  completedKarnam: string[] = [];
  favoriteKarnam: string[] = [];

  karnamList: Karnam[] = [
    {
      id: 'bava',
      name: 'பவ கர்ணம்',
      englishName: 'Bava Karnam',
      duration: '12 hours',
      deity: 'Indra',
      element: 'Fire',
      description: 'பவ கர்ணம் புதிய தொடக்கங்களுக்கும், ஆற்றல் மற்றும் உத்வேகத்திற்கும் உகந்தது. இந்த கர்ணம் வெற்றி மற்றும் முன்னேற்றத்தை தருகிறது.',
      characteristics: [
        'வலிமையான தொடக்கங்கள்',
        'தலைமைத்துவ குணங்கள்',
        'துணிச்சல் மற்றும் ஆற்றல்',
        'செயல்திறன் அதிகரிப்பு'
      ],
      keyBenefits: [
        'புதிய வணிகம்',
        'தலைமைத்துவம்',
        'வெற்றி'
      ],
      pariharam: {
        dailyPractices: [
          'Surya namaskara at sunrise',
          'Meditation for 10 minutes',
          'Chant Indra mantra 21 times',
          'Light sesame oil lamp'
        ],
        offerings: [
          'Red flowers to Indra',
          'Jaggery and ghee',
          'Sesame oil to hanuman',
          'Feed cows with green grass'
        ],
        mantras: [
          {
            name: 'Indra Mantra',
            text: 'ॐ इन्द्राय नमः',
            count: '21 times'
          },
          {
            name: 'Bava Karnam Mantra',
            text: 'ॐ भवाय कर्णाय नमः',
            count: '108 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Morning Preparation',
          description: 'Wake up before sunrise and take a bath',
          details: 'Use turmeric and sandalwood paste'
        },
        {
          title: 'Altar Setup',
          description: 'Create a sacred space with red cloth',
          details: 'Place Indra image and light ghee lamp'
        },
        {
          title: 'Mantra Chanting',
          description: 'Chant the prescribed mantras with devotion',
          details: 'Face east direction while chanting'
        },
        {
          title: 'Offering Ritual',
          description: 'Make offerings to Indra',
          details: 'Offer red flowers, jaggery, and incense'
        },
        {
          title: 'Closing Prayer',
          description: 'Express gratitude and seek blessings',
          details: 'Meditate for 5 minutes in silence'
        }
      ],
      bestTimes: {
        daily: '6:00 AM - 6:00 PM',
        weekly: 'Sunday and Tuesday',
        monthly: 'Shukla Paksha (Waxing Moon)'
      }
    },
    {
      id: 'balava',
      name: 'பாலவ கர்ணம்',
      englishName: 'Balava Karnam',
      duration: '12 hours',
      deity: 'Mithra',
      element: 'Earth',
      description: 'பாலவ கர்ணம் நட்பு, ஒத்துழைப்பு மற்றும் சமூக உறவுகளை வலுப்படுத்துகிறது. இது அமைதி மற்றும் ஸ்திரத்தன்மையை தருகிறது.',
      characteristics: [
        'நட்பு மற்றும் ஒத்துழைப்பு',
        'சமூக இணக்கம்',
        'அமைதியான மனநிலை',
        'ஸ்திரமான முன்னேற்றம்'
      ],
      keyBenefits: [
        'உறவுகள் மேம்பாடு',
        'சமூக அங்கீகாரம்',
        'மன அமைதி'
      ],
      pariharam: {
        dailyPractices: [
          'Pray to Mithra deity',
          'Practice loving-kindness meditation',
          'Offer water to plants',
          'Share food with needy'
        ],
        offerings: [
          'White flowers to Mithra',
          'Milk and honey',
          'White cloth donation',
          'Feed white cows'
        ],
        mantras: [
          {
            name: 'Mithra Mantra',
            text: 'ॐ मित्राय नमः',
            count: '21 times'
          },
          {
            name: 'Balava Karnam Mantra',
            text: 'ॐ बालवाय कर्णाय नमः',
            count: '108 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Purification',
          description: 'Cleanse mind and body through meditation',
          details: 'Use white sandalwood paste'
        },
        {
          title: 'Sacred Setup',
          description: 'Arrange white flowers and pure water',
          details: 'Use silver or white metal vessels'
        },
        {
          title: 'Friendship Prayer',
          description: 'Pray for universal friendship and peace',
          details: 'Include all beings in your prayers'
        },
        {
          title: 'Community Service',
          description: 'Engage in helping others',
          details: 'Share food or resources with needy'
        },
        {
          title: 'Gratitude Practice',
          description: 'Express gratitude for relationships',
          details: 'Thank all friends and family mentally'
        }
      ],
      bestTimes: {
        daily: '6:00 PM - 6:00 AM',
        weekly: 'Monday and Friday',
        monthly: 'Full Moon days'
      }
    },
    {
      id: 'kaulava',
      name: 'கௌலவ கர்ணம்',
      englishName: 'Kaulava Karnam',
      duration: '12 hours',
      deity: 'Aryaman',
      element: 'Air',
      description: 'கௌலவ கர்ணம் குடும்ப ஒற்றுமை, திருமணம் மற்றும் பாரம்பரிய மதிப்புகளை வலுப்படுத்துகிறது. இது சமுதாய பந்தங்களை பலப்படுத்துகிறது.',
      characteristics: [
        'குடும்ப ஒற்றுமை',
        'பாரம்பரிய மதிப்புகள்',
        'திருமண பலம்',
        'சமுதாய பொறுப்பு'
      ],
      keyBenefits: [
        'குடும்ப நல்லிணக்கம்',
        'திருமண வாழ்க்கை',
        'சமுதாய மதிப்பு'
      ],
      pariharam: {
        dailyPractices: [
          'Family prayers together',
          'Respect elders daily',
          'Maintain family traditions',
          'Help family members'
        ],
        offerings: [
          'Yellow flowers to Aryaman',
          'Turmeric and rice',
          'Gold ornaments to temple',
          'Feed married couples'
        ],
        mantras: [
          {
            name: 'Aryaman Mantra',
            text: 'ॐ अर्यमणे नमः',
            count: '21 times'
          },
          {
            name: 'Kaulava Karnam Mantra',
            text: 'ॐ कौलवाय कर्णाय नमः',
            count: '108 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Family Gathering',
          description: 'Organize family prayer session',
          details: 'Include all family members'
        },
        {
          title: 'Traditional Setup',
          description: 'Follow ancestral customs',
          details: 'Use traditional items and decorations'
        },
        {
          title: 'Elder Blessings',
          description: 'Seek blessings from family elders',
          details: 'Touch their feet and seek guidance'
        },
        {
          title: 'Unity Ritual',
          description: 'Perform rituals for family unity',
          details: 'Share prasadam with all members'
        },
        {
          title: 'Commitment Renewal',
          description: 'Renew commitment to family values',
          details: 'Promise to uphold traditions'
        }
      ],
      bestTimes: {
        daily: '6:00 AM - 6:00 PM',
        weekly: 'Thursday and Friday',
        monthly: 'Amavasya and Purnima'
      }
    },
    {
      id: 'taitila',
      name: 'தைத்தில கர்ணம்',
      englishName: 'Taitila Karnam',
      duration: '12 hours',
      deity: 'Bhaga',
      element: 'Water',
      description: 'தைத்தில கர்ணம் செல்வம், செழிப்பு மற்றும் அதிர்ஷ்டத்தை கொண்டு வருகிறது. இது வணிகம் மற்றும் பொருளாதார வளர்ச்சிக்கு உதவுகிறது.',
      characteristics: [
        'பொருளாதார வளர்ச்சி',
        'வணிக வெற்றி',
        'அதிர்ஷ்டம்',
        'செல்வ அதிகரிப்பு'
      ],
      keyBenefits: [
        'வணிக லாபம்',
        'செல்வ வளர்ச்சி',
        'அதிர்ஷ்டம்'
      ],
      pariharam: {
        dailyPractices: [
          'Pray to Goddess Lakshmi',
          'Light ghee lamps',
          'Donate to charity',
          'Keep workspace clean'
        ],
        offerings: [
          'Pink lotuses to Bhaga',
          'Sweets and fruits',
          'Silver coins to temple',
          'Feed poor people'
        ],
        mantras: [
          {
            name: 'Bhaga Mantra',
            text: 'ॐ भगाय नमः',
            count: '21 times'
          },
          {
            name: 'Lakshmi Mantra',
            text: 'ॐ श्री लक्ष्म्यै नमः',
            count: '108 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Wealth Altar',
          description: 'Create a prosperity altar',
          details: 'Include Lakshmi image and gold items'
        },
        {
          title: 'Purification Ritual',
          description: 'Cleanse your business space',
          details: 'Use sacred water and incense'
        },
        {
          title: 'Abundance Prayer',
          description: 'Pray for legitimate wealth',
          details: 'Ask for prosperity that helps others too'
        },
        {
          title: 'Charity Offering',
          description: 'Donate to worthy causes',
          details: 'Give with genuine compassion'
        },
        {
          title: 'Gratitude Expression',
          description: 'Thank for current blessings',
          details: 'Appreciate what you already have'
        }
      ],
      bestTimes: {
        daily: '6:00 PM - 6:00 AM',
        weekly: 'Thursday and Friday',
        monthly: 'Dhanteras and Friday the 13th'
      }
    },
    {
      id: 'gara',
      name: 'கர கர்ணம்',
      englishName: 'Gara Karnam',
      duration: '12 hours',
      deity: 'Aditya',
      element: 'Fire',
      description: 'கர கர்ணம் ஆரோக்கியம், வலிமை மற்றும் உயிர் சக்தியை அதிகரிக்கிறது. இது நோய் நிவாரணம் மற்றும் ஆயுள் வளர்ச்சிக்கு உதவுகிறது.',
      characteristics: [
        'உடல் ஆரோக்கியம்',
        'மன வலிமை',
        'உயிர் சக்தி',
        'நோய் எதிர்ப்பு'
      ],
      keyBenefits: [
        'ஆரோக்கிய மேம்பாடு',
        'நீண்ட ஆயுள்',
        'சக்தி அதிகரிப்பு'
      ],
      pariharam: {
        dailyPractices: [
          'Surya namaskar daily',
          'Drink copper water',
          'Eat healthy sattvic food',
          'Practice pranayama'
        ],
        offerings: [
          'Red flowers to Sun',
          'Copper vessel donation',
          'Medicinal herbs to temple',
          'Serve sick people'
        ],
        mantras: [
          {
            name: 'Aditya Mantra',
            text: 'ॐ आदित्याय नमः',
            count: '21 times'
          },
          {
            name: 'Gara Karnam Mantra',
            text: 'ॐ गराय कर्णाय नमः',
            count: '108 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Sunrise Ritual',
          description: 'Face the rising sun',
          details: 'Offer water and red flowers'
        },
        {
          title: 'Health Prayers',
          description: 'Pray for physical and mental health',
          details: 'Include prayers for family health'
        },
        {
          title: 'Energy Activation',
          description: 'Practice energy building exercises',
          details: 'Yoga, pranayama, and meditation'
        },
        {
          title: 'Healing Service',
          description: 'Help sick or suffering people',
          details: 'Volunteer at hospitals or donate medicine'
        },
        {
          title: 'Vitality Meditation',
          description: 'Meditate on life force energy',
          details: 'Visualize golden light filling your body'
        }
      ],
      bestTimes: {
        daily: '6:00 AM - 6:00 PM',
        weekly: 'Sunday and Tuesday',
        monthly: 'Sankranti days'
      }
    },
    {
      id: 'vanija',
      name: 'வணிஜ கர்ணம்',
      englishName: 'Vanija Karnam',
      duration: '12 hours',
      deity: 'Pushan',
      element: 'Air',
      description: 'வணிஜ கர்ணம் வணிகம், பயணம் மற்றும் தொழில் வளர்ச்சிக்கு உகந்தது. இது புதிய வாய்ப்புகள் மற்றும் விரிவாக்கத்தை தருகிறது.',
      characteristics: [
        'வணிக வளர்ச்சி',
        'பயண வெற்றி',
        'புதிய வாய்ப்புகள்',
        'தொழில் விரிவாக்கம்'
      ],
      keyBenefits: [
        'வணிக லாபம்',
        'பயண பாதுகாப்பு',
        'புதிய வாய்ப்புகள்'
      ],
      pariharam: {
        dailyPractices: [
          'Pray to Lord Ganesha',
          'Keep workplace organized',
          'Help travelers',
          'Maintain business ethics'
        ],
        offerings: [
          'Yellow flowers to Pushan',
          'Travel safety amulets',
          'Food for travelers',
          'Donate to road construction'
        ],
        mantras: [
          {
            name: 'Pushan Mantra',
            text: 'ॐ पूषणे नमः',
            count: '21 times'
          },
          {
            name: 'Ganesha Mantra',
            text: 'ॐ गं गणपतये नमः',
            count: '108 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Business Blessing',
          description: 'Seek divine blessings for business',
          details: 'Place Ganesha idol in office'
        },
        {
          title: 'Travel Protection',
          description: 'Pray for safe journeys',
          details: 'Carry blessed protection amulet'
        },
        {
          title: 'Opportunity Prayer',
          description: 'Ask for new opportunities',
          details: 'Be open to divine guidance'
        },
        {
          title: 'Ethical Commitment',
          description: 'Promise to maintain business ethics',
          details: 'Treat all customers and partners fairly'
        },
        {
          title: 'Success Sharing',
          description: 'Commit to sharing success',
          details: 'Help other businesses and entrepreneurs'
        }
      ],
      bestTimes: {
        daily: '6:00 PM - 6:00 AM',
        weekly: 'Wednesday and Thursday',
        monthly: 'Chaturthi and Ekadashi'
      }
    },
    {
      id: 'vishti',
      name: 'விஷ்டி கர்ணம்',
      englishName: 'Vishti Karnam',
      duration: '12 hours',
      deity: 'Kala',
      element: 'Space',
      description: 'விஷ்டி கர்ணம் கடினமான நேரம் எனக் கருதப்படுகிறது. இந்த நேரத்தில் ஆன்மீக பயிற்சிகள் மற்றும் தியானம் மிகவும் பலனளிக்கும்.',
      characteristics: [
        'ஆன்மீக வளர்ச்சி',
        'தியான ஆழம்',
        'கர்ம சுத்திகரிப்பு',
        'அகக் கண் திறப்பு'
      ],
      keyBenefits: [
        'ஆன்மீக முன்னேற்றம்',
        'கர்ம நிவாரணம்',
        'மன தெளிவு'
      ],
      pariharam: {
        dailyPractices: [
          'Deep meditation practice',
          'Chant protective mantras',
          'Avoid new beginnings',
          'Focus on spiritual growth'
        ],
        offerings: [
          'Black sesame to Shani',
          'Dark blue flowers',
          'Iron donations to temple',
          'Feed crows and dogs'
        ],
        mantras: [
          {
            name: 'Kala Mantra',
            text: 'ॐ कालाय नमः',
            count: '21 times'
          },
          {
            name: 'Protection Mantra',
            text: 'ॐ रक्षा रक्षा कृष्णाय नमः',
            count: '108 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Protection Setup',
          description: 'Create protective spiritual space',
          details: 'Use black cloth and iron items'
        },
        {
          title: 'Karmic Cleansing',
          description: 'Perform rituals for karma purification',
          details: 'Confess past mistakes and seek forgiveness'
        },
        {
          title: 'Deep Meditation',
          description: 'Engage in extended meditation',
          details: 'Focus on inner transformation'
        },
        {
          title: 'Service to Suffering',
          description: 'Help those who are suffering',
          details: 'Visit hospitals or help the needy'
        },
        {
          title: 'Transformation Prayer',
          description: 'Pray for spiritual transformation',
          details: 'Ask for strength to overcome challenges'
        }
      ],
      bestTimes: {
        daily: 'Variable (consult calendar)',
        weekly: 'Saturday',
        monthly: 'Amavasya (New Moon)'
      }
    },
    {
      id: 'shakuni',
      name: 'சகுனி கர்ணம்',
      englishName: 'Shakuni Karnam',
      duration: '12 hours',
      deity: 'Rudra',
      element: 'Fire',
      description: 'சகுனி கர்ணம் சக்தி, துணிச்சல் மற்றும் எதிரிகளை வெல்லும் வலிமையை தருகிறது. இது போர் மற்றும் போட்டியில் வெற்றிக்கு உதவுகிறது.',
      characteristics: [
        'வீர குணங்கள்',
        'எதிரி நாசம்',
        'சக்தி அதிகரிப்பு',
        'போராட்ட வெற்றி'
      ],
      keyBenefits: [
        'எதிரிகள் மீது வெற்றி',
        'சக்தி வளர்ச்சி',
        'தைரியம்'
      ],
      pariharam: {
        dailyPractices: [
          'Pray to Lord Hanuman',
          'Practice martial arts',
          'Chant Rudra mantras',
          'Strengthen physical body'
        ],
        offerings: [
          'Red flowers to Rudra',
          'Weapons to temple',
          'Red cloth donation',
          'Feed red-colored animals'
        ],
        mantras: [
          {
            name: 'Rudra Mantra',
            text: 'ॐ रुद्राय नमः',
            count: '21 times'
          },
          {
            name: 'Hanuman Mantra',
            text: 'ॐ हनुमते नमः',
            count: '108 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Warrior Preparation',
          description: 'Prepare mind and body for challenges',
          details: 'Physical exercise and mental strengthening'
        },
        {
          title: 'Courage Invocation',
          description: 'Invoke divine courage and strength',
          details: 'Call upon Hanuman and Rudra'
        },
        {
          title: 'Enemy Protection',
          description: 'Seek protection from enemies',
          details: 'Create protective shield through mantras'
        },
        {
          title: 'Righteous Battle',
          description: 'Fight only for righteous causes',
          details: 'Ensure your battles are morally justified'
        },
        {
          title: 'Victory Dedication',
          description: 'Dedicate victory to divine',
          details: 'Use success for good of others'
        }
      ],
      bestTimes: {
        daily: '6:00 AM - 6:00 PM',
        weekly: 'Tuesday and Saturday',
        monthly: 'Ashtami and Navami'
      }
    },
    {
      id: 'chatushpada',
      name: 'சதுஷ்பத கர்ணம்',
      englishName: 'Chatushpada Karnam',
      duration: '12 hours',
      deity: 'Vishnu',
      element: 'Water',
      description: 'சதுஷ்பத கர்ணம் ஸ்திரத்தன்மை, நீதி மற்றும் தர்மத்தை வலுப்படுத்துகிறது. இது நான்கு திசைகளிலும் பாதுகாப்பை தருகிறது.',
      characteristics: [
        'ஸ்திரத்தன்மை',
        'நீதி மற்றும் தர்மம்',
        'நான்கு திசை பாதுகாப்பு',
        'சமத்துவம்'
      ],
      keyBenefits: [
        'மன அமைதி',
        'தர்ம வாழ்க்கை',
        'பாதுகாப்பு'
      ],
      pariharam: {
        dailyPractices: [
          'Recite Vishnu Sahasranama',
          'Practice dharmic living',
          'Help maintain justice',
          'Protect the innocent'
        ],
        offerings: [
          'Blue lotus to Vishnu',
          'Sacred basil leaves',
          'Yellow cloth to temple',
          'Feed Brahmins'
        ],
        mantras: [
          {
            name: 'Vishnu Mantra',
            text: 'ॐ विष्णवे नमः',
            count: '21 times'
          },
          {
            name: 'Dharma Mantra',
            text: 'ॐ धर्माय नमः',
            count: '108 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Dharmic Foundation',
          description: 'Establish strong moral foundation',
          details: 'Commit to truthful and ethical living'
        },
        {
          title: 'Four Direction Prayer',
          description: 'Pray to guardians of four directions',
          details: 'Seek protection from all sides'
        },
        {
          title: 'Justice Commitment',
          description: 'Commit to supporting justice',
          details: 'Stand up for what is right and fair'
        },
        {
          title: 'Stability Ritual',
          description: 'Perform rituals for stability',
          details: 'Create lasting positive changes'
        },
        {
          title: 'Divine Protection',
          description: 'Seek comprehensive divine protection',
          details: 'Trust in divine justice and timing'
        }
      ],
      bestTimes: {
        daily: '6:00 PM - 6:00 AM',
        weekly: 'Thursday and Sunday',
        monthly: 'Ekadashi and Purnima'
      }
    },
    {
      id: 'naga',
      name: 'நாக கர்ணம்',
      englishName: 'Naga Karnam',
      duration: '12 hours',
      deity: 'Vasuki',
      element: 'Water',
      description: 'நாக கர்ணம் ஞானம், மர்மங்கள் மற்றும் மறைந்த சக்திகளை வெளிப்படுத்துகிறது. இது நாக தோஷம் நிவாரணம் மற்றும் ஆன்மீக சக்திக்கு உதவுகிறது.',
      characteristics: [
        'மர்ம ஞானம்',
        'நாக சக்தி',
        'மறைந்த ஆற்றல்கள்',
        'தோஷ நிவாரணம்'
      ],
      keyBenefits: [
        'நாக தோஷம் நீக்கம்',
        'ஞான வளர்ச்சி',
        'மர்ம சக்திகள்'
      ],
      pariharam: {
        dailyPractices: [
          'Worship Naga deities',
          'Pour milk on Naga stones',
          'Chant Naga mantras',
          'Protect snakes and trees'
        ],
        offerings: [
          'Milk and honey to Naga',
          'Silver snake to temple',
          'Plant peepal trees',
          'Feed milk to snakes'
        ],
        mantras: [
          {
            name: 'Vasuki Mantra',
            text: 'ॐ वासुकये नमः',
            count: '21 times'
          },
          {
            name: 'Naga Mantra',
            text: 'ॐ नागाय नमः',
            count: '108 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Naga Invocation',
          description: 'Invoke the serpent deities',
          details: 'Create altar with snake images and milk'
        },
        {
          title: 'Dosha Cleansing',
          description: 'Cleanse Naga dosha effects',
          details: 'Perform specific rituals for dosha removal'
        },
        {
          title: 'Wisdom Seeking',
          description: 'Seek ancient serpent wisdom',
          details: 'Meditate on cosmic serpent knowledge'
        },
        {
          title: 'Environmental Protection',
          description: 'Protect snakes and their habitat',
          details: 'Support conservation efforts'
        },
        {
          title: 'Power Integration',
          description: 'Integrate serpent power safely',
          details: 'Use gained power for healing and wisdom'
        }
      ],
      bestTimes: {
        daily: '6:00 PM - 6:00 AM',
        weekly: 'Saturday and Tuesday',
        monthly: 'Naga Panchami and Amavasya'
      }
    },
    {
      id: 'kintughna',
      name: 'கிம்ஸ்துக்ன கர்ணம்',
      englishName: 'Kintughna Karnam',
      duration: '12 hours',
      deity: 'Varuna',
      element: 'Water',
      description: 'கிம்ஸ்துக்ன கர்ணம் பாவ நிவாரணம், சுத்திகரிப்பு மற்றும் மன்னிப்பை தருகிறது. இது கடந்த கால தவறுகளிலிருந்து விடுதலை அளிக்கிறது.',
      characteristics: [
        'பாவ நிவாரணம்',
        'மன சுத்திகரிப்பு',
        'மன்னிப்பு சக்தி',
        'புதிய தொடக்கம்'
      ],
      keyBenefits: [
        'பாவ மோசனம்',
        'மன தெளிவு',
        'ஆன்மீக சுத்தம்'
      ],
      pariharam: {
        dailyPractices: [
          'Take ritual baths',
          'Confess and repent mistakes',
          'Practice forgiveness',
          'Purify mind and body'
        ],
        offerings: [
          'Sacred water to Varuna',
          'White flowers and rice',
          'Donations to water bodies',
          'Feed fish and aquatic animals'
        ],
        mantras: [
          {
            name: 'Varuna Mantra',
            text: 'ॐ वरुणाय नमः',
            count: '21 times'
          },
          {
            name: 'Purification Mantra',
            text: 'ॐ शुद्धि शुद्धि स्वाहा',
            count: '108 times'
          }
        ]
      },
      activationProcess: [
        {
          title: 'Purification Bath',
          description: 'Take ceremonial purification bath',
          details: 'Use sacred water, turmeric, and prayers'
        },
        {
          title: 'Confession Ritual',
          description: 'Honestly confess past mistakes',
          details: 'Be completely truthful with yourself'
        },
        {
          title: 'Forgiveness Prayer',
          description: 'Seek divine forgiveness',
          details: 'Ask for mercy and opportunity to improve'
        },
        {
          title: 'Cleansing Meditation',
          description: 'Meditate on inner purification',
          details: 'Visualize white light cleansing your being'
        },
        {
          title: 'New Beginning',
          description: 'Commit to righteous living',
          details: 'Promise to live with integrity going forward'
        }
      ],
      bestTimes: {
        daily: '6:00 AM - 6:00 PM',
        weekly: 'Monday and Wednesday',
        monthly: 'Purnima and holy river festivals'
      }
    }
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.loadData();
    this.filteredKarnam = [...this.karnamList];
  }

  loadData() {
    const completed = localStorage.getItem('completedKarnam');
    const favorites = localStorage.getItem('favoriteKarnam');
    
    if (completed) {
      this.completedKarnam = JSON.parse(completed);
    }
    
    if (favorites) {
      this.favoriteKarnam = JSON.parse(favorites);
    }
  }

  filterKarnam(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchTerm = searchTerm;
    
    if (!searchTerm) {
      this.filteredKarnam = [...this.karnamList];
    } else {
      this.filteredKarnam = this.karnamList.filter(karnam =>
        karnam.name.toLowerCase().includes(searchTerm) ||
        karnam.englishName.toLowerCase().includes(searchTerm) ||
        karnam.deity.toLowerCase().includes(searchTerm) ||
        karnam.keyBenefits.some(benefit => benefit.toLowerCase().includes(searchTerm))
      );
    }
  }

  openKarnamDetail(karnam: Karnam) {
    this.selectedKarnam = karnam;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedKarnam = null;
  }

  toggleFavorite(karnamId: string, event: Event) {
    event.stopPropagation();
    
    const index = this.favoriteKarnam.indexOf(karnamId);
    if (index > -1) {
      this.favoriteKarnam.splice(index, 1);
    } else {
      this.favoriteKarnam.push(karnamId);
    }
    
    localStorage.setItem('favoriteKarnam', JSON.stringify(this.favoriteKarnam));
  }

  isFavorite(karnamId: string): boolean {
    return this.favoriteKarnam.includes(karnamId);
  }

  markAsCompleted(karnamId: string) {
    if (!this.completedKarnam.includes(karnamId)) {
      this.completedKarnam.push(karnamId);
      localStorage.setItem('completedKarnam', JSON.stringify(this.completedKarnam));
    }
    this.closeModal();
  }

  isKarnamCompleted(karnamId: string): boolean {
    return this.completedKarnam.includes(karnamId);
  }

  getProgressPercentage(): number {
    return this.completedKarnam.length / this.karnamList.length;
  }

  shareContent() {
    if (navigator.share) {
      navigator.share({
        title: 'கர்ணம் Course - 11 Sacred Karnam',
        text: 'Learn about the 11 sacred Karnam with pariharam and activation processes',
        url: window.location.href
      });
    }
  }
}
