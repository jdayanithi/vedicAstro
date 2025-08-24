import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TextUtilsService } from '../shared/text-utils.service';

interface Graha {
  id: string;
  name: string;
  nameEnglish: string;
  sanskritName: string;
  type: 'benefic' | 'malefic' | 'neutral';
  element: string;
  day: string;
  color: string;
  gemstone: string;
  metal: string;
  direction: string;
  significances: string[];
  significancesEnglish: string[];
  bodyParts: string[];
  diseases: string[];
  professions: string[];
  relationships: string[];
  dasaPeriod: string;
  friendlyPlanets: string[];
  enemyPlanets: string[];
  neutralPlanets: string[];
  exaltationSign: string;
  exaltationDegree: string;
  debilitationSign: string;
  debilitationDegree: string;
  ownSigns: string[];
  moolaTrikona: string;
  remedies: string[];
  mantras: string[];
  expanded?: boolean;
  symbol?: string;
  karakathuvam?: string;
  benefits?: string;
  karakan?: string;
  explanation?: string;
}

@Component({
  selector: 'app-kiraga-karakathuvam',
  templateUrl: './kiraga-karakathuvam.page.html',
  styleUrls: ['./kiraga-karakathuvam.page.scss'],
})
export class KiragaKarakathuvamPage implements OnInit {
  selectedSegment = 'detailed';
  isBookmarked = false;
  showAnalysisView = false;
  currentGrahaIndex = 0;
  searchTerm = '';
  filteredGrahas: Graha[] = [];
  categoryExpandedState: { [key: string]: boolean } = {};

