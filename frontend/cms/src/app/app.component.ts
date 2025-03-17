import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';

  showButton: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY > 350;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
