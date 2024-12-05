import { ToggleSearchSectionDirective } from './toggle-search-section.directive';
import { ElementRef } from '@angular/core';

/**Per testare correttamente la direttiva ToggleSearchSectionDirective, come fatto in precedenza, dobbiamo gestire la dipendenza da ElementRef e assicurarci di verificare il comportamento della direttiva in base al valore di sectionIndex.

Ecco il codice di test aggiornato e completo: */
describe('ToggleSearchSectionDirective', () => {
  let directive: ToggleSearchSectionDirective;
  let mockElementRef: ElementRef;

  beforeEach(() => {
    // Crea un mock per ElementRef
    mockElementRef = new ElementRef(document.createElement('div'));
    directive = new ToggleSearchSectionDirective(mockElementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should emit clickOutside with sectionIndex when clicking outside', () => {
    const spy = spyOn(directive.clickOutside, 'emit');
    directive.sectionIndex = 1; // Imposta l'indice della sezione
    directive.onClick(document.createElement('div')); // Simula un click fuori dall'elemento
    expect(spy).toHaveBeenCalledWith(1); // Controlla che venga emesso l'indice corretto
  });

  it('should not emit clickOutside when clicking inside the element', () => {
    const spy = spyOn(directive.clickOutside, 'emit');
    directive.sectionIndex = 1; // Imposta l'indice della sezione
    directive.onClick(mockElementRef.nativeElement); // Simula un click dentro l'elemento
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not emit clickOutside if sectionIndex is null', () => {
    const spy = spyOn(directive.clickOutside, 'emit');
    directive.sectionIndex = null; // L'indice è null
    directive.onClick(document.createElement('div')); // Simula un click fuori dall'elemento
    expect(spy).not.toHaveBeenCalled(); // Non dovrebbe emettere nulla
  });
});

/**Dettagli della Soluzione:
Mock di ElementRef:

Creiamo un elemento mock con document.createElement('div') e lo passiamo al costruttore della direttiva.
Test con sectionIndex:

Impostiamo un valore per sectionIndex e verifichiamo che venga emesso correttamente quando si clicca fuori dall'elemento.
Controlliamo che l'evento non venga emesso se sectionIndex è null o se il clic avviene all'interno dell'elemento.
Spy su clickOutside.emit:

Usiamo spyOn per osservare l'output dell'evento e verificarne il comportamento.
Questo approccio assicura che la direttiva funzioni come previsto in tutti i casi principali. */
