import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.css'],
  standalone: true
})
export class ScrollTopComponent {
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    console.log('Window scrolled'); // Agrega este log para verificar
    const scrollToTopBtn = document.querySelector('.scroll-to-top') as HTMLElement;
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

