#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
统计 Markdown 文件的正文长度
排除 frontmatter、代码块、链接、图片等非正文内容
只统计中文字符数
"""

import sys
import re
from pathlib import Path

def count_chinese_chars(text):
    """统计中文字符数量"""
    # 移除所有空白
    text = re.sub(r'\s+', '', text)

    # 移除 Markdown 语法标记
    # 移除代码块 ```...```
    text = re.sub(r'```.*?```', '', text, flags=re.DOTALL | re.MULTILINE)
    # 移除行内代码 `...` 或 "..."
    text = re.sub(r'`[^`]*`', '', text)
    text = re.sub(r'"[^"]*"', '', text)

    # 移除图片链接
    text = re.sub(r'!\[\[](https://[^\)]+)\]\([^\)]+\)', '', text)

    # 移除超链接 [text](url)
    text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', '', text)

    # 统计中文字符（排除英文、数字、标点符号）
    # 中文字符范围：\u4e00-\u9fa5
    chinese_chars = re.findall(r'[\u4e00-\u9fa5]', text)
    return len(chinese_chars)

def main():
    if len(sys.argv) < 2:
        print("用法: python3 check_body_length.py <文件路径> [--min 最小字数]")
        sys.exit(1)

    file_path = sys.argv[1]
    min_chars = 4000

    # 读取文件
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"错误：文件不存在 - {file_path}")
        sys.exit(1)
    except Exception as e:
        print(f"错误：读取文件失败 - {e}")
        sys.exit(1)

    # 移除 frontmatter (--- 到 --- 之间)
    content = re.sub(r'^---$.*?^---$\s', '', content, flags=re.DOTALL | re.MULTILINE)

    # 统计字数
    count = count_chinese_chars(content)

    print(f"正文中文字数: {count}")
    print(f"要求最小字数: {min_chars}")

    if count >= min_chars:
        print("✅ 达标！")
        sys.exit(0)
    else:
        needed = min_chars - count
        print(f"❌ 未达标，还需要 {needed} 字")
        sys.exit(1)

if __name__ == '__main__':
    main()
