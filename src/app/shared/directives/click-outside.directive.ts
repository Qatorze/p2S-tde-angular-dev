import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: false,
})
export class ClickOutsideDirective {
  // Événement qui sera déclenché lorsque l'utilisateur clique à l'extérieur
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement): void {
    const clickedInside = this.el.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}

// Cette directive écoute les clics sur tout le document et vérifie si le clic a eu lieu en dehors de l'élément auquel elle est appliquée.
