export interface Notification {
  id: number;
  userId: number;
  operation: 'BORROW' | 'RESERVATION' | 'RETURN';
  userName: string;
  date: string;
}
