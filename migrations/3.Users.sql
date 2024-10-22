start transaction;

create table users
(
    id     INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name    varchar not null,
    email    varchar not null,
    password varchar not null
);

commit;