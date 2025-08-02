import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Nakshatra {
  id: string;
  number: number;
  name: string;
  nameEnglish: string;
  sanskritName: string;
  lord: string;
  rulingPlanet: string;
  deity: string;
  deityEnglish: string;
  symbol: string;
  symbolEnglish: string;
  gana: string;
  nature: string;
  element: string;
  yoni: string;
  yoniEnglish: string;
  yoniAnimal: string;
  yoniGender: string;
  varna: string;
  bodyParts: string[];
  foodPreferences: string[];
  favorableFoods: string[];
  unfavorableFoods: string[];
  colors: string[];
  places: string[];
  favorablePlaces: string[];
  unfavorablePlaces: string[];
  temples: string[];
  characteristics: string[];
  significances: string[];
  dnaTraits: string[];
  dnaCharacteristics: string[];
  strengths: string[];
  weaknesses: string[];
  remedies: string[];
  mantras: string[];
  expanded?: boolean;
}

@Component({
  selector: 'app-natchathiram-karakathuvam',
  templateUrl: './natchathiram-karakathuvam.page.html',
  styleUrls: ['./natchathiram-karakathuvam.page.scss'],
})
export class NatchathiramKarakathuvamPage implements OnInit {
  selectedSegment: string = 'overview';
  isBookmarked: boolean = false;
  searchTerm: string = '';
  selectedGana: string = 'all';
  selectedFilter: string = 'all';
  currentNakshatraIndex: number = 0;
  filteredNakshatras: Nakshatra[] = [];
  
