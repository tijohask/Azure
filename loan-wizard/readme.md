# This project demonstrates how to locally build a simple Azure Function using Azure CLI and Core Tools, then push it to the cloud.

# Instructions on how to do this again:

`func init` choose node, then javascript

`func new` Http trigger

edit index.js as you please

`func start`

test with curl against the endpoint created by func start

decide to publish to azure

`RESOURCEGROUP=publish_practice_azure_core_tools`
`STORAGEACCT=learnstorage$(openssl rand -hex 5)`
`FUNCTIONAPP=learnfunctions$(openssl rand -hex 5)`

`az group create \`
`    --location centralus \`
`    --resource-group "$RESOURCEGROUP"`

`az storage account create \`
`    --resource-group "$RESOURCEGROUP" \`
`    --name "$STORAGEACCT" \`
`    --kind StorageV2 \`
`    --location centralus`

`az functionapp create \`
`   --resource-group "$RESOURCEGROUP" \`
`   --name "$FUNCTIONAPP" \`
`   --storage-account "$STORAGEACCT" \`
`   --runtime node \`
`   --consumption-plan-location centralus \`
`   --functions-version 2`

Test with curl, should return 6300
`curl "https://learnfunctions4e0779cdd9.azurewebsites.net/api/simple-interest?code=AfwwAGjetaiQ6bfeKH25FonO5swd8nlhAugZ6/aXfTNkjyCkKas8Vw==&principal=5000&rate=0.035&term=36" -w "\n"`
