package com.cmower.java_demo.stackoverflow.printObject;

import com.google.common.base.MoreObjects;
import lombok.ToString;
import org.apache.commons.lang3.builder.ToStringBuilder;

public class Cmower {

    private String name;

    public Cmower(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
