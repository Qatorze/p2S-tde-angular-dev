import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutsideDirective]',
  standalone: false,
})
export class ClickOutsideDirectiveDirective {
  @Input() sectionIndex: number | null = null; // Aggiungi un input per l'indice della sezione
  @Output() clickOutside = new EventEmitter<number>();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement): void {
    const clickedInside = this.el.nativeElement.contains(targetElement);
    if (!clickedInside && this.sectionIndex !== null) {
      this.clickOutside.emit(this.sectionIndex); // Passa l'indice della sezione
    }
  }
}
