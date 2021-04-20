package com.itwanger.huffman;

import cn.hutool.Hutool;
import cn.hutool.core.util.HexUtil;

import java.math.BigInteger;
import java.util.Comparator;
import java.util.PriorityQueue;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
class HuffmanNode {
    int item;
    char c;
    HuffmanNode left;
    HuffmanNode right;
}

class ImplementComparator implements Comparator<HuffmanNode> {
    public int compare(HuffmanNode x, HuffmanNode y) {
        return x.item - y.item;
    }
}

public class Huffman {
    public static void printCode(HuffmanNode root, String s) {
        if (root.left == null && root.right == null && Character.isLetter(root.c)) {

            System.out.println(root.c + "   |  " + s);

            return;
        }
        printCode(root.left, s + "0");
        printCode(root.right, s + "1");
    }

    public static void main(String[] args) {
        int n = 4;
        char[] charArray = { 'A', 'B', 'C', 'D' };
        int[] charfreq = { 5, 1, 6, 3 };

        PriorityQueue<HuffmanNode> q = new PriorityQueue<HuffmanNode>(n, new ImplementComparator());

        for (int i = 0; i < n; i++) {
            HuffmanNode hn = new HuffmanNode();

            hn.c = charArray[i];
            hn.item = charfreq[i];

            hn.left = null;
            hn.right = null;

            q.add(hn);
        }

        HuffmanNode root = null;

        while (q.size() > 1) {

            HuffmanNode x = q.peek();
            q.poll();

            HuffmanNode y = q.peek();
            q.poll();

            HuffmanNode f = new HuffmanNode();

            f.item = x.item + y.item;
            f.c = '-';
            f.left = x;
            f.right = y;
            root = f;

            q.add(f);
        }
        System.out.println(" 字符 | 霍夫曼编码 ");
        System.out.println("--------------------");
        printCode(root, "");
    }
}