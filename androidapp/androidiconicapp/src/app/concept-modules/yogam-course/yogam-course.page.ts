import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface Yogam {
  id: string;
  name: string;
  englishName: string;
  deity: string;
  planetaryCombination: string;
  element: string;
  color: string;
  icon: string;
  energyType: string;
  description: string;
  rules: {
    title: string;
    description: string;
    conditions: string[];
  }[];
  characteristics: {
    physical: string[];
    mental: string[];
    spiritual: string[];
    career: string[];
    relationships: string[];
  };
  benefits: {
    immediate: string[];
    longTerm: string[];
    spiritual: string[];
    material: string[];
  };
  vazhviyalPariharam: {
    title: string;
    dailyPractices: string[];
    lifestyle: string[];
    diet: string[];
    meditation: string[];
    yoga: string[];
  };
  templePariharam: {
    title: string;
    primaryTemples: {
      name: string;
      location: string;
      deity: string;
      specialDays: string[];
      offerings: string[];
    }[];
    rituals: string[];
    mantras: {
      name: string;
      text: string;
      count: string;
      benefits: string;
    }[];
    donations: string[];
  };
}

@Component({
  selector: 'app-yogam-course',
  templateUrl: './yogam-course.page.html',
  styleUrls: ['./yogam-course.page.scss'],
})
export class YogamCoursePage implements OnInit {
  searchTerm: string = '';
  isModalOpen: boolean = false;
  selectedYogam: Yogam | null = null;
  filteredYogam: Yogam[] = [];
  completedYogam: string[] = [];
  favoriteYogam: string[] = [];

