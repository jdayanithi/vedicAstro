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
}

@Component({
  selector: 'app-graha-karakathuvam',
  templateUrl: './graha-karakathuvam.page.html',
  styleUrls: ['./graha-karakathuvam.page.scss'],
})
export class GrahaKarakathuvamPage implements OnInit {

  selectedSegment = 'overview';
  isBookmarked = false;
  showAnalysisView = false;
  currentGrahaIndex = 0;
  searchTerm = '';
  filteredGrahas: Graha[] = [];

  grahas: Graha[] = [
    {
      id: 'surya',
      name: 'சூரியன்',
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
      mantras: ['ॐ सूर्याय नमः', 'आदित्य हृदय स्तोत्रम्']
    }
  ];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.filteredGrahas = [...this.grahas];
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

  searchGrahas() {
    if (!this.searchTerm) {
      this.filteredGrahas = [...this.grahas];
      return;
    }

    this.filteredGrahas = this.grahas.filter(graha =>
      graha.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      graha.nameEnglish.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      graha.significances.some(sig => sig.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  toggleGrahaExpansion(graha: Graha) {
    graha.expanded = !graha.expanded;
  }

  async showGrahaDetails(graha: Graha) {
    const alert = await this.alertController.create({
      header: `${graha.name} (${graha.nameEnglish})`,
      subHeader: graha.sanskritName,
      message: `
        <strong>प्रकृति:</strong> ${graha.type}<br>
        <strong>तत्व:</strong> ${graha.element}<br>
        <strong>நாள்:</strong> ${graha.day}<br>
        <strong>நிறம்:</strong> ${graha.color}<br>
        <strong>ரத்னம்:</strong> ${graha.gemstone}
      `,
      buttons: ['மூடு']
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

  nextGraha() {
    if (this.currentGrahaIndex < this.grahas.length - 1) {
      this.currentGrahaIndex++;
    }
  }

  previousGraha() {
    if (this.currentGrahaIndex > 0) {
      this.currentGrahaIndex--;
    }
  }

  getCurrentGraha(): Graha {
    return this.grahas[this.currentGrahaIndex];
  }

  getGrahaTypeColor(type: string): string {
    switch(type) {
      case 'benefic': return 'success';
      case 'malefic': return 'danger';
      case 'neutral': return 'warning';
      default: return 'medium';
    }
  }

  getGrahaTypeIcon(type: string): string {
    switch(type) {
      case 'benefic': return 'happy';
      case 'malefic': return 'warning';
      case 'neutral': return 'remove-circle';
      default: return 'help-circle';
    }
  }
}
