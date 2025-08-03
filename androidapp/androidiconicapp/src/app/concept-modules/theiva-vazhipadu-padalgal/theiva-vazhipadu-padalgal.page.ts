import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, AlertController, IonModal } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Padal {
  id: string;
  name: string;
  deity: string;
  text?: string;
  meaning?: string;
  benefits: string[];
  howToSing?: string;
  bestTime?: string;
  duration?: string;
  author?: string;
  verses?: number;
  webLink?: string;
  videoLink?: string;
  specialFeatures?: string[];
  individualSongs?: Padal[];
}

interface PadalCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  mantras: Padal[];
}

@Component({
  selector: 'app-theiva-vazhipadu-padalgal',
  templateUrl: './theiva-vazhipadu-padalgal.page.html',
  styleUrls: ['./theiva-vazhipadu-padalgal.page.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ height: '0px', opacity: 0, overflow: 'hidden' }),
        animate('300ms ease-in-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ height: '0px', opacity: 0, overflow: 'hidden' }))
      ])
    ])
  ]
})
export class TheivaValzipaduPadalgalPage implements OnInit {

  @ViewChild('detailModal', { static: true }) detailModal!: IonModal;
  @ViewChild('previewModal', { static: true }) previewModal!: IonModal;

  selectedSegment = 'categories';
  selectedCategory = '';
  selectedPadal: Padal | null = null;
  selectedPadalForPreview: any = null;
  searchTerm = '';
  isPlaying = false;
  currentAudio: HTMLAudioElement | null = null;
  favoritePadalIds: string[] = [];
  isBookmarked = false;
  
  // Additional properties for padal categories
  selectedPadalCategory: any = null;
  expandedCategories: { [key: string]: boolean } = {};
  favoritePadalCategoryIds: string[] = [];
  
