import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{o as n,c as s,e as i}from"./app.41bad062.js";const l={},r=i(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>//\u4EE3\u7406\u7C7B\u4E2D\u7684\u89E6\u53D1\u8C03\u7528
if (CallType.SYNC == callType) {
   // future-response set
   XxlRpcFutureResponse futureResponse = new XxlRpcFutureResponse(invokerFactory, xxlRpcRequest, null);
   try {
      // do invoke
      client.asyncSend(finalAddress, xxlRpcRequest);

      // future get
      XxlRpcResponse xxlRpcResponse = futureResponse.get(timeout, TimeUnit.MILLISECONDS);
      if (xxlRpcResponse.getErrorMsg() != null) {
         throw new XxlRpcException(xxlRpcResponse.getErrorMsg());
      }
      return xxlRpcResponse.getResult();
   } catch (Exception e) {
      logger.info(&quot;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt; xxl-rpc, invoke error, address:{}, XxlRpcRequest{}&quot;, finalAddress, xxlRpcRequest);

      throw (e instanceof XxlRpcException)?e:new XxlRpcException(e);
   } finally{
      // future-response remove
      futureResponse.removeInvokerFuture();
   }
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),t=[r];function c(d,u){return n(),s("div",null,t)}var a=e(l,[["render",c],["__file","ceswsmdnicemd.html.vue"]]);export{a as default};
