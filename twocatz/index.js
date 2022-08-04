module.exports = async function (context, req) {
    // const list = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"]
    const fetch = require('node-fetch')
    // let name1 = list[Math.floor(Math.random()*7)]

    const GetCat = async function (name) {
        const thing = await fetch(`https://bit-cat.azurewebsites.net/cat/says/` + name,{
            method: 'GET'
        })

        const data = await thing.arrayBuffer()
        const stuff = Buffer.from(data).toString('base64')
        return stuff
    }

    let name1 = req.query.name1
    let name2 = req.query.name2
    let name3 = req.query.name3
    let name4 = req.query.name4

    let catreturn1 = await GetCat(name1)
    let catreturn2 = await GetCat(name2)
    let catreturn3 = await GetCat(name3)
    let catreturn4 = await GetCat(name4)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: catreturn1,
            cat2: catreturn2,
            cat3: catreturn3,
            cat4: catreturn4
        }
    };
}


