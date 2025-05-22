// Prepare the key-value body for the authorization request (parameters and their values may be different). The corresponding environment variable should be created beforehand.  
var authDataContent = {};  
authDataContent.grant_type = "client_credentials";  
authDataContent.scope = "api://<<client_id>>/.default";   
authDataContent.client_id = "<<client_id>>";  
authDataContent.client_secret = "<<client_secret>>";   
   
// create the request and send the data  
var request = Context.CreateHttpRequest();  
request.Url = "https://login.microsoftonline.com/<<tenant_id>>/oauth2/v2.0/token"  
request.Method = "POST";  
   
// create content data for the authorization request  
request.SetUrlFormEncodedContent(authDataContent);  
request.Send();  
var authResponseObject = JSON.parse(request.ResponseText);  
// get all exports from the document  
var exports = Context.Transaction.Documents[0].Exports;  
   
// // select the JSON export result  
var extractedDataExportResult = exports.find(element => element.ExportFormat === ExportFormat.Json);  
var pdfExportResult = exports.find(element => element.ExportFormat === ExportFormat.Pdf);  
   
// // Create content data for the request  
var multiPartRequest = Context.CreateMultipartFormDataRequest();  
multiPartRequest.Url = "https://<<api_url>>/Lifepro/GetDrugType"  
multiPartRequest.Method = "POST";  
multiPartRequest.AuthToken = authResponseObject.access_token;  
multiPartRequest.AuthScheme = "Bearer";  
   
// add extracted data to the export result  
// For testing...  
multiPartRequest.AppendStringContent(extractedDataExportResult.ToJson(), "jsonData");  
   
// add the exported PDF  
multiPartRequest.AppendFileContent(pdfExportResult, "binaryData");  
   
// send a request to the service  
multiPartRequest.Send();  
   
// Get a deserialised response result  
var responseObject = JSON.parse(multiPartRequest.ResponseText);  