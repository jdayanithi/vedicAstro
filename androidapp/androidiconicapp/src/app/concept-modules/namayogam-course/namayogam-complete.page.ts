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

  // Complete 27 Namayogam with pure yoga names and enhanced Yogi/Avayogi details
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
      bestTime: 'காலை 6-9 மணி (Morning 6-9 AM)',
      description: 'விஷ்கும்ப யோகம் வெற்றி மற்றும் தலைமைத்துவத்திற்கு மிகவும் உகந்த யோகம். இந்த யோகத்தில் தொடங்கும் செயல்கள் பெரும் வெற்றியை தரும்.',
      characteristics: ['வெற்றி குணம்', 'தலைமைத்துவம்', 'சக்தி வாய்ந்த ஆற்றல்', 'முன்னேற்றம்', 'சாதனை உணர்வு', 'எதிர்ப்பை வெல்லுதல்'],
      keyBenefits: ['வெற்றி உறுதி', 'தலைமைத்துவம்', 'சக்தி அதிகரிப்பு', 'முன்னேற்றம்'],
      favorableActivities: ['Starting new ventures', 'Leadership initiatives', 'Competitive activities', 'Goal achievement', 'Overcoming obstacles'],
      unfavorableActivities: ['Peaceful negotiations', 'Surrender activities', 'Passive meditation', 'Rest and relaxation'],
      yogi: {
        name: 'விஷ்கும்ப யோகி',
        englishName: 'Vishkumba Yogi',
        direction: 'கிழக்கு (East)',
        benefits: ['வெற்றி சக்தி வளர்ச்சி', 'தலைமைத்துவ திறன் அதிகரிப்பு', 'இலக்கு சாதிக்கும் ஆற்றல்', 'எதிர்ப்புகளை வெல்லும் வலிமை'],
        significance: 'கிழக்கு திசையில் இருந்து வரும் விஷ்கும்ப யோகியின் ஆசீர்வாதம் பெற்றால் வாழ்க்கையில் எல்லா துறைகளிலும் வெற்றி கிடைக்கும்'
      },
      avayogi: {
        name: 'விஷ்கும்ப அவயோகி',
        englishName: 'Vishkumba Avayogi',
        direction: 'மேற்கு (West)',
        effects: ['வெற்றியில் தாமதம் மற்றும் இடையூறு', 'தலைமைத்துவத்தில் சவால்கள்', 'இலக்கு அடைவதில் தடைகள்', 'சாதனைகளில் குழப்பம்'],
        precautions: 'மேற்கு திசையை தவிர்த்து முக்கியமான தொழில் மற்றும் போட்டி சம்பந்தமான செயல்களை மேற்கொள்ளவும். மேற்கு பகுதியில் வெற்றி சம்பந்தமான சடங்குகளை செய்ய வேண்டாம்.'
      },
      lifeImpact: {
        career: 'Leadership success and achievement',
        health: 'Strong vitality and energy',
        relationships: 'Commanding but protective',
        spirituality: 'Victory over inner obstacles'
      },
      pariharam: {
        dailyPractices: ['Meditate on victory mantras', 'Visualize achieving goals', 'Practice leadership skills', 'Help others overcome obstacles'],
        offerings: ['Yellow flowers to Jupiter', 'Turmeric and jaggery', 'Gold ornaments to temple', 'Food to successful people'],
        gems: { primary: 'Yellow Sapphire', alternative: 'Topaz', benefits: 'Enhances victory and leadership qualities' },
        mantras: [
          { name: 'Guru Mantra', text: 'ॐ गुरवे नमः', count: '108 times' },
          { name: 'Victory Mantra', text: 'ॐ विष्कुम्भाय नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Goal Setting', description: 'Set clear victory goals', details: 'Define what victory means for you' },
        { title: 'Energy Invocation', description: 'Invoke victorious energy', details: 'Call upon the power of achievement' },
        { title: 'Action Planning', description: 'Plan your victory strategy', details: 'Create actionable steps toward success' }
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
      bestTime: 'மாலை 6-9 மணி (Evening 6-9 PM)',
      description: 'பிரீதி யோகம் அன்பு, மகிழ்ச்சி மற்றும் உறவுகளுக்கு சிறந்த யோகம். இந்த யோகத்தில் காதல் மற்றும் குடும்ப விஷயங்கள் சாதகமாக முடியும்.',
      characteristics: ['அன்பு மற்றும் கருணை', 'மகிழ்ச்சி தரும் தன்மை', 'உறவுகள் மேம்பாடு', 'இனிமையான குணம்', 'சந்தோஷம்', 'பாசம் வெளிப்பாடு'],
      keyBenefits: ['அன்பு பெருக்கம்', 'மகிழ்ச்சி அதிகரிப்பு', 'உறவு நல்லிணக்கம்', 'மன அமைதி'],
      favorableActivities: ['Expressing love', 'Family bonding', 'Artistic creation', 'Celebration', 'Gift giving'],
      unfavorableActivities: ['Conflicts', 'Harsh words', 'Breaking relationships', 'Anger expression'],
      yogi: {
        name: 'பிரீதி யோகி',
        englishName: 'Priti Yogi',
        direction: 'வடக்கு (North)',
        benefits: ['அன்பின் ஆழம் அதிகரிப்பு', 'குடும்ப நல்லிணக்கம் வளர்ச்சி', 'மகிழ்ச்சியான மன நிலை', 'உறவுகளில் இனிமை பெருக்கம்'],
        significance: 'வடக்கு திசையில் இருந்து வரும் பிரீதி யோகியின் ஆசீர்வாதம் பெற்றால் வாழ்க்கையில் நிரந்தர அன்பும் மகிழ்ச்சியும் நிறையும்'
      },
      avayogi: {
        name: 'பிரீதி அவயோகி',
        englishName: 'Priti Avayogi',
        direction: 'தெற்கு (South)',
        effects: ['காதல் மற்றும் அன்பில் சிக்கல்கள்', 'குடும்ப உறவுகளில் பிரச்சினைகள்', 'மன அமைதியின்மை மற்றும் கவலை', 'மகிழ்ச்சியற்ற சூழ்நிலைகள்'],
        precautions: 'தெற்கு திசையை தவிர்த்து காதல், திருமணம் மற்றும் குடும்ப விழாக்களை நடத்தவும். தெற்கு பகுதியில் அன்பு சம்பந்தமான முக்கிய முடிவுகளை எடுக்க வேண்டாம்.'
      },
      lifeImpact: {
        career: 'Success in creative and people-oriented fields',
        health: 'Emotional wellbeing and heart health',
        relationships: 'Deep love and joyful connections',
        spirituality: 'Devotional love and divine joy'
      },
      pariharam: {
        dailyPractices: ['Express love to family', 'Practice gratitude', 'Share joy with others', 'Create beautiful things'],
        offerings: ['Pink and white flowers to Venus', 'Sweet offerings', 'Beautiful ornaments', 'Gifts to loved ones'],
        gems: { primary: 'Diamond', alternative: 'White Sapphire', benefits: 'Brings love, joy and harmonious relationships' },
        mantras: [
          { name: 'Shukra Mantra', text: 'ॐ शुक्राय नमः', count: '108 times' },
          { name: 'Love Mantra', text: 'ॐ प्रीत्यै नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Heart Opening', description: 'Open your heart to love', details: 'Feel the joy and love within you' },
        { title: 'Love Expression', description: 'Express love freely', details: 'Share your love with others' },
        { title: 'Joy Cultivation', description: 'Cultivate inner joy', details: 'Find reasons to be happy and grateful' }
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
      bestTime: 'காலை 9-12 மணி (Morning 9-12 PM)',
      description: 'ஆயுஷ்மான் யோகம் நீண்ட ஆயுள், ஆரோக்கியம் மற்றும் வலிமைக்கு உகந்த யோகம. இந்த யோகத்தில் மருத்துவ சிகிச்சைகள் மிகவும் பலனளிக்கும்.',
      characteristics: ['நீண்ட ஆயுள்', 'வலுவான ஆரோக்கியம்', 'வாழ்வின் நீட்சி', 'நல்ல உடல்நலம்', 'ஆற்றல் வளம்', 'வாழ்வு சக்தி'],
      keyBenefits: ['நீண்ட வாழ்க்கை', 'நல்ல ஆரோக்கியம்', 'வலிமை அதிகரிப்பு', 'நோய் நிவாரணம்'],
      favorableActivities: ['Health treatments', 'Medical procedures', 'Fitness activities', 'Longevity practices', 'Healing ceremonies'],
      unfavorableActivities: ['Risky behaviors', 'Unhealthy habits', 'Dangerous activities', 'Stress-inducing work'],
      yogi: {
        name: 'ஆயுஷ்மான் யோகி',
        englishName: 'Ayushmana Yogi',
        direction: 'ईशान (வடகிழக்கு - Northeast)',
        benefits: ['ஆயுள் நீட்டிப்பு மற்றும் வாழ்வு சக்தி அதிகரிப்பு', 'நோய் எதிர்ப்பு சக்தி வளர்ச்சி', 'உடல் மற்றும் மன வலிமை பெருக்கம்', 'இயற்கை மருத்துவ சக்தி அடைதல்'],
        significance: 'வடகிழக்கு திசையில் இருந்து வரும் ஆயுஷ்மான் யோகியின் ஆசீர்வாதம் பெற்றால் நூறு ஆண்டுகள் ஆரோக்கியமான வாழ்க்கை வாழ முடியும்'
      },
      avayogi: {
        name: 'ஆயுஷ்மான் அவயோகி',
        englishName: 'Ayushmana Avayogi',
        direction: 'नैऋत्य (தென்மேற்கு - Southwest)',
        effects: ['ஆரோக்கிய பிரச்சினைகள் மற்றும் நோய் தொல்லைகள்', 'ஆயுள் குறைவும் உயிர் சக்தி இழப்பும்', 'உடல் வலிமை குறைவு மற்றும் களைப்பு நிலை', 'மருத்துவ சிகிச்சையில் தாமதம்'],
        precautions: 'தென்மேற்கு திசையை தவிர்த்து ஆரோக்கிய சிகிச்சைகளை மேற்கொள்ளவும். தென்மேற்கு பகுதியில் மருத்துவமனை அல்லது அறுவை சிகிச்சை செய்ய வேண்டாம். நோய் நிவாரண பூஜைகளை தென்மேற்கில் செய்ய கூடாது.'
      },
      lifeImpact: {
        career: 'Success in healthcare and wellness fields',
        health: 'Excellent physical and mental vitality',
        relationships: 'Long-lasting and nurturing bonds',
        spirituality: 'Practices for spiritual longevity'
      },
      pariharam: {
        dailyPractices: ['Practice yoga and meditation', 'Eat healthy nutritious food', 'Exercise regularly', 'Help heal others'],
        offerings: ['Green vegetables to Jupiter', 'Medicinal herbs', 'Health supplies to hospitals', 'Food to elderly people'],
        gems: { primary: 'Emerald', alternative: 'Green Tourmaline', benefits: 'Grants long life and perfect health' },
        mantras: [
          { name: 'Dhanvantari Mantra', text: 'ॐ धन्वन्तरये नमः', count: '108 times' },
          { name: 'Longevity Mantra', text: 'ॐ आयुष्मते नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Health Assessment', description: 'Evaluate your current health', details: 'Check your physical and mental wellbeing' },
        { title: 'Vitality Enhancement', description: 'Enhance your life force', details: 'Practice breathing and energy exercises' },
        { title: 'Longevity Planning', description: 'Plan for long healthy life', details: 'Create sustainable health habits' }
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
      bestTime: 'பிற்பகல் 12-3 மணி (Afternoon 12-3 PM)',
      description: 'சௌபாக்யம் யோகம் செல்வம், அதிர்ஷ்டம் மற்றும் வளமைக்கு உகந்த யோகம். இந்த யோகத்தில் தொடங்கும் வணிக நடவடிக்கைகள் பெரும் லாபம் தரும்.',
      characteristics: ['செல்வ செழிப்பு', 'அதிர்ஷ்டம்', 'வணிக வெற்றி', 'பண வரவு', 'வளமான வாழ்க்கை', 'சொத்து சேர்க்கை'],
      keyBenefits: ['செல்வ வளர்ச்சி', 'அதிர்ஷ்டம்', 'வணிக லாபம்', 'பண வரவு'],
      favorableActivities: ['Business ventures', 'Investment decisions', 'Property purchase', 'Financial planning', 'Wealth creation'],
      unfavorableActivities: ['Overspending', 'Risky investments', 'Lending money', 'Gambling'],
      yogi: {
        name: 'சௌபாக்ய யோகி',
        englishName: 'Saubhagya Yogi',
        direction: 'आग्नेय (தென்கிழக்கு - Southeast)',
        benefits: ['செல்வத்தின் நிரந்தர வளர்ச்சி', 'வணிகத்தில் தொடர் வெற்றி', 'பண வரவின் பல மூலங்கள்', 'அதிர்ஷ்ட யோகங்கள் சேர்ப்பு'],
        significance: 'தென்கிழக்கு திசையில் இருந்து வரும் சௌபாக்ய யோகியின் ஆசீர்வாதம் பெற்றால் வாழ்நாள் முழுவதும் செல்வமும் வளமும் குறையாது'
      },
      avayogi: {
        name: 'சௌபாக்ய அவயோகி',
        englishName: 'Saubhagya Avayogi',
        direction: 'वायव्य (வடமேற்கு - Northwest)',
        effects: ['செல்வ இழப்பு மற்றும் பண பிரச்சினைகள்', 'வணிகத்தில் நஷ்டம் மற்றும் தோல்வி', 'அதிர்ஷ்டமின்மை மற்றும் துர்பாக்யம்', 'சொத்து இழப்பு மற்றும் கடன் தொல்லை'],
        precautions: 'வடமேற்கு திசையை தவிர்த்து பண விஷயங்கள், வணிகம் மற்றும் சொத்து வாங்குதல் போன்ற செயல்களை மேற்கொள்ளவும். வடமேற்கு பகுதியில் பண பரிவர்த்தனை அல்லது முதலீடு செய்ய வேண்டாம்.'
      },
      lifeImpact: {
        career: 'Great success in business and finance',
        health: 'Good health through proper nutrition',
        relationships: 'Prosperity brings family harmony',
        spirituality: 'Material wealth supports spiritual growth'
      },
      pariharam: {
        dailyPractices: ['Worship Lakshmi daily', 'Practice gratitude for wealth', 'Share prosperity with others', 'Maintain honest business'],
        offerings: ['Gold coins to Lakshmi', 'Yellow rice and turmeric', 'Donations to poor', 'Business offerings'],
        gems: { primary: 'Citrine', alternative: 'Yellow Sapphire', benefits: 'Attracts wealth and business success' },
        mantras: [
          { name: 'Lakshmi Mantra', text: 'ॐ श्रीं लक्ष्म्यै नमः', count: '108 times' },
          { name: 'Wealth Mantra', text: 'ॐ सौभाग्याय नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Wealth Mindset', description: 'Develop abundance thinking', details: 'Visualize prosperity and success' },
        { title: 'Business Planning', description: 'Plan your financial growth', details: 'Create strategic wealth building plans' },
        { title: 'Gratitude Practice', description: 'Be thankful for current blessings', details: 'Express gratitude for existing wealth' }
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
      bestTime: 'மாலை 3-6 மணி (Evening 3-6 PM)',
      description: 'சோபன யோகம் அழகு, அலங்காரம் மற்றும் கலைத்திறனுக்கு உகந்த யோகம். இந்த யோகத்தில் அழகு மற்றும் கலை சார்ந்த செயல்கள் சிறப்பாக அமையும்.',
      characteristics: ['அழகு அதிகரிப்பு', 'கலை ஆர்வம்', 'அலங்கார விருப்பம்', 'இனிமையான குணம்', 'ஈர்ப்பு சக்தி', 'அழகான தோற்றம்'],
      keyBenefits: ['அழகு மேம்பாடு', 'கலைத்திறன்', 'ஈர்ப்பு சக்தி', 'அலங்கார ஆர்வம்'],
      favorableActivities: ['Beauty treatments', 'Artistic creation', 'Fashion design', 'Interior decoration', 'Cultural events'],
      unfavorableActivities: ['Neglecting appearance', 'Ugly behavior', 'Destroying beauty', 'Harsh activities'],
      yogi: {
        name: 'சோபன யோகி',
        englishName: 'Shobhana Yogi',
        direction: 'वायव्य (வடமேற்கு - Northwest)',
        benefits: ['உள்ளழகும் வெளியழகும் அதிகரிப்பு', 'கலைத்திறன் மற்றும் படைப்பாற்றல் வளர்ச்சி', 'ஈர்ப்பு சக்தி மற்றும் வசீகரம் பெருக்கம்', 'அலங்கார ஆர்வம் மற்றும் அழகு உணர்வு வளர்ச்சி'],
        significance: 'வடமேற்கு திசையில் இருந்து வரும் சோபன யோகியின் ஆசீர்வாதம் பெற்றால் உள்ளும் வெளியும் நிரந்தர அழகு பெறலாம்'
      },
      avayogi: {
        name: 'சோபன அவயோகி',
        englishName: 'Shobhana Avayogi',
        direction: 'आग्नेय (தென்கிழக்கு - Southeast)',
        effects: ['அழகு குறைவு மற்றும் தோற்ற பிரச்சினைகள்', 'கலை திறமையின்மை மற்றும் படைப்பாற்றல் இழப்பு', 'ஈர்ப்பின்மை மற்றும் வசீகரமின்மை', 'அலங்கார அக்கறையின்மை மற்றும் அழகு உணர்வின்மை'],
        precautions: 'தென்கிழக்கு திசையை தவிர்த்து அழகு சிகிச்சை, கலை படைப்பு மற்றும் அலங்கார செயல்களை மேற்கொள்ளவும். தென்கிழக்கு பகுதியில் அழகு போட்டி அல்லது கலை நிகழ்வுகளில் பங்கேற்க வேண்டாம்.'
      },
      lifeImpact: {
        career: 'Success in beauty, fashion and arts',
        health: 'Glowing skin and attractive appearance',
        relationships: 'Charming and lovable personality',
        spirituality: 'Finding divine beauty in everything'
      },
      pariharam: {
        dailyPractices: ['Maintain personal beauty', 'Create beautiful things', 'Appreciate natural beauty', 'Practice graceful behavior'],
        offerings: ['Fresh flowers to Venus', 'Beautiful ornaments', 'Artistic creations', 'Perfumes and cosmetics'],
        gems: { primary: 'Rose Quartz', alternative: 'Pink Sapphire', benefits: 'Enhances beauty and artistic talents' },
        mantras: [
          { name: 'Shukra Mantra', text: 'ॐ शुक्राय नमः', count: '108 times' },
          { name: 'Beauty Mantra', text: 'ॐ शोभनाय नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Beauty Recognition', description: 'Recognize inner and outer beauty', details: 'Appreciate beauty in yourself and others' },
        { title: 'Artistic Expression', description: 'Express your creativity', details: 'Create something beautiful daily' },
        { title: 'Grace Cultivation', description: 'Develop graceful behavior', details: 'Practice elegant and refined conduct' }
      ]
    }
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
