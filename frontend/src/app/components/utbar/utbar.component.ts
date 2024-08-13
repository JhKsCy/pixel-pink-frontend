import { Component, ElementRef, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-utbar',
  standalone: true,
  imports: [],
  templateUrl: './utbar.component.html',
  styleUrl: './utbar.component.css'
})
export class UtbarComponent {
  @ViewChild('utilityBarText') utilityBarText!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const textWidth = this.utilityBarText.nativeElement.offsetWidth;
    const duration = textWidth / 20;
    this.renderer.setStyle(this.utilityBarText.nativeElement, 'animationDuration', `${duration}s`);
  }
}
