/* eslint-disable no-unused-vars */
const fs = require('fs-extra');
const path = require('path');
const dayjs = require('dayjs');
const Handlebars = require('handlebars');
const PATHVL = require('./paths');
const {
  PATH_WORK,
  PATH_TAGS,
  PATH_TEMPLATE_README,
  PATH_TEMPLATE_TAGS,
  PATH_TEMPLATE_DETAILS,
  PATH_MD_TAGS,
  PATH_MD_README } = PATHVL;
console.log('PATH_WORK:', PATH_WORK);
console.log('PATH_TAGS:', PATH_TAGS);
console.log('PATH_TEMPLATE_README:', PATH_TEMPLATE_README);
console.log('PATH_TEMPLATE_TAGS:', PATH_TEMPLATE_TAGS);
console.log('PATH_TEMPLATE_DETAILS:', PATH_TEMPLATE_DETAILS);
console.log('PATH_MD_TAGS:', PATH_MD_TAGS);
console.log('PATH_MD_README:', PATH_MD_README);
function formatTitle(title) {
  return title.replace('<![CDATA[', '').replace(']]>', '').replace(/[\[\]\(\)]/g, '')
    .replace(/\s+/g, '-');
}
/**
 * 渲染 README.md 文件
 * @param newData
 * @param linksJson
 */
function handleREADME(newData, linksJson) {
  const sourceTpl = fs.readFileSync(PATH_TEMPLATE_README, 'utf-8');
  const templateData = Handlebars.compile(sourceTpl);
  const currentDate = dayjs().format('YYYY-MM-DD HH:mm');

  const content = templateData({
    newData,
    linksJson,
    currentDate,
    formatTitle,
  });

  fs.outputFileSync(PATH_MD_README, content, 'utf-8');
}

/**
 * 渲染 TAGS.md 文件
 * @param newData
 * @param linksJson
 */
function handleTags(newData, linksJson) {
  const currentDate = dayjs().format('YYYY-MM-DD HH:mm');
  const tags = fs.readJsonSync(PATH_TAGS);

  tags.forEach((tag, i) => {
    tags[i].items = [];

    linksJson.forEach(o => {
      o.items.forEach(item => {
        if (!item.rssTitle && (new RegExp(tag.keywords, 'gi')).test(item.title)) {
          item.rssTitle = o.title;
          tags[i].items.push(item);
        }
      });
    });

    // details/tags/file.md
    const sourceTpl = fs.readFileSync(PATH_TEMPLATE_DETAILS, 'utf8');
    const templateData = Handlebars.compile(sourceTpl);
    const filename = tag.filename + '.md';

    const detailContent = templateData({
      currentDate,
      formatTitle,
      title: tags[i].tag,
      keywords: tags[i].keywords,
      items: tags[i].items,
    });

    fs.outputFileSync(path.join(PATH_WORK, 'details/tags/', filename), detailContent, 'utf-8');

  });

  const tagTpl = fs.readFileSync(PATH_TEMPLATE_TAGS, 'utf-8');
  const templateTagData = Handlebars.compile(tagTpl);

  const content = templateTagData({
    currentDate,
    formatTitle,
    tags,
  });

  fs.outputFileSync(PATH_MD_TAGS, content, 'utf-8');
}

/**
 * 生成每个详情页面
 * @param newData
 * @param linksJson
 */
function handleDetails(newData, linksJson) {
  const currentDate = dayjs().format('YYYY-MM-DD HH:mm');
  const sourceTpl = fs.readFileSync(PATH_TEMPLATE_DETAILS, 'utf8');
  const templateData = Handlebars.compile(sourceTpl);

  linksJson.forEach(source => {
    if (source.title in newData.rss) {
      source.currentDate = currentDate;
      source.formatTitle = formatTitle;

      const content = templateData(source);

      let filename = source.title.replace(/[\\\/]/g, '');
      filename += '.md';

      fs.outputFileSync(path.join(PATH_WORK, 'details', filename), content, 'utf-8');
    }
  });
}

module.exports = async function(newData, linksJson) {
  handleREADME(newData, linksJson);
  // handleTags(newData, linksJson) // 待完善
  // handleDetails(newData, linksJson)// 待完善
};
