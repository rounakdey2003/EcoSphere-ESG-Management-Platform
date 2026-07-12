import type { NotificationType } from './notificationType';

export interface Notification {
  id: number;
  employeeId: number;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
