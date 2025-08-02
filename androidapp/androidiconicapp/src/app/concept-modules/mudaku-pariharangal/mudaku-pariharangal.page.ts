import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';

interface Remedy {
  type: string;
  title: string;
  description: string;
  timing?: string;
}

interface Mantra {
  name: string;
  text: string;
  count: string;
  timing: string;
}

interface MudakuBhavam {
  id: number;
  number: string;
  name: string;
  description: string;
  negativeEffects: string[];
  positiveEffects?: string[];
  remedies: Remedy[];
  mantras?: Mantra[];
  severityLevel: string;
}

@Component({
  selector: 'app-mudaku-pariharangal',
  templateUrl: './mudaku-pariharangal.page.html',
  styleUrls: ['./mudaku-pariharangal.page.scss'],
})
export class MudakuPariharangalPage implements OnInit {
  @ViewChild('detailModal', { static: true }) detailModal!: IonModal;

  searchTerm: string = '';
  isModalOpen: boolean = false;
  selectedBhavam: MudakuBhavam | null = null;
  completedBhavams: number[] = [];
  favoriteBhavams: number[] = [];
  filteredBhavams: MudakuBhavam[] = [];

  bhavamList: MudakuBhavam[] = [
    {
      id: 1,
      number: '1',
      name: 'தனு பாவம் (லக்னம்)',
      description: 'ஆள்மையம், உடல்நலம், ஆயுள், செல்வாக்கு',
      negativeEffects: [
        'உடல்நலக் குறைபாடுகள் மற்றும் நோய்வாய்ப்பு',
        'ஆளுமைத் தன்மையில் குறைபாடு',
        'தன்னம்பிக்கையின்மை',
        'தலைவலி மற்றும் கண் சார்ந்த பிரச்சனைகள்',
        'முகத்தில் கறுப்பு திட்டுகள் அல்லது குறிகள்',
        'அடிக்கடி காய்ச்சல் மற்றும் உடல் சோர்வு'
      ],
      positiveEffects: [
        'சரியான பரிகாரத்தால் வலுவான ஆளுமை',
        'உடல்நலத்தில் முன்னேற்றம்'
      ],
      remedies: [
        {
          type: 'மந்திர பரிகாரம்',
          title: 'மகா மிருத்யுஞ்சய மந்திரம்',
          description: 'ஓம் த்ர்யம்பகம் யஜாமஹே சுகந்திம் புஷ்டிவர்த்தனம் - 108 முறை',
          timing: 'தினமும் காலையில் சூரியோதயத்திற்கு முன்'
        },
        {
          type: 'தானம்',
          title: 'கருப்பு எள் தானம்',
          description: 'சனிக்கிழமை ஏழை மக்களுக்கு கருப்பு எள், அரிசி, துணிகள் வழங்குதல்',
          timing: 'ஒவ்வொரு சனிக்கிழமையும்'
        },
        {
          type: 'வழிபாடு',
          title: 'நவகிரக பூஜை',
          description: 'நவகிரக கோயிலில் சென்று விஷேஷ பூஜை செய்தல்',
          timing: 'மாதம் ஒரு முறை'
        },
        {
          type: 'ஆயுர்வேத',
          title: 'நீம் இலை தேநீர்',
          description: 'வாரம் 3 முறை நீம் இலை தேநீர் அருந்துதல்',
          timing: 'காலை வெறும் வயிற்றில்'
        }
      ],
      mantras: [
        {
          name: 'சூர்ய மந்திரம்',
          text: 'ஓம் சூர்யாய நமஃ',
          count: '108 முறை',
          timing: 'சூரியோதயத்தின் போது'
        }
      ],
      severityLevel: 'அதிக'
    },
    // Add remaining bhavams here - truncated for brevity
  ];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.filteredBhavams = [...this.bhavamList];
    this.loadCompletedBhavams();
    this.loadFavoriteBhavams();
  }

  searchBhavams() {
    if (!this.searchTerm.trim()) {
      this.filteredBhavams = [...this.bhavamList];
      return;
    }

    this.filteredBhavams = this.bhavamList.filter(bhavam =>
      bhavam.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      bhavam.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      bhavam.negativeEffects.some(effect =>
        effect.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  openBhavamDetails(bhavam: MudakuBhavam) {
    this.selectedBhavam = bhavam;
    this.isModalOpen = true;
  }

  closeBhavamDetails() {
    this.isModalOpen = false;
    this.selectedBhavam = null;
  }

  markAsCompleted(bhavamId: number) {
    if (!this.completedBhavams.includes(bhavamId)) {
      this.completedBhavams.push(bhavamId);
      this.saveCompletedBhavams();
      this.showToast('பரிகாரம் முடிந்ததாக குறிக்கப்பட்டது', 'success');
    }
  }

  toggleFavorite(bhavamId: number) {
    const index = this.favoriteBhavams.indexOf(bhavamId);
    if (index > -1) {
      this.favoriteBhavams.splice(index, 1);
      this.showToast('பிடித்தவைகளிலிருந்து நீக்கப்பட்டது', 'medium');
    } else {
      this.favoriteBhavams.push(bhavamId);
      this.showToast('பிடித்தவைகளில் சேர்க்கப்பட்டது', 'success');
    }
    this.saveFavoriteBhavams();
  }

  isFavorite(bhavamId: number): boolean {
    return this.favoriteBhavams.includes(bhavamId);
  }

  isCompleted(bhavamId: number): boolean {
    return this.completedBhavams.includes(bhavamId);
  }

  getSeverityColor(level: string): string {
    switch (level) {
      case 'அதிக': return 'danger';
      case 'நடுத்தர': return 'warning';
      case 'குறைவு': return 'success';
      default: return 'medium';
    }
  }

  private loadCompletedBhavams() {
    const saved = localStorage.getItem('completedMudakuBhavams');
    if (saved) {
      this.completedBhavams = JSON.parse(saved);
    }
  }

  private saveCompletedBhavams() {
    localStorage.setItem('completedMudakuBhavams', JSON.stringify(this.completedBhavams));
  }

  private loadFavoriteBhavams() {
    const saved = localStorage.getItem('favoriteMudakuBhavams');
    if (saved) {
      this.favoriteBhavams = JSON.parse(saved);
    }
  }

  private saveFavoriteBhavams() {
    localStorage.setItem('favoriteMudakuBhavams', JSON.stringify(this.favoriteBhavams));
  }

  private async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }

  shareContent() {
    if (navigator.share) {
      navigator.share({
        title: 'முதக பரிகாரங்கள்',
        text: 'வேத ஜோதிடத்தில் முதக பரிகாரங்கள் பற்றி அறிந்து கொள்ளுங்கள்',
        url: window.location.href
      });
    }
  }
}
