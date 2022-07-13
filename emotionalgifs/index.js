const multipart = require('parse-multipart');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    console.log(req.headers['content-type'])
    const boundary = multipart.getBoundary(req.headers['content-type']);
    const body = req.body
    const parts = multipart.Parse(body,boundary)


    const result = await analyzeImage(parts[0].data);

    let emotions = result[0].faceAttributes.emotion;

    let objects = Object.values(emotions);

    const main_emotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));


    context.res = {
        body: main_emotion
    };
}

async function analyzeImage(img){
    // const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    // const uriBase = process.env.EMOTIONAL_ENDPOINT + '/face/v1.0/detect';
    const subscriptionKey = "2b46dc89f4624d6ba01b0b629dd94ad0"
    const uriBase = "https://placeholdeer-face-api.cognitiveservices.azure.com/"+ '/face/v1.0/detect'

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'     //FILL IN THIS LINE
    })

    //COMPLETE THE CODE
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



