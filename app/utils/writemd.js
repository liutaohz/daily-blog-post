const fs = require('fs-extra')
const path = require('path')
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
  return title.replace('<![CDATA[', '').replace(']]>', '').replace(/[\[\]\(\)]/g, '').replace(/\s+/g, '-')
}
/**
 * 渲染 README.md 文件
 */
function handleREADME(newData, linksJson) {
  let sourceTpl = fs.readFileSync(PATH_TEMPLATE_README, 'utf-8');
  const templateData = Handlebars.compile(sourceTpl);
  const currentDate = dayjs().format('YYYY-MM-DD HH:mm')

  content = templateData({
    newData,
    linksJson,
    currentDate,
    formatTitle: formatTitle,
  })

  fs.outputFileSync(PATH_MD_README, content, 'utf-8')
}

/**
 * 渲染 TAGS.md 文件
 */
function handleTags(newData, linksJson) {
  const currentDate = dayjs().format('YYYY-MM-DD HH:mm')
  let tags = fs.readJsonSync(PATH_TAGS)

  tags.forEach((tag, i) => {
    tags[i].items = []

    linksJson.forEach((o) => {
      o.items.forEach((item) => {
        if (!item.rssTitle && (new RegExp(tag.keywords, 'gi')).test(item.title)) {
          item.rssTitle = o.title
          tags[i].items.push(item)
        }
      })
    })

    // details/tags/file.md
    const sourceTpl = fs.readFileSync(PATH_TEMPLATE_DETAILS,'utf8');
    const templateData = Handlebars.compile(sourceTpl);
    const filename = tag.filename + '.md'

    const detailContent = templateData({
      currentDate,
      formatTitle: formatTitle,
      title: tags[i].tag,
      keywords: tags[i].keywords,
      items: tags[i].items
    })

    fs.outputFileSync(path.join(PATH_WORK, 'details/tags/', filename), detailContent, 'utf-8')

  })

  let tagTpl = fs.readFileSync(PATH_TEMPLATE_TAGS, 'utf-8')
  let templateTagData = Handlebars.compile(tagTpl);

  content = templateTagData({
    currentDate,
    formatTitle: formatTitle,
    tags
  })

  fs.outputFileSync(PATH_MD_TAGS, content, 'utf-8')
}

/**
 * 生成每个详情页面
 */
function handleDetails(newData, linksJson) {
  const currentDate = dayjs().format('YYYY-MM-DD HH:mm');
  const sourceTpl = fs.readFileSync(PATH_TEMPLATE_DETAILS,'utf8');
  const templateData = Handlebars.compile(sourceTpl);

  linksJson.forEach((source) => {
    if (source.title in newData.rss) {
      source.currentDate = currentDate
      source.formatTitle = formatTitle

      content = templateData(source)

      let filename = source.title.replace(/[\\\/]/g, '')
      filename += '.md'

      fs.outputFileSync(path.join(PATH_WORK, 'details', filename), content, 'utf-8')
    }
  })
}

module.exports = async function (newData, linksJson) {
  handleREADME(newData, linksJson)
  handleTags(newData, linksJson)
  handleDetails(newData, linksJson)
}
