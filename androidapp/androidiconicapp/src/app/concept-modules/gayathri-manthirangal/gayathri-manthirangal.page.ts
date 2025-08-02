import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, AlertController, IonModal } from '@ionic/angular';

interface Mantra {
  id: string;
  name: string;
  deity: string;
  sanskrit: string;
  tamil: string;
  meaning: string;
  benefits: string[];
  howToChant: string;
  bestTime: string;
  duration: string;
  category: 'god' | 'planet' | 'nakshatra' | 'beejam';
  iconUrl?: string;
  audioUrl?: string;
  planet?: string;
  nakshatra?: string;
}

interface MantraCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  count: number;
}

@Component({
  selector: 'app-gayathri-manthirangal',
  templateUrl: './gayathri-manthirangal.page.html',
  styleUrls: ['./gayathri-manthirangal.page.scss'],
})
export class GayathriManthirangalPage implements OnInit {

  @ViewChild('detailModal', { static: true }) detailModal!: IonModal;

  selectedSegment = 'categories';
  selectedCategory = '';
  selectedMantra: Mantra | null = null;
  searchTerm = '';
  isPlaying = false;
  currentAudio: HTMLAudioElement | null = null;
  favoriteMantraIds: string[] = [];
  isBookmarked = false;
  
  categories: MantraCategory[] = [
    {
      id: 'gods',
      name: 'தெய்வ காயத்ரிகள்',
      icon: 'sparkles',
      color: 'primary',
      description: 'பல்வேறு தெய்வங்களின் காயத்ரி மந்திரங்கள்',
      count: 33
    },
    {
      id: 'planets',
      name: 'நவ கிரக மந்திரங்கள்',
      icon: 'planet',
      color: 'secondary',
      description: 'ஒன்பது கிரகங்களுக்கான காயத்ரி மந்திரங்கள்',
      count: 9
    },
    {
      id: 'nakshatras',
      name: '27 நக்ஷத்திர மந்திரங்கள்',
      icon: 'star',
      color: 'tertiary',
      description: 'இருபத்தேழு நட்சத்திரங்களின் காயத்ரி மந்திரங்கள்',
      count: 27
    },
    {
      id: 'beejam',
      name: 'பீஜ மந்திரங்கள்',
      icon: 'leaf',
      color: 'success',
      description: 'சக்திவாய்ந்த பீஜ மந்திரங்கள்',
      count: 15
    }
  ];

  mantras: Mantra[] = [
    // Gods Mantras
    {
      id: 'ganesha',
      name: 'விநாயக காயத்ரி',
      deity: 'விநாயகர்',
      category: 'god',
      sanskrit: 'Om Ekadantaya Vidmahe Vakratundaya Dhimahi Tanno Danti Prachodayat',
      tamil: 'ஓம் ஏகதந்தாய வித்மஹே வக்ரதுண்டாய தீமஹி தன்னோ தந்தி: ப்ரசோதயாத்',
      meaning: 'ஒரு கொம்பு கொண்டவரை நாம் தியானிக்கிறோம், வளைந்த துதிக்கையை நாம் தியானிக்கிறோம், அந்த கஜமுகன் நமக்கு அறிவை அளிக்கட்டும்',
      benefits: ['விக்னங்கள் நீங்கும்', 'புத்தி கூர்மை அதிகரிக்கும்', 'வேலை தொடங்கும் முன் சொல்ல நல்லது'],
      howToChant: '108 முறை அல்லது 21 முறை',
      bestTime: 'காலை 6 மணி',
      duration: '10-15 நிமிடங்கள்'
    },
    {
      id: 'shiva',
      name: 'சிவ காயத்ரி',
      deity: 'சிவன்',
      category: 'god',
      sanskrit: 'Om Tatpurushaya Vidmahe Mahadevaya Dhimahi Tanno Rudra Prachodayat',
      tamil: 'ஓம் தத்புருஷாய வித்மஹே மஹாதேவாய தீமஹி தன்னோ ருத்ர: ப்ரசோதயாத்',
      meaning: 'அந்த உயர்ந்த புருஷனை நாம் அறிகிறோம், மகாதேவனை நாம் தியானிக்கிறோம், அந்த ருத்ரன் நமக்கு உத்வேகம் அளிக்கட்டும்',
      benefits: ['மன அமைதி', 'ஆன்மீக உயர்வு', 'எதிர்மறை சக்திகள் அகலும்'],
      howToChant: '108 முறை',
      bestTime: 'ப்ரதோஷ காலம்',
      duration: '15-20 நிமிடங்கள்'
    }
  ];

