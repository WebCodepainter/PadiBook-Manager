export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
  downloadable: boolean;
  pdfUrl?: string;
}
