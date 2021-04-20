package com.itwanger.junit;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

import static org.junit.jupiter.api.Assertions.*;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/12/28
 */
class FactorialTest {

    @Test
    void fact() {
        assertEquals(1, Factorial.fact(1));
        assertEquals(2, Factorial.fact(2));
        assertEquals(6, Factorial.fact(3));
        assertEquals(120, Factorial.fact(5));
    }

    @Test
    void factIllegalArgument() {
        assertThrows(IllegalArgumentException.class, new Executable() {
            @Override
            public void execute() throws Throwable {
                Factorial.fact(-2);
            }
        });
    }

    @Test
    void factIllegalArgumentLambda() {
        assertThrows(IllegalArgumentException.class, () -> {
            Factorial.fact(-2);
        });
    }
}