  filteredMantras: Mantra[] = [];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.updateCategoryCounts();
    this.filteredMantras = this.mantras;
    this.loadFavorites();
  }

  updateCategoryCounts() {
    this.categories.forEach(category => {
      category.count = this.mantras.filter(m => m.category === category.id).length;
    });
  }

  loadFavorites() {
    const stored = localStorage.getItem('favoriteMantraIds');
    if (stored) {
      this.favoriteMantraIds = JSON.parse(stored);
    }
  }

  saveFavorites() {
    localStorage.setItem('favoriteMantraIds', JSON.stringify(this.favoriteMantraIds));
  }

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
    if (this.selectedSegment === 'categories') {
      this.selectedCategory = '';
    }
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.selectedSegment = 'mantras';
    this.filterMantras();
  }

  filterMantras() {
    let filtered = this.mantras;
    if (this.selectedCategory) {
      filtered = filtered.filter(m => m.category === this.selectedCategory);
    }
    if (this.searchTerm) {
      filtered = filtered.filter(m => 
        m.name.includes(this.searchTerm) ||
        m.deity.includes(this.searchTerm) ||
        m.tamil.includes(this.searchTerm) ||
        m.sanskrit.includes(this.searchTerm)
      );
    }
    this.filteredMantras = filtered;
  }

  searchMantras() {
    this.filterMantras();
  }

  openMantraDetail(mantra: Mantra) {
    this.selectedMantra = mantra;
    this.detailModal.present();
  }

  closeMantraDetail() {
    this.detailModal.dismiss();
    this.selectedMantra = null;
    this.stopAudio();
  }

  toggleFavorite(mantra: Mantra) {
    const index = this.favoriteMantraIds.indexOf(mantra.id);
    if (index > -1) {
      this.favoriteMantraIds.splice(index, 1);
      this.presentToast(mantra.name + ' விருப்பங்களிலிருந்து நீக்கப்பட்டது');
    } else {
      this.favoriteMantraIds.push(mantra.id);
      this.presentToast(mantra.name + ' விருப்பங்களில் சேர்க்கப்பட்டது');
    }
    this.saveFavorites();
  }

  isFavorite(mantra: Mantra): boolean {
    return this.favoriteMantraIds.includes(mantra.id);
  }

  playAudio(mantra: Mantra) {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
    if (mantra.audioUrl) {
      this.currentAudio = new Audio(mantra.audioUrl);
      this.currentAudio.play();
      this.isPlaying = true;
      this.currentAudio.onended = () => {
        this.isPlaying = false;
      };
    }
  }

  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
      this.isPlaying = false;
    }
  }

  shareMantra(mantra: Mantra) {
    const shareText = mantra.name + '\n\n' + mantra.sanskrit + '\n\n' + mantra.tamil + '\n\nபொருள்: ' + mantra.meaning;
    if (navigator.share) {
      navigator.share({
        title: mantra.name,
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        this.presentToast('மந்திரம் கிளிப்போர்டில் நகலெடுக்கப்பட்டது');
      });
    }
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  async showFullBenefits(mantra: Mantra) {
    const alert = await this.alertController.create({
      header: mantra.name + ' - பலன்கள்',
      message: mantra.benefits.map((benefit, index) => (index + 1) + '. ' + benefit).join('<br>'),
      buttons: ['சரி']
    });
    await alert.present();
  }

  getElementColor(category: string): string {
    switch (category) {
      case 'gods': return 'primary';
      case 'planets': return 'secondary';
      case 'nakshatras': return 'tertiary';
      case 'beejam': return 'success';
      default: return 'medium';
    }
  }

  getChantingCount(): string {
    if (this.selectedMantra?.category === 'nakshatra') {
      return '27 முறை';
    } else if (this.selectedMantra?.category === 'beejam') {
      return '108 அல்லது 1008 முறை';
    }
    return '108 முறை';
  }

  trackByMantraId(index: number, mantra: Mantra): string {
    return mantra.id;
  }

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    this.presentToast(this.isBookmarked ? 'புத்தகக்குறி சேர்க்கப்பட்டது' : 'புத்தகக்குறி நீக்கப்பட்டது');
  }
}
