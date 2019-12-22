BEGIN TRANSACTION;

insert into users (name, email, passwordenc, joined) values ('seth', 'seth@gmail.com', '$2a$10$JdE6RuPJ/KaAWU.sQNAKDOo2.z0G1L4eTQm.uUHNZzqybqhPIH5fe', '2018-12-12');
insert into users (name, email, passwordenc, joined) values ('roger', 'roger@gmail.com', '$2a$10$JdE6RuPJ/KaAWU.sQNAKDOo2.z0G1L4eTQm.uUHNZzqybqhPIH5fe', '2018-12-11');

COMMIT;