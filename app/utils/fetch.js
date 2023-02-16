const Parser = require('rss-parser');
const Async = require('async');

async function fetchFeed(rss) {
  const parser = new Parser({
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5396.3 Safari/537.36'
    },
  })

  try {
    const feed = await parser.parseURL(rss)
    if (feed) {
      console.log('请求成功 RSS:')
      return feed
    }
  } catch (e) {}

  console.warn('请求失败 RSS: ' + rss)
  return true
}

async function initFetch(rssItem, onFinish) {
  let rssArray = rssItem.rss

  if (typeof rssArray === 'string') {
    rssArray = [rssArray]
  }

  const tasks = rssArray.map((rss) => ((callback) => {
    ((async () => {
      const feed = await fetchFeed(rss)

      if (feed === true) {
        callback(true)
      } else {
        callback(null, feed)
      }
    })())
  }))

  console.log('开始 RSS: ' + rssItem.title)

  return new Promise((resolve) => {
    Async.tryEach(tasks, (err, res) => {
      console.log('完成 RSS: ' + rssItem.title)
      resolve(err ? null : res)
    })
  })
}

module.exports = initFetch