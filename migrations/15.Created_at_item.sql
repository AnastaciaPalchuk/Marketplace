start transaction;

alter table items
ADD column created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

commit;