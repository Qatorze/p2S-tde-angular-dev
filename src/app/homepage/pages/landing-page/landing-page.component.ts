import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: false,

  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  buttons = [1, 2, 3, 4];
  sections = ['div1', 'div2', 'div3', 'div4'];
  activeIndex = 0; // Indice attivo iniziale

  onButtonClick(index: number): void {
    this.activeIndex = index; // Aggiorna l'indice attivo
  }

  onOutsideClick(index: number): void {
    if (this.activeIndex === index) {
      this.activeIndex = -1; // Nascondi la sezione corrente
    }
  }
}
