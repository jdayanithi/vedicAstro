import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createNewPost(data:any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/posts`, data );
  }

  getAllPosts(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/posts` );
  }

  getPostById(postId:number): Observable<any>{
    return this.http.get(`${environment.apiUrl}/posts/${postId}` );
  }

  likePost(postId:number): Observable<any>{
    return this.http.put(`${environment.apiUrl}/posts/${postId}/like`, {} );
  }
  searchByName(name:string): Observable<any>{
    return this.http.get(`${environment.apiUrl}/posts/search/${name}` );
  }
}
