import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface TempleGroup {
  id: string;
  name: string;
  englishName: string;
  description: string;
  icon: string;
  color: string;
  templeCount: number;
  purpose: string;
  temples: Temple[];
}

interface Temple {
  id: string;
  name: string;
  englishName: string;
  location: string;
  deity: string;
  significance: string;
  speciality: string[];
  timings: string;
  festivals: string[];
  pariharams: string[];
  benefits: string[];
  howToReach: string;
  nearestStation: string;
  accommodation: string[];
  offeringsRecommended: string[];
  googleMapsLink: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

@Component({
  selector: 'app-temple-vazhipadu-sthalangal',
  templateUrl: './temple-vazhipadu-sthalangal.page.html',
  styleUrls: ['./temple-vazhipadu-sthalangal.page.scss'],
})
export class TempleVazhipaduSthalalangalPage implements OnInit {
  searchTerm: string = '';
  isModalOpen: boolean = false;
  isTempleDetailModalOpen: boolean = false;
  selectedTempleGroup: TempleGroup | null = null;
  selectedTemple: Temple | null = null;
  filteredTempleGroups: TempleGroup[] = [];
  favoriteTempleGroups: string[] = [];
  visitedTemples: string[] = [];

  templeGroups: TempleGroup[] = [
    {
      id: 'nava-thirupathi',
      name: 'நவ திருப்பதி ஸ்தலங்கள்',
      englishName: 'Nava Tirupati Temples',
      description: 'விஷ்ணு பகவானின் 9 புனித திருப்பதி ஸ்தலங்கள் - ஒவ்வொரு ஸ்தலமும் வெவ்வேறு பலன்களை அளிக்கும்',
      icon: 'business',
      color: '#2563eb',
      templeCount: 9,
      purpose: 'விஷ்ணு அருள், செல்வம், மோக்ஷம்',
      temples: [
        {
          id: 'tirupati',
          name: 'திருப்பதி வெங்கடேஸ்வர ஸ்வாமி',
          englishName: 'Tirupati Venkateswara Swamy',
          location: 'திருப்பதி, ஆந்திரா',
          deity: 'ஸ்ரீ வெங்கடேஸ்வர ஸ்வாமி',
          significance: 'யுக அவதாரம், விஷ்ணுவின் முக்கிய அவதாரம்',
          speciality: ['உலகப் புகழ்பெற்ற கோவில்', 'லட்டு பிரசாதம்', 'தலை மொட்டை வைத்தல்'],
          timings: 'காலை 6:00 - இரவு 10:00',
          festivals: ['வைகுண்ட ஏகாதசி', 'ப்ரம்மோத்ஸவம்', 'ராத சப்தமி'],
          pariharams: ['108 ஹரி நாம ஜபம்', 'திருப்பதி லட்டு படையல்', 'தலை மொட்டை'],
          benefits: ['கடன் நிவர்த்தி', 'செல்வ வளர்ச்சி', 'குடும்ப நலம்'],
          howToReach: 'சென்னையிலிருந்து பேருந்து அல்லது ரயில்',
          nearestStation: 'திருப்பதி ரயில் நிலையம்',
          accommodation: ['TTD விடுதிகள்', 'தனியார் ஹோட்டல்கள்', 'தர்மஸ்தானங்கள்'],
          offeringsRecommended: ['லட்டு', 'வஸ்திரம்', 'தங்க ஆபரணங்கள்', 'நேர்த்திக்கடன்'],
          googleMapsLink: 'https://goo.gl/maps/xyz123',
          coordinates: {
            latitude: 13.6288,
            longitude: 79.4192
          }
        },
        {
          id: 'tirumala',
          name: 'திருமலை ஸ்ரீ கபிலதீஸ்வரர்',
          englishName: 'Tirumala Sri Kapilatheeswarer',
          location: 'திருமலை, தமிழ்நாடு',
          deity: 'ஸ்ரீ கபிலதீஸ்வரர்',
          significance: 'சிவ-விஷ்ணு ஐக்கிய ஸ்தலம்',
          speciality: ['பஞ்ச பூத ஸ்தலம்', 'கபில முனி தவம்', 'ஆகாய லிங்கம்'],
          timings: 'காலை 5:30 - இரவு 9:00',
          festivals: ['மகா சிவராத்திரி', 'கார்த்திகை தீபம்', 'அருத்ரா தரிசனம்'],
          pariharams: ['திருநீறு அபிஷேகம்', 'பில்வ இலை அர்ச்சனை', 'ருத்ராக்ஷ மாலை'],
          benefits: ['மன அமைதி', 'ஆன்மீக முன்னேற்றம்', 'பாவ விமோசனம்'],
          howToReach: 'வேலூர் வழியாக',
          nearestStation: 'வேல்லூர் ரயில் நிலையம்',
          accommodation: ['கோவில் விடுதி', 'தனியார் லாட்ஜ்கள்'],
          offeringsRecommended: ['பால்', 'வெண்ணெய்', 'பில்வ இலை', 'கங்கா ஜலம்'],
          googleMapsLink: 'https://goo.gl/maps/abc456',
          coordinates: {
            latitude: 13.6834,
            longitude: 79.3241
          }
        }
        // Additional Nava Tirupati temples would be added here...
      ]
    },
    {
      id: 'shakti-peethas',
      name: '51 சக்தி பீடங்கள்',
      englishName: '51 Shakti Peethas',
      description: 'மாதா சதி தேவியின் உடல் பாகங்கள் விழுந்த 51 புனித ஸ்தலங்கள் - அம்மன் அருள் பெற',
      icon: 'flame',
      color: '#dc2626',
      templeCount: 51,
      purpose: 'சக்தி, பெண் சக்தி, மாதா அருள்',
      temples: [
        {
          id: 'kamakhya',
          name: 'காமாக்ஷா தேவி',
          englishName: 'Kamakhya Devi',
          location: 'குவாஹாட்டி, அஸ்ஸாம்',
          deity: 'காமாக்ஷா தேவி',
          significance: 'சதி தேவியின் யோனி விழுந்த ஸ்தலம்',
          speciality: ['சக்தி பீடங்களில் முக்கியமானது', 'அம்பூபாசி திருவிழா', 'தந்திர சாதனை'],
          timings: 'காலை 5:30 - இரவு 10:00',
          festivals: ['அம்பூபாசி', 'நவராத்திரி', 'கலி பூஜை'],
          pariharams: ['சிவப்பு வஸ்திரம்', 'சிவப்பு பூக்கள்', 'சக்தி மந்திர ஜபம்'],
          benefits: ['சந்தான பலம்', 'பெண் சக்தி வளர்ச்சி', 'எதிரிகள் மீது வெற்றி'],
          howToReach: 'குவாஹாட்டி விமான நிலையம் வழியாக',
          nearestStation: 'குவாஹாட்டி ரயில் நிலையம்',
          accommodation: ['அஸ்ஸாம் அரசு விடுதிகள்', 'தனியார் ஹோட்டல்கள்'],
          offeringsRecommended: ['சிவப்பு சேலை', 'சிந்தூரம்', 'குங்குமம்', 'சிவப்பு அரிசி'],
          googleMapsLink: 'https://goo.gl/maps/def789',
          coordinates: {
            latitude: 26.1145,
            longitude: 91.5838
          }
        },
        {
          id: 'kanyakumari',
          name: 'கன்யாகுமரி தேவி',
          englishName: 'Kanyakumari Devi',
          location: 'கன்யாகுமரி, தமிழ்நாடு',
          deity: 'கன்யாகுமரி அம்மன்',
          significance: 'சதி தேவியின் முதுகு விழுந்த ஸ்தலம்',
          speciality: ['மூன்று கடல் சங்கமம்', 'சூரிய உதயம்-அஸ்தமனம்', 'கன்னிப் பெண் வழிபாடு'],
          timings: 'காலை 4:30 - இரவு 8:00',
          festivals: ['நவராத்திரி', 'சித்திரை திருவிழா', 'ஆவணி திருவிழா'],
          pariharams: ['வெள்ளி அபிஷேகம்', 'பூ மாலை', 'நெய் தீபம்'],
          benefits: ['திருமண வரம்', 'கன்னிப் பெண்களுக்கு நல்ல வரம்', 'குடும்ப ஒற்றுமை'],
          howToReach: 'திருவனந்தபுரம் வழியாக',
          nearestStation: 'கன்யாகுமரி ரயில் நிலையம்',
          accommodation: ['TTDC விடுதிகள்', 'கோவில் விடுதி'],
          offeringsRecommended: ['நெல்லிக்காய்', 'வெள்ளை பட்டுச் சேலை', 'ஜாஸ்மின் பூ'],
          googleMapsLink: 'https://goo.gl/maps/ghi012',
          coordinates: {
            latitude: 8.0883,
            longitude: 77.5705
          }
        }
        // Additional Shakti Peethas would be added here...
      ]
    },
    {
      id: 'navagraha-temples',
      name: 'நவகிரக ஸ்தலங்கள்',
      englishName: 'Navagraha Temples',
      description: '9 கிரகங்களுக்கான புனித ஸ்தலங்கள் - கிரக தோஷ நிவர்த்திக்கு',
      icon: 'planet',
      color: '#7c3aed',
      templeCount: 9,
      purpose: 'கிரக தோஷ நிவர்த்தி, கிரக சாந்தி',
      temples: [
        {
          id: 'suryanar-koil',
          name: 'சூரியனார் கோவில்',
          englishName: 'Suryanar Koil',
          location: 'சூரியனார் கோவில், தஞ்சாவூர்',
          deity: 'சூரியன், நவகிரகங்கள்',
          significance: 'நவகிரக தோஷ நிவர்த்தி முக்கிய ஸ்தலம்',
          speciality: ['9 கிரகங்களும் ஒரே கோவிலில்', 'சூரிய பகவான் முக்கிய தெய்வம்', 'கிரக சாந்தி'],
          timings: 'காலை 6:00 - இரவு 8:00',
          festivals: ['ரத சப்தமி', 'சூரிய ஜெயந்தி', 'கிரக சாந்தி'],
          pariharams: ['நவகிரக மண்டல பறிகாரம்', 'கிரக வார பூஜை', 'நவதன்யம் தானம்'],
          benefits: ['கிரக தோஷ நிவார்த்தி', 'ஆரோக்கிய வளர்ச்சி', 'கர்ம விமோசனம்'],
          howToReach: 'தஞ்சாவூர் வழியாக',
          nearestStation: 'கும்பகோணம் ரயில் நிலையம்',
          accommodation: ['கோவில் விடுதி', 'தஞ்சாவூர் ஹோட்டல்கள்'],
          offeringsRecommended: ['நவதன்யம்', 'வெள்ளி நாணயம்', 'கிரக ரத்னங்கள்', 'எண்ணெய்'],
          googleMapsLink: 'https://goo.gl/maps/jkl345',
          coordinates: {
            latitude: 10.7905,
            longitude: 79.1328
          }
        },
        {
          id: 'thirunallar',
          name: 'திருநள்ளாறு',
          englishName: 'Thirunallar',
          location: 'திருநள்ளாறு, காரைக்கால்',
          deity: 'தர்பாரண்யேஸ்வரர் (சனி)',
          significance: 'சனி தோஷ நிவர்த்தி முக்கிய ஸ்தலம்',
          speciality: ['சனி பகவான் மூல ஸ்தானம்', 'சனிக்கிழமை சிறப்பு பூஜை', 'எண்ணெய் அபிஷேகம்'],
          timings: 'காலை 5:30 - இரவு 9:00',
          festivals: ['சனி அமாவாசை', 'சனி ஜெயந்தி', 'சனி சக்தி பூஜை'],
          pariharams: ['எண்ணெய் அபிஷேகம்', 'கருப்பு எள் தானம்', 'சனி மந்திர'],
          benefits: ['சனி தோஷ நிவர்த்தி', 'கர்ம கட்டு விடுதல்', 'வாழ்க்கை சுபம்'],
          howToReach: 'காரைக்கால் வழியாக',
          nearestStation: 'மயிலாடுதுறை ரயில் நிலையம்',
          accommodation: ['கோவில் விடுதி', 'காரைக்கால் லாட்ஜ்கள்'],
          offeringsRecommended: ['எண்ணெய்', 'கருப்பு எள்', 'இரும்பு பொருட்கள்', 'கருணிக்காய்'],
          googleMapsLink: 'https://goo.gl/maps/mno678',
          coordinates: {
            latitude: 10.9278,
            longitude: 79.8464
          }
        }
        // Additional Navagraha temples would be added here...
      ]
    },
    {
      id: 'debt-relief-temples',
      name: 'கடன் பரிகார ஸ்தலங்கள்',
      englishName: 'Debt Relief Temples',
      description: 'கடன் தொல்லை நிவர்த்தி மற்றும் பொருளாதார சிக்கல்களுக்கான சிறப்பு ஸ்தலங்கள்',
      icon: 'card',
      color: '#059669',
      templeCount: 12,
      purpose: 'கடன் விமோசனம், பொருளாதார வளர்ச்சி',
      temples: [
        {
          id: 'tirupati-debt',
          name: 'திருப்பதி வெங்கடேஸ்வரர்',
          englishName: 'Tirupati Venkateswara',
          location: 'திருப்பதி, ஆந்திரா',
          deity: 'ஸ்ரீ வெங்கடேஸ்வரர்',
          significance: 'கடன் நிவர்த்தி மற்றும் செல்வ அருள்',
          speciality: ['கடன் முக்தி', 'செல்வ வளர்ச்சி', 'லக்ஷ்மி அருள்'],
          timings: 'காலை 6:00 - இரவு 10:00',
          festivals: ['வைகுண்ட ஏகாதசி', 'செல்வ வளர்ச்சி பூஜை'],
          pariharams: ['கடன் முக்தி நேர்த்திக்கடன்', 'அஷ்டலக்ஷ்மி ஜபம்', 'வெண்ணெய் அபிஷேகம்'],
          benefits: ['கடன் முக்தி', 'பொருளாதார சுபம்', 'வியாபார வளர்ச்சி'],
          howToReach: 'திருப்பதி வழியாக',
          nearestStation: 'திருப்பதி ரயில் நிலையம்',
          accommodation: ['TTD விடுதிகள்'],
          offeringsRecommended: ['வேண்டுதல் லட்டு', 'பொன் நாணயம்', 'அன்னதானம்'],
          googleMapsLink: 'https://goo.gl/maps/pqr901',
          coordinates: {
            latitude: 13.6288,
            longitude: 79.4192
          }
        },
        {
          id: 'guruvayoor-debt',
          name: 'குருவாயூர் கண்ணன்',
          englishName: 'Guruvayoor Krishna',
          location: 'குருவாயூர், கேரளா',
          deity: 'ஸ்ரீ கிருஷ்ணர்',
          significance: 'கடன் விமோசனம் மற்றும் செல்வ வளர்ச்சி',
          speciality: ['பால் நிவேதனம்', 'கிருஷ்ண அருள்', 'திருஅஞ்சன சேவை'],
          timings: 'காலை 3:00 - இரவு 10:00',
          festivals: ['ஜன்மாஷ்டமி', 'விசு', 'ஏகாதசி'],
          pariharams: ['பால் நிவேதனம்', 'துளசி மாலை', 'ஸ்ரீ கிருஷ்ண மந்திர'],
          benefits: ['கடன் நிவர்த்தி', 'குடும்ப நலம்', 'பொருளாதார சுபம்'],
          howToReach: 'கோச்சி வழியாக',
          nearestStation: 'துரிஷூர் ரயில் நிலையம்',
          accommodation: ['தேவஸ்வம் விடுதிகள்'],
          offeringsRecommended: ['வெண்ணெய்', 'பால்', 'செல்வரை', 'மஞ்சள் பூ'],
          googleMapsLink: 'https://goo.gl/maps/stu234',
          coordinates: {
            latitude: 10.6068,
            longitude: 76.0597
          }
        }
        // Additional debt relief temples would be added here...
      ]
    },
    {
      id: 'marriage-temples',
      name: 'திருமண பரிகார ஸ்தலங்கள்',
      englishName: 'Marriage Remedy Temples',
      description: 'திருமண தாமதம், கல்யாண வரம் மற்றும் திருமண வாழ்க்கை சுபத்திற்கான ஸ்தலங்கள்',
      icon: 'heart',
      color: '#ec4899',
      templeCount: 15,
      purpose: 'திருமண வரம், கல்யாண சுபம்',
      temples: [
        {
          id: 'madurai-meenakshi',
          name: 'மதுரை மீனாக்ஷி',
          englishName: 'Madurai Meenakshi',
          location: 'மதுரை, தமிழ்நாடு',
          deity: 'மீனாக்ஷி அம்மன் - சுந்தரேஸ்வரர்',
          significance: 'கல்யாண வரத்திற்கு புகழ்பெற்ற ஸ்தலம்',
          speciality: ['மீனாக்ஷி கல்யாணம்', 'அருள்மிகு திருமணம்', 'சுந்தரேஸ்வரர் சன்னிதி'],
          timings: 'காலை 5:00 - இரவு 9:30',
          festivals: ['மீனாக்ஷி கல்யாணம்', 'நவராத்திரி', 'சித்திரை திருவிழா'],
          pariharams: ['கல்யாண வரத்திற்கு மாலை சாத்துதல்', 'மீனாக்ஷி அம்மன் பூஜை'],
          benefits: ['கல்யாண வரம்', 'திருமண வாழ்க்கை சுபம்', 'குடும்ப நலம்'],
          howToReach: 'மதுரை விமான/ரயில் நிலையம்',
          nearestStation: 'மதுரை ரயில் நிலையம்',
          accommodation: ['தமிழ்நாடு அரசு விடுதிகள்', 'தனியார் ஹோட்டல்கள்'],
          offeringsRecommended: ['பட்டுச் சேலை', 'மல்லிகை பூ', 'குங்குமம்', 'மாங்கல்ய சூத்திரம்'],
          googleMapsLink: 'https://goo.gl/maps/vwx567',
          coordinates: {
            latitude: 9.9252,
            longitude: 78.1198
          }
        },
        {
          id: 'kalahasti',
          name: 'காளஹஸ்தி',
          englishName: 'Kalahasti',
          location: 'ஸ்ரீ காளஹஸ்தி, ஆந்திரா',
          deity: 'காளஹஸ்தீஸ்வரர் - ஞான பிரசுன்னி',
          significance: 'ராகு கேது தோஷ நிவர்த்தி மற்றும் திருமண வரம்',
          speciality: ['ராகு கேது பரிகாரம்', 'காற்று லிங்கம்', 'சர்ப்ப தோஷ நிவர்த்தி'],
          timings: 'காலை 6:00 - இரவு 9:00',
          festivals: ['மகா சிவராத்திரி', 'கார்த்திகை', '12 ஜோதிர்லிங்க பூஜை'],
          pariharams: ['ராகு கேது பூஜை', 'நாக பஞ்சமி வழிபாடு', 'சர்ப்ப தோஷ பரிகாரம்'],
          benefits: ['திருமண தடை நீக்கம்', 'ராகு கேது சாந்தி', 'சர்ப்ப தோஷ நிவர்த்தி'],
          howToReach: 'திருப்பதி வழியாக',
          nearestStation: 'ரேணிகுண்ட ரயில் நிலையம்',
          accommodation: ['ஆந்திரா அரசு விடுதி', 'கோவில் விடுதி'],
          offeringsRecommended: ['பால்', 'வெண்ணெய்', 'நாக பிரதிமை', 'ரத்தின சர்ப்பம்'],
          googleMapsLink: 'https://goo.gl/maps/yz1234',
          coordinates: {
            latitude: 13.2500,
            longitude: 79.6833
          }
        }
        // Additional marriage remedy temples would be added here...
      ]
    },
    {
      id: 'child-blessing-temples',
      name: 'சந்தான பிராப்தி ஸ்தலங்கள்',
      englishName: 'Child Blessing Temples',
      description: 'சந்தான பாக்யம், குழந்தை பாக்யம் மற்றும் கர்ப்ப ரக்ஷைக்கான புனித ஸ்தலங்கள்',
      icon: 'people',
      color: '#f59e0b',
      templeCount: 18,
      purpose: 'சந்தான பிராப்தி, குழந்தை பாக்யம்',
      temples: [
        {
          id: 'palani-murugan',
          name: 'பழனி முருகன்',
          englishName: 'Palani Murugan',
          location: 'பழனி, தமிழ்நாடு',
          deity: 'ஸ்ரீ தண்டாயுதபாணி',
          significance: 'குழந்தை பாக்கியத்திற்கு புகழ்பெற்ற ஸ்தலம்',
          speciality: ['அபூர்வ பால நிவேதனம்', 'பஞ்சாமிர்த அபிஷேகம்', 'முருகன் அருள்'],
          timings: 'காலை 5:00 - இரவு 10:00',
          festivals: ['கந்த சஷ்டி', 'பங்குனி உத்திரம்', 'வைகாசி விசாகம்'],
          pariharams: ['பால் அபிஷேகம்', 'காவடி எடுத்தல்', 'வெல் வழிபாடு'],
          benefits: ['சந்தான பாக்யம்', 'கர்ப்ப ரக்ஷை', 'குழந்தைகள் நலம்'],
          howToReach: 'மதுரை/கோயம்புத்தூர் வழியாக',
          nearestStation: 'பழனி ரயில் நிலையம்',
          accommodation: ['அருள்மிகு விடுதி', 'தனியார் லாட்ฒ்கள்'],
          offeringsRecommended: ['பால்', 'தேன்', 'பழங்கள்', 'வெல் மாலை'],
          googleMapsLink: 'https://goo.gl/maps/abc567',
          coordinates: {
            latitude: 10.4422,
            longitude: 77.6556
          }
        }
        // Additional child blessing temples would be added here...
      ]
    },
    {
      id: 'education-temples',
      name: 'கல்வி வளர்ச்சி ஸ்தலங்கள்',
      englishName: 'Education Enhancement Temples',
      description: 'கல்வி வளர்ச்சி, அறிவு வளர்ச்சி மற்றும் சரஸ்வதி அருளுக்கான ஸ்தலங்கள்',
      icon: 'library',
      color: '#0891b2',
      templeCount: 10,
      purpose: 'கல்வி வளர்ச்சி, சரஸ்வதி அருள்',
      temples: [
        {
          id: 'mannargudi',
          name: 'மன்னார்குடி ராஜகோபால ஸ்வாமி',
          englishName: 'Mannargudi Rajagopala Swamy',
          location: 'மன்னார்குடி, தஞ்சாவூர்',
          deity: 'ஸ்ரீ ராஜகோபால ஸ்வாமி',
          significance: 'கல்வி வளர்ச்சி மற்றும் புத்தி சக்தி வளர்ச்சி',
          speciality: ['சரஸ்வதி வீணை', 'கல்வி பூஜை', 'வித்யா தானம்'],
          timings: 'காலை 6:00 - இரவு 8:00',
          festivals: ['சரஸ்வதி பூஜை', 'வசந்த பஞ்சமி', 'நவராத்ரி'],
          pariharams: ['புஸ்தக பூஜை', 'எழுத்து வழிபாடு', 'சரஸ்வதி மந்திர'],
          benefits: ['கல்வி வளர்ச்சி', 'அறிவு வளர்ச்சி', 'தேர்வு வெற்றி'],
          howToReach: 'தஞ்சாவூர் வழியாக',
          nearestStation: 'திருவாரூர் ரயில் நிலையம்',
          accommodation: ['கோவில் விடுதி'],
          offeringsRecommended: ['புஸ்தகங்கள்', 'பேனா', 'பச்சை வஸ்திரம்', 'வெள்ளை பூ'],
          googleMapsLink: 'https://maps.app.goo.gl/mJc3jYkXbE4kZfA9A',
          coordinates: {
            latitude: 10.6667,
            longitude: 79.4417
          }
        },
        {
          id: 'madurai-meenakshi-education',
          name: 'மதுரை மீனாக்ஷி அம்மன் கோவில்',
          englishName: 'Madurai Meenakshi Amman Temple',
          location: 'மதுரை, தமிழ்நாடு',
          deity: 'சரஸ்வதி தேவி சன்னதி',
          significance: 'மீனாக்ஷி அம்மன் கோவிலில் உள்ள சரஸ்வதி சன்னதி கல்வி வளர்ச்சிக்கு மிகவும் உகந்தது.',
          speciality: ['சகலகலாவல்லி மாலை பாராயணம்', 'கல்வி உபகரணங்கள் வைத்து வழிபாடு'],
          timings: 'காலை 5:00 - மதியம் 12:30, மாலை 4:00 - இரவு 9:30',
          festivals: ['நவராத்திரி', 'சரஸ்வதி பூஜை'],
          pariharams: ['சகலகலாவல்லி மாலை பாராயணம்', 'வெள்ளை தாமரை பூ அர்ச்சனை'],
          benefits: ['தேர்வில் வெற்றி', 'கூர்மையான அறிவு', 'கலைகளில் தேர்ச்சி'],
          howToReach: 'மதுரை விமான/ரயில் நிலையம் வழியாக எளிதில் அடையலாம்',
          nearestStation: 'மதுரை ரயில் நிலையம்',
          accommodation: ['மதுரையில் பல தனியார் ஹோட்டல்கள் உள்ளன', 'கோவில் தேவஸ்தான விடுதிகள்'],
          offeringsRecommended: ['புத்தகங்கள்', 'பேனா', 'வெள்ளை வஸ்திரம்'],
          googleMapsLink: 'https://maps.app.goo.gl/abL54b3tV6yTf2xZA',
          coordinates: {
            latitude: 9.9195,
            longitude: 78.1193
          }
        },
        {
          id: 'namakkal-namagiri',
          name: 'நாமக்கல் நாமகிரித்தாயார்',
          englishName: 'Namakkal Namagiri Thayar',
          location: 'நாமக்கல், தமிழ்நாடு',
          deity: 'நாமகிரித்தாயார் (லக்ஷ்மி)',
          significance: 'கணித மேதை ராமானுஜர் வழிபட்ட தலம். கல்வி மற்றும் கணிதத்தில் சிறந்து விளங்க அருள் புரிகிறார்.',
          speciality: ['கணித பிரச்சனைகளுக்கு தீர்வு', 'மாணவர்கள் சிறப்பு வழிபாடு'],
          timings: 'காலை 6:30 - மதியம் 1:00, மாலை 4:30 - இரவு 9:00',
          festivals: ['நவராத்திரி', 'வைகுண்ட ஏகாதசி'],
          pariharams: ['நெய் தீபம் ஏற்றுதல்', 'ஸ்ரீ லக்ஷ்மி ஸ்தோத்திரம் பாராயணம்'],
          benefits: ['கணிதத்தில் மேன்மை', 'கல்வித் தடைகள் நீங்குதல்', 'தெளிவான சிந்தனை'],
          howToReach: 'சேலம் அல்லது கரூரிலிருந்து பேருந்து மூலம் எளிதில் அடையலாம்',
          nearestStation: 'சேலம் ரயில் நிலையம்',
          accommodation: ['நாமக்கல்லில் தனியார் ஹோட்டல்கள் உள்ளன'],
          offeringsRecommended: ['தாமரை பூ', 'தேன்', 'நெய்'],
          googleMapsLink: 'https://maps.app.goo.gl/hE4ZgYxVp8sA2bCq7',
          coordinates: {
            latitude: 11.2267,
            longitude: 78.1634
          }
        }
        // Additional education temples would be added here...
      ]
    },
    {
      id: 'health-temples',
      name: 'ஆரோக்கிய வளர்ச்சி ஸ்தலங்கள்',
      englishName: 'Health & Wellness Temples',
      description: 'ஆரோக்கியம், நோய் நிவர்த்தி மற்றும் ஆயுள் வளர்ச்சிக்கான புனித ஸ்தலங்கள்',
      icon: 'medical',
      color: '#16a34a',
      templeCount: 14,
      purpose: 'ஆரோக்கிய வளர்ச்சி, நோய் நிவர்த்தி',
      temples: [
        {
          id: 'vaitheeswaran-koil',
          name: 'வைத்தீஸ்வரன் கோவில்',
          englishName: 'Vaitheeswaran Koil',
          location: 'வைத்தீஸ்வரன் கோவில், நாகை',
          deity: 'வைத்தீஸ்வரன் - தையல் நாயகி',
          significance: 'மருத்துவத் தெய்வம், நோய் நிவர்த்தி',
          speciality: ['மருத்துவ லிங்கம்', 'சிகிச்சை தீர்த்தம்', 'அங்காரகன் சன்னிதி'],
          timings: 'காலை 5:30 - இரவு 9:00',
          festivals: ['மகா சிவராத்திரி', 'செவ்வாய் பெயர்ச்சி', 'கார்த்திகை'],
          pariharams: ['மருத்துவ எண்ணெய் அபிஷேகம்', 'ஆரோக்கிய நேர்த்திக்கடன்', 'நோய் நிவர்த்தி பூஜை'],
          benefits: ['நோய் நிவர்த்தி', 'ஆரோக்கிய வளர்ச்சி', 'செவ்வாய் தோஷ நிவர்த்தி'],
          howToReach: 'சிதம்பரம் வழியாக',
          nearestStation: 'மயிலாடுதுறை ரயில் நிலையம்',
          accommodation: ['கோவில் விடுதி', 'தனியார் லாட்ஜ்கள்'],
          offeringsRecommended: ['மருத்துவ எண்ணெய்', 'மஞ்சள்', 'வேம்பு இலை', 'துளசி'],
          googleMapsLink: 'https://goo.gl/maps/klm901',
          coordinates: {
            latitude: 10.9333,
            longitude: 79.8375
          }
        }
        // Additional health temples would be added here...
      ]
    },
    {
      id: 'natchathira-temples-thisai',
      name: '27 நட்சத்திர திசை வாரியான கோவில்கள்',
      englishName: '27 Nakshatra Temples (Dasa-wise)',
      description: 'ஒவ்வொரு நட்சத்திரத்திற்கும் உரிய திசை வாரியான பரிகார ஸ்தலங்கள். முழு விவரங்கள் விரைவில் சேர்க்கப்படும்.',
      icon: 'star-outline',
      color: '#f97316',
      templeCount: 27,
      purpose: 'நட்சத்திர தோஷ நிவர்த்தி, திசை பலம்',
      temples: [
        {
          id: 'ashwini-temple',
          name: 'அஸ்வினி நட்சத்திர கோவில்',
          englishName: 'Ashwini Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'அஸ்வினி நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['அஸ்வினி நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'bharani-temple',
          name: 'பரணி நட்சத்திர கோவில்',
          englishName: 'Bharani Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'பரணி நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['பரணி நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'krittika-temple',
          name: 'கிருத்திகை நட்சத்திர கோவில்',
          englishName: 'Krittika Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'கிருத்திகை நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['கிருத்திகை நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'rohini-temple',
          name: 'ரோகிணி நட்சத்திர கோவில்',
          englishName: 'Rohini Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'ரோகிணி நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['ரோகிணி நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'mrigashirsha-temple',
          name: 'மிருகசீரிடம் நட்சத்திர கோவில்',
          englishName: 'Mrigashirsha Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'மிருகசீரிடம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['மிருகசீரிடம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'ardra-temple',
          name: 'திருவாதிரை நட்சத்திர கோவில்',
          englishName: 'Ardra Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'திருவாதிரை நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['திருவாதிரை நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'punarvasu-temple',
          name: 'புனர்பூசம் நட்சத்திர கோவில்',
          englishName: 'Punarvasu Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'புனர்பூசம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['புனர்பூசம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'pushya-temple',
          name: 'பூசம் நட்சத்திர கோவில்',
          englishName: 'Pushya Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'பூசம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['பூசம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'ashlesha-temple',
          name: 'ஆயில்யம் நட்சத்திர கோவில்',
          englishName: 'Ashlesha Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'ஆயில்யம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['ஆயில்யம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'magha-temple',
          name: 'மகம் நட்சத்திர கோவில்',
          englishName: 'Magha Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'மகம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['மகம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'purva-phalguni-temple',
          name: 'பூரம் நட்சத்திர கோவில்',
          englishName: 'Purva Phalguni Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'பூரம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['பூரம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'uttara-phalguni-temple',
          name: 'உத்திரம் நட்சத்திர கோவில்',
          englishName: 'Uttara Phalguni Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'உத்திரம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['உத்திரம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'hasta-temple',
          name: 'ஹஸ்தம் நட்சத்திர கோவில்',
          englishName: 'Hasta Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'ஹஸ்தம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['ஹஸ்தம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'chitra-temple',
          name: 'சித்திரை நட்சத்திர கோவில்',
          englishName: 'Chitra Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'சித்திரை நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['சித்திரை நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'swati-temple',
          name: 'சுவாதி நட்சத்திர கோவில்',
          englishName: 'Swati Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'சுவாதி நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['சுவாதி நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'vishakha-temple',
          name: 'விசாகம் நட்சத்திர கோவில்',
          englishName: 'Vishakha Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'விசாகம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['விசாகம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'anuradha-temple',
          name: 'அனுஷம் நட்சத்திர கோவில்',
          englishName: 'Anuradha Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'அனுஷம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['அனுஷம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'jyeshtha-temple',
          name: 'கேட்டை நட்சத்திர கோவில்',
          englishName: 'Jyeshtha Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'கேட்டை நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['கேட்டை நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'mula-temple',
          name: 'மூலம் நட்சத்திர கோவில்',
          englishName: 'Mula Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'மூலம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['மூலம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'purva-ashadha-temple',
          name: 'பூராடம் நட்சத்திர கோவில்',
          englishName: 'Purva Ashadha Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'பூராடம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['பூராடம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'uttara-ashadha-temple',
          name: 'உத்திராடம் நட்சத்திர கோவில்',
          englishName: 'Uttara Ashadha Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'உத்திராடம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['உத்திராடம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'shravana-temple',
          name: 'திருவோணம் நட்சத்திர கோவில்',
          englishName: 'Shravana Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'திருவோணம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['திருவோணம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'dhanishta-temple',
          name: 'அவிட்டம் நட்சத்திர கோவில்',
          englishName: 'Dhanishta Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'அவிட்டம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['அவிட்டம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'shatabhisha-temple',
          name: 'சதயம் நட்சத்திர கோவில்',
          englishName: 'Shatabhisha Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'சதயம் நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['சதயம் நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'purva-bhadrapada-temple',
          name: 'பூரட்டாதி நட்சத்திர கோவில்',
          englishName: 'Purva Bhadrapada Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'பூரட்டாதி நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['பூரட்டாதி நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'uttara-bhadrapada-temple',
          name: 'உத்திரட்டாதி நட்சத்திர கோவில்',
          englishName: 'Uttara Bhadrapada Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'உத்திரட்டாதி நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['உத்திரட்டாதி நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        },
        {
          id: 'revati-temple',
          name: 'ரேவதி நட்சத்திர கோவில்',
          englishName: 'Revati Nakshatra Temple',
          location: 'விவரங்கள் பின்னர் சேர்க்கப்படும்',
          deity: 'TBD',
          significance: 'ரேவதி நட்சத்திரத்திற்கான கோவில். விவரங்கள் விரைவில் சேர்க்கப்படும்.',
          speciality: ['Placeholder'],
          timings: 'TBD',
          festivals: ['TBD'],
          pariharams: ['TBD'],
          benefits: ['ரேவதி நட்சத்திர தோஷ நிவர்த்தி'],
          howToReach: 'TBD',
          nearestStation: 'TBD',
          accommodation: ['TBD'],
          offeringsRecommended: ['TBD'],
          googleMapsLink: '',
          coordinates: { latitude: 0, longitude: 0 }
        }
      ]
    }
  ];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.filteredTempleGroups = this.templeGroups;
    this.loadProgress();
  }

  ionViewWillEnter() {
    this.filteredTempleGroups = this.templeGroups;
  }

  searchTempleGroups() {
    const term = this.searchTerm.toLowerCase();
    this.filteredTempleGroups = this.templeGroups.filter(group =>
      group.name.toLowerCase().includes(term) ||
      group.englishName.toLowerCase().includes(term) ||
      group.description.toLowerCase().includes(term) ||
      group.purpose.toLowerCase().includes(term) ||
      group.temples.some(temple =>
        temple.name.toLowerCase().includes(term) ||
        temple.englishName.toLowerCase().includes(term) ||
        temple.location.toLowerCase().includes(term) ||
        temple.deity.toLowerCase().includes(term)
      )
    );
  }

  async openTempleGroupDetail(templeGroup: TempleGroup) {
    this.selectedTempleGroup = templeGroup;
    this.isModalOpen = true;
  }

  async openTempleDetail(temple: Temple) {
    this.selectedTemple = temple;
    this.isTempleDetailModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedTempleGroup = null;
  }

  closeTempleDetailModal() {
    this.isTempleDetailModalOpen = false;
    this.selectedTemple = null;
  }

  toggleFavorite(templeGroupId: string) {
    const index = this.favoriteTempleGroups.indexOf(templeGroupId);
    if (index > -1) {
      this.favoriteTempleGroups.splice(index, 1);
    } else {
      this.favoriteTempleGroups.push(templeGroupId);
    }
    this.saveProgress();
  }

  toggleVisited(templeId: string) {
    const index = this.visitedTemples.indexOf(templeId);
    if (index > -1) {
      this.visitedTemples.splice(index, 1);
    } else {
      this.visitedTemples.push(templeId);
    }
    this.saveProgress();
  }

  isFavorite(templeGroupId: string): boolean {
    return this.favoriteTempleGroups.includes(templeGroupId);
  }

  isVisited(templeId: string): boolean {
    return this.visitedTemples.includes(templeId);
  }

  private saveProgress() {
    localStorage.setItem('templeFavorites', JSON.stringify(this.favoriteTempleGroups));
    localStorage.setItem('visitedTemples', JSON.stringify(this.visitedTemples));
  }

  private loadProgress() {
    const favorites = localStorage.getItem('templeFavorites');
    const visited = localStorage.getItem('visitedTemples');

    if (favorites) {
      this.favoriteTempleGroups = JSON.parse(favorites);
    }

    if (visited) {
      this.visitedTemples = JSON.parse(visited);
    }
  }

  getVisitedTemplesCount(): number {
    let totalVisited = 0;
    this.templeGroups.forEach(group => {
      group.temples.forEach(temple => {
        if (this.isVisited(temple.id)) {
          totalVisited++;
        }
      });
    });
    return totalVisited;
  }

  getTotalTemplesCount(): number {
    return this.templeGroups.reduce((total, group) => total + group.temples.length, 0);
  }

  getProgressPercentage(): number {
    const total = this.getTotalTemplesCount();
    if (total === 0) return 0;
    return Math.round((this.getVisitedTemplesCount() / total) * 100);
  }

  openGoogleMaps(temple: Temple) {
    if (temple.googleMapsLink) {
      window.open(temple.googleMapsLink, '_blank');
    } else if (temple.coordinates) {
      // Fallback to coordinates if direct link is not available
      const url = `https://www.google.com/maps?q=${temple.coordinates.latitude},${temple.coordinates.longitude}`;
      window.open(url, '_blank');
    } else {
      // Search by temple name and location
      const searchQuery = encodeURIComponent(`${temple.name} ${temple.location}`);
      const url = `https://www.google.com/maps/search/${searchQuery}`;
      window.open(url, '_blank');
    }
  }

  getDirectionsToTemple(temple: Temple) {
    if (temple.coordinates) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${temple.coordinates.latitude},${temple.coordinates.longitude}`;
      window.open(url, '_blank');
    } else {
      const searchQuery = encodeURIComponent(`${temple.name} ${temple.location}`);
      const url = `https://www.google.com/maps/dir/?api=1&destination=${searchQuery}`;
      window.open(url, '_blank');
    }
  }
}
