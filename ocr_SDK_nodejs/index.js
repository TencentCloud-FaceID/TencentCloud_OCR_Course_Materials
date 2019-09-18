const tencentcloud = require("tencentcloud-sdk-nodejs");

const OcrClient = tencentcloud.ocr.v20181119.Client;
const models = tencentcloud.ocr.v20181119.Models;
const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;
let cred = new Credential("请替换成 Your SecretId", "请替换成 Your SecretKey"); 
let httpProfile = new HttpProfile();
httpProfile.endpoint = "ocr.tencentcloudapi.com";
let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
let client = new OcrClient(cred, "ap-guangzhou", clientProfile);
let req = new models.GeneralBasicOCRRequest();
let params = '{"ImageUrl":"请传入图片链接","LanguageType":"auto"}'
req.from_json_string(params);
client.GeneralBasicOCR(req, function(errMsg, response) {
    if (errMsg) {
        console.log(errMsg);
        return;
    }
    console.log(response.to_json_string());
});