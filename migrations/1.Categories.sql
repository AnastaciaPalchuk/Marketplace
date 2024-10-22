start transaction;

create table categories
(
    id     INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name    varchar not null
);

commit;