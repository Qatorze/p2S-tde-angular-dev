import { ClickOutsideModalDirective } from './click-outside-modal.directive';
import { ElementRef } from '@angular/core';

describe('ClickOutsideModalDirective', () => {
  let directive: ClickOutsideModalDirective;
  let mockElementRef: ElementRef;

  beforeEach(() => {
    // Crea un mock per ElementRef
    mockElementRef = new ElementRef(document.createElement('div'));
    directive = new ClickOutsideModalDirective(mockElementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should emit clickOutside when clicking outside the element', () => {
    const spy = spyOn(directive.clickOutside, 'emit');
    // Simula un click fuori dall'elemento
    directive.onClick(document.createElement('div'));
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit clickOutside when clicking inside the element', () => {
    const spy = spyOn(directive.clickOutside, 'emit');
    // Simula un click dentro l'elemento
    directive.onClick(mockElementRef.nativeElement);
    expect(spy).not.toHaveBeenCalled();
  });
});

/** Il problema nel file di test è che ClickOutsideModalDirective richiede un'istanza di ElementRef per funzionare correttamente. Nel tuo test, però, stai creando un'istanza della direttiva senza passare un ElementRef, il che causa un errore.

Perché succede?
La direttiva dipende da un oggetto ElementRef che Angular fornisce automaticamente nel contesto di un'applicazione reale. Nei test, questa dipendenza non viene iniettata automaticamente, quindi bisogna simularla.

Soluzione
Puoi risolvere il problema fornendo manualmente un mock di ElementRef. Di seguito trovi un esempio di test corretto:

Dettagli della soluzione:
Mock di ElementRef: Creiamo un'istanza mock di ElementRef con un elemento HTML generico (document.createElement('div')).
Iniezione manuale: Passiamo il mock al costruttore della direttiva.
Test del comportamento: Simuliamo i clic dentro e fuori dall'elemento per verificare che il comportamento della direttiva sia corretto.
Questi cambiamenti assicurano che la direttiva venga testata in modo isolato senza errori di dipendenza.
*/
