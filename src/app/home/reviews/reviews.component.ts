import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-reviews',
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements AfterViewInit {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  gifs: string[] = [
    '/images/gifs/streamer1.gif',
    '/images/gifs/streamer2.gif',
    '/images/gifs/streamer3.gif',
    '/images/gifs/streamer4.gif',
    '/images/gifs/streamer5.gif',
    '/images/gifs/streamer6.gif'
  ];

  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  velocity = 0;
  animationFrame: number | null = null;

  ngAfterViewInit() {
    this.carousel.nativeElement.scrollLeft = 0;
  }

  startDrag(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startX = this.getEventX(event) - this.carousel.nativeElement.offsetLeft;
    this.scrollLeft = this.carousel.nativeElement.scrollLeft;
    this.carousel.nativeElement.style.cursor = 'grabbing';
    this.carousel.nativeElement.style.scrollBehavior = 'auto'; // Отключаем smooth scroll
    this.stopMomentumScroll();
  }

  drag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    const x = this.getEventX(event) - this.carousel.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2.5; // Увеличиваем множитель скорости
    this.carousel.nativeElement.scrollLeft = this.scrollLeft - walk;
    this.velocity = walk;
  }

  endDrag() {
    this.isDragging = false;
    this.carousel.nativeElement.style.cursor = 'grab';
    this.carousel.nativeElement.style.scrollBehavior = 'smooth'; // Включаем smooth scroll после окончания свайпа
    this.startMomentumScroll();
  }

  startTouch(event: TouchEvent) {
    this.startDrag(event);
  }

  moveTouch(event: TouchEvent) {
    this.drag(event);
  }

  endTouch() {
    this.endDrag();
  }

  startMomentumScroll() {
    if (Math.abs(this.velocity) < 1) return;

    this.velocity *= 0.95;
    this.carousel.nativeElement.scrollLeft -= this.velocity;

    this.animationFrame = requestAnimationFrame(() => this.startMomentumScroll());
  }

  stopMomentumScroll() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  getEventX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent ? event.pageX : event.touches[0].pageX;
  }
}
