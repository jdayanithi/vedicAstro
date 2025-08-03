import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { KiragaSerkaiService, KiragaSerkai } from '../../services/kiraga-serkai.service';

@Component({
  selector: 'app-kiraga-serkai',
  templateUrl: './kiraga-serkai.page.html',
  styleUrls: ['./kiraga-serkai.page.scss'],
})
export class KiragaSerkaiPage implements OnInit {
  searchTerm: string = '';
  isModalOpen: boolean = false;
  selectedKiragaSerkai: KiragaSerkai | null = null;
  filteredKiragaSerkai: KiragaSerkai[] = [];
  completedKiragaSerkai: string[] = [];
  favoriteKiragaSerkai: string[] = [];
  kiragaSerkaiList: KiragaSerkai[] = [];
  isLoading: boolean = true;

  constructor(
    private modalController: ModalController,
    private kiragaSerkaiService: KiragaSerkaiService
  ) {}

  ngOnInit() {
    this.loadKiragaSerkaiData();
    this.loadProgress();
  }

  ionViewWillEnter() {
    this.searchKiragaSerkai();
  }

  private loadKiragaSerkaiData() {
    this.isLoading = true;
    this.kiragaSerkaiService.loadAvailableKiragaSerkai().subscribe({
      next: (data) => {
        this.kiragaSerkaiList = data;
        this.filteredKiragaSerkai = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading kiraga serkai data:', error);
        this.isLoading = false;
      }
    });
  }

  searchKiragaSerkai() {
    this.filteredKiragaSerkai = this.kiragaSerkaiService.searchKiragaSerkai(
      this.kiragaSerkaiList, 
      this.searchTerm
    );
  }

  async openKiragaSerkaiDetail(kiragaSerkai: KiragaSerkai) {
    this.selectedKiragaSerkai = kiragaSerkai;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedKiragaSerkai = null;
  }

  toggleComplete(kiragaSerkaiId: string) {
    const index = this.completedKiragaSerkai.indexOf(kiragaSerkaiId);
    if (index > -1) {
      this.completedKiragaSerkai.splice(index, 1);
    } else {
      this.completedKiragaSerkai.push(kiragaSerkaiId);
    }
    this.saveProgress();
  }

  toggleFavorite(kiragaSerkaiId: string) {
    const index = this.favoriteKiragaSerkai.indexOf(kiragaSerkaiId);
    if (index > -1) {
      this.favoriteKiragaSerkai.splice(index, 1);
    } else {
      this.favoriteKiragaSerkai.push(kiragaSerkaiId);
    }
    this.saveProgress();
  }

  isCompleted(kiragaSerkaiId: string): boolean {
    return this.completedKiragaSerkai.includes(kiragaSerkaiId);
  }

  isFavorite(kiragaSerkaiId: string): boolean {
    return this.favoriteKiragaSerkai.includes(kiragaSerkaiId);
  }

  private saveProgress() {
    localStorage.setItem('kiragaSerkaiCompleted', JSON.stringify(this.completedKiragaSerkai));
    localStorage.setItem('kiragaSerkaiFavorites', JSON.stringify(this.favoriteKiragaSerkai));
  }

  private loadProgress() {
    const completed = localStorage.getItem('kiragaSerkaiCompleted');
    const favorites = localStorage.getItem('kiragaSerkaiFavorites');

    if (completed) {
      this.completedKiragaSerkai = JSON.parse(completed);
    }

    if (favorites) {
      this.favoriteKiragaSerkai = JSON.parse(favorites);
    }
  }

  getProgressPercentage(): number {
    if (this.kiragaSerkaiList.length === 0) return 0;
    return Math.round((this.completedKiragaSerkai.length / this.kiragaSerkaiList.length) * 100);
  }
}
