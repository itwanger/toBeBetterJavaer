package com.itwanger.guava;

import com.google.common.base.Joiner;
import com.google.common.base.Optional;
import com.google.common.base.Splitter;
import com.google.common.cache.CacheBuilder;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class NullTest {
    public static void main(String[] args) {
Optional<Integer> possible = Optional.of(5);
possible.isPresent(); // returns true
possible.get(); // returns 5


// 下面的代码利用Collections.unmodifiableList(list)得到一个不可修改的集合unmodifiableList
List list = new ArrayList();
list.add("沉默王二");
list.add("微信搜一下");

List unmodifiableList = Collections.unmodifiableList(list);

//[沉默王二, 微信搜一下]
System.out.println(unmodifiableList);

        list.add("沉默王三");
        System.out.println(unmodifiableList);

List<String> stringArrayList = Lists.newArrayList("雷军","乔布斯");
ImmutableList<String> immutableList = ImmutableList.copyOf(stringArrayList);
//immutableList.add("马云");

        stringArrayList.add("马云");
        System.out.println(immutableList);

//CacheBuilder.newBuilder()
//        .expireAfterWrite(2, TimeUnit.MINUTES)
//        .build(new CacheLoader<Key, DatabaseConnection> () {
//            public DatabaseConnection load(Key key) throws Exception {
//                return openConnection(key);
//            }
//        });


        Joiner joiner = Joiner.on("; ").skipNulls();
        System.out.println(joiner.join("雷军", null, "乔布斯"));

System.out.println(Splitter.on(',')
        .trimResults()
        .omitEmptyStrings()
        .split("雷军,乔布斯,,   沉默王二"));

        System.out.println(File.separator);

    }
}
