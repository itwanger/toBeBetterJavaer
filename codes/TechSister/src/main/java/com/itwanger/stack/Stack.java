package com.itwanger.stack;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
class Stack {
    private int arr[];
    private int top;
    private int capacity;

    // 初始化栈
Stack(int size) {
    arr = new int[size];
    capacity = size;
    top = -1;
}

    // 往栈中压入元素
public void push(int x) {
    if (isFull()) {
        System.out.println("溢出\n程序终止\n");
        System.exit(1);
    }

    System.out.println("压入 " + x);
    arr[++top] = x;
}

    // 从栈中弹出元素
public int pop() {
    if (isEmpty()) {
        System.out.println("栈是空的");
        System.exit(1);
    }
    return arr[top--];
}

// 返回栈的大小
public int size() {
    return top + 1;
}

// 检查栈是否为空
public Boolean isEmpty() {
    return top == -1;
}

// 检查栈是否已经满了
public Boolean isFull() {
    return top == capacity - 1;
}

public void printStack() {
    for (int i = 0; i <= top; i++) {
        System.out.println(arr[i]);
    }
}

public static void main(String[] args) {
    Stack stack = new Stack(5);

    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);

    stack.pop();
    System.out.println("\n弹出元素后");

    stack.printStack();
}
}
