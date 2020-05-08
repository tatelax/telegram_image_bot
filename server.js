const Telegraf = require('telegraf')
const bot = new Telegraf('730949022:AAECsY2BccCDWv6l_6NYk2kuyXJhfhm3gAw')
const gis = require('g-i-s');
const fs = require('fs');

console.log('Tatelax\'s image bot has started successfully!')

bot.command('img', (function (ctx, next) {
    var query = ctx.message.text.replace('/img ', '')
    var searchingMessage = 'Searching for ' + ctx.from.first_name + '\'s ' + '\"' + query + '\"' + '...'

    ctx.reply('🔍 ' + searchingMessage)
    console.log(new Date().toUTCString() + " : " + searchingMessage)

    fs.appendFile("./log.txt", new Date().toUTCString() + " : " + searchingMessage + "\n", function(err) {
        if(err) {
            return console.log("Problem saving the log file... " + err);
        }
    });

    gis(query, function search(error, results) {
        if (error) {
            console.log(error);
        } else {
            var index = getRandomInt(0, results.length)
            var selectedResult

            try {
                selectedResult = JSON.parse(JSON.stringify(results, null, ' '))[index].url
            } catch (err) {
                console.log('There was a problem! ' + "\n" + err)
            }

            var resultMessage = "Result for " + ctx.from.first_name + '\'s ' + '\"' + query + '\"' + " found! \n" + selectedResult + "\n"


            ctx.reply("💡 " + resultMessage)
            console.log(new Date().toUTCString() + " : " + resultMessage)

            fs.appendFile("./log.txt", new Date().toUTCString() + " : " + resultMessage + "\n", function(err) {
                if(err) {
                    return console.log("Problem saving the log file... " + err);
                }
            });
        }
    })
}))

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

bot.launch()
