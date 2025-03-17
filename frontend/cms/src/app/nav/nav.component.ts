import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userName: string | null = null;
  userType: number | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.isLoggedIn().subscribe(
        (loggedIn: boolean) => {
          this.isLoggedIn = loggedIn;
          if (loggedIn) {
            this.loadUserData(); 
          } else {
            this.userName = null;
            this.userType = null; 
          }
        }
      )
    );

    this.subscription.add(
      this.userService.userUpdated$.subscribe(() => {
        this.loadUserData();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

  loadUserData(): void {
    const user = this.authService.getCurrentUser ();
    this.userName = user ? user.nev : null;
    this.userType = user ? user.tipus : null;
  }

  logout(): void {
    this.authService.logout();
  }
}