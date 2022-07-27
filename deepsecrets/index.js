const qs = require("qs")
module.exports = async function (context, req) {
    
    const parsed = qs.parse(req.body)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: parsed.Body
    };
}