package com.itwanger.queue;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
class CQueue {
    int SIZE = 5;
    int items[] = new int[SIZE];
    int front, rear;

CQueue() {
    front = -1;
    rear = -1;
}

void enQueue(int element) {
    if (isFull()) {
        System.out.println("队列已经满了");
    } else {
        if (front == -1)
            front = 0;
        rear = (rear + 1) % SIZE;
        items[rear] = element;
        System.out.println("插入 " + element);
    }
}

int deQueue() {
    int element;
    if (isEmpty()) {
        System.out.println("队列空了");
        return (-1);
    } else {
        element = items[front];
        if (front >= rear) {
            front = -1;
            rear = -1;
        }
        else {
            front = (front + 1) % SIZE;
        }
        System.out.println("删除 -> " + element);
        return (element);
    }
}

boolean isFull() {
    if (front == 0 && rear == SIZE - 1) {
        return true;
    }

    if (front == rear + 1) {
        return true;
    }
    return false;
}

boolean isEmpty() {
    if (front == -1)
        return true;
    else
        return false;
}

void display() {
    int i;
    if (isEmpty()) {
        System.out.println("队列为空");
    } else {
        System.out.println("\n队首的下标-> " + front);
        System.out.println("元素 -> ");
        for (i = front; i <= rear; i++)
            System.out.print(items[i] + "  ");

        System.out.println("\n队尾的下标-> " + rear);
    }
}

public static void main(String[] args) {
CQueue q = new CQueue();

// enQueue 5 elements
q.enQueue(1);
q.enQueue(2);
q.enQueue(3);
q.enQueue(4);
q.enQueue(5);

// 出队
q.deQueue();
q.deQueue();

q.enQueue(6);
q.enQueue(7);
}
}
