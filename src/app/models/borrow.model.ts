export interface Borrow {
  id: number;
  userId: number;
  bookId: number;
  borrowDate: string;
  dueDate: string;
  returned: boolean;
}