  nakshatras: Nakshatra[] = [
    {
      id: 'ashwini',
      number: 1,
      name: 'அஸ்வினி',
      nameEnglish: 'Ashwini',
      sanskritName: 'अश्विनी',
      lord: 'கேது',
      rulingPlanet: 'கேது',
      deity: 'அஸ்வினி குமாரர்கள்',
      deityEnglish: 'Ashwini Kumaras',
      symbol: 'குதிரை தலை',
      symbolEnglish: 'Horse Head',
      gana: 'தேவ',
      nature: 'விரைவான',
      element: 'பூமி',
      yoni: 'குதிரை',
      yoniEnglish: 'Horse',
      yoniAnimal: 'ஆண் குதிரை',
      yoniGender: 'ஆண்',
      varna: 'வைசியன்',
      bodyParts: ['தலை', 'முகம்', 'மூளை'],
      foodPreferences: ['இனிப்பு', 'பால் பொருட்கள்'],
      favorableFoods: ['இனிப்பு', 'பால்', 'தேன்', 'பழங்கள்'],
      unfavorableFoods: ['காரம்', 'புளிப்பு', 'மசாலா'],
      colors: ['சிவப்பு', 'தங்கம்'],
      places: ['மருத்துவமனை', 'குதிரை வளர்ப்பு இடம்'],
      favorablePlaces: ['மருத்துவமனை', 'குதிரை இடம்', 'வைக்கோல் வெளி'],
      unfavorablePlaces: ['இருண்ட இடம்', 'அசுத்த இடம்'],
      temples: ['அஸ்வினி குமார் கோயில்'],
      characteristics: ['விரைவான செயல்', 'சுகாதாரம்', 'ஆரோக்கியம்'],
      significances: ['மருத்துவம்', 'ஆரோக்கியம்', 'வேகம்', 'ஆரம்பம்'],
      dnaTraits: ['வேகமான குணம்', 'குணப்படுத்தும் சக்தி'],
      dnaCharacteristics: ['தீவிர வேகம்', 'குணப்படுத்தும் திறன்', 'முன்முயற்சி'],
      strengths: ['தலைமை', 'வேகம்', 'மருத்துவ திறன்'],
      weaknesses: ['அவசரம்', 'பொறுமையின்மை', 'கோபம்'],
      remedies: ['அஸ்வினி குமாரர் வழிபாடு', 'குதிரை கொடை'],
      mantras: ['ஓம் அஸ்வினி குமாராய நமஹ', 'அஸ்வினி நட்சத்திர மந்திரம்']
    },
    {
      id: 'bharani',
      number: 2,
      name: 'பரணி',
      nameEnglish: 'Bharani',
      sanskritName: 'भरणी',
      lord: 'சுக்கிரன்',
      rulingPlanet: 'சுக்கிரன்',
      deity: 'யமன்',
      deityEnglish: 'Yama',
      symbol: 'யோனி',
      symbolEnglish: 'Yoni',
      gana: 'மனுஷ்ய',
      nature: 'கொடூரமான',
      element: 'பூமி',
      yoni: 'யானை',
      yoniEnglish: 'Elephant',
      yoniAnimal: 'பெண் யானை',
      yoniGender: 'பெண்',
      varna: 'க்ஷத்திரியன்',
      bodyParts: ['தலை', 'கண்கள்'],
      foodPreferences: ['காரம்', 'புளிப்பு'],
      favorableFoods: ['காரம்', 'புளிப்பு', 'இறைச்சி'],
      unfavorableFoods: ['இனிப்பு', 'பால் பொருட்கள்'],
      colors: ['சிவப்பு', 'பிங்க்'],
      places: ['மயானம்', 'நீதிமன்றம்'],
      favorablePlaces: ['நீதிமன்றம்', 'சிறை', 'மயானம்'],
      unfavorablePlaces: ['திருமண மண்டபம்', 'கோயில்'],
      temples: ['யம தர்மராஜ கோயில்'],
      characteristics: ['பொறுப்பு', 'நீதி', 'வாழ்க்கை மரணம்'],
      significances: ['நீதி', 'தர்மம்', 'மரணம்', 'பொறுப்பு'],
      dnaTraits: ['பலமான விருப்பம்', 'உறுதியான குணம்'],
      dnaCharacteristics: ['தீர்மானம்', 'நீதி உணர்வு', 'பொறுப்பு'],
      strengths: ['நீதி', 'உறுதி', 'பொறுப்பு'],
      weaknesses: ['கோபம்', 'கடினம்', 'அதிகார வெறி'],
      remedies: ['யம தர்மராஜ வழிபாடு', 'தர்ம காரியங்கள்'],
      mantras: ['ஓம் யமராஜாய நமஹ', 'பரணி நட்சத்திர மந்திரம்']
    },
    {
      id: 'krittika',
      number: 3,
      name: 'கிருத்திகை',
      nameEnglish: 'Krittika',
      sanskritName: 'कृत्तिका',
      lord: 'சூரியன்',
      rulingPlanet: 'சூரியன்',
      deity: 'அக்னி',
      deityEnglish: 'Agni',
      symbol: 'கத்தி',
      symbolEnglish: 'Knife/Razor',
      gana: 'ராக்ஷஸ',
      nature: 'கலவையான',
      element: 'அக்னி',
      yoni: 'ஆடு',
      yoniEnglish: 'Sheep',
      yoniAnimal: 'பெண் ஆடு',
      yoniGender: 'பெண்',
      varna: 'பிராமணன்',
      bodyParts: ['கழுத்து', 'தோள்கள்'],
      foodPreferences: ['காரம்', 'வறுத்த உணவு'],
      favorableFoods: ['காரம்', 'வறுத்த உணவு', 'தயிர்'],
      unfavorableFoods: ['இனிப்பு', 'குளிர்ந்த உணவு'],
      colors: ['சிவப்பு', 'தங்கம்'],
      places: ['சமையலறை', 'தீ வழிபாட்டு இடம்'],
      favorablePlaces: ['சமையலறை', 'யாக சாலை', 'தீ இடம்'],
      unfavorablePlaces: ['குளிர்ச்சியான இடம்', 'நீர் இடம்'],
      temples: ['முருகன் கோயில்', 'அக்னி கோயில்'],
      characteristics: ['கூர்மையான புத்தி', 'தலைமைத்துவம்', 'பாதுகாப்பு'],
      significances: ['சக்தி', 'பாதுகாப்பு', 'தீ', 'கூர்மை'],
      dnaTraits: ['தீவிர குணம்', 'செயல் திறன்'],
      dnaCharacteristics: ['தீவிர குணம்', 'பாதுகாப்பு உணர்வு', 'தலைமை'],
      strengths: ['தலைமை', 'பாதுகாப்பு', 'கூர்மை'],
      weaknesses: ['கோபம்', 'அழிவு', 'கடினம்'],
      remedies: ['முருகன் வழிபாடு', 'அக்னி ஹோமம்'],
      mantras: ['ஓம் அக்னியே நமஹ', 'கிருத்திகை நட்சத்திர மந்திரம்']
    }
    // Additional nakshatras would be added here...
  ];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadBookmarkStatus();
    this.updateFilteredNakshatras();
  }

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
  }

  searchNakshatras() {
    this.updateFilteredNakshatras();
  }

  updateFilteredNakshatras() {
    this.filteredNakshatras = this.getFilteredNakshatras();
  }

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    this.saveBookmarkStatus();
    this.showToast(this.isBookmarked ? 'புத்தகக்குறி சேர்க்கப்பட்டது' : 'புத்தகக்குறி நீக்கப்பட்டது');
  }

  filterByGana(gana: string) {
    this.selectedGana = gana;
    this.selectedFilter = gana;
    this.updateFilteredNakshatras();
  }

  getGanaColor(gana: string): string {
    switch (gana) {
      case 'தேவ': return 'success';
      case 'மனுஷ்ய': return 'warning';
      case 'ராக்ஷஸ': return 'danger';
      default: return 'medium';
    }
  }

  getGanaIcon(gana: string): string {
    switch (gana) {
      case 'தேவ': return 'star';
      case 'மனுஷ்ய': return 'person';
      case 'ராக்ஷஸ': return 'flame';
      default: return 'help';
    }
  }

  getFilteredNakshatras(): Nakshatra[] {
    let filtered = this.nakshatras;
    
    // Filter by gana
    if (this.selectedGana !== 'all') {
      filtered = filtered.filter(n => n.gana === this.selectedGana);
    }

    // Filter by search term
    if (this.searchTerm) {
      filtered = filtered.filter(n => 
        n.name.includes(this.searchTerm) || 
        n.nameEnglish.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    return filtered;
  }

  toggleNakshatraExpansion(nakshatra: Nakshatra) {
    nakshatra.expanded = !nakshatra.expanded;
  }

  async showNakshatraDetails(nakshatra: Nakshatra) {
    const alert = await this.alertController.create({
      header: nakshatra.name,
      subHeader: nakshatra.nameEnglish,
      message: `
        <strong>அதிதேவதை:</strong> ${nakshatra.deity}<br>
        <strong>சின்னம்:</strong> ${nakshatra.symbol}<br>
        <strong>கணம்:</strong> ${nakshatra.gana}<br>
        <strong>யோனி:</strong> ${nakshatra.yoni}<br>
        <strong>குணங்கள்:</strong> ${nakshatra.characteristics.join(', ')}
      `,
      buttons: ['சரி']
    });

    await alert.present();
  }

  navigateToAnalysis() {
    this.selectedSegment = 'analysis';
  }

  previousNakshatra() {
    if (this.currentNakshatraIndex > 0) {
      this.currentNakshatraIndex--;
    }
  }

  nextNakshatra() {
    if (this.currentNakshatraIndex < this.nakshatras.length - 1) {
      this.currentNakshatraIndex++;
    }
  }

  getCurrentNakshatra(): Nakshatra {
    return this.nakshatras[this.currentNakshatraIndex];
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  private loadBookmarkStatus() {
    const bookmarked = localStorage.getItem('natchathiram-karakathuvam-bookmarked');
    this.isBookmarked = bookmarked === 'true';
  }

  private saveBookmarkStatus() {
    localStorage.setItem('natchathiram-karakathuvam-bookmarked', this.isBookmarked.toString());
  }
}
