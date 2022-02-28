execute 用于提交不需要返回值的任务

```
threadsPool.execute(new Runnable() { 
    @Override public void run() { 
        // TODO Auto-generated method stub } 
    });
```
submit()方法用于提交需要返回值的任务。线程池会返回一个future类型的对象，通过这个 future对象可以判断任务是否执行成功，并且可以通过future的get()方法来获取返回值
```
Future<Object> future = executor.submit(harReturnValuetask); 
try { Object s = future.get(); } catch (InterruptedException e) { 
    // 处理中断异常 
} catch (ExecutionException e) { 
    // 处理无法执行任务异常 
} finally { 
    // 关闭线程池 executor.shutdown();
}
```