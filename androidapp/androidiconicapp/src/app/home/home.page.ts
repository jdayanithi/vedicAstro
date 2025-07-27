import { Component, OnInit } from '@angular/core';

interface Remedy {
  id?: string;
  category: string;
  title: string;
  description: string;
  tamilTags: string[];
  englishTags: string[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  allRemedies: Remedy[] = [];
  filteredRemedies: Remedy[] = [];
  categories: string[] = [];
  searchTerm = '';
  selectedCategory = 'all';

  constructor() { 
    this.initializeData();
  }

  ngOnInit() {
    // Initialize local data only for now
  }

  initializeData() {
    this.allRemedies = [
      // திருமணம் (Marriage)
      {
        category: 'திருமணம்',
        title: 'முருகன் வழிபாடு',
        description: 'வெள்ளிக்கிழமை தோறும் முருகன் கோவிலில் வேல் அர்ச்சனை செய்து வாழைப்பழம் நிவேதனம் செய்யவும்.',
        tamilTags: ['முருகன்', 'வேல்', 'வாழைப்பழம்', 'வெள்ளிக்கிழமை', 'அர்ச்சனை'],
        englishTags: ['Murugan', 'Vel', 'Banana', 'Friday', 'Archana']
      },
      {
        category: 'திருமணம்',
        title: 'ஸ்ரீ சுக்ர மந்திரம்',
        description: 'தினமும் காலை வேளையில் "ॐ शुक्राय नमः" என்ற மந்திரத்தை 108 முறை ஜபம் செய்யவும்.',
        tamilTags: ['சுக்ரன்', 'மந்திரம்', 'ஜபம்', 'காலை', '108'],
        englishTags: ['Venus', 'Mantra', 'Chanting', 'Morning', '108']
      },
      {
        category: 'திருமணம்',
        title: 'கவுரி வழிபாடு',
        description: 'செவ்வாய் மற்றும் வெள்ளிக்கிழமைகளில் கவுரி அம்மனுக்கு மஞ்சள் அர்ப்பணம் செய்யவும்.',
        tamilTags: ['கவுரி', 'மஞ்சள்', 'செவ்வாய்', 'வெள்ளி', 'அர்ப்பணம்'],
        englishTags: ['Gauri', 'Turmeric', 'Tuesday', 'Friday', 'Offering']
      },
      {
        category: 'திருமணம்',
        title: 'ஸ்ரீ லக்ஷ்மி வழிபாடு',
        description: 'வெள்ளிக்கிழமைகளில் ஸ்ரீ லக்ஷ்மி தேவியை தாமரை மலர்களால் அலங்கரித்து வழிபடவும்.',
        tamilTags: ['லக்ஷ்மி', 'தாமரை', 'மலர்', 'வெள்ளி', 'அலங்காரம்'],
        englishTags: ['Lakshmi', 'Lotus', 'Flowers', 'Friday', 'Decoration']
      },
      {
        category: 'திருமணம்',
        title: 'ருத்ராக்ஷ தாரணம்',
        description: '5 முக ருத்ராக்ஷத்தை சிவபெருமான் பூஜை செய்து அணிந்து கொள்ளவும்.',
        tamilTags: ['ருத்ராக்ஷம்', 'சிவன்', 'பூஜை', '5முகம்', 'தாரணம்'],
        englishTags: ['Rudraksha', 'Shiva', 'Pooja', '5Face', 'Wearing']
      },

      // பணம் (Money)
      {
        category: 'பணம்',
        title: 'ஸ்ரீ லக்ஷ்மி பூஜை',
        description: 'வெள்ளிக்கிழமை தோறும் ஸ்ரீ லக்ஷ்மி தேவிக்கு தாமரை மலரும் தங்க காசுகளும் அர்ப்பணம் செய்யவும்.',
        tamilTags: ['லக்ஷ்மி', 'தாமரை', 'தங்கம்', 'காசு', 'வெள்ளி'],
        englishTags: ['Lakshmi', 'Lotus', 'Gold', 'Coins', 'Friday']
      },
      {
        category: 'பணம்',
        title: 'கணேச வழிபாடு',
        description: 'ஒவ்வொரு புதன்கிழமையும் கணேசருக்கு பச்சரிசி மற்றும் வெல்லம் நிவேதனம் செய்யவும்.',
        tamilTags: ['கணேசன்', 'பச்சரிசி', 'வெல்லம்', 'புதன்', 'நிவேதனம்'],
        englishTags: ['Ganesha', 'Rice', 'Jaggery', 'Wednesday', 'Offering']
      },
      {
        category: 'பணம்',
        title: 'கூடல் சோக',
        description: 'வீட்டின் வடகிழக்கு மூலையில் தினமும் நீர் தெளித்து சுத்தமாக வைத்துக்கொள்ளவும்.',
        tamilTags: ['வடகிழக்கு', 'நீர்', 'சுத்தம்', 'மூலை', 'தினமும்'],
        englishTags: ['Northeast', 'Water', 'Clean', 'Corner', 'Daily']
      },
      {
        category: 'பணம்',
        title: 'தனகுபேர மந்திரம்',
        description: 'காலையில் "ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा" ஜபிக்கவும்.',
        tamilTags: ['குபேரன்', 'மந்திரம்', 'யக்ஷன்', 'தனம்', 'ஜபம்'],
        englishTags: ['Kubera', 'Mantra', 'Yaksha', 'Wealth', 'Chanting']
      },
      {
        category: 'பணம்',
        title: 'ஸ்ரீயந்திர பூஜை',
        description: 'ஸ்ரீயந்திரத்தை வீட்டில் பிரதிஷ்டை செய்து தினமும் குங்குமம் மற்றும் தாமரை மலர் அர்ப்பணம் செய்யவும்.',
        tamilTags: ['ஸ்ரீயந்திரம்', 'குங்குமம்', 'தாமரை', 'பிரதிஷ்டை', 'அர்ப்பணம்'],
        englishTags: ['Sriyantra', 'Kumkum', 'Lotus', 'Installation', 'Offering']
      },

      // உடல்நலம் (Health)
      {
        category: 'உடல்நலம்',
        title: 'ஆஞ்சநேய வழிபாடு',
        description: 'செவ்வாய்க்கிழமை தோறும் ஆஞ்சநேயருக்கு வெண்ண் மற்றும் சந்தன பூச்சு செய்து வழிபடவும்.',
        tamilTags: ['ஆஞ்சநேயர்', 'வெண்ண', 'சந்தனம்', 'செவ்வாய்', 'பூச்சு'],
        englishTags: ['Hanuman', 'Butter', 'Sandalwood', 'Tuesday', 'Applying']
      },
      {
        category: 'உடல்நலம்',
        title: 'ஸ்ரீ தனவந்தரி பூஜை',
        description: 'ஒவ்வொரு ஏகாதசியிலும் ஸ்ரீ தனவந்தரி பகவானுக்கு நீலத்தாமரை அர்ப்பணம் செய்யவும்.',
        tamilTags: ['தனவந்தரி', 'ஏகாதசி', 'நீலத்தாமரை', 'பகவான்', 'அர்ப்பணம்'],
        englishTags: ['Dhanvantari', 'Ekadashi', 'BlueLotus', 'Lord', 'Offering']
      },
      {
        category: 'உடல்நலம்',
        title: 'சூரியன் வழிபாடு',
        description: 'தினமும் சூரிய உதயத்தின் போது சூரியனை வணங்கி கால் நீர் அர்ப்பணம் செய்யவும்.',
        tamilTags: ['சூரியன்', 'உதயம்', 'நீர்', 'வணக்கம்', 'அர்ப்பணம்'],
        englishTags: ['Sun', 'Sunrise', 'Water', 'Worship', 'Offering']
      },
      {
        category: 'உடல்நலம்',
        title: 'மஹாமிருத்யுஞ்சய மந்திரம்',
        description: 'தினமும் காலை மாலை "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्" ஜபிக்கவும்.',
        tamilTags: ['மிருத்யுஞ்சயம்', 'ஜபம்', 'காலை', 'மாலை', 'மந்திரம்'],
        englishTags: ['Mrityunjaya', 'Chanting', 'Morning', 'Evening', 'Mantra']
      },
      {
        category: 'உடல்நலம்',
        title: 'அஸ்வத்தா வியூது',
        description: 'அரசமரத்தின் கீழ் வெள்ளிக்கிழமை தோறும் விளக்கு ஏற்றி வழிபாடு செய்யவும்.',
        tamilTags: ['அரசமரம்', 'விளக்கு', 'வெள்ளி', 'வழிபாடு', 'ஏற்றுதல்'],
        englishTags: ['PeepalTree', 'Lamp', 'Friday', 'Worship', 'Lighting']
      },

      // வேலை (Job)
      {
        category: 'வேலை',
        title: 'ஸ்ரீ சரஸ்வதி வழிபாடு',
        description: 'ஒவ்வொரு வியாழக்கிழமையும் ஸ்ரீ சரஸ்வதி தேவிக்கு மஞ்சளும் தாமரையும் அர்ப்பணம் செய்யவும்.',
        tamilTags: ['சரஸ்வதி', 'மஞ்சள்', 'தாமரை', 'வியாழன்', 'அர்ப்பணம்'],
        englishTags: ['Saraswati', 'Turmeric', 'Lotus', 'Thursday', 'Offering']
      },
      {
        category: 'வேலை',
        title: 'சூரிய நமஸ்காரம்',
        description: 'தினமும் காலையில் சூரிய நமஸ்காரம் செய்து 12 முறை "ॐ सूर्याय नमः" ஜபிக்கவும்.',
        tamilTags: ['சூரியன்', 'நமஸ்காரம்', 'காலை', '12முறை', 'ஜபம்'],
        englishTags: ['Sun', 'Namaskaram', 'Morning', '12Times', 'Chanting']
      },
      {
        category: 'வேலை',
        title: 'கணேச மந்திரம்',
        description: 'தினமும் "ॐ गं गणपतये नमः" என்ற மந்திரத்தை 108 முறை ஜபித்து வெற்றிலை அர்ப்பணம் செய்யவும்.',
        tamilTags: ['கணேசன்', 'மந்திரம்', '108', 'வெற்றிலை', 'ஜபம்'],
        englishTags: ['Ganesha', 'Mantra', '108', 'BetelLeaf', 'Chanting']
      },
      {
        category: 'வேலை',
        title: 'பூதநாத வழிபாடு',
        description: 'சிவராத்திரி அன்று சிவலிங்கத்திற்கு ருத்ராபிஷேகம் செய்து வில்வார்ச்சனை செய்யவும்.',
        tamilTags: ['சிவன்', 'ருத்ராபிஷேகம்', 'வில்வம்', 'சிவராத்திரி', 'அர்ச்சனை'],
        englishTags: ['Shiva', 'Rudrabhishek', 'Bilva', 'Shivaratri', 'Archana']
      },
      {
        category: 'வேலை',
        title: 'ஹயகிரீவர் வழிபாடு',
        description: 'வியாழக்கிழமை தோறும் ஹயகிரீவருக்கு வெள்ளைப்பூ மற்றும் வெண்ண நிவேதனம் செய்யவும்.',
        tamilTags: ['ஹயகிரீவர்', 'வெள்ளைப்பூ', 'வெண்ண', 'வியாழன்', 'நிவேதனம்'],
        englishTags: ['Hayagriva', 'WhiteFlower', 'Butter', 'Thursday', 'Offering']
      },

      // கல்வி (Education)
      {
        category: 'கல்வி',
        title: 'ஸ்ரீ சரஸ்வதி மந்திரம்',
        description: 'தினமும் "ॐ सरस्वत्यै नमः" என்ற மந்திரத்தை 108 முறை ஜபித்து வெள்ளை தாமரை அர்ப்பணம் செய்யவும்.',
        tamilTags: ['சரஸ்வதி', 'மந்திரம்', '108', 'வெள்ளைத்தாமரை', 'ஜபம்'],
        englishTags: ['Saraswati', 'Mantra', '108', 'WhiteLotus', 'Chanting']
      },
      {
        category: 'கல்வி',
        title: 'வசந்த பஞ்சமி வழிபாடு',
        description: 'வசந்த பஞ்சமி அன்று சரஸ்வதி தேவிக்கு மஞ்சள் வர்ண வஸ்திரம் மற்றும் மஞ்சள் மலர்கள் அர்ப்பணம் செய்யவும்.',
        tamilTags: ['வசந்தபஞ்சமி', 'மஞ்சள்வர்ணம்', 'வஸ்திரம்', 'மலர்கள்', 'அர்ப்பணம்'],
        englishTags: ['BasantPanchami', 'Yellow', 'Cloth', 'Flowers', 'Offering']
      },
      {
        category: 'கல்வி',
        title: 'கல்ப விருக்ஷ வழிபாடு',
        description: 'மாமரத்தின் கீழ் ஒவ்வொரு வெள்ளிக்கிழமையும் தீபம் ஏற்றி புத்தகங்களுடன் வழிபாடு செய்யவும்.',
        tamilTags: ['மாமரம்', 'தീபம்', 'புத்தகம்', 'வெள்ளி', 'வழிபாடு'],
        englishTags: ['MangoTree', 'Lamp', 'Books', 'Friday', 'Worship']
      },
      {
        category: 'கல்வি',
        title: 'மேதா தக்ஷிணாமூர்த்தி வழிபாடு',
        description: 'வியாழக்கிழமை தோறும் தக்ஷிணாமூர்த்திக்கு வெள்ளைப் பூச்சு மற்றும் உக்ர கார்யம் செய்யவும்.',
        tamilTags: ['தக்ஷிணாமூர்த்தி', 'வெள்ளைப்பூச்சு', 'வியாழன்', 'உக்ரகார்யம்', 'மேதை'],
        englishTags: ['Dakshinamurthy', 'WhitePaste', 'Thursday', 'Ugrakaryam', 'Intelligence']
      },
      {
        category: 'கல்வி',
        title: 'ஸ்ரீ கார்த்திகேயர் வழிபாடு',
        description: 'ஷஷ்டி தினங்களில் முருகனுக்கு அபிஷேகம் செய்து காவடி எடுத்து வழிபாடு செய்யவும்.',
        tamilTags: ['கார்த்திகேய்', 'அபிஷேகம்', 'காவடி', 'ஷஷ்டி', 'வழிபாடு'],
        englishTags: ['Kartikeya', 'Abhishek', 'Kavadi', 'Shashti', 'Worship']
      },

      // சுகம் (Comfort/Happiness)
      {
        category: 'சுகம்',
        title: 'ஸ்ரீ கிருஷ்ண பூஜை',
        description: 'ஜன்மாஷ்டமி அன்று ஸ்ரீ கிருஷ்ணருக்கு வெண்ண், மோருடன் சேர்ந்து பூஜை செய்யவும்.',
        tamilTags: ['கிருஷ்ணன்', 'ஜன்மாஷ்டமி', 'வெண்ண', 'மோர்', 'பூஜை'],
        englishTags: ['Krishna', 'Janmashtami', 'Butter', 'Buttermilk', 'Pooja']
      },
      {
        category: 'சுகம்',
        title: 'ஸ்ரீ ராம நாம ஜபம்',
        description: 'தினமும் "श्री राम जय राम जय जय राम" என்ற நாமத்தை 108 முறை ஜபித்து துளசி மலர் அர்ப்பணம் செய்யவும்.',
        tamilTags: ['ராமன்', 'நாமஜபம்', '108', 'துளசி', 'அர்ப்பணம்'],
        englishTags: ['Rama', 'NameChanting', '108', 'Tulsi', 'Offering']
      },
      {
        category: 'சுகம்',
        title: 'ஸ்ரீ விநாயக வழிபாடு',
        description: 'செவ்வாய் மற்றும் வெள்ளிக்கிழமைகளில் விநாயகருக்கு மோதகம் நிவேதனம் செய்யவும்.',
        tamilTags: ['விநாயகர்', 'மோதகம்', 'செவ்வாய்', 'வெள்ளி', 'நிவேதனம்'],
        englishTags: ['Vinayaka', 'Modakam', 'Tuesday', 'Friday', 'Offering']
      },
      {
        category: 'சுகம்',
        title: 'ஸ்ரீ வெண்கடேசுவர வழிபாடு',
        description: 'ஏகாதசி தினங்களில் ஸ்ரீ வெண்கடேசருக்கு லட்டு நிவேதனம் செய்து வழிபடவும்.',
        tamilTags: ['வெண்கடேசன்', 'லட்டு', 'ஏகாதசி', 'நிவேதனம்', 'வழிபாடு'],
        englishTags: ['Venkatesha', 'Laddu', 'Ekadashi', 'Offering', 'Worship']
      },
      {
        category: 'சுகம்',
        title: 'துளசி வழிபாடு',
        description: 'தினமும் மாலை வேளையில் துளசி செடிக்கு நீர் ஊற்றி தீபம் ஏற்றி வழிபடவும்.',
        tamilTags: ['துளசி', 'நீர்', 'தீபம்', 'மாலை', 'வழிபாடு'],
        englishTags: ['Tulsi', 'Water', 'Lamp', 'Evening', 'Worship']
      },

      // குடும்பம் (Family)
      {
        category: 'குடும்பம்',
        title: 'சத்யநாராயண பூஜை',
        description: 'மாதம் ஒருமுறை சத்யநாராயண பூஜை செய்து குடும்பத்தினருடன் சேர்ந்து வழிபடவும்.',
        tamilTags: ['சத்யநாராயணன்', 'பூஜை', 'மாதம்', 'குடும்பம்', 'வழிபாடு'],
        englishTags: ['Satyanarayana', 'Pooja', 'Monthly', 'Family', 'Worship']
      },
      {
        category: 'குடும்பம்',
        title: 'பிரம்மோத்சவ விரதம்',
        description: 'ஆண்டுக்கு ஒருமுறை கோயிலில் பிரம்மோத்சவத்தில் பங்கேத்து குடும்பத்துடன் வழிபாடு செய்யவும்.',
        tamilTags: ['பிரம்மோத்சவம்', 'கோயில்', 'ஆண்டு', 'குடும்பம்', 'பங்கேற்பு'],
        englishTags: ['Brahmotsavam', 'Temple', 'Yearly', 'Family', 'Participation']
      },
      {
        category: 'குடும்பம்',
        title: 'ஸ்ரீ ஆயுதபூஜை',
        description: 'ஆயுதபூஜை அன்று வீட்டில் உள்ள கருவிகளுக்கு பூஜை செய்து அப்பம் வைத்து வழிபடவும்.',
        tamilTags: ['ஆயுதபூஜை', 'கருவிகள்', 'அப்பம்', 'வீடு', 'வழிபாடு'],
        englishTags: ['AyudhaPooja', 'Tools', 'Appam', 'Home', 'Worship']
      },
      {
        category: 'குடும்பம்',
        title: 'பூர்ணிமா விரதம்',
        description: 'ஒவ்வொரு பூர்ணிமையிலும் நேரம் புறங்கள் சுத்தம் செய்து சந்திராபிஷேகம் செய்யவும்.',
        tamilTags: ['பூர்ணிமை', 'சுத்தம்', 'சந்திராபிஷேகம்', 'சந்திரன்', 'விரதம்'],
        englishTags: ['Purnima', 'Cleaning', 'ChandraAbhishek', 'Moon', 'Vrat']
      },
      {
        category: 'குடும்பம்',
        title: 'அன்னதான விரதம்',
        description: 'மாதம் ஒருமுறை ஏழைகளுக்கு அன்னதானம் செய்து கோயிலில் பிரசாதம் விநியோகம் செய்யவும்.',
        tamilTags: ['அன்னதானம்', 'ஏழைகள்', 'பிரசாதம்', 'கோயில்', 'விநியோகம்'],
        englishTags: ['Annadanam', 'Poor', 'Prasadam', 'Temple', 'Distribution']
      },

      // பயணம் (Travel)
      {
        category: 'பயணம்',
        title: 'ஸ்ரீ வாயு வழிபாடு',
        description: 'பயணத்திற்கு முன் வாயு பகவானுக்கு தேங்காய் உடைத்து வழிபட்டு பிறகு செல்லவும்.',
        tamilTags: ['வாயுபகவான்', 'தேங்காய்', 'பயணம்', 'வழிபாடு', 'உடைத்தல்'],
        englishTags: ['Vayu', 'Coconut', 'Travel', 'Worship', 'Breaking']
      },
      {
        category: 'பயணம்',
        title: 'ஆஞ்சநேய ஸ்தோத்ரம்',
        description: 'பயணத்தின் முன் ஹனுமான் சாலீசாவை படித்து ஆஞ்சநேயரிடம் அனுமதி பெற்றுக்கொள்ளவும்.',
        tamilTags: ['ஆஞ்சநேயர்', 'சாலீசா', 'அனுமதி', 'பயணம்', 'ஸ்தோத்ரம்'],
        englishTags: ['Hanuman', 'Chalisa', 'Permission', 'Travel', 'Stotra']
      },
      {
        category: 'பயணம்',
        title: 'ஸ்ரீ கணேச ப்ராத்தனை',
        description: 'பயணத்திற்கு முன் கணேசருக்கு "ॐ गं गणपतये नमः" மந்திரம் செப்பி வெற்றிலை அர்ப்பணம் செய்யவும்.',
        tamilTags: ['கணேசன்', 'மந்திரம்', 'வெற்றிலை', 'பயணம்', 'ப்ராத்தனை'],
        englishTags: ['Ganesha', 'Mantra', 'BetelLeaf', 'Travel', 'Prayer']
      },
      {
        category: 'பயணம்',
        title: 'ஸ்ரீ ஸுருஹ ரக்ஷ',
        description: 'பயணத்தின் போது "ॐ गजाननाय नामः" மந்திரத்தை மனதில் உருவேற்றி பாதுகாப்பு வேண்டிக்கொள்ளவும்.',
        tamilTags: ['கஜானனன்', 'மந்திரம்', 'பாதுகாப்பு', 'மனம்', 'வேண்டிக்கொள்ளுதல்'],
        englishTags: ['Gajanana', 'Mantra', 'Protection', 'Mind', 'Praying']
      },
      {
        category: 'பயணம்',
        title: 'நவக்ரக ப்ராத்தனை',
        description: 'நீண்ட பயணத்திற்கு முன் நவக்ரகங்களுக்கு 9 விளக்கு ஏற்றி வணங்கி செல்லவும்.',
        tamilTags: ['நவக்ரகம்', '9விளக்கு', 'நீண்டபயணம்', 'வணக்கம்', 'ப்ராத்தனை'],
        englishTags: ['Navagraha', '9Lamps', 'LongTravel', 'Worship', 'Prayer']
      },

      // எதிரி (Enemy)
      {
        category: 'எதிரி',
        title: 'ஸ்ரீ ருத்ர சாஸ்திங்கல',
        description: 'திங்கள்கிழமை தோறும் சிவபெருமானுக்கு ருத்ர பா஠ம் செய்து அபிஷேகம் செய்யவும்.',
        tamilTags: ['ருத்ரபாঠம்', 'சிவன்', 'அபிஷேகம்', 'திங்கள்', 'சாஸ்திங்கல'],
        englishTags: ['RudraPath', 'Shiva', 'Abhishek', 'Monday', 'Chastisement']
      },
      {
        category: 'எதிரி',
        title: 'ஸ்ரீ ப்ரத்யங்கிரா வழிபாடு',
        description: 'அமாவாசை அன்று ப்ரத்யங்கிராதேவிக்கு கருப்பு எள்ளு மற்றும் கருப்பு வஸ்திரம் அர்ப்பணம் செய்யவும்.',
        tamilTags: ['ப்ரத்யங்கிரா', 'அமாவாசை', 'கருப்பு', 'எள்ளு', 'வஸ்திரம்'],
        englishTags: ['Pratyangira', 'Amavasya', 'Black', 'Sesame', 'Cloth']
      },
      {
        category: 'எதிரி',
        title: 'மகாவித்யா மந்திரம்',
        description: 'பிராம்ம முகூர்த்தத்தில் மகாவித்யா தேவியின் மந்திரத்தை 108 முறை ஜபித்து வேப்பெண்ணெய் தீபம் ஏற்றவும்.',
        tamilTags: ['மகாவித்யா', 'பிராம்ममுகூர்த்தம்', '108', 'வேப்ப', 'தீபம்'],
        englishTags: ['Mahavidya', 'BrahmaMuhurta', '108', 'Neem', 'Lamp']
      },
      {
        category: 'எதிரி',
        title: 'ஸ்ரீ பைரவ உபாஸனை',
        description: 'ஒவ்வொரு அஷ்டமியிலும் பைரவருக்கு காரமான உணவு மற்றும் மது நிவேதனம் செய்யவும்.',
        tamilTags: ['பைரவர்', 'அஷ்டமி', 'காரம்', 'மது', 'நிவேதனம்'],
        englishTags: ['Bhairava', 'Ashtami', 'Spicy', 'Alcohol', 'Offering']
      },
      {
        category: 'எதிரி',
        title: 'சுதர்சன ஹோமம்',
        description: 'மாதம் ஒருமுறை சுதர்சன ஹோமம் செய்து எதிரிகளின் தீமையிலிருந்து பாதுகாப்பு பெறவும்.',
        tamilTags: ['சுதர்சனம்', 'ஹோமம்', 'பாதுகாப்பு', 'எதிரி', 'தீமை'],
        englishTags: ['Sudarshan', 'Homam', 'Protection', 'Enemy', 'Evil']
      },

      // நோய் (Disease)
      {
        category: 'நோய்',
        title: 'ஸ்ரீ தனவந்தரி மந்திரம்',
        description: 'தினமும் "ॐ नमो भगवते वासुदेवाय धन्वन्तरये अमृतकलश हस्ताय सर्वामय विनाशनाय त्रैलोक्यनाथाय श्री महाविष्णवे नमः" ஜபிக்கவும்.',
        tamilTags: ['தனவந்தரி', 'மந்திரம்', 'அமிர்தம்', 'சர்வாமய', 'விநாசனம்'],
        englishTags: ['Dhanvantari', 'Mantra', 'Amrit', 'AllDiseases', 'Destruction']
      },
      {
        category: 'நோய்',
        title: 'அஸ்வத்தா வியூது',
        description: 'அரசமரத்தின் கீழ் சனிக்கிழமை தோறும் எண்ணெய் தீபம் ஏற்றி நோய் நிவாரணம் வேண்டவும்.',
        tamilTags: ['அரசமரம்', 'சனி', 'எண்ணெய்தீபம்', 'நோய்நிவாரணம்', 'வேண்டிக்கை'],
        englishTags: ['PeepalTree', 'Saturday', 'OilLamp', 'DiseaseCure', 'Prayer']
      },
      {
        category: 'நோய்',
        title: 'மரிய்யாம்மன் வழிபாடு',
        description: 'செவ்வாய்க்கிழமை தோறும் மரிய்யாம்மனுக்கு வேப்பிலை மற்றும் மஞ்சள் அர்ப்பணம் செய்யவும்.',
        tamilTags: ['மரிய்யாம்மன்', 'வேப்பிலை', 'மஞ்சள்', 'செவ்வாய்', 'அர்ப்பணம்'],
        englishTags: ['Mariamman', 'NeemLeaves', 'Turmeric', 'Tuesday', 'Offering']
      },
      {
        category: 'நோய்',
        title: 'பஞ்சாமிர்த அபிஷேகம்',
        description: 'மாதம் ஒருமுறை சிவலிங்கத்திற்கு பஞ்சாமிர்தம் செய்து அபிஷேகம் செய்து நோய் நிவாரணம் வேண்டவும்.',
        tamilTags: ['பஞ்சாமிர்தம்', 'சிவலிங்கம்', 'அபிஷேகம்', 'நோய்நிவாரணம்', 'மாதம்'],
        englishTags: ['Panchamrit', 'Shivalinga', 'Abhishek', 'DiseaseCure', 'Monthly']
      },
      {
        category: 'நோய்',
        title: 'ஸ்ரீ அஅயோத்யாதி வைத்ய நாதன் வழிபாடு',
        description: 'ஏகாதசி அன்று அயோத்யாதி வைத்ய நாதனுக்கு வெந்தயக்கீரை மற்றும் துளசிமலர் அர்ப்பணம் செய்யவும்.',
        tamilTags: ['வைத்யநாதன்', 'வெந்தயக்கீரை', 'துளசி', 'ஏகாதசி', 'அயோத்யா'],
        englishTags: ['Vaidyanatha', 'FenugreekLeaves', 'Tulsi', 'Ekadashi', 'Ayodhya']
      }
    ];

    // Extract unique categories
    this.categories = [...new Set(this.allRemedies.map(remedy => remedy.category))];
    this.filteredRemedies = [...this.allRemedies];
  }

  filterRemedies() {
    this.filteredRemedies = this.allRemedies.filter(remedy => {
      const matchesCategory = this.selectedCategory === 'all' || remedy.category === this.selectedCategory;
      const matchesSearch = this.searchTerm === '' || 
        remedy.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        remedy.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        remedy.tamilTags.some(tag => tag.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        remedy.englishTags.some(tag => tag.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }

  onCategoryChange() {
    this.filterRemedies();
  }

  onSearchChange() {
    this.filterRemedies();
  }

  clearSearch() {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.filteredRemedies = [...this.allRemedies];
  }
}
