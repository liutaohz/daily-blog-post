'use strict';
const Subscription = require('egg').Subscription;
const dayjs = require('dayjs');
const dailyTask = require('../utils/index');
class logTime extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 30 6,12,18,21 * * ?', // 每天的2点10分执行一次
      type: 'all',// 指定所有的 worker 都需要执行
    };
  }
  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    console.log('开始执行定时任务，事件：', dayjs().format('YYYY-MM-DD HH:mm:ss'));
    dailyTask();
  }
}
module.exports = logTime;