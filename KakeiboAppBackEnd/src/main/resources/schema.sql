drop table if exists balance_history;
drop table if exists kakeibo;
drop table if exists category;
drop table if exists in_out;
drop table if exists group_permissions;

drop table if exists users;

--ユーザー情報
create table users(
	id serial primary key,
	username varchar(20) unique,
	password varchar(60),
	payday integer,
	roles varchar(20)
);

--個人収支の公開制御
create table group_permissions(
	owner_user_id serial,
	viewer_user_id serial
);

--個々人の収支テーブル
create table in_out(
	id Integer primary key,
	in_out varchar(3) unique
);

--カテゴリー一覧テーブル
CREATE TABLE category(
	id serial primary key,
	category varchar(20) unique,
	in_out varchar(3),
	sort_order serial,
	foreign key(in_out) references in_out(in_out)
);

--家計簿本体のテーブル
CREATE TABLE kakeibo(
	--入力ID
	id serial PRIMARY KEY,
	--入力ユーザー名
	username varchar(20),
	--日付
	trade_date date,
	--どんな分野の入出金か
	category_id integer,
	--金額
	amount integer,
	--記録事項
	memo text,
	--自分で自分をほめたくなることか。0でNO、1でYES
	homeru integer default 0,
	--どのグループの文脈に所属するか
	
	--ソフトデリートinteger。デフォルトは1(非削除)。9で削除フラグ
	soft_delete Integer default 1 check(soft_delete in(1, 9)),
	
	created_at timestamp without time zone default current_timestamp,
	updated_at timestamp without time zone default current_timestamp,
	foreign key(category_id) references category(id),
	foreign key(username) references users(username)
);

create table balance_history(
	year_month char(7),
	balance integer
);