  // Divine Worship Songs Structure
  padalCategories: PadalCategory[] = [
    {
      id: 'vinayagar',
      name: 'விநாயகர் பாடல்கள்',
      icon: '🐘',
      color: 'primary',
      mantras: [
        {
          id: 'vinayagar_agaval',
          name: 'விநாயகர் அகவல்',
          deity: 'விநாயகர்',
          text: 'வாழ்க அந்தணர் வாழ்க கோவிந்தன் வாழ்க\nவேதம் நான்கினும் மெய்ப்பொருள் வாழ்க\nவாழ்க அன்பர் அவர்தம் நாமம் வாழ்க\nவாழ்க இன்பமொடு பிரமம் வாழ்க\nஞாழல் மாலையில் நண்ணிய காதல்\nஞாலம் ஏழையும் நன்னெறி வாழ்க',
          benefits: ['விக்னங்கள் நீங்கும்', 'ஞான வளர்ச்சி', 'புத்தி கூர்மை', 'சகல காரியங்களும் வெற்றி'],
          author: 'அவ்வையார்',
          verses: 72,
          howToSing: 'பக்தியுடன் தெளிவான உச்சரிப்புடன்',
          bestTime: 'விநாயக சதுர்த்தி, புதன்கிழமை',
          duration: '30-45 நிமிடங்கள்'
        }
      ]
    },
    {
      id: 'murugan',
      name: 'முருகன் பாடல்கள்',
      icon: '🦚',
      color: 'secondary',
      mantras: [
        {
          id: 'sakalakala_valli_malai',
          name: 'சகலகலாவல்லி மாலை',
          deity: 'முருகன்',
          text: 'சகலகலாவல்லி தனையடைந்து\nசங்கரநின் புதல்வன் பதம்பணிந்து\nசுகமுறு நாளெல்லாம் துன்பகலந்து\nசுந்தரவல்லிக்கு மணாளனே\nஅகிலாண்ட கோடி பிரபஞ்சனே\nஅருமுகம் ஆறுடை யப்பனே',
          benefits: ['கல்வி சிறப்பு', 'கலை வளர்ச்சி', 'பிள்ளைகள் நலம்', 'வல்லி தேவசேனாபதி அருள்'],
          author: 'குமரகுருபரர்',
          verses: 100,
          howToSing: 'மெல்லிய இசையுடன் பக்தியுடன்',
          bestTime: 'கார்த்திகை மாதம், செவ்வாய்கிழமை',
          duration: '1-1.5 மணி நேரம்'
        },
        {
          id: 'sasti_kavasam',
          name: 'சஷ்டி கவசம்',
          deity: 'முருகன்',
          text: 'ஆதி அந்தம் இல்லாத ஆனந்த வல்லியே\nஆதிசக்தி ஆனந்தம் ஆறுமுக வல்லியே\nபாதமலர் சூடுகின்ற பாரத வல்லியே\nபால முகங்கள் ஆறுடைய பண்பு வல்லியே\nவேதம் புகழும் விமல வல்லியே\nமேலோர் அனைவரும் வணங்கும் வல்லியே',
          benefits: ['பயம் நீக்கம்', 'ஆபத்து நிவாரணம்', 'சத்ரு சங்காரம்', 'முருகன் பாதுகாப்பு'],
          author: 'தேவராய சுவாமிகள்',
          verses: 244,
          howToSing: 'வீரமான குரலில் பக்தியுடன்',
          bestTime: 'செவ்வாய், வெள்ளிக்கிழமை',
          duration: '45-60 நிமிடங்கள்'
        }
      ]
    },
    {
      id: 'shiva',
      name: 'சிவன் பாடல்கள்',
      icon: '🕉️',
      color: 'tertiary',
      mantras: [
        {
          id: 'thiruvasagam',
          name: 'திருவாசகம் (சிறப்பு பாடல்கள்)',
          deity: 'சிவபெருமான்',
          text: 'அடியேன் உணர்வு கெட்டி பொய்ம்மை செய்தால்\nஅடியேனைக் கொல்க அரன் என்கோ\nபடியேறும் உம்பர் பலர் தொழுது ஏத்த\nபண்ணின் இசை ஞானம் பகர்ந்தோனே\nதடமேனி நீறணி சென்னியனே\nதனிமூர்த்தி என்றன் தயாநிதியே',
          benefits: ['ஆன்மீக விமோசனம்', 'சிவ கடாக்ஷம்', 'பாவ விமோசனம்', 'மன சுத்தி'],
          author: 'மாணிக்கவாசகர்',
          verses: 658,
          howToSing: 'ஆத்ம பக்தியுடன் மனதார',
          bestTime: 'சிவராத்திரி, திங்கட்கிழமை',
          duration: '2-3 மணி நேரம்'
        }
      ]
    },
    {
      id: 'amman',
      name: 'அம்மன் பாடல்கள்',
      icon: '🪔',
      color: 'danger',
      mantras: [
        {
          id: 'lalitha_sahasranamam',
          name: 'லலிதா சஹஸ்ர நாமம் (தமிழ்)',
          deity: 'லலிதா அம்பிகை',
          text: 'ஶ்ரீமாதா ஶ்ரீமஹாராஜ்ஞீ ஶ்ரீமத்சிம்ஹாஸனேஶ்வரீ\nசித்ராக்ரணி சக்தி சக்திமத்ப்ரியா\nசித்ராகண நாதசக்தி சத்ருப்பா ஸமக்னித்யா\nசித்ராநந்த லஹரீ சாமக நவ ரூபிணீ',
          benefits: ['சர்வ ஐஸ்வர்யம்', 'அம்பிகை அருள்', 'சௌந்தர்ய வர்த்தனை', 'சகல சித்திகள்'],
          author: 'அகஸ்தியர்',
          verses: 1000,
          howToSing: 'சந்தோஷமான மனதுடன் மெதுவாக',
          bestTime: 'வெள்ளிக்கிழமை, நவராத்திரி',
          duration: '1.5-2 மணி நேரம்',
          webLink: 'https://aanmeegam.co.in/blogs/lyrics/lalitha-sahasranamam-lyrics-tamil/',
          videoLink: 'https://youtu.be/DtSBLpQStT4'
        },
        {
          id: 'abhirami_anthathi',
          name: 'அபிராமி அந்தாதி',
          deity: 'அபிராமி அம்பிகை',
          text: 'தார் அமர் கொன்றையும் சங்கரன் செண்டு அலகும் மடந்தையர் பங்கன் மலர்ந்து அருள் கூர்ந்து\nநார் அயல் வேணியும் நாகமும் ஆடையும் பூண் அணி மார்பினில் போல வளர்ந்து\nபார் உயர் கொங்கையும் பாம்பணை மேகலையும் சுரும்பு அலி கேசரையும் வியக்கும்\nகார் உயர் மேனியும் கண் இமை போலவே நம் அபிராமி கவின் திருமேனியே',
          meaning: 'அபிராமி அம்பிகையின் திருமேனியழகு மற்றும் அருளாசியைப் போற்றும் அற்புதமான நூல். அபிராமித்தபதர் என்னும் சுப்பிரமணிய பாரதியாரால் இயற்றப்பட்ட 100 பாடல்களின் அந்தாதி.',
          benefits: [
            'அம்பிகை அருள் பெறுதல்',
            'அழகு வளர்ச்சி',
            'திருமணத் தடைகள் நீங்குதல்',
            'குலதெய்வ அருள்',
            'ஞான வளர்ச்சி',
            'மன அமைதி',
            'பராசக்தி அனுபவம்',
            'வேத ஞானம்',
            'ஆன்மீக விமோசனம்',
            'சர்வ சௌபாக்கியம்'
          ],
          author: 'அபிராமித்தபதர் (சுப்பிரமணிய பாரதியார்)',
          verses: 100,
          howToSing: 'பக்தியுடன் மெதுவாக ஒவ்வொரு பாடலாக சொல்லவும். அம்பிகையின் திருவுருவத்தை மனதில் நினைத்துக் கொண்டு பாடவும்.',
          bestTime: 'வெள்ளிக்கிழமை, அமாவாசை, பௌர்ணமி, நவராத்திரி காலங்கள்',
          duration: '45-60 நிமிடங்கள்',
          webLink: 'https://ta.wikisource.org/wiki/அபிராமி_அந்தாதி',
          videoLink: 'https://youtu.be/AbhiramiAnthathi',
          specialFeatures: [
            'ஒவ்வொரு பாடலும் அந்தாதி பாணியில் அமைந்துள்ளது',
            'அம்பிகையின் வெவ்வேறு ரூபங்களை வர்ணிக்கிறது',
            'தமிழ் இலக்கியத்தின் சிறந்த படைப்புகளில் ஒன்று',
            'ஆன்மீக ஞானம் மற்றும் பக்தி உணர்வை வளர்க்கிறது'
          ]
        }
      ]
    },
    {
      id: 'vishnu',
      name: 'விஷ்ணு பாடல்கள்',
      icon: '🐚',
      color: 'success',
      mantras: [
        {
          id: 'vishnu_sahasranamam',
          name: 'விஷ்ணு சஹஸ்ர நாமம்',
          deity: 'விஷ்ணு',
          text: 'விஶ்வம் விஷ்ணுர்வஷட்காரோ பூத பவ்ய பவத் ப்ரபு:\nபூதகृத் பூதபூர்த் பாவோ பூதாத்மா பூதபாவன:\nபூர்ணகாமோ அகாமஹா காம கோடீ பிருப் பிருது:\nவர தோ வருத ஈசோ வருண ஓ மாருத ஓமருத:',
          benefits: ['விஷ்ணு அனுக்ரஹம்', 'லோக கல்யாணம்', 'பாப நாசம்', 'மோக்ஷ பிராப்தி'],
          author: 'வேத வியாசர்',
          verses: 1000,
          howToSing: 'ஓம் உச்சரிப்புடன் சாந்தமாக',
          bestTime: 'ஏகாதசி, வியாழக்கிழமை',
          duration: '1-1.5 மணி நேரம்'
        }
      ]
    },
    {
      id: 'hanuman',
      name: 'ஹனுமான் பாடல்கள்',
      icon: '🐒',
      color: 'warning',
      mantras: [
        {
          id: 'hanuman_chalisa_tamil',
          name: 'ஹனுமான் சாலீசா (தமிழ்)',
          deity: 'ஹனுமான்',
          text: 'ஜெய் ஹனுமான் ஞான குண சாகர்\nஜெய் கபீச திகுண் லோக உஜாகர்\nராம தூத் அதுலித் பல் தாமா\nஅஞ்ஜனி புத்ர பவன் சுத் நாமா',
          benefits: ['பயம் நீக்கம்', 'பல சேர்க்கை', 'பக்தி வளர்ச்சி', 'ஆபத்து நிவாரணம்'],
          author: 'துளசிதாஸ்',
          verses: 40,
          howToSing: 'உற்சாகமான குரலில்',
          bestTime: 'செவ்வாய், சனிக்கிழமை',
          duration: '15-20 நிமிடங்கள்'
        }
      ]
    }
  ];

