import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, AlertController, IonModal } from '@ionic/angular';

interface Topic {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  duration: string;
  difficulty: string;
  keyPoints: string[];
  content: string;
  benefits: string[];
  applications?: string[];
  isStudied?: boolean;
}

@Component({
  selector: 'app-adipadai-astrology',
  templateUrl: './adipadai-astrology.page.html',
  styleUrls: ['./adipadai-astrology.page.scss'],
})
export class AdipadaiAstrologyPage implements OnInit {

  @ViewChild('detailModal', { static: true }) detailModal!: IonModal;

  selectedTopic: Topic | null = null;
  searchTerm = '';
  isBookmarked = false;
  favoriteTopicIds: string[] = [];
  studiedTopicIds: string[] = [];
  presentingElement: any = null;

  topics: Topic[] = [
    {
      id: 'saram_serum_upayam',
      title: 'சரம் சீரம் உபாயம்',
      description: 'ஜோதிடத்தில் சரம் மற்றும் சீரம் கணக்கீடுகள் மற்றும் அதன் பரிகார முறைகள்',
      category: 'அடிப்படை கணக்கீடு',
      icon: 'calculator-outline',
      color: '#3880ff',
      duration: '25 நிமிடங்கள்',
      difficulty: 'ஆரம்பம்',
      keyPoints: [
        'சரம் மற்றும் சீரம் என்றால் என்ன?',
        'கணக்கீடு முறைகள்',
        'பரிகார உபாயங்கள்',
        'நடைமுறை பயன்பாடுகள்'
      ],
      content: `
        <p><strong>சரம் சீரம்</strong> என்பது ஜோதிட சாஸ்திரத்தில் மிக முக்கியமான அடிப்படை கணக்கீடு ஆகும்.</p>
        
        <p><strong>சரம் (Sara):</strong> இது ஒரு நபரின் வாழ்க்கையில் சுபமான கிரக நிலைகளைக் குறிக்கிறது. இது நேர்மறையான ஆற்றல்களைக் கொடுக்கும்.</p>
        
        <p><strong>சீரம் (Seeram):</strong> இது துன்பங்கள் மற்றும் சவால்களைக் குறிக்கிறது. இது எதிர்மறை ஆற்றல்களை உருவாக்குகிறது.</p>
        
        <p>இவை இரண்டும் சமநிலையில் இருந்தால் வாழ்க்கை சுமுகமாக நடக்கும். ஏற்றத்தாழ்வு இருந்தால் பரிகாரங்கள் செய்ய வேண்டும்.</p>
      `,
      benefits: [
        'வாழ்க்கையில் சமநிலை',
        'கிரக தோஷங்கள் நீக்கம்',
        'நல்ல ஆரோக்கியம்',
        'மன அமைதி'
      ],
      applications: [
        'ஜாதக பரிசீலனையில் பயன்படுத்தலாம்',
        'சுபமுகூர்த்த தேர்வில் உதவுகிறது',
        'பரிகார உபாயங்கள் தேர்வில் வழிகாட்டும்'
      ]
    },
    {
      id: 'thiraikanam_rasi',
      title: 'திரைகணம் - தர்ம, அர்த்த, காம, மோக்ஷ ராசி',
      description: 'நான்கு வகை ராசிகளின் வகைப்பாடு மற்றும் அவற்றின் தாக்கங்கள்',
      category: 'ராசி வகைப்பாடு',
      icon: 'albums-outline',
      color: '#10dc60',
      duration: '30 நிமிடங்கள்',
      difficulty: 'நடுத்தர',
      keyPoints: [
        'தர்ம ராசிகள் - மேஷம், சிம்மம், தனுசு',
        'அர்த்த ராசிகள் - ரிஷபம், கன்னி, மகரம்',
        'காம ராசிகள் - மித்துனம், துலாம், கும்பம்',
        'மோக்ஷ ராசிகள் - கடகம், விருச்சிகம், மீனம்'
      ],
      content: `
        <p><strong>திரைகணம்</strong> என்பது 12 ராசிகளை நான்கு முக்கிய வகைகளாகப் பிரிக்கும் முறையாகும்.</p>
        
        <p><strong>தர்ม ராசிகள் (மேஷம், சிம்மம், தனுசு):</strong><br>
        இவை நீதி, ஆன்மீகம், கல்வி, ஆசிரியத் தொழில் ஆகியவற்றைக் குறிக்கும். இந்த ராசியில் பிறந்தவர்கள் நேர்மையானவர்களாக இருப்பார்கள்.</p>
        
        <p><strong>அர்த்த ராசிகள் (ரிஷபம், கன்னி, மகரம்):</strong><br>
        இவை பொருளாதாரம், வியாபாரம், செல்வம் ஆகியவற்றைக் குறிக்கும். பணம் சம்பாதிப்பதில் திறமையானவர்களாக இருப்பார்கள்.</p>
        
        <p><strong>காம ராசிகள் (மித்துனம், துலாம், கும்பம்):</strong><br>
        இவை காதல், திருமணம், இன்பம் ஆகியவற்றைக் குறிக்கும். சமூக உறவுகளில் சிறந்தவர்களாக இருப்பார்கள்.</p>
        
        <p><strong>மோக்ஷ ராசிகள் (கடகம், விருச்சிகம், மீனம்):</strong><br>
        இவை முக்தி, ஆன்மீக முன்னேற்றம், தியானம் ஆகியவற்றைக் குறிக்கும். ஆன்மீக விஷயங்களில் ஆர்வம் இருக்கும்.</p>
      `,
      benefits: [
        'தொழில் தேர்வில் வழிகாட்டுதல்',
        'வாழ்க்கை இலக்கு நிர்ணயம்',
        'ஆன்மீக முன்னேற்றம்',
        'பொருத்தமான துறை தேர்வு'
      ],
      applications: [
        'தொழில் ஆலோசனையில் பயன்படும்',
        'திருமண பொருத்தம் பார்க்கலாம்',
        'கல்வித் துறை தேர்வில் உதவும்'
      ]
    },
    {
      id: 'kiragham_relation',
      title: 'கிரக உறவுகள் மற்றும் வரலாறு',
      description: 'கிரகங்களுக்கிடையேயான நட்பு, பகை உறவுகள் மற்றும் அவற்றின் புராண வரலாறு',
      category: 'கிரக ஞானம்',
      icon: 'planet-outline',
      color: '#f04141',
      duration: '35 நிமிடங்கள்',
      difficulty: 'நடுத்தர',
      keyPoints: [
        'கிரக நட்பு உறவுகள்',
        'கிரக பகை உறவுகள்',
        'புராண வரலாறுகள்',
        'நடைமுறை தாக்கங்கள்'
      ],
      content: `
        <p><strong>கிரக உறவுகள்</strong> ஜோதிடத்தில் மிக முக்கியமான அம்சமாகும். ஒவ்வொரு கிரகத்திற்கும் நண்பன், பகைவன், சம பாவனை கிரகங்கள் உள்ளன.</p>
        
        <p><strong>சூரியனின் உறவுகள்:</strong><br>
        நண்பர்கள்: சந்திரன், செவ்வாய், குரு<br>
        பகைவர்கள்: சுக்ரன், சனி<br>
        சமம்: புதன்</p>
        
        <p><strong>சந்திரனின் உறவுகள்:</strong><br>
        நண்பர்கள்: சூரியன், புதன்<br>
        பகைவர்கள்: இல்லை<br>
        சமம்: மற்ற அனைத்து கிரகங்களும்</p>
        
        <p>இந்த உறவுகளின் அடிப்படையில் கிரகங்கள் ஜாதகத்தில் நல்ல அல்லது கெட்ட பலன்களைக் கொடுக்கும்.</p>
      `,
      benefits: [
        'கிரக பலன்கள் சரியாக கணிக்கலாம்',
        'பரிகார முறைகள் தேர்வு செய்யலாம்',
        'ஜாதக பலன் சொல்லும் திறன் மேம்படும்'
      ],
      applications: [
        'ஜாதக ஆய்வில் பயன்படுத்தலாம்',
        'கிரக தசா பலன்கள் கணிக்கலாம்',
        'ரத்ன சிபாரிசுகளில் உதவும்'
      ]
    },
    {
      id: 'thisaigal',
      title: 'திசைகள் மற்றும் அவற்றின் முக்கியத்துவம்',
      description: 'எட்டு திசைகள், அவற்றின் அதிபதி கிரகங்கள் மற்றும் வாஸ்து சாஸ்திர தொடர்பு',
      category: 'திசை ஞானம்',
      icon: 'compass-outline',
      color: '#ffc409',
      duration: '25 நிமிடங்கள்',
      difficulty: 'ஆரம்பம்',
      keyPoints: [
        'எட்டு திசைகளின் பெயர்கள்',
        'ஒவ்வொரு திசையின் அதிபதி கிரகம்',
        'வாஸ்து சாஸ்திர தொடர்பு',
        'நடைமுறை பயன்பாடுகள்'
      ],
      content: `
        <p><strong>திசைகள்</strong> ஜோதிட மற்றும் வாஸ்து சாஸ்திரத்தில் முக்கிய பங்கு வகிக்கின்றன.</p>
        
        <p><strong>எட்டு திசைகள் மற்றும் அதிபதிகள்:</strong></p>
        <ul>
          <li><strong>கிழக்கு (பூர்வம்):</strong> சூரியன்</li>
          <li><strong>தென்கிழக்கு (ஆக்னேயம்):</strong> சுக்ரன்</li>
          <li><strong>தெற்கு (தக்ஷிணம்):</strong> செவ்வாய்</li>
          <li><strong>தென்மேற்கு (நைருதி):</strong> ராகு</li>
          <li><strong>மேற்கு (பச்சிமம்):</strong> சனி</li>
          <li><strong>வடமேற்கு (வாயுவ்யம்):</strong> சந்திரன்</li>
          <li><strong>வடக்கு (உத்தரம்):</strong> புதன்</li>
          <li><strong>வடகிழக்கு (ஈசான்யம்):</strong> குரु</li>
        </ul>
        
        <p>இந்த திசை அறிவு வீடு கட்டுதல், அலுவலக அமைப்பு, வழிபாட்டு அறை அமைப்பு ஆகியவற்றில் பயன்படுகிறது.</p>
      `,
      benefits: [
        'வாஸ்து சாஸ்திர அறிவு',
        'வீடு கட்டும்போது உதவும்',
        'நல்ல ஆரோக்கியம்',
        'செல்வ வளம்'
      ],
      applications: [
        'வீடு, கடை, அலுவலக அமைப்பில் பயன்படும்',
        'முகூர்த்த நிர்ணயத்தில் உதவும்',
        'பயண திசை தேர்வில் வழிकாட்டும்'
      ]
    },
    {
      id: 'kiraga_utham',
      title: 'கிரக உச்சம் மற்றும் நீசம்',
      description: 'கிரகங்களின் உச்ச ராசி, நீச ராசி மற்றும் அவற்றின் பலன்கள்',
      category: 'கிரக நிலைகள்',
      icon: 'trending-up-outline',
      color: '#7044ff',
      duration: '30 நிமிடங்கள்',
      difficulty: 'நடுத்தர',
      keyPoints: [
        'ஒவ்வொரு கிரகத்தின் உச்ச ராசி',
        'ஒவ்வொரு கிரகத்தின் நீச ராசி',
        'உச்ச பலன்கள்',
        'நீச பலன்கள் மற்றும் பரிகாரங்கள்'
      ],
      content: `
        <p><strong>கிரக உச்சம் மற்றும் நீசம்</strong> ஜாதக பலன் கணிப்பில் மிக முக்கியமான அம்சம்.</p>
        
        <p><strong>கிரகங்களின் உச்ச ராசிகள்:</strong></p>
        <ul>
          <li><strong>சூரியன்:</strong> மேஷம் (10°)</li>
          <li><strong>சந்திரன்:</strong> ரிஷபம் (3°)</li>
          <li><strong>செவ்வாய்:</strong> மகரம் (28°)</li>
          <li><strong>புதன்:</strong> கன்னி (15°)</li>
          <li><strong>குரு:</strong> கடகம் (5°)</li>
          <li><strong>சுக்ரன்:</strong> மீனம் (27°)</li>
          <li><strong>சனி:</strong> துலாம் (20°)</li>
        </ul>
        
        <p><strong>கிரகங்களின் நீச ராசிகள்:</strong></p>
        <ul>
          <li><strong>சூரியன்:</strong> துலாம் (10°)</li>
          <li><strong>சந்திரன்:</strong> விருச்சிகம் (3°)</li>
          <li><strong>செவ்வாய்:</strong> கடகம் (28°)</li>
          <li><strong>புதன்:</strong> மீனம் (15°)</li>
          <li><strong>குரு:</strong> மகரம் (5°)</li>
          <li><strong>சுக்ரன்:</strong> கன்னி (27°)</li>
          <li><strong>சனி:</strong> மேஷம் (20°)</li>
        </ul>
      `,
      benefits: [
        'கிரக பலம் சரியாக மதிப்பிடலாம்',
        'உச்ச கிரக பலன்கள் பெறலாம்',
        'நீச கிரக பரிகாரங்கள் செய்யலாம்',
        'ஜாதக பலன் துல்லியமாக கணிக்கலாம்'
      ],
      applications: [
        'ஜாதக ஆய்வில் கிரக பலம் கணிக்கலாம்',
        'முகூர்த்த தேர்வில் பயன்படுத்தலாம்',
        'பரிகார முறைகள் தேர்வு செய்யலாம்'
      ]
    }
  ];

