start transaction;

alter table users
ADD column access_type varchar not null

commit;