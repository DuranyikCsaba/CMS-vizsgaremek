import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private baseURL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // Helper method to get headers with the token
  private getHeaders() {
    const token = localStorage.getItem('token'); // Vedd ki a tokent a helyi tárolóból
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Átadjuk a tokent a kéréshez
    });
  }

  // Get posts
  getPosts(): Observable<{ error: boolean; message: string; data: any[] }> {
    return this.http.get<{ error: boolean; message: string; data: any[] }>(`${this.baseURL}/poszt`, { headers: this.getHeaders() });
  }

  // Add a new post
  addPost(post: any): Observable<{ error: boolean; message: string; data: any }> {
    return this.http.post<{ error: boolean; message: string; data: any }>(`${this.baseURL}/poszt`, post, { headers: this.getHeaders() });
  }

  // Get comments for a specific post
  getComments(postId: number): Observable<{ error: boolean; message: string; data: any[] }> {
    return this.http.get<{ error: boolean; message: string; data: any[] }>(`${this.baseURL}/komment/${postId}`, { headers: this.getHeaders() });
  }

  // Add a new comment
  addComment(comment: any): Observable<{ error: boolean; message: string; data: any }> {
    return this.http.post<{ error: boolean; message: string; data: any }>(`${this.baseURL}/komment`, comment, { headers: this.getHeaders() });
  }

  // Delete a post
  deletePost(postId: number): Observable<{ error: boolean; message: string }> {
    return this.http.delete<{ error: boolean; message: string }>(`${this.baseURL}/poszt/${postId}`, { headers: this.getHeaders() });
  }

  // Update a post
  updatePost(postId: number, post: any): Observable<{ error: boolean; message: string; data: any }> {
    return this.http.patch<{ error: boolean; message: string; data: any }>(`${this.baseURL}/poszt/${postId}`, post, { headers: this.getHeaders() });
  }

  // Delete a comment
  deleteComment(commentId: number): Observable<{ error: boolean; message: string }> {
    return this.http.delete<{ error: boolean; message: string }>(`${this.baseURL}/komment/${commentId}`, { headers: this.getHeaders() });
  }

  // Update a comment
  updateComment(commentId: number, comment: any): Observable<{ error: boolean; message: string; data: any }> {
    return this.http.patch<{ error: boolean; message: string; data: any }>(`${this.baseURL}/komment/${commentId}`, comment, { headers: this.getHeaders() });
  }

  getMoreComments(postId: number, offset: number, limit: number): Observable<{ error: boolean; message: string; data: any[] }> {
    return this.http.get<{ error: boolean; message: string; data: any[] }>(`${this.baseURL}/komment/${postId}?offset=${offset}&limit=${limit}`, { headers: this.getHeaders() });
}
}

