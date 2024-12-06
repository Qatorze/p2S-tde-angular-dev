import { Component } from '@angular/core';
import {
  faDoorOpen,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  standalone: false,

  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  faDoorOpen = faDoorOpen;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  cards = [
    {
      tag: 'Terrains à bâtir',
      title: 'Votre terrain à bâtir',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      tag: 'Terrains à bâtir',
      title: 'Votre terrain à bâtir',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      tag: 'Terrains à bâtir',
      title: 'Votre terrain à bâtir',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      tag: 'Terrains à bâtir',
      title: 'Votre terrain à bâtir',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      tag: 'Coup de cœur',
      title: 'Trouvez le logement de vos rêves',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec odio non lacus fringilla dignissim quis vel diam. Integer convallis purus odio, vitae semper leo posuere ac.',
    },
  ];
}
