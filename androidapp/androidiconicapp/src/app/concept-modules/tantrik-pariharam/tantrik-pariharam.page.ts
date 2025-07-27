import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

interface RemedySection {
  title: string;
  type: string;
  content: string[];
}

interface Remedy {
  title: string;
  subtitle: string;
  tags: string[];
  sections: RemedySection[];
  benefits: string;
  warning?: string;
  important?: string;
  expanded?: boolean;
}

interface Category {
  key: string;
  icon: string;
  title: string;
  remedies: Remedy[];
}

interface SearchResult {
  title: string;
  subtitle: string;
  categoryTitle: string;
  categoryColor: string;
  matchingTags: string[];
  benefits: string;
  remedy: Remedy;
  category: Category;
}

@Component({
  selector: 'app-tantrik-pariharam',
  templateUrl: './tantrik-pariharam.page.html',
  styleUrls: ['./tantrik-pariharam.page.scss'],
})
export class TantrikPariharamPage implements OnInit {
  isBookmarked = false;
  showCategoryView = true;
  selectedCategory: Category | null = null;
  searchTerm = '';
  searchResults: SearchResult[] = [];

  categories: Category[] = [];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadData();
    this.checkBookmarkStatus();
  }

  private loadData() {
    this.http.get<{categories: Category[]}>('assets/data/tantrik-pariharam-data.json')
      .subscribe(data => {
        this.categories = data.categories;
      });
  }

  checkBookmarkStatus() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
    this.isBookmarked = bookmarks.includes('tantrik_001');
  }

  async toggleBookmark() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
    
    if (this.isBookmarked) {
      const index = bookmarks.indexOf('tantrik_001');
      if (index > -1) {
        bookmarks.splice(index, 1);
      }
      this.isBookmarked = false;
      await this.showToast('Bookmark removed', 'warning');
    } else {
      bookmarks.push('tantrik_001');
      this.isBookmarked = true;
      await this.showToast('Bookmarked successfully', 'success');
    }
    
    localStorage.setItem('bookmarkedConcepts', JSON.stringify(bookmarks));
  }

  selectCategory(categoryKey: string) {
    this.selectedCategory = this.categories.find(cat => cat.key === categoryKey) || null;
    this.showCategoryView = false;
  }

  goBack() {
    this.showCategoryView = true;
    this.selectedCategory = null;
    this.searchTerm = '';
    this.searchResults = [];
  }

  toggleRemedy(remedy: Remedy) {
    remedy.expanded = !remedy.expanded;
  }

  searchRemedies(event: any) {
    const query = event.detail.value.toLowerCase().trim();
    this.searchResults = [];

    if (query.length < 2) {
      return;
    }

    this.categories.forEach(category => {
      category.remedies.forEach(remedy => {
        const matchingTags = remedy.tags.filter(tag => 
          tag.toLowerCase().includes(query)
        );

        if (matchingTags.length > 0 || 
            remedy.title.toLowerCase().includes(query) ||
            remedy.subtitle.toLowerCase().includes(query) ||
            remedy.benefits.toLowerCase().includes(query)) {
          
          this.searchResults.push({
            title: remedy.title,
            subtitle: remedy.subtitle,
            categoryTitle: category.title,
            categoryColor: this.getCategoryColor(category.key),
            matchingTags: matchingTags,
            benefits: remedy.benefits,
            remedy: remedy,
            category: category
          });
        }
      });
    });
  }

  selectSearchResult(result: SearchResult) {
    this.selectedCategory = result.category;
    this.showCategoryView = false;
    this.searchTerm = '';
    this.searchResults = [];
    
    // Expand the selected remedy
    result.remedy.expanded = true;
  }

  getCategoryColor(categoryKey: string): string {
    const colorMap: { [key: string]: string } = {
      'debt': 'success',
      'health': 'danger',
      'prosperity': 'warning',
      'career': 'tertiary'
    };
    return colorMap[categoryKey] || 'medium';
  }

  async bookConsultation() {
    const alert = await this.alertController.create({
      header: 'நிபுணர் ஆலோசனை',
      message: 'விரைவில் இந்த சேவை கிடைக்கும். கூடுதல் விவரங்களுக்கு தொடர்பில் இருங்கள்.',
      buttons: ['சரி']
    });
    await alert.present();
  }

  async shareContent() {
    try {
      if ('share' in navigator) {
        await (navigator as any).share({
          title: 'தந்திர பரிகாரம் - Tantrik Pariharam',
          text: 'வேத சாஸ்திரங்களின் ரகসிய அம்சமான தந்திர பரிகாரங்கள்',
          url: window.location.href,
        });
      } else {
        await this.showToast('Content link copied to clipboard', 'success');
      }
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }
}
