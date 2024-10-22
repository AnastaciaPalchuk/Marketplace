start transaction;

alter table cart
ADD column count varchar not null

commit;