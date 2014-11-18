INSERT INTO users (user_first_name, user_last_name, user_date_created, user_wallgreens_token, user_wallgreens_token_expires)
VALUES ('daniel', 'rasmuson',now(), 'sasdfas23423423', now());

CREATE TABLE users
(
user_id bigserial primary key,
user_first_name varchar(20) NOT NULL,
user_last_name varchar(20) NOT NULL,
user_date_created timestamp default NULL,
user_wallgreens_token varchar(70),
user_wallgreens_token_expires date
);
