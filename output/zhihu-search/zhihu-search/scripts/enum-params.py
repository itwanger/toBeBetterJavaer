import argparse
import sys

def main():
    sys.stdout.reconfigure(encoding='utf-8', newline='\n')
    parser = argparse.ArgumentParser()
    parser.add_argument('--param', default='all', help='Parameter to get: all, vertical, sort, time-interval')
    args = parser.parse_args()

    js = '''
    (function() {{
      try {{
        const enums = {{
          vertical: [
            {{ value: 'answer', label: '回答' }},
            {{ value: 'article', label: '文章' }},
            {{ value: 'zhuanlan', label: '专栏' }},
            {{ value: 'people', label: '用户' }},
            {{ value: 'topic', label: '话题' }},
            {{ value: 'live', label: 'Live' }}
          ],
          sort: [
            {{ value: 'default', label: '默认排序' }},
            {{ value: 'upvoted_count', label: '最多赞同' }},
            {{ value: 'created_time', label: '最新发布' }}
          ],
          time_interval: [
            {{ value: 'all', label: '不限时间' }},
            {{ value: 'a_day', label: '一天内' }},
            {{ value: 'a_week', label: '一周内' }},
            {{ value: 'a_month', label: '一月内' }},
            {{ value: 'three_months', label: '三月内' }},
            {{ value: 'half_a_year', label: '半年内' }},
            {{ value: 'a_year', label: '一年内' }}
          ]
        }};

        const param = '{param}';
        if (param === 'all') {{
          return JSON.stringify({{ success: true, enums: enums }});
        }} else {{
          const key = param.replace(/-/g, '_');
          return JSON.stringify({{ success: true, param: key, values: enums[key] || null }});
        }}
      }} catch(e) {{
        return JSON.stringify({{ error: true, message: e.message }});
      }}
    }})()
    '''.format(param=args.param)
    print(js)

if __name__ == '__main__':
    main()
