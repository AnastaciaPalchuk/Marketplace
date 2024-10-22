start transaction;

alter table users
ADD column surname varchar not null

commit;