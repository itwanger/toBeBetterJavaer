package com.itwanger.s64;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Vector;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Demo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("沉默王二");
        list.add("沉默王三");
        list.add("沉默王四");
        list.add("沉默王五");
        list.add("沉默王六");

        System.out.println("原始顺序：" + list);

//        // 反转
//        Collections.reverse(list);
//        System.out.println("反转后：" + list);
//
//        // 洗牌
//        Collections.shuffle(list);
//        System.out.println("洗牌后：" + list);
//
//        // 自然升序
//        Collections.sort(list);
//        System.out.println("自然升序后：" + list);
//
//        // 交换
//        Collections.swap(list, 2,4);
//        System.out.println("交换后：" + list);

//        System.out.println("最大元素：" + Collections.max(list));
//        System.out.println("最小元素：" + Collections.min(list));
//        System.out.println("出现的次数：" + Collections.frequency(list, "沉默王二"));
//
//        // 没有排序直接调用二分查找，结果是不确定的
//        System.out.println("排序前的二分查找结果：" + Collections.binarySearch(list, "沉默王二"));
//        Collections.sort(list);
//        // 排序后，查找结果和预期一致
//        System.out.println("排序后的二分查找结果：" + Collections.binarySearch(list, "沉默王二"));
//
//        Collections.fill(list, "沉默王八");
//        System.out.println("填充后的结果：" + list);
//
//        Vector vector;
//        CopyOnWriteArrayList copyOnWriteArrayList;
//        ConcurrentHashMap concurrentHashMap;
//
//        List synchronizedList = Collections.synchronizedList(list);
//
//        list.add(1,"test");
//        List emptyList = Collections.emptyList();
//        emptyList.add("非空");
//        System.out.println(emptyList);

List<String> allList = new ArrayList<>();
Collections.addAll(allList, "沉默王九","沉默王十","沉默王二");
System.out.println("addAll 后：" + allList);

System.out.println("是否没有交集：" + (Collections.disjoint(list, allList) ? "是" : "否"));
    }
}
