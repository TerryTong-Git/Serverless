const multipart = require('parse-multipart')

module.exports = async function (context, req) {
    
    const boundary = multipart.getBoundary(req.headers['content-type']) //boundary splits it like the XXX example
    const body = req.body
    parts = multipart.Parse(body, boundary)
    let converted_result = Buffer.from(parts[0].data).toString('base64')
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: converted_result
    };
}