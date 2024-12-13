import { PropertyCategoryEnum } from '../enums/property-category.enum';
import { PropertyTypeEnum } from '../enums/property-type.enum';

export interface PropertyInterface {
  id?: number; // Facultatif car peut etre ommit lors de la création
  title: string;
  description: string;
  type: PropertyTypeEnum; // Enum
  category: PropertyCategoryEnum; // Enum
  price: number;
  location?: string; // Facultatif
  city?: string; // Facultatif
  neighborhood?: string; // Facultatif
  country?: string; // Facultatif
  area?: number; // Facultatif
  rooms?: number; // Facultatif
  registrationDate: string; // ISO 8601 string format
  imageUrls: string[];
}
