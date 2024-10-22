start transaction;

alter table items
ADD column count varchar not null

commit;