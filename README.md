<div align="center"><img width="100" src="/assets/rss.gif" /><h1>daily-blog-post</h1><p>点击右上角 <strong>Watch</strong> 订阅 <strong>最新前端技术文章</strong></p>
</div>

##

- 项目目的：每天定时抓取最新前端技术文章，并推送到 GitHub 方便查看
- 文章来源：RSS 订阅源
- 抓取时间：每天的 06:30、12:30、18:30、21:30

##

:alarm_clock: 更新时间: 2023-02-19 13:31，:rocket: 更新条数: +28

## 文章来源
- [Node-Weekly](#Node-Weekly)
- [JavaScript-Weekly](#JavaScript-Weekly)
- [淘系前端团队](#淘系前端团队)

## 文章链接
<details open>
<summary id="Node-Weekly">
Node-Weekly
</summary>

- [2023-02-16-Automatic integration tests for Express apps](https://nodeweekly.com/issues/474)
- [2023-02-09-Node gets a new URL parser](https://nodeweekly.com/issues/473)
- [2023-02-02-SQL in your JavaScript](https://nodeweekly.com/issues/472)
- [2023-01-26-Automating the desktop with Node](https://nodeweekly.com/issues/471)

<div align="right"><a href="#文章来源">⬆ &nbsp;返回顶部</a></div>
</details>
<details open>
<summary id="JavaScript-Weekly">
JavaScript-Weekly
</summary>

- [2023-02-17-JavaScript sans build systems?](https://javascriptweekly.com/issues/626)
- [2023-02-10-Bringing JavaScript to WebAssembly](https://javascriptweekly.com/issues/625)
- [2023-02-03-Ways to remove event listeners](https://javascriptweekly.com/issues/624)
- [2023-01-27-Astro 2.0 and TypeScript 5.0 beta](https://javascriptweekly.com/issues/623)

<div align="right"><a href="#文章来源">⬆ &nbsp;返回顶部</a></div>
</details>
<details open>
<summary id="淘系前端团队">
淘系前端团队
</summary>

- [2021-09-08-VS Code 是如何优化启动性能的？](https://fed.taobao.org/blog/taofed/do71ct/wpsf10)
- [2021-08-05-服饰3D柔性渲染调研及实践](https://fed.taobao.org/blog/taofed/do71ct/fufsgh)
- [2021-06-23-业务系统的稳定性建设](https://fed.taobao.org/blog/taofed/do71ct/fc3cy0)
- [2021-05-15-All in one：项目级 monorepo 策略最佳实践](https://fed.taobao.org/blog/taofed/do71ct/uihagy)
- [2021-03-09-Midway Serverless 发布 2.0，一体化让前端研发再次提效](https://fed.taobao.org/blog/taofed/do71ct/mvd9lw)
- [2021-02-10-2021年前端趋势预测](https://fed.taobao.org/blog/taofed/do71ct/tfeye7)
- [2020-12-31-前端智能化实践— P2C 从需求文档生成代码](https://fed.taobao.org/blog/taofed/do71ct/ffeogu)
- [2020-12-10-舒文：浅谈阿里前端的多样化](https://fed.taobao.org/blog/taofed/do71ct/krg5m9)
- [2020-12-02-CodeReview 下一代：基于 KAITIAN 的纯前端 CR IDE](https://fed.taobao.org/blog/taofed/do71ct/uyaxag)
- [2020-11-27-Pick 阿里巴巴前端练习生计划，成为专业前端人！](https://fed.taobao.org/blog/taofed/do71ct/fiayw0)
- [2020-11-16-4982亿背后的前端技术—2020天猫双11前端体系大揭秘](https://fed.taobao.org/blog/taofed/do71ct/egg54e)
- [2020-10-12-用SVG实现一个优雅的提示框](https://fed.taobao.org/blog/taofed/do71ct/ghpnlx)
- [2020-09-11-淘系前端互动引擎EVAJS架构与生态实现](https://fed.taobao.org/blog/taofed/do71ct/pg45el)
- [2020-09-09-10 个你可能还不知道 VS Code 使用技巧](https://fed.taobao.org/blog/taofed/do71ct/eonv5x)
- [2020-09-04-我的前端成长之路： 在阿里七年，我的成长和迷茫](https://fed.taobao.org/blog/taofed/do71ct/ttpk5r)
- [2020-09-01-JavaScript 深度学习 - Hello World](https://fed.taobao.org/blog/taofed/do71ct/er55la)
- [2020-08-27-入职一年多的一些思考](https://fed.taobao.org/blog/taofed/do71ct/sxz5ap)
- [2020-08-25-如何在应用架构中设计微前端方案 - icestark](https://fed.taobao.org/blog/taofed/do71ct/xgmaz3)
- [2020-08-21-阿里实习 90 天：从实习生的视角谈谈个人成长](https://fed.taobao.org/blog/taofed/do71ct/acbnym)
- [2020-08-20-什么是人工智能自动编程？它只是一个噱头吗？](https://fed.taobao.org/blog/taofed/do71ct/clcgcc)

<div align="right"><a href="#文章来源">⬆ &nbsp;返回顶部</a></div>
</details>

## 其它
使用技术：
- eggjs
- rss-parser
- handlebars

### 工作流程
配置RSS源数组，每天按照配置的RSS源数组逐个爬取数据，rss-parser解析数据构造JSON数组然后使用handlebars按照编写好的模版生成md文件。
通过脚本自动提交更新到git上。
