import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export interface KiragaSerkai {
  id: string;
  name: string;
  englishName: string;
  planets: string[];
  description: string;
  vazhviayalPariharam: {
    title: string;
    timings: string[];
  };
  templePariharam: {
    temples: string[];
  };
  effects: {
    positive: string[];
    negative: string[];
  };
}

export interface KiragaSerkaiIndex {
  id: string;
  name: string;
  englishName: string;
  planets: string[];
  fileName: string;
}

@Injectable({
  providedIn: 'root'
})
export class KiragaSerkaiService {
  private kiragaSerkaiListSubject = new BehaviorSubject<KiragaSerkai[]>([]);
  private indexSubject = new BehaviorSubject<KiragaSerkaiIndex[]>([]);
  
  kiragaSerkaiList$ = this.kiragaSerkaiListSubject.asObservable();
  index$ = this.indexSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadIndex();
  }

  private loadIndex(): void {
    this.http.get<{kiragaSerkaiCombinations: KiragaSerkaiIndex[]}>('/assets/data/kiraga-serkai/index.json')
      .pipe(
        map(response => response.kiragaSerkaiCombinations),
        catchError(error => {
          console.error('Error loading kiraga serkai index:', error);
          return of([]);
        })
      )
      .subscribe(index => {
        this.indexSubject.next(index);
      });
  }

  getKiragaSerkaiById(id: string): Observable<KiragaSerkai | null> {
    return this.http.get<KiragaSerkai>(`/assets/data/kiraga-serkai/${id}.json`)
      .pipe(
        catchError(error => {
          console.error(`Error loading kiraga serkai ${id}:`, error);
          return of(null);
        })
      );
  }

  loadAllKiragaSerkai(): Observable<KiragaSerkai[]> {
    return this.index$.pipe(
      switchMap(index => {
        if (index.length === 0) return of([]);
        
        const requests = index.map(item => 
          this.getKiragaSerkaiById(item.id)
        );
        
        return forkJoin(requests).pipe(
          map(results => results.filter(item => item !== null) as KiragaSerkai[])
        );
      })
    );
  }

  // Load available combinations dynamically from file system
  loadAvailableKiragaSerkaiDynamic(): Observable<KiragaSerkai[]> {
    return this.loadAllKiragaSerkai();
  }

  // Load only specific combinations (those that have JSON files) - fallback method
  loadAvailableKiragaSerkai(): Observable<KiragaSerkai[]> {
    const availableIds = [
      'budhan-guru', 'budhan-ketu', 'budhan-rahu', 'budhan-sani', 'budhan-sukran', 
      'chandra-budhan', 'chandra-guru', 'chandra-ketu', 'chandra-mangal', 'chandra-rahu', 
      'chandra-sani', 'chandra-sukran', 'guru-ketu', 'guru-rahu', 'guru-sani', 'guru-sukran', 
      'mangal-budhan', 'mangal-guru', 'mangal-ketu', 'mangal-rahu', 'mangal-sani', 'mangal-sukran', 
      'rahu-ketu', 'sani-ketu', 'sani-rahu', 'sukran-ketu', 'sukran-rahu', 'sukran-sani', 
      'surya-budhan', 'surya-chandra', 'surya-guru', 'surya-ketu', 'surya-mangal', 'surya-rahu', 
      'surya-sani', 'surya-sukran'
    ];

    const requests = availableIds.map(id => this.getKiragaSerkaiById(id));
    
    return forkJoin(requests).pipe(
      map(results => results.filter(item => item !== null) as KiragaSerkai[])
    );
  }

  searchKiragaSerkai(kiragaSerkaiList: KiragaSerkai[], searchTerm: string): KiragaSerkai[] {
    if (!searchTerm.trim()) {
      return kiragaSerkaiList;
    }

    const term = searchTerm.toLowerCase();
    return kiragaSerkaiList.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.englishName.toLowerCase().includes(term) ||
      item.planets.some(planet => planet.toLowerCase().includes(term)) ||
      item.description.toLowerCase().includes(term)
    );
  }
}
