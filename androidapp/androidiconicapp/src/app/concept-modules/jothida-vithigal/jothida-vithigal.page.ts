import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

interface JothidaVithigalCategory {
  id: string;
  name: string;
  nameEnglish: string;
  icon: string;
  color: string;
  ruleCount: number;
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
}

interface CategoryRuleData {
  category: string;
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
    // Only load categories initially
    const categoriesData$ = this.http.get<JothidaVithigalData>('/assets/data/jothida-vithigal.json');
    
    categoriesData$.subscribe({
      next: (data) => {
        this.categories = data.categories;
        this.isLoading = false; // Stop loading after categories are loaded
      },
      error: (error) => {
        console.error('Error loading jothida vithigal categories:', error);
        this.isLoading = false;
      }
    });
  }

  loadAllRules() {
    // Load rules from all category files
    const categoryRuleRequests = this.categories.map(category => 
      this.http.get<CategoryRuleData>(`/assets/data/jothida-vithigal/${category.id}.json`)
    );

    forkJoin(categoryRuleRequests).subscribe({
      next: (categoryDataArray) => {
        this.rules = [];
        categoryDataArray.forEach(categoryData => {
          this.rules.push(...categoryData.rules);
        });
        this.filteredRules = [...this.rules];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading jothida vithigal rules:', error);
        this.isLoading = false;
      }
    });
  }

  loadCategoryRules(categoryId: string) {
    this.isLoading = true;
    this.http.get<CategoryRuleData>(`/assets/data/jothida-vithigal/${categoryId}.json`).subscribe({
      next: (data) => {
        this.filteredRules = data.rules;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(`Error loading ${categoryId} rules:`, error);
        this.isLoading = false;
      }
    });
  }

  selectCategory(categoryId: string | null) {
    this.selectedCategory = categoryId;
    this.searchTerm = ''; // Clear search when selecting category
    
    if (categoryId) {
      this.loadCategoryRules(categoryId);
    } else {
      // If no category selected, clear rules and go back to category view
      this.filteredRules = [];
      this.rules = [];
    }
  }

  searchRules() {
    if (this.searchTerm.trim() && this.rules.length === 0) {
      // Load all rules first if searching and no rules are loaded
      this.loadAllRules();
    } else {
      this.filterRules();
    }
  }

  filterRules() {
    if (this.selectedCategory && this.filteredRules.length > 0) {
      // Filter within current category rules
      const term = this.searchTerm.toLowerCase();
      if (term.trim()) {
        this.filteredRules = this.filteredRules.filter(rule =>
          rule.rule.toLowerCase().includes(term) ||
          rule.ruleEnglish.toLowerCase().includes(term) ||
          rule.tags.some(tag => tag.toLowerCase().includes(term)) ||
          rule.planets.some(planet => planet.toLowerCase().includes(term)) ||
          rule.condition.toLowerCase().includes(term) ||
          rule.result.toLowerCase().includes(term)
        );
      } else {
        // Reload category rules if search is cleared
        this.loadCategoryRules(this.selectedCategory);
      }
    } else if (this.rules.length > 0) {
      // Filter all rules if they are loaded
      let filtered = [...this.rules];

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
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.ruleCount : 0;
  }

  goBack() {
    this.selectedCategory = null;
    this.searchTerm = '';
    this.filteredRules = [];
    this.rules = [];
  }

  clearSearch() {
    this.searchTerm = '';
    if (this.selectedCategory) {
      // Reload current category rules
      this.loadCategoryRules(this.selectedCategory);
    } else {
      // Clear everything and go back to categories
      this.selectedCategory = null;
      this.filteredRules = [];
      this.rules = [];
    }
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
