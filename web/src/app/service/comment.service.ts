import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(postId:number, postedBy: string, content:string) :Observable<any>{
    const params= {
      postId: postId,
      postedBy: postedBy
    }

    return this.http.post<any>(`${environment.apiUrl}/comments/create`, content, {params});
  }

  getAllCommentsByPost(postId:number): Observable<any>{
    return this.http.get(`${environment.apiUrl}/comments/${postId}`);
  }
}
