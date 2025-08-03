import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface JothidaVithigalCategory {
  id: string;
  name: string;
  nameEnglish: string;
  icon: string;
  color: string;
}

interface JothidaVithigalRule {
  id: string;
  category: string;
  rule: string;
  ruleEnglish: string;
  planets: string[];
  tags: string[];
  condition: string;
  result: string;
}

interface JothidaVithigalData {
  categories: JothidaVithigalCategory[];
  rules: JothidaVithigalRule[];
}

@Component({
  selector: 'app-jothida-vithigal',
  templateUrl: './jothida-vithigal.page.html',
  styleUrls: ['./jothida-vithigal.page.scss'],
})
export class JothidaVithigalPage implements OnInit {
  categories: JothidaVithigalCategory[] = [];
  rules: JothidaVithigalRule[] = [];
  filteredRules: JothidaVithigalRule[] = [];
  selectedCategory: string | null = null;
  searchTerm: string = '';
  isLoading: boolean = true;
  isBookmarked: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<JothidaVithigalData>('/assets/data/jothida-vithigal.json').subscribe({
      next: (data) => {
        this.categories = data.categories;
        this.rules = data.rules;
        this.filteredRules = [...this.rules];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading jothida vithigal data:', error);
        this.isLoading = false;
      }
    });
  }

  selectCategory(categoryId: string | null) {
    this.selectedCategory = categoryId;
    this.filterRules();
  }

  searchRules() {
    this.filterRules();
  }

  filterRules() {
    let filtered = [...this.rules];

    // Filter by category
    if (this.selectedCategory) {
      filtered = filtered.filter(rule => rule.category === this.selectedCategory);
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(rule =>
        rule.rule.toLowerCase().includes(term) ||
        rule.ruleEnglish.toLowerCase().includes(term) ||
        rule.tags.some(tag => tag.toLowerCase().includes(term)) ||
        rule.planets.some(planet => planet.toLowerCase().includes(term)) ||
        rule.condition.toLowerCase().includes(term) ||
        rule.result.toLowerCase().includes(term)
      );
    }

    this.filteredRules = filtered;
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#6366f1';
  }

  getCategoryIcon(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.icon : 'document';
  }

  getRuleCount(categoryId: string): number {
    return this.rules.filter(rule => rule.category === categoryId).length;
  }

  goBack() {
    this.selectedCategory = null;
    this.searchTerm = '';
    this.filteredRules = [...this.rules];
  }

  clearSearch() {
    this.searchTerm = '';
    this.selectedCategory = null;
    this.filteredRules = [...this.rules];
  }

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    // Add bookmark logic here - could save to local storage or backend
  }

  shareRule(rule: JothidaVithigalRule) {
    if (navigator.share) {
      navigator.share({
        title: rule.rule,
        text: `${rule.rule}\n\nநிபந்தனை: ${rule.condition}\nபலன்: ${rule.result}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      this.copyRule(rule);
    }
  }

  copyRule(rule: JothidaVithigalRule) {
    const text = `${rule.rule}\n\nநிபந்தனை: ${rule.condition}\nபலன்: ${rule.result}`;
    navigator.clipboard.writeText(text).then(() => {
      // You can add a toast notification here
      console.log('Rule copied to clipboard');
    });
  }
}
