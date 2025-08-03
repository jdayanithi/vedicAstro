import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

interface NakshatraIndex {
  id: string;
  number: number;
  name: string;
  nameEnglish: string;
  filename: string;
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
  filteredNakshatras: Nakshatra[] = [];
  currentNakshatraIndex: number = 0;
  
  nakshatras: Nakshatra[] = [];
  nakshatraIndex: NakshatraIndex[] = [];
  loadedNakshatras: Map<string, Nakshatra> = new Map();

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router,
    private http: HttpClient
  ) { }

  async ngOnInit() {
    this.loadBookmarkStatus();
    await this.loadNakshatraIndex();
    this.updateFilteredNakshatras();
  }

  async loadNakshatraIndex() {
    try {
      const indexData = await this.http.get<{nakshatras: NakshatraIndex[]}>('assets/data/natchathiram-karakathuvam/nakshatras-index.json').toPromise();
      this.nakshatraIndex = indexData?.nakshatras || [];
      
      // Create placeholder nakshatra objects for the list
      this.nakshatras = this.nakshatraIndex.map(index => ({
        id: index.id,
        number: index.number,
        name: index.name,
        nameEnglish: index.nameEnglish,
        // Initialize other properties as empty - they'll be loaded when needed
        sanskritName: '',
        lord: '',
        rulingPlanet: '',
        deity: '',
        deityEnglish: '',
        symbol: '',
        symbolEnglish: '',
        gana: '',
        nature: '',
        element: '',
        yoni: '',
        yoniEnglish: '',
        yoniAnimal: '',
        yoniGender: '',
        varna: '',
        bodyParts: [],
        foodPreferences: [],
        favorableFoods: [],
        unfavorableFoods: [],
        colors: [],
        places: [],
        favorablePlaces: [],
        unfavorablePlaces: [],
        temples: [],
        characteristics: [],
        significances: [],
        dnaTraits: [],
        dnaCharacteristics: [],
        strengths: [],
        weaknesses: [],
        remedies: [],
        mantras: [],
        expanded: false
      }));
    } catch (error) {
      console.error('Error loading nakshatra index:', error);
      this.showToast('நக்ஷத்திர தரவு ஏற்றுவதில் பிழை');
    }
  }

  async loadNakshatraDetails(nakshatra: Nakshatra): Promise<Nakshatra> {
    if (this.loadedNakshatras.has(nakshatra.id)) {
      return this.loadedNakshatras.get(nakshatra.id)!;
    }

    try {
      const indexEntry = this.nakshatraIndex.find(n => n.id === nakshatra.id);
      if (!indexEntry) {
        throw new Error('Nakshatra index not found');
      }

      const nakshatraData = await this.http.get<Nakshatra>(`assets/data/natchathiram-karakathuvam/${indexEntry.filename}`).toPromise();
      if (nakshatraData) {
        this.loadedNakshatras.set(nakshatra.id, nakshatraData);
        
        // Update the nakshatra in the main array
        const index = this.nakshatras.findIndex(n => n.id === nakshatra.id);
        if (index !== -1) {
          this.nakshatras[index] = { ...nakshatraData, expanded: nakshatra.expanded };
        }
        
        return nakshatraData;
      }
    } catch (error) {
      console.error('Error loading nakshatra details:', error);
      this.showToast('நக்ஷத்திர விவரங்கள் ஏற்றுவதில் பிழை');
    }

    return nakshatra;
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
    this.updateFilteredNakshatras();
  }

  getGanaColor(gana: string): string {
    switch (gana) {
      case 'தேவ': return 'success';
      case 'தேவ கணம்': return 'success';
      case 'மனுஷ்ய': return 'warning';
      case 'மனுஷ்ய கணம்': return 'warning';
      case 'ராக்ஷச': return 'danger';
      case 'ராக்ஷச கணம்': return 'danger';
      default: return 'medium';
    }
  }

  getGanaIcon(gana: string): string {
    switch (gana) {
      case 'தேவ':
      case 'தேவ கணம்': return 'star';
      case 'மனுஷ்ய':
      case 'மனுஷ்ய கணம்': return 'person';
      case 'ராக்ஷச':
      case 'ராக்ஷச கணம்': return 'flame';
      default: return 'help';
    }
  }

  getFilteredNakshatras(): Nakshatra[] {
    let filtered = this.nakshatras;
    
    // Filter by gana
    if (this.selectedGana !== 'all') {
      filtered = filtered.filter(n => {
        return n.gana === this.selectedGana || 
               n.gana === this.selectedGana + ' கணம்' ||
               n.gana.includes(this.selectedGana);
      });
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

  async toggleNakshatraExpansion(nakshatra: Nakshatra) {
    // Load details if not already loaded
    if (!this.loadedNakshatras.has(nakshatra.id)) {
      await this.loadNakshatraDetails(nakshatra);
    }
    
    nakshatra.expanded = !nakshatra.expanded;
  }

  async showNakshatraDetails(nakshatra: Nakshatra) {
    // Load details if not already loaded
    const fullNakshatra = await this.loadNakshatraDetails(nakshatra);
    
    const alert = await this.alertController.create({
      header: fullNakshatra.name,
      subHeader: fullNakshatra.nameEnglish,
      message: `
        <strong>அதிதேவதை:</strong> ${fullNakshatra.deity}<br>
        <strong>சின்னம்:</strong> ${fullNakshatra.symbol}<br>
        <strong>கணம்:</strong> ${fullNakshatra.gana}<br>
        <strong>யோனி:</strong> ${fullNakshatra.yoni}<br>
        <strong>குணங்கள்:</strong> ${fullNakshatra.characteristics.join(', ')}
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
