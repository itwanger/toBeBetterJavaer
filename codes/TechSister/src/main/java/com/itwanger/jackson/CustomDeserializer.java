package com.itwanger.jackson;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.node.IntNode;

import java.io.IOException;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/11/26
 */
public class CustomDeserializer extends StdDeserializer<Woman> {
    protected CustomDeserializer(Class<?> vc) {
        super(vc);
    }

    public CustomDeserializer() {
        this(null);
    }

    @Override
    public Woman deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonNode node = p.getCodec().readTree(p);
        Woman woman = new Woman();
        int age = (Integer) ((IntNode) node.get("age")).numberValue();
        String name = node.get("name").asText();
        woman.setAge(age);
        woman.setName(name);
        return woman;
    }

    public static void main(String[] args) throws JsonProcessingException {
ObjectMapper mapper = new ObjectMapper();
SimpleModule module =
        new SimpleModule("CustomDeserializer", new Version(1, 0, 0, null, null, null));
module.addDeserializer(Woman.class, new CustomDeserializer());
mapper.registerModule(module);
String json = "{ \"name\" : \"三妹\", \"age\" : 18 }";
Woman woman = mapper.readValue(json, Woman.class);
System.out.println(woman);
    }
}
class Woman{
    private int age;
    private String name;

    public Woman() {
    }

    public Woman(int age, String name) {
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

    @Override
    public String toString() {
        return "Woman{" +
                "age=" + age +
                ", name='" + name + '\'' +
                '}';
    }
}