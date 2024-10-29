start transaction;

alter table users
ADD column is_email_verified BOOLEAN DEFAULT FALSE;

commit;