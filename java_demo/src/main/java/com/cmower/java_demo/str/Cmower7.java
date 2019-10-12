package com.cmower.java_demo.str;

import java.util.ArrayList;
import java.util.List;

public class Cmower7 {

    public static void main(String[] args) {
        List<String> userNames = new ArrayList<String>() {{
            add("Hollis");
            add("hollis");
            add("HollisChuang");
            add("H");
        }};

        for (String userName : userNames) {
            if (userName.equals("Hollis")) {
                userNames.remove(userName);
            }
        }

        System.out.println(userNames);
    }

}
