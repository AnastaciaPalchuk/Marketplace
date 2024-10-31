start transaction;

ALTER TABLE notifications
ADD COLUMN created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;

commit;