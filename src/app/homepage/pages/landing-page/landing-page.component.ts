import { Component } from '@angular/core';
import {
  faDoorOpen,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faHouse,
  faBuilding,
  faStore,
  faLandmark,
  faHotel,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  standalone: false,

  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  backgroundImage =
    'https://images.unsplash.com/photo-1519354754184-e1d9c46182c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  // Icons
  faHouse = faHouse; // Maison
  faBuilding = faBuilding; // Immeuble
  faStore = faStore; // Fond de commerce
  faLandmark = faLandmark; // Terrain
  faHotel = faHotel; // Appartement
  faWarehouse = faWarehouse; // Local commercial
  faDoorOpen = faDoorOpen;
  faHeart = faHeart;
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
    {
      tag: 'Coup de cœur',
      title: 'Trouvez le logement de vos rêves',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec odio non lacus fringilla dignissim quis vel diam. Integer convallis purus odio, vitae semper leo posuere ac.',
    },
  ];

  articles = [
    {
      title: 'Les meilleures stratégies pour investir dans l’immobilier',
      description:
        'Découvrez les astuces et conseils pour maximiser vos investissements immobiliers.',
      image: 'https://via.placeholder.com/300x200', // URL di immagine fittizia
    },
    {
      title: 'Les tendances actuelles du marché immobilier sous l’équateur',
      description:
        'Un aperçu des dernières tendances et opportunités dans le secteur.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Comment choisir le bon type de propriété',
      description:
        'Les clés pour choisir entre maison, appartement ou local commercial.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Les avantages fiscaux pour les propriétaires en 2024',
      description:
        'Découvrez les aides et les réductions fiscales disponibles cette année.',
      image: 'https://via.placeholder.com/300x200',
    },
  ];
}
