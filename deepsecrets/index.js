const qs = require("qs")
const CosmosClient = require("@azure/cosmos").CosmosClient;
// @ts-check
const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "ToDoList",
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/partitionKey"] }
  };

  
  /*
  // This script ensures that the database is setup and populated correctly
  */
async function create(client, databaseId, containerId) {
    const partitionKey = config.partitionKey;
  
    /**
     * Create the database if it does not exist
     */
    const { database } = await client.databases.createIfNotExists({
      id: databaseId
    });
    console.log(`Created database:\n${database.id}\n`);
  
    /**
     * Create the container if it does not exist
     */
    const { container } = await client
      .database(databaseId)
      .containers.createIfNotExists(
        { id: containerId, partitionKey },
        { offerThroughput: 400 }
      );
  
    console.log(`Created container:\n${container.id}\n`);
  }
  
async function createDocument(newItem) {
    const { endpoint, key, databaseId, containerId } = config;

    const client = new CosmosClient({ endpoint, key });

    const database = client.database(databaseId);
    const container = database.container(containerId);

    await create(client, databaseId, containerId);
    console.log(`Querying container: Items`);
   
// query to return all items
    const querySpec = {
    query: "SELECT * FROM c "
    };

    // read all items in the Items container
    const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();

    const { resource: createdItem } = await container.items.create(newItem);
// Make sure Tasks database is already setup. If not, create it.
    return items
}

module.exports = async function (context, req) {
    const parsed = qs.parse(req.body)
    let message = parsed.Body
    let document = {"message": message}
    let items = await createDocument(document)
    let random_value = Math.floor(items.length* Math.random())
    const responseMessage = `Thanks 😊! Stored your secret "${message}". 😯 Someone confessed that: ${JSON.stringify(items[random_value].message)}`
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}