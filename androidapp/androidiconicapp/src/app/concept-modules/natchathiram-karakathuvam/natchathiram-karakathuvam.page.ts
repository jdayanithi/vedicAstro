import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Nakshatra {
  id: string;
  number: number;
  name: string;
  nameEnglish: string;
  sanskritName: string;
  symbol: string;
  deity: string;
  rulingPlanet: string;
  yoni: string;
  yoniAnimal: string;
  yoniGender: string;
  gana: string;
  varna: string;
  element?: string;
  significances: string[];
  significancesEnglish: string[];
  professions: string[];
  personalities: string[];
  strengths: string[];
  weaknesses: string[];
  compatibleNakshatras: string[];
  incompatibleNakshatras: string[];
  remedies: string[];
  mantras: string[];
  gemstones: string[];
  colors: string[];
  directions: string[];
  trees: string[];
  flowers: string[];
  favorableFoods?: string[];
  unfavorableFoods?: string[];
  favorablePlaces?: string[];
  unfavorablePlaces?: string[];
  bodyParts?: string[];
  temples?: string[];
  dnaCharacteristics?: string[];
  expanded?: boolean;
}

@Component({
  selector: 'app-natchathiram-karakathuvam',
  templateUrl: './natchathiram-karakathuvam.page.html',
  styleUrls: ['./natchathiram-karakathuvam.page.scss'],
})
export class NatchathiramKarakathuvamPage implements OnInit {

  selectedSegment = 'overview';
  isBookmarked = false;
  showAnalysisView = false;
  currentNakshatraIndex = 0;
  searchTerm = '';
  selectedFilter = 'all';
  filteredNakshatras: Nakshatra[] = [];

