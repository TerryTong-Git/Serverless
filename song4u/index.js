
const querystring = require('qs');
const fetch = require('node-fetch')
module.exports = async function(context,req) {
    const queryObject = querystring.parse(req.body);
    const Body = queryObject.Body
    // const url = Body.split("")[2]
    // let Body = req.body.entry
    console.log(Body)
    let resp = await fetch(Body, {
        method:"GET"
    })
    let data = await resp.arrayBuffer()
    let result = await analyzeimage(data);
    console.log(result)
    let img = result[0].faceAttributes.age
    
    if (5 < img && img < 25){
        age = "GenZ"}
    else if 
    	(24 < img && img < 41) {
            age = "GenY"
    }
    else if (40<img && img<57){
        age = "GenX"
    } // need the and or else stop on the first true with the inequality sign, act kinda like or
    else if (57<img && img<76) {
        age = "BabyBoomers"
    }

    context.res = {
        body: age
    };
}


async function analyzeimage(img){
    // const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    // const uriBase = process.env.EMOTIONAL_ENDPOINT + '/face/v1.0/detect';
    const subscriptionKey = "2b46dc89f4624d6ba01b0b629dd94ad0"
    const uriBase = "https://placeholdeer-face-api.cognitiveservices.azure.com/"+ '/face/v1.0/detect'

    let params = new URLSearchParams({
        'returnFaceAttributes': 'age'     //FILL IN THIS LINE
    })

    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',  //WHAT TYPE OF REQUEST?
        body: img,  //WHAT ARE WE SENDING TO THE API?
        
            //ADD YOUR TWO HEADERS HERE
        headers: {
            'Content-Type' : 'application/octet-stream',

            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })

    let data = await resp.json();

    return data;
}


//?? how to parse the body
//https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png