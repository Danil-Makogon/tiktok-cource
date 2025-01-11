import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-numbers',
  imports: [CommonModule],
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent implements AfterViewInit {
  @ViewChild('numbersSection', { static: false }) numbersSection!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.animateNumbersOnScroll();
  }

  animateNumbersOnScroll() {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounting();
          observer.unobserve(entry.target); // Отключаем наблюдатель после выполнения анимации
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.numbersSection.nativeElement);
  }

  startCounting() {
    const counters = document.querySelectorAll('.num');

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-value') || '0', 10);
      let current = 0;
      const increment = target / 100; // Скорость анимации

      const updateCount = () => {
        current += increment;
        if (current < target) {
          (counter as HTMLElement).innerText = Math.floor(current).toString();
          requestAnimationFrame(updateCount);
        } else {
          (counter as HTMLElement).innerText = target.toString();
        }
      };

      updateCount();
    });
  }
}
