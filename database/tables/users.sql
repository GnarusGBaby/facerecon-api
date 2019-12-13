BEGIN TRANSACTION;

create table users
(
    id serial primary key,
    name varchar(100),
    email text unique not null,
    passwordenc varchar(100) not null,
    entries bigint default 0,
    joined timestamp not null
);

COMMIT;