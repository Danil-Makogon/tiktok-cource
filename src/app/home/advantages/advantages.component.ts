import { Component, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-advantages',
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.css']
})
export class AdvantagesComponent implements AfterViewInit {
  private lastScrollY = 0;
  private cards: NodeListOf<Element> | null = null;

  ngAfterViewInit(): void {
    this.cards = document.querySelectorAll('.card');
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.cards) return;

    const currentScrollY = window.scrollY;

    this.cards.forEach((card, index) => {
      if (currentScrollY > this.lastScrollY) {
        // Прокрутка вниз - переворачиваем
        card.classList.add('flipped');
      } else {
        // Прокрутка вверх - возвращаем обратно
        card.classList.remove('flipped');
      }
    });

    this.lastScrollY = currentScrollY;
  }
}
