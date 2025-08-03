import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Namayogam {
  id: string;
  name: string;
  englishName: string;
  effect: string;
  rulingPlanet: string;
  element: string;
  quality: string;
  bestTime: string;
  description: string;
  keyBenefits: string[];
  favorableActivities: string[];
  unfavorableActivities: string[];
  pariharam: {
    dailyPractices: string[];
    offerings: string[];
    gems: {
      primary: string;
      alternative: string;
      benefits: string;
    };
    mantras: {
      name: string;
      text: string;
      count: string;
    }[];
  };
  activationProcess: {
    title: string;
    description: string;
    details?: string;
  }[];
}

@Component({
  selector: 'app-namayogam-course',
  templateUrl: './namayogam-course.page.html',
  styleUrls: ['./namayogam-course.page.scss'],
})
export class NamayogamCoursePage implements OnInit {
  searchTerm: string = '';
  isModalOpen: boolean = false;
  selectedNamayogam: Namayogam | null = null;
  filteredNamayogam: Namayogam[] = [];
  completedNamayogam: string[] = [];
  favoriteNamayogam: string[] = [];
  namayogamList: Namayogam[] = [];

  // List of 27 Namayogam IDs
  namayogamIds = [
    'vishkumba', 'priti', 'ayushmana', 'saubhagya', 'shobhana', 'atiganda', 'sukarma',
    'dhriti', 'shoola', 'ganda', 'vriddhi', 'dhruva', 'vyaghata', 'harshana',
    'vajra', 'siddhi', 'vyatipata', 'variyana', 'parigha', 'shiva', 'siddha',
    'sadhya', 'shubha', 'shukla', 'brahma', 'indra', 'vaidhriti'
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadNamayogamData();
    this.loadCompletedNamayogam();
    this.loadFavoriteNamayogam();
  }

  async loadNamayogamData() {
    try {
      const loadPromises = this.namayogamIds.map(id => 
        this.http.get<Namayogam>(`assets/data/namayogam/${id}.json`).toPromise()
      );
      
      const results = await Promise.all(loadPromises);
      this.namayogamList = results.filter(result => result !== undefined) as Namayogam[];
      this.filterNamayogam();
    } catch (error) {
      console.error('Error loading namayogam data:', error);
      // Fallback data
      this.createFallbackData();
    }
  }

  createFallbackData() {
    this.namayogamList = [
      {
        id: 'vishkumba',
        name: 'விஷ்கும்ப',
        englishName: 'Vishkumba',
        effect: 'வெற்றி',
        rulingPlanet: 'Jupiter',
        element: 'Ether',
        quality: 'Rajasic',
        bestTime: 'Morning 6-9 AM',
        description: 'Vishkumba yoga brings victory and leadership qualities.',
        keyBenefits: ['Victory', 'Leadership', 'Success', 'Achievement'],
        favorableActivities: ['Starting new ventures', 'Leadership initiatives', 'Goal achievement'],
        unfavorableActivities: ['Passive activities', 'Surrender', 'Rest'],
        pariharam: {
          dailyPractices: ['Victory meditation', 'Goal visualization'],
          offerings: ['Yellow flowers', 'Turmeric'],
          gems: { primary: 'Yellow Sapphire', alternative: 'Topaz', benefits: 'Enhances victory' },
          mantras: [{ name: 'Guru Mantra', text: 'ॐ गुरवे नमः', count: '108 times' }]
        },
        activationProcess: [
          { title: 'Goal Setting', description: 'Set clear goals', details: 'Define victory' }
        ]
      }
    ];
    this.filterNamayogam();
  }

  loadCompletedNamayogam() {
    const completed = localStorage.getItem('completedNamayogam');
    if (completed) {
      this.completedNamayogam = JSON.parse(completed);
    }
  }

  loadFavoriteNamayogam() {
    const favorites = localStorage.getItem('favoriteNamayogam');
    if (favorites) {
      this.favoriteNamayogam = JSON.parse(favorites);
    }
  }

  filterNamayogam(event?: any) {
    if (event) {
      this.searchTerm = event.detail.value;
    }
    if (!this.searchTerm) {
      this.filteredNamayogam = this.namayogamList;
    } else {
      this.filteredNamayogam = this.namayogamList.filter(namayogam =>
        namayogam.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        namayogam.englishName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        namayogam.effect.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  async openNamayogamDetail(namayogam: Namayogam) {
    this.selectedNamayogam = namayogam;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedNamayogam = null;
  }

  toggleCompleted(namayogamId: string) {
    if (this.completedNamayogam.includes(namayogamId)) {
      this.completedNamayogam = this.completedNamayogam.filter(id => id !== namayogamId);
    } else {
      this.completedNamayogam.push(namayogamId);
    }
    localStorage.setItem('completedNamayogam', JSON.stringify(this.completedNamayogam));
  }

  toggleFavorite(namayogamId: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (this.favoriteNamayogam.includes(namayogamId)) {
      this.favoriteNamayogam = this.favoriteNamayogam.filter(id => id !== namayogamId);
    } else {
      this.favoriteNamayogam.push(namayogamId);
    }
    localStorage.setItem('favoriteNamayogam', JSON.stringify(this.favoriteNamayogam));
  }

  isNamayogamCompleted(namayogamId: string): boolean {
    return this.completedNamayogam.includes(namayogamId);
  }

  isFavorite(namayogamId: string): boolean {
    return this.favoriteNamayogam.includes(namayogamId);
  }

  getCompletionPercentage(): number {
    return Math.round((this.completedNamayogam.length / this.namayogamList.length) * 100);
  }

  getProgressPercentage(): number {
    return this.getCompletionPercentage() / 100;
  }

  shareContent() {
    if (navigator.share) {
      navigator.share({
        title: 'நாமயோகம் Course - LDML Online Astro',
        text: 'Learn about the 27 sacred Namayogam combinations for divine timing',
        url: window.location.href
      });
    }
  }

  markAsCompleted(namayogamId: string) {
    this.toggleCompleted(namayogamId);
  }
}
