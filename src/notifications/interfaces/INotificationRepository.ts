export const NotificationRepositoryToken = Symbol(
  "NotificationRepositoryToken"
);

export interface INotificationRepository {
  getCode: (user_id: number) => Promise<{
    id: number;
    user_id: number;
    code: number;
    type_of_notice: string;
    expires_at: number;
    created_at: number;
  }>;
  addEmailVerificationCode: (code: number, id: number) => Promise<any>;
  addPasswordResetCode: (code: number, id: number) => Promise<any>;
  findUserId: (code: number) => Promise<number>;
}
