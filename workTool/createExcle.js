var xlsx = require('node-xlsx');
var fs = require('fs');

let date = new Date()
// 记录时用的日期格式 - 目前从月开头，没用年
let timeStr = `${date.getMonth()+1}月${date.getDate()}日@${date.getHours()}点${date.getMinutes()}分${date.getSeconds()}秒`

var res = xlsx.parse("./" + "new1.xlsx")
console.log(JSON.stringify(res))

let result = res && res[0] || {}

let data = result.data || []

// 根据index设置对应key值
let translateMap = ["currentType", "evaluationTitle", "evaluationTitleOld", "goToEvaluate", "hateEvaluation", "loveEvaluation", "evaluationOption", "evaluationComment", "pleaseEnter", "evaluationCompleted", "commitQuality"]
let translateResult = {}
data.forEach(item => {
    if(item instanceof Array) {
        let keyName = item[0]?.toLocaleLowerCase()
        let obj = translateResult[keyName] = {}
        item.forEach((cell, index) => {
            let key = translateMap[index] || 'none'
            obj[key] = cell
        })
    }
})

let strObj = JSON.stringify(translateResult)

console.log('格式 ------------ ：', strObj)

fs.writeFileSync(`翻译列表-${timeStr}.txt`, `${strObj}`, err => {
  console.log("输出信息：", err)
});



// 原使用方式-----------------

/*

var data = [
    {
        name : 'sheet1',
        data : [
            [
                'ID',
                'Name',
                'Score'
            ],
            [
                '1',
                'Michael',
                '99'

            ],
            [
                '2',
                'Jordan',
                '98'
            ]
        ]
    },
    {
        name : 'sheet2',
        data : [
            [
                'AA',
                'BB'
            ],
            [
                '23',
                '24'
            ]
        ]
    }
]

// 写xlsx
var buffer = xlsx.build(data);
fs.writeFile('./resut.xls', buffer, function (err) {
    if (err)
        throw err;
    console.log('Write to xls has finished');
    
// 读xlsx
    var obj = xlsx.parse("./" + "resut.xls");
    console.log(JSON.stringify(obj));
});

*/