package com.itwanger.hutool.idcard;

import cn.hutool.core.util.IdcardUtil;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class IdcardUtilDemo {
    public static void main(String[] args) {
String ID_18 = "321083197812162119";
String ID_15 = "150102880730303";

boolean valid = IdcardUtil.isValidCard(ID_18);
boolean valid15 = IdcardUtil.isValidCard(ID_15);
    }
}
