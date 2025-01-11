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

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.pageX - this.carousel.nativeElement.offsetLeft;
    this.scrollLeft = this.carousel.nativeElement.scrollLeft;
    this.carousel.nativeElement.style.cursor = 'grabbing';
    this.stopMomentumScroll();
  }

  drag(event: MouseEvent) {
    if (!this.isDragging) return;
    const x = event.pageX - this.carousel.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    this.carousel.nativeElement.scrollLeft = this.scrollLeft - walk;
    this.velocity = walk; // Сохраняем скорость движения
  }

  endDrag() {
    this.isDragging = false;
    this.carousel.nativeElement.style.cursor = 'grab';
    this.startMomentumScroll();
  }

  startTouch(event: TouchEvent) {
    this.isDragging = true;
    this.startX = event.touches[0].pageX - this.carousel.nativeElement.offsetLeft;
    this.scrollLeft = this.carousel.nativeElement.scrollLeft;
    this.velocity = 0;
    this.stopMomentumScroll();
  }

  moveTouch(event: TouchEvent) {
    if (!this.isDragging) return;
    const x = event.touches[0].pageX - this.carousel.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    this.carousel.nativeElement.scrollLeft = this.scrollLeft - walk;
    this.velocity = walk; // Сохраняем скорость движения
  }

  endTouch() {
    this.isDragging = false;
    this.startMomentumScroll();
  }

  // Функция для инерционной прокрутки
  startMomentumScroll() {
    if (Math.abs(this.velocity) < 1) return;

    this.velocity *= 0.95; // Постепенно уменьшаем скорость
    this.carousel.nativeElement.scrollLeft -= this.velocity;

    this.animationFrame = requestAnimationFrame(() => this.startMomentumScroll());
  }

  stopMomentumScroll() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
}
