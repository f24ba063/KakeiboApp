--usersテーブルにユーザー登録
insert into users(username, password, payday, roles)
values('user1','$2a$10$GUE17t8HDZap/Z0AU0IR8uozJRaxzUK.1MO1M2KsbEh43d2.niOLm', 
12, 'ROLE_ADMIN');

insert into users(username, password, payday, roles)
values('user2','$2a$10$GUE17t8HDZap/Z0AU0IR8uozJRaxzUK.1MO1M2KsbEh43d2.niOLm', 
24, 'ROLE_USER');

--IN-OUTテーブルにin、outの挿入

insert into in_out(id, in_out)
values(1, 'IN');

insert into in_out(id, in_out)
values(2, 'OUT');

--カテゴリーテーブルにカテゴリーの挿入
--給料（収入）
insert into category(id, category, in_out, sort_order)
values (1, '給料', 'IN', 1);


--定期外収入（収入）
insert into category(id, category, in_out, sort_order)
values (2, '臨時収入', 'IN', 2);

--貯金の取り崩し
insert into category(id, category, in_out, sort_order)
values (3, '繰り越し',  'IN', 3);

--本業以外の収入
insert into category(id, category, in_out, sort_order)
values (4, '副業', 'IN', 4);

--購入品の返金
insert into category(id, category, in_out, sort_order)
values (5, '返金', 'IN', 5);

--食費
insert into category(id, category, in_out, sort_order)
values (11, '食費', 'OUT', 11);

--電気＆ガス
insert into category(id, category, in_out, sort_order)
values (12, '電気・ガス', 'OUT', 12);

--電話
insert into category(id, category, in_out, sort_order)
values (13, '電話料金', 'OUT', 13);

--サブスク・会員費
insert into category(id, category, in_out, sort_order)
values (14, '保険', 'OUT', 14);

--一般雑貨
insert into category(id, category, in_out, sort_order)
values (15, '雑貨', 'OUT', 15);

--預金
insert into category(id, category, in_out, sort_order)
values (16, '送金', 'OUT', 16);

--可処分所得
insert into category(id, category, in_out, sort_order)
values (17, '娯楽', 'OUT', 17);

insert into category(id, category, in_out, sort_order)
values (18, '交通', 'OUT', 18);

insert into category(id, category, in_out, sort_order)
values (19, 'サブスク', 'OUT', 19);


--家計簿に各月10個程度ずつ、7か月分

insert into kakeibo(trade_date, category_id, amount, memo, homeru, username)
values('2025-7-11',  12, 20,  'おやつ', 1, 'user1');
--2025年8月
insert into kakeibo(trade_date, category_id, amount, memo, homeru, username)
values('2025-8-1',  11, 5800,  '2025年8月食費', 1, 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-8-4',  15,  2400,  '雑貨（ケーブル）', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-8-7',  14,  23500,  'サブスク（会員費）', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-8-8',  11,  5800,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-8-11',  1,  180000,  '給与', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-8-12',  11,  18000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-8-12',  16,  30000,  '実家へ振込', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-8-15', 13 , 3500 ,  '電話代', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-8-18',  11,  5800,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-8-20', 12 , 9800 ,  '電気ガス', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-8-27',  11,  7800,  '食費', 'user1');

----2025年9月
insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-9-1',  11,  5900,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-9-4',  15,  2400,  '雑貨（ケーブル）', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-9-7',  14,  23500,  'サブスク（会員費）', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-9-8',  11,  5900,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-9-11',  1,  169000,  '給与', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-9-12',  11,  19000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-9-12',  16,  30000,  '実家へ振込', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-9-15', 13 , 3500 ,  '電話代', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-9-18',  11,  5900,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-9-20', 12 , 9000 ,  '電気ガス', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-9-27',  11,  7900,  '食費', 'user1');

----2025年10月
insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-10-1',  11,  6000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-10-4',  15,  2400,  '雑貨（ケーブル）', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-10-7',  14,  23500,  'サブスク（会員費）', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-10-8',  11,  6000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-10-11',  1,  161000,  '給与', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-10-12',  11,  11000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-10-12',  16,  30000,  '実家へ振込', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-10-15', 13 , 3500 ,  '電話代', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-10-18',  11,  6000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-10-20', 12 , 9000 ,  '電気ガス', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-10-27',  11,  7100,  '食費', 'user1');

