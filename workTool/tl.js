const fs = require('fs')
let text = {}

// text = {
//   welcomeAndAppTitle: '欢迎语&APP对外名称设置',
//   deviceInfoSetTitle: '设备信息自定义收集',
//   newSetTipContent1: '设置用户打开人工对话页面的欢迎语及不同语言下的APP对外名称',
//   newSetTipContent2: '在此设置SDK收集的设备信息内容，设备信息内容主要展示在客诉详情右侧“设备信息”栏中',
//   newSetTipContent3: '设置用户打开人工对话页面的欢迎语及不同语言下的APP对外名称',
//   autoImgsTip1new: `1. 自定义主题发布后，应用初始化即可看到自定义主题效果。`,
//   viewLocation: '查看位置示例',
//   nickExample: 'APP对外名称示例',
//   welcomeExample: '欢迎语示例',
//   confirmResetDefault: '确定要恢复默认设置吗？',
// }

text = {
  ownedSite: `所属站点`,
  migrateTo: `迁移至{name}`,
  migrating: `迁移中`,
  chinaStation: `中国站`,
  internationalStation: `国际站`,
  storeDataIn: `将数据存储在{name}`,
  storeDataTips1: `选择此项后，您数据的存储、传输等将在国际服务器进行。`,
  storeDataTips2: `选择此项后，您数据的存储、传输等将在中国服务器进行。`,
  migrateTitle: `要将应用数据迁移到中国站点吗？`,
  migrateTips1: `您可以发送邮件至 support@aihelp.net 发起您的数据迁移请求，我们将尽快为您提供目标应用的数据迁移相关服务。`,
  migrateTips2: `应用数据迁移后，其数据的存储、传输等将会在中国站进行，并且不能被再次迁移至国际站点！同时原始数据将允许被保留1个月，1个月之后会被删除。`,
  migrateTips3: `应用数据迁移过程中，请不要操作该应用的相关数据。`,
}

let date = new Date()
// let timeStr = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`
let timeStr = `${date.getMonth()+1}月${date.getDate()}日@${date.getHours()}点${date.getMinutes()}分${date.getSeconds()}秒`

let str = ""
for(let key in text) {
	str += `${key}=${text[key]}\n`
}

console.log(str)
let name = process.env.name || ''
fs.writeFileSync(`./csq@${(name || timeStr)}.ini`, str, err => {
  console.log("输出信息：", err)
});