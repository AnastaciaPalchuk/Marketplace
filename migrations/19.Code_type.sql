start transaction;

ALTER TABLE notifications
ADD COLUMN type_of_notice varchar;

commit;