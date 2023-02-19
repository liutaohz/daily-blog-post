/* eslint-disable no-else-return */

const fs = require('fs-extra');
const Async = require('async');
const dayjs = require('dayjs');
const queryString = require('query-string');
const { exec } = require('child_process');
const fetch = require('./fetch');
const PATHVL = require('./paths');
const writemd = require('./writemd');
const { PATH_WORK, PATH_RSS, PATH_LINKS, PATH_TAGS } = PATHVL;
let rssJson = null;
let linksJson = null;
let newData = null;
/**
   * 判断链接是否存在
   * @param link
   * @param compare
   */
function isSameLink(link, compare) {
  link = link.replace(/&amp/g, '&');
  compare = compare.replace(/&amp/g, '&');

  const oLink = queryString.parseUrl(link);
  const oCompare = queryString.parseUrl(compare);
  const reWx = /mp\.weixin\.qq\.com/;

  if (reWx.test(oLink.url) && reWx.test(oCompare.url)) {
    return oLink.query.sn === oCompare.query.sn && oLink.query.mid === oCompare.query.mid;
  } else {
    return link === compare;
  }
}
function dailyTask() {
  console.log('开始执行每日任务');
  console.log('PATH_RSS:', PATH_RSS);
  console.log('PATH_LINKS:', PATH_LINKS);
  console.log('PATH_TAGS:', PATH_TAGS);
  rssJson = fs.readJsonSync(PATH_RSS);
  linksJson = fs.readJsonSync(PATH_LINKS);
  newData = {
    length: 0,
    titles: [],
    rss: {},
    links: {},
  };
  const tasks = rssJson.map((rssItem, rssIndex) => callback => {
    ((async () => {
      const feed = await fetch(rssItem);
      if (feed) {
        const items = linksJson[rssIndex]?.items || [];
        const newItems = feed.items.reduce((prev, curr) => {
          const exist = items.find(el => isSameLink(el.link, curr.link));
          if (exist) {
            return prev;
          } else {
            let date = dayjs().format('YYYY-MM-DD');
            try {
              date = dayjs(curr.isoDate).format('YYYY-MM-DD');
            } catch (e) {
              console.error(e);
            }

            newData.rss[rssItem.title] = true;
            newData.links[curr.link] = true;

            return [ ...prev, {
              title: curr.title,
              link: curr.link,
              date,
            }];
          }
        }, []);

        if (newItems.length) {
          console.log('更新 RSS: ' + rssItem.title);
          newData.titles.push(rssItem.title);
          newData.length += newItems.length;
          linksJson[rssIndex] = {
            title: rssItem.title,
            items: newItems.concat(items).sort(function(a, b) {
              return a.date < b.date ? 1 : -1;
            }),
          };
        }
      }
      callback(null);
    })());
  });
  function gitTash() {
    const command = `cd ${PATH_WORK} &&git add . && git commit -m ":pencil: 更新抓取文章信息" && git pull && git push`;
    const workerProcess = exec(
      command,
      { timeout: 10000 },
      (error, stdout, stderr) => {
        if (error) {
          console.log('gitTash--error:', error);
        }
        if (stdout) {
          console.log('gitTash--stdout:', stdout);
        }
        if (stderr) {
          console.log('gitTash--stderr:', stderr);
        }
      }
    );
    workerProcess.on('exit', function() {
      console.log('gitTash--:exit');
    });
  }
  Async.series(tasks, async () => {
    console.log('🚀 ~ PATH_WORK', PATH_WORK);
    if (newData.length) {
      console.log('🚀 ~ file: index.js:32 ~ newData', newData);
      console.log('🚀 ~ file: index.js:32 ~ linksJson', linksJson);
      try {
        fs.outputJsonSync(PATH_LINKS, linksJson, {
          spaces: 2,
        });
        await writemd(newData, linksJson); // 根据数据和Handlebars语法生成文件，编写MD模版
        gitTash(); // 更新文件推送到github上
      } catch (e) {
        console.warn('🚀 ~ e', e);
      }
    } else {
      console.log('无需更新');
    }
    rssJson = null;
    linksJson = null;
    newData = null;
  });
}
module.exports = dailyTask;
