module.exports = async function (context, req) {
    if (req.query.password == 'letmein'){
        response = 'Access Granted'
    } else {
        response = 'Access Denied'
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response
        
    };
}