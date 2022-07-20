
const querystring = require('qs');
const fetch = require('node-fetch')
module.exports = async function(context,req) {
    // const queryObject = querystring.parse(req.body);
    // const Body = queryObject.Body
    // const url = Body.split("")[2]
    let Body = req.body.entry
    console.log(Body)
    let resp = await fetch(Body, {
        method:"GET"
    })
    let data = await resp.arrayBuffer()
    let result = await analyzeimage(data);
    console.log(result)
    let img = result[0].faceAttributes.age
    
    const songs = {"GenZ":"https://open.spotify.com/track/0SIAFU49FFHwR3QnT5Jx0k?si=1c12067c9f2b4fbf", 
"GenY":"https://open.spotify.com/track/1Je1IMUlBXcx1Fz0WE7oPT?si=a04bbdf6ec4948b9", 
"GenX":"https://open.spotify.com/track/4Zau4QvgyxWiWQ5KQrwL43?si=790d9e3ef2ed408d", 
"BabyBoomers":"https://open.spotify.com/track/4gphxUgq0JSFv2BCLhNDiE?si=1abb329f2dc24f50", 
"Unknown":"https://open.spotify.com/track/5ygDXis42ncn6kYG14lEVG?si=84b49b41d09d4d11"}

    if (5 < img && img < 25){
        age = "GenZ";
        value = songs[age]
        }
    else if 
    	(24 < img && img < 41) {
            age = "GenY"
            value = songs[age]
    }
    else if (40<img && img<57){
        age = "GenX"
        value = songs[age]
    } // need the and or else stop on the first true with the inequality sign, act kinda like or
    else if (57<img && img<76) {
        age = "BabyBoomers"
        value = songs[age]
    }

    let return_string = `We guessed you're part of this generation: ${age}! Happy listening to ${value}`

    context.res = {
        body: return_string
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