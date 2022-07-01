module.exports = async function (context, req) {
    const list = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"]
    const fetch = require('node-fetch')
    let name1 = list[Math.floor(Math.random()*7)]
    const thing = await fetch(`https://bit-cat.azurewebsites.net/cat/says/Bitcamp`,{
        method: 'GET'
    })
    const data = await thing.arrayBuffer();
    const stuff = Buffer.from(data).toString('base64')

    let name2 = list[Math.floor(Math.random()*7)]
    const thing1 = await fetch(`https://bit-cat.azurewebsites.net/cat/says/Bitcamp`,{
        method: 'GET'
    })
    const data1 = await thing1.arrayBuffer();
    const stuff1 = Buffer.from(data1).toString('base64')

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1:stuff,
            cat2:stuff1,
            names : [name1,name2]
        }
    };
}