  grahas: Graha[] = [
    {
      id: 'surya',
      name: 'சூரியன்',
      symbol: '☉',
      nameEnglish: 'Sun',
      sanskritName: 'सूर्य',
      type: 'malefic',
      element: 'अग्नि (Fire)',
      day: 'ஞாயிறு',
      color: 'சிவப்பு',
      gemstone: 'மாணிக்கம்',
      metal: 'தங்கம்',
      direction: 'கிழக்கு',
      significances: [
        'ஆத்மா மற்றும் உயிர்',
        'தந்தை மற்றும் அதிகாரம்',
        'அரசு மற்றும் சக்தி',
        'கௌரவம் மற்றும் மரியாதை',
        'தலைமை மற்றும் வலிமை'
      ],
      significancesEnglish: [
        'Soul and life force',
        'Father and authority',
        'Government and power',
        'Honor and respect',
        'Leadership and strength'
      ],
      bodyParts: ['இதயம்', 'முதுகு', 'கண்கள்', 'எலும்புகள்'],
      diseases: ['இதய நோய்கள்', 'முதுகு வலி', 'கண் பிரச்சினைகள்'],
      professions: ['அரசியல்', 'நிர்வாகம்', 'மருத்துவம்', 'தலைமை'],
      relationships: ['தந்தை', 'மன்னன்', 'அதிகாரிகள்'],
      dasaPeriod: '6 வருடங்கள்',
      friendlyPlanets: ['சந்திரன்', 'செவ்வாய்', 'குரு'],
      enemyPlanets: ['சுக்கிரன்', 'சனி'],
      neutralPlanets: ['புதன்'],
      exaltationSign: 'மேஷம்',
      exaltationDegree: '10°',
      debilitationSign: 'துலாம்',
      debilitationDegree: '10°',
      ownSigns: ['சிம்மம்'],
      moolaTrikona: 'சிம்மம் 0°-20°',
      remedies: ['சூரிய நமஸ்கார்', 'சிவப்பு பூ அர்ப்பணம்', 'தங்க நகை அணிதல்'],
      mantras: ['ॐ सूर्याय नमः', 'आदित्य हृदय स्तोत्रम्'],
      karakathuvam: 'ஆத்மகாரகன் - ஆன்மீக வளர்ச்சி, தன்னம்பிக்கை, தலைமைத்துவம், அதிகாரம், பிதாவின் சுகம்',
      benefits: 'தன்னம்பிக்கை, வலிமை, தலைமை பண்புகள், அரசியல் வெற்றி, ஆரோக்யம்',
      karakan: 'தந்தை, அரசாங்கம், அதிகாரம், ஆத்மா',
      explanation: 'சூரியன் ஜாதகத்தில் தந்தை, அரசாங்கம், அதிகாரம், ஆன்மீக வளர்ச்சி ஆகியவற்றின் முக்கிய காரகனாக செயல்படுகிறது'
    },
    {
      id: 'chandra',
      name: 'சந்திரன்',
      symbol: '☽',
      nameEnglish: 'Moon',
      sanskritName: 'चन्द्र',
      type: 'benefic',
      element: 'जल (Water)',
      day: 'திங்கள்',
      color: 'வெள்ளை',
      gemstone: 'முத்து',
      metal: 'வெள்ளி',
      direction: 'வடமேற்கு',
      significances: [
        'மனம் மற்றும் உணர்ச்சிகள்',
        'தாய் மற்றும் பெண்மை',
        'நீர் மற்றும் பயணம்',
        'மன அமைதி மற்றும் சுகம்',
        'கற்பனை மற்றும் படைப்பாற்றல்'
      ],
      significancesEnglish: [
        'Mind and emotions',
        'Mother and femininity',
        'Water and travel',
        'Mental peace and comfort',
        'Imagination and creativity'
      ],
      bodyParts: ['மனம்', 'நுரையீரல்', 'வயிறு', 'மார்பு'],
      diseases: ['மன நோய்கள்', 'நீர்க்கோவை', 'வயிற்று பிரச்சினைகள்'],
      professions: ['கலை', 'பாலியல் வணிகம்', 'நீர் சார்ந்த தொழில்', 'பயணம்'],
      relationships: ['தாய்', 'மனைவி', 'பெண்கள்'],
      dasaPeriod: '10 வருடங்கள்',
      friendlyPlanets: ['சூரியன்', 'புதன்'],
      enemyPlanets: [],
      neutralPlanets: ['செவ்வாய்', 'குரு', 'சுக்கிரன்', 'சனி'],
      exaltationSign: 'ரிஷபம்',
      exaltationDegree: '3°',
      debilitationSign: 'விருச்சிகம்',
      debilitationDegree: '3°',
      ownSigns: ['கடகம்'],
      moolaTrikona: 'கடகம் 3°-30°',
      remedies: ['வெள்ளி கிழமை விரதம்', 'முத்து அணிதல்', 'பால் தானம்'],
      mantras: ['ॐ चन्द्राय नमः', 'चन्द्र गायत्री मन्त्र'],
      karakathuvam: 'மனோகாரகன் - மன நிலை, உணர்ச்சிகள், தாய்மை, நீர் கூறுகள், மன அமைதி',
      benefits: 'மன அமைதி, உணர்ச்சி நிலைத்தன்மை, கற்பனை திறன், தாய்மை சுகம்',
      karakan: 'தாய், மனம், உணர்ச்சிகள், நீர்',
      explanation: 'சந்திரன் மனம், உணர்ச்சிகள், தாய், பெண்மை ஆகியவற்றின் முக்கிய காரகனாக செயல்படுகிறது'
    },
    {
      id: 'mangal',
      name: 'செவ்வாய்',
      symbol: '♂',
      nameEnglish: 'Mars',
      sanskritName: 'मंगल',
      type: 'malefic',
      element: 'अग्नि (Fire)',
      day: 'செவ்வாய்',
      color: 'சிவப்பு',
      gemstone: 'பவளம்',
      metal: 'செம்பு',
      direction: 'தெற்கு',
      significances: [
        'வீரம் மற்றும் துணிச்சல்',
        'சகோதரர்கள் மற்றும் நண்பர்கள்',
        'நிலம் மற்றும் சொத்து',
        'சக்தி மற்றும் பலம்',
        'விளையாட்டு மற்றும் போட்டி'
      ],
      significancesEnglish: [
        'Courage and bravery',
        'Siblings and friends',
        'Land and property',
        'Energy and strength',
        'Sports and competition'
      ],
      bodyParts: ['இரத்தம்', 'தசைகள்', 'மூக்கு', 'கைகள்'],
      diseases: ['காயங்கள்', 'இரத்த நோய்கள்', 'வீக்கம்'],
      professions: ['இராணுவம்', 'விளையாட்டு', 'இயந்திர தொழில்', 'காவல்துறை'],
      relationships: ['சகோதரர்கள்', 'நண்பர்கள்', 'போர் வீரர்கள்'],
      dasaPeriod: '7 வருடங்கள்',
      friendlyPlanets: ['சூரியன்', 'சந்திரன்', 'குரு'],
      enemyPlanets: ['புதன்'],
      neutralPlanets: ['சுக்கிரன்', 'சனி'],
      exaltationSign: 'மகரம்',
      exaltationDegree: '28°',
      debilitationSign: 'கடகம்',
      debilitationDegree: '28°',
      ownSigns: ['மேஷம்', 'விருச்சிகம்'],
      moolaTrikona: 'மேஷம் 0°-12°',
      remedies: ['ஹனுமான் பூஜை', 'பவளம் அணிதல்', 'செவ்வாய் விரதம்'],
      mantras: ['ॐ मंगलाय नमः', 'हनुमान चालीसा'],
      karakathuvam: 'பௌமாகாரகன் - வீரம், சகோதரர்கள், நிலம், சக்தி, செயல்திறன்',
      benefits: 'வீரம், தலைமைத்துவம், உடல் வலிமை, சகோதர சுகம், நில சொத்து',
      karakan: 'சகோதரர்கள், நிலம், வீரம், சக்தி',
      explanation: 'செவ்வாய் சகோதரர்கள், வீரம், நிலம், சக்தி ஆகியவற்றின் முக்கிய காரகனாக செயல்படுகிறது'
    },
    {
      id: 'budha',
      name: 'புதன்',
      symbol: '☿',
      nameEnglish: 'Mercury',
      sanskritName: 'बुध',
      type: 'neutral',
      element: 'पृथ्वी (Earth)',
      day: 'புதன்',
      color: 'பச்சை',
      gemstone: 'மரகதம்',
      metal: 'வெண்கலம்',
      direction: 'வடக்கு',
      significances: [
        'புத்தி மற்றும் அறிவு',
        'தொடர்பு மற்றும் பேச்சு',
        'வணிகம் மற்றும் வர்த்தகம்',
        'கல்வி மற்றும் கற்றல்',
        'எழுத்து மற்றும் கணக்கு'
      ],
      significancesEnglish: [
        'Intelligence and wisdom',
        'Communication and speech',
        'Business and trade',
        'Education and learning',
        'Writing and mathematics'
      ],
      bodyParts: ['மூளை', 'நரம்பு மண்டலம்', 'தோல்', 'நாக்கு'],
      diseases: ['நரம்பு நோய்கள்', 'தோல் பிரச்சினைகள்', 'பேச்சு குறைபாடு'],
      professions: ['கல்வி', 'வணிகம்', 'எழுத்து', 'கணினி', 'தொடர்பு'],
      relationships: ['மாணவர்கள்', 'வணிகர்கள்', 'நண்பர்கள்'],
      dasaPeriod: '17 வருடங்கள்',
      friendlyPlanets: ['சூரியன்', 'சுக்கிரன்'],
      enemyPlanets: ['சந்திரன்'],
      neutralPlanets: ['செவ்வாய்', 'குரு', 'சனி'],
      exaltationSign: 'கன்னி',
      exaltationDegree: '15°',
      debilitationSign: 'மீனம்',
      debilitationDegree: '15°',
      ownSigns: ['மிதுனம்', 'கன்னி'],
      moolaTrikona: 'கன்னி 15°-20°',
      remedies: ['சரஸ்வதி பூஜை', 'மரகதம் அணிதல்', 'புதன் கிரக மந்திரம்'],
      mantras: ['ॐ बुधाय नमः', 'बुध गायत्री मन्त्र'],
      karakathuvam: 'ஜ்ஞானகாரகன் - புத்தி, கல்வி, வணிகம், தொடர்பு, எழுத்து திறன்',
      benefits: 'அறிவுத்திறன், வணிக வெற்றி, தொடர்பு திறன், கல்வி வெற்றி',
      karakan: 'புத்தி, கல்வி, வணிகம், தொடர்பு',
      explanation: 'புதன் புத்தி, கல்வி, வணிகம், தொடர்பு ஆகியவற்றின் முக்கிய காரகனாக செயல்படுகிறது'
    },
    {
      id: 'guru',
      name: 'குரு',
      symbol: '♃',
      nameEnglish: 'Jupiter',
      sanskritName: 'गुरु',
      type: 'benefic',
      element: 'आकाश (Space)',
      day: 'வியாழன்',
      color: 'மஞ்சள்',
      gemstone: 'புஷ்பராகம்',
      metal: 'தங்கம்',
      direction: 'வடகிழக்கு',
      significances: [
        'ஞானம் மற்றும் ஆன்மீகம்',
        'கல்வி மற்றும் கற்றல்',
        'குருக்கள் மற்றும் வழிகாட்டுதல்',
        'தர்மம் மற்றும் நீதி',
        'செல்வம் மற்றும் அதிர்ஷ்டம்'
      ],
      significancesEnglish: [
        'Wisdom and spirituality',
        'Education and learning',
        'Teachers and guidance',
        'Dharma and justice',
        'Wealth and fortune'
      ],
      bodyParts: ['கல்லீரல்', 'கொழுப்பு', 'தொடைகள்', 'இடுப்பு'],
      diseases: ['சர்க்கரை நோய்', 'கல்லீரல் பிரச்சினைகள்', 'உடல் பருமன்'],
      professions: ['கல்வி', 'ஆன்மீகம்', 'நீதித்துறை', 'ஆலோசனை'],
      relationships: ['குருக்கள்', 'தந்தை', 'ஆலோசகர்கள்'],
      dasaPeriod: '16 வருடங்கள்',
      friendlyPlanets: ['சூரியன்', 'சந்திரன்', 'செவ்வாய்'],
      enemyPlanets: ['புதன்', 'சுக்கிரன்'],
      neutralPlanets: ['சனி'],
      exaltationSign: 'கடகம்',
      exaltationDegree: '5°',
      debilitationSign: 'மகரம்',
      debilitationDegree: '5°',
      ownSigns: ['தனுசு', 'மீனம்'],
      moolaTrikona: 'தனுசு 0°-10°',
      remedies: ['குரு பூஜை', 'புஷ்பராகம் அணிதல்', 'வியாழன் விரதம்'],
      mantras: ['ॐ गुरवे नमः', 'गुरु गायत्री मन्त्र'],
      karakathuvam: 'ஜீவகாரகன் - ஞானம், கல்வி, குருவின் அருள், தர்மம், ஆன்மீக வளர்ச்சி',
      benefits: 'ஞானம், கல்வி வெற்றி, ஆன்மீக வளர்ச்சி, செல்வம், நல்ல ஆலோசனை',
      karakan: 'ஞானம், கல்வி, குரு, தர்மம்',
      explanation: 'குரு ஞானம், கல்வி, ஆன்மீகம், தர்மம் ஆகியவற்றின் முக்கிய காரகனாக செயல்படுகிறது'
    },
    {
      id: 'sukra',
      name: 'சுக்கிரன்',
      symbol: '♀',
      nameEnglish: 'Venus',
      sanskritName: 'शुक्र',
      type: 'benefic',
      element: 'जल (Water)',
      day: 'வெள்ளி',
      color: 'வெள்ளை',
      gemstone: 'வைரம்',
      metal: 'வெள்ளி',
      direction: 'தென்கிழக்கு',
      significances: [
        'அன்பு மற்றும் காதல்',
        'அழகு மற்றும் கலை',
        'பெண்கள் மற்றும் மணம்',
        'ஆடம்பரம் மற்றும் இன்பம்',
        'கலை மற்றும் இசை'
      ],
      significancesEnglish: [
        'Love and romance',
        'Beauty and arts',
        'Women and marriage',
        'Luxury and pleasure',
        'Arts and music'
      ],
      bodyParts: ['இனப்பெருக்க உறுப்புகள்', 'சிறுநீரகம்', 'கண்கள்', 'முகம்'],
      diseases: ['இனப்பெருக்க பிரச்சினைகள்', 'சிறுநீரக நோய்கள்', 'கண் நோய்கள்'],
      professions: ['கலை', 'இசை', 'நடிப்பு', 'அழகுசாதனம்', 'ஆடம்பர பொருட்கள்'],
      relationships: ['மனைவி', 'காதலர்', 'கலைஞர்கள்'],
      dasaPeriod: '20 வருடங்கள்',
      friendlyPlanets: ['புதன்', 'சனி'],
      enemyPlanets: ['சூரியன்', 'சந்திரன்'],
      neutralPlanets: ['செவ்வாய்', 'குரு'],
      exaltationSign: 'மீனம்',
      exaltationDegree: '27°',
      debilitationSign: 'கன்னி',
      debilitationDegree: '27°',
      ownSigns: ['ரிஷபம்', 'துலாம்'],
      moolaTrikona: 'துலாம் 0°-15°',
      remedies: ['லட்சுமி பூஜை', 'வைரம் அணிதல்', 'வெள்ளி விரதம்'],
      mantras: ['ॐ शुक्राय नमः', 'शुक्र गायत्री मन्त्र'],
      karakathuvam: 'காலத்ரகாரகன் - காதல், திருமணம், அழகு, கலை, இன்பம், செல்வம்',
      benefits: 'அன்பு வாழ்க்கை, அழகு, கலை திறன், செல்வம், மணவாழ்க்கை சுகம்',
      karakan: 'மனைவி, அழகு, கலை, காதல்',
      explanation: 'சுக்கிரன் காதல், திருமணம், அழகு, கலை ஆகியவற்றின் முக்கிய காரகனாக செயல்படுகிறது'
    },
    {
      id: 'sani',
      name: 'சனி',
      symbol: '♄',
      nameEnglish: 'Saturn',
      sanskritName: 'शनि',
      type: 'malefic',
      element: 'वायु (Air)',
      day: 'சனி',
      color: 'கருப்பு',
      gemstone: 'நீலம்',
      metal: 'இரும்பு',
      direction: 'மேற்கு',
      significances: [
        'கடின உழைப்பு மற்றும் பொறுமை',
        'கர்மா மற்றும் நீதி',
        'வயதானவர்கள் மற்றும் தந்தை',
        'தடைகள் மற்றும் சோதனைகள்',
        'ஆன்மீக வளர்ச்சி'
      ],
      significancesEnglish: [
        'Hard work and patience',
        'Karma and justice',
        'Elderly and father',
        'Obstacles and trials',
        'Spiritual growth'
      ],
      bodyParts: ['எலும்புகள்', 'பற்கள்', 'தோல்', 'முடி'],
      diseases: ['மூட்டு வலி', 'எலும்பு நோய்கள்', 'மன அழுத்தம்'],
      professions: ['தொழிலாளி', 'இரும்பு வணிகம்', 'கடின உழைப்பு', 'நீதித்துறை'],
      relationships: ['தந்தை', 'வயதானவர்கள்', 'ஊழியர்கள்'],
      dasaPeriod: '19 வருடங்கள்',
      friendlyPlanets: ['புதன்', 'சுக்கிரன்'],
      enemyPlanets: ['சூரியன்', 'சந்திரன்', 'செவ்வாய்'],
      neutralPlanets: ['குரு'],
      exaltationSign: 'துலாம்',
      exaltationDegree: '20°',
      debilitationSign: 'மேஷம்',
      debilitationDegree: '20°',
      ownSigns: ['மகரம்', 'கும்பம்'],
      moolaTrikona: 'கும்பம் 0°-20°',
      remedies: ['சனி பூஜை', 'நீலம் அணிதல்', 'சனி விரதம்'],
      mantras: ['ॐ शनैश्चराय नमः', 'शनि गायत्री मन्त्र'],
      karakathuvam: 'தீர்க்காயுஸ்காரகன் - கர்மா, நீதி, பொறுமை, கடின உழைப்பு, ஆயுள்',
      benefits: 'பொறுமை, நீதிமான் வாழ்க்கை, கடின உழைப்பு பலன், ஆன்மீக வளர்ச்சி',
      karakan: 'கர்மா, நீதி, பொறுமை, ஆயுள்',
      explanation: 'சனி கர்மா, நீதி, பொறுமை, ஆயுள் ஆகியவற்றின் முக்கிய காரகனாக செயல்படுகிறது'
    },
    {
      id: 'rahu',
      name: 'ராகு',
      symbol: '☊',
      nameEnglish: 'Rahu',
      sanskritName: 'राहु',
      type: 'malefic',
      element: 'वायु (Air)',
      day: 'சனி',
      color: 'புகை நிறம்',
      gemstone: 'கோமேதகம்',
      metal: 'ஈயம்',
      direction: 'தென்மேற்கு',
      significances: [
        'மாயை மற்றும் மோகம்',
        'அன்னிய கலாச்சாரம்',
        'தொழில்நுட்பம் மற்றும் புதுமை',
        'திடீர் மாற்றங்கள்',
        'ஆன்மீக தடைகள்'
      ],
      significancesEnglish: [
        'Illusion and obsession',
        'Foreign culture',
        'Technology and innovation',
        'Sudden changes',
        'Spiritual obstacles'
      ],
      bodyParts: ['தலை', 'மூளை', 'நரம்பு மண்டலம்'],
      diseases: ['மன நோய்கள்', 'தலைவலி', 'விஷ பாதிப்பு'],
      professions: ['தொழில்நுட்பம்', 'ஆராய்ச்சி', 'அன்னிய வணிகம்', 'மாயாஜாலம்'],
      relationships: ['அன்னியர்கள்', 'மாமன்', 'ஆராய்ச்சியாளர்கள்'],
      dasaPeriod: '18 வருடங்கள்',
      friendlyPlanets: ['புதன்', 'சுக்கிரன்', 'சனி'],
      enemyPlanets: ['சூரியன்', 'சந்திரன்', 'செவ்வாய்'],
      neutralPlanets: ['குரு'],
      exaltationSign: 'மிதுனம்',
      exaltationDegree: '20°',
      debilitationSign: 'தனுசு',
      debilitationDegree: '20°',
      ownSigns: [],
      moolaTrikona: '',
      remedies: ['ராகு பூஜை', 'கோமேதகம் அணிதல்', 'சர்ப்ப தோஷ பரிகாரம்'],
      mantras: ['ॐ राहवे नमः', 'राहु गायत्री मन्त्र'],
      karakathuvam: 'மாயாகாரகன் - மாயை, அன்னிய கலாச்சாரம், தொழில்நுட்பம், திடீர் மாற்றங்கள்',
      benefits: 'தொழில்நுட்ப திறன், அன்னிய பயன்கள், ஆராய்ச்சி திறன், புதுமை',
      karakan: 'மாயை, அன்னியம், தொழில்நுட்பம்',
      explanation: 'ராகு மாயை, அன்னிய கலாச்சாரம், தொழில்நுட்பம் ஆகியவற்றின் காரகனாக செயல்படுகிறது'
    },
    {
      id: 'ketu',
      name: 'கேது',
      symbol: '☋',
      nameEnglish: 'Ketu',
      sanskritName: 'केतु',
      type: 'malefic',
      element: 'अग्नि (Fire)',
      day: 'செவ்வாய்',
      color: 'பழுப்பு',
      gemstone: 'லஹசுனியா',
      metal: 'வெண்கலம்',
      direction: 'வடமேற்கு',
      significances: [
        'ஆன்மீக வளர்ச்சி',
        'முக்தி மற்றும் மோட்சம்',
        'அறிவு மற்றும் ஞானம்',
        'தனிமை மற்றும் தியானம்',
        'கர்ம விமோசனம்'
      ],
      significancesEnglish: [
        'Spiritual growth',
        'Liberation and moksha',
        'Knowledge and wisdom',
        'Solitude and meditation',
        'Karmic liberation'
      ],
      bodyParts: ['வால்', 'கால்கள்', 'இடுப்பு'],
      diseases: ['கர்ம நोय்கள்', 'ஆன்மீக பிரச்சினைகள்', 'மன குழப்பம்'],
      professions: ['ஆன்மீகம்', 'ஜோதிடம்', 'ஆராய்ச்சி', 'தனிமை'],
      relationships: ['குருக்கள்', 'ஆன்மீக வழிகாட்டிகள்'],
      dasaPeriod: '7 வருடங்கள்',
      friendlyPlanets: ['செவ்வாய்', 'குரு'],
      enemyPlanets: ['சூரியன்', 'சந்திரன்'],
      neutralPlanets: ['புதன்', 'சுக்கிரன்', 'சனி'],
      exaltationSign: 'தனுசு',
      exaltationDegree: '20°',
      debilitationSign: 'மிதுனம்',
      debilitationDegree: '20°',
      ownSigns: [],
      moolaTrikona: '',
      remedies: ['கேது பூஜை', 'லஹசுனியா அணிதல்', 'ஆன்மீக பயிற்சி'],
      mantras: ['ॐ केतवे नमः', 'केतु गायत्री मन्त्र'],
      karakathuvam: 'மோட்சகாரகன் - ஆன்மீக வளர்ச்சி, முக்தி, ஞானம், தனிமை, கர்ம விமோசனம்',
      benefits: 'ஆன்மீக ஞானம், முக்தி நிலை, தியான திறன், கர்ம பரிகாரம்',
      karakan: 'ஆன்மீகம், முக்தி, ஞானம்',
      explanation: 'கேது ஆன்மீக வளர்ச்சி, முக்தி, ஞானம் ஆகியவற்றின் முக்கிய காரகனாக செயல்படுகிறது'
    }
  ];

