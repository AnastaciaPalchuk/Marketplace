start transaction;

ALTER TABLE items
ALTER COLUMN count TYPE INTEGER
USING count::INTEGER

commit;