  yogamList: Yogam[] = [
    {
      id: 'sunabha',
      name: 'சுனபா யோகம்',
      englishName: 'Sunabha Yoga',
      deity: 'Chandra (Moon)',
      planetaryCombination: 'Planets in 2nd house from Moon',
      element: 'Water',
      color: 'Silver',
      icon: 'moon',
      energyType: 'Lunar Energy',
      description: 'சுனபா யோகம் சந்திரனுக்கு இரண்டாம் வீட்டில் கிரகங்கள் இருப்பதால் உண்டாகும் மிகவும் சாதகமான யோகம். இது செல்வம், புகழ், அறிவு மற்றும் சமூக அந்தஸ்து அளிக்கும்.',
      rules: [
        {
          title: 'முதன்மை விதி',
          description: 'சந்திரனுக்கு இரண்டாம் வீட்டில் ஏதேனும் கிரகங்கள் இருக்க வேண்டும்',
          conditions: [
            'சந்திரன் + 30 டிகிரி இடத்தில் கிரகங்கள் இருத்தல்',
            'சூரியன் மட்டும் இருந்தால் இந்த யோகம் பலிக்காது',
            'ராகு, கேது மட்டும் இருந்தால் முழு பலன் கிடைக்காது'
          ]
        },
        {
          title: 'பலம் நிர்ணயம்',
          description: 'இரண்டாம் வீட்டில் உள்ள கிரகங்களின் எண்ணிக்கை மற்றும் பலத்தின் அடிப்படையில் யோகத்தின் வீரியம் தீர்மானிக்கப்படும்',
          conditions: [
            'ஒரு கிரகம் - நடுத்தர பலன்',
            'இரண்டு கிரகங்கள் - நல்ல பலன்',
            'மூன்று அல்லது அதற்கு மேல் - சிறந்த பலன்'
          ]
        }
      ],
      characteristics: {
        physical: [
          'அழகான முகமும் ஆர்ர்த்தகரமான தோற்றமும்',
          'சந்திர பிம்பம் போன்ற முகம்',
          'மிருதுவான குரல்',
          'கண்கவர் நடவடிக்கை'
        ],
        mental: [
          'அபூர்வ நினைவாற்றல்',
          'கலைகளில் ஆர்வம்',
          'அமைதியான மனநிலை',
          'உணர்ச்சிபூர்வ அறிவு'
        ],
        spiritual: [
          'பக்தி உணர்வு',
          'தியான ஆற்றல்',
          'மந்திர சக்தி',
          'ஆன்மீக வளர்ச்சி'
        ],
        career: [
          'ஆசிரியர், கலைஞர்',
          'மருத்துவ துறை',
          'ஆன்மீக துறை',
          'வணிக வெற்றி'
        ],
        relationships: [
          'குடும்ப பிரியர்',
          'நண்பர்களால் விரும்பப்படுபவர்',
          'மனைவி/கணவர் மகிழ்ச்சி',
          'சமூக அங்கீகாரம்'
        ]
      },
      benefits: {
        immediate: [
          'மனநிலை மேம்பாடு',
          'புதிய வாய்ப்புகள்',
          'உறவுகளில் இணக்கம்',
          'உடல்நல மேம்பாடு'
        ],
        longTerm: [
          'நிலையான செல்வம்',
          'சமூக அந்தஸ்து',
          'குடும்ப மகிழ்ச்சி',
          'ஆயுள் வளர்ச்சி'
        ],
        spiritual: [
          'ஆன்மீக உணர்வு',
          'தெய்வ அனுக்ரகம்',
          'கர்ம சுத்தி',
          'மோக்ஷ பாதை'
        ],
        material: [
          'பண வரவு',
          'சொத்து சேர்க்கை',
          'வாகன யோகம்',
          'வீடு கட்ட யோகம்'
        ]
      },
      vazhviyalPariharam: {
        title: 'வாழ்வியல் பரிகாரங்கள்',
        dailyPractices: [
          'தினமும் காலையில் சந்திரன் மந்திரம் சொல்லுதல்',
          'வெள்ளி நிற உடைகள் அணிதல்',
          'தாமரை மலர் வழிபாடு',
          'பால் மற்றும் தயிர் உணவில் சேர்த்தல்'
        ],
        lifestyle: [
          'அமாவாசை நாளில் சந்திர தரிசனம்',
          'பௌர்ணமி அன்று சிறப்பு வழிபாடு',
          'நீர் மூலங்களின் அருகே தியானம்',
          'வெள்ளை பூக்கள் வீட்டில் வைத்தல்'
        ],
        diet: [
          'பால் பொருட்கள் அதிகம் உண்ணுதல்',
          'வெள்ளை அரிசி தவிர்த்தல்',
          'கொள்ளு, எள் உணவில் சேர்த்தல்',
          'இரவு உணவு முன்னதாகவே சாப்பிடுதல்'
        ],
        meditation: [
          'சந்திர தியானம் தினமும் 20 நிமிடங்கள்',
          'அஜபா ஜபம்',
          'மனசு அலைகளை கட்டுப்படுத்துதல்',
          'பிராணாயாமம்'
        ],
        yoga: [
          'சந்திர நமஸ்கார் (16 ராுண்டுகள்)',
          'சுவாசத்தில் கவனம்',
          'யின் யோகா',
          'தியான யோகம்'
        ]
      },
      templePariharam: {
        title: 'கோவில் பரிகாரங்கள்',
        primaryTemples: [
          {
            name: 'சோமநாதர் கோவில்',
            location: 'தஞ்சாவூர்',
            deity: 'சிவன் (சோமேசுவரர்)',
            specialDays: ['சோமவாரம்', 'பிரதோஷம்', 'மகா சிவராத்திரி'],
            offerings: ['வெள்ளை மலர்கள்', 'பால் அபிஷேகம்', 'சந்தனம்', 'கர்ப்பூரம்']
          },
          {
            name: 'சந்திரமௌலீசுவரர் கோவில்',
            location: 'திருவகர்',
            deity: 'சிவன் (சந்திரமௌலீசுவரர்)',
            specialDays: ['சோமவாரம்', 'பூரம் நட்சத்திரம்'],
            offerings: ['தேன்', 'பால்', 'வெள்ளை துணி', 'வெள்ளி நாணயம்']
          },
          {
            name: 'காமாட்சி அம்மன் கோவில்',
            location: 'காஞ்சிபுரம்',
            deity: 'காமாட்சி அம்மன்',
            specialDays: ['வெள்ளிக்கிழமை', 'நவராத்திரி'],
            offerings: ['வெள்ளை சாதம்', 'பால் பாயசம்', 'தாமரை மலர்', 'வெள்ளை வஸ்திரம்']
          }
        ],
        rituals: [
          'திங்கள் கிழமைகளில் சிவாலயங்களில் பால் அபிஷேகம்',
          'பௌர்ணமி அன்று சந்திர தரிசனம் செய்து வழிபாடு',
          'ரோஹிணி நட்சத்திரத்தில் சிறப்பு பூஜை',
          'சோம பிரதோஷத்தில் உபவாசம் மற்றும் வழிபாடு'
        ],
        mantras: [
          {
            name: 'சந்திர முல மந்திரம்',
            text: 'ॐ श्रीं सोमाय नमः',
            count: '108 முறை',
            benefits: 'மன அமைதி மற்றும் செல்வ வளர்ச்சி'
          },
          {
            name: 'சுனபா யோக மந்திரம்',
            text: 'ॐ सुनाभ योग सिद्धिं कुरु स्वाहा',
            count: '21 முறை',
            benefits: 'யோக பலன் முழுமையாக பெறுதல்'
          }
        ],
        donations: [
          'வெள்ளி பாத்திரங்கள் தானம்',
          'வெள்ளை மாடுகளுக்கு தீனி',
          'சந்திர ஹோர தானம்',
          'ஏழைகளுக்கு பால் வழங்குதல்'
        ]
      }
    },
    {
      id: 'dharmakarmadipati',
      name: 'தர்மகர்மாதிபதி யோகம்',
      englishName: 'Dharmakarmadipati Yoga',
      deity: 'Vishnu',
      planetaryCombination: 'Lords of 9th and 10th houses in conjunction',
      element: 'Fire + Earth',
      color: 'Golden Yellow',
      icon: 'star',
      energyType: 'Dharmic Energy',
      description: 'தர்மகர்மாதிபதி யோகம் ஒன்பதாம் மற்றும் பத்தாம் அதிபதிகள் சேர்ந்திருப்பதால் அல்லது பார்வையால் உண்டாகும் அபூர்வமான யோகம். இது உயர் பதவி, சமூக அங்கீகாரம் மற்றும் ராஜ யோகத்தை அளிக்கும்.',
      rules: [
        {
          title: 'யோக உருவாக்கம்',
          description: '9ம் வீட்டு அதிபதி மற்றும் 10ம் வீட்டு அதிபதி சேர்ந்திருக்க வேண்டும்',
          conditions: [
            'இரு கிரகங்களும் ஒரே வீட்டில் இருத்தல்',
            'பரஸ்பர பார்வை கொண்டிருத்தல்',
            'ஒருவருக்கொருவர் நட்சத்திர பரிமாற்றம்'
          ]
        },
        {
          title: 'பலம் நிர்ணயம்',
          description: 'யோகத்தின் வீரியம் கிரகங்களின் நிலை மற்றும் பலத்தை பொறுத்தது',
          conditions: [
            'கேந்திர வீடுகளில் இருந்தால் அதிக பலன்',
            'திரிகோண வீடுகளில் இருந்தால் நல்ல பலன்',
            'பாப கிரக சேர்க்கையில் குறைந்த பலன்'
          ]
        }
      ],
      characteristics: {
        physical: [
          'ஆளுமை மிக்க தோற்றம்',
          'கம்பீரமான நடை',
          'ஒளிமயமான முகம்',
          'உயரமான உருவம்'
        ],
        mental: [
          'நீதி உணர்வு',
          'நேர்மையான குணம்',
          'தலைமைத்துவ குணம்',
          'ஒழுக்கம் மற்றும் ஒழுங்கு'
        ],
        spiritual: [
          'தர்ம நெறியில் நம்பிக்கை',
          'மத சார்ந்த செயல்பாடுகள்',
          'சமூக சேவை',
          'ஆன்மீக வழிகாட்டி'
        ],
        career: [
          'அரசு உயர் பதவிகள்',
          'நீதித்துறை',
          'வழக்கறிஞர், நீதிபதி',
          'சமூக சேவை அமைப்புகள்'
        ],
        relationships: [
          'மதிக்கப்படும் குடும்ப தலைவர்',
          'நம்பிக்கைக்குரிய நண்பர்',
          'சமூகத்தில் மரியாதை',
          'குடும்ப பெருமை'
        ]
      },
      benefits: {
        immediate: [
          'அதிகார பூர்வ அங்கீகாரம்',
          'வேலை வாய்ப்புகள்',
          'சமூக அந்தஸ்து',
          'நல்ல முடிவுகள்'
        ],
        longTerm: [
          'உயர் பதவிகள்',
          'நிலையான வருமானம்',
          'சமூக செல்வாக்கு',
          'குடும்ப கவுரவம்'
        ],
        spiritual: [
          'தர்ம காரியங்களில் வெற்றி',
          'பிறர் நலனில் ஈடுபாடு',
          'ஆன்மீக உயர்வு',
          'தெய்வ அருள்'
        ],
        material: [
          'உயர் சம்பளம்',
          'அரசு உதவிகள்',
          'சொத்து வளர்ச்சி',
          'பொருளாதார நிலையில் உயர்வு'
        ]
      },
      vazhviyalPariharam: {
        title: 'வாழ்வியல் பரிகாரங்கள்',
        dailyPractices: [
          'தினமும் விஷ்ணு சஹஸ்ரநாமம் ஓதுதல்',
          'மஞ்சள் நிற உடைகள் அணிதல்',
          'துளசி தளம் வழிபாடு',
          'நீதி மற்றும் நேர்மையான வாழ்க்கை'
        ],
        lifestyle: [
          'ஏகாதசி விரதம் அனுஷ்டித்தல்',
          'தர்ம காரியங்களில் பங்கேற்றல்',
          'பெரியவர்களை மதித்தல்',
          'சமூக சேவையில் ஈடுபடுதல்'
        ],
        diet: [
          'சாத்விக உணவு உண்ணுதல்',
          'அசைவ உணவு தவிர்த்தல்',
          'மதுபானம் தவிர்த்தல்',
          'எளிமையான உணவு பழக்கம்'
        ],
        meditation: [
          'மஹா மந்திர ஜபம்',
          'ராம நாம ஜபம்',
          'விஷ்ணு தியானம்',
          'தர்ம சிந்தனை'
        ],
        yoga: [
          'சூர்ய நமஸ்கார்',
          'குண்டலினி யோகம்',
          'ராஜ யோகம்',
          'கர்ம யோகம்'
        ]
      },
      templePariharam: {
        title: 'கோவில் பரிகாரங்கள்',
        primaryTemples: [
          {
            name: 'திருப்பதி ஏழுமலையான் கோவில்',
            location: 'திருப்பதி',
            deity: 'வெங்கடேசுவர',
            specialDays: ['ஏகாதசி', 'வைகுண்ட ஏகாதசி', 'பிரம்மோத்ஸவம்'],
            offerings: ['மஞ்சள் மலர்கள்', 'தேன்', 'வெண்ணெய்', 'லட்டு']
          },
          {
            name: 'ஸ்ரீரங்கம் ரங்கநாதர் கோவில்',
            location: 'திருச்சிராப்பள்ளி',
            deity: 'ரங்கநாதர்',
            specialDays: ['வைகுண்ட ஏகாதசி', 'பகவன் நாமகள்'],
            offerings: ['மஞ்சள் துணிகள்', 'பழங்கள்', 'வெல்லம்', 'தில்லை மலர்கள்']
          },
          {
            name: 'குரு பகவான் கோவில்',
            location: 'அளகர் கோவில்',
            deity: 'அளகர் பெருமாள்',
            specialDays: ['குரு பெயர்ச்சி', 'வியாழக்கிழமை'],
            offerings: ['மஞ்சள் அரிசி', 'பழங்கள்', 'வேப்பிலை', 'எள்ளு']
          }
        ],
        rituals: [
          'வியாழக்கிழமைகளில் விஷ்ணு ஆலயங்களில் வழிபாடு',
          'ஏகாதசி விரதம் மற்றும் உபவாசம்',
          'பூர்வ பட்ட நட்சத்திரத்தில் சிறப்பு அர்ச்சனை',
          'வைகுண்ட ஏகாதசியில் திருப்பாவை பாராயணம்'
        ],
        mantras: [
          {
            name: 'விஷ்ணு முல மந்திரம்',
            text: 'ॐ नमो नारायणाय',
            count: '108 முறை',
            benefits: 'அரசு வேலை மற்றும் பதவி உயர்வு'
          },
          {
            name: 'தர்மகர்மாதிபதி மந்திரம்',
            text: 'ॐ धर्मकर्माधिपतये नमः',
            count: '21 முறை',
            benefits: 'யோக பலன் விரைவில் கிடைத்தல்'
          }
        ],
        donations: [
          'ஏழைகளுக்கு அன்னதானம்',
          'கல்வி உதவிகள்',
          'மஞ்சள் துணிகள் தானம்',
          'வேத பாடசாலைகளுக்கு உதவி'
        ]
      }
    },
    {
      id: 'malavika',
      name: 'மாலவிகா யோகம்',
      englishName: 'Malavika Yoga',
      deity: 'Saraswati',
      planetaryCombination: 'Mercury in exaltation/own house with beneficial aspects',
      element: 'Air + Earth',
      color: 'Green',
      icon: 'library',
      energyType: 'Intellectual Energy',
      description: 'மாலவிகா யோகம் புதன் கிரகம் உச்சம் அல்லது சுகஸ்தானத்தில் நல்ல கிரகங்களுடன் சேர்ந்திருப்பதால் உண்டாகும் அரிய யோகம். இது கல்வி, அறிவு, கலைகள் மற்றும் வாக்சித்தியில் சிறப்பை அளிக்கும்.',
      rules: [
        {
          title: 'யோக அமைப்பு',
          description: 'புதன் கிரகம் கன்னி அல்லது மிதுன ராசியில் நல்ல கிரகங்களுடன் இருக்க வேண்டும்',
          conditions: [
            'புதன் உச்சம் (கன்னி 15 டிகிரி)',
            'புதன் மிதுன ராசியில் சுக ஸ்தானம்',
            'சுபக் கிரகங்களின் பார்வை அல்லது சேர்க்கை'
          ]
        },
        {
          title: 'பலன் வீரியம்',
          description: 'புதனின் நிலை மற்றும் ஆஸ்பெக்ட்களின் அடிப்படையில் யோகம் பலிக்கும்',
          conditions: [
            'லக்ன அதிபதியுடன் சேர்ந்தால் சிறந்த பலன்',
            'குருவின் பார்வையில் மேல் கல்வி வாய்ப்பு',
            'சுக்ரனுடன் சேர்ந்தால் கலை வெற்றி'
          ]
        }
      ],
      characteristics: {
        physical: [
          'கவர்ச்சிகரமான தோற்றம்',
          'புத்திசாலித்தனம் நிறைந்த முகம்',
          'இனிமையான குரல்',
          'வேகமான உடல் அசைவுகள்'
        ],
        mental: [
          'கூர்மையான அறிவு',
          'பல மொழி அறிவு',
          'நினைவாற்றல் சக்தி',
          'விரைவான கணிப்பு திறன்'
        ],
        spiritual: [
          'ஞான வெளிச்சம்',
          'மந்திர சித்தி',
          'சரஸ்வதி அருள்',
          'வேத கல்வியில் ஆர்வம்'
        ],
        career: [
          'எழுத்தாளர், கவிஞர்',
          'அறிவியல் ஆராய்ச்சி',
          'கணிக்கை துறை',
          'ஊடகங்கள் மற்றும் தகவல் தொழில்நுட்பம்'
        ],
        relationships: [
          'நல்ல உரையாடல் திறன்',
          'புத்திசாலி நண்பர்கள்',
          'அறிவுத் துறையினருடன் நட்பு',
          'கல்வி மூலம் வரும் சம்பந்தங்கள்'
        ]
      },
      benefits: {
        immediate: [
          'கல்வியில் மேம்பாடு',
          'தேர்வுகளில் வெற்றி',
          'புதிய அறிவு பெறுதல்',
          'வாக் சக்தி வளர்ச்சி'
        ],
        longTerm: [
          'உயர் கல்வி வாய்ப்புகள்',
          'அறிவு சார்ந்த பணி',
          'எழுத்து துறையில் புகழ்',
          'கல்வி நிறுவனங்களில் பங்கு'
        ],
        spiritual: [
          'வேத கல்வி அறிவு',
          'ஆன்மீக நூல்களின் பொருள் விளக்கம்',
          'தெய்வ இசை மற்றும் மந்திரம்',
          'ஞான விளக்கம்'
        ],
        material: [
          'கல்வி மூலம் வருமானம்',
          'புத்தகங்கள் மூலம் வருமானம்',
          'ஆராய்ச்சி நிதி',
          'கல்வி சார் சொத்துகள்'
        ]
      },
      vazhviyalPariharam: {
        title: 'வாழ்வியல் பரிகாரங்கள்',
        dailyPractices: [
          'தினமும் சரஸ்வதி வந்தனம் ஓதுதல்',
          'பச்சை நிற உடைகள் அணிதல்',
          'புத்தகங்கள் படித்தல்',
          'எழுத்து பயிற்சி செய்தல்'
        ],
        lifestyle: [
          'தினமும் புதிய கல்வி பெறுதல்',
          'மௌன விரதம் (வாரத்திற்கு ஒரு நாள்)',
          'சரஸ்வதி பூஜை (வசந்த பஞ்சமி)',
          'நூலகங்களில் நேரம் செலவிடுதல்'
        ],
        diet: [
          'பச்சை இலை காய்கறிகள்',
          'தண்ணீர் அதிகம் குடித்தல்',
          'ஜங்க் ஃபுட் தவிர்த்தல்',
          'ஆவிக்கு வைத்த உணவு'
        ],
        meditation: [
          'ஓம் நமச்சிவாய ஜபம்',
          'சரஸ்வதி ந்ட்யானம்',
          'கொவித்த்ரி மந்திரம்',
          'ப்பா்ண்ய்அமம்'
        ],
        yoga: [
          'ப்ப्राणাயாम (அनुலोம विলोम)',
          'सूर्য नमस्कार',
          'धारणा अभ्यास',
          'ज्ञान योग'
        ]
      },
      templePariharam: {
        title: 'கோவில் பரிகாரங்கள்',
        primaryTemples: [
          {
            name: 'மன்னார்குடி ராஜகோபால ஸ்வாமி கோவில்',
            location: 'மன்னார்குடி',
            deity: 'ராஜகோபால ஸ்வாமி',
            specialDays: ['வசந்த பஞ்சமி', 'புதன்கிழமை', 'ஆயில்யம் நட்சத்திரம்'],
            offerings: ['பச்சை மலர்கள்', 'வெற்றிலை பாக்கு', 'தேன்', 'பழங்கள்']
          },
          {
            name: 'கன்னட ஸ்ரீமன் நாராயணபுரம்',
            location: 'மானாமதுரை',
            deity: 'சரஸ்வதி தேவி',
            specialDays: ['வசந்த பஞ்சமி', 'நவராத்திரி', 'ஆவணி விசாகம்'],
            offerings: ['பாசி மலர்கள்', 'வெள்ளை தாமரை', 'பால் பாயசம்', 'பச்சை துணி']
          },
          {
            name: 'தில்லை நடராஜர் கோவில்',
            location: 'சிதம்பரம்',
            deity: 'நடராஜர் (ஞான கூத்து)',
            specialDays: ['ஆருத்ரா தரிசனம்', 'மாசி மகம்', 'வசந்த விழா'],
            offerings: ['வில்வ இலைகள்', 'வெள்ளி நாணயம்', 'பொன் நகைகள்', 'கர்ப்பூர ஆர்த்தி']
          }
        ],
        rituals: [
          'புதன்கிழமைகளில் பன்டரிட் அய்யர் வழிபாடு',
          'வசந்த பஞ்சமியில் சரஸ்வதி பூஜை',
          'ஆயில்யம் நட்சத்திரத்தில் புதன் ஹோமம்',
          'புதம் ஹோராவில் சரஸ்வதி மந்திரம்'
        ],
        mantras: [
          {
            name: 'புதன் முல மந்திரம்',
            text: 'ॐ बुधं नमः',
            count: '108 முறை',
            benefits: 'கல்வியில் சிறப்பு மற்றும் அறிவு வளர்ச்சி'
          },
          {
            name: 'சரஸ்வதி மந்திரம்',
            text: 'ॐ ऐं सरस्वत्यै नमः',
            count: '108 முறை',
            benefits: 'வாக் சக்தி மற்றும் கலையில் வெற்றி'
          },
          {
            name: 'மாலவிகா யோக மந்திரம்',
            text: 'ॐ मालविका योग सिद्धिं देहि',
            count: '21 முறை',
            benefits: 'யோக பலன் விரைவான அடைதல்'
          }
        ],
        donations: [
          'வேத பாடசாலைகளுக்கு நூல்கள்',
          'ஏழை மாணவர்களுக்கு கல்வி உதவி',
          'பச்சை துணிகள் மற்றும் பொருட்கள்',
          'எழுத்து சாமக்ரிகள் தானம்'
        ]
      }
    }
  ];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.filteredYogam = [...this.yogamList];
    this.loadUserProgress();
  }

  loadUserProgress() {
    // Load from local storage or service
    const completed = localStorage.getItem('completedYogam');
    const favorites = localStorage.getItem('favoriteYogam');
    
    if (completed) {
      this.completedYogam = JSON.parse(completed);
    }
    
    if (favorites) {
      this.favoriteYogam = JSON.parse(favorites);
    }
  }

  filterYogam(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredYogam = this.yogamList.filter(yogam => 
      yogam.name.toLowerCase().includes(query) ||
      yogam.englishName.toLowerCase().includes(query) ||
      yogam.description.toLowerCase().includes(query)
    );
  }

  async openYogamDetails(yogam: Yogam) {
    this.selectedYogam = yogam;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedYogam = null;
  }

  markAsCompleted(yogamId: string) {
    if (!this.completedYogam.includes(yogamId)) {
      this.completedYogam.push(yogamId);
      localStorage.setItem('completedYogam', JSON.stringify(this.completedYogam));
    }
  }

  toggleFavorite(yogamId: string) {
    const index = this.favoriteYogam.indexOf(yogamId);
    if (index === -1) {
      this.favoriteYogam.push(yogamId);
    } else {
      this.favoriteYogam.splice(index, 1);
    }
    localStorage.setItem('favoriteYogam', JSON.stringify(this.favoriteYogam));
  }

  isFavorite(yogamId: string): boolean {
    return this.favoriteYogam.includes(yogamId);
  }

  isCompleted(yogamId: string): boolean {
    return this.completedYogam.includes(yogamId);
  }

  getCompletionPercentage(): number {
    return Math.round((this.completedYogam.length / this.yogamList.length) * 100);
  }

  shareContent() {
    if (navigator.share) {
      navigator.share({
        title: 'யோகம் Course - LDML Online Astro',
        text: 'Explore the power of Vedic Yogas and their benefits',
        url: window.location.href
      });
    }
  }
}
