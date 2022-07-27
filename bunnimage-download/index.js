const fetch = require("node-fetch")
const {BlobServiceClient} = require("@azure/storage-blob")
const account  = "blob4serverless"

module.exports = async function (context, req) {
    
    let username = req.headers['username']
    let download = ""
    let downloadpng = "https://blob4serverless.blob.core.windows.net/serverlessblob1/" + username + ".png";
    let downloadjpg = "https://blob4serverless.blob.core.windows.net/serverlessblob1/" + username + ".jpeg";

    let pngresp = await fetch(downloadpng, {
        method : "get"
    })
    let pngdata = await pngresp

    let jpegresp = await fetch(downloadjpg, {
        method : "get"
    })

    let jpgdata = await jpegresp

    if (pngdata.statusText == "The specified blob does not exist." && jpgdata.statusText == "The specified blob does not exist." ) {
        success = false;
        context.log("Does not exist: " + pngdata)
        context.log("Does not exist: " + jpgdata)
     } else if (pngdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadpng
        context.log("Does exist: " + pngdata)
     } else if (jpgdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadjpg
        context.log("Does exist: " + jpgdata)
     }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            "downloadUri": download,
            "success": success
        }
    };
}