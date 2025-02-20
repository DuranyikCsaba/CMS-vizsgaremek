import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { Post, Komment } from '../models/forum.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  posts: Post[] = [];
  newPostContent: string = '';
  newCommentContent: string = '';
  selectedPostId: number | null = null;
  editingCommentId: number | null = null; // Az éppen szerkesztett komment ID-ja
  editingPostId: number | null = null; // Az éppen szerkesztett poszt ID-ja
  showAllComments: { [key: number]: boolean } = {}; // A posztokhoz tartozó kommentek megjelenítése

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.forumService.getPosts().subscribe(
      response => {
        if (!response.error) {
          this.posts = response.data.map(post => ({
            ...post,
            kommentek: post.kommentek || [] // A kommentek aliasa
          }));
        } else {
          console.error('Hiba a posztok betöltésekor:', response.message);
        }
      },
      error => {
        console.error('Hiba történt a posztok lekérésekor:', error);
      }
    );
  }

  addPost(): void {
    if (!this.newPostContent.trim()) {
      console.error('A tartalom nem lehet üres!');
      return;
    }

    const newPost = { tartalom: this.newPostContent };
    this.forumService.addPost(newPost).subscribe(
      response => {
        if (!response.error) {
          this.posts.unshift(response.data); // Új poszt a lista elejére
          this.newPostContent = ''; // Reset the input field
        } else {
          console.error('Hiba történt az új poszt létrehozásakor:', response.message);
        }
      },
      error => {
        console.error('Hiba történt az új poszt létrehozásakor:', error);
      }
    );
  }

  deletePost(postId: number): void {
    this.forumService.deletePost(postId).subscribe(
      response => {
        if (!response.error) {
          this.posts = this.posts.filter(post => post.id !== postId);
        } else {
          console.error('Hiba történt a poszt törlésekor:', response.message);
        }
      },
      error => {
        console.error('Hiba történt a poszt törlésekor:', error);
      }
    );
  }

  updatePost(postId: number): void {
    const postToUpdate = this.posts.find(post => post.id === postId);
    if (postToUpdate) {
      this.editingPostId = postId; // Beállítjuk az éppen szerkesztett poszt ID-ját
      this.newPostContent = postToUpdate.tartalom; // A poszt tartalmát beállítjuk a szöveges mezőbe
    }
  }

  saveUpdatedPost(postId: number): void {
    const updatedPost = { tartalom: this.newPostContent };
    this.forumService.updatePost(postId, updatedPost).subscribe(
      response => {
        if (!response.error) {
          const index = this.posts.findIndex(post => post.id === postId);
          if (index !== -1) {
            this.posts[index] = response.data; // Frissítjük a posztot a listában
          }
          this.newPostContent = ''; // Reset the input field
          this.editingPostId = null; // Visszaállítjuk az éppen szerkesztett poszt ID-ját
        } else {
          console.error('Hiba történt a poszt módosításakor:', response.message);
        }
      },
      error => {
        console.error('Hiba történt a pos zt módosításakor:', error);
      }
    );
  }

  addComment(postId: number): void {
    if (!this.newCommentContent.trim()) {
      console.error('A komment tartalma nem lehet üres!');
      return;
    }

    const newComment = { posztId: postId, kommentTartalom: this.newCommentContent };
    this.forumService.addComment(newComment).subscribe(
      response => {
        if (!response.error) {
          const post = this.posts.find(p => p.id === postId);
          if (post) {
            if (!post.kommentek) {
              post.kommentek = []; // Inicializáljuk a kommentek tömböt
            }
            post.kommentek.push(response.data); // Hozzáadjuk az új kommentet
          } else {
            console.error('A poszt nem található a listában.');
          }
          this.newCommentContent = ''; // Reset the input field
        } else {
          console.error('Hiba történt a komment létrehozásakor:', response.message);
        }
      },
      error => {
        console.error('Hiba történt a komment létrehozásakor:', error);
      }
    );
  }

  updateComment(commentId: number): void {
    const commentToUpdate = this.posts.flatMap(post => post.kommentek || []).find(comment => comment.id === commentId);
    if (commentToUpdate) {
      this.editingCommentId = commentId; // Beállítjuk az éppen szerkesztett komment ID-ját
      this.newCommentContent = commentToUpdate.kommentTartalom; // A komment tartalmát beállítjuk a szöveges mezőbe
    }
  }

  saveUpdatedComment(commentId: number): void {
    const updatedComment = { kommentTartalom: this.newCommentContent };
    this.forumService.updateComment(commentId, updatedComment).subscribe(
      response => {
        if (!response.error) {
          this.posts.forEach(post => {
            if (post.kommentek) {
              const index = post.kommentek.findIndex(c => c.id === commentId);
              if (index !== -1) {
                post.kommentek[index] = response.data;
              }
            }
          });
          this.newCommentContent = '';
          this.editingCommentId = null;
        } else {
          console.error('Hiba történt a komment módosításakor:', response.message);
        }
      },
      error => {
        console.error('Hiba történt a komment módosításakor:', error);
      }
    );
  }

  deleteComment(commentId: number): void {
    this.forumService.deleteComment(commentId).subscribe(
      response => {
        if (!response.error) {
          this.posts.forEach(post => {
            if (post.kommentek) {
              post.kommentek = post.kommentek.filter(k => k.id !== commentId);
            }
          });
        } else {
          console.error('Hiba történt a komment törlésekor:', response.message);
        }
      },
      error => {
        console.error('Hiba történt a komment törlésekor:', error);
      }
    );
  }

  toggleCommentInput(postId: number): void {
    this.selectedPostId = this.selectedPostId === postId ? null : postId;
  }

  toggleShowAllComments(postId: number): void {
    this.showAllComments[postId] = !this.showAllComments[postId];
  }
}