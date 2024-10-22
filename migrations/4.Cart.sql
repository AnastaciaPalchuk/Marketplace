start transaction;

create table cart
(
    id     INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id    INT REFERENCES users (id) ON DELETE CASCADE
);

commit;