package com.itwanger.http;

import com.dtflys.forest.annotation.Body;
import com.dtflys.forest.annotation.Post;
import com.dtflys.forest.annotation.Request;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public interface ForRestClient {
    @Post("http://httpbin.org/post")
    String simplePost(@Body("name") String name);
}
