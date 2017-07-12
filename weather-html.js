var request = require('request');
var cheerio = require('cheerio');


var url = 'http://www.cwb.gov.tw/V7/forecast/taiwan/Taipei_City.htm';

function weather_html(url, callback) {

    request(url, function (error, response, html) {
        //if (error) reject(error);
        //console.log(html)
        callback(html)
    })

}

function cb_weather_html(html) {
    //console.log(html)

    var $ = cheerio.load(html);
    let returnData = [];

    //取得標題
    let target_html = $('table.FcstBoxTable01').eq(0);

    target_html.find('thead th').each(function (i, element) {

        let data = $(this).text().split('\n')
        //console.log(JSON.stringify(data))
        // data.map(function(value, i, data){
        //     //console.log(value)
        // })
        returnData.push({
            title: $(this).text()
        })

    });

    console.log(returnData)

    //內容值
    target_html.find('tbody').eq(0).each(function (i, element) {
        
        let data = $(this).text().split('\n')

        data.map(function(val, i, data){
            return {
                qq: val[0]
            }
        })

        console.log(JSON.stringify(data))

        // returnData.push({
        //     val: $(this).text()
        // })
    });

}

weather_html(url, cb_weather_html)


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



