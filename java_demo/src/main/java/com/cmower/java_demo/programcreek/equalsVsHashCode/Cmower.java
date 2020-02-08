package com.cmower.java_demo.programcreek.equalsVsHashCode;

import java.util.HashMap;
import java.util.Map;

public class Cmower {
    private String name;

    public Cmower(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) return false;
        if (!(obj instanceof Cmower))
            return false;
        if (obj == this)
            return true;
        return this.name.equals(((Cmower) obj).name);
    }

@Override
public int hashCode() {
    return this.name.hashCode();
}

    public static void main(String[] args) {
        Cmower a1 = new Cmower("沉默王二");
        Cmower a2 = new Cmower("沉默王三");

        Map<Cmower, Integer> m = new HashMap<Cmower, Integer>();
        m.put(a1, 18);
        m.put(a2, 28);
        System.out.println(m.get(new Cmower("沉默王二")));
    }
}
