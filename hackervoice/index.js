module.exports = async function (context, req) {
    if (req.query.password == 'letmein'){
        response = 'Access granted.'
    } else {
        response = 'Access denied.'
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response
        
    };
}