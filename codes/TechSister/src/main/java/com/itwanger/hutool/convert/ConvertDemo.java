package com.itwanger.hutool.convert;

import cn.hutool.core.convert.Convert;

import java.util.Date;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class ConvertDemo {
    public static void main(String[] args) {
String param = "10";
int paramInt = Convert.toInt(param);
int paramIntDefault = Convert.toInt(param, 0);
        System.out.println(paramInt);
        System.out.println(paramIntDefault);

String dateStr = "2020年09月29日";
Date date = Convert.toDate(dateStr);
        System.out.println(date);

String unicodeStr = "沉默王二";
String unicode = Convert.strToUnicode(unicodeStr);
        System.out.println(unicode);
    }
}
