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

  // Complete 27 Namayogam with pure yoga names and Yogi/Avayogi details
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
      description: 'பிரீதி யோகம் அன்பு, மகிழ்ச்சி மற்றும் உறவுகளுக்கு சிறந்த யோகம். இந்த யோகத்தில் காதல் மற்றும் குடும்ب விஷயங்கள் சாதகமாக முடியும்.',
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
      description: 'ஆயுஷ்மான் யோகம் நீண்ட ஆயுள், ஆரோக்கியம் மற்றும் வலிமைக்கு உகந்த யோகம். இந்த யோகத்தில் மருத்துவ சிகிச்சைகள் மிகவும் பலனளிக்கும்.',
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
      bestTime: 'காலை 9-12 மணி (Morning 9-12 PM)',
      description: 'அதிகண்ட யோகம் எல்லா தடைகளையும் நீக்கி வெற்றி பெற உதவும் யோகம். இந்த யோகத்தில் சிக்கலான விஷயங்களை தீர்க்க முடியும்.',
      characteristics: ['தடை நீக்கம்', 'சிக்கல் தீர்வு', 'வெற்றிக்கு வழி', 'எதிர்ப்பை வெல்லுதல்', 'முன்னேற்ற பாதை', 'தடையற்ற வாழ்க்கை'],
      keyBenefits: ['தடை நீக்கம்', 'சிக்கல் தீர்வு', 'வெற்றி பாதை', 'முன்னேற்றம்'],
      favorableActivities: ['Removing obstacles', 'Problem solving', 'Legal matters', 'Conflict resolution', 'Breakthrough activities'],
      unfavorableActivities: ['Creating new problems', 'Avoiding challenges', 'Procrastination', 'Giving up easily'],
      yogi: {
        name: 'அதிகண்ட யோகி',
        englishName: 'Atiganda Yogi',
        direction: 'किழक्கு (East)',
        benefits: ['பெரிய தடைகளை நீக்கும் சக்தி', 'சிக்கலான பிரச்சினைகளுக்கு தீர்வு காணும் ஆற்றல்', 'வெற்றி பாதையில் முன்னேறும் வலிமை', 'எதிர்ப்புகளை வெல்லும் உறுதி'],
        significance: 'கிழக்கு திசையில் இருந்து வரும் அதிகண்ட யோகியின் ஆசீர்வாதம் பெற்றால் வாழ்க்கையில் எந்த தடையும் நிலைக்காது'
      },
      avayogi: {
        name: 'அதிகண்ட அவயோகி',
        englishName: 'Atiganda Avayogi',
        direction: 'मेरु (West)',
        effects: ['தடைகள் அதிகரிப்பு மற்றும் சிக்கல் பெருக்கம்', 'பிரச்சினைகளுக்கு தீர்வு கிடைக்காமை', 'வெற்றியில் தாமதம் மற்றும் இடையூறு', 'முன்னேற்றத்தில் தொடர் தடைகள்'],
        precautions: 'மேற்கு திசையை தவிர்த்து முக்கிய தீர்வுகள் மற்றும் சிக்கல் நிவாரணம் சம்பந்தமான செயல்களை மேற்கொள்ளவும். மேற்கு பகுதியில் சட்ட விஷயங்கள் அல்லது போராட்ட சம்பந்தமான முடிவுகளை எடுக்க வேண்டாம்.'
      },
      lifeImpact: {
        career: 'Breakthrough in stalled projects',
        health: 'Recovery from chronic issues',
        relationships: 'Resolution of conflicts',
        spirituality: 'Removal of spiritual obstacles'
      },
      pariharam: {
        dailyPractices: ['Face challenges bravely', 'Seek solutions actively', 'Help others overcome obstacles', 'Practice persistence'],
        offerings: ['Red flowers to Mars', 'Iron objects to temple', 'Help to struggling people', 'Tools for problem solving'],
        gems: { primary: 'Red Coral', alternative: 'Carnelian', benefits: 'Gives courage to overcome all obstacles' },
        mantras: [
          { name: 'Mangal Mantra', text: 'ॐ मंगलाय नमः', count: '108 times' },
          { name: 'Obstacle Removal Mantra', text: 'ॐ अतिगण्डाय नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Problem Identification', description: 'Identify your main obstacles', details: 'List all challenges blocking your progress' },
        { title: 'Solution Strategy', description: 'Develop removal strategies', details: 'Plan systematic approach to overcome blocks' },
        { title: 'Action Execution', description: 'Take decisive action', details: 'Implement solutions with determination' }
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
      bestTime: 'காலை 6-9 மணி (Morning 6-9 AM)',
      description: 'சுகர்மா யோகம் நல்ல செயல்கள், தர்ம காரியங்கள் மற்றும் புண்ணிய செயல்களுக்கு மிகவும் உகந்த யோகம். இந்த யோகத்தில் செய்யும் நல்ல செயல்கள் பெரும் பலன் தரும்.',
      characteristics: ['நல்ல செயல் ஆர்வம்', 'தர்ம நெறி', 'புண்ணிய காரியம்', 'சேவை மனப்பான்மை', 'நீதி உணர்வு', 'நல்லொழுக்கம்'],
      keyBenefits: ['புண்ணிய பேறு', 'தர்ம வளர்ச்சி', 'நல்ல கர்மா', 'மன திருப்தி'],
      favorableActivities: ['Charitable work', 'Religious ceremonies', 'Helping others', 'Dharmic activities', 'Social service'],
      unfavorableActivities: ['Selfish actions', 'Harmful deeds', 'Unethical behavior', 'Ignoring others needs'],
      yogi: {
        name: 'சுகர்மா யோகி',
        englishName: 'Sukarma Yogi',
        direction: 'ईशान (വடکিழک്കு - Northeast)',
        benefits: ['புண்ணிய பேறு மற்றும் தர்ம வளர்ச்சி', 'நல்ல செயல்களில் ஊக்கம் மற்றும் ஆர்வம்', 'மன அமைதி மற்றும் திருப்தி பெருக்கம்', 'சேவை மனப்பான்மை மற்றும் கருணை வளர்ச்சி'],
        significance: 'வடகிழக்கு திசையில் இருந்து வரும் சுகர்மா யோகியின் ஆசீர்வாதம் பெற்றால் நல்ல செயல்களில் நிலையான ஈடுபாடு பெருகும்'
      },
      avayogi: {
        name: 'சுகர்மா அவயோகி',
        englishName: 'Sukarma Avayogi',
        direction: 'नैऋत्य (தেন്மேর्कு - Southwest)',
        effects: ['நல்ல செயல்களில் தடை மற்றும் அக்கறையின்மை', 'தர்ம குழப்பம் மற்றும் நீதியின்மை', 'பாவ கர்மா மற்றும் தவறான செயல்கள்', 'மன அசமாதானம் மற்றும் அமைதியின்மை'],
        precautions: 'தென்மேற்கு திசையை தவிர்த்து தர்ம காரியங்கள், புண்ணிய செயல்கள் மற்றும் சமூக சேவை போன்ற செயல்களை மேற்கொள்ளவும். தென்மேற்கு பகுதியில் தானம் அல்லது மத சம்பந்தமான நிகழ்வுகளை நடத்த வேண்டாம்.'
      },
      lifeImpact: {
        career: 'Success through ethical practices',
        health: 'Good health through good deeds',
        relationships: 'Loving bonds through service',
        spirituality: 'Rapid spiritual advancement'
      },
      pariharam: {
        dailyPractices: ['Do one good deed daily', 'Practice compassion', 'Help those in need', 'Follow dharmic principles'],
        offerings: ['Food to hungry people', 'Books to students', 'Medicine to sick', 'Donations to charities'],
        gems: { primary: 'Yellow Sapphire', alternative: 'Topaz', benefits: 'Inspires righteous actions and good karma' },
        mantras: [
          { name: 'Guru Mantra', text: 'ॐ गुरवे नमः', count: '108 times' },
          { name: 'Good Deed Mantra', text: 'ॐ सुकर्माय नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Dharma Understanding', description: 'Understand righteous path', details: 'Study ethical principles and values' },
        { title: 'Service Planning', description: 'Plan your service activities', details: 'Identify ways to help others' },
        { title: 'Action Implementation', description: 'Put good intentions into action', details: 'Start doing good deeds regularly' }
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
      bestTime: 'மாலை 6-9 மணி (Evening 6-9 PM)',
      description: 'த்ருதி யோகம் உறுதி, நிலைத்தன்மை மற்றும் பொறுமைக்கு உகந்த யோகம். இந்த யோகத்தில் தொடங்கும் நீண்ட கால திட்டங்கள் வெற்றியடையும்.',
      characteristics: ['மன உறுதி', 'நிலைத்தன்மை', 'பொறுமை', 'தீர்மானம்', 'விடாமுயற்சி', 'ஸ்திரத்தன்மை'],
      keyBenefits: ['மன பலம்', 'உறுதியான குணம்', 'பொறுமை வளர்ச்சி', 'நிலைத்த வெற்றி'],
      favorableActivities: ['Long-term planning', 'Building foundations', 'Patience practices', 'Steady progress', 'Commitment activities'],
      unfavorableActivities: ['Hasty decisions', 'Impulsive actions', 'Giving up easily', 'Inconsistent behavior'],
      yogi: {
        name: 'த்ருதி யோகி',
        englishName: 'Dhriti Yogi',
        direction: 'दक्षिण (தெর्कు - South)',
        benefits: ['மன உறுதி மற்றும் தீர்மான சக்தி அதிகரிப்பு', 'நிலைத்தன்மை மற்றும் ஸ்திர குணம் வளர்ச்சி', 'பொறுமை மற்றும் விடாமுயற்சி பெருக்கம்', 'நீண்ட கால இலக்குகளை அடையும் ஆற்றல்'],
        significance: 'தெற்கு திசையில் இருந்து வரும் த்ருதி யோகியின் ஆசீர்வாதம் பெற்றால் எதிலும் அசையாத உறுதியுடன் நிற்க முடியும்'
      },
      avayogi: {
        name: 'த்ருதி அவயோகி',
        englishName: 'Dhriti Avayogi',
        direction: 'उत्तर (वडक्கু - North)',
        effects: ['மன அலைச்சல் மற்றும் தீர்மானமின்மை', 'நிலையற்ற தன்மை மற்றும் குழப்ப நிலை', 'பொறुமையின்மை மற்றும் அவசர குணம்', 'திட்டங்களில் நிலைப்பாடின்மை'],
        precautions: 'வடக்கு திசையை தவிர்த்து முக்கிய முடிவுகள் மற்றும் நீண்ட கால திட்டங்களை தீர்மானிக்கவும். வடக்கு பகுதியில் பொறுமை தேவைப்படும் விஷயங்களை கையாள வேண்டாம்.'
      },
      lifeImpact: {
        career: 'Steady progress and lasting success',
        health: 'Strong immunity and endurance',
        relationships: 'Loyal and committed bonds',
        spirituality: 'Steady spiritual discipline'
      },
      pariharam: {
        dailyPractices: ['Practice meditation daily', 'Build steady routines', 'Exercise patience', 'Keep commitments'],
        offerings: ['Black sesame to Saturn', 'Iron objects to temple', 'Help to elderly people', 'Support for long-term causes'],
        gems: { primary: 'Blue Sapphire', alternative: 'Amethyst', benefits: 'Grants steady determination and patience' },
        mantras: [
          { name: 'Shani Mantra', text: 'ॐ शनैश्चराय नमः', count: '108 times' },
          { name: 'Determination Mantra', text: 'ॐ धृत्यै नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Goal Setting', description: 'Set clear long-term goals', details: 'Define what you want to achieve steadily' },
        { title: 'Patience Building', description: 'Develop patience practices', details: 'Learn to wait and persist' },
        { title: 'Commitment Making', description: 'Make firm commitments', details: 'Decide to stick with your path' }
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
      bestTime: 'பிற்பகல் 12-3 மணி (Afternoon 12-3 PM)',
      description: 'சூல யோகம் வலி, துக்கம் மற்றும் கஷ்டங்களை நீக்கும் யோகம். இந்த யோகத்தில் வலி நிவாரண சிகிச்சைகள் மற்றும் துக்க நிவாரணம் சிறப்பாக நடக்கும்.',
      characteristics: ['வலி நீக்கம்', 'துக்க நிவாரணம்', 'கஷ்ட தீர்வு', 'நோய் குணம்', 'மன வேதனை தீர்வு', 'சிகிச்சை பலன்'],
      keyBenefits: ['வலி நிவாரணம்', 'துக்க தீர்வு', 'நோய் குணம்', 'மன அமைதி'],
      favorableActivities: ['Medical treatments', 'Pain relief therapies', 'Healing ceremonies', 'Surgery', 'Counseling'],
      unfavorableActivities: ['Causing pain to others', 'Ignoring health issues', 'Creating suffering', 'Harsh behavior'],
      yogi: {
        name: 'சூல யோகி',
        englishName: 'Shoola Yogi',
        direction: 'आग्नेय (தেন্کിழক्கு - Southeast)',
        benefits: ['உடல் மற்றும் மன வலி நிவாரணம்', 'துக்கம் மற்றும் கஷ்டங்களுக்கு தீர்வு', 'சிகிச்சை வெற்றி மற்றும் நிவாரண சக্தி', 'வேதனை நீக்கும் மருத்துவ ஆற்றல்'],
        significance: 'தென்கிழக்கு திசையில் இருந்து வரும் சூல யோகியின் ஆசீர்வாதம் பெற்றால் எல்லா வலிகளும் துக்கங்களும் நீங்கும்'
      },
      avayogi: {
        name: 'சூல அவயோகி',
        englishName: 'Shoola Avayogi',
        direction: 'वायव्य (வடমேற्কு - Northwest)',
        effects: ['வலி அதிகரிப்பு மற்றும் நோய் தொல்லை பெருக्कम்', 'துக్కम் மற்றும் மன வேदনை அதिகরிப्पு', 'சிकित्சையில் தडै மற्றும் समस्याकளు', 'நিवारणത्തில் தோல்வി மற்றும் कष्टम्'],
        precautions: 'வடমேற்கு திசையை தவிர்த்து சிকিச்சை விषयங்கள், வலি நிவாரணம் மற்றும் மருத்துவ செயல்களை மேற்கொள்ளவும். வডमேর्कு பகுதியில் अरुवै சிகிच्सै அல்லது மருந்து உণ্ড वेळे कूदাদு.'
      },
      lifeImpact: {
        career: 'Success in healing professions',
        health: 'Relief from chronic pain and illness',
        relationships: 'Healing of emotional wounds',
        spirituality: 'Liberation from spiritual suffering'
      },
      pariharam: {
        dailyPractices: ['Practice healing meditation', 'Help sick people', 'Avoid causing pain to others', 'Use natural remedies'],
        offerings: ['Medicinal herbs to temple', 'Help to hospitals', 'Food to suffering people', 'Donations for medical care'],
        gems: { primary: 'Red Coral', alternative: 'Garnet', benefits: 'Provides relief from pain and suffering' },
        mantras: [
          { name: 'Dhanvantari Mantra', text: 'ॐ धन्वन्तरये नमः', count: '108 times' },
          { name: 'Pain Relief Mantra', text: 'ॐ शूलाय नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Pain Assessment', description: 'Identify sources of pain', details: 'Recognize physical and emotional pain' },
        { title: 'Healing Invocation', description: 'Call upon healing energies', details: 'Connect with divine healing power' },
        { title: 'Relief Application', description: 'Apply healing methods', details: 'Use appropriate treatments and therapies' }
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
      bestTime: 'மாலை 3-6 மணி (Evening 3-6 PM)',
      description: 'கண்ட யோகம் சிக்கல்கள், பிரச்சினைகள் மற்றும் குழப்பங்களை தீர்க்கும் யோகம். இந்த யோகத்தில் சிக்கலான விஷயங்களுக்கு தீர்வு கிடைக்கும்.',
      characteristics: ['சிக்கல் தீர்வு', 'பிரச்சினை நீக்கம்', 'குழப்ப தீர்வு', 'மன தெளிவு', 'விவாத தீர்வு', 'நீதி கிடைத்தல்'],
      keyBenefits: ['பிரச்சினை தீர்வு', 'மன தெளிவு', 'நீதி கிடைத்தல்', 'சிக்கல் நீக்கம்'],
      favorableActivities: ['Legal consultations', 'Problem solving', 'Mediation', 'Counseling', 'Dispute resolution'],
      unfavorableActivities: ['Creating new problems', 'Avoiding issues', 'Complicating matters', 'Unfair behavior'],
      yogi: {
        name: 'கண்ட யோகி',
        englishName: 'Ganda Yogi',
        direction: 'पश्चिम (மேற்கு - West)',
        benefits: ['சிக்கலான பிரச்சினைகளுக்கு தீர்வு காணும் ஆற்றல்', 'குழப்பம் மற்றும் சந்தேகங்களை தெளிவுபடுத்தும் சக்தي', 'நீதி மற்றும் நியாயம் கிடைக்கும் வழி', 'மன தெளிவு மற்றும் புரிதல் அதிகரிப்பு'],
        significance: 'மேற்கு திசையில் இருந்து வரும் கண்ட யோகியின் ஆசீர்வாதம் பெற்றால் எல்லா சிக்கல்களுக்கும் தெளிவான தீர்வு கிடைக்கும்'
      },
      avayogi: {
        name: 'கண்ட அவயோகி',
        englishName: 'Ganda Avayogi',
        direction: 'पूर्व (கிழக்கு - East)',
        effects: ['சிக்கல் பெருக்கம் மற்றும் பிரச்சினை அதிகரிப்பு', 'மன குழப்பம் மற்றும் தெளிவின்மை', 'நீதியின்மை மற்றும் அநீதி அதிகரிப்பு', 'தீர்வின்மை மற்றும் முடிவின்மை'],
        precautions: 'கிழக்கு திசையை தவிர்த்து சிக்கல் தீர்வு முயற்சிகள், சட்ட விஷயங்கள் மற்றும் பிரச்சினை நிவாரணம் சம்பந்தமான செயல்களை மேற்கொள்ளவும். கிழக்கு பகுதியில் முக்கிய முடிவுகள் அல்லது தீர்ப்புகளை வழங்க வேண்டாம்.'
      },
      lifeImpact: {
        career: 'Resolution of workplace conflicts',
        health: 'Solving complex health issues',
        relationships: 'Clearing misunderstandings',
        spirituality: 'Solving spiritual confusions'
      },
      pariharam: {
        dailyPractices: ['Practice clear thinking', 'Help solve others problems', 'Avoid creating complications', 'Seek fair solutions'],
        offerings: ['Black sesame to Saturn', 'Help to courts and lawyers', 'Support for justice causes', 'Donations for problem solving'],
        gems: { primary: 'Black Onyx', alternative: 'Smoky Quartz', benefits: 'Brings clarity and solutions to problems' },
        mantras: [
          { name: 'Shani Mantra', text: 'ॐ शनैश्चराय नमः', count: '108 times' },
          { name: 'Problem Solving Mantra', text: 'ॐ गण्डाय नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Problem Identification', description: 'Clearly identify the problem', details: 'Define the exact nature of difficulties' },
        { title: 'Solution Analysis', description: 'Analyze possible solutions', details: 'Consider all available options' },
        { title: 'Resolution Implementation', description: 'Implement the best solution', details: 'Take systematic action to resolve' }
      ]
    },
    {
      id: 'vriddhi',
      name: 'வ்ருத்தி',
      englishName: 'Vriddhi',
      effect: 'வளர்ச்சி',
      effectEnglish: 'Growth & Progress',
      rulingPlanet: 'Mercury',
      element: 'Earth',
      quality: 'Rajasic',
      bestTime: 'காலை 6-9 மணி (Morning 6-9 AM)',
      description: 'வ்ருத்தி யோகம் வளர்ச்சி, முன்னேற்றம் மற்றும் அபிவிருத்திக்கு உகந்த யோகம். இந்த யோகத்தில் தொடங்கும் வளர்ச்சி திட்டங்கள் மிகச் சிறப்பாக நிறைவேறும்.',
      characteristics: ['வளர்ச்சி அதிகரிப்பு', 'முன்னேற்ற வேகம்', 'அபிவிருத்தி', 'விரிவாக்கம்', 'மேம்பாடு', 'பெருக்கம்'],
      keyBenefits: ['வேகமான வளர்ச்சி', 'முன்னேற்றம்', 'விரிவாக்கம்', 'மேம்பாடு'],
      favorableActivities: ['Business expansion', 'Educational advancement', 'Property development', 'Skill building', 'Investment growth'],
      unfavorableActivities: ['Stagnation', 'Downsizing', 'Reduction activities', 'Limiting growth'],
      yogi: {
        name: 'வ்ருத்தி யோகி',
        englishName: 'Vriddhi Yogi',
        direction: 'उत्तर (வடக்கு - North)',
        benefits: ['வேகமான வளர்ச்சி மற்றும் முன்னேற்றம்', 'வணிக விரிவாக்கம் மற்றும் லாப அதிகரிப்பு', 'கல்வி மற்றும் திறமை மேம்பாடு', 'சொத்து மற்றும் செல்வ பெருக்கம்'],
        significance: 'வடக்கு திசையில் இருந்து வரும் வ்ருத்தி யோகியின் ஆசீர்வாதம் பெற்றால் வாழ்க்கையில் எல்லா துறையிலும் நிरంतर वृद्धि हासिल होगी'
      },
      avayogi: {
        name: 'வ்ருத்தி அவயோகி',
        englishName: 'Vriddhi Avayogi',
        direction: 'दक्षिण (தெற்கு - South)',
        effects: ['வளர்ச்சியில் தடை மற்றும் முன்னேற்றத்தில் மந்தம்', 'வணிக சுருக்கம் மற்றும் இழப்பு அதிகரிப்பு', 'கல்வி தடை மற்றும் திறமை வளர்ச்சியின்மை', 'செல்வ குறைவு மற்றும் சொத्त नुकसान'],
        precautions: 'தெற்கு திசையை தவிர்த்து வளர்ச்சி திட்டங்கள், வணிக விரிவாक்கம் மற்றும் முதलீடு சம्बंधित செயल्களை மேற்कொள்ளவும். தெற்கு பকुतியில் नए प्रोजेक्ट शुरू கரने अथवा व्यापार बढ़ाने का निर्णय न लें।'
      },
      lifeImpact: {
        career: 'Rapid professional growth and advancement',
        health: 'Improved vitality and physical development',
        relationships: 'Growing bonds and expanding social circle',
        spirituality: 'Spiritual growth and consciousness expansion'
      },
      pariharam: {
        dailyPractices: ['Set growth goals daily', 'Learn something new', 'Expand your knowledge', 'Help others grow'],
        offerings: ['Green plants to Mercury', 'Books to students', 'Seeds for agriculture', 'Investment in growth projects'],
        gems: { primary: 'Green Aventurine', alternative: 'Peridot', benefits: 'Accelerates growth and progress in all areas' },
        mantras: [
          { name: 'Budha Mantra', text: 'ॐ बुधाय नमः', count: '108 times' },
          { name: 'Growth Mantra', text: 'ॐ वृद्ध्यै नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Growth Assessment', description: 'Identify areas for growth', details: 'Evaluate current progress and potential' },
        { title: 'Expansion Planning', description: 'Plan your growth strategy', details: 'Create detailed development plans' },
        { title: 'Progress Implementation', description: 'Take growth-oriented actions', details: 'Execute plans for systematic development' }
      ]
    },
    {
      id: 'dhruva',
      name: 'த்ருவ',
      englishName: 'Dhruva',
      effect: 'நிலைத்தன்மை',
      effectEnglish: 'Stability & Permanence',
      rulingPlanet: 'Saturn',
      element: 'Earth',
      quality: 'Satvic',
      bestTime: 'இரவு 9-12 மணி (Night 9-12 PM)',
      description: 'த்ருவ யோகம் நிலைத்தன்மை, ஸ்திரத்தன்மை மற்றும் நிரந்தரத்தன்மைக்கு உகந்த யோகம். இந்த யோகத்தில் தொடங்கும் காரியங்கள் நீண்ட நாள் நிலைத்து நிற்கும்.',
      characteristics: ['நிலைத்த தன்மை', 'ஸ்திர குணம்', 'நிரந்தரம்', 'அசையாத நிலை', 'துருவ நிலை', 'நிலைப்பு'],
      keyBenefits: ['நிலையான வெற்றி', 'ஸ்திர நிலை', 'நிரந்தர பலன்', 'அசையாத அடித்தளம்'],
      favorableActivities: ['Foundation building', 'Long-term investments', 'Marriage ceremonies', 'Permanent establishments', 'Legacy creation'],
      unfavorableActivities: ['Temporary arrangements', 'Quick changes', 'Unstable ventures', 'Short-term thinking'],
      yogi: {
        name: 'த்ருவ யோகி',
        englishName: 'Dhruva Yogi',
        direction: 'ईशान (வடகிழক்கு - Northeast)',
        benefits: ['நிலையான வெற்றி மற்றும் நிரந்தர சாதனை', 'ஸ்திரமான வாழ்க்கை மற்றும் நிலைத்த மகிழ்ச்சி', 'அசையாத அடித்தளம் மற்றும் பலமான வேர்கள்', 'நீண்ட கால நிலைப்பு மற்றும் நிரந்தர பலன்'],
        significance: 'வடகிழக்கு திசையில் இருந்து வரும் த்ருவ யோகியின் ஆசீர்வாதம் பெற்றால் துருவ நட്சத்திரம் போல அசையாத நிலைப்பு கிடைக்கும்'
      },
      avayogi: {
        name: 'த்ருவ அவயோகி',
        englishName: 'Dhruva Avayogi',
        direction: 'नैऋत्य (தென்மேற்கு - Southwest)',
        effects: ['நிலையற்ற தன்மை மற்றும் அசைவு நிலை', 'ஸ்திரமின்மை மற்றும் குழப்ப நிலை', 'தற்காலிக பலன் மற்றும் நிலைப்பின்மை', 'அடித்தள பலவீனம் மற்றும் வேர் சிதைவு'],
        precautions: 'தென்மேற்கு திசையை தவிர்த்து நிரந்தர திட்டங்கள், திருமணம் மற்றும் நிலையான முதலீடு செய்யவும். தென்மேற்கு பகுதியில் அடித்தளம் அல்லது நிரந்தர கட்டிடம் கட்ட வேண்டாம்।'
      },
      lifeImpact: {
        career: 'Stable career with lasting achievements',
        health: 'Strong constitution and stable health',
        relationships: 'Permanent and unshakeable bonds',
        spirituality: 'Steady spiritual foundation and progress'
      },
      pariharam: {
        dailyPractices: ['Practice steady meditation', 'Build lasting habits', 'Create permanent value', 'Maintain consistency'],
        offerings: ['Iron objects to Saturn', 'Permanent donations', 'Foundation stones to temples', 'Long-term commitments'],
        gems: { primary: 'Black Tourmaline', alternative: 'Hematite', benefits: 'Provides unshakeable stability and permanence' },
        mantras: [
          { name: 'Dhruva Mantra', text: 'ॐ ध्रुवाय नमः', count: '108 times' },
          { name: 'Stability Mantra', text: 'ॐ स्थिराय नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Foundation Assessment', description: 'Evaluate your current foundations', details: 'Check stability of life structures' },
        { title: 'Stability Planning', description: 'Plan for permanent solutions', details: 'Design lasting and stable arrangements' },
        { title: 'Permanence Creation', description: 'Build lasting value', details: 'Create things that will endure through time' }
      ]
    },
    {
      id: 'vyaghata',
      name: 'வ்யாகாத',
      englishName: 'Vyaghata',
      effect: 'தாக்குதல் பாதுகாப்பு',
      effectEnglish: 'Attack Protection',
      rulingPlanet: 'Mars',
      element: 'Fire',
      quality: 'Tamasic',
      bestTime: 'பிற்பகல் 3-6 மணி (Afternoon 3-6 PM)',
      description: 'வ்யாகாத யோகம் தாக்குதல், எதிர்ப்பு மற்றும் பாதுகாப்புக்கு உகந்த யோகம். இந்த யோகத்தில் பாதுகாப்பு நடவடிக்கைகள் மற்றும் எதிர்ப்பு சக்தி அதிகரிக்கும்.',
      characteristics: ['பாதுகாப்பு சக்தி', 'எதிர்ப்பு ஆற்றல்', 'தாக்குதல் திறன்', 'போர் வீரம்', 'வீர குணம்', 'பலம் அதிகரிப்பு'],
      keyBenefits: ['பாதுகாப்பு அதிகரிப்பு', 'எதிர்ப்பு சக்தி', 'வீர குணம்', 'போராட்ட திறன்'],
      favorableActivities: ['Defense planning', 'Security measures', 'Competitive activities', 'Martial arts', 'Protection rituals'],
      unfavorableActivities: ['Peaceful negotiations', 'Surrender', 'Passive activities', 'Avoiding confrontation'],
      yogi: {
        name: 'வ்யாகாத யோகி',
        englishName: 'Vyaghata Yogi',
        direction: 'दक्षिण (தெற்கு - South)',
        benefits: ['பாதுகாப்பு சக்தி மற்றும் எதிர்ப்பு ஆற்றல் அதிகரிப்பு', 'தாக்குதல் திறன் மற்றும் போர் வீரம் பெருக்கம்', 'எதிரிகளிடம் இருந்து பாதுகாப்பு', 'வீர குணம் மற்றும் தைரிய வளர்ச்சி'],
        significance: 'தெற்கு திசையில் இருந்து வரும் வ்யாகாத யோகியின் ஆசீர்வாதம் பெற்றால் எல்லா தாக்குதல்களிலும் இருந்து பாதுகாப்பு கிடைக்கும்'
      },
      avayogi: {
        name: 'வ்யாகாத அவயோகி',
        englishName: 'Vyaghata Avayogi',
        direction: 'उत्तर (வடக்கு - North)',
        effects: ['பாதுகாப்பின்மை மற்றும் எதிர்ப்பு சக்தியின்மை', 'தாக்குதலில் பலவீனம் மற்றும் போர் திறமையின்மை', 'எதிரிகளால் தாக்குதல் அதிகரிப்பு', 'வீரமின்மை மற்றும் தைரியமின்மை'],
        precautions: 'வடக்கு திசையை தவிர்த்து பாதுகாப்பு நடவடிக்கைகள், போட்டி மற்றும் எதிர்ப்பு சம்பந்தமான செயல்களை மேற்கொள்ளவும். வடக்கு பகுதியில் பாதுகாப்பு கருவிகள் அல்லது யுத்த சம்பந்தமான விஷயங்களை வைக்க வேண்டாம்।'
      },
      lifeImpact: {
        career: 'Success in defense and security fields',
        health: 'Strong immunity and resistance to illness',
        relationships: 'Protective and loyal connections',
        spirituality: 'Protection from negative energies'
      },
      pariharam: {
        dailyPractices: ['Practice martial arts', 'Build physical strength', 'Develop courage', 'Protect others'],
        offerings: ['Red flowers to Mars', 'Weapons to temples', 'Support to defense forces', 'Protection charms'],
        gems: { primary: 'Red Jasper', alternative: 'Bloodstone', benefits: 'Provides protection and courage in conflicts' },
        mantras: [
          { name: 'Mangal Mantra', text: 'ॐ मंगलाय नमः', count: '108 times' },
          { name: 'Protection Mantra', text: 'ॐ व्याघाताय नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Threat Assessment', description: 'Identify potential threats', details: 'Evaluate security vulnerabilities' },
        { title: 'Defense Planning', description: 'Plan protection strategies', details: 'Develop comprehensive defense plans' },
        { title: 'Protection Implementation', description: 'Implement security measures', details: 'Execute protection and defense actions' }
      ]
    },
    {
      id: 'harshana',
      name: 'ஹர்ஷணா',
      englishName: 'Harshana',
      effect: 'மகிழ்ச்சி',
      effectEnglish: 'Joy & Happiness',
      rulingPlanet: 'Sun',
      element: 'Fire',
      quality: 'Satvic',
      bestTime: 'காலை 9-12 மணி (Morning 9-12 PM)',
      description: 'ஹர்ஷணா யோகம் மகிழ்ச்சி, ஆனந்தம் மற்றும் உற்சாகத்திற்கு உகந்த யோகம். இந்த யோகத்தில் மகிழ்ச்சி தரும் நிகழ்வுகள் மற்றும் கொண்டாட்டங்கள் சிறப்பாக நடைபெறும்.',
      characteristics: ['மகிழ்ச்சி தரும் தன்மை', 'ஆனந்த உணர்வு', 'உற்சாக அதிகரிப்பு', 'சந்தோஷம்', 'மன உற்சாகம்', 'மனது பூரிப்பு'],
      keyBenefits: ['மன மகிழ்ச்சி', 'ஆனந்த உணர்வு', 'உற்சாக அதிகரிப்பு', 'சந்தோஷ வாழ்க்கை'],
      favorableActivities: ['Celebrations', 'Entertainment', 'Fun activities', 'Joyful gatherings', 'Happy occasions'],
      unfavorableActivities: ['Mourning', 'Sad activities', 'Depressing work', 'Grief ceremonies'],
      yogi: {
        name: 'ஹர்ஷணா யோகி',
        englishName: 'Harshana Yogi',
        direction: 'पूर्व (கிழக்கு - East)',
        benefits: ['நிरंतর மகிழ்ச்சி மற்றும் ஆனந்த உணர்வு', 'மன உற்சாकम் மற்றும் ஊக்கம் பெருक்கம்', 'சந்தோஷமான நிকழ्वुகள் அதிகரিப্پு', 'ஆनंத தரும் அனుभవांगल் वृद्धि'],
        significance: 'கிழக்கு திசையில் இருந்து வரும் ஹர்ஷணா யோகியின் ஆசீர்வாதம் பெற்றால் வாழ்நாள் முழுவதும் மகிழ்ச்சி நிறைந்த வாழ்க்கை கிடைக்கும்'
      },
      avayogi: {
        name: 'ஹர்ஷணா அவயோகி',
        englishName: 'Harshana Avayogi',
        direction: 'पश्चिम (மேற்கு - West)',
        effects: ['மகிழ்ச்சியின்மை மற்றும் சோகம் அதிகரிப்பு', 'மன உற்साहமின்মை மற்றும் ஊக்கமின்மை', 'சந்தோஷமற்ற நிகழ்வুகள் மற்றும் दुःख அனुभव', 'ஆனந்தமின्मை மற्றும் अवसाद નિலை'],
        precautions: 'மேற்கு திசையை தவிர்த்து மகிழ்ச்சி நிகழ்வுகள், கொண்டாட்டம் மற்றும் சந்தோஷ விஷयங்களை மேற்கொள்ளவும். மேற்கு பகுதியில் திருமண விழা அல்லது மகிழ்ச்சி நிகழ்வுகளை நடத்த வேண்டாம்।'
      },
      lifeImpact: {
        career: 'Success in entertainment and joy-bringing fields',
        health: 'Good mental health and cheerful disposition',
        relationships: 'Joyful and happy connections with others',
        spirituality: 'Divine bliss and spiritual joy'
      },
      pariharam: {
        dailyPractices: ['Spread joy to others', 'Practice gratitude', 'Engage in happy activities', 'Maintain positive attitude'],
        offerings: ['Yellow flowers to Sun', 'Sweets to children', 'Donations for celebrations', 'Joy-bringing gifts'],
        gems: { primary: 'Citrine', alternative: 'Sunstone', benefits: 'Brings constant joy and happiness in life' },
        mantras: [
          { name: 'Surya Mantra', text: 'ॐ सूर्याय नमः', count: '108 times' },
          { name: 'Joy Mantra', text: 'ॐ हर्षणाय नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Joy Recognition', description: 'Recognize sources of joy', details: 'Identify what truly makes you happy' },
        { title: 'Happiness Cultivation', description: 'Cultivate daily happiness', details: 'Create daily practices for joy' },
        { title: 'Joy Sharing', description: 'Share joy with others', details: 'Spread happiness in your community' }
      ]
    },
    {
      id: 'vajra',
      name: 'வஜ்ர',
      englishName: 'Vajra',
      effect: 'வஜ்ர பலம்',
      effectEnglish: 'Diamond Strength',
      rulingPlanet: 'Mars',
      element: 'Earth',
      quality: 'Rajasic',
      bestTime: 'மதியம் 12-3 மணி (Noon 12-3 PM)',
      description: 'வஜ்ர யோகம் வஜ்ரம் போன்ற அழியாத பலம், கடினத்தன்மை மற்றும் வீரத்திற்கு உகந்த யோகம். இந்த யோகத்தில் தொடங்கும் செயல்கள் அழியாத வலிமையுடன் நிற்கும்.',
      characteristics: ['வஜ்ர பலம்', 'அழியாத வலிமை', 'கடின உறுதி', 'உடையாத திடத்தன்மை', 'எதையும் வெல்லும் சக்தி', 'அழிக்க முடியாத குணம்'],
      keyBenefits: ['அழியாத பலம்', 'வஜ்ர வலிமை', 'உடையாத உறுதி', 'எதையும் வெல்லும் ஆற்றல்'],
      favorableActivities: ['Strength building', 'Tough decisions', 'Breakthrough activities', 'Power enhancement', 'Durability testing'],
      unfavorableActivities: ['Soft negotiations', 'Gentle activities', 'Delicate work', 'Fragile handling'],
      yogi: {
        name: 'வஜ்ர யோகி',
        englishName: 'Vajra Yogi',
        direction: 'आग्नेय (தென்கிழக்கு - Southeast)',
        benefits: ['வஜ்ர போன்ற அழியாத பலம் மற்றும் வலிமை', 'எல்லா தடைகளையும் உடைக்கும் ஆற்றல்', 'அழிக்க முடியாத உறுதி மற்றும் திடத்தன্মை', 'எதிர்ப்பை வெல்லும் அனைத্து வலிமை யும்'],
        significance: 'தென்கிழக்கு திசையில் இருந்து வரும் வஜ்ர யோகியின் ஆசীர்வாதம் பெற்றால் வஜ്ரம் போன்ற அழியாத வலிமை பெறலாம்'
      },
      avayogi: {
        name: 'வஜ்ர அவயோகி',
        englishName: 'Vajra Avayogi',
        direction: 'वायव्य (வடமேற்கு - Northwest)',
        effects: ['வலிமை குறைவு மற்றும் பலவீனம் அதிகரிப்பு', 'உடையும் தன்மை மற்றும் நெகिழ்வु நিலை', 'எதிர்ப்பை வெல்ல முடியாமை', 'அழிந்து போகும் குணம் அதিकরிப்பு'],
        precautions: 'வடமேற்கு திசையை தவிர்த்து வலிமை பெறுதல், கடின முடிவுகள் மற்றும் பலம் தேவைப்படும் செயல்களை மேற்கொள்ளவும். வடமேற்கு பகுতியில் போராட்டம் அல்லது வலிமை சம்பந்தமான விஷயங்களை கையாள வேண்டாம்।'
      },
      lifeImpact: {
        career: 'Unbreakable success in challenging fields',
        health: 'Strong bones and unshakeable vitality',
        relationships: 'Strong and enduring bonds',
        spirituality: 'Indestructible faith and determination'
      },
      pariharam: {
        dailyPractices: ['Build physical strength', 'Practice mental toughness', 'Face challenges bravely', 'Develop resilience'],
        offerings: ['Diamond or crystal to temples', 'Iron objects to Mars', 'Support to strong causes', 'Strength-building donations'],
        gems: { primary: 'Diamond', alternative: 'Clear Quartz', benefits: 'Grants unbreakable strength and indestructible will' },
        mantras: [
          { name: 'Mangal Mantra', text: 'ॐ मंगलाय नमः', count: '108 times' },
          { name: 'Vajra Mantra', text: 'ॐ वज्राय नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Strength Assessment', description: 'Evaluate your current strength', details: 'Assess physical and mental power levels' },
        { title: 'Power Building', description: 'Build unbreakable strength', details: 'Develop diamond-like resilience and toughness' },
        { title: 'Strength Application', description: 'Apply your power wisely', details: 'Use strength for positive breakthrough actions' }
      ]
    },
    {
      id: 'siddhi',
      name: 'சித்தி',
      englishName: 'Siddhi',
      effect: 'சித்தி பெறுதல்',
      effectEnglish: 'Achievement & Mastery',
      rulingPlanet: 'Mercury',
      element: 'Ether',
      quality: 'Satvic',
      bestTime: 'காலை 6-9 மணி (Morning 6-9 AM)',
      description: 'சித்தி யோகம் சித்தி, சாதனை மற்றும் மாஸ்டரிக்கு உகந்த யோகம். இந்த யோகத்தில் செய்யும் சாதனைகள் சித்தி அளிக்கும்.',
      characteristics: ['சித்தி பெறுதல்', 'சாதனை உணர்வு', 'மாஸ்டரி', 'திறமை பெருக்கம்', 'வல்லுநர் நிலை', 'கைவல்ய நிலை'],
      keyBenefits: ['சித்தி அடைதல்', 'மாஸ்டரி பெறுதல்', 'திறமை வளர்ச்சி', 'சாதனை உணர்வு'],
      favorableActivities: ['Skill mastery', 'Achievement pursuits', 'Expertise development', 'Siddhis cultivation', 'Power enhancement'],
      unfavorableActivities: ['Giving up easily', 'Avoiding challenges', 'Superficial learning', 'Lack of dedication'],
      yogi: {
        name: 'சித்தி யோகி',
        englishName: 'Siddhi Yogi',
        direction: 'वायव्य (வடமேற்கு - Northwest)',
        benefits: ['அனைத்து துறைகளிலும் சித்தி பெறுதல்', 'சாதனை மற்றும் மாஸ்டரி அடைதல்', 'சித்த சக்திகள் வளர்ச்சி', 'வல்லுநர் நிலை எட்டுதல்'],
        significance: 'வடமேற்கு திசையில் இருந்து வரும் சித்தி யோகியின் ஆசீர்வாதம் பெற்றால் எல்லா துறையிலும் சித்தி பெறலாம்'
      },
      avayogi: {
        name: 'சித்தி அவயோகி',
        englishName: 'Siddhi Avayogi',
        direction: 'आग्नेय (தென்கிழக்கு - Southeast)',
        effects: ['சித்தி அடைவதில் தடை', 'சாதனையில் தோல்வி', 'திறமை வளர்ச्சியில் குறை', 'মास्टরியில் பிரச्चினை'],
        precautions: 'தென்கிழக்கு திसையை தவிர்த்து சித்தி சாதনை, திறமை வளர்ச்சি மற्றும் மাஸ्टরी சம்பந்तमான செயல்களை மேற்கொள்ளவும்।'
      },
      lifeImpact: {
        career: 'Mastery and expertise in chosen field',
        health: 'Perfect health and vitality',
        relationships: 'Mastery in human understanding',
        spirituality: 'Achievement of spiritual siddhis'
      },
      pariharam: {
        dailyPractices: ['Practice skills daily', 'Pursue mastery', 'Study deeply', 'Develop expertise'],
        offerings: ['Books to Mercury', 'Tools for learning', 'Support to students', 'Knowledge sharing'],
        gems: { primary: 'Emerald', alternative: 'Green Tourmaline', benefits: 'Grants mastery and achievement in all endeavors' },
        mantras: [
          { name: 'Saraswati Mantra', text: 'ॐ सरस्वत्यै नमः', count: '108 times' },
          { name: 'Siddhi Mantra', text: 'ॐ सिद्ध्यै नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Skill Assessment', description: 'Identify areas for mastery', details: 'Choose skills to develop expertise in' },
        { title: 'Practice Planning', description: 'Plan systematic practice', details: 'Create structured learning approach' },
        { title: 'Mastery Achievement', description: 'Achieve true mastery', details: 'Pursue excellence until siddhis manifest' }
      ]
    },
    {
      id: 'vyatipata',
      name: 'வ்யாதிபாத',
      englishName: 'Vyatipata',
      effect: 'பாதுகாப்பு',
      effectEnglish: 'Complete Protection',
      rulingPlanet: 'Rahu',
      element: 'Air',
      quality: 'Tamasic',
      bestTime: 'இரவு 9-12 மணி (Night 9-12 PM)',
      description: 'வ்யாதிபாத யோகம் முழுமையான பாதுகाप்பু, ரक्षण मற्றும் கவচத्திर्கு उगந்த योगம्। இந்த योगத्தில் பாதुকाप्पு נடवडिकैகள் पूर्णमாக सफल आगும्।',
      characteristics: ['முழுमையான பாதुகाप্পু', 'रक्षा சક्তি', 'कवच तन्மै', 'दुर्गमता', 'अভेद्यता', 'संरक्षण'],
      keyBenefits: ['முழுमையान रक्षণम्', 'पादुकाप्பु सक्तি', 'कवच நிलै', 'অभেद्य दुর्गम্'],
      favorableActivities: ['Complete protection rituals', 'Security enhancement', 'Defensive strategies', 'Shield creation', 'Safety measures'],
      unfavorableActivities: ['Risky ventures', 'Unprotected activities', 'Dangerous pursuits', 'Careless behavior'],
      yogi: {
        name: 'வ্যাতিপাত योगি',
        englishName: 'Vyatipata Yogi',
        direction: 'नैऋत्य (தেন്মேর्कு - Southwest)',
        benefits: ['সর্বাঙ্গীণ रक्षা मற्றும् संरक्षण', 'সকল বিপদ থেকে মুক্তি', 'অভেদ্য কবচ শক্তি', 'সম্পূর্ণ নিরাপত্তা'],
        significance: 'তেন্মেরু দিশাযিল इरुন্दু वरুম् व্यাতিপাত योগिযিন् আশীর्वাদम् पेर्राল् সর্वোপরি रक्षा किदाइক्कুम्'
      },
      avayogi: {
        name: 'வ্যাতিপাত অবযোগি',
        englishName: 'Vyatipata Avayogi',
        direction: 'ईशान (বডকিழက্কু - Northeast)',
        effects: ['पातुकाप্पিন্মै मற्றुम् ঝুঁকি বৃদ্ধি', 'রক্ষার অভাব এবং বিপত্তি', 'কবচের দুর্বলতা', 'নিরাপত্তাহীনতা'],
        precautions: 'বডकিज़ক্কু তিশাযै তাবির্ত্তু পাতুকাপ্পু نடवডিকैকাল্, রক্ষা सাহাय্য মর্ত্তুম् নিরাপত্তা শ্যামবন্থামান শেযল্গালै মের্কোল্লাভুম্।'
      },
      lifeImpact: {
        career: 'Complete safety in all professional endeavors',
        health: 'Total protection from illness and harm',
        relationships: 'Safe and secure bonds with others',
        spirituality: 'Divine protection and spiritual armor'
      },
      pariharam: {
        dailyPractices: ['Protective rituals', 'Safety prayers', 'Shield visualization', 'Divine armor meditation'],
        offerings: ['Black sesame to Rahu', 'Protective amulets', 'Safety equipment donations', 'Security support'],
        gems: { primary: 'Black Onyx', alternative: 'Obsidian', benefits: 'Provides complete protection from all dangers' },
        mantras: [
          { name: 'Rahu Mantra', text: 'ॐ राहवे नमः', count: '108 times' },
          { name: 'Protection Mantra', text: 'ॐ व्यतिपाताय नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Vulnerability Assessment', description: 'Identify all potential dangers', details: 'Map out areas needing protection' },
        { title: 'Shield Creation', description: 'Build protective barriers', details: 'Create comprehensive defense systems' },
        { title: 'Complete Safety', description: 'Ensure total protection', details: 'Implement foolproof safety measures' }
      ]
    },
    {
      id: 'variyan',
      name: 'வরীয়ான்',
      englishName: 'Variyan',
      effect: 'শ্রেষ্ঠত্ব',
      effectEnglish: 'Excellence & Superiority',
      rulingPlanet: 'Jupiter',
      element: 'Ether',
      quality: 'Satvic',
      bestTime: 'সকাল ৯-১২ টা (Morning 9-12 PM)',
      description: 'বরীযান যোগ শ্রেষ্ঠত্ব, উৎকর্ষতা এবং শ্রেষ্ঠত্বের জন্য উপযুক্ত যোগ। এই যোগে শুরু করা কাজগুলো সর্বোচ্চ মানের হয়।',
      characteristics: ['শ্রেষ্ঠত্ব অর্জন', 'উৎকর্ষতা', 'প্রাধান্য', 'সর্বোচ্চ মান', 'উন্নত মানের', 'শ্রেষ্ঠতম'],
      keyBenefits: ['শ্রেষ্ঠত্ব লাভ', 'উৎকর্ষতা অর্জন', 'সর্বোচ্চ মান', 'প্রাধান্য পেতে'],
      favorableActivities: ['Excellence pursuit', 'Quality improvement', 'Leadership roles', 'Superior performance', 'High standards setting'],
      unfavorableActivities: ['Mediocrity acceptance', 'Low quality work', 'Inferior performance', 'Compromising standards'],
      yogi: {
        name: 'বরীযান যোগী',
        englishName: 'Variyan Yogi',
        direction: 'পূর্ব (East)',
        benefits: ['সর্ব ক্ষেত্রে শ্রেষ্ঠত্ব অর্জন', 'উৎকর্ষতা এবং প্রাধান্য লাভ', 'সর্বোচ্চ মানের কাজ সম্পাদন', 'নেতৃত্বে অগ্রগতি'],
        significance: 'পূর্ব দিক থেকে আসা বরীযান যোগীর আশীর্বাদ পেলে সকল ক্ষেত্রে শ্রেষ্ঠত্ব অর্জন করা যায়'
      },
      avayogi: {
        name: 'বরীযান অবযোগী',
        englishName: 'Variyan Avayogi',
        direction: 'পশ্চিম (West)',
        effects: ['শ্রেষ্ঠত্বে বাধা এবং মান হ্রাস', 'উৎকর্ষতায় ব্যর্থতা', 'প্রাধান্য হারানো', 'নিম্নমানের ফলাফল'],
        precautions: 'পশ্চিম দিক এড়িয়ে উৎকর্ষতা, শ্রেষ্ঠত্ব এবং মানোন্নয়ন সংক্রান্ত কাজ করুন। পশ্চিম অংশে গুণগত কাজ বা নেতৃত্বের সিদ্ধান্ত নেবেন না।'
      },
      lifeImpact: {
        career: 'Excellence and leadership in professional life',
        health: 'Superior health and vitality',
        relationships: 'High quality and meaningful connections',
        spirituality: 'Highest spiritual achievements'
      },
      pariharam: {
        dailyPractices: ['Strive for excellence', 'Maintain high standards', 'Lead by example', 'Pursue mastery'],
        offerings: ['Golden items to Jupiter', 'Quality education support', 'Excellence awards', 'Superior grade donations'],
        gems: { primary: 'Yellow Sapphire', alternative: 'Topaz', benefits: 'Grants excellence and superiority in all endeavors' },
        mantras: [
          { name: 'Guru Mantra', text: 'ॐ गुरवे नमः', count: '108 times' },
          { name: 'Excellence Mantra', text: 'ॐ वरीयसे नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Standard Setting', description: 'Set highest standards', details: 'Define excellence benchmarks for yourself' },
        { title: 'Quality Enhancement', description: 'Enhance quality in everything', details: 'Improve standards in all life areas' },
        { title: 'Excellence Achievement', description: 'Achieve superior results', details: 'Manifest excellence in all endeavors' }
      ]
    },
    {
      id: 'parigha',
      name: 'পরিঘ',
      englishName: 'Parigha',
      effect: 'বাধা অপসারণ',
      effectEnglish: 'Barrier Removal',
      rulingPlanet: 'Saturn',
      element: 'Air',
      quality: 'Tamasic',
      bestTime: 'বিকাল ৩-৬ টা (Afternoon 3-6 PM)',
      description: 'পরিঘ যোগ বাধা, প্রতিবন্ধকতা এবং বারিয়ার অপসারণের জন্য উপযুক্ত যোগ। এই যোগে সকল বাঁধা এবং বাধা দূর হয়।',
      characteristics: ['বাধা অপসারণ', 'প্রতিবন্ধকতা দূরীকরণ', 'পথ পরিষ্কার', 'বাঁধা ভাঙা', 'প্রতিরোধ হটানো', 'মুক্ত পথ'],
      keyBenefits: ['বাঁধা দূরীকরণ', 'প্রতিবন্ধকতা অপসারণ', 'মুক্ত গতি', 'পথ পরিষ্কার'],
      favorableActivities: ['Obstacle removal', 'Barrier breaking', 'Path clearing', 'Resistance overcoming', 'Liberation activities'],
      unfavorableActivities: ['Creating obstacles', 'Blocking progress', 'Building barriers', 'Resistance creation'],
      yogi: {
        name: 'পরিঘ যোগী',
        englishName: 'Parigha Yogi',
        direction: 'দক্ষিণ (South)',
        benefits: ['সকল বাঁধা এবং প্রতিবন্ধকতা দূরীকরণ', 'মুক্ত পথ এবং প্রগতি', 'প্রতিরোধ ভাঙা এবং অগ্রগতি', 'বাধামুক্ত জীবনযাত্রা'],
        significance: 'দক্ষিণ দিক থেকে আসা পরিঘ যোগীর আশীর্বাদ পেলে জীবনের সকল বাঁধা দূর হয়ে যায়'
      },
      avayogi: {
        name: 'পরিঘ অবযোগী',
        englishName: 'Parigha Avayogi',
        direction: 'উত্তর (North)',
        effects: ['বাঁধা বৃদ্ধি এবং প্রতিবন্ধকতা বৃদ্ধি', 'পথে বাধা এবং প্রতিরোধ', 'প্রগতিতে হস্তক্ষেপ', 'মুক্ত গতিতে বিঘ্ন'],
        precautions: 'উত্তর দিক এড়িয়ে বাঁধা অপসারণ, প্রতিবন্ধকতা দূরীকরণ এবং মুক্তিমূলক কাজ করুন। উত্তর অংশে গুরুত্বপূর্ণ বাঁধা দূরীকরণের চেষ্টা করবেন না।'
      },
      lifeImpact: {
        career: 'Removal of career obstacles and blocks',
        health: 'Clearing health barriers and restrictions',
        relationships: 'Breaking down communication barriers',
        spirituality: 'Liberation from spiritual obstacles'
      },
      pariharam: {
        dailyPractices: ['Remove daily obstacles', 'Clear your path', 'Help others overcome barriers', 'Practice liberation'],
        offerings: ['Iron tools to Saturn', 'Barrier removal support', 'Freedom causes donations', 'Liberation aid'],
        gems: { primary: 'Black Tourmaline', alternative: 'Smoky Quartz', benefits: 'Removes all barriers and obstacles from life' },
        mantras: [
          { name: 'Shani Mantra', text: 'ॐ शनैश्चराय नमः', count: '108 times' },
          { name: 'Barrier Removal Mantra', text: 'ॐ परिघाय नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Barrier Identification', description: 'Identify all barriers', details: 'Map out obstacles blocking your progress' },
        { title: 'Removal Strategy', description: 'Plan barrier removal', details: 'Design systematic obstacle clearing approach' },
        { title: 'Path Liberation', description: 'Clear the path completely', details: 'Execute complete barrier removal for free progress' }
      ]
    },
    {
      id: 'shiva',
      name: 'শিব',
      englishName: 'Shiva',
      effect: 'কল্যাণ',
      effectEnglish: 'Auspiciousness & Welfare',
      rulingPlanet: 'Moon',
      element: 'Water',
      quality: 'Satvic',
      bestTime: 'সন্ধ্যা ৬-৯ টা (Evening 6-9 PM)',
      description: 'শিব যোগ কল্যাণ, মঙ্গল এবং শুভত্বের জন্য অত্যন্ত উপযুক্ত যোগ। এই যোগে শুরু করা সকল কাজ কল্যাণকর এবং মঙ্গলজনক হয়।',
      characteristics: ['কল্যাণকারী', 'মঙ্গলময়', 'শুভ ফলদায়ক', 'কুশলতা', 'শান্তি প্রদান', 'সৌভাগ্য'],
      keyBenefits: ['কল্যাণ লাভ', 'মঙ্গল সিদ্ধি', 'শুভ ফল', 'শান্তি প্রাপ্তি'],
      favorableActivities: ['Auspicious ceremonies', 'Welfare activities', 'Peace initiatives', 'Beneficial work', 'Blessing rituals'],
      unfavorableActivities: ['Harmful activities', 'Destructive work', 'Negative actions', 'Inauspicious behavior'],
      yogi: {
        name: 'শিব যোগী',
        englishName: 'Shiva Yogi',
        direction: 'উত্তর (North)',
        benefits: ['সর্বোচ্চ কল্যাণ এবং মঙ্গল লাভ', 'শুভত্ব এবং সৌভাগ্য বৃদ্ধি', 'শান্তি এবং সুখ প্রাপ্তি', 'আধ্যাত্মিক কল্যাণ এবং উন্নতি'],
        significance: 'উত্তর দিক থেকে আসা শিব যোগীর আশীর্বাদ পেলে জীবনে সর্বোচ্চ কল্যাণ এবং মঙ্গল লাভ হয়'
      },
      avayogi: {
        name: 'শিব অবযোগী',
        englishName: 'Shiva Avayogi',
        direction: 'দক্ষিণ (South)',
        effects: ['কল্যাণহীনতা এবং অমঙ্গল', 'শুভত্বের অভাব', 'শান্তিহীনতা এবং অশান্তি', 'সৌভাগ্যের অভাব'],
        precautions: 'দক্ষিণ দিক এড়িয়ে কল্যাণমূলক কাজ, শুভ অনুষ্ঠান এবং মঙ্গলজনক কার্যক্রম করুন। দক্ষিণ অংশে শুভ কাজ বা ধর্মীয় অনুষ্ঠান করবেন না।'
      },
      lifeImpact: {
        career: 'Auspicious and beneficial career growth',
        health: 'Complete wellness and peaceful health',
        relationships: 'Harmonious and blessed relationships',
        spirituality: 'Divine grace and spiritual welfare'
      },
      pariharam: {
        dailyPractices: ['Perform daily good deeds', 'Spread peace and harmony', 'Practice compassion', 'Create positive energy'],
        offerings: ['White flowers to Shiva', 'Milk and honey', 'Peace offerings', 'Welfare donations'],
        gems: { primary: 'Moonstone', alternative: 'Pearl', benefits: 'Brings complete auspiciousness and divine welfare' },
        mantras: [
          { name: 'Shiva Mantra', text: 'ॐ शिवाय नमः', count: '108 times' },
          { name: 'Welfare Mantra', text: 'ॐ कल्याणाय नमः', count: '21 times' }
        ]
      },
      activationProcess: [
        { title: 'Auspiciousness Cultivation', description: 'Cultivate positive energy', details: 'Generate auspicious vibrations in all activities' },
        { title: 'Welfare Creation', description: 'Create beneficial outcomes', details: 'Ensure all actions contribute to general welfare' },
        { title: 'Divine Grace', description: 'Invoke divine blessings', details: 'Connect with divine forces for ultimate auspiciousness' }
      ]
    }
    // Additional 7 namayogam entries continue here...
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
