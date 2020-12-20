package com.itwanger.fastjson;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.annotation.JSONField;
import com.alibaba.fastjson.serializer.SerializerFeature;

import java.util.Date;
import java.util.List;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/12/17
 */
public class Test {
    public static void main(String[] args) {
Writer writer = new Writer();
writer.setAge(18);
writer.setName("沉默王二");
writer.setBirthday(new Date());

String json = JSON.toJSONString(writer);
System.out.println(json);
System.out.println(JSON.toJSONString(writer, SerializerFeature.PrettyFormat, SerializerFeature.UseSingleQuotes));

        Writer writer1 = JSON.parseObject(json, Writer.class);
        System.out.println(writer1);

        List<Writer> list = JSON.parseArray("[{\"age\":18,\"name\":\"沉默王二\"},{\"age\":19,\"name\":\"沉默王一\"}]", Writer.class);
        System.out.println(list);



    }
}
class Writer {
    private int age;
    private String name;
    private Date birthday;

    @JSONField(format = "yyyy年MM月dd日")
    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    @JSONField(name = "Age")
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @JSONField(serialize = false,deserialize = true)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}


public SerializeWriter(java.io.Writer writer, int defaultFeatures, SerializerFeature... features){
    this.writer = writer;

    buf = bufLocal.get();

    if (buf != null) {
        bufLocal.set(null);
    } else {
        buf = new char[2048];
    }
}