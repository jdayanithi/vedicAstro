import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Nakshatra {
  id: string;
  number: number;
  name: string;
  nameEnglish: string;
  sanskritName: string;
  lord: string;
  rulingPlanet: string;
  deity: string;
  deityEnglish: string;
  symbol: string;
  symbolEnglish: string;
  gana: string;
  nature: string;
  element: string;
  yoni: string;
  yoniEnglish: string;
  yoniAnimal: string;
  yoniGender: string;
  varna: string;
  bodyParts: string[];
  foodPreferences: string[];
  favorableFoods: string[];
  unfavorableFoods: string[];
  colors: string[];
  places: string[];
  favorablePlaces: string[];
  unfavorablePlaces: string[];
  temples: string[];
  characteristics: string[];
  significances: string[];
  dnaTraits: string[];
  dnaCharacteristics: string[];
  strengths: string[];
  weaknesses: string[];
  remedies: string[];
  mantras: string[];
  expanded?: boolean;
}

@Component({
  selector: 'app-natchathiram-karakathuvam',
  templateUrl: './natchathiram-karakathuvam.page.html',
  styleUrls: ['./natchathiram-karakathuvam.page.scss'],
})
export class NatchathiramKarakathuvamPage implements OnInit {
  selectedSegment: string = 'overview';
  isBookmarked: boolean = false;
  searchTerm: string = '';
  selectedGana: string = 'all';
  filteredNakshatras: Nakshatra[] = [];
  currentNakshatraIndex: number = 0;

