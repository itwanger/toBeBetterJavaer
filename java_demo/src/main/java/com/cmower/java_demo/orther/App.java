package com.cmower.java_demo.orther;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        System.out.print( "每个月给女儿存100，按照12%的月利率，现在需要存款：" );
        
        BigDecimal deposit_for_daughter = BigDecimal.valueOf(100);
        
        int month = 2 * 12 + 8;
        for (int i = 1; i <= month; i++) {
        		deposit_for_daughter = deposit_for_daughter.multiply(BigDecimal.valueOf(1.12));
		}
        System.out.println(deposit_for_daughter.setScale(2, RoundingMode.HALF_UP));
        
        System.out.println(NiubiUtil.getNextDay());
    }
}
