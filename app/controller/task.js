'use strict';

const { Controller } = require('egg');
const dailyTask = require('../utils/index');
class TaskController extends Controller {
  async index() {
    const { ctx } = this;
    const test1= dailyTask();
    console.log('test1:',test1);
    ctx.body = 'hi, TaskController';
  }
}

module.exports = TaskController;
