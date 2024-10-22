start transaction;

ALTER TABLE cart
ALTER COLUMN item_id TYPE INTEGER
USING item_id::INTEGER

commit;