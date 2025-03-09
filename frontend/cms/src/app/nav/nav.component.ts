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
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    // Figyelj a bejelentkezési állapotra
    this.subscription.add(
      this.authService.isLoggedIn().subscribe(
        (loggedIn: boolean) => {
          this.isLoggedIn = loggedIn;
          if (loggedIn) {
            this.loadUserData(); // Betölti a felhasználói adatokat
          } else {
            this.userName = null;
          }
        }
      )
    );

    // Figyelj a felhasználói adatok frissítésére
    this.subscription.add(
      this.userService.userUpdated$.subscribe(() => {
        this.loadUserData(); // Újratölti a felhasználói adatokat
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Feliratkozások lemondása
  }

  loadUserData(): void {
    const user = this.authService.getCurrentUser ();
    this.userName = user ? user.nev : null; // Beállítja a felhasználó nevét
  }

  logout(): void {
    this.authService.logout();
  }
}