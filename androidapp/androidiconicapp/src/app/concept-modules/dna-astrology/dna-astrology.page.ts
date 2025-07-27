import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

interface Planet {
  id: string;
  name: string;
  nameEnglish: string;
  icon: string;
  color: string;
  geneticImpact: string;
  dnaMarkers: string;
  remedies: string;
  expanded?: boolean;
}

interface CompatibilityData {
  planet: string;
  planetEnglish: string;
  icon: string;
  color: string;
  doshamNakshatrams: string[];
  adhikamNakshatrams: string[];
  birthNakshathram: string;
  notes: string;
  rows: {
    dosham: string[];
    adhikam: string[];
    birth?: string;
    note?: string;
  }[];
}

@Component({
  selector: 'app-dna-astrology',
  templateUrl: './dna-astrology.page.html',
  styleUrls: ['./dna-astrology.page.scss'],
})
export class DnaAstrologyPage implements OnInit {
  isBookmarked = false;
  showOverview = false;
  
  compatibilityData: CompatibilityData[] = [
    {
      planet: 'சூரியன்',
      planetEnglish: 'Sun',
      icon: 'sunny',
      color: 'warning',
      doshamNakshatrams: ['1. ஆஸ்வினி', '9. ஆயில்யம்', '17. அனுராதா', '25. பூர்வட்டாதி'],
      adhikamNakshatrams: ['3 கார்த்திகை', '9 ஆயில்யம்', '21 உத்திராடம்'],
      birthNakshathram: '13 ஹஸ்தம்',
      notes: 'சூரின் தோஷம் - கொடுவான ஜன்மகள்',
      rows: [
        { dosham: ['1. ஆஸ்வினி'], adhikam: ['3 கார்த்திகை'], birth: '', note: '' },
        { dosham: ['9. ஆயில்யம்'], adhikam: ['9 ஆயில்யம்'], birth: '13 ஹஸ்தம்', note: '(சூரு)' },
        { dosham: ['17. அனுராதா'], adhikam: ['21 உத்திராடம்'], birth: '', note: '' },
        { dosham: ['25. பூர்வட்டாதி'], adhikam: [''], birth: '', note: '' }
      ]
    },
    {
      planet: 'சந்திரன்',
      planetEnglish: 'Moon',
      icon: 'moon',
      color: 'medium',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['2 பரணி'], adhikam: ['4 ரோகிணி'], birth: '', note: '' },
        { dosham: ['10 மகம்'], adhikam: ['12 பூரம்'], birth: '5 மிருகசீரிஷம்', note: '(குரு)' },
        { dosham: ['19 மூலம்'], adhikam: ['21 உத்திராடம்'], birth: '', note: '' },
        { dosham: ['26 உத்திரட்டாதி'], adhikam: [''], birth: '', note: '' }
      ]
    },
    {
      planet: 'செவ்வாய்',
      planetEnglish: 'Mars',
      icon: 'flash',
      color: 'danger',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['3 கார்த்திகை'], adhikam: ['5 மிருகசீரிஷம்'], birth: '6 திருவாதிரை', note: '' },
        { dosham: ['11 பூரம்'], adhikam: ['14 சித்திரை'], birth: '21 உத்திராடம்', note: '(குரு)' },
        { dosham: ['18 கேட்டை'], adhikam: ['22 திருவோணம்'], birth: '', note: '' },
        { dosham: ['27 ரேவதி'], adhikam: [''], birth: '', note: '' }
      ]
    },
    {
      planet: 'புதன்',
      planetEnglish: 'Mercury',
      icon: 'chatbubbles',
      color: 'success',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['4 ரோகிணி'], adhikam: ['9 ஆயில்யம்'], birth: '', note: '' },
        { dosham: ['12 பூரம்'], adhikam: ['18 கேட்டை'], birth: '23 அவிட்டம்', note: '(சனி)' },
        { dosham: ['20 பூராடம்'], adhikam: ['24 சதயம்'], birth: '', note: '' }
      ]
    },
    {
      planet: 'குரு',
      planetEnglish: 'Jupiter',
      icon: 'school',
      color: 'primary',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['5 மிருகசீரிஷம்'], adhikam: ['7 பூசம்'], birth: '', note: '' },
        { dosham: ['8 பூராடம்'], adhikam: ['16 விசாகம்'], birth: '', note: '' },
        { dosham: ['22 திருவோணம்'], adhikam: ['26 உத்திரட்டாதி'], birth: '', note: '' }
      ]
    },
    {
      planet: 'சுக்கிரன்',
      planetEnglish: 'Venus',
      icon: 'heart',
      color: 'danger',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['6 திருவாதிரை'], adhikam: ['11 பூரம்'], birth: '', note: '' },
        { dosham: ['14 சித்திரை'], adhikam: ['19 மூலம்'], birth: '10 மகம்', note: '(சந்திரன்)' },
        { dosham: ['22 திருவோணம்'], adhikam: ['20 பூராடம்'], birth: '', note: '' }
      ]
    },
    {
      planet: 'சனி',
      planetEnglish: 'Saturn',
      icon: 'time',
      color: 'dark',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['7 பூசம்'], adhikam: ['17 அனுஷம்'], birth: '27 ரேவதி', note: 'செவ்வாய்' },
        { dosham: ['16 விசாகம்'], adhikam: ['26 உத்திரட்டாதி'], birth: '', note: '' },
        { dosham: ['23 அவிட்டம்'], adhikam: ['27 ரேவதி'], birth: '', note: '' }
      ]
    },
    {
      planet: 'ராகு',
      planetEnglish: 'Rahu',
      icon: 'eye',
      color: 'tertiary',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['8 பூரம்'], adhikam: ['16 விசாகம்'], birth: '', note: '' },
        { dosham: ['16 விசாகம்'], adhikam: ['24 சதயம்'], birth: '', note: '' },
        { dosham: ['19 மூலம்'], adhikam: [''], birth: '', note: '' }
      ]
    },
    {
      planet: 'கேது',
      planetEnglish: 'Ketu',
      icon: 'triangle',
      color: 'secondary',
      doshamNakshatrams: [],
      adhikamNakshatrams: [],
      birthNakshathram: '',
      notes: '',
      rows: [
        { dosham: ['1 அஸ்வினி'], adhikam: ['1 அஸ்வினி'], birth: '', note: '' },
        { dosham: ['10 மகம்'], adhikam: ['10 மகம்'], birth: '', note: '' },
        { dosham: ['19 மூலம்'], adhikam: ['19 மூலம்'], birth: '(சூரியன்)', note: '' }
      ]
    }
  ];
  
  planets: Planet[] = [
    {
      id: 'suriyan',
      name: 'சூரியன்',
      nameEnglish: 'Sun - The Soul Planet',
      icon: 'sunny',
      color: 'warning',
      geneticImpact: `சூரின் தோஷம் – கொடுவான ஜன்மகள்:
      
• ஆணவம், அதிகாரம், ஆளுமை குணங்கள் கொண்டவர்கள்
• அரசு/அரசாங்கம்/அரசியல்/சட்டம் – தொழில்கள் சம்பந்தப்படும்
• மருத்துவம் / மாற்று மருத்துவம் சம்பந்தப்படும்
• அரசாங்க வேலைகளில் சிக்கல் வரலாம்
• சட்டத்திற்கு புறம்பாக செயல்படக்கூடாது
• அப்பா, மூத்த மகன், மாமனார், உடன் வேலை செய்தவர்கள் தொடர்பு
• இவர்களை கஷ்டப்படுத்தவோ பகைத்துக்கொள்வோ கூடாது`,
      dnaMarkers: `சூரியன் தொடர்பான DNA குறிப்பான்கள்:

• நட்சத்திரங்கள்: ஆஸ்வினி, ஆயில்யம், அனுராதா, பூர்வட்டாதி
• தந்தையின் ஆதரவு, பொருள் / உரிமை முன்மாக குறைபடலாம்
• தலை, மூளுக்குத்தண்டு, கண் பார்வை, உஷ்ணம் போன்ற உடல் உபாதைகள் சம்பந்தப்படும்`,
      remedies: `சூரியன் கிரகத்திற்கான பரிகாரங்கள்:

• ஞாயிற்றுக்கிழமை விரதம் இருக்கவும்
• சூரிய மந்திரம்: "ஓம் ஹ்ரீம் சூர்யாய நமஃ"
• செம்பருத்தி பூ, மஞ்சள், தங்கம் தானம் செய்யவும்
• தந்தை மற்றும் முதியவர்களுக்கு உதவி செய்யவும்
• சூரிய கிரக ரத்னம்: மாணிக்கக் கல் அணியவும்
• காவிரி ஆறு, சூரிய தலங்களுக்கு சென்று வழிபடவும்`,
      expanded: false
    },
    {
      id: 'chandiran',
      name: 'சந்திரன்',
      nameEnglish: 'Moon - The Mind Planet',
      icon: 'moon',
      color: 'medium',
      geneticImpact: '[இங்கே சந்திரன் கிரகத்தின் மரபணு தாக்கம் பற்றிய தகவல்களை சேர்க்கவும்]',
      dnaMarkers: '[இங்கே சந்திரன் தொடர்பான DNA குறிப்பான்களை சேர்க்கவும்]',
      remedies: '[இங்கே சந்திரன் கிரகத்திற்கான பரிகாரங்களை சேர்க்கவும்]',
      expanded: false
    },
    {
      id: 'sevai',
      name: 'செவ்வாய்',
      nameEnglish: 'Mars - The Energy Planet',
      icon: 'flash',
      color: 'danger',
      geneticImpact: '[இங்கே செவ்வாய் கிரகத்தின் மரபணு தாக்கம் பற்றிய தகவல்களை சேர்க்கவும்]',
      dnaMarkers: '[இங்கே செவ்வாய் தொடர்பான DNA குறிப்பான்களை சேர்க்கவும்]',
      remedies: '[இங்கே செவ்வாய் கிரகத்திற்கான பரிகாரங்களை சேர்க்கவும்]',
      expanded: false
    },
    {
      id: 'puthan',
      name: 'புதன்',
      nameEnglish: 'Mercury - The Communication Planet',
      icon: 'chatbubbles',
      color: 'success',
      geneticImpact: '[இங்கே புதன் கிரகத்தின் மரபணு தாக்கம் பற்றிய தகவல்களை சேர்க்கவும்]',
      dnaMarkers: '[இங்கே புதன் தொடர்பான DNA குறிப்பான்களை சேர்க்கவும்]',
      remedies: '[இங்கே புதன் கிரகத்திற்கான பரிகாரங்களை சேர்க்கவும்]',
      expanded: false
    },
    {
      id: 'guru',
      name: 'குரு',
      nameEnglish: 'Jupiter - The Wisdom Planet',
      icon: 'school',
      color: 'primary',
      geneticImpact: '[இங்கே குரு கிரகத்தின் மரபணு தாக்கம் பற்றிய தகவல்களை சேர்க்கவும்]',
      dnaMarkers: '[இங்கே குரு தொடர்பான DNA குறிப்பான்களை சேர்க்கவும்]',
      remedies: '[இங்கே குரு கிரகத்திற்கான பரிகாரங்களை சேர்க்கவும்]',
      expanded: false
    },
    {
      id: 'sukiran',
      name: 'சுக்கிரன்',
      nameEnglish: 'Venus - The Love Planet',
      icon: 'heart',
      color: 'danger',
      geneticImpact: '[இங்கே சுக்கிரன் கிரகத்தின் மரபணு தாக்கம் பற்றிய தகவல்களை சேர்க்கவும்]',
      dnaMarkers: '[இங்கே சுக்கிரன் தொடர்பான DNA குறிப்பான்களை சேர்க்கவும்]',
      remedies: '[இங்கே சுக்கிரன் கிரகத்திற்கான பரிகாரங்களை சேர்க்கவும்]',
      expanded: false
    },
    {
      id: 'sani',
      name: 'சனி',
      nameEnglish: 'Saturn - The Karma Planet',
      icon: 'time',
      color: 'dark',
      geneticImpact: '[இங்கே சனி கிரகத்தின் மரபணு தாக்கம் பற்றிய தகவல்களை சேர்க்கவும்]',
      dnaMarkers: '[இங்கே சனி தொடர்பான DNA குறிப்பான்களை சேர்க்கவும்]',
      remedies: '[இங்கே சனி கிரகத்திற்கான பரிகாரங்களை சேர்க்கவும்]',
      expanded: false
    },
    {
      id: 'raghu',
      name: 'ராகு',
      nameEnglish: 'Rahu - The Shadow Planet',
      icon: 'eye',
      color: 'tertiary',
      geneticImpact: '[இங்கே ராகு கிரகத்தின் மரபணு தாக்கம் பற்றிய தகவல்களை சேர்க்கவும்]',
      dnaMarkers: '[இங்கே ராகு தொடர்பான DNA குறிப்பான்களை சேர்க்கவும்]',
      remedies: '[இங்கே ராகு கிரகத்திற்கான பரிகாரங்களை சேர்க்கவும்]',
      expanded: false
    },
    {
      id: 'kethu',
      name: 'கேது',
      nameEnglish: 'Ketu - The Mystic Planet',
      icon: 'triangle',
      color: 'secondary',
      geneticImpact: '[இங்கே கேது கிரகத்தின் மரபணு தாக்கம் பற்றிய தகவல்களை சேர்க்கவும்]',
      dnaMarkers: '[இங்கே கேது தொடர்பான DNA குறிப்பான்களை சேர்க்கவும்]',
      remedies: '[இங்கே கேது கிரகத்திற்கான பரிகாரங்களை சேர்க்கவும்]',
      expanded: false
    }
  ];

  constructor(private toastController: ToastController) { }

  ngOnInit() {
    // Check if this concept is bookmarked
    this.checkBookmarkStatus();
  }

  togglePlanet(planet: Planet) {
    planet.expanded = !planet.expanded;
  }

  toggleOverview() {
    this.showOverview = !this.showOverview;
  }

  checkBookmarkStatus() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
    this.isBookmarked = bookmarks.includes('dna_astrology_001');
  }

  async toggleBookmark() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
    
    if (this.isBookmarked) {
      // Remove bookmark
      const index = bookmarks.indexOf('dna_astrology_001');
      if (index > -1) {
        bookmarks.splice(index, 1);
      }
      this.isBookmarked = false;
      await this.showToast('Bookmark removed', 'warning');
    } else {
      // Add bookmark
      bookmarks.push('dna_astrology_001');
      this.isBookmarked = true;
      await this.showToast('Bookmarked successfully', 'success');
    }
    
    localStorage.setItem('bookmarkedConcepts', JSON.stringify(bookmarks));
  }

  async shareContent() {
    try {
      // Use Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: 'DNA ஜோதிஷம் - DNA Astrology',
          text: 'மரபணு அறிவியலுடன் இணைந்த நவீன ஜோதிட ஆராய்ச்சி மற்றும் கணிப்புகள்',
          url: window.location.href
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        await this.showToast('Link copied to clipboard', 'success');
      }
    } catch (error) {
      console.log('Error sharing:', error);
      await this.showToast('Sharing not available', 'warning');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}
