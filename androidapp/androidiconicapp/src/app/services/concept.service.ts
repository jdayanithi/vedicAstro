import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface AstrologyConcept {
  id: string;
  title: string;
  titleEnglish: string;
  description: string;
  descriptionEnglish: string;
  category: string;
  categoryEnglish: string;
  subcategory?: string;
  subcategoryEnglish?: string;
  price: number;
  isPaid: boolean;
  duration: string;
  level: string;
  content: string;
  tags: string[];
  imageUrl: string;
  isPurchased?: boolean;
}

export interface ConceptSubcategory {
  id: string;
  name: string;
  nameEnglish: string;
  icon: string;
  color: string;
}

export interface ConceptCategory {
  id: string;
  name: string;
  nameEnglish: string;
  icon: string;
  color: string;
  subcategories?: ConceptSubcategory[];
}

export interface ConceptsData {
  concepts: AstrologyConcept[];
  categories: ConceptCategory[];
}

@Injectable({
  providedIn: 'root'
})
export class ConceptService {
  private conceptsSubject = new BehaviorSubject<AstrologyConcept[]>([]);
  public concepts$ = this.conceptsSubject.asObservable();
  
  private categoriesSubject = new BehaviorSubject<ConceptCategory[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadConceptsFromJson();
  }

  private async loadConceptsFromJson(): Promise<void> {
    try {
      const data = await this.http.get<ConceptsData>('assets/data/concepts.json').toPromise();
      if (data) {
        this.conceptsSubject.next(data.concepts);
        this.categoriesSubject.next(data.categories);
      }
    } catch (error) {
      console.error('Error loading concepts:', error);
      // Fallback to empty arrays
      this.conceptsSubject.next([]);
      this.categoriesSubject.next([]);
    }
  }

  getConcepts(): Observable<AstrologyConcept[]> {
    return this.concepts$;
  }

  getCategories(): Observable<ConceptCategory[]> {
    return this.categories$;
  }

  getConceptById(id: string): AstrologyConcept | null {
    const concepts = this.conceptsSubject.value;
    return concepts.find(concept => concept.id === id) || null;
  }

  getConceptsByCategory(category: string): AstrologyConcept[] {
    const concepts = this.conceptsSubject.value;
    return concepts.filter(concept => concept.category === category);
  }

  getConceptsBySubcategory(subcategory: string): AstrologyConcept[] {
    const concepts = this.conceptsSubject.value;
    return concepts.filter(concept => concept.subcategory === subcategory);
  }

  getConceptsByCategoryAndSubcategory(category: string, subcategory: string): AstrologyConcept[] {
    const concepts = this.conceptsSubject.value;
    return concepts.filter(concept => 
      concept.category === category && concept.subcategory === subcategory
    );
  }

  getSubcategoriesByCategory(categoryId: string): ConceptSubcategory[] {
    const categories = this.categoriesSubject.value;
    const category = categories.find(cat => cat.id === categoryId);
    return category?.subcategories || [];
  }

  getFreeConcepts(): AstrologyConcept[] {
    const concepts = this.conceptsSubject.value;
    return concepts.filter(concept => !concept.isPaid);
  }

  getPaidConcepts(): AstrologyConcept[] {
    const concepts = this.conceptsSubject.value;
    return concepts.filter(concept => concept.isPaid);
  }

  searchConcepts(query: string): AstrologyConcept[] {
    const concepts = this.conceptsSubject.value;
    const lowerQuery = query.toLowerCase();
    
    return concepts.filter(concept => 
      concept.title.toLowerCase().includes(lowerQuery) ||
      concept.titleEnglish.toLowerCase().includes(lowerQuery) ||
      concept.description.toLowerCase().includes(lowerQuery) ||
      concept.descriptionEnglish.toLowerCase().includes(lowerQuery) ||
      concept.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  getConceptsByLevel(level: string): AstrologyConcept[] {
    const concepts = this.conceptsSubject.value;
    return concepts.filter(concept => concept.level === level);
  }

  getConceptsByPriceRange(minPrice: number, maxPrice: number): AstrologyConcept[] {
    const concepts = this.conceptsSubject.value;
    return concepts.filter(concept => concept.price >= minPrice && concept.price <= maxPrice);
  }

  getConceptsByTag(tag: string): AstrologyConcept[] {
    const concepts = this.conceptsSubject.value;
    return concepts.filter(concept => 
      concept.tags.some(conceptTag => conceptTag.toLowerCase().includes(tag.toLowerCase()))
    );
  }

  getAllCategories(): string[] {
    const concepts = this.conceptsSubject.value;
    const categories = concepts.map(concept => concept.category);
    return [...new Set(categories)];
  }

  getTotalConcepts(): number {
    return this.conceptsSubject.value.length;
  }

  getFreeConciptsCount(): number {
    return this.getFreeConcepts().length;
  }

  getPaidConceptsCount(): number {
    return this.getPaidConcepts().length;
  }

  markConceptAsPurchased(conceptId: string): void {
    const concepts = this.conceptsSubject.value;
    const updatedConcepts = concepts.map(concept => 
      concept.id === conceptId 
        ? { ...concept, isPurchased: true }
        : concept
    );
    this.conceptsSubject.next(updatedConcepts);
  }

  // Refresh concepts data
  refreshConcepts(): void {
    this.loadConceptsFromJson();
  }
}
