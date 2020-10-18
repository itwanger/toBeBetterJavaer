package com.itwanger.hutool.log;

import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import cn.hutool.log.StaticLog;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class LogDemo {
    // 推荐创建不可变静态类成员变量
    private static final Log log = LogFactory.get();

    public static void main(String[] args) {
        log.debug("难得糊涂");

        StaticLog.info("爽啊 {}.", "沉默王二的文章");
    }
}