  filteredTopics: Topic[] = [];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.filteredTopics = this.topics;
    this.loadFavorites();
    this.loadStudiedTopics();
    this.presentingElement = document.querySelector('.ion-page');
  }

  loadFavorites() {
    const stored = localStorage.getItem('favoriteAdipadaiTopicIds');
    if (stored) {
      this.favoriteTopicIds = JSON.parse(stored);
    }
  }

  saveFavorites() {
    localStorage.setItem('favoriteAdipadaiTopicIds', JSON.stringify(this.favoriteTopicIds));
  }

  loadStudiedTopics() {
    const stored = localStorage.getItem('studiedAdipadaiTopicIds');
    if (stored) {
      this.studiedTopicIds = JSON.parse(stored);
    }
  }

  saveStudiedTopics() {
    localStorage.setItem('studiedAdipadaiTopicIds', JSON.stringify(this.studiedTopicIds));
  }

  searchTopics() {
    if (!this.searchTerm.trim()) {
      this.filteredTopics = this.topics;
      return;
    }

    this.filteredTopics = this.topics.filter(topic =>
      topic.title.includes(this.searchTerm) ||
      topic.description.includes(this.searchTerm) ||
      topic.category.includes(this.searchTerm) ||
      topic.keyPoints.some(point => point.includes(this.searchTerm))
    );
  }

  openTopicDetail(topic: Topic) {
    this.selectedTopic = topic;
    this.detailModal.present();
  }

  closeTopicDetail() {
    this.detailModal.dismiss();
    this.selectedTopic = null;
  }

  toggleFavorite(topic: Topic, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    const index = this.favoriteTopicIds.indexOf(topic.id);
    if (index > -1) {
      this.favoriteTopicIds.splice(index, 1);
      this.presentToast(topic.title + ' விருப்பங்களிலிருந்து நீக்கப்பட்டது');
    } else {
      this.favoriteTopicIds.push(topic.id);
      this.presentToast(topic.title + ' விருப்பங்களில் சேர்க்கப்பட்டது');
    }
    this.saveFavorites();
  }

  isFavorite(topic: Topic): boolean {
    return this.favoriteTopicIds.includes(topic.id);
  }

  markAsStudied(topic: Topic) {
    if (!this.studiedTopicIds.includes(topic.id)) {
      this.studiedTopicIds.push(topic.id);
      this.saveStudiedTopics();
      this.presentToast(topic.title + ' பயின்றது என்று குறிக்கப்பட்டது');
    }
    this.closeTopicDetail();
  }

  isStudied(topic: Topic): boolean {
    return this.studiedTopicIds.includes(topic.id);
  }

  shareTopic(topic: Topic, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    const shareText = `${topic.title}\n\n${topic.description}\n\nஅடிப்படை ஜோதிஷம் - வேத ஆஸ்ட்ரோ ஆப்`;
    
    if (navigator.share) {
      navigator.share({
        title: topic.title,
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        this.presentToast('தலைப்பு கிளிப்போர்டில் நகலெடுக்கப்பட்டது');
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

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    this.presentToast(this.isBookmarked ? 'புத்தகக்குறி சேர்க்கப்பட்டது' : 'புத்தகக்குறி நீக்கப்பட்டது');
  }

  trackByTopicId(index: number, topic: Topic): string {
    return topic.id;
  }
}
