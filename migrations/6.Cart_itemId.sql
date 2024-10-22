start transaction;

alter table cart
ADD column item_id varchar not null

commit;