start transaction;

create table items
(
    id     INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name    varchar not null,
    category_id INT REFERENCES categories (id) ON DELETE CASCADE
);

commit;