start transaction;

ALTER TABLE cart
ALTER COLUMN count TYPE INTEGER
USING count::INTEGER

commit;