  // Category structure for organized access
  categories = [
    {
      key: 'gem',
      name: 'ரத்தினங்கள்',
      icon: 'diamond-outline',
      description: 'ஒவ்வொரு கிரகத்தின் ரத்தினங்கள்'
    },
    {
      key: 'metal',
      name: 'உலோகங்கள்',
      icon: 'hardware-chip-outline',
      description: 'கிரகங்களின் உலோகங்கள்'
    },
    {
      key: 'direction',
      name: 'திசைகள்',
      icon: 'compass-outline',
      description: 'கிரகங்களின் திசைகள்'
    },
    {
      key: 'bodyparts',
      name: 'உடல் பாகங்கள்',
      icon: 'body-outline',
      description: 'கிரகங்கள் ஆளும் உடல் பாகங்கள்'
    },
    {
      key: 'diseases',
      name: 'நோய்கள்',
      icon: 'medical-outline',
      description: 'கிரகங்கள் சார்ந்த நோய்கள்'
    },
    {
      key: 'professions',
      name: 'தொழில்கள்',
      icon: 'briefcase-outline',
      description: 'கிரகங்கள் சார்ந்த தொழில்கள்'
    },
    {
      key: 'relationships',
      name: 'உறவுகள்',
      icon: 'people-outline',
      description: 'கிரகங்கள் குறிக்கும் உறவுகள்'
    },
    {
      key: 'remedies',
      name: 'பரிகாரங்கள்',
      icon: 'leaf-outline',
      description: 'கிரக பரிகாரங்கள்'
    },
    {
      key: 'exaltation',
      name: 'உச்சம்/நீசம்',
      icon: 'trending-up-outline',
      description: 'கிரகங்களின் உச்ச மற்றும் நீச ராசிகள்'
    },
    {
      key: 'moolatrikona',
      name: 'மூலத்ரிகோணம்',
      icon: 'triangle-outline',
      description: 'கிரகங்களின் மூலத்ரிகோண ராசிகள்'
    }
  ];

