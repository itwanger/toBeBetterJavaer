---
name: zhihu-search
description: "Search Zhihu for content using the search_v3 API. Use when user mentions Zhihu, 知乎, searching Zhihu, searching 知乎, Zhihu search, 知乎搜索, searching for answers/articles on Zhihu, or says 搜一下知乎, 在知乎上搜索, 找知乎上的, 知乎上搜搜. Also applies to exploring Zhihu's internal API endpoints, extracting search results in bulk, and monitoring Zhihu for new content on specific topics."
---

# Zhihu — Search

> Search query → Structured search results with pagination support

## Language

All process output to user (progress updates, process notifications) follows the user's language.

## Objective

Provide reliable access to Zhihu's search API to extract structured content (answers, articles, users, topics, etc.) with filtering, sorting, and pagination capabilities.

## Prerequisites

- Target page is already open in the browser: `https://www.zhihu.com/`

## Pre-execution Checks

### 1. Tool Readiness

If browser-act has been confirmed available in the current session → skip this step.

Invoke `browser-act` via Skill tool to load usage. If installation or configuration issues arise, follow its guidance to resolve then retry.

### 2. Login Verification

If login status for the target site has been confirmed in the current session → skip this step.

Otherwise: open the target site and observe the page login status:
- Logout/sign-out entry, user avatar, or username exists → logged in, continue execution
- Login/register entry exists with no logout entry → not logged in, inform the user that login is needed first, assist the user in completing the login flow

User refuses or cannot log in → terminate execution.

## Capability Components

> This Skill's operational boundary = what the user can manually do in their browser. It only reads data already displayed to the user on the page, never bypassing authentication or access controls. Its role is equivalent to copy-pasting on the user's behalf — the data is already on screen, automation merely saves time. JS code is encapsulated in Python files under the `scripts/` directory, invoked via `eval "$(python scripts/xxx.py {params})"`. `$(...)` is bash syntax; it is recommended to use the bash tool for execution.

Below are all atomic capabilities discovered and verified during the exploration phase, listed by command template with parameters. Simply invoke them as needed — no need to read `scripts/*.py` source code or re-verify. Only inspect scripts when execution fails for troubleshooting. Combine freely as needed during execution.

### API: Search Zhihu

`eval "$(python scripts/search.py '{query}' --vertical {vertical} --sort {sort} --time-interval {time_interval} --offset {offset} --limit {limit})"`

Parameters:
- query: Search query string (required)
- --vertical: Content type, default answer (answer, article, zhuanlan, people, topic, live)
- --sort: Sort order, default default (default, upvoted_count, created_time)
- --time-interval: Time filter, default all (all, a_day, a_week, a_month, three_months, half_a_year, a_year)
- --offset: Pagination offset, default 0
- --limit: Items per page, default 20

Output example:
```json
{
  "success": true,
  "query": "AI Agent",
  "total": 1250,
  "offset": 0,
  "limit": 20,
  "has_next": true,
  "has_prev": false,
  "results": [
    {
      "type": "search_result",
      "id": "123456789",
      "title": "如何理解 AI Agent？",
      "excerpt": "AI Agent 是指能够自主感知环境、做出决策并执行动作的智能体...",
      "url": "https://www.zhihu.com/question/1234567/answer/123456789",
      "author": {
        "id": "987654321",
        "name": "张三",
        "headline": "AI 研究员",
        "avatar_url": "https://pic2.zhimg.com/v2-xxx.jpg"
      },
      "upvoted_count": 1520,
      "comment_count": 89,
      "created_time": 1701234567,
      "updated_time": 1701234567
    }
  ]
}
```

## Enum Parameters

[API] vertical, sort, time_interval — `eval "$(python scripts/enum-params.py --param all)"`

## Pagination

**API Pagination**: `offset`, type: `page-number`, start value: `0`. Next page value source: `increment by limit`. Termination: `has_next === false`.

## Success Criteria

`result.results.length >= 1 or result.total >= 0 (valid zero-result response)`

## Known Limitations

- Rate limits may apply with excessive requests
- Some content types may return fewer results than expected
- Time filters apply to content creation time, not update time

## Execution Efficiency

- **Batch orchestration**: Write a bash script to loop through the command templates serially within a single session; do not parallelize within one browser (prone to triggering anti-scraping restrictions). Refer to rate information in "Known Limitations" above to add appropriate intervals. To increase throughput, open multiple stealth browser sessions and distribute work across them — each session has an independent fingerprint so rate limits apply per session
- **Test before batch execution**: After writing a batch script, you must first test with 1-2 items to verify the script runs correctly; only then run the full batch. Never skip testing and execute in batch directly
- **Reduce redundant pre-operations**: When multiple steps depend on the same prerequisite state, complete them in batch under that state to avoid repeatedly establishing the same state
- **Error resumption**: Save results item by item during batch processing; on failure, resume from the breakpoint rather than starting over

## Experience Notes

Path: `browser-act-skill-forge-memories/zhihu-search-zhihu-search.memory.md`

**Before execution**: If the file exists, read it first — it records unexpected situations encountered during past executions (e.g., a strategy has become ineffective); adjust strategy order accordingly.

**After execution**: If an unexpected situation is encountered (strategy became ineffective, page redesigned, anti-scraping upgraded, better path discovered), append a line:
`{YYYY-MM-DD}: {what happened} → {conclusion}`

Normal execution does not write to the file. Do not record what keywords were used or how many results were returned — those are task outputs, not experience.
