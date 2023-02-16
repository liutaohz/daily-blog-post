const path = require('path');
const PATH_WORK = path.resolve('./'); // 项目根目录
const PATH_RSS = path.join('app/store/rss.json'); // RSS源目录
const PATH_LINKS = path.join('app/store/links.json'); // 文章链接集合目录
const PATH_TAGS = path.join('app/store/tags.json'); // 分类标签目录
const PATH_TEMPLATE_README = path.join('app/templates/README.md');
const PATH_TEMPLATE_TAGS = path.join('app/templates/TAGS.md');
const PATH_TEMPLATE_DETAILS = path.join('app/templates/DETAILS.md');
const PATH_MD_DETAILS = path.join('app/templates/DETAILS.md');
const PATH_MD_TAGS = path.join(PATH_WORK+ '/TAGS.md');
const PATH_MD_README = path.join(PATH_WORK+ '/README.md');
const PATHVL= {
  PATH_WORK,
  PATH_RSS,
  PATH_LINKS,
  PATH_TAGS,
  PATH_TEMPLATE_README,
  PATH_TEMPLATE_TAGS,
  PATH_TEMPLATE_DETAILS,
  PATH_MD_TAGS,
  PATH_MD_README
}
module.exports = PATHVL;