  selectedCategory = 'gem';
  showCategoryFilter = false;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router,
    private textUtils: TextUtilsService
  ) {}

  ngOnInit() {
    this.filteredGrahas = this.grahas;
  }

  segmentChanged(event: CustomEvent) {
    this.selectedSegment = event.detail.value;
    // Reset category selection when switching segments
    if (this.selectedSegment === 'categories') {
      this.selectedCategory = 'gem';
    }
  }

  // Category management methods
  selectCategory(categoryKey: string) {
    this.selectedCategory = categoryKey;
  }

  getCategoryData(graha: Graha, categoryKey: string): any {
    switch (categoryKey) {
      case 'gem':
        return graha.gemstone;
      case 'metal':
        return graha.metal;
      case 'direction':
        return graha.direction;
      case 'bodyparts':
        return graha.bodyParts;
      case 'diseases':
        return graha.diseases;
      case 'professions':
        return graha.professions;
      case 'relationships':
        return graha.relationships;
      case 'remedies':
        return graha.remedies;
      case 'exaltation':
        return {
          exaltation: graha.exaltationSign,
          debilitation: graha.debilitationSign
        };
      case 'moolatrikona':
        return graha.moolaTrikona;
      default:
        return '';
    }
  }

  getCategoryIcon(categoryKey: string): string {
    const category = this.categories.find(cat => cat.key === categoryKey);
    return category ? category.icon : 'help-outline';
  }

  getCategoryColor(categoryKey: string): string {
    const colors: { [key: string]: string } = {
      'gem': 'secondary',
      'metal': 'tertiary',
      'direction': 'warning',
      'bodyparts': 'danger',
      'diseases': 'dark',
      'professions': 'success',
      'relationships': 'primary',
      'remedies': 'medium',
      'exaltation': 'success',
      'moolatrikona': 'tertiary'
    };
    return colors[categoryKey] || 'medium';
  }

  // Additional helper methods for category organization
  expandGrahaDetails(graha: Graha) {
    graha.expanded = !graha.expanded;
  }

  formatCategoryData(data: any): string {
    if (Array.isArray(data)) {
      return data.join(', ');
    }
    return data || '';
  }

  // Method to determine if content should be shown in detail or short form
  shouldShowDetailedView(data: any, maxShortItems: number = 3): boolean {
    if (Array.isArray(data)) {
      return data.length > maxShortItems;
    }
    if (typeof data === 'string') {
      return data.length > 50; // Show detailed if text is longer than 50 characters
    }
    return false;
  }

  // Get truncated data for short view
  getTruncatedData(data: any, maxItems: number = 3): any {
    if (Array.isArray(data)) {
      return data.slice(0, maxItems);
    }
    if (typeof data === 'string') {
      return data.length > 50 ? data.substring(0, 47) + '...' : data;
    }
    return data;
  }

  // Get remaining count for "show more" functionality
  getRemainingCount(data: any, maxItems: number = 3): number {
    if (Array.isArray(data)) {
      return Math.max(0, data.length - maxItems);
    }
    return 0;
  }

  // Check if category has lengthy content
  categoryHasLengthyContent(categoryKey: string): boolean {
    const lengthyCategories = ['bodyparts', 'diseases', 'professions', 'relationships', 'remedies'];
    return lengthyCategories.includes(categoryKey);
  }

  // Toggle expansion for category items
  toggleCategoryExpansion(grahaId: string, categoryKey: string) {
    const key = `${grahaId}_${categoryKey}`;
    this.categoryExpandedState[key] = !this.categoryExpandedState[key];
  }

  // Check if category item is expanded
  isCategoryExpanded(grahaId: string, categoryKey: string): boolean {
    const key = `${grahaId}_${categoryKey}`;
    return this.categoryExpandedState[key] || false;
  }

  // Method to get category title and description
  getCategoryInfo(categoryKey: string) {
    return this.categories.find(cat => cat.key === categoryKey);
  }

  // Alias for existing method to match template usage
  shareGrahaInfo(graha: Graha) {
    this.shareGraha(graha);
  }

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    // Implement bookmark logic
  }

  async shareContent() {
    // Implement share logic
  }

  filterGrahas() {
    if (this.searchTerm.trim() === '') {
      this.filteredGrahas = this.grahas;
    } else {
      this.filteredGrahas = this.grahas.filter(graha =>
        graha.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        graha.nameEnglish.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        graha.sanskritName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  highlightColonWords(content: string): string {
    return this.textUtils.highlightColonWords(content);
  }

  async showGrahaDetails(graha: Graha) {
    const alert = await this.alertController.create({
      header: `${graha.name} - ${graha.nameEnglish}`,
      message: `
        <div style="text-align: left;">
          <p><strong>காரகத்துவம்:</strong> ${graha.karakathuvam}</p>
          <p><strong>பலன்கள்:</strong> ${graha.benefits}</p>
          <p><strong>ரத்தினம்:</strong> ${graha.gemstone}</p>
          <p><strong>உலோகம்:</strong> ${graha.metal}</p>
          <p><strong>திசை:</strong> ${graha.direction}</p>
        </div>
      `,
      buttons: ['சரி']
    });
    await alert.present();
  }

  async shareGraha(graha: Graha) {
    const toast = await this.toastController.create({
      message: `${graha.name} தகவல்கள் பகிரப்பட்டன`,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }
}
