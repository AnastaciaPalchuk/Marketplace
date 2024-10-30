start transaction;

ALTER TABLE notifications
ADD COLUMN expires_at TIMESTAMPTZ,
ADD COLUMN created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;

commit;