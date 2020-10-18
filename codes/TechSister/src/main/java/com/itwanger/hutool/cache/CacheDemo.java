package com.itwanger.hutool.cache;

import cn.hutool.cache.Cache;
import cn.hutool.cache.CacheUtil;
import cn.hutool.core.date.DateUnit;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class CacheDemo {
    public static void main(String[] args) {
Cache<String, String> fifoCache = CacheUtil.newFIFOCache(3);
fifoCache.put("key1", "沉默王一");
fifoCache.put("key2", "沉默王二");
fifoCache.put("key3", "沉默王三");
fifoCache.put("key4", "沉默王四");

// 大小为 3，所以 key3 放入后 key1 被清除
String value1 = fifoCache.get("key1");
        System.out.println(value1);

        lfu();
        lru();
    }

    public static void lfu() {
Cache<String, String> lfuCache = CacheUtil.newLFUCache(3);

lfuCache.put("key1", "沉默王一");
// 使用次数+1
lfuCache.get("key1");
lfuCache.put("key2", "沉默王二");
lfuCache.put("key3", "沉默王三");
lfuCache.put("key4", "沉默王四");

// 由于缓存容量只有 3，当加入第 4 个元素的时候，最少使用的将被移除（2,3被移除）
String value2 = lfuCache.get("key2");
String value3 = lfuCache.get("key3");
System.out.println(value2);
System.out.println(value3);
    }

    public static void lru() {
Cache<String, String> lruCache = CacheUtil.newLRUCache(3);

lruCache.put("key1", "沉默王一");
lruCache.put("key2", "沉默王二");
lruCache.put("key3", "沉默王三");
// 使用时间近了
lruCache.get("key1");
lruCache.put("key4", "沉默王四");

// 由于缓存容量只有 3，当加入第 4 个元素的时候，最久使用的将被移除（2）
String value2 = lruCache.get("key2");
System.out.println(value2);
    }
}
