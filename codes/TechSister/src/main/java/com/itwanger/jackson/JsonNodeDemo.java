package com.itwanger.jackson;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/11/26
 */
public class JsonNodeDemo {
    public static void main(String[] args) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json = "{ \"name\" : \"沉默王二\", \"age\" : 18 }";
        JsonNode jsonNode = mapper.readTree(json);
        String name = jsonNode.get("name").asText();
        System.out.println(name);
    }
}
