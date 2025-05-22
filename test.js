// Prepare the key-value body for the authorization request (parameters and their values may be different). The corresponding environment variable should be created beforehand.  
var authDataContent = {};  
authDataContent.grant_type = "client_credentials";  
  
// Use environment variable for scope  
authDataContent.scope = process.env.SCOPE || "<<SCOPE>>";  
  
// Pass sensitive data using environment variables. The corresponding variables should be created beforehand.  
// authDataContent.client_id = Context.GetSecret("client_id_secretName");  
// authDataContent.client_secret = Context.GetSecret("client_secret_secretName");  
// authDataContent.password = Context.GetSecret("password_secretName");  
// authDataContent.username = Context.GetSecret("username_secretName");  
  
// Use environment variables for sensitive fields instead of hard-coded strings  
authDataContent.client_id = process.env.CLIENT_ID || "<<CLIENT_ID>>";  
authDataContent.client_secret = process.env.CLIENT_SECRET || "<<CLIENT_SECRET>>";  
// authDataContent.password = process.env.PASSWORD || "<<PASSWORD>>";  
// authDataContent.username = process.env.USERNAME || "<<USERNAME>>";  
  
// create the request and send the data  
var request = Context.CreateHttpRequest();  
console.log(request);  
  
request.open("POST", process.env.AUTH_URL || "<<AUTH_URL>>", false);  
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
var params = Object.keys(authDataContent).map(key => `${key}=${authDataContent[key]}`).join('&');  
request.send(params);  
var authResponseObject = JSON.parse(request.responseText);  
  
// get all exports from the document  
var exports = Context.Transaction.Documents[0].Exports;  
  
// select the JSON export result  
var extractedDataExportResult = exports.find(element => element.ExportFormat === ExportFormat.Json);  
var pdfExportResult = exports.find(element => element.ExportFormat === ExportFormat.Pdf);  
  
// Create content data for the request  
var multiPartRequest = Context.CreateMultipartFormDataRequest();  
multiPartRequest.Url = "https://abbyapi-qa.gtlic.com/Lifepro/GetDrugType"  
multiPartRequest.Method = "POST";  
multiPartRequest.AuthToken = authResponseObject.access_token;  
multiPartRequest.AuthScheme = "Bearer";  
  
// add extracted data to the export result  
multiPartRequest.AppendStringContent(extractedDataExportResult.ToJson(), "jsonData");  
  
// add the exported PDF  
multiPartRequest.AppendFileContent(pdfExportResult, "binaryData");  
  
// send a request to the service  
multiPartRequest.Send();  
  
// Get a deserialised response result  
var responseObject = JSON.parse(multiPartRequest.ResponseText);  
console.log(responseObject)  