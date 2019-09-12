package com.cmower.java_demo.effective;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class Cmower {

    public static void main(String[] args) {
String [] strs = {"洛阳","牡丹","甲天下"};
List<String> list = Arrays.asList(strs);


//Iterator<String> iterator = list.iterator();
//while (iterator.hasNext()) {
//    String s = (String) iterator.next();
//    System.out.println(s);
//}
//
//list.add("沉默王二");
//Iterator<String> iterator1 = list.iterator();
//while (iterator.hasNext()) {
//    String s = (String) iterator1.next();
//    System.out.println(s);
//}

for (Iterator<String> iterator = list.iterator();iterator.hasNext();) {
    String s = (String) iterator.next();
    System.out.println(s);
}

list.add("沉默王二");
for (Iterator<String> iterator = list.iterator();iterator.hasNext();) {
    String s = (String) iterator.next();
    System.out.println(s);
}

for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}
for (int i = 0, n = list.size(); i < n; i++) {
    System.out.println(list.get(i));
}

String pre_name = "沉默";
String last_name = "王二";

System.out.println(pre_name);
System.out.println(last_name);

    }

}


