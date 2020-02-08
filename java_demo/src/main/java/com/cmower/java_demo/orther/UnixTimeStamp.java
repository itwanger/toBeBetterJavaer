package com.cmower.java_demo.orther;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UnixTimeStamp {
    public static void main(String[] args) throws ParseException {
//        long timeStamp = System.currentTimeMillis();
//        int timeStampUnix = (int) (timeStamp / 1000);

//int timeStampUnix = 1578179845;
//SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//String result = simpleDateFormat.format(new Date(timeStampUnix * 1000L));
//        System.out.println(result); // 2020-01-05 07:17:25

String str = "2020-01-05 07:17:25";
SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
int timeStampUnix = (int) (simpleDateFormat.parse(str).getTime() / 1000);
System.out.println(timeStampUnix); // 1578179845

        System.out.println(DateUtils.parseDate("2020-01-05 07:17:25", "yyyy-MM-dd HH:mm:ss").getTime() / 1000);
        System.out.println(DateFormatUtils.format(1578179845 * 1000L,"yyyy-MM-dd HH:mm:ss"));
    }
}
