const {BlobServiceClient} = require("@azure/storage-blob")
const connectionstring = "DefaultEndpointsProtocol=https;AccountName=blob4serverless;AccountKey=ce2KNkiKoYOKj1qq6y+10PV7MwZ5F9xLOXeRb6b1RKs8t3sE0tUZFz4BzKTyIhiDrAfX7DYwoQ3z+AStC8xxew==;EndpointSuffix=core.windows.net"
const account = "blob4serverless"

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);   
};

async function run() {
    const blobServicesClient = BlobServiceClient.fromConnectionString(connectionstring)
    const deletecontainer = "serverlessblob1"
    const blobcontainerclient = blobServicesClient.getContainerClient(deletecontainer)

    for await (const blob of blobcontainerclient.listBlobsFlat()){
        blobcontainerclient.deleteBlob(blob.name)
    }
}