  nakshatras: Nakshatra[] = [
    {
      id: 'krittika',
      number: 3,
      name: 'கிருத்திகை',
      nameEnglish: 'Krittika',
      sanskritName: 'कृत्तिका',
      symbol: 'கத்தி/दाऊ',
      deity: 'அக்னி/अग्नि',
      rulingPlanet: 'சூரியன்/सूर्य',
      yoni: 'மேற/भेड़',
      yoniAnimal: 'ஆட்டு கிடா',
      yoniGender: 'ஆண்',
      gana: 'ராட்சஸ',
      varna: 'ब्राह्मण',
      significances: [
        'पराक्रम और शक्ति',
        'सफाई और शुद्धीकरण',
        'नेतृत्व और अधिकार'
      ],
      significancesEnglish: [
        'Valor and strength',
        'Purification and cleansing',
        'Leadership and authority'
      ],
      professions: ['ஆசிரியர்', 'சமையல்காரர்', 'பூசாரி', 'தலைவர்', 'கலைஞர்'],
      personalities: ['தலைமை', 'பாதுகாப்பு', 'கடுமை', 'பொறுப்பு'],
      strengths: ['தலைமை', 'பாதுகாப்பு', 'அதிகாரம்', 'தூர்வாசம்'],
      weaknesses: ['கோபம்', 'அகந்தை', 'கடுமை', 'பிடிவாதம்'],
      compatibleNakshatras: ['அசுவினி', 'பரணி', 'ரோகிணி', 'புஷ்யம்'],
      incompatibleNakshatras: ['விசாகா', 'சுவாதி', 'ஜேஷ்டா', 'மூல'],
      remedies: [
        'அக்னி ஹோமம்',
        'சூரிய வழிபாடு',
        'திருவண்ணாமலை கிரிவலம்',
        'தியான பயிற்சி'
      ],
      mantras: [
        'ॐ अग्नये नमः',
        'ॐ सूर्याय नमः',
        'कृत्तिका नक्षत्राय नमः'
      ],
      gemstones: ['மாணிக்கம்', 'சூர்யகான்த மணி', 'लाल गोमेद'],
      colors: ['சிவப்பு', 'ஆரஞ்சு', 'தங்க நிறம்'],
      directions: ['கிழக்கு', 'தென்கிழக்கு'],
      trees: ['அரசு', 'வேம்பு', 'பலா'],
      flowers: ['சிவப்பு ரோஜா', 'கனகாம்பரம்', 'அரளி'],
      element: 'अग्नि',
      favorableFoods: ['கோதுமை', 'நெய்', 'மஞ்சள்', 'இஞ்சி'],
      unfavorableFoods: ['சீனி', 'உப்பு', 'மிளகாய்', 'எண்ணெய்'],
      favorablePlaces: ['கோயில்', 'பருவதம்', 'அக்னி ஸ்தலம்', 'யோக கேந்திரம்'],
      unfavorablePlaces: ['ஆறு', 'கல்லறை', 'மருத்துவமனை', 'பேசார்'],
      bodyParts: ['தலை', 'கண்கள்', 'நெற்றி', 'இரத்தம்'],
      temples: ['திருவண்ணாமலை', 'அருணாசலம்', 'அக்னி மந்திர்'],
      dnaCharacteristics: ['நேதிருத்வ జीன్', 'శుద्ధিতா জीন्', 'శక्তि জীన्']
    }
  ];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.filteredNakshatras = [...this.nakshatras];
  }

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
  }

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    this.showToast(this.isBookmarked ? 'புத்தகக்குறிக்கு சேர்க்கப்பட்டது' : 'புத்தகக்குறியிலிருந்து நீக்கப்பட்டது');
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  searchNakshatras() {
    if (!this.searchTerm) {
      this.filteredNakshatras = [...this.nakshatras];
      return;
    }

    this.filteredNakshatras = this.nakshatras.filter(nakshatra =>
      nakshatra.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      nakshatra.nameEnglish.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      nakshatra.deity.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      nakshatra.significances.some(sig => sig.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  filterByGana(gana: string) {
    if (gana === 'all') {
      this.filteredNakshatras = [...this.nakshatras];
    } else {
      this.filteredNakshatras = this.nakshatras.filter(nakshatra => nakshatra.gana === gana);
    }
    this.selectedFilter = gana;
  }

  toggleNakshatraExpansion(nakshatra: Nakshatra) {
    nakshatra.expanded = !nakshatra.expanded;
  }

  async showNakshatraDetails(nakshatra: Nakshatra) {
    const alert = await this.alertController.create({
      header: `${nakshatra.number}. ${nakshatra.name}`,
      subHeader: `${nakshatra.nameEnglish} (${nakshatra.sanskritName})`,
      message: `
        <strong>अधिदेवता:</strong> ${nakshatra.deity}<br>
        <strong>शासक ग्रह:</strong> ${nakshatra.rulingPlanet}<br>
        <strong>योनि:</strong> ${nakshatra.yoni} (${nakshatra.yoniAnimal})<br>
        <strong>गण:</strong> ${nakshatra.gana}<br>
        <strong>वर्ण:</strong> ${nakshatra.varna}
      `,
      buttons: ['बंद करें']
    });

    await alert.present();
  }

  navigateToAnalysis() {
    this.showAnalysisView = true;
    this.selectedSegment = 'analysis';
  }

  goBack() {
    if (this.showAnalysisView) {
      this.showAnalysisView = false;
      this.selectedSegment = 'overview';
    } else {
      this.router.navigate(['/concepts']);
    }
  }

  nextNakshatra() {
    if (this.currentNakshatraIndex < this.nakshatras.length - 1) {
      this.currentNakshatraIndex++;
    }
  }

  previousNakshatra() {
    if (this.currentNakshatraIndex > 0) {
      this.currentNakshatraIndex--;
    }
  }

  getCurrentNakshatra(): Nakshatra {
    return this.nakshatras[this.currentNakshatraIndex];
  }

  getGanaColor(gana: string): string {
    switch(gana) {
      case 'தேவ': return 'success';
      case 'மனுஷ': return 'warning';
      case 'ராட்சஸ': return 'danger';
      default: return 'medium';
    }
  }

  getGanaIcon(gana: string): string {
    switch(gana) {
      case 'தேவ': return 'star';
      case 'மனுஷ': return 'person';
      case 'ராட்சஸ': return 'flash';
      default: return 'help-circle';
    }
  }
}