----2025年11月
insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-11-1',  11,  6100,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-11-4',  15,  2400,  '雑貨（ケーブル）', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-11-7',  14,  23500,  'サブスク（会員費）', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-11-8',  11,  5100,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-11-11',  1,  170000,  '給与', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-11-12',  11,  10000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-11-12',  16,  30000,  '実家へ振込', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-11-15', 13 , 3500 ,  '電話代', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-11-18',  11,  5000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-11-20', 12 , 9000 ,  '電気ガス', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-11-27',  11,  7000,  '食費', 'user1');
--
-----------------------------2025年12月
insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-12-1',  11,  6200,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-12-4',  15,  2400,  '雑貨（ケーブル）', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-12-7',  14,  23500,  'サブスク（会員費）', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-12-8',  11,  6200,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-12-11',  1,  120000,  '給与', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-12-12',  11,  6000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-12-12',  16,  30000,  '実家へ振込', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-12-15', 13 , 3500 ,  '電話代', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-12-18',  11,  6200,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-12-20', 12 , 9000 ,  '電気ガス', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2025-12-27',  11,  7000,  '食費', 'user1');


-----------------------------2026年1月
insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-1-1',  11,  1000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-1-4',  15,  2400,  '雑貨（ケーブル）', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-1-7',  14,  23500,  'サブスク（会員費）', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-1-8',  11,  1000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-1-11',  1,  110000,  '給与', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-1-12',  11,  1000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-1-12',  16,  30000,  '実家へ振込', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-1-15', 13 , 3500 ,  '電話代', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-1-18',  11,  1000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-1-20', 12 , 9000 ,  '電気ガス', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, homeru, username)
values('2026-1-27',  11,  1000,  '食費', 1, 'user1');


-----------------------------2026年2月
insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-1',  11,  2000,  '食費', 'user2');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-1',  11,  1420,  'ドーナツ、ナス、豆腐、報連相', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-4',  15,  2400,  '雑貨（ケーブル）', 'user2');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-4',  15,  3595,  'なんか', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-4',  11,  1100, '外食', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-7',  14,  23500,  'サブスク（会員費）', 'user2');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-7',  13,  3600,  'ガス代', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-8',  11,  2000,  '食費', 'user2');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-12',  14,  20000,  '保険', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-8',  16,  30000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-8',  11,  23000,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-7',  11,  4892,  '材料費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-11',  1,  100000,  '給与', 'user2');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-12',  11,  20000,  '食費', 'user2');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-12',  11,  1620,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-12',  16,  30000,  '実家へ振込', 'user2');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-15', 13 , 3500 ,  '電話代', 'user2');

insert into kakeibo(trade_date, category_id, amount, memo, homeru, username)
values('2026-2-18',  11,  2000,  '食費',1, 'user2');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-2-7',  14,  23500,  'サブスク（会員費）', 'user2');

insert into kakeibo(trade_date, category_id, amount, memo, homeru, username)
values('2026-2-20', 12 , 9000 ,  '電気ガス', 1, 'user2');

insert into kakeibo(trade_date, category_id, amount, memo, homeru, username)
values('2026-2-20', 12 , 7800 ,  '電気ガス', 1, 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, homeru, username)
values('2026-2-27',  11,  2000,  '食費', 1, 'user2');

-----------------------------2026年3月
insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-1',  11,  2814,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-2',  15,  5000,  '雑費（ゲーム）', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-4',  11,  4835,  '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-7',  15,  14000,  '雑費（宿泊）', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-11',  1,  165313,  '給与', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-15',  15,  2398,  '自転車の鍵', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-13',  11,  319, '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-15',  11,  1429, '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-13',  16,  30330,  '実家へ振込', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-13',  11,  970, '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-14',  11,  280, '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username, soft_delete)
values('2026-3-14',  11,  6200, '食費', 'user1', 9);

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-15',  16,  30000, 'excel', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-14',  15,  29800, 'スマホ交換', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-14',  14,  20000, '年金', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-14',  12,  10000, '電気ガス', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-14',  13,  4210, '電話代', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-16', 11 , 550 , '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-17', 11 , 1190 , '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-18', 11 , 820 , '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-19', 11 , 1050 , '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-3-20', 11 , 920 , '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-03-21', 11 , 650 , '食費', 'user1');

insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-03-31', 11 , 650 , '食費', 'user1');
insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-4-12', 1 , 160000 , '給料', 'user1');
insert into kakeibo(trade_date, category_id, amount, memo, username)
values('2026-04-16', 13 , 4700 , '電話代', 'user1');


--8月の収支をバランスシートとして登録
insert into balance_history(year_month, balance)
values
('2025-08', 
	(
	select 
	sum(amount) 
	from kakeibo
	where 
		trade_date >='2025-08-01'
	and trade_date < '2025-09-01'
	
	and
	category_id between 1 and 10
	)
	-
	(
	select 
	sum(amount) 
	from kakeibo
	where 
		trade_date >='2025-08-01'
	and trade_date < '2025-09-01'
	
	and
	category_id between 11 and 20
	)
);

--9月分
insert into balance_history(year_month, balance)
values
('2025-09', 
	(
	select 
	sum(amount) 
	from kakeibo
	where 
		trade_date >='2025-09-01'
	and trade_date < '2025-10-01'
	
	and
	category_id between 1 and 10
	)
	-
	(
	select 
	sum(amount) 
	from kakeibo
	where 
		trade_date >='2025-09-01'
	and trade_date < '2025-10-01'
	
	and
	category_id between 11 and 20
	)
);

--10月分
insert into balance_history(year_month, balance)
values
('2025-10', 
(
	select 
	sum(amount) 
	from kakeibo
	where 
		trade_date >='2025-10-01'
	and trade_date < '2025-11-01'
	
	and
	category_id between 1 and 10
	)
	-
	(
	select 
	sum(amount) 
	from kakeibo
	where 
		trade_date >='2025-10-01'
	and trade_date < '2025-11-01'
	
	and
	category_id between 11 and 20
	)
);

--11月分
insert into balance_history(year_month, balance)
values
('2025-11', 
	(
	select 
	sum(amount) 
	from kakeibo
	where 
		trade_date >='2025-11-01'
	and trade_date < '2025-12-01'
	
	and
	category_id between 1 and 10
	)
	-
	(
	select 
	sum(amount) 
	from kakeibo
	where
		trade_date >='2025-11-01'
	and trade_date < '2025-12-01'
	
	and
	category_id between 11 and 20
	)
);

--12月分
insert into balance_history(year_month, balance)
values
('2025-12', 
	(
	select 
	sum(amount) 
	from kakeibo
	where 
		trade_date >='2025-12-01'
	and trade_date < '2026-01-01'
	
	and
	category_id between 1 and 10
	)
	-
	(
	select 
	sum(amount) 
	from kakeibo
	where 
		trade_date >='2025-12-01'
	and trade_date < '2026-01-01'
	
	and
	category_id between 11 and 20
	)
);


--26年1月分
insert into balance_history(year_month, balance)
values
('2026-01', 
	(
	select 
	sum(amount) 
	from kakeibo
	where 
		trade_date >='2026-01-01'
	and trade_date < '2026-02-01'
	
	and
	category_id between 1 and 10
	)
	-
	(
	select 
	sum(amount) 
	from kakeibo
	where 
		trade_date >='2026-01-01'
	and trade_date < '2026-02-01'
	
	and
	category_id between 11 and 20
	)
);

--26年2月分
insert into balance_history(year_month, balance)
values
('2026-02', 
	(
	select 
	sum(amount) 
	from kakeibo
	where 
		trade_date >='2026-02-01'
	and trade_date < '2026-03-01'
	
	and
	category_id between 1 and 10
	)
	-
	(
	select 
	sum(amount) 
	from kakeibo
	where 
		trade_date >='2026-02-01'
	and trade_date < '2026-03-01'
	
	and
	category_id between 11 and 20
	)
);


insert into users(username, password, payday)
values('you', '1234', 11);