--IN-OUTテーブルにin、outの挿入

insert into in_out(id, in_out)
values(1, 'IN');

insert into in_out(id, in_out)
values(2, 'OUT');

--カテゴリーテーブルにカテゴリーの挿入
--給料（収入）
insert into category(id, category, in_out, sort_order)
values (1, 'salary', 'IN', 1);

--定期外収入（収入）
insert into category(id, category, in_out, sort_order)
values (2, 'extra-income', 'IN', 2);

--貯金の取り崩し
insert into category(id, category, in_out, sort_order)
values (3, 'breaking',  'IN', 3);

--食費
insert into category(id, category, in_out, sort_order)
values (11, 'foods', 'OUT', 11);

--電気＆ガス
insert into category(id, category, in_out, sort_order)
values (12, 'electron-and-gas', 'OUT', 12);

--電話
insert into category(id, category, in_out, sort_order)
values (13, 'phone', 'OUT', 13);

--サブスク・会員費
insert into category(id, category, in_out, sort_order)
values (14, 'subscribe', 'OUT', 14);

--一般雑貨
insert into category(id, category, in_out, sort_order)
values (15, 'general', 'OUT', 15);

--預金
insert into category(id, category, in_out, sort_order)
values (16, 'deposit', 'OUT', 16);

--可処分所得
insert into category(id, category, in_out, sort_order)
values (17, 'free', 'OUT', 17);



--家計簿に各月10個程度ずつ、6か月分
--2025年8月
insert into kakeibo(trade_date, category_id, amount, memo, homeru)
values('2025-8-1',  11,  5000,  '食費', 1);

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-8-4',  15,  2400,  '雑貨（ケーブル）');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-8-7',  14,  23500,  'サブスク（会員費）');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-8-8',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-8-11',  1,  160000,  '給与');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-8-12',  11,  10000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-8-12',  16,  30000,  '実家へ振込');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-8-15', 13 , 3500 ,  '電話代');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-8-18',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-8-20', 12 , 9000 ,  '電気ガス');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-8-27',  11,  7000,  '食費');
--
----2025年9月
insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-9-1',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-9-4',  15,  2400,  '雑貨（ケーブル）');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-9-7',  14,  23500,  'サブスク（会員費）');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-9-8',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-9-11',  1,  160000,  '給与');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-9-12',  11,  10000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-9-12',  16,  30000,  '実家へ振込');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-9-15', 13 , 3500 ,  '電話代');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-9-18',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-9-20', 12 , 9000 ,  '電気ガス');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-9-27',  11,  7000,  '食費');
--
----2025年10月
insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-10-1',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-10-4',  15,  2400,  '雑貨（ケーブル）');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-10-7',  14,  23500,  'サブスク（会員費）');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-10-8',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-10-11',  1,  160000,  '給与');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-10-12',  11,  10000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-10-12',  16,  30000,  '実家へ振込');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-10-15', 13 , 3500 ,  '電話代');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-10-18',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-10-20', 12 , 9000 ,  '電気ガス');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-10-27',  11,  7000,  '食費');

----2025年11月
insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-11-1',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-11-4',  15,  2400,  '雑貨（ケーブル）');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-11-7',  14,  23500,  'サブスク（会員費）');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-11-8',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-11-11',  1,  160000,  '給与');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-11-12',  11,  10000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-11-12',  16,  30000,  '実家へ振込');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-11-15', 13 , 3500 ,  '電話代');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-11-18',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-11-20', 12 , 9000 ,  '電気ガス');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-11-27',  11,  7000,  '食費');
--
-----------------------------2025年12月
insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-12-1',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-12-4',  15,  2400,  '雑貨（ケーブル）');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-12-7',  14,  23500,  'サブスク（会員費）');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-12-8',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-12-11',  1,  160000,  '給与');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-12-12',  11,  10000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-12-12',  16,  30000,  '実家へ振込');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-12-15', 13 , 3500 ,  '電話代');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-12-18',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-12-20', 12 , 9000 ,  '電気ガス');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2025-12-27',  11,  7000,  '食費');


-----------------------------2026年1月
insert into kakeibo(trade_date, category_id, amount, memo)
values('2026-1-1',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2026-1-4',  15,  2400,  '雑貨（ケーブル）');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2026-1-7',  14,  23500,  'サブスク（会員費）');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2026-1-8',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2026-1-11',  1,  160000,  '給与');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2026-1-12',  11,  10000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2026-1-12',  16,  30000,  '実家へ振込');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2026-1-15', 13 , 3500 ,  '電話代');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2026-1-18',  11,  5000,  '食費');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2026-1-20', 12 , 9000 ,  '電気ガス');

insert into kakeibo(trade_date, category_id, amount, memo)
values('2026-1-27',  11,  7000,  '食費');

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