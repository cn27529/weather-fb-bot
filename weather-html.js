var request = require('request');
var cheerio = require('cheerio');

var url = 'http://www.cwb.gov.tw/V7/forecast/taiwan/Taipei_City.htm';

function weather_html(url, callback) {

    request(url, function(error, response, html) {
        //if (error) reject(error);
        //console.log(html)
        let data = callback(html)
        console.log(data)
    })

}

weather_html(url, cb_weather_html)


function cb_weather_html(html) {
    //console.log(html)

    var $ = cheerio.load(html);
    let returnData = [];

    //取得標題
    let target_html = $('table.FcstBoxTable01').eq(0);

    target_html.find('thead th').each(function(i, element) {

        let data = $(this).text().split('\n')
            //console.log(JSON.stringify(data))
            // data.map(function(value, i, data){
            //     //console.log(value)
            // })
        returnData.push({
            title: $(this).text(),
            vals: []
        })

    });

    //console.log(returnData)

    var item_len = target_html.find('tbody tr').length

    //內容值
    for (var i = 0; i < item_len; i++) {
        target_html.find('tbody tr').eq(i).each(function(i, element) {

            let data = $(this).text().split('\n')
                //console.log(JSON.stringify(data))

            let val0 = data[1].split('\t\t')
            returnData[i].vals.push(val0[1])

            let val1 = data[2].split('\t\t')
            returnData[i + 1].vals.push(val1[1])

            let val3 = data[5].split('\t\t')
            returnData[i + 3].vals.push(val3[1])

            let val6 = data[6].split('\t\t')
            returnData[i + 4].vals.push(val6[1])

            //console.log(JSON.stringify(data[1]))

            // returnData2.push({
            //     item: $(this).text()
            // })
        })
    }

    //console.log(returnData)

    return returnData

    // target_html.find('tbody tr').eq(0).each(function(i, element) {

    //     let data = $(this).text().split('\n')
    //         //console.log(JSON.stringify(data))

    //     // data.map(function(val, i, data) {
    //     //     return {
    //     //         qq: val[0]
    //     //     }
    //     // })

    //     //console.log(data)

    //     returnData2.push({
    //         item: $(this).text()
    //     })
    // });

    //console.log(returnData2)


}



// var $ = cheerio.load(html);

// let returnData = [];
// $('.FcstBoxTable01 > td').each(function (i, element) {

//     console.log(i)

//     // returnData.push({
//     //     val: $(this).text()
//     // })
// });
//resolve(returnData);

// const $ = cheerio.load('<ul id="fruits">' +
//     '<li class="apple">Apple</li>' +
//     '<li class="orange">Orange</li>' +
//     '<li class="pear">Pear</li>' +
//     '</ul>');

// let data = [];

// $('#fruits > li').each(function (i, elem) {
//     //console.log($(this).text())
//     data.push({
//         val: $(this).text()
//     })
// });

// console.log(data)