const prompt = require('prompt-sync')();
const fetch = require('node-fetch');
const cheerio = require('cheerio');
let item;
let itemColourway;
let itemHref;
let itemArr = [];
let itemCarr = [];
let itemHrefArr = [];


function mainProcess(){
    let clothingTypes = ['sale', 'jackets', 'shirts', 'tops/sweaters', 'sweatshirts', 'shorts', 'hats', 'bags', 'accessories', 'exit program'];
    console.log('');
    
    for(i=0; i<10; i++){
        console.log(`${i}) ${clothingTypes[i]}`)
    }
    console.log('');

    const decision = prompt('Please select which type of clothing you would like to get data on: ');

    console.log('');

    for(x=0; x<10; x++){
        if(decision == x){
            if (decision == 3){
                let submitType = 'tops_sweaters';
                startSearch(submitType);
            } else {
                let submitType = clothingTypes[x];
                startSearch(submitType);
            }
            if(decision == 9){
                console.clear();
                process.exit();

            }
        }
    }
}

function startSearch(submitType){
    fetch(`https://www.supremenewyork.com/shop/all/${submitType}`)
    .then(function (response) {
        const status = response.status;

        if(status == 200){
            return response.text();
        } else if(status != 200){
            console.log('status error, request not completed.');
        }
    
    }).then(function (html) {

        const $ = cheerio.load(html);

        $('.inner-article h1').each((i, el) => {
            item = $(el).text();
            itemArr.push(item);

        })

        $('.inner-article p').each((i, el) => {
            itemColourway = $(el).text();
            itemCarr.push(itemColourway);

        })

        $('.inner-article h1 .name-link').each((i, el) => {
            itemHref = $(el).attr('href');
            itemHrefArr.push(itemHref);

        })

        for(y=0;y<itemArr.length; y++){
            console.log('\x1b[31m', `Item Name: '${itemArr[y]}',`, '\x1b[32m', `Colourway: '${itemCarr[y]}',`, '\x1b[34m', `link: 'https://www.supremenewyork.com/shop/${submitType}${itemHrefArr[y]}`)
        }

        console.log("\x1b[0m", '');
        console.log('----------------------------------');
        mainProcess();
    })
}

mainProcess();