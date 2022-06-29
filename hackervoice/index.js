module.exports = async function (context, req) {
    password = req.query.password
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: password
        
    };
}