# SDK DEMO

> 腾讯云官网提供了 [PHP](https://cloud.tencent.com/document/sdk/PHP)、[Python](https://cloud.tencent.com/document/sdk/Python)、[Java](https://cloud.tencent.com/document/sdk/Java)、[Go](https://cloud.tencent.com/document/sdk/Go)、[.NET](https://cloud.tencent.com/document/sdk/.NET)、[Nodejs](https://cloud.tencent.com/document/sdk/Node.js) 等六种常见服务端语言的 `SDK` 包以及 `API 3.0` 工具代码生成功能，通过安装 `SDK` 包和在线生成的代码可以快速写一个 `SDK DEMO` 实现本地调用 。

## 声明

- 本文案例采用 `SDK 3.0` ,  `SDK 3.0` 支持全部 `API 3.0` 下的产品 ， 详情可参考[Node.js](https://cloud.tencent.com/document/sdk/Node.js)

- 本文以 `OCR` 文字识别通用印刷体识别接口为例 ，选取 `Node.js` 语言 , 借助官网 [Node.js](https://cloud.tencent.com/document/sdk/Node.js) 包和 [API 3.0 Explorer](https://console.cloud.tencent.com/api/explorer?Product=ocr&Version=2018-11-19&Action=GeneralBasicOCR&SignVersion=) 工具在线生成代码功能快速实现 `API` 本地调用
- 参考文档： [Node.js](https://cloud.tencent.com/document/sdk/Node.js)

## 官网 SDK

- 由于本案例用 Nodejs 语言来讲，就不掺杂过多其他语言的内容，关于其他语言的、依赖环境、安装方式、示例代码等详情参考以下文档 
  -  [PHP](https://cloud.tencent.com/document/sdk/PHP)
  - [Python](https://cloud.tencent.com/document/sdk/Python)
  - [Java](https://cloud.tencent.com/document/sdk/Java)
  - [Go](https://cloud.tencent.com/document/sdk/Go)
  - [.NET](https://cloud.tencent.com/document/sdk/.NET)
  - [Nodejs](https://cloud.tencent.com/document/sdk/Node.js) 

-  `cloud.tencent.com` => 支持 => `SDK` 中心 => 选择熟悉的语言 `SDK`  ， 下面提供六种语言 `SDK` 包的 **Github 地址**  和  **快速下载地址**
  - PHP： [Github 代码托管地址](https://github.com/tencentcloud/tencentcloud-sdk-php) 或者 [快速下载地址](https://tencentcloud-sdk-1253896243.file.myqcloud.com/tencentcloud-sdk-php/tencentcloud-sdk-php.zip) 
  - Python：  [Github 代码托管地址](https://github.com/tencentcloud/tencentcloud-sdk-python) 或者 [快速下载地址](https://tencentcloud-sdk-1253896243.file.myqcloud.com/tencentcloud-sdk-python/tencentcloud-sdk-python.zip) 
  - Java：  [Github 代码托管地址](https://github.com/tencentcloud/tencentcloud-sdk-java) 或者 [快速下载地址](https://tencentcloud-sdk-1253896243.file.myqcloud.com/tencentcloud-sdk-java/tencentcloud-sdk-java.zip) 
  - Go：  [Github 代码托管地址](https://github.com/tencentcloud/tencentcloud-sdk-go) 或者 [快速下载地址](https://tencentcloud-sdk-1253896243.file.myqcloud.com/tencentcloud-sdk-go/tencentcloud-sdk-go.zip)
  - .NET：  [Github 代码托管地址](https://github.com/tencentcloud/tencentcloud-sdk-dotnet) 或者 [快速下载地址](https://tencentcloud-sdk-1253896243.file.myqcloud.com/tencentcloud-sdk-dotnet/tencentcloud-sdk-dotnet.zip) 
  - Nodejs：  [GitHub 代码托管地址](https://github.com/tencentcloud/tencentcloud-sdk-nodejs) 或者 [快速下载地址](https://tencentcloud-sdk-1253896243.file.myqcloud.com/tencentcloud-sdk-nodejs/tencentcloud-sdk-nodejs.zip)

### Nodejs SDK

- 获取密钥： 可访问[API 密钥管理](https://console.cloud.tencent.com/cam/capi)创建或查看密钥，注意密钥需严格保管，避免泄露

- 依赖环境：  

  - `NODEJS 7.10.1` 版本及以上。
  - 从腾讯云 [控制台](https://console.cloud.tencent.com/) 开通相应产品。
  - 获取 `SecretId`、`SecretKey` 以及调用地址 `endpoint`，`endpoint`  一般形式为 `*.tencentcloudapi.com`，如 `OCR` 产品的调用地址为 `ocr.tencentcloudapi.com` 、`faceid` 即慧眼产品的调用地址为 `faceid.tencentcloudapi.com`，具体参考各产品说明 。

- 获取安装

  - 通过 `npm` 安装

    - 执行以下安装命令： 

    ```cmd
    npm install tencentcloud-sdk-nodejs --save
    ```

    - 项目代码中引用对应模块代码

    ```js
    const tencentcloud = require("tencentcloud-sdk-nodejs");
    ```

  - 通过源码包安装

    - 前往 [GitHub 代码托管地址](https://github.com/tencentcloud/tencentcloud-sdk-nodejs) 或者 [快速下载地址](https://tencentcloud-sdk-1253896243.file.myqcloud.com/tencentcloud-sdk-nodejs/tencentcloud-sdk-nodejs.zip)，下载源码压缩包 。
    - 解压源码包到您项目合适的位置 。
    - 在项目代码中引用对应模块代码，可参考示例 。

## SDK 本地调用

> [API 3.0 Explorer](https://console.cloud.tencent.com/api/explorer?Product=ocr&Version=2018-11-19&Action=GeneralBasicOCR&SignVersion=) 提供了在线生成代码功能，使用该功能生成代码 。
>
> 注意修改 `Your SecretId` 和 `Your SecretKey` 两个位置即可，生成代码之后，可在本地创建一个 `demo` ，项目名为 `ocr-nodejs`  , 其中包含 `index.js` 和 `package.json` 两个文件即可 ， 将生成的代码复制到 `index.js` 中 。

- **index.js**

```javascript
// index.js

const tencentcloud = require("../../../../tencentcloud-sdk-nodejs");

const OcrClient = tencentcloud.ocr.v20181119.Client;
const models = tencentcloud.ocr.v20181119.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

let cred = new Credential("Your SecretId", "Your SecretKey");
let httpProfile = new HttpProfile();
httpProfile.endpoint = "ocr.tencentcloudapi.com";
let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
let client = new OcrClient(cred, "ap-guangzhou", clientProfile);

let req = new models.GeneralBasicOCRRequest();

let params = '{"ImageUrl":"https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/product/ocr-demo/css/img/GeneralBasicOCR1.jpg","LanguageType":"auto"}'
req.from_json_string(params);


client.GeneralBasicOCR(req, function(errMsg, response) {

    if (errMsg) {
        console.log(errMsg);
        return;
    }

    console.log(response.to_json_string());
});
```

- **使用 npm 方式安装 Nodejs SDK 包**

```cmd
npm i tencentcloud-sdk-nodejs --save
```

- **package.json**

```json
// package.json

{
  "name": "GeneralBasicOCR_demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "tencentcloud-sdk-nodejs": "^3.0.78"
  }
}

```

- 编译并获取接口数据，要先切到项目下，再运行代码，由于该演示项目名为 `ocr-nodejs` ， 操作如下：

```cmd
cd ocr-nodejs
node index.js
```

## 获取结果

![result](/sdk_demo_img/result.png)

## 避坑指南

**此外，调用 Java SDK 的时候还有一个地方需要注意，假如您使用的 SDK 包是 Java SDK 传参且需要传中文的时候，例如： 当参数为 name ， 而对应的 name 的值是 中文字符串，这时候请用 utf-8 编码，否则会乱码，这里分两种情况，解决方案分别讲一下：** 

- 在服务端调用 `DetectAuth` 接口时，出现中文乱码，可使用以下代码解决：

```java
String certName= new String(name.getBytes("UTF-8"), "UTF-8");
```

- 若是出现奇数个中文会乱码，偶数个中文不会乱码，这种问题一般是你自己的服务器编码方式和腾讯云侧不一致导致，可以修改服务端的编码方式，具体操作方法如下 ：

  - 方法一：` tomcat` 中修改 `catalina.bat`，添加如下

  ```java
  (set JAVA_OPTS=%JAVA_OPTS% -Dfile.encoding=UTF-8)
  ```

  - 方法二： `IDE` 中修改 `Run/Debug Configurations VM options` 为 `–Dfile.encoding=UTF-8` ，见下图

  ![dfile](/sdk_demo_img/dfile.png)

## 总结

通过本节课的学习，我们已经可以借助腾讯云官网 `SDK` 及 `API 3.0 ` 在线生成代码功能快速高效的进行本地调用了。