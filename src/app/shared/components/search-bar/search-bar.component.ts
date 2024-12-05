import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  // Schede di navigazione
  tabs = [
    { label: 'Acheter' },
    { label: 'Louer' },
    { label: 'Vendre' },
    { label: 'Construire' },
  ];

  activeTab = 1; // Indice della scheda attiva

  // Dati per il modulo "Acheter"
  acheterForm = {
    location: '',
  };

  // Dati per il modulo "Louer"
  louerForm = {
    budget: '',
    options: [
      { label: 'Maison', checked: false },
      { label: 'Appartement', checked: false },
      { label: 'Location', checked: false },
      { label: 'Terrain', checked: false },
      { label: 'Chambre', checked: false },
      { label: 'Bureau', checked: false },
      { label: 'Local commercial', checked: false },
      { label: 'Immeuble', checked: false },
      { label: 'Fonts de commerce', checked: false },
    ],
  };

  // Dati per il modulo "Vendre"
  vendreForm = {
    propertyType: '',
  };

  // Dati per il modulo "Construire"
  construireForm = {
    budget: '',
  };

  setActiveTab(index: number): void {
    this.activeTab = index; // Cambia la scheda attiva
  }

  onSubmit(tab: string): void {
    switch (tab) {
      case 'Acheter':
        console.log('Dati del modulo "Acheter":', this.acheterForm);
        break;
      case 'Louer':
        console.log('Dati del modulo "Louer":', this.louerForm);
        break;
      case 'Vendre':
        console.log('Dati del modulo "Vendre":', this.vendreForm);
        break;
      case 'Construire':
        console.log('Dati del modulo "Construire":', this.construireForm);
        break;
    }
    alert(`Formulaire "${tab}" envoyé!`);
  }
}
