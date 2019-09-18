# Postman 请求

> Postman  ,  一款流行的 API 调试工具 ， 接口调试利器  。

## 声明

- 本文以调试 [通用印刷体识别](https://cloud.tencent.com/document/product/866/33526) 接口为例演示
- 参考文档
  - [请求结构](https://cloud.tencent.com/document/product/866/33517)
  - [公共参数](https://cloud.tencent.com/document/product/866/33518)
  - [通用印刷体识别](https://cloud.tencent.com/document/product/866/33526)
  - [错误码](https://cloud.tencent.com/document/product/866/33528)
  - [公共错误码](https://cloud.tencent.com/document/api/866/33521)

## 请求结构

> 

- **服务地址** ： 一般就近原则 ， 例如我在深圳， [公共参数](https://cloud.tencent.com/document/product/866/33518) 中的 `X-TC-Region`  或者 [通用印刷体识别](https://cloud.tencent.com/document/product/866/33526) 文档中的参数 `Region` 的值可以写为 `ap-guangzhou` ， 详情查看 [服务地址](https://cloud.tencent.com/document/api/866/33517) 。
- **通信协议**： 腾讯云 API 的所有接口均通过 HTTPS 进行通信，提供高安全性的通信通道 。
- **请求方法**： 
  - 支持的 HTTP 请求方法:
    - POST（推荐）
    - GET
  - POST 请求支持的 Content-Type 类型：
    - application/json（推荐），必须使用 TC3-HMAC-SHA256 签名方法 。
    - application/x-www-form-urlencoded，必须使用 HmacSHA1 或 HmacSHA256 签名方法 。
    - multipart/form-data（仅部分接口支持），必须使用 TC3-HMAC-SHA256 签名方法 。
  - POST 和 GET 区别
    - GET 请求的请求包大小不得超过32KB 。
    - POST 请求使用签名方法为 HmacSHA1、HmacSHA256 时不得超过1MB。POST 请求使用签名方法为 TC3-HMAC-SHA256 时支持10MB 。
- **字符编码**： 均使用 `UTF-8` 编码 。

## 公共参数

> 公共参数是用于标识用户和接口鉴权目的的参数，每次请求均需要携带这些参数，才能正常发起请求 。

## Headers

> 需要参考**公共参数、请求结构、通用印刷体**三个文档
>
> 使用 TC3-HMAC-SHA256 签名方法时，公共参数需要统一放到 HTTP Header 请求头部中 。

### Headers

|    参数名称    |  类型   | 必选 | 描述                                                         |
| :------------: | :-----: | :--: | :----------------------------------------------------------- |
|  X-TC-Action   | String  |  是  | 操作的接口名称，取值参考接口文档中输入参数公共参数 `Action` 的说明 ， 例如在[通用印刷体识别](https://cloud.tencent.com/document/product/866/33526) 文档中的参数 `Action` 的值为 `GeneralBasicOCR` ， 对应到此处 `X-TC-Action` 的值就为 `GeneralBasicOCR` 。 |
|  X-TC-Region   | String  |  是  | 地域参数，用来标识希望操作哪个地域的数据。一般就近原则 ， 例如我在深圳， [公共参数](https://cloud.tencent.com/document/product/866/33518) 中的 `X-TC-Region`  或者 [通用印刷体识别](https://cloud.tencent.com/document/product/866/33526) 文档中的参数 `Region` 的值可以写为 `ap-guangzhou` ， 详情查看 [服务地址](https://cloud.tencent.com/document/api/866/33517) 。 |
| X-TC-Timestamp | Integer |  是  | 时间戳，注意 X-TC-TimeStamp 参数计算得到的时间戳必须和腾讯云服务器时间是 5 分钟以内， 且是 +0 时区，若和电脑系统时间比对时，需要注意电脑时间是 +8 区，需转化为 +0 区进行比较 。 |
|  X-TC-Version  | String  |  是  | 操作的 API 的版本，取值参考接口文档中入参公共参数 Version 的说明 。例如在[通用印刷体识别](https://cloud.tencent.com/document/product/866/33526) 文档中的参数 `Version` 的值为 `2018-11-19` ， 对应到此处 `X-TC-Version` 的值就为 `2018-11-19` 。 |
| Authorization  | String  |  是  | 鉴权签名，和时间戳对应（即同一时间戳生成为一套），在文档[接口鉴权v3](接口鉴权v3.md) 中专门去讲鉴权签名的作用及如何生成 。 |
|   X-TC-Token   | String  |  否  | 临时证书所用的 Token ，需要结合临时密钥一起使用。临时密钥和 Token 需要到访问管理服务调用接口获取。长期密钥不需要 Token。 |

**特别注意： Content-Type 必不可少**

- `HTTP Header` 中千万不能少了  `Content-Type` 类型的，否则会报 `HTTP(S)` 协议错误 。这里我们使用 `POST` 请求，对应的  `Content-Type` 类型推荐 `application/json`

由于**请求结构**文档中的通信协议规定腾讯云 `API` 的所有接口均通过 `HTTPS` 进行通信，提供高安全性的通信通道 ，且即将要发起请求的**通用印刷体**的请求域名为`ocr.tencentcloudapi.com`

**综上**： 这里使用 `POST` 请求示例，请求域名为 `ocr.tencentcloudapi.com` , `Headers` 中应传参数为 `X-TC-Action` 、`X-TC-Region` 、`X-TC-Timestamp`、`X-TC-Version`、`Authorization` 和 `Content-Type`  ， 当然这其中 `X-TC-Timestamp` 和 `Authorization` 可能大家还不知道怎么生成 ， 由于这二者的生成比较复杂，时间关系，我们先用 [API 3.0 Explorer](https://console.cloud.tencent.com/api/explorer?Product=ocr&Version=2018-11-19&Action=GeneralBasicOCR&SignVersion=) 工具在线生成签名和时间戳用一下，最后会专门作为一节课来讲  `X-TC-Timestamp` 和 `Authorization` 的生成及如何减少犯错 。(见图一、图二)

- **图一： 在线生成签名**

![在线生成签名](/postman_img/在线生成签名.png)

- **图二： Headers**

![Headers](/postman_img/Headers.png)

## Body

> 需要参考**通用印刷体文档**

|   参数名称   | 必选 |  类型  | 描述                                                         |
| :----------: | :--: | :----: | :----------------------------------------------------------- |
| ImageBase64  |  否  | String | 图片的 Base64 值。 支持的图片格式：PNG、JPG、JPEG，暂不支持 GIF 格式。 支持的图片大小：所下载图片经Base64编码后不超过 3M。图片下载时间不超过 3 秒。 图片的 ImageUrl、ImageBase64 必须提供一个，如果都提供，只使用 ImageUrl。 |
|   ImageUrl   |  否  | String | 图片的 Url 地址。 支持的图片格式：PNG、JPG、JPEG，暂不支持 GIF 格式。 支持的图片大小：所下载图片经 Base64 编码后不超过 3M。图片下载时间不超过 3 秒。 图片存储于腾讯云的 Url 可保障更高的下载速度和稳定性，建议图片存储于腾讯云。 非腾讯云存储的 Url 速度和稳定性可能受一定影响。 |
|    Scene     |  否  | String | 保留字段。                                                   |
| LanguageType |  否  | String | 识别语言类型。 支持自动识别语言类型，同时支持自选语言种类，默认中英文混合(zh)。 可选值： zh\auto\jap\kor\ spa\fre\ger\por\ vie\may\rus\ita\ hol\swe\fin\dan\ nor\hun\tha\lat 可选值分别表示： 中英文混合、自动识别、日语、韩语、 西班牙语、法语、德语、葡萄牙语、 越南语、马来语、俄语、意大利语、 荷兰语、瑞典语、芬兰语、丹麦语、 挪威语、匈牙利语、泰语、拉丁语系。 |

- **Body**（见下图）

![body](/postman_img/body.png)

## 发送请求，获取结果

![result](/postman_img/result.png)

## 避坑指南

> 列举一些常见的坑，很多都是因为开发者对文档不够熟悉或者粗心大意导致，这里列举下，帮助大家减少犯错 。
>
> 尽量遇到问题查[错误码](https://cloud.tencent.com/document/product/866/33528)，能够帮助您快速定位错误原因 。

### UnsupportedProtocol

- HTTP(S)请求协议错误，一般出现在使用的请求方式错误、者`Content-Type`没传或者传错时，这里建议使用`POST` 请求且`Content-Type` 类型为 `application/json`(见下面两张图)

![httpError](/postman_img/httpError.png)

![noContentTypeError](/postman_img/noContentTypeError.png)

![UnsupportedProtocol](/postman_img/UnsupportedProtocol.png)

### AuthFailure.SignatureExpire

- 签名过期，注意 X-TC-TimeStamp 参数计算得到的时间戳必须和腾讯云服务器时间是 5 分钟以内
  ， 且是 +0 时区，若和电脑系统时间比对时，需要注意电脑时间是 +8 区，需转化为 +0 区进行比较 。后面会有一节课专门去讲时间戳如何计算 。(见以下两张图)

![expire](C:\Users\v_wqpwang\Desktop\腾讯云ocr识别-王青鹏\ocr-doc\postman_img\expire.png)

![AuthFailure.SignatureExpire](/postman_img/AuthFailure.SignatureExpire.png)

### AuthFailure.SignatureFailure 

- 签名错误，经常有人直接拿官网鉴权文档上计算好的签名去用，那是不可行的，每个腾讯云账户签名都不一样的，每隔五分钟签名也是不一样的，所以需要计算 。后面会有一节课专门去讲签名如何计算 。

![Failure](/postman_img/Failure.png)

![AuthFailure.SignatureFailure](/postman_img/AuthFailure.SignatureFailure.png)

## 总结

通过本节课的学习，我们已经可以借助 Postman 工具对 OCR 文字识别接口进行调试并能够尽可能少的犯错误 。