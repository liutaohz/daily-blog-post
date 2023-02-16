'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/echo', controller.home.echoPost);
  router.get('/echo', controller.home.echoGet);
  router.get('/task', controller.task.index);
};
