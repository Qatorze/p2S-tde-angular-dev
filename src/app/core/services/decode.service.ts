import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

//Service per decodificare tutte le proprietà di un oggetto
export class DecodeService {
  constructor() {}

  /**
   * Decodifica tutte le proprietà di un oggetto.
   * @param obj Oggetto da decodificare.
   * @returns Un nuovo oggetto con tutte le stringhe decodificate.
   */
  decodeObjectProperties(obj: any): any {
    if (!obj || typeof obj !== 'object') {
      return obj; // Ritorna il valore originale se non è un oggetto
    }

    const decodedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (typeof value === 'string') {
          decodedObj[key] = this.safeDecodeURIComponent(value);
        } else if (typeof value === 'object' && value !== null) {
          decodedObj[key] = this.decodeObjectProperties(value); // Decodifica ricorsiva
        } else {
          decodedObj[key] = value;
        }
      }
    }
    return decodedObj;
  }

  /**
   * Decodifica una stringa utilizzando decodeURIComponent in modo sicuro.
   * @param value La stringa da decodificare.
   * @returns La stringa decodificata.
   */
  private safeDecodeURIComponent(value: string): string {
    try {
      return decodeURIComponent(value);
    } catch (error) {
      console.error(`Errore nella decodifica: "${value}"`, error);
      return value; // Ritorna il valore originale in caso di errore
    }
  }
}
