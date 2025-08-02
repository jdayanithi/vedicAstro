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
  complexity?: string;
  prerequisites?: string[];
  keyPoints: string[];
  content: string;
  benefits: string[];
  techniques?: string[];
  applications?: string[];
  isStudied?: boolean;
}

@Component({
  selector: 'app-uyarnilai-astrology',
  templateUrl: './uyarnilai-astrology.page.html',
  styleUrls: ['./uyarnilai-astrology.page.scss'],
})
export class UyarnilaiAstrologyPage implements OnInit {

  @ViewChild('detailModal', { static: true }) detailModal!: IonModal;

  selectedTopic: Topic | null = null;
  searchTerm = '';
  isBookmarked = false;
  favoriteTopicIds: string[] = [];
  studiedTopicIds: string[] = [];
  presentingElement: any = null;

  topics: Topic[] = [
    {
      id: 'advanced_dasa_system',
      title: 'மேம்பட்ட தசா அமைப்பு',
      description: 'விம்சோத்தரி தசா, அஷ்டோத்தரி தசா, சர தசா மற்றும் கால சக்ர தசா முறைகள்',
      category: 'மேம்பட்ட தசா',
      icon: 'time-outline',
      color: '#3880ff',
      duration: '45 நிமிடங்கள்',
      difficulty: 'மேம்பட்ட',
      complexity: 'கடினம்',
      prerequisites: ['அடிப்படை தசா அறிவு', 'கிரக உறவுகள்', 'ராசி அறிவு'],
      keyPoints: [
        'விம்சோத்தரி தசா கணக்கீடு',
        'அஷ்டோத்தரி தசா சிறப்புகள்',
        'சர தசா முறை',
        'கால சக்ர தசா பயன்பாடு'
      ],
      content: `
        <p><strong>மேம்பட்ட தசா அமைப்பு</strong> ஜோதிட கணிப்பின் மிக உயர்ந்த நிலையாகும்.</p>
        
        <p><strong>விம்சோத்தரி தசா:</strong><br>
        இது 120 வருட சுழற்சியை அடிப்படையாகக் கொண்டது. ஒவ்வொரு கிரகத்திற்கும் குறிப்பிட்ட வருடங்கள் ஒதுக்கப்பட்டுள்ளன.</p>
        
        <p><strong>அஷ்டோத்தரி தசா:</strong><br>
        இது 108 வருட சுழற்சியை அடிப்படையாகக் கொண்டது. சூரியன் லக்னத்தில் இருக்கும்போது பயன்படுத்தப்படுகிறது.</p>
        
        <p><strong>சர தசா:</strong><br>
        இது ராசி அடிப்படையிலான தசா முறை. ஒவ்வொரு ராசிக்கும் குறிப்பிட்ட வருடங்கள் ஒதுக்கப்பட்டுள்ளன.</p>
      `,
      benefits: [
        'துல்லியமான கணிப்புகள்',
        'நுணுக்கமான பலன் சொல்லுதல்',
        'காலக்கட்ட பிரிவினை',
        'வாழ்க்கை நிகழ்வுகள் கணிப்பு'
      ],
      techniques: [
        'மகா தசா கணக்கீடு',
        'அந்தர் தசா நிர்ணயம்',
        'பிரத்யந்தர் தசா பலன்',
        'சூட்சும தசா விளக்கம்'
      ],
      applications: [
        'நுணுக்கமான ஜாதக ஆய்வில் பயன்படும்',
        'குறிப்பிட்ட நிகழ்வு காலம் கணிக்கலாம்',
        'வாழ்க்கை திருப்பு முனைகள் கண்டறியலாம்'
      ]
    },
    {
      id: 'ashtakavarga_system',
      title: 'அஷ்டகவர்க்க முறை',
      description: 'கிரக பலம் கணக்கீட்டின் மேம்பட்ட முறை - சர்வாஷ்டகவர்க்க மற்றும் பிந்தாஷ்டகவர்க்க',
      category: 'கிரக பலம்',
      icon: 'grid-outline',
      color: '#10dc60',
      duration: '40 நிமிடங்கள்',
      difficulty: 'மேம்பட்ட',
      complexity: 'மிக கடினம்',
      prerequisites: ['கிரக நிலைகள்', 'ராசி சக்ரம்', 'அடிப்படை ஜோதிட கணக்கீடு'],
      keyPoints: [
        'ஒவ்வொரு கிரகத்தின் அஷ்டகவர்க்க',
        'சர்வாஷ்டகவர்க்க கணக்கீடு',
        'பிந்தாஷ்டகவர்க்க முறை',
        'கிரக போக்குவரத்து பலன்கள்'
      ],
      content: `
        <p><strong>அஷ்டகவர்க்க முறை</strong> கிரக பலம் கணக்கிடும் மிக துல்லியமான முறையாகும்.</p>
        
        <p><strong>அஷ்டகவர்க்க என்றால்:</strong><br>
        எட்டு கிரகங்களும் (சூரியன், சந்திரன், செவ்வாய், புதன், குரு, சுக்ரன், சனி, லக்னம்) ஒவ்வொரு ராசியிலும் கொடுக்கும் புள்ளிகளின் கணக்கீடு.</p>
        
        <p><strong>சர்வாஷ்டகவர்க்க:</strong><br>
        அனைத்து கிரகங்களின் அஷ்டகவர்க்க புள்ளிகளின் மொத்தம். இது ஒவ்வொரு ராசியின் மொத்த பலத்தைக் காட்டுகிறது.</p>
        
        <p><strong>பிந்தாஷ்டகவர்க்க:</strong><br>
        கிரக போக்குவரத்தின்போது (கோச்சார) கிரகங்கள் கொடுக்கும் பலன்களைக் கணிக்க பயன்படுகிறது.</p>
      `,
      benefits: [
        'கிரக பலம் துல்லியமாக அறியலாம்',
        'சாதகமான காலங்கள் கண்டறியலாம்',
        'கோச்சார பலன்கள் சரியாக கணிக்கலாம்',
        'முக்கிய முடிவுகள் எடுக்க உதவும்'
      ],
      techniques: [
        'ஒவ்வொரு கிரகத்தின் புள்ளி கணக்கீடு',
        'சர்வாஷ்டகவர்க்க சார்ட் தயாரிப்பு',
        'பிந்தாஷ்டகவர்க்க பயன்பாடு',
        'கோச்சார ஃபலாதேசம்'
      ],
      applications: [
        'முகூர்த்த தேர்வில் பயன்படும்',
        'சுப நிகழ்வுகள் நேரம் நிர்ணயம்',
        'பயண காலம் தேர்வு',
        'முதலீட்டு நேரம் கணிப்பு'
      ]
    },
    {
      id: 'yogas_and_combinations',
      title: 'யோகங்கள் மற்றும் கிரக சேர்க்கைகள்',
      description: 'ராஜயோகம், தனயோகம், பணியோகம் மற்றும் பல்வேறு சிறப்பு யோகங்கள்',
      category: 'யோக சாஸ்திரம்',
      icon: 'diamond-outline',
      color: '#f04141',
      duration: '50 நிமிடங்கள்',
      difficulty: 'மேம்பட்ட',
      complexity: 'மிக கடினம்',
      prerequisites: ['பாவ அறிவு', 'கிரக உறவுகள்', 'ராசி நிலைகள்'],
      keyPoints: [
        'பஞ்ச மஹாபுருஷ யோகங்கள்',
        'ராஜயோக சேர்க்கைகள்',
        'தனயோக அமைப்புகள்',
        'நபத்ர யோகங்கள்'
      ],
      content: `
        <p><strong>யோகங்கள்</strong> ஜாதகத்தில் சிறப்பு கிரக நிலைகளால் உருவாகும் சேர்க்கைகளாகும்.</p>
        
        <p><strong>பஞ்ச மஹாபுருஷ யோகங்கள்:</strong><br>
        1. ருச்சக யோகம் (செவ்வாய்)<br>
        2. பத்ர யோகம் (புதன்)<br>
        3. ஹம்ச யோகம் (குரு)<br>
        4. மாளவ்ய யோகம் (சுக்ரன்)<br>
        5. சாசா யோகம் (சனி)</p>
        
        <p><strong>ராஜயோகம்:</strong><br>
        கோண அதிபதிகளும் திரிகோண அதிபதிகளும் சேர்ந்து உருவாக்கும் யோகம். இது அரசியல் வெற்றி, உயர் பதவி, புகழ் ஆகியவற்றைக் கொடுக்கும்.</p>
        
        <p><strong>தனயோகம்:</strong><br>
        2, 5, 9, 11 ஆம் பாவ அதிபதிகள் சேர்ந்து உருவாக்கும் யோகம். இது செல்வம், சொத்து, லாபம் ஆகியவற்றைக் கொடுக்கும்.</p>
      `,
      benefits: [
        'ஜாதகத்தின் சிறப்பு அம்சங்கள் கண்டறியலாம்',
        'வாழ்க்கை வெற்றி பெறும் துறைகள் அறியலாம்',
        'பலவீனங்களைக் கண்டறிந்து பரிகாரம் செய்யலாம்',
        'சிறப்பு திறமைகள் வளர்த்துக்கொள்ளலாம்'
      ],
      techniques: [
        'யோக அமைப்பு கண்டறிதல்',
        'யோக பலம் கணக்கீடு',
        'யோக கர்க்க கிரக நிர்ணயம்',
        'யோக பலன் காலம் கணிப்பு'
      ],
      applications: [
        'தொழில் துறை தேர்வில் வழிகாட்டும்',
        'திருமண பொருத்தம் பார்க்கலாம்',
        'குழந்தைகளின் எதிர்காலம் கணிக்கலாம்',
        'சிறப்பு திறமை வளர்ச்சிக்கு உதவும்'
      ]
    },
    {
      id: 'prashna_shastra',
      title: 'பிரச்ன சாஸ்திரம்',
      description: 'கேள்வி கேட்கும் நேரத்தின் அடிப்படையில் பதில் சொல்லும் மேம்பட்ட முறை',
      category: 'பிரச்ன ஜோதிஷம்',
      icon: 'help-circle-outline',
      color: '#ffc409',
      duration: '35 நிமிடங்கள்',
      difficulty: 'மேம்பட்ட',
      complexity: 'நடுத்தர',
      prerequisites: ['அடிப்படை ஜோதிட அறிவு', 'கிரக நிலைகள்', 'பாவ பலன்கள்'],
      keyPoints: [
        'பிரச்ன சக்ர தயாரிப்பு',
        'பிரச்ன லக்ன நிர்ணயம்',
        'கேள்விக்கேற்ற பாவ தேர்வு',
        'பலன் கூறும் முறை'
      ],
      content: `
        <p><strong>பிரச்ன சாஸ்திரம்</strong> ஜென்ம ஜாதகம் இல்லாமல் கேள்வி கேட்டு பதில் சொல்லும் முறையாகும்.</p>
        
        <p><strong>பிரச்ன சக்ர தயாரிப்பு:</strong><br>
        கேள்வி கேட்கும் நேரம், இடம் ஆகியவற்றை அடிப்படையாகக் கொண்டு ஜாதகம் தயாரிக்கப்படுகிறது.</p>
        
        <p><strong>முக்கிய பிரச்ன வகைகள்:</strong><br>
        1. திருமண பிரச்னம் - 7ம் பாவம்<br>
        2. தொழில் பிரச்னம் - 10ம் பாவம்<br>
        3. உடல்நல பிரச்னம் - 6ம் பாவம்<br>
        4. சொத்து பிரச்னம் - 4ம் பாவம்<br>
        5. சந்தான பிரச்னம் - 5ம் பாவம்</p>
        
        <p>ஒவ்வொரு பிரச்னத்திற்கும் தொடர்புடைய பாவம், அதன் அதிபதி, கர்க்க கிரகம் ஆகியவற்றை ஆய்வு செய்து பலன் சொல்லப்படுகிறது.</p>
      `,
      benefits: [
        'உடனடி கேள்விகளுக்கு பதில் கிடைக்கும்',
        'ஜென்ம ஜாதகம் தெரியாவிட்டாலும் ஆலோசனை பெறலாம்',
        'குறிப்பிட்ட பிரச்னைக்கு மட்டும் கவனம்',
        'விரைவான தீர்வு பெறலாம்'
      ],
      techniques: [
        'பிரச்ன லக்ன கணக்கீடு',
        'கர்க்க கிரக நிர்ணயம்',
        'பாவ பலம் ஆய்வு',
        'யாத்ரை பலன் கணிப்பு'
      ],
      applications: [
        'எழுகுத்த கேள்விகளுக்கு உடனடி பதில்',
        'முக்கிய முடிவுகள் எடுக்க உதவும்',
        'காணாமல் போன பொருள் கண்டுபிடிப்பு',
        'வியாபார நேர்வு களுக்கு ஆலோசனை'
      ]
    },
    {
      id: 'varshaphala_technique',
      title: 'வர்ஷபல முறை',
      description: 'வருடாந்திர பலன் கணிப்பின் மேம்பட்ட முறை - சூரிய வருடம் மற்றும் மண்டல பலன்கள்',
      category: 'வார்ஷிக ஜோதிஷம்',
      icon: 'calendar-outline',
      color: '#7044ff',
      duration: '45 நிமிடங்கள்',
      difficulty: 'மேம்பட்ட',
      complexity: 'கடினம்',
      prerequisites: ['அடிப்படை ஜாதக அறிவு', 'கிரக கோச்சாரம்', 'தசா முறை'],
      keyPoints: [
        'சூரிய வருட கணக்கீடு',
        'வர்ஷ ப்ரவேச சக்ரம்',
        'மண்டலேசர் நிர்ணயம்',
        'வருடாந்திர பலன் முறை'
      ],
      content: `
        <p><strong>வர்ஷபல முறை</strong> ஒவ்வொரு வருடத்தின் பலன்களைக் கணிக்கும் சிறப்பு முறையாகும்.</p>
        
        <p><strong>சூரிய வருடம்:</strong><br>
        ஒருவரின் பிறந்த நாளில் சூரியன் அதே ராசி, அதே டிகிரியில் திரும்பி வரும் நேரத்தை அடிப்படையாகக் கொண்டது.</p>
        
        <p><strong>வர்ஷ ப்ரவேச சக்ரம்:</strong><br>
        சூரிய வருட தொடக்க நேரத்தில் அனைத்து கிரக நிலைகளையும் கொண்டு ஒரு புதிய ஜாதகம் தயாரிக்கப்படுகிறது.</p>
        
        <p><strong>மண்டலேசர்:</strong><br>
        வர்ஷ ப்ரவேச சக்ரத்தில் லக்ன அதிபதியே அந்த வருடத்தின் மண்டலேசராகிறார். இந்த கிரகத்தின் நிலையைப் பொறுத்து வருடத்தின் மொத்த பலன் நிர்ணயிக்கப்படுகிறது.</p>
      `,
      benefits: [
        'வருடாந்திர பலன்கள் துல்லியமாக கணிக்கலாம்',
        'சாதகமான மாதங்கள் கண்டறியலாம்',
        'முக்கிய நிகழ்வுகள் நடக்கும் காலம் அறியலாம்',
        'எச்சரிக்கை நடவடிக்கைகள் எடுக்கலாம்'
      ],
      techniques: [
        'சூரிய வருட ஆரம்பம் கணக்கீடு',
        'வர்ஷ ப்ரவேச சக்ர தயாரிப்பு',
        'மண்டலேசர் பலம் ஆய்வு',
        'மாதாந்திர பலன் கணிப்பு'
      ],
      applications: [
        'வருடாந்திர திட்டமிடலில் பயன்படும்',
        'முக்கிய நிகழ்ச்சிகள் நேரம் நிர்ணயம்',
        'வியாபார முடிவுகளுக்கு வழிகாட்டும்',
        'உடல்நல கவனம் தேவையான காலம் அறியலாம்'
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
    const stored = localStorage.getItem('favoriteUyarnilaiTopicIds');
    if (stored) {
      this.favoriteTopicIds = JSON.parse(stored);
    }
  }

  saveFavorites() {
    localStorage.setItem('favoriteUyarnilaiTopicIds', JSON.stringify(this.favoriteTopicIds));
  }

  loadStudiedTopics() {
    const stored = localStorage.getItem('studiedUyarnilaiTopicIds');
    if (stored) {
      this.studiedTopicIds = JSON.parse(stored);
    }
  }

  saveStudiedTopics() {
    localStorage.setItem('studiedUyarnilaiTopicIds', JSON.stringify(this.studiedTopicIds));
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
      topic.keyPoints.some(point => point.includes(this.searchTerm)) ||
      (topic.techniques && topic.techniques.some(tech => tech.includes(this.searchTerm)))
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
      this.presentToast(topic.title + ' மேம்பட்ட பயிற்சி முடிந்தது என்று குறிக்கப்பட்டது');
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

    const shareText = `${topic.title}\n\n${topic.description}\n\nஉறைநிலை ஜோதிஷம் - வேத ஆஸ்ட்ரோ ஆப்`;
    
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
