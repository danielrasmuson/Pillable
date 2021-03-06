CREATE TABLE users
(
user_id bigserial primary key,
user_first_name varchar(20) NOT NULL,
user_last_name varchar(20) NOT NULL,
user_email varchar(55) NOT NULL,
user_password varchar(55) NOT NULL,
user_date_created timestamp default NULL,
user_session varchar(70),
user_session_expires varchar(70),
user_wallgreens_token varchar(70),
user_wallgreens_token_expires date
);

CREATE TABLE userHealth 
(
userHealth_id bigserial primary key,
userHealth_weight integer NOT NULL,
userHealth_blood_pressure integer NOT NULL,
userHealth_blood_glucose integer NOT NULL,
userHealth_user_id bigserial NOT NULL
);

CREATE TABLE pill (
pill_id bigserial primary key,
pill_name varchar(50) NOT NULL,
pill_desc text NOT NULL
);

CREATE TABLE story (
story_id bigserial primary key,
story_title varchar(50) NOT NULL,
story_body text NOT NULL,
story_date_created timestamp default NULL,
story_difficulty integer,
story_weight_change integer,
story_mood_change integer,
story_satisfaction integer,
story_user_id bigserial NOT NULL,
story_pill_id bigserial NOT NULL
);

CREATE TABLE comment 
(
comment_id bigserial primary key,
comment_text text NOT NULL,
comment_date_created timestamp default NULL,
comment_story_id bigserial NOT NULL,
comment_user_id bigserial NOT NULL
);