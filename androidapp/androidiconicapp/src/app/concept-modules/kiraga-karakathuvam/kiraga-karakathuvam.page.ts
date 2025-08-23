import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  debilitationSign: string;
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
  selectedSegment = 'grahakarakathuvam';
  isBookmarked = false;
  showAnalysisView = false;
  currentGrahaIndex = 0;
  searchTerm = '';
  filteredGrahas: Graha[] = [];

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
      debilitationSign: 'துலாம்',
      ownSigns: ['சிம்மம்'],
      moolaTrikona: 'சிம்மம் 0°-20°',
      remedies: ['சூரிய நமஸ்கார்', 'சிவப்பு பூ அர்ப்பணம்', 'தங்க நகை அணிதல்'],
      mantras: ['ॐ सूर्याय नमः', 'आदित्य हृदय स्तोत्रम्'],
      karakathuvam: 'ஆத்மகாரகன் - Soul signification',
      benefits: 'தன்னம்பிக்கை, வலிமை, தலைமை பண்புகள்',
      karakan: 'தந்தை, அரசாங்கம், அதிகாரம்',
      explanation: 'சூரியன் ஜாதகத்தில் தந்தை, அரசாங்கம், அதிகாரம் ஆகியவற்றின் காரகனாக செயல்படுகிறது'
    }
  ];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.filteredGrahas = this.grahas;
  }

  segmentChanged(event: CustomEvent) {
    this.selectedSegment = event.detail.value;
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
        graha.nameEnglish.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
