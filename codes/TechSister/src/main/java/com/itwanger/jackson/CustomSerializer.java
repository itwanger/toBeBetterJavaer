package com.itwanger.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/11/26
 */
public class CustomSerializer extends StdSerializer<Man> {

    protected CustomSerializer(Class<Man> t) {
        super(t);
    }

    public CustomSerializer() {
        this(null);
    }

    @Override
    public void serialize(Man value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("name", value.getName());
        gen.writeEndObject();
    }

    public static void main(String[] args) throws JsonProcessingException {
ObjectMapper mapper = new ObjectMapper();
SimpleModule module =
        new SimpleModule("CustomSerializer", new Version(1, 0, 0, null, null, null));
module.addSerializer(Man.class, new CustomSerializer());
mapper.registerModule(module);
Man man = new Man( 18,"沉默王二");
String json = mapper.writeValueAsString(man);
System.out.println(json);
    }
}

class Man{
    private int age;
    private String name;

    public Man(int age, String name) {
        this.age = age;
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}