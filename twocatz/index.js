module.exports = async function (context, req) {
    const fetch = require('node-fetch')
    const thing = await fetch('https://bit-cat.azurewebsites.net/cat/says/serverless',{
        method: 'GET'
    })
    const data = await thing.arrayBuffer();
    const stuff = Buffer.from(data).toString('base64')

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {stuff}
    };
}