  nakshatras: Nakshatra[] = [
    {
      id: 'nakshatra_1',
      number: 1,
      name: 'அஸ்வினி',
      nameEnglish: 'Ashwini',
      sanskritName: 'अश्विनी',
      lord: 'கேது',
      rulingPlanet: 'Ketu',
      deity: 'அஸ்வினி குமாரர்கள்',
      deityEnglish: 'Ashwini Kumaras',
      symbol: 'குதிரையின் தலை',
      symbolEnglish: 'Horse Head',
      gana: 'தேவ கணம்',
      nature: 'லகு (விரைவு)',
      element: 'பூமி',
      yoni: 'அஸ்வ யோனி',
      yoniEnglish: 'Horse Yoni',
      yoniAnimal: 'குதிரை',
      yoniGender: 'ஆண்',
      varna: 'வைஸ்ய',
      bodyParts: ['மூழங்கால்', 'பாதம்'],
      foodPreferences: ['இனிப்பு', 'புளிப்பு'],
      favorableFoods: ['தேன்', 'பால்', 'நெய்', 'கருப்பட்டி', 'இனிப்பு பழங்கள்'],
      unfavorableFoods: ['அதிக காரம்', 'மாமிசம்', 'மது'],
      colors: ['சிவப்பு', 'தங்க நிறம்'],
      places: ['மருத்துவமனைகள்', 'குதிரை சாலைகள்', 'வேலைவாய்ப்பு நிலையங்கள்'],
      favorablePlaces: ['கிழக்கு திசை', 'மருத்துவ மையங்கள்', 'விளையாட்டு மைதானங்கள்'],
      unfavorablePlaces: ['தெற்கு திசை', 'இருண்ட இடங்கள்'],
      temples: ['அஸ்வினி குமார கோயில்கள்', 'மருத்துவ தெய்வங்கள் கோயில்கள்'],
      characteristics: [
        'விரைவான செயல்பாடு',
        'மருத்துவ திறன்',
        'தலைமைத்துவ குணம்',
        'சாகசப் பிரியர்'
      ],
      significances: [
        'மருத்துவம் மற்றும் சிகிச்சை',
        'விரைவான பயணம்',
        'புதிய தொடக்கங்கள்',
        'குதிரை சார்ந்த தொழில்கள்'
      ],
      dnaTraits: [
        'வேகமான மெட்டபாலிசம்',
        'நல்ல உடல் வலிமை',
        'விரைவான குணமடையும் சக்தி'
      ],
      dnaCharacteristics: [
        'எலும்பு வலிமை',
        'தசை நார்களின் வலிமை',
        'நரம்பு மண்டல வேகம்'
      ],
      strengths: ['தலைமைத்துவம்', 'மருத்துவ அறிவு', 'வேகம்', 'சாகசம்'],
      weaknesses: ['பொறுமையின்மை', 'அவசரம்', 'கர்வம்'],
      remedies: [
        'கேது வழிபாடு',
        'அஸ்வினி குமாரர்களை வணங்குதல்',
        'செவ்வாய்க்கிழமை விரதம்'
      ],
      mantras: [
        'ஓம் அஸ்வினி குமாராய நமஃ',
        'ஓம் கேதவே நமஃ'
      ]
    },
    {
      id: 'nakshatra_2',
      number: 2,
      name: 'பரணி',
      nameEnglish: 'Bharani',
      sanskritName: 'भरणी',
      lord: 'சுக்கிரன்',
      rulingPlanet: 'Venus',
      deity: 'யமன்',
      deityEnglish: 'Yama',
      symbol: 'யோனி',
      symbolEnglish: 'Yoni/Vulva',
      gana: 'மனுஷ்ய கணம்',
      nature: 'உக்ர (கொடூரம்)',
      element: 'பூமி',
      yoni: 'கஜ யோனி',
      yoniEnglish: 'Elephant Yoni',
      yoniAnimal: 'யானை',
      yoniGender: 'பெண்',
      varna: 'க்ஷத்ரிய',
      bodyParts: ['தலை மேல் பகுதி', 'கண்கள்'],
      foodPreferences: ['இனிப்பு', 'புளிப்பு'],
      favorableFoods: ['பால் பொருட்கள்', 'பழங்கள்', 'தேன்', 'நெய்'],
      unfavorableFoods: ['மாமிசம்', 'மது', 'அதிக காரம்'],
      colors: ['சிவப்பு', 'இளஞ்சிவப்பு'],
      places: ['மகப்பேறு மருத்துவமனைகள்', 'புனித இடங்கள்', 'கல்லறைகள்'],
      favorablePlaces: ['தெற்கு திசை', 'மகப்பேறு மையங்கள்', 'ஆன்மீக இடங்கள்'],
      unfavorablePlaces: ['வடக்கு திசை', 'இருண்ட இடங்கள்'],
      temples: ['அம்மன் கோயில்கள்', 'யம கோயில்கள்', 'சுக்கிர கோயில்கள்'],
      characteristics: [
        'பலமான உணர்வுகள்',
        'பாதுகாப்பு உணர்வு',
        'தியாக உணர்வு',
        'உத்வேகம்'
      ],
      significances: [
        'பிறப்பு மற்றும் மரணம்',
        'மாற்றம் மற்றும் உருமாற்றம்',
        'பாலியல் சக்தி',
        'ஆக்கம் மற்றும் அழிவு'
      ],
      dnaTraits: [
        'வலுவான இனப்பெருக்க சக்தி',
        'உணர்ச்சி வசப்படுதல்',
        'மன அழுத்த எதிர்ப்பு'
      ],
      dnaCharacteristics: [
        'ஹார்மோன் சமநிலை',
        'இனப்பெருக்க உறுப்புகள் வலிமை',
        'உணர்ச்சி கட்டுப்பாடு'
      ],
      strengths: ['தீர்மானம்', 'வீரம்', 'பாதுகாப்பு', 'நம்பகத்தன்மை'],
      weaknesses: ['கோபம்', 'பொறாமை', 'அதிக உணர்ச்சி'],
      remedies: [
        'சுக்கிர வழிபாடு',
        'யம ராஜ வழிபாடு',
        'வெள்ளிக்கிழமை விரதம்'
      ],
      mantras: [
        'ஓம் யமாய நமஃ',
        'ஓம் சுக்காராய நமஃ'
      ]
    },
    {
      id: 'nakshatra_3',
      number: 3,
      name: 'கார்த்திகை',
      nameEnglish: 'Krittika',
      sanskritName: 'कृत्तिका',
      lord: 'சூரியன்',
      rulingPlanet: 'Sun',
      deity: 'அக்னி',
      deityEnglish: 'Agni',
      symbol: 'கத்தி அல்லது சூல்',
      symbolEnglish: 'Knife or Spear',
      gana: 'ராக்ஷச கணம்',
      nature: 'மிஸ்ர (கலந்த)',
      element: 'அக்னி',
      yoni: 'மேஷ யோனி',
      yoniEnglish: 'Sheep Yoni',
      yoniAnimal: 'ஆடு',
      yoniGender: 'பெண்',
      varna: 'பிராமணர்',
      bodyParts: ['இடுப்பு', 'தலை பின் பகுதி'],
      foodPreferences: ['காரம்', 'உவர்ப்பு'],
      favorableFoods: ['மசாலா உணவுகள்', 'காரம்', 'இறைச்சி', 'சூடான உணவுகள்'],
      unfavorableFoods: ['குளிர்ந்த உணவுகள்', 'மிதமான சுவை'],
      colors: ['சிவப்பு', 'ஆரஞ்சு', 'தங்க நிறம்'],
      places: ['அடுப்பங்கரை', 'தீ வழிபாட்டு இடங்கள்', 'பட்டறைகள்'],
      favorablePlaces: ['கிழக்கு திசை', 'தீ சார்ந்த இடங்கள்', 'பட்டறைகள்'],
      unfavorablePlaces: ['மேற்கு திசை', 'குளிர்ந்த இடங்கள்'],
      temples: ['முருகன் கோயில்கள்', 'அக்னி கோயில்கள்', 'சூரிய கோயில்கள்'],
      characteristics: [
        'தீக்ஷண்ய புத்தி',
        'தலைமைத்துவம்',
        'வெட்டித் தெளிவாக்கும் சக்தி',
        'தீர்மானகரமான நடவடிக்கை'
      ],
      significances: [
        'தீ மற்றும் வெளிச்சம்',
        'சுத்திகரிப்பு',
        'வெட்டித் தெளிவாக்குதல்',
        'புகழ் மற்றும் கீர்த்தி'
      ],
      dnaTraits: [
        'வலுவான செரிமான சக்தி',
        'உயர் வெப்பநிலை தாங்கும் சக்தி',
        'தீவிரமான உணர்ச்சிகள்'
      ],
      dnaCharacteristics: [
        'மெட்டபாலிசம் வேகம்',
        'தீ எதிர்ப்பு சக்தி',
        'ஆக்ரோஷ ஹார்மோன்கள்'
      ],
      strengths: ['தலைமைத்துவம்', 'தீர்மானம்', 'புகழ்', 'வெட்டித் தெளிவு'],
      weaknesses: ['கோபம்', 'விமர்சனம்', 'பொறுமையின்மை'],
      remedies: [
        'சூரிய வழிபாடு',
        'அக்னி ஹோத்திரம்',
        'ஞாயிற்றுக்கிழமை விரதம்'
      ],
      mantras: [
        'ஓம் அக்னியே நமஃ',
        'ஓம் சூர்யாய நமஃ'
      ]
    },
    {
      id: 'nakshatra_4',
      number: 4,
      name: 'ரோகிணி',
      nameEnglish: 'Rohini',
      sanskritName: 'रोहिणी',
      lord: 'சந்திரன்',
      rulingPlanet: 'Moon',
      deity: 'பிரம்மா',
      deityEnglish: 'Brahma',
      symbol: 'காளையின் வாகனம்',
      symbolEnglish: 'Bull Cart',
      gana: 'மனுஷ்ய கணம்',
      nature: 'திர (நிலைத்த)',
      element: 'பூமி',
      yoni: 'சர்ப யோனி',
      yoniEnglish: 'Snake Yoni',
      yoniAnimal: 'பாம்பு',
      yoniGender: 'ஆண்',
      varna: 'சூத்திரர்',
      bodyParts: ['கால்கள்', 'கணுக்கால்'],
      foodPreferences: ['இனிப்பு', 'மிதமான'],
      favorableFoods: ['பால்', 'வெண்ணெய்', 'இனிப்பு பலகாரங்கள்', 'பழங்கள்'],
      unfavorableFoods: ['காரம்', 'மது', 'புளிப்பு'],
      colors: ['வெள்ளை', 'கிரீம்', 'வெள்ளி'],
      places: ['வயல்வெளிகள்', 'பால் பண்ணைகள்', 'அழகுபடுத்தும் சொகங்கள்'],
      favorablePlaces: ['வடக்கு திசை', 'பண்ணைகள்', 'அழகு சொகங்கள்'],
      unfavorablePlaces: ['தெற்கு திசை', 'பாலைவனங்கள்'],
      temples: ['கிருஷ்ணர் கோயில்கள்', 'லக்ஷ்மி கோயில்கள்', 'சந்திர கோயில்கள்'],
      characteristics: [
        'அழகு மற்றும் கவர்ச்சி',
        'கலை ஆர்வம்',
        'பொருள் ஆசை',
        'உணர்ச்சிவசப்படுதல்'
      ],
      significances: [
        'அழகு மற்றும் கவர்ச்சி',
        'வளர்ச்சி மற்றும் வளம்',
        'பொருள் சுகம்',
        'இனப்பெருக்கம்'
      ],
      dnaTraits: [
        'அழகான தோற்றம்',
        'சுவை அறிவு',
        'கலை ஜீன்கள்'
      ],
      dnaCharacteristics: [
        'அழகு ஜீன்கள்',
        'இனிமையான குரல்',
        'ஆக்கப்பூர்வ திறன்கள்'
      ],
      strengths: ['அழகு', 'கலை', 'வளம்', 'பிரபலம்'],
      weaknesses: ['பொருள் ஆசை', 'பொறாமை', 'கர்வம்'],
      remedies: [
        'சந்திர வழிபாடு',
        'பிரம்மா வழிபாடு',
        'திங்கள்கிழமை விரதம்'
      ],
      mantras: [
        'ஓம் சோம் சோமாய நமஃ',
        'ஓம் பிரம்மணே நமஃ'
      ]
    },
    {
      id: 'nakshatra_5',
      number: 5,
      name: 'மிருகசீர்ஷம்',
      nameEnglish: 'Mrigashira',
      sanskritName: 'मृगशिरा',
      lord: 'செவ்வாய்',
      rulingPlanet: 'Mars',
      deity: 'சோமன்',
      deityEnglish: 'Soma',
      symbol: 'மான் தலை',
      symbolEnglish: 'Deer Head',
      gana: 'தேவ கணம்',
      nature: 'மிருது (மென்மை)',
      element: 'பூமி',
      yoni: 'சர்ப யோனி',
      yoniEnglish: 'Snake Yoni',
      yoniAnimal: 'பாம்பு',
      yoniGender: 'பெண்',
      varna: 'சேவகர்',
      bodyParts: ['கண்கள்', 'புருவங்கள்'],
      foodPreferences: ['மிதமான', 'இனிப்பு'],
      favorableFoods: ['பழச்சாறுகள்', 'லேசான உணவுகள்', 'முளைகட்டிய தானியங்கள்'],
      unfavorableFoods: ['அதிக காரம்', 'கனமான உணவுகள்'],
      colors: ['பச்சை', 'வெள்ளை', 'நீலம்'],
      places: ['காடுகள்', 'தோட்டங்கள்', 'இயற்கை பூங்காக்கள்'],
      favorablePlaces: ['கிழக்கு திசை', 'காடுகள்', 'பூங்காக்கள்'],
      unfavorablePlaces: ['மேற்கு திசை', 'சலசலப்பான இடங்கள்'],
      temples: ['சோம கோயில்கள்', 'வன தெய்வ கோயில்கள்'],
      characteristics: [
        'ஆராய்ச்சி மனப்பான்மை',
        'சுதந்திர விருப்பம்',
        'அமைதியான இயல்பு',
        'தேடுதல் மனப்பான்மை'
      ],
      significances: [
        'தேடுதல் மற்றும் ஆராய்ச்சி',
        'பயணம் மற்றும் அலைச்சல்',
        'ஞானம் தேடுதல்',
        'புதிய அனுபவங்கள்'
      ],
      dnaTraits: [
        'உயர் புத்தி கூர்மை',
        'ஆராய்ச்சி மனப்பான்மை',
        'அமைதியான இயல்பு'
      ],
      dnaCharacteristics: [
        'நரம்பு மண்டல் உணர்திறன்',
        'புத்தி கூர்மை ஜீன்கள்',
        'அறிவாற்றல் திறன்கள்'
      ],
      strengths: ['அறிவு', 'ஆராய்ச்சி', 'பயணம்', 'சுதந்திரம்'],
      weaknesses: ['அமைதியின்மை', 'சந்தேகம்', 'நம்பிக்கையின்மை'],
      remedies: [
        'செவ்வாய் வழிபாடு',
        'சோம வழிபாடு',
        'செவ்வாய்க்கிழமை விரதம்'
      ],
      mantras: [
        'ஓம் அங்காரகாய நமஃ',
        'ஓம் சோமாய நமஃ'
      ]
    },
    {
      id: 'nakshatra_6',
      number: 6,
      name: 'ஆருத்ரா',
      nameEnglish: 'Ardra',
      sanskritName: 'आर्द्रा',
      lord: 'ராகு',
      rulingPlanet: 'Rahu',
      deity: 'ருத்ர',
      deityEnglish: 'Rudra',
      symbol: 'கண்ணீர் துளி',
      symbolEnglish: 'Teardrop',
      gana: 'மனுஷ்ய கணம்',
      nature: 'தீக்ஷண (கூர்மை)',
      element: 'நீர்',
      yoni: 'ஸ்வன யோனி',
      yoniEnglish: 'Dog Yoni',
      yoniAnimal: 'நாய்',
      yoniGender: 'பெண்',
      varna: 'சூத்திரர்',
      bodyParts: ['தலை', 'கண்கள்'],
      foodPreferences: ['காரம்', 'புளிப்பு'],
      favorableFoods: ['காரமான உணவுகள்', 'மசாலா', 'திரவ உணவுகள்'],
      unfavorableFoods: ['அதிக இனிப்பு', 'கனமான உணவுகள்'],
      colors: ['பச்சை', 'கருப்பு'],
      places: ['மழை பெய்யும் இடங்கள்', 'நீர் நிலைகள்', 'மருத்துவமனைகள்'],
      favorablePlaces: ['வடக்கு திசை', 'நீர் சார்ந்த இடங்கள்'],
      unfavorablePlaces: ['தெற்கு திசை', 'வறண்ட இடங்கள்'],
      temples: ['சிவன் கோயில்கள்', 'ருத்ர கோயில்கள்'],
      characteristics: [
        'உணர்ச்சி வசப்படுதல்',
        'அழிவு மற்றும் மறு உருவாக்கம்',
        'மாற்றம் விரும்பி',
        'ஆழமான சிந்தனை'
      ],
      significances: [
        'அழிவு மற்றும் புனர்ஜென்மம்',
        'மழை மற்றும் புயல்',
        'மாற்றம் மற்றும் சுத்திகரிப்பு',
        'உணர்ச்சி வெளிப்பாடு'
      ],
      dnaTraits: [
        'மன அழுத்த எதிர்ப்பு',
        'தீவிர உணர்ச்சிகள்',
        'மாற்றத்திற்கு ஏற்ப மாறுதல்'
      ],
      dnaCharacteristics: [
        'நரம்பு மண்டல் உணர்திறன்',
        'அட்ரினலின் சுரப்பு',
        'மன அழுத்த ஹார்மோன்கள்'
      ],
      strengths: ['மாற்றம்', 'புத்தி கூர்மை', 'உணர்ச்சி', 'புனரமைப்பு'],
      weaknesses: ['கோபம்', 'அழிவு', 'உணர்ச்சி வசப்படுதல்'],
      remedies: [
        'ராகு வழிபாடு',
        'ருத்ர அபிஷேகம்',
        'சனிக்கிழமை விரதம்'
      ],
      mantras: [
        'ஓம் ராம் ராகவே நமஃ',
        'ஓம் நமஃ சிவாய'
      ]
    },
    {
      id: 'nakshatra_7',
      number: 7,
      name: 'புனர்வசு',
      nameEnglish: 'Punarvasu',
      sanskritName: 'पुनर्वसु',
      lord: 'குரு',
      rulingPlanet: 'Jupiter',
      deity: 'அதிதி',
      deityEnglish: 'Aditi',
      symbol: 'வில் மற்றும் அம்பு',
      symbolEnglish: 'Bow and Arrow',
      gana: 'தேவ கணம்',
      nature: 'சர (அசையும்)',
      element: 'நீர்',
      yoni: 'மார்ஜார யோனி',
      yoniEnglish: 'Cat Yoni',
      yoniAnimal: 'பூனை',
      yoniGender: 'பெண்',
      varna: 'வைஸ்ய',
      bodyParts: ['விரல்கள்', 'கைகள்'],
      foodPreferences: ['இனிப்பு', 'மிதமான'],
      favorableFoods: ['பால் பொருட்கள்', 'தானியங்கள்', 'பழங்கள்', 'தேன்'],
      unfavorableFoods: ['அதிக காரம்', 'மாமிசம்'],
      colors: ['வெள்ளை', 'மஞ்சள்', 'வெள்ளி'],
      places: ['கோயில்கள்', 'ஆன்மீக மையங்கள்', 'கல்வி நிலையங்கள்'],
      favorablePlaces: ['கிழக்கு திசை', 'ஆன்மீக இடங்கள்', 'கல்வி மையங்கள்'],
      unfavorablePlaces: ['தெற்கு திசை', 'போர் களங்கள்'],
      temples: ['விஷ்ணு கோயில்கள்', 'குரு கோயில்கள்', 'அதிதி கோயில்கள்'],
      characteristics: [
        'புத்தம் புதிய தொடக்கம்',
        'தாய்மை உணர்வு',
        'கருணை மற்றும் மன்னிப்பு',
        'ஆன்மீக விருப்பம்'
      ],
      significances: [
        'மீட்பு மற்றும் புத்துணர்வு',
        'வீட்டிற்கு திரும்புதல்',
        'தாய்மை மற்றும் பாதுகாப்பு',
        'ஞானம் மற்றும் கல்வி'
      ],
      dnaTraits: [
        'வலுவான நோய் எதிர்ப்பு சக்தி',
        'மீட்க்கும் திறன்',
        'தாய்மை பிணைப்பு ஜீன்கள்'
      ],
      dnaCharacteristics: [
        'நோய் எதிர்ப்பு மண்டலம்',
        'புத்துணர்வு ஹார்மோன்கள்',
        'பாதுகாப்பு உணர்வு'
      ],
      strengths: ['புத்துணர்வு', 'கருணை', 'ஞானம்', 'பாதுகாப்பு'],
      weaknesses: ['அதிக பாதுகாப்பு', 'பதட்டம்', 'மாற்றத்திற்கு எதிர்ப்பு'],
      remedies: [
        'குரு வழிபாடு',
        'அதிதி தேவி வழிபாடு',
        'வியாழக்கிழமை விரதம்'
      ],
      mantras: [
        'ஓம் குருவே நமஃ',
        'ஓம் அதிதியே நமஃ'
      ]
    },
    {
      id: 'nakshatra_8',
      number: 8,
      name: 'பூசம்',
      nameEnglish: 'Pushya',
      sanskritName: 'पुष्य',
      lord: 'சனி',
      rulingPlanet: 'Saturn',
      deity: 'பிருஹஸ்பதி',
      deityEnglish: 'Brihaspati',
      symbol: 'பசுவின் கிடுக்கு',
      symbolEnglish: 'Cow Udder',
      gana: 'தேவ கணம்',
      nature: 'க்ஷிப்ர (விரைவு)',
      element: 'நீர்',
      yoni: 'மேஷ யோனி',
      yoniEnglish: 'Sheep Yoni',
      yoniAnimal: 'ஆடு',
      yoniGender: 'ஆண்',
      varna: 'க்ஷத்ரிய',
      bodyParts: ['வாய்', 'முகம்'],
      foodPreferences: ['இனிப்பு', 'போஷாக்கு'],
      favorableFoods: ['பால் பொருட்கள்', 'நெய்', 'தேன்', 'சத்தான உணவுகள்'],
      unfavorableFoods: ['காரம்', 'புளிப்பு', 'மது'],
      colors: ['மஞ்சள்', 'தங்கம்', 'ஆரஞ்சு'],
      places: ['பள்ளிகள்', 'கோயில்கள்', 'கல்வி நிலையங்கள்'],
      favorablePlaces: ['மேற்கு திசை', 'கல்வி மையங்கள்', 'ஆன்மீக இடங்கள்'],
      unfavorablePlaces: ['தெற்கு திசை', 'போர் பூமி'],
      temples: ['பிருஹஸ்பதி கோயில்கள்', 'சனி கோயில்கள்', 'குரு கோயில்கள்'],
      characteristics: [
        'குருத்துவம் மற்றும் ஞானம்',
        'போஷணை செய்யும் குணம்',
        'ஆன்மீக வளர்ச்சி',
        'பொறுமை மற்றும் நிலைத்தன்மை'
      ],
      significances: [
        'போஷணை மற்றும் வளர்ப்பு',
        'ஞானம் மற்றும் கல்வி',
        'ஆன்மீக வழிகாட்டுதல்',
        'பாதுகாப்பு மற்றும் செல்வம்'
      ],
      dnaTraits: [
        'நீண்ட ஆயுள்',
        'வலுவான செரிமான சக்தி',
        'ஞான வளர்ச்சி ஜீன்கள்'
      ],
      dnaCharacteristics: [
        'மெட்டபாலிசம் மந்தம்',
        'நிலைத்த ஆரோக்கியம்',
        'ஞான ஹார்மோன்கள்'
      ],
      strengths: ['ஞானம்', 'போஷணை', 'பொறுமை', 'நிலைத்தன்மை'],
      weaknesses: ['மந்தம்', 'அதிக பாதுகாப்பு', 'மாற்றத்திற்கு எதிர்ப்பு'],
      remedies: [
        'சனி வழிபாடு',
        'பிருஹஸ்பதி வழிபாடு',
        'சனிக்கிழமை விரதம்'
      ],
      mantras: [
        'ஓம் சனிச்சராய நமஃ',
        'ஓம் பிருஹஸ்பதயே நமஃ'
      ]
    },
    {
      id: 'nakshatra_9',
      number: 9,
      name: 'ஆயில்யம்',
      nameEnglish: 'Ashlesha',
      sanskritName: 'आश्लेषा',
      lord: 'புதன்',
      rulingPlanet: 'Mercury',
      deity: 'சர்ப',
      deityEnglish: 'Nagas (Serpents)',
      symbol: 'சுருண்ட பாம்பு',
      symbolEnglish: 'Coiled Snake',
      gana: 'ராக்ஷச கணம்',
      nature: 'தீக்ஷண (கூர்மை)',
      element: 'நீர்',
      yoni: 'மார்ஜார யோனி',
      yoniEnglish: 'Cat Yoni',
      yoniAnimal: 'பூனை',
      yoniGender: 'ஆண்',
      varna: 'க்ஷத்ரிய',
      bodyParts: ['கிடந்டுகள்', 'நகங்கள்'],
      foodPreferences: ['காரம்', 'புளிப்பு'],
      favorableFoods: ['காரமான உணவுகள்', 'மசாலா', 'மீன்', 'இறைச்சி'],
      unfavorableFoods: ['அதிக இனிப்பு', 'பால் பொருட்கள்'],
      colors: ['கருப்பு', 'கரும் பச்சை', 'நீலம்'],
      places: ['இரகசிய இடங்கள்', 'பாதாள வழிகள்', 'ஆராய்ச்சி மையங்கள்'],
      favorablePlaces: ['வடக்கு திசை', 'மறைந்த இடங்கள்', 'ஆராய்ச்சி நிலையங்கள்'],
      unfavorablePlaces: ['திறந்த வெளிகள்', 'சூரிய ஒளி நிறைந்த இடங்கள்'],
      temples: ['நாக கோயில்கள்', 'புதன் கோயில்கள்', 'சர்ப கோயில்கள்'],
      characteristics: [
        'மர்மமான தன்மை',
        'கூர்மையான புத்தி',
        'மாயாஜால சக்தி',
        'உள்ளுணர்வு'
      ],
      significances: [
        'மர்மம் மற்றும் ரகசியம்',
        'குண்டலினி சக்தி',
        'மாயை மற்றும் மாற்றம்',
        'ஞான சக்தி'
      ],
      dnaTraits: [
        'மர்ம திறன்கள்',
        'உள்ளுணர்வு வலிமை',
        'தந்திர சக்தி ஜீன்கள்'
      ],
      dnaCharacteristics: [
        'நரம்பு மண்டல் கூர்மை',
        'மர்ம சக்தி ஹார்மோன்கள்',
        'உள்ளுணர்வு திறன்கள்'
      ],
      strengths: ['மர்மம்', 'புத்தி கூர்மை', 'மாயாஜாலம்', 'உள்ளுணர்வு'],
      weaknesses: ['சந்தேகம்', 'பொறாமை', 'பழிவாங்கும் மனப்பான்மை'],
      remedies: [
        'புதன் வழிபாடு',
        'நாக வழிபாடு',
        'புதன்கிழமை விரதம்'
      ],
      mantras: [
        'ஓம் புதாய நமஃ',
        'ஓம் நாகேசாய நமஃ'
      ]
    },
    {
      id: 'nakshatra_10',
      number: 10,
      name: 'மகம்',
      nameEnglish: 'Magha',
      sanskritName: 'मघा',
      lord: 'கேது',
      rulingPlanet: 'Ketu',
      deity: 'பித்ரு',
      deityEnglish: 'Pitris (Ancestors)',
      symbol: 'சிம்மாசனம்',
      symbolEnglish: 'Royal Throne',
      gana: 'ராக்ஷச கணம்',
      nature: 'உக்ர (கொடூரம்)',
      element: 'நீர்',
      yoni: 'மூஷிக யோனி',
      yoniEnglish: 'Rat Yoni',
      yoniAnimal: 'எலி',
      yoniGender: 'ஆண்',
      varna: 'சூத்திரர்',
      bodyParts: ['மூக்கு', 'உதடுகள்'],
      foodPreferences: ['இனிப்பு', 'உவர்ப்பு'],
      favorableFoods: ['ராஜ உணவுகள்', 'பால் பொருட்கள்', 'தேன்', 'பழங்கள்'],
      unfavorableFoods: ['காரம்', 'புளிப்பு', 'குளிர்ந்த உணவுகள்'],
      colors: ['தங்கம்', 'சிவப்பு', 'ஆரஞ்சு'],
      places: ['அரண்மனைகள்', 'ராஜ அரங்கங்கள்', 'பண்டைய கோயில்கள்'],
      favorablePlaces: ['தெற்கு திசை', 'அரண்மனைகள்', 'பாரம்பர்ய இடங்கள்'],
      unfavorablePlaces: ['வடக்கு திசை', 'நவீன இடங்கள்'],
      temples: ['பித்ரு கோயில்கள்', 'முன்னோர் வழிபாட்டு இடங்கள்', 'கேது கோயில்கள்'],
      characteristics: [
        'ராஜ குணம்',
        'பாரம்பர்ய அன்பு',
        'தலைமைத்துவ குணம்',
        'முன்னோர் பக்தி'
      ],
      significances: [
        'ராஜ அதிகாரம் மற்றும் அந்தஸ்து',
        'பாரம்பர்யம் மற்றும் வம்சம்',
        'முன்னோர் வழிபாடு',
        'அரச குடும்ப தொடர்பு'
      ],
      dnaTraits: [
        'தலைமைத்துவ ஜீன்கள்',
        'ராஜ குண அமைப்பு',
        'பாரம்பர்ய பிணைப்பு'
      ],
      dnaCharacteristics: [
        'உயர் சுயமரியாதை ஹார்மோன்கள்',
        'தலைமைத்துவ நரம்பு மண்டலம்',
        'ராஜ குண வெளிப்பாடு'
      ],
      strengths: ['தலைமைத்துவம்', 'ராஜ குணம்', 'பாரம்பர்யம்', 'அந்தஸ்து'],
      weaknesses: ['கர்வம்', 'அதிகார விருப்பம்', 'பழைமை வாதம்'],
      remedies: [
        'கேது வழிபாடு',
        'பித்ரு வழிபாடு',
        'முன்னோர் தர்ப்பணம்'
      ],
      mantras: [
        'ஓம் கேதவே நமஃ',
        'ஓம் பித்ருபியோ நமஃ'
      ]
    },
    {
      id: 'nakshatra_11',
      number: 11,
      name: 'பூரம்',
      nameEnglish: 'Purva Phalguni',
      sanskritName: 'पूर्वफाल्गुनी',
      lord: 'சுக்கிரன்',
      rulingPlanet: 'Venus',
      deity: 'பகன்',
      deityEnglish: 'Bhaga',
      symbol: 'கட்டில்',
      symbolEnglish: 'Hammock/Bed',
      gana: 'மனுஷ்ய கணம்',
      nature: 'உக்ர (கொடூரம்)',
      element: 'நீர்',
      yoni: 'மூஷிக யோனி',
      yoniEnglish: 'Rat Yoni',
      yoniAnimal: 'எலி',
      yoniGender: 'பெண்',
      varna: 'பிராமணர்',
      bodyParts: ['உதடுகள்', 'பிறப்புறுப்பு'],
      foodPreferences: ['இனிப்பு', 'மிதமான'],
      favorableFoods: ['இனிப்பு பலகாரங்கள்', 'பால் பொருட்கள்', 'பழங்கள்'],
      unfavorableFoods: ['அதிக காரம்', 'புளிப்பு'],
      colors: ['வெள்ளை', 'இளஞ்சிவப்பு', 'வெள்ளி'],
      places: ['படுக்கையறைகள்', 'ஓய்வு இடங்கள்', 'அழகு சாலைகள்'],
      favorablePlaces: ['வெள்ளிக்கிழமை திசை', 'ஓய்வு இடங்கள்', 'கலை மையங்கள்'],
      unfavorablePlaces: ['போர் பூமி', 'கடின வேலை இடங்கள்'],
      temples: ['பகன் கோயில்கள்', 'சுக்கிர கோயில்கள்', 'லக்ஷ்மி கோயில்கள்'],
      characteristics: [
        'ஓய்வு மற்றும் சுகம்',
        'கலை மற்றும் அழகு',
        'இன்பம் மற்றும் மகிழ்ச்சி',
        'ஆடம்பர விருப்பம்'
      ],
      significances: [
        'ஓய்வு மற்றும் சுகம்',
        'கலை மற்றும் பொழுதுபோக்கு',
        'திருமணம் மற்றும் காதல்',
        'ஆடம்பரம் மற்றும் செல்வம்'
      ],
      dnaTraits: [
        'அழகு மற்றும் கவர்ச்சி ஜீன்கள்',
        'கலை திறன்கள்',
        'சுக வாழ்க்கை விருப்பம்'
      ],
      dnaCharacteristics: [
        'அழகு ஹார்மோன்கள்',
        'ஆடம்பர விருப்பு சக்தி',
        'கலை ஆர்வ ஜீன்கள்'
      ],
      strengths: ['அழகு', 'கலை', 'சுகம்', 'மகிழ்ச்சி'],
      weaknesses: ['ஆடம்பர விருப்பம்', 'சோம்பல்', 'அதிக சுக ஆசை'],
      remedies: [
        'சுக்கிர வழிபாடு',
        'பகன் வழிபாடு',
        'வெள்ளிக்கிழமை விரதம்'
      ],
      mantras: [
        'ஓம் சுக்ராய நமஃ',
        'ஓம் பகாய நமஃ'
      ]
    },
    {
      id: 'nakshatra_12',
      number: 12,
      name: 'உத்திரம்',
      nameEnglish: 'Uttara Phalguni',
      sanskritName: 'उत्तरफाल्गुनी',
      lord: 'சூரியன்',
      rulingPlanet: 'Sun',
      deity: 'அர்யமன்',
      deityEnglish: 'Aryaman',
      symbol: 'கட்டில் கால்கள்',
      symbolEnglish: 'Bed Legs',
      gana: 'மனுஷ்ய கணம்',
      nature: 'திர (நிலைத்த)',
      element: 'அக்னி',
      yoni: 'கோ யோனி',
      yoniEnglish: 'Cow Yoni',
      yoniAnimal: 'பசு',
      yoniGender: 'பெண்',
      varna: 'க்ஷத்ரிய',
      bodyParts: ['கைகள்', 'விரல்கள்'],
      foodPreferences: ['இனிப்பு', 'சத்தான'],
      favorableFoods: ['பால் பொருட்கள்', 'சத்தான உணவுகள்', 'பழங்கள்'],
      unfavorableFoods: ['காரம்', 'ஜங்க் உணவுகள்'],
      colors: ['மஞ்சள்', 'தங்கம்', 'ஆரஞ்சு'],
      places: ['திருமண மண்டபங்கள்', 'நிர்வாக அலுவலகங்கள்', 'நலன்புரி மையங்கள்'],
      favorablePlaces: ['கிழக்கு திசை', 'நிர்வாக இடங்கள்', 'நல்ல நிறுவனங்கள்'],
      unfavorablePlaces: ['தெற்கு திசை', 'தனிமை இடங்கள்'],
      temples: ['அர்யமன் கோயில்கள்', 'சூரிய கோயில்கள்', 'திருமண தெய்வ கோயில்கள்'],
      characteristics: [
        'உதவும் இயல்பு',
        'சமூக சேவை',
        'நம்பகத்தன்மை',
        'ஒழுங்கு மற்றும் கட்டுப்பாடு'
      ],
      significances: [
        'திருமணம் மற்றும் கூட்டாண்மை',
        'சமூக சேவை மற்றும் உதவி',
        'நிர்வாகம் மற்றும் ஒழுங்கமைப்பு',
        'நம்பகத்தன்மை மற்றும் பொறுப்பு'
      ],
      dnaTraits: [
        'சேவை மனப்பான்மை ஜீன்கள்',
        'ஒழுங்கமைப்பு திறன்',
        'நம்பகத்தன்மை'
      ],
      dnaCharacteristics: [
        'சேவை ஹார்மோன்கள்',
        'ஒழுங்கமைப்பு நரம்பு மண்டலம்',
        'பொறுப்பு உணர்வு'
      ],
      strengths: ['சேவை', 'நம்பகத்தன்மை', 'ஒழுங்கு', 'பொறுப்பு'],
      weaknesses: ['அதிக பொறுப்பு', 'கட்டுப்பாடு', 'மாற்றத்திற்கு எதிர்ப்பு'],
      remedies: [
        'சூரிய வழிபாடு',
        'அர்யமன் வழிபாடு',
        'ஞாயிற்றுக்கிழமை விரதம்'
      ],
      mantras: [
        'ஓம் சூர்யாய நமஃ',
        'ஓம் அர்யம்ணே நமஃ'
      ]
    },
    {
      id: 'nakshatra_13',
      number: 13,
      name: 'ஹஸ்தம்',
      nameEnglish: 'Hasta',
      sanskritName: 'हस्त',
      lord: 'சந்திரன்',
      rulingPlanet: 'Moon',
      deity: 'சவித்ரு',
      deityEnglish: 'Savitru',
      symbol: 'கை உள்ளங்கை',
      symbolEnglish: 'Hand Palm',
      gana: 'தேவ கணம்',
      nature: 'லகு (விரைவு)',
      element: 'அக்னி',
      yoni: 'மகிஷ யோனி',
      yoniEnglish: 'Buffalo Yoni',
      yoniAnimal: 'எருமை',
      yoniGender: 'பெண்',
      varna: 'வைஸ்ய',
      bodyParts: ['கைகள்', 'உள்ளங்கை'],
      foodPreferences: ['இனிப்பு', 'மிதமான'],
      favorableFoods: ['கைவினை உணவுகள்', 'இனிப்புகள்', 'பால் பொருட்கள்'],
      unfavorableFoods: ['அதிக காரம்', 'செயற்கை உணவுகள்'],
      colors: ['வெள்ளை', 'வெள்ளி', 'கிரீம்'],
      places: ['கைவினை பட்டறைகள்', 'மார்க்கெட்டுகள்', 'கைத்தொழில் மையங்கள்'],
      favorablePlaces: ['கிழக்கு திசை', 'கைத்தொழில் இடங்கள்', 'வர்த்தக மையங்கள்'],
      unfavorablePlaces: ['தெற்கு திசை', 'யந்திர இடங்கள்'],
      temples: ['சவித்ரு கோயில்கள்', 'சந்திர கோயில்கள்', 'கைத்தொழில் தெய்வங்கள்'],
      characteristics: [
        'கைத்திறமை',
        'வர்த்தக புத்தி',
        'நகைச்சுவை உணர்வு',
        'விரைவான செயல்பாடு'
      ],
      significances: [
        'கைத்தொழில் மற்றும் கைவினை',
        'வர்த்தகம் மற்றும் வணிகம்',
        'திறமையான வேலை',
        'நகைச்சுவை மற்றும் மகிழ்ச்சி'
      ],
      dnaTraits: [
        'கைத்திறமை ஜீன்கள்',
        'வர்த்தக புத்தி',
        'விரைவான அனுகூல சக்தி'
      ],
      dnaCharacteristics: [
        'கை திறமை நரம்பு மண்டலம்',
        'வர்த்தக ஹார்மோன்கள்',
        'விரைவான சிந்தனை'
      ],
      strengths: ['கைத்திறமை', 'வர்த்தகம்', 'நகைச்சுவை', 'வேகம்'],
      weaknesses: ['அவசரம்', 'நிலையற்ற தன்மை', 'அதிக பேச்சு'],
      remedies: [
        'சந்திர வழிபாடு',
        'சவித்ரு வழிபாடு',
        'திங்கள்கிழமை விரதம்'
      ],
      mantras: [
        'ஓம் சோம் சோமாய நமஃ',
        'ஓம் சவித்ரே நமஃ'
      ]
    },
    {
      id: 'nakshatra_14',
      number: 14,
      name: 'சித்திரை',
      nameEnglish: 'Chitra',
      sanskritName: 'चित्रा',
      lord: 'செவ்வாய்',
      rulingPlanet: 'Mars',
      deity: 'த்வஷ்டா',
      deityEnglish: 'Tvashtar',
      symbol: 'பிரகாசமான நட்சத்திரம்',
      symbolEnglish: 'Bright Star',
      gana: 'ராக்ஷச கணம்',
      nature: 'மிருது (மென்மை)',
      element: 'அக்னி',
      yoni: 'வ்யாக்ர யோனி',
      yoniEnglish: 'Tiger Yoni',
      yoniAnimal: 'புலி',
      yoniGender: 'பெண்',
      varna: 'சேவகர்',
      bodyParts: ['நெற்றி', 'கழுத்து'],
      foodPreferences: ['காரம்', 'மசாலா'],
      favorableFoods: ['மசாலா உணவுகள்', 'காரம்', 'இறைச்சி'],
      unfavorableFoods: ['மிதமான உணவுகள்', 'குளிர்ந்த உணவுகள்'],
      colors: ['சிவப்பு', 'ஆரஞ்சு', 'தங்கம்'],
      places: ['கலை மையங்கள்', 'அழகுக் கடைகள்', 'படத்தொகுப்பு இடங்கள்'],
      favorablePlaces: ['தெற்கு திசை', 'கலை மையங்கள்', 'அழகு சாலைகள்'],
      unfavorablePlaces: ['வடக்கு திசை', 'இருண்ட இடங்கள்'],
      temples: ['த்வஷ்டா கோயில்கள்', 'செவ்வாய் கோயில்கள்', 'கலை தெய்வங்கள்'],
      characteristics: [
        'அழகு மற்றும் கலை',
        'படைப்பு திறன்',
        'ஆடம்பரம்',
        'கவர்ச்சி'
      ],
      significances: [
        'அழகு மற்றும் கலை',
        'படைப்பு மற்றும் வடிவமைப்பு',
        'பிரகாசம் மற்றும் புகழ்',
        'ஆடம்பரம் மற்றும் செல்வம்'
      ],
      dnaTraits: [
        'கலை படைப்பு ஜீன்கள்',
        'அழகு உணர்வு',
        'வடிவமைப்பு திறன்'
      ],
      dnaCharacteristics: [
        'கலை ஹார்மோன்கள்',
        'அழகு உணர்வு நரம்பு மண்டலம்',
        'படைப்பு சக்தி'
      ],
      strengths: ['கலை', 'அழகு', 'படைப்பு', 'பிரகாசம்'],
      weaknesses: ['ஆடம்பர விருப்பம்', 'கர்வம்', 'பொறாமை'],
      remedies: [
        'செவ்வாய் வழிபாடு',
        'த்வஷ்டா வழிபாடு',
        'செவ்வாய்க்கிழமை விரதம்'
      ],
      mantras: [
        'ஓம் அங்காரகாய நமஃ',
        'ஓம் த்வஷ்ட்ரே நமஃ'
      ]
    },
    {
      id: 'nakshatra_15',
      number: 15,
      name: 'சுவாதி',
      nameEnglish: 'Swati',
      sanskritName: 'स्वाति',
      lord: 'ராகு',
      rulingPlanet: 'Rahu',
      deity: 'வாயு',
      deityEnglish: 'Vayu',
      symbol: 'இளம் தளிர்',
      symbolEnglish: 'Young Sprout',
      gana: 'தேவ கணம்',
      nature: 'சர (அசையும்)',
      element: 'அக்னி',
      yoni: 'மகிஷ யோனி',
      yoniEnglish: 'Buffalo Yoni',
      yoniAnimal: 'எருமை',
      yoniGender: 'ஆண்',
      varna: 'பிரம்மசாரி',
      bodyParts: ['மார்பு', 'இதயம்'],
      foodPreferences: ['லேசான', 'காற்று போன்ற'],
      favorableFoods: ['லேசான உணவுகள்', 'பழங்கள்', 'காய்கறிகள்'],
      unfavorableFoods: ['கனமான உணவுகள்', 'அதிக எண்ணெய்'],
      colors: ['பச்சை', 'வெள்ளை', 'நீலம்'],
      places: ['காற்று வீசும் இடங்கள்', 'உயரமான இடங்கள்', 'பறக்கும் வாகனங்கள்'],
      favorablePlaces: ['வடமேற்கு திசை', 'உயரமான இடங்கள்', 'காற்று வீசும் பகுதிகள்'],
      unfavorablePlaces: ['அடைத்த இடங்கள்', 'நிலத்தடி இடங்கள்'],
      temples: ['வாயு கோயில்கள்', 'ராகு கோயில்கள்', 'ஹனுமான் கோயில்கள்'],
      characteristics: [
        'சுதந்திர விருப்பம்',
        'நெகிழ்வுத்தன்மை',
        'அசையும் தன்மை',
        'வர்த்தக புத்தி'
      ],
      significances: [
        'சுதந்திரம் மற்றும் விடுதலை',
        'வர்த்தகம் மற்றும் வணிகம்',
        'நெகிழ்வுத்தன்மை',
        'மாற்றம் மற்றும் அசைவு'
      ],
      dnaTraits: [
        'நெகிழ்வான மனப்பான்மை',
        'வர்த்தக புத்தி ஜீன்கள்',
        'அசையும் தன்மை'
      ],
      dnaCharacteristics: [
        'உயர் அடாப்டேபிலிட்டி',
        'வர்த்தக ஹார்மோன்கள்',
        'நெகிழ்வு நரம்பு மண்டலம்'
      ],
      strengths: ['சுதந்திரம்', 'நெகிழ்வு', 'வர்த்தகம்', 'அசைவு'],
      weaknesses: ['நிலையற்ற தன்மை', 'உறுதியின்மை', 'அசைவு'],
      remedies: [
        'ராகு வழிபாடு',
        'வாயு வழிபாடு',
        'சனிக்கிழமை விரதம்'
      ],
      mantras: [
        'ఓం రాహవే నమః',
        'ఓం వాయవే నమః'
      ]
    },
    {
      id: 'nakshatra_16',
      number: 16,
      name: 'விசாகம்',
      nameEnglish: 'Vishakha',
      sanskritName: 'विशाखा',
      lord: 'குரு',
      rulingPlanet: 'Jupiter',
      deity: 'இந்திராக்னி',
      deityEnglish: 'Indragni',
      symbol: 'முக்கோண அலங்காரம்',
      symbolEnglish: 'Triumphal Arch',
      gana: 'ராக்ஷச கணம்',
      nature: 'மிஸ்ர (கலந்த)',
      element: 'அக்னி',
      yoni: 'வ்யாக்ர யோனி',
      yoniEnglish: 'Tiger Yoni',
      yoniAnimal: 'புலி',
      yoniGender: 'ஆண்',
      varna: 'மிலேச்சர்',
      bodyParts: ['கைகள்', 'மார்பு'],
      foodPreferences: ['காரம்', 'மசாலா'],
      favorableFoods: ['காரமான உணவுகள்', 'மசாலா', 'இறைச்சி'],
      unfavorableFoods: ['மிதமான உணவுகள்', 'இனிப்பு'],
      colors: ['சிவப்பு', 'ஆரஞ்சு', 'மஞ்சள்'],
      places: ['வெற்றி அரங்கங்கள்', 'போட்டி இடங்கள்', 'விளையாட்டு மைதானங்கள்'],
      favorablePlaces: ['தென்கிழக்கு திசை', 'போட்டி இடங்கள்', 'வெற்றி அரங்கங்கள்'],
      unfavorablePlaces: ['அமைதியான இடங்கள்', 'தனிமை இடங்கள்'],
      temples: ['இந்திர கோயில்கள்', 'அக்னி கோயில்கள்', 'குரு கோயில்கள்'],
      characteristics: [
        'லக்ஷ்ய நோக்கு',
        'போட்டி உணர்வு',
        'வெற்றி விருப்பம்',
        'உத்சாகம்'
      ],
      significances: [
        'லக்ஷ்யம் மற்றும் வெற்றி',
        'போட்டி மற்றும் போராட்டம்',
        'உத்சாகம் மற்றும் ஊக்கம்',
        'வெற்றிக்கான பயணம்'
      ],
      dnaTraits: [
        'போட்டி உணர்வு ஜீன்கள்',
        'வெற்றி விருப்பம்',
        'லக்ஷ்ய நோக்கு'
      ],
      dnaCharacteristics: [
        'போட்டி ஹார்மோன்கள்',
        'வெற்றி நரம்பு மண்டலம்',
        'லக்ஷ்ய ஓரியென்டேஷன்'
      ],
      strengths: ['லக்ஷ்யம்', 'போட்டி', 'வெற்றி', 'உத்சாகம்'],
      weaknesses: ['அதிக போட்டி', 'பொறாமை', 'அவசரம்'],
      remedies: [
        'குரு வழிபாடு',
        'இந்திராக்னி வழிபாடு',
        'வியாழக்கிழமை விரதம்'
      ],
      mantras: [
        'ఓం గురవే నమః',
        'ఓం ఇంద్రాగ్నిభ్యాం నమః'
      ]
    },
    {
      id: 'nakshatra_17',
      number: 17,
      name: 'அனுராதா',
      nameEnglish: 'Anuradha',
      sanskritName: 'अनुराधा',
      lord: 'சனி',
      rulingPlanet: 'Saturn',
      deity: 'மித்ர',
      deityEnglish: 'Mitra',
      symbol: 'தாமரை மலர்',
      symbolEnglish: 'Lotus Flower',
      gana: 'தேவ கணம்',
      nature: 'மிருது (மென்மை)',
      element: 'அக்னி',
      yoni: 'மிருக யோனி',
      yoniEnglish: 'Deer Yoni',
      yoniAnimal: 'மான்',
      yoniGender: 'பெண்',
      varna: 'சூத்திரர்',
      bodyParts: ['வயிறு', 'இடுப்பு'],
      foodPreferences: ['இனிப்பு', 'சத்தான'],
      favorableFoods: ['சத்தான உணவுகள்', 'பால் பொருட்கள்', 'பழங்கள்'],
      unfavorableFoods: ['காரம்', 'புளிப்பு', 'மது'],
      colors: ['சிவப்பு', 'மரூன்', 'ஆழ் சிவப்பு'],
      places: ['நட்பு மையங்கள்', 'கூட்டு அமைப்புகள்', 'அமைப்பு இடங்கள்'],
      favorablePlaces: ['தென்மேற்கு திசை', 'கூட்டு இடங்கள்', 'நட்பு மையங்கள்'],
      unfavorablePlaces: ['தனிமை இடங்கள்', 'எதிரி இடங்கள்'],
      temples: ['மித்ர கோயில்கள்', 'சனி கோயில்கள்', 'நட்பு தெய்வங்கள்'],
      characteristics: [
        'நட்புத்தன்மை',
        'அமைப்பு திறன்',
        'ஒத்துழைப்பு',
        'பக்தி உணர்வு'
      ],
      significances: [
        'நட்பு மற்றும் ஒத்துழைப்பு',
        'அமைப்பு மற்றும் குழு வேலை',
        'பக்தி மற்றும் விசுவாசம்',
        'சமுதாய உணர்வு'
      ],
      dnaTraits: [
        'சமூக பிணைப்பு ஜீன்கள்',
        'நட்பு உணர்வு',
        'குழு வேலை திறன்'
      ],
      dnaCharacteristics: [
        'சமூக ஹார்மோன்கள்',
        'நட்பு நரம்பு மண்டலம்',
        'ஒத்துழைப்பு சக்தி'
      ],
      strengths: ['நட்பு', 'அமைப்பு', 'ஒத்துழைப்பு', 'பக்தி'],
      weaknesses: ['அதிக சார்பு', 'சுய நலமின்மை', 'தீர்மானமின்மை'],
      remedies: [
        'சனி வழிபாடு',
        'மித்ர வழிபாடு',
        'சனிக்கிழமை விரதம்'
      ],
      mantras: [
        'ఓం శనైశ్చరాయ నమః',
        'ఓం మిత్రాయ నమః'
      ]
    },
    {
      id: 'nakshatra_18',
      number: 18,
      name: 'கேட்டை',
      nameEnglish: 'Jyeshtha',
      sanskritName: 'ज्येष्ठा',
      lord: 'புதன்',
      rulingPlanet: 'Mercury',
      deity: 'இந்திரன்',
      deityEnglish: 'Indra',
      symbol: 'காது வளையம்',
      symbolEnglish: 'Earring',
      gana: 'ராக்ஷச கணம்',
      nature: 'தீக்ஷண (கூர்மை)',
      element: 'வாயு',
      yoni: 'மிருக யோனி',
      yoniEnglish: 'Deer Yoni',
      yoniAnimal: 'மான்',
      yoniGender: 'ஆண்',
      varna: 'சேவகர்',
      bodyParts: ['கழுத்து', 'தோள்கள்'],
      foodPreferences: ['காரம்', 'புளிப்பு'],
      favorableFoods: ['காரமான உணவுகள்', 'மசாலா', 'திரவ உணவுகள்'],
      unfavorableFoods: ['இனிப்பு', 'பால் பொருட்கள்'],
      colors: ['கருப்பு', 'கரும் சிவப்பு', 'மரூன்'],
      places: ['அதிகார இடங்கள்', 'ரகசிய இடங்கள்', 'செல்வாக்கு மையங்கள்'],
      favorablePlaces: ['மேற்கு திசை', 'அதிகார இடங்கள்', 'செல்வாக்கு மையங்கள்'],
      unfavorablePlaces: ['பொதுவான இடங்கள்', 'கூட்டு இடங்கள்'],
      temples: ['இந்திர கோயில்கள்', 'புதன் கோயில்கள்', 'அதிகார தெய்வங்கள்'],
      characteristics: [
        'மூத்த சகோதர் உணர்வு',
        'பாதுகாப்பு விருப்பம்',
        'அதிகார விருப்பம்',
        'பொறுப்பு உணர்வு'
      ],
      significances: [
        'மூத்தவர் பொறுப்பு',
        'அதிகாரம் மற்றும் செல்வாக்கு',
        'பாதுகாப்பு மற்றும் காப்பு',
        'தலைமைத்துவம்'
      ],
      dnaTraits: [
        'தலைமைத்துவ ஜீன்கள்',
        'பாதுகாப்பு உணர்வு',
        'அதிகார விருப்பம்'
      ],
      dnaCharacteristics: [
        'தலைமைத்துவ ஹார்மோன்கள்',
        'பாதுகாப்பு நரம்பு மண்டலம்',
        'அதிகார சக்தி'
      ],
      strengths: ['தலைமைத்துவம்', 'பாதுகாப்பு', 'அதிகாரம்', 'பொறுப்பு'],
      weaknesses: ['கர்வம்', 'அதிகார விருப்பம்', 'பொறாமை'],
      remedies: [
        'புதன் வழிபாடு',
        'இந்திர வழிபாடு',
        'புதன்கிழமை விரதம்'
      ],
      mantras: [
        'ఓం బుధాయ నమః',
        'ఓం ఇంద్రాయ నమః'
      ]
    },
    {
      id: 'nakshatra_19',
      number: 19,
      name: 'மூலம்',
      nameEnglish: 'Mula',
      sanskritName: 'मूल',
      lord: 'கேது',
      rulingPlanet: 'Ketu',
      deity: 'நிருதி',
      deityEnglish: 'Nirriti',
      symbol: 'வரக்க கட்டிய வேர்கள்',
      symbolEnglish: 'Bunch of Roots',
      gana: 'ராக்ஷச கணம்',
      nature: 'தீக்ஷண (கூர்மை)',
      element: 'வாயு',
      yoni: 'ஸ்வன யோனி',
      yoniEnglish: 'Dog Yoni',
      yoniAnimal: 'நாய்',
      yoniGender: 'ஆண்',
      varna: 'க்ஷத்ரிய',
      bodyParts: ['பாதங்கள்', 'கால்விரல்கள்'],
      foodPreferences: ['காரம்', 'கசப்பு'],
      favorableFoods: ['மூலிகை உணவுகள்', 'கசப்பு உணவுகள்', 'மருத்துவ உணவுகள்'],
      unfavorableFoods: ['இனிப்பு', 'ஆடம்பர உணவுகள்'],
      colors: ['பழுப்பு', 'கருப்பு', 'மஞ்சள்'],
      places: ['மூலிகை தோட்டங்கள்', 'வன இடங்கள்', 'ஆராய்ச்சி மையங்கள்'],
      favorablePlaces: ['தென்மேற்கு திசை', 'வன பகுதிகள்', 'ஆராய்ச்சி இடங்கள்'],
      unfavorablePlaces: ['நகர இடங்கள்', 'ஆடம்பர இடங்கள்'],
      temples: ['நிருதி கோயில்கள்', 'கேது கோயில்கள்', 'மூலிகை தெய்வங்கள்'],
      characteristics: [
        'ஆராய்ச்சி மனப்பான்மை',
        'வேர் தேடுதல்',
        'அழிவு மற்றும் புனர்னிர்மாணம்',
        'ஆழமான அறிவு'
      ],
      significances: [
        'வேர்கள் மற்றும் அடிப்படை',
        'ஆராய்ச்சி மற்றும் தேடுதல்',
        'அழிவு மற்றும் புனர்நிர்மாணம்',
        'ஆழமான ஞானம்'
      ],
      dnaTraits: [
        'ஆராய்ச்சி ஜீன்கள்',
        'ஆழமான சிந்தனை',
        'மூல காரண தேடுதல்'
      ],
      dnaCharacteristics: [
        'ஆராய்ச்சி நரம்பு மண்டலம்',
        'ஆழமான சிந்தனை ஹார்மோன்கள்',
        'வேர் தேடும் சக்தி'
      ],
      strengths: ['ஆராய்ச்சி', 'ஆழம்', 'வேர் தேடுதல்', 'ஞானம்'],
      weaknesses: ['அழிவு விருப்பம்', 'சந்தேகம்', 'தனிமை'],
      remedies: [
        'கேது வழிபாடு',
        'நிருதி வழிபாடு',
        'சனிக்கிழமை விரதம்'
      ],
      mantras: [
        'ఓం కేతవే నమః',
        'ఓం నిర్రుతయే నమః'
      ]
    },{
          id: 'nakshatra_20',
          number: 20,
          name: 'பூராடம்',
          nameEnglish: 'Purva Ashadha',
          sanskritName: 'पूर्वाषाढा',
          lord: 'சுக்கிரன்',
          rulingPlanet: 'Venus',
          deity: 'அப்',
          deityEnglish: 'Ap (Water)',
          symbol: 'யானையின் தந்தம்',
          symbolEnglish: 'Elephant Tusk',
          gana: 'மனுஷ்ய கணம்',
          nature: 'உக்ர (கொடூரம்)',
          element: 'வாயு',
          yoni: 'வானர யோனி',
          yoniEnglish: 'Monkey Yoni',
          yoniAnimal: 'குரங்கு',
          yoniGender: 'ஆண்',
          varna: 'பிராமணர்',
          bodyParts: ['முதுகு', 'இடுப்பு பின் பகுதி'],
          foodPreferences: ['இனிப்பு', 'சுவையான'],
          favorableFoods: ['நீர் சார்ந்த உணவுகள்', 'பழங்கள்', 'பால் பொருட்கள்', 'சுவையான உணவுகள்'],
          unfavorableFoods: ['காரம்', 'கசப்பு', 'வறண்ட உணவுகள்'],
          colors: ['வெள்ளை', 'கிரீம்', 'வெள்ளி'],
          places: ['நீர் நிலைகள்', 'ஆறுகள்', 'குளங்கள்', 'சுத்திகரிப்பு மையங்கள்'],
          favorablePlaces: ['கிழக்கு திசை', 'நீர் சார்ந்த இடங்கள்', 'சுத்திகரிப்பு மையங்கள்'],
          unfavorablePlaces: ['வறண்ட பகுதிகள்', 'பாலைவனங்கள்'],
          temples: ['அப் தேவி கோயில்கள்', 'நீர் தெய்வங்கள்', 'சுக்கிர கோயில்கள்'],
          characteristics: [
            'உற்சாகம் மற்றும் ஊக்கம்',
            'சுத்திகரிப்பு சக்தி',
            'புதுப்பித்தல் திறன்',
            'நீர் சார்ந்த சக்தி'
          ],
          significances: [
            'சுத்திகரிப்பு மற்றும் புதுப்பித்தல்',
            'உற்சாகம் மற்றும் ஊக்கமளித்தல்',
            'நீர் சக்தி மற்றும் ஓட்டம்',
            'புத்துணர்வு மற்றும் வளர்ச்சி'
          ],
          dnaTraits: [
            'சுத்திகரிப்பு ஜீன்கள்',
            'நீர் சமநிலை திறன்',
            'புத்துணர்வு சக்தி'
          ],
          dnaCharacteristics: [
            'நீர் சமநிலை ஹார்மோன்கள்',
            'சுத்திகரிப்பு நரம்பு மண்டலம்',
            'புத்துணர்வு திறன்கள்'
          ],
          strengths: ['சுத்திகரிப்பு', 'உற்சாகம்', 'புத்துணர்வு', 'நீர் சக்தி'],
          weaknesses: ['அதிக உணர்ச்சி', 'நிலையற்ற தன்மை', 'போராட்ட குணம்'],
          remedies: [
            'சுக்கிர வழிபாடு',
            'நீர் தெய்வ வழிபாடு',
            'வெள்ளிக்கிழமை விரதம்'
          ],
          mantras: [
            'ஓம் சுக்ராய நமஃ',
            'ஓம் அப்பியே நமஃ'
          ]
        },
        {
          id: 'nakshatra_21',
          number: 21,
          name: 'உத்திராடம்',
          nameEnglish: 'Uttara Ashadha',
          sanskritName: 'उत्तराषाढा',
          lord: 'சூரியன்',
          rulingPlanet: 'Sun',
          deity: 'விஸ்வேதேவர்கள்',
          deityEnglish: 'Vishvedevas',
          symbol: 'யானையின் தந்தம்',
          symbolEnglish: 'Elephant Tusk',
          gana: 'மனுஷ்ய கணம்',
          nature: 'திர (நிலைத்த)',
          element: 'வாயு',
          yoni: 'நகுல யோனி',
          yoniEnglish: 'Mongoose Yoni',
          yoniAnimal: 'கீரி',
          yoniGender: 'பெண்',
          varna: 'க்ஷத்ரிய',
          bodyParts: ['தொடை', 'முதுகு'],
          foodPreferences: ['சத்தான', 'போஷக'],
          favorableFoods: ['சத்தான உணவுகள்', 'பால் பொருட்கள்', 'தானியங்கள்', 'பழங்கள்'],
          unfavorableFoods: ['ஜங்க் உணவுகள்', 'செயற்கை உணவுகள்'],
          colors: ['மஞ்சள்', 'தங்கம்', 'ஆரஞ்சு'],
          places: ['நிர்வாக அலுவலகங்கள்', 'அரசு கட்டடங்கள்', 'நீதி மன்றங்கள்'],
          favorablePlaces: ['தெற்கு திசை', 'அரசு இடங்கள்', 'நீதி மையங்கள்'],
          unfavorablePlaces: ['அராஜக இடங்கள்', 'குழப்பமான இடங்கள்'],
          temples: ['விஸ்வேதேவர் கோயில்கள்', 'சூரிய கோயில்கள்', 'நீதி தெய்வங்கள்'],
          characteristics: [
            'நீதி உணர்வு',
            'நேர்மை மற்றும் உண்மை',
            'தலைமைத்துவ குணம்',
            'நிலைத்த வெற்றி'
          ],
          significances: [
            'நீதி மற்றும் நேர்மை',
            'தலைமைத்துவம் மற்றும் அதிகாரம்',
            'நிலைத்த வெற்றி',
            'உண்மை மற்றும் நேர்மை'
          ],
          dnaTraits: [
            'நீதி உணர்வு ஜீன்கள்',
            'தலைமைத்துவ குணங்கள்',
            'நிலைத்தன்மை திறன்'
          ],
          dnaCharacteristics: [
            'நீதி ஹார்மோன்கள்',
            'தலைமைத்துவ நரம்பு மண்டலம்',
            'நிலைத்தன்மை சக்தி'
          ],
          strengths: ['நீதி', 'தலைமைத்துவம்', 'நிலைத்தன்மை', 'உண்மை'],
          weaknesses: ['கடுமை', 'அதிக எதிர்பார்ப்பு', 'நெகிழ்வின்மை'],
          remedies: [
            'சூரிய வழிபாடு',
            'விஸ்வேதேவர் வழிபாடு',
            'ஞாயிற்றுக்கிழமை விரதம்'
          ],
          mantras: [
            'ஓம் சூர்யாய நமஃ',
            'ஓம் விஸ்வேதேவேப்யோ நமஃ'
          ]
        }
    // Continue with remaining nakshatras...
  ];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadBookmarkStatus();
    this.updateFilteredNakshatras();
  }

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
  }

  searchNakshatras() {
    this.updateFilteredNakshatras();
  }

  updateFilteredNakshatras() {
    this.filteredNakshatras = this.getFilteredNakshatras();
  }

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    this.saveBookmarkStatus();
    this.showToast(this.isBookmarked ? 'புத்தகக்குறி சேர்க்கப்பட்டது' : 'புத்தகக்குறி நீக்கப்பட்டது');
  }

  filterByGana(gana: string) {
    this.selectedGana = gana;
    this.updateFilteredNakshatras();
  }

  getGanaColor(gana: string): string {
    switch (gana) {
      case 'தேவ': return 'success';
      case 'மனுஷ்ய': return 'warning';
      case 'ராக்ஷஸ': return 'danger';
      default: return 'medium';
    }
  }

  getGanaIcon(gana: string): string {
    switch (gana) {
      case 'தேவ': return 'star';
      case 'மனுஷ்ய': return 'person';
      case 'ராக்ஷஸ': return 'flame';
      default: return 'help';
    }
  }

  getFilteredNakshatras(): Nakshatra[] {
    let filtered = this.nakshatras;
    
    // Filter by gana
    if (this.selectedGana !== 'all') {
      filtered = filtered.filter(n => n.gana === this.selectedGana);
    }

    // Filter by search term
    if (this.searchTerm) {
      filtered = filtered.filter(n => 
        n.name.includes(this.searchTerm) || 
        n.nameEnglish.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    return filtered;
  }

  toggleNakshatraExpansion(nakshatra: Nakshatra) {
    nakshatra.expanded = !nakshatra.expanded;
  }

  async showNakshatraDetails(nakshatra: Nakshatra) {
    const alert = await this.alertController.create({
      header: nakshatra.name,
      subHeader: nakshatra.nameEnglish,
      message: `
        <strong>அதிதேவதை:</strong> ${nakshatra.deity}<br>
        <strong>சின்னம்:</strong> ${nakshatra.symbol}<br>
        <strong>கணம்:</strong> ${nakshatra.gana}<br>
        <strong>யோனி:</strong> ${nakshatra.yoni}<br>
        <strong>குணங்கள்:</strong> ${nakshatra.characteristics.join(', ')}
      `,
      buttons: ['சரி']
    });

    await alert.present();
  }

  navigateToAnalysis() {
    this.selectedSegment = 'analysis';
  }

  previousNakshatra() {
    if (this.currentNakshatraIndex > 0) {
      this.currentNakshatraIndex--;
    }
  }

  nextNakshatra() {
    if (this.currentNakshatraIndex < this.nakshatras.length - 1) {
      this.currentNakshatraIndex++;
    }
  }

  getCurrentNakshatra(): Nakshatra {
    return this.nakshatras[this.currentNakshatraIndex];
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  private loadBookmarkStatus() {
    const bookmarked = localStorage.getItem('natchathiram-karakathuvam-bookmarked');
    this.isBookmarked = bookmarked === 'true';
  }

  private saveBookmarkStatus() {
    localStorage.setItem('natchathiram-karakathuvam-bookmarked', this.isBookmarked.toString());
  }
}
