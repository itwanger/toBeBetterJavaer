import argparse
import sys

def main():
    sys.stdout.reconfigure(encoding='utf-8', newline='\n')
    parser = argparse.ArgumentParser()
    parser.add_argument('query', help='Search query string')
    parser.add_argument('--vertical', default='answer', help='Content type: answer, article, zhuanlan, people, topic, live')
    parser.add_argument('--sort', default='default', help='Sort order: default, upvoted_count, created_time')
    parser.add_argument('--time-interval', default='all', help='Time filter: all, a_day, a_week, a_month, three_months, half_a_year, a_year')
    parser.add_argument('--offset', default='0', help='Pagination offset, default 0')
    parser.add_argument('--limit', default='20', help='Items per page, default 20')
    args = parser.parse_args()

    # Escape single quotes in query
    query_escaped = args.query.replace("'", "\\'")

    js = '''
    (async function() {{
      try {{
        const params = new URLSearchParams();
        params.append('t', 'general');
        params.append('q', '{query}');
        params.append('vertical', '{vertical}');
        params.append('sort', '{sort}');
        params.append('offset', '{offset}');
        params.append('limit', '{limit}');
        if ('{time_interval}' !== 'all') {{
          params.append('time_interval', '{time_interval}');
        }}

        const url = 'https://www.zhihu.com/api/v4/search_v3?' + params.toString();
        const response = await fetch(url, {{
          method: 'GET',
          credentials: 'include',
          headers: {{
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Referer': 'https://www.zhihu.com/'
          }}
        }});

        if (!response.ok) {{
          return JSON.stringify({{ error: true, message: `HTTP ${{response.status}}: ${{response.statusText}}` }});
        }}

        const data = await response.json();
        const results = (data.data || []).map(item => {{
          const obj = item.object || {{}};
          return {{
            type: item.type || obj.type || null,
            id: obj.id || null,
            title: obj.title || obj.name || null,
            excerpt: obj.excerpt || obj.description || null,
            url: obj.url || null,
            author: obj.author ? {{
              id: obj.author.id || null,
              name: obj.author.name || null,
              headline: obj.author.headline || null,
              avatar_url: obj.author.avatar_url || null
            }} : null,
            upvoted_count: obj.voteup_count || obj.upvoted_count || 0,
            comment_count: obj.comment_count || 0,
            created_time: obj.created || obj.created_time || null,
            updated_time: obj.updated_time || null
          }};
        }});

        return JSON.stringify({{
          success: true,
          query: '{query}',
          total: data.paging?.totals || null,
          offset: parseInt('{offset}'),
          limit: parseInt('{limit}'),
          has_next: !data.paging?.is_end || false,
          has_prev: !data.paging?.is_start || false,
          results: results
        }});
      }} catch(e) {{
        return JSON.stringify({{ error: true, message: e.message }});
      }}
    }})()
    '''.format(
        query=query_escaped,
        vertical=args.vertical,
        sort=args.sort,
        time_interval=args.time_interval,
        offset=args.offset,
        limit=args.limit
    )
    print(js)

if __name__ == '__main__':
    main()
