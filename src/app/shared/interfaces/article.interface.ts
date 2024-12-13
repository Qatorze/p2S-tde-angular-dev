export interface ArticleInterface {
  id?: number; // Facultatif car peut etre ommit lors de la création
  title: string;
  content: string;
  imageUrls: string[];
  creationDate: string; // ISO 8601 string format
  author: string;
}
