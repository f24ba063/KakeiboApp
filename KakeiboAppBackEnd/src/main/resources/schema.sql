drop table if exists balance_history;
drop table if exists kakeibo;
drop table if exists category;
drop table if exists in_out;


--入出テーブル
create table in_out(
	id Integer primary key,
	in_out varchar(3) unique
);

--カテゴリー一覧テーブル
CREATE TABLE category(
	id serial primary key,
	category varchar(20),
	in_out varchar(3),
	sort_order integer not null unique,
	foreign key(in_out) references in_out(in_out)
);

--家計簿本体のテーブル
CREATE TABLE kakeibo(
	--入力ID
	id serial PRIMARY KEY,
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
	
	--ソフトデリートinteger。デフォルトは1(非削除)。9で削除フラグ
	soft_delete Integer default 1 check(soft_delete in(1, 9)),
	
	created_at timestamp without time zone default current_timestamp,
	updated_at timestamp without time zone default current_timestamp,
	foreign key(category_id) references category(id)
);

create table balance_history(
	year_month char(7),
	balance integer
);