  filteredPadals: Padal[] = [];


  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadFavorites();
    this.loadFavoritePadals();
    this.loadAbhiramiAnthathiSongs();
  }

  loadAbhiramiAnthathiSongs() {
    this.http.get<any[]>('assets/data/abhirami-anthanthi.json').subscribe(songs => {
      const ammanCategory = this.padalCategories.find(cat => cat.id === 'amman');
      if (ammanCategory) {
        const abhiramiIndex = ammanCategory.mantras.findIndex(m => m.id === 'abhirami_anthathi');
        
        if (abhiramiIndex !== -1) {
          // Add individual songs as sub-items
          ammanCategory.mantras[abhiramiIndex].individualSongs = songs.map(song => ({
            id: `abhirami_${song.id}`,
            name: song.name,
            deity: 'அபிராமி',
            text: song.text,
            meaning: song.meaning,
            benefits: song.benefits || ['அம்பிகை அருள்', 'பாதுகாப்பு', 'பக்தி', 'மோக்ஷம்'],
            author: 'அபிராமித்தபதர்',
            verses: 1,
            howToSing: 'பக்தியுடன் மெதுவாக',
            bestTime: 'வெள்ளிக்கிழமை',
            duration: '2-3 நிமிடங்கள்'
          }));
        }
      }
    });
  }

  loadFavorites() {
    const stored = localStorage.getItem('favoritePadalIds');
    if (stored) {
      this.favoritePadalIds = JSON.parse(stored);
    }
  }

  loadFavoritePadals() {
    const stored = localStorage.getItem('favoritePadalCategoryIds');
    if (stored) {
      this.favoritePadalCategoryIds = JSON.parse(stored);
    }
  }

  saveFavorites() {
    localStorage.setItem('favoritePadalIds', JSON.stringify(this.favoritePadalIds));
  }

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
    if (this.selectedSegment === 'categories') {
      this.selectedCategory = '';
    }
  }

  searchPadals() {
    // Filter songs based on search term
    if (this.searchTerm.trim()) {
      const searchTerm = this.searchTerm.toLowerCase().trim();
      // You can implement search logic here if needed
      // For now, just keeping it simple since we use expandable categories
    }
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.selectedSegment = 'padals';
  }

  openPadalDetail(padal: any) {
    this.selectedPadal = padal;
    this.previewModal.dismiss(); // Close preview modal if open
    this.detailModal.present();
  }

  closePadalDetail() {
    this.selectedPadal = null;
    this.detailModal.dismiss();
    this.stopAudio();
  }

  openPadalPreview(padal: any) {
    this.selectedPadalForPreview = padal;
    this.previewModal.present();
  }

  closePadalPreview() {
    this.selectedPadalForPreview = null;
    this.previewModal.dismiss();
  }

  toggleFavorite(padal: Padal) {
    const index = this.favoritePadalIds.indexOf(padal.id);
    if (index > -1) {
      this.favoritePadalIds.splice(index, 1);
      this.presentToast(padal.name + ' விருப்பங்களிலிருந்து நீக்கப்பட்டது');
    } else {
      this.favoritePadalIds.push(padal.id);
      this.presentToast(padal.name + ' விருப்பங்களில் சேர்க்கப்பட்டது');
    }
    this.saveFavorites();
  }

  isFavorite(padal: Padal): boolean {
    return this.favoritePadalIds.includes(padal.id);
  }

  playAudio(padal: Padal) {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
    // Audio implementation would go here
    this.isPlaying = true;
  }

  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
      this.isPlaying = false;
    }
  }

  sharePadal(padal: any) {
    const shareText = `${padal.name}\n\n${padal.text}\n\nபலன்கள்:\n${padal.benefits ? padal.benefits.join('\n') : ''}`;
    if (navigator.share) {
      navigator.share({
        title: padal.name,
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        this.presentToast('பாடல் கிளிப்போர்டில் நகலெடுக்கப்பட்டது');
      });
    }
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

  async showFullBenefits(padal: Padal) {
    const alert = await this.alertController.create({
      header: padal.name + ' - பலன்கள்',
      message: padal.benefits.map((benefit, index) => (index + 1) + '. ' + benefit).join('<br>'),
      buttons: ['சரி']
    });
    await alert.present();
  }

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    this.presentToast(this.isBookmarked ? 'புத்தகக்குறி சேர்க்கப்பட்டது' : 'புத்தகக்குறி நீக்கப்பட்டது');
  }

  // Padal-specific methods
  selectPadalCategory(category: any) {
    this.selectedPadalCategory = category;
  }

  toggleCategory(categoryId: string) {
    this.expandedCategories[categoryId] = !this.expandedCategories[categoryId];
  }

  copyPadal(padal: any) {
    const text = `${padal.name}\n\n${padal.text}\n\nபலன்கள்:\n${padal.benefits.join('\n')}`;
    navigator.clipboard.writeText(text).then(() => {
      this.presentToast('பாடல் நகலெடுக்கப்பட்டது');
    });
  }

  toggleFavoritePadal(padal: any) {
    const index = this.favoritePadalCategoryIds.indexOf(padal.id);
    if (index > -1) {
      this.favoritePadalCategoryIds.splice(index, 1);
      this.presentToast('விருப்பங்களிலிருந்து நீக்கப்பட்டது');
    } else {
      this.favoritePadalCategoryIds.push(padal.id);
      this.presentToast('விருப்பங்களில் சேர்க்கப்பட்டது');
    }
    localStorage.setItem('favoritePadalCategoryIds', JSON.stringify(this.favoritePadalCategoryIds));
  }

  isFavoritePadal(padal: any): boolean {
    return this.favoritePadalCategoryIds.includes(padal.id);
  }

  trackByPadalId(index: number, padal: any): string {
    return padal.id;
  }

  openWebLink(padal: any) {
    if (padal.webLink) {
      window.open(padal.webLink, '_blank');
    }
  }

  openVideoLink(padal: any) {
    if (padal.videoLink) {
      window.open(padal.videoLink, '_blank');
    }
  }

  viewSongDetail(song: Padal) {
    this.selectedPadal = song;
  }

  async viewAllAbhiramiSongs() {
    const alert = await this.alertController.create({
      header: 'அபிராமி அந்தாதி - முழு தொகுப்பு',
      message: 'இது 100 பாடல்களின் முழுமையான தொகுப்பு. ஒவ்வொரு பாடலும் அம்பிகையின் வெவ்வேறு அம்சங்களை விவரிக்கிறது. முழு பாடல்களையும் காண விரும்புகிறீர்களா?',
      buttons: [
        {
          text: 'இல்லை',
          role: 'cancel'
        },
        {
          text: 'ஆம்',
          handler: () => {
            this.showAllAbhiramiSongs();
          }
        }
      ]
    });
    await alert.present();
  }

  async showAllAbhiramiSongs() {
    const ammanCategory = this.padalCategories.find(cat => cat.id === 'amman');
    const abhiramiPadal = ammanCategory?.mantras.find(m => m.id === 'abhirami_anthathi');
    
    if (abhiramiPadal?.individualSongs) {
      let songsHtml = '<div class="all-songs-container">';
      abhiramiPadal.individualSongs.forEach((song, index) => {
        songsHtml += `
          <div class="song-item">
            <h4>பாடல் ${index + 1}: ${song.name}</h4>
            <p class="song-text">${song.text}</p>
            ${song.meaning ? `<p class="song-meaning"><strong>பொருள்:</strong> ${song.meaning}</p>` : ''}
            <div class="song-benefits">
              <strong>பலன்கள்:</strong> ${song.benefits.join(', ')}
            </div>
            <hr>
          </div>
        `;
      });
      songsHtml += '</div>';

      const alert = await this.alertController.create({
        header: 'அபிராமி அந்தாதி - அனைத்து பாடல்கள்',
        message: songsHtml,
        cssClass: 'custom-alert-large',
        buttons: [
          {
            text: 'நகல் எடு',
            handler: () => {
              const fullText = abhiramiPadal.individualSongs?.map((song, i) => 
                `பாடல் ${i + 1}: ${song.name}\n${song.text}\n${song.meaning ? 'பொருள்: ' + song.meaning + '\n' : ''}பலன்கள்: ${song.benefits.join(', ')}\n\n`
              ).join('');
              navigator.clipboard.writeText(fullText || '').then(() => {
                this.presentToast('அனைத்து பாடல்களும் நகலெடுக்கப்பட்டது');
              });
            }
          },
          {
            text: 'மூடு',
            role: 'cancel'
          }
        ]
      });
      await alert.present();
    }
  }
}
