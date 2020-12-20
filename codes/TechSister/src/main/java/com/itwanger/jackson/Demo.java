package com.itwanger.jackson;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.util.StdDateFormat;

import java.util.Date;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/11/26
 */
public class Demo {
    public static void main(String[] args) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//在序列化时忽略值为 null 的属性
mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
//忽略值为默认值的属性
mapper.setDefaultPropertyInclusion(JsonInclude.Include.NON_DEFAULT);
mapper.setDateFormat(StdDateFormat.getDateTimeInstance());

        Writer wanger = new Writer("沉默王二", 18);
        wanger.setBirthday(new Date());
        String jsonString = mapper.writerWithDefaultPrettyPrinter()
                .writeValueAsString(wanger);

        System.out.println(jsonString);


        jsonString = "{\n" +
                "  \"name\" : null,\n" +
                "  \"age\" : 18,\n" +
                "  \"sex\" : \"男\"\n" +
                "}";
        Writer deserializedWriter = mapper.readValue(jsonString, Writer.class);
        System.out.println(deserializedWriter);
    }
}

@JsonIgnoreProperties(value = { "age","birthday" })
class Writer{
    private String name;
    private int age;
private Date birthday;

// GMT+8 是指格林尼治的标准时间，在加上八个小时表示你现在所在时区的时间
//@JsonFormat(timezone = "CST+8",pattern = "yyyy-MM-dd HH:mm:ss")
public Date getBirthday() {
    return birthday;
}

public void setBirthday(Date birthday) {
    this.birthday = birthday;
}

    public Writer(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Writer() {
    }

//@JsonIgnore
public String getName() {
    return name;
}

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Writer{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
