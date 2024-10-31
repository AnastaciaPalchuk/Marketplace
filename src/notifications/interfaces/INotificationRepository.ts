export const NotificationRepositoryToken = Symbol(
  "NotificationRepositoryToken"
);

export interface INotificationRepository {
  getCode: (user_id: number, type_of_notice: string) => Promise<{
    id: number;
    user_id: number;
    code: number;
    type_of_notice: string;
    expires_at: number;
    created_at: number;
  }>;
  addCode: (code: number, id: number, type: string) => Promise<any>;
  checkCode: (id: number, code: number) => Promise<{id: number, code: number, user_id: number, created_at: number}>;
}
