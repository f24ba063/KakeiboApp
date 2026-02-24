package com.example.kakeiboApp.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


//毎月の前月繰越金を納めている
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BalanceSheetHistory {
	Date HistoryMonth;
	Integer BalanceSheet;
}
