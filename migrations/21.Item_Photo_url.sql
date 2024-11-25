start transaction;

ALTER TABLE items
ADD COLUMN photo varchar;

commit;