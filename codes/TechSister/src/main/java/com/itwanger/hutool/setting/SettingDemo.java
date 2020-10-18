package com.itwanger.hutool.setting;

import cn.hutool.setting.Setting;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class SettingDemo {
    private final static String SETTING = "hutool/example.setting";
    public static void main(String[] args) {
        // 初始化 Setting
        Setting setting = new Setting(SETTING);

        // 读取
        setting.getStr("name", "沉默王二");

        // 在配置文件变更时自动加载
        setting.autoLoad(true);

        // 通过代码方式增加键值对
        setting.set("birthday", "2020年09月29日");
        setting.store(SETTING);
    }
}
