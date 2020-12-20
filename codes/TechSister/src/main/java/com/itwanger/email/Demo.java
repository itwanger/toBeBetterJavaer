package com.itwanger.email;


import com.cloudmersive.client.invoker.ApiClient;
import com.cloudmersive.client.invoker.ApiException;
import com.cloudmersive.client.invoker.Configuration;
import com.cloudmersive.client.EmailApi;
import com.cloudmersive.client.invoker.auth.ApiKeyAuth;
import com.cloudmersive.client.model.AddressGetServersResponse;
import com.cloudmersive.client.model.AddressVerifySyntaxOnlyResponse;
import com.cloudmersive.client.model.FullEmailValidationResponse;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/11/25
 */
public class Demo {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        ApiKeyAuth Apikey = (ApiKeyAuth) defaultClient.getAuthentication("Apikey");
        Apikey.setApiKey("2211cfcf-f65b-41ee-a3c0-1fc3b4eb665f");

        EmailApi apiInstance = new EmailApi();
//        String value = "98343676@qq.com";
        String value = "“1-’or’1'=’1”@email.com";
        try {
//            AddressVerifySyntaxOnlyResponse result = apiInstance.emailPost(value);
//            System.out.println(result);

//            AddressGetServersResponse result = apiInstance.emailAddressGetServers(value);
            FullEmailValidationResponse result = apiInstance.emailFullValidation(value);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("调用 EmailApi#emailPost 的时候出错了");
            e.printStackTrace();
        }
    }
}
