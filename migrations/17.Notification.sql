create table notifications
(
    id     INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id  INT REFERENCES users (id) ON DELETE CASCADE,
    code varchar not null
);