---
title: 测试微信 - mdnice 墨滴
shortTitle: 测试微信 - mdnice 墨滴
description: //代理类中的触发调用if&nbsp;(CallType.SYNC&nbsp;==&nbsp;callType)&nbsp;{&nbsp;&nbsp;&nbsp;//&nbsp;future-resp
tags:
  - 后端
  - 后端
category:
  - 其他网站
head:
  - - meta
    - name: description
      content: //代理类中的触发调用if&nbsp;(CallType.SYNC&nbsp;==&nbsp;callType)&nbsp;{&nbsp;&nbsp;&nbsp;//&nbsp;future-resp
  - - meta
    - name: keywords
      content: 后端,后端
---

```
//代理类中的触发调用if (CallType.SYNC == callType) {   // future-response set   XxlRpcFutureResponse futureResponse = new XxlRpcFutureResponse(invokerFactory, xxlRpcRequest, null);   try {      // do invoke      client.asyncSend(finalAddress, xxlRpcRequest);      // future get      XxlRpcResponse xxlRpcResponse = futureResponse.get(timeout, TimeUnit.MILLISECONDS);      if (xxlRpcResponse.getErrorMsg() != null) {         throw new XxlRpcException(xxlRpcResponse.getErrorMsg());      }      return xxlRpcResponse.getResult();   } catch (Exception e) {      logger.info(">>>>>>>>>>> xxl-rpc, invoke error, address:{}, XxlRpcRequest{}", finalAddress, xxlRpcRequest);      throw (e instanceof XxlRpcException)?e:new XxlRpcException(e);   } finally{      // future-response remove      futureResponse.removeInvokerFuture();   }} 
```