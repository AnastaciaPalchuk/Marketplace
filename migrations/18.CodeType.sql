start transaction;

ALTER TABLE notifications
ALTER COLUMN code TYPE INTEGER
USING code::INTEGER

commit;