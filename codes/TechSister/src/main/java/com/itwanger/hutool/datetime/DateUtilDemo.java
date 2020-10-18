package com.itwanger.hutool.datetime;

import cn.hutool.core.date.*;

import java.util.Date;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class DateUtilDemo {
    public static void main(String[] args) {
Date date = DateUtil.date();
String now = DateUtil.now();
String today= DateUtil.today();

        System.out.println(date);
        System.out.println(now);
        System.out.println(today);

        str2Date();
        between();
        zodiac();

    }

    public static void str2Date() {
//String dateStr = "2020-09-29";
        String dateStr = "2020年09月29日";
Date date = DateUtil.parse(dateStr);
        System.out.println(date);
    }

    public static void between() {
String dateStr1 = "2020-09-29 22:33:23";
Date date1 = DateUtil.parse(dateStr1);

String dateStr2 = "2020-10-01 23:34:27";
Date date2 = DateUtil.parse(dateStr2);

long betweenDay = DateUtil.between(date1, date2, DateUnit.MS);
String formatBetween = DateUtil.formatBetween(betweenDay, BetweenFormater.Level.SECOND);
        System.out.println(formatBetween);
    }

    public static void zodiac() {
String zodiac = DateUtil.getZodiac(Month.DECEMBER.getValue(), 10);
String chineseZodiac = DateUtil.getChineseZodiac(1989);
        System.out.println(zodiac);
        System.out.println(chineseZodiac);
    }

    public static void chinese() {
        ChineseDate chineseDate = new ChineseDate(1989,11,13);
    }
}
