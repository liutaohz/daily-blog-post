'use strict';

const { Controller } = require('egg');
let curData = 'hi, Echo';
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  // echo 用户测试接口的post参数，然后使用get查看刚才提交的request.body数据
  async echoPost() {
    const { ctx } = this;
    const results = ctx.request.body;
    console.log('🚀 ~ file: home.js:14 ~ HomeController ~ echoPost ~ results', results);
    ctx.body = {
      data: results,
      desc: 'ok',
    };
    curData = results;
    ctx.status = 200;
  }
  async echoGet() {
    const { ctx } = this;
    ctx.body = curData;
  }
}

module.exports = HomeController;
