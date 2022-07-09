const multipart = require('parse-multipart')
const fetch = require('node-fetch')

async function analyzeImage(img) {
    const subscription_key = process.env.SUBSCRIPTION_KEY
   
    const uribase = process.env.API_ENDPOINT + '/face/v1.0/detect'
    const params = {
        'returnFaceID': "true",
        'returnFaceAttributes': "emotion"
    }
    const resp = await fetch(uribase + '?' + params.toString(), {
        method: "POST",
        body: params,
        headers: {
            "content-type": "application/octet-stream",
            "Ocp-Apim-Subscription-Key": subscription_key
        }
    })
    const data = await resp.json()
    return data
}



module.exports = async function (context, req) {
    
    const boundary = multipart.getBoundary(req.headers['content-type']) //boundary splits it like the XXX example
    const body = req.body
    parts = multipart.Parse(body, boundary)
    const result = await analyzeImage(parts[0].data)
    context.res = { 
    body:{
        result
    }
}}
//what are the exports?