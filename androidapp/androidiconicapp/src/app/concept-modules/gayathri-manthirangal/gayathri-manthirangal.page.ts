import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, AlertController, IonModal } from '@ionic/angular';

interface Mantra {
  id: string;
  name: string;
  deity: string;
  text?: string;
  sanskrit?: string;
  tamil?: string;
  meaning?: string;
  benefits: string[];
  howToChant?: string;
  bestTime?: string;
  duration?: string;
  category?: 'god' | 'planet' | 'nakshatra' | 'beejam';
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
  
  // Compact Gayathri Mantras Structure
  gayathriCategories = [
    {
      id: 'mool',
      name: 'மூல காயத்ரி',
      icon: '🕉️',
      color: 'primary',
      mantras: [
        {
          id: 'mool_gayathri',
          name: 'மூல காயத்ரி மந்திரம்',
          deity: 'சவிதா',
          text: 'ஓம் பூர் புவ: ஸ்வ: தத் சவிதுர் வரேண்யம் பர்கோ தேவஸ்ய தீமஹி தியோ யோ ந: ப்ரசோதயாத்॥',
          benefits: ['மன அமைதி', 'ஞான வளர்ச்சி', 'ஆன்மீக முன்னேற்றம்', 'நேர்மறை சக்தி']
        }
      ]
    },
    {
      id: 'navagraha',
      name: 'நவகிரக காயத்ரி',
      icon: '🪐',
      color: 'secondary',
      mantras: [
        {
          id: 'surya',
          name: 'சூர்ய காயத்ரி',
          deity: 'சூர்யன்',
          text: 'ஓம் ஆதித்யாய வித்மஹே மார்தண்டாய தீமஹி தன்னோ சூர்ய: ப்ரசோதயாத்॥',
          benefits: ['உடல் ஆரோக்யம்', 'தலைமைத்துவம்', 'வெற்றி', 'கண் நோய் தீர்வு']
        },
        {
          id: 'chandra',
          name: 'சந்திர காயத்ரி',
          deity: 'சந்திரன்',
          text: 'ஓம் பத்மத்வஜாய வித்மஹே ஹேம ரூபாய தீமஹி தன்னோ சோம: ப்ரசோதயாத்॥',
          benefits: ['மன அமைதி', 'உணர்ச்சி சமநிலை', 'தாய்மை சக்தி', 'நினைவாற்றல்']
        },
        {
          id: 'mangal',
          name: 'அங்காரக காயத்ரி',
          deity: 'செவ்வாய்',
          text: 'ஓம் அங்காரகாய வித்மஹே பூமிபுத்ராய தீமஹி தன்னோ பௌம: ப்ரசோதயாத்॥',
          benefits: ['தைரியம்', 'செவ்வாய் தோஷ நிவாரணம்', 'போட்டி வெற்றி', 'சொத்து பெறுதல்']
        },
        {
          id: 'budha',
          name: 'புத காயத்ரி',
          deity: 'புதன்',
          text: 'ஓம் கஜத்வஜாய வித்மஹே சுகுமாராய தீமஹி தன்னோ புத: ப்ரசோதயாத்॥',
          benefits: ['புத்தி கூர்மை', 'கல்வி', 'வணிகம்', 'பேச்சுத் திறமை']
        },
        {
          id: 'guru',
          name: 'குரு காயத்ரி',
          deity: 'வியாழன்',
          text: 'ஓம் வ்ருஷபத்வஜாய வித்மஹே க்ருணி ஹஸ்தாய தீமஹி தன்னோ குரு: ப்ரசோதயாத்॥',
          benefits: ['ஞானம்', 'குரு கடாக்ஷம்', 'ஆன்மீக வளர்ச்சி', 'செல்வம்']
        },
        {
          id: 'shukra',
          name: 'சுக்ர காயத்ரி',
          deity: 'வெள்ளி',
          text: 'ஓம் அஸ்பத்வஜாய வித்மஹே தனுர் ஹஸ்தாய தீமஹி தன்னோ சுக்ர: ப்ரசோதயாத்॥',
          benefits: ['அழகு', 'கலை திறன்', 'திருமணம்', 'ஆடம்பரம்']
        },
        {
          id: 'shani',
          name: 'சனி காயத்ரி',
          deity: 'சனி',
          text: 'ஓம் காகத்வஜாய வித்மஹே கடக ஹஸ்தாய தீமஹி தன்னோ மந்த: ப்ரசோதயாத்॥',
          benefits: ['சனி தோஷ நிவாரணம்', 'நீதி நெறி', 'கடின உழைப்பு', 'சமுதாய சேவை']
        },
        {
          id: 'rahu',
          name: 'ராகு காயத்ரி',
          deity: 'ராகு',
          text: 'ஓம் நாகத்வஜாய வித்மஹே பத்ம ஹஸ்தாய தீமஹி தன்னோ ராகு: ப்ரசோதயாத்॥',
          benefits: ['ராகு தோஷ நிவாரணம்', 'மாயை அகற்றல்', 'மறைந்த ஞானம்', 'தடைகள் நீக்கம்']
        },
        {
          id: 'ketu',
          name: 'கேது காயத்ரி',
          deity: 'கேது',
          text: 'ஓம் அஸ்வத்வஜாய வித்மஹே சூல ஹஸ்தாய தீமஹி தன்னோ கேது: ப்ரசோதயாத்॥',
          benefits: ['கேது தோஷ நிவாரணம்', 'ஆன்மீக விடுதலை', 'மோக்ஷம்', 'கர்ம விமோசனம்']
        }
      ]
    },
    {
      id: 'deities',
      name: 'தெய்வ காயத்ரி',
      icon: '🙏',
      color: 'tertiary',
      mantras: [
        {
          id: 'ganesha',
          name: 'விநாயக காயத்ரி',
          deity: 'விநாயகர்',
          text: 'ஓம் ஏகதந்தாய வித்மஹே வக்ரதுண்டாய தீமஹி தன்னோ தந்தி: ப்ரசோதயாத்॥',
          benefits: ['விக்னம் நீக்கம்', 'புத்தி கூர்மை', 'வேலை வெற்றி', 'மங்கல காரியம்']
        },
        {
          id: 'shiva',
          name: 'சிவ காயத்ரி',
          deity: 'சிவபெருமான்',
          text: 'ஓம் தத்புருஷாய வித்மஹே மஹாதேவாய தீமஹி தன்னோ ருத்ர: ப்ரசோதயாத்॥',
          benefits: ['மன அமைதி', 'ஆன்மீக உயர்வு', 'எதிர்மறை சக்தி அகற்றல்', 'மோக்ஷம்']
        },
        {
          id: 'vishnu',
          name: 'விஷ்ணு காயத்ரி',
          deity: 'விஷ்ணு',
          text: 'ஓம் நாராயணாய வித்மஹே வாசுதேவாய தீமஹி தன்னோ விஷ்ணு: ப்ரசோதயாத்॥',
          benefits: ['பாதுகாப்பு', 'சமாதானம்', 'ஐஸ்வர்யம்', 'பக்தி வளர்ச்சி']
        }
        // Add more deity mantras here...
      ]
    },
    {
      id: 'nakshatras',
      name: '27 நக்ஷத்திர காயத்ரி',
      icon: '⭐',
      color: 'success',
      mantras: [
        {
          id: 'ashwini',
          name: 'அஸ்வினி காயத்ரி',
          deity: 'அஸ்வினி தேவர்கள்',
          text: 'ஓம் அஸ்வினி குமாராய வித்மஹே சத்வ புருஷாய தீமஹி தன்னோ அஸ்வினி: ப்ரசோதயாத்॥',
          benefits: ['விரைவான சிகிச்சை', 'மருத்துவ திறன்', 'ஆரோக்யம்', 'உதவி செய்யும் மனப்பான்மை']
        },
        {
          id: 'bharani',
          name: 'பரணி காயத்ரி',
          deity: 'யமன்',
          text: 'ஓம் யமராஜாய வித்மஹே மருத்யு தேவாய தீமஹி தன்னோ பரணி: ப்ரசோதயாத்॥',
          benefits: ['நீதி நெறி', 'கடமை உணர்வு', 'வளர்ச்சி', 'பொறுப்புணர்வு']
        }
        // Add remaining 25 nakshatra mantras...
      ]
    },
    {
      id: 'beeja',
      name: 'பீஜ மந்திரங்கள்',
      icon: '🌱',
      color: 'warning',
      mantras: [
        {
          id: 'om',
          name: 'ஓம் காயத்ரி',
          deity: 'பிரணவம்',
          text: 'ஓம் ஓங்காராய வித்மஹே ப்ரணவாய தீமஹி தன்னோ ஓம்: ப்ரசோதயாத்॥',
          benefits: ['ஆன்மீக சக்தி', 'மன ஒருமுகம்', 'பிரணவ சக்தி', 'உலக நன்மை']
        }
        // Add more beeja mantras...
      ]
    }
  ];
  
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
  selectedGayathriCategory: any = null;
  favoriteGayathriIds: string[] = [];

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
        (m.tamil && m.tamil.includes(this.searchTerm)) ||
        (m.sanskrit && m.sanskrit.includes(this.searchTerm)) ||
        (m.text && m.text.includes(this.searchTerm))
      );
    }
    this.filteredMantras = filtered;
  }

  searchMantras() {
    this.filterMantras();
  }

  openMantraDetail(mantra: any) {
    this.selectedMantra = mantra;
    this.detailModal.present();
  }

  closeMantraDetail() {
    this.selectedMantra = null;
    this.detailModal.dismiss();
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

  shareMantra(mantra: any) {
    const shareText = `${mantra.name}\n\n${mantra.text}\n\nபலன்கள்:\n${mantra.benefits ? mantra.benefits.join('\n') : ''}`;
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

  trackByMantraId(index: number, mantra: any): string {
    return mantra.id;
  }

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    this.presentToast(this.isBookmarked ? 'புத்தகக்குறி சேர்க்கப்பட்டது' : 'புத்தகக்குறி நீக்கப்பட்டது');
  }

  // New Gayathri-specific methods
  selectGayathriCategory(category: any) {
    this.selectedGayathriCategory = category;
  }

  copyMantra(mantra: any) {
    const text = `${mantra.name}\n\n${mantra.text || mantra.tamil}\n\nபலன்கள்:\n${mantra.benefits.join('\n')}`;
    navigator.clipboard.writeText(text).then(() => {
      this.presentToast('மந்திரம் நகலெடுக்கப்பட்டது');
    });
  }

  toggleFavoriteMantra(mantra: any) {
    const index = this.favoriteGayathriIds.indexOf(mantra.id);
    if (index > -1) {
      this.favoriteGayathriIds.splice(index, 1);
      this.presentToast('விருப்பங்களிலிருந்து நீக்கப்பட்டது');
    } else {
      this.favoriteGayathriIds.push(mantra.id);
      this.presentToast('விருப்பங்களில் சேர்க்கப்பட்டது');
    }
    localStorage.setItem('favoriteGayathriIds', JSON.stringify(this.favoriteGayathriIds));
  }

  isFavoriteMantra(mantra: any): boolean {
    return this.favoriteGayathriIds.includes(mantra.id);
  }
}
