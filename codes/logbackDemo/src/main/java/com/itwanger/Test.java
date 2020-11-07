package com.itwanger;

import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.core.util.StatusPrinter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Test {
    static Logger logger = LoggerFactory.getLogger(Test.class);
    public static void main(String[] args) {
        logger.debug("logback");
        logger.info("logback");
        logger.error("logback");
    }
}
