package com.itwanger;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.status.StatusLogger;

public class Demo {
    private static final Logger logger = LogManager.getLogger(Demo.class);
    public static void main(String[] args) {
for (int i = 1;i < 40;i++) {
    logger.debug("微信搜索「{}」，回复关键字「{}」，有惊喜哦，第[{}]次输出","沉默王二", "java",i);
}
    }
}
