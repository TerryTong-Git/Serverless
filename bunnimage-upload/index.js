const multipart = require('parse-multipart')
const fetch = require("node-fetch")
const {BlobServiceClient} = require("@azure/storage-blob")
const connectionstring = process.env["AZURE_STORAGE_CONNECTION_STRING"]

module.exports = async function (context, req) {
    
    context.log('JavaScript HTTP trigger function processed a request.');

    const boundary = multipart.getBoundary(req.headers['content-type'])
    const body = req.body
    const parseBody = multipart.Parse(body,boundary)
    let exted = parseBody[0].type.split("/")[1]
    let responseMessage = await Uploadfile(parseBody, exted)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}

async function Uploadfile(parsedbody, ext) {
    const blobServicesClient = BlobServiceClient.fromConnectionString(connectionstring)
    const containername = "serverlessblob1"
    const containerclient = blobServicesClient.getContainerClient(containername)

    const blobName = "test." + ext;
    const blockblobclient  = containerclient.getBlockBlobClient(blobName)

    const uploadblobResponse = await blockblobclient.upload(parsedbody[0].data, parsedbody[0].data.length)
    return "File Saved"
}