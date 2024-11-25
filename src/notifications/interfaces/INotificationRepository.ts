export const NotificationRepositoryToken = Symbol(
  "NotificationRepositoryToken"
);

export interface INotificationRepository {
  getCode: (user_id: number, type_of_notice: string) => Promise<any>;
  addCode: (code: number, id: number, type: string) => Promise<any>;
  checkCode: (id: number, code: number) => Promise<any>;
  deleteCode: (code: number) => Promise<any>;
}
