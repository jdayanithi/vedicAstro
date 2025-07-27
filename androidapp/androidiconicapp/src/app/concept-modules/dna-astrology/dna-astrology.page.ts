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
  showSuriyan = false;
  
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
        { dosham: ['9. ஆயில்யம்'], adhikam: ['12 உத்திரம்'], birth: '13 ஹஸ்தம்', note: '(சூரு)' },
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
        { dosham: ['10 மகம்'], adhikam: ['13 ஹஸ்தம்'], birth: '5 மிருகசீரிஷம்', note: '(குரு)' },
        { dosham: ['18 கேட்டை'], adhikam: ['22 திருவோணம்'], birth: '', note: '' },
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
        { dosham: ['3 கார்த்திகை'], adhikam: ['5 மிருகசீரிஷம்'], birth: '', note: '' },
        { dosham: ['11 பூரம்'], adhikam: ['14 சித்திரை'], birth: '21 உத்திராடம்', note: '(குரு)' },
        { dosham: ['19 மூலம்'], adhikam: ['23 அவிட்டம்'], birth: '', note: '' },
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
        { dosham: ['12 உத்திரம்'], adhikam: ['18 கேட்டை'], birth: '23 அவிட்டம்', note: '(சனி)' },
        { dosham: ['20 பூராடம்'], adhikam: ['27 ரேவதி'], birth: '', note: '' }
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
        { dosham: ['5 மிருகசீரிஷம்'], adhikam: ['7 புனர்பூசம்'], birth: '', note: '' },
        { dosham: ['13 ஹஸ்தம்'], adhikam: ['16 விசாகம்'], birth: '8 பூசம்', note: 'Ragu' },
        { dosham: ['21 உத்திராடம்'], adhikam: ['25 பூரட்டாதி '], birth: '', note: '' }
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
        { dosham: ['6 திருவாதிரை'], adhikam: ['2 பரணி'], birth: '', note: '' },
        { dosham: ['14 சித்திரை'], adhikam: ['11 பூரம்'], birth: '10 மகம்', note: '(சந்திரன்)' },
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
        { dosham: ['7 புனர்பூசம்'], adhikam: ['8 பூசம்'], birth: '27 ரேவதி', note: 'செவ்வாய்' },
        { dosham: ['15 சுவாதி'], adhikam: ['17 அனுஷம்'], birth: '', note: '' },
        { dosham: ['23 அவிட்டம்'], adhikam: ['26 உத்திரட்டாதி'], birth: '', note: '' }
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
        { dosham: ['8 பூசம்'], adhikam: ['6 திருவாதிரை'], birth: '', note: 'Chandiran' },
        { dosham: ['16 விசாகம்'], adhikam: ['15 சுவாதி'], birth: '2 பரணி', note: '' },
        { dosham: ['24 சதயம்'], adhikam: ['24 சதயம்'], birth: '', note: '' }
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
        { dosham: [''], adhikam: ['1 அஸ்வினி'], birth: '', note: 'Suriyan' },
        { dosham: [''], adhikam: ['10 மகம்'], birth: '9 ஆயில்யம்', note: '' },
        { dosham: [''], adhikam: ['19 மூலம்'], birth: '', note: '' }
      ]
    }
  ];
  
  planets: Planet[] = [];

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

  toggleSuriyan() {
    this.showSuriyan = !this.showSuriyan;
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
