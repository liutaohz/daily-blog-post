<div align="center"><img width="100" src="/assets/rss.gif" /><h1>daily-blog-post</h1><p>点击右上角 <strong>Watch</strong> 订阅 <strong>最新前端技术文章</strong></p>
</div>

##

- 项目目的：每天定时抓取最新前端技术文章，并推送到 GitHub 方便查看
- 文章来源：RSS 订阅源
- 抓取时间：每天的 06:30、12:30、18:30、21:30

##

:alarm_clock: 更新时间: {{currentDate}}，:rocket: 更新条数: +{{newData.length}}

## 文章来源
{{#each linksJson}}
- [{{title}}](#{{title}})
{{/each}}

## 文章链接
{{#each linksJson}}
<details open>
<summary id="{{title}}">
{{title}}
</summary>

{{#each items}}
- [{{date}}-{{title}}]({{link}})
{{/each}}

<div align="right"><a href="#文章来源">⬆ &nbsp;返回顶部</a></div>
</details>
{{/each}}

## 其它
使用技术：
- eggjs
- rss-parser
- handlebars

### 工作流程
配置RSS源数组，每天按照配置的RSS源数组逐个爬取数据，rss-parser解析数据构造JSON数组然后使用handlebars按照编写好的模版生成md文件。
通过脚本自动提交更新到git上。
