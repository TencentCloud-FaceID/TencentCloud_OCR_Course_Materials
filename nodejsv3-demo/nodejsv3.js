  // Node.js 使用接口鉴权 V3  POST 请求 GeneralBasicOCR 接口示例
  // 写有 ocr 处均为服务名称，慧眼用 faceid ， ocr 文字识别用 ocr
  // GET 请求的请求包大小不得超过 32KB 。POST 请求使用签名方法为 HmacSHA1、HmacSHA256 时不得超过1MB 。POST 请求使用签名方法为 TC3-HMAC-SHA256 时支持 10MB。 这里使用 POST 示例 。 
  // created by wangqingpeng 2019-08-26

  /**
   * 详细文档需要参考 ：
   * 1. 请求结构：https://cloud.tencent.com/document/product/1007/31322
   * 2. 公共参数：https://cloud.tencent.com/document/product/1007/31323
   * 3. 接口鉴权v3：https://cloud.tencent.com/document/product/1007/31324
   * 4. 通用印刷体文字识别：https://cloud.tencent.com/document/api/866/33526
   * 5. node crypto 加密模块：http://nodejs.cn/api/crypto.html
   * 6. request 请求包：https://www.npmjs.com/package/request
   */

  const crypto = require('crypto')
  const request = require('request')
  
  /**
  * 第一步: 拼接规范请求串 CanonicalRequest
  * 注意: 可对照代码看参数含义及注意事项 。
  */
  // 说明: HTTP 请求方法（GET、POST ）。此示例取值为 POST
  var HTTPRequestMethod = 'POST'; 
  // 说明: URI 参数，API 3.0 固定为正斜杠（/）
  var CanonicalURI = '/'; 
  // 说明: POST请求时为空
  var CanonicalQueryString = ""; 
  /**  说明:
   * 参与签名的头部信息，content-type 和 host 为必选头部 ,
   * content-type 必须为小写 , 推荐 content-type 值 application/json , 对应方法为 TC3-HMAC-SHA256 签名方法 。
   * 其中 host 指接口请求域名 POST 请求支持的 Content-Type 类型有:
   * 1. application/json（推荐）, 必须使用 TC3-HMAC-SHA256 签名方法 ;
   * 2. application/x-www-form-urlencoded , 必须使用 HmacSHA1 或 HmacSHA256 签名方法 ;
   * 3. multipart/form-data（仅部分接口支持）, 必须使用 TC3-HMAC-SHA256 签名方法 。
   * 
   * 注意:
   * content-type 必须和实际发送的相符合 , 有些编程语言网络库即使未指定也会自动添加 charset 值 , 
   * 如果签名时和发送时不  一致，服务器会返回签名校验失败。
  */
  var CanonicalHeaders = "content-type:application/json\nhost:ocr.tencentcloudapi.com\n";
  /**  说明:
   * 参与签名的头部信息的 key，可以说明此次请求都有哪些头部参与了签名，和 CanonicalHeaders 包含的头部内容是一一对应的。
   * content-type 和 host 为必选头部 。 
   * 注意： 
   * 1. 头部 key 统一转成小写； 
   * 2. 多个头部 key（小写）按照 ASCII 升序进行拼接，并且以分号（;）分隔 。 
  */  
  var SignedHeaders = "content-type;host";
  /**
   * 参与签名的头部信息的 key，可以说明此次请求都有哪些头部参与了签名，和 CanonicalHeaders 包含的头部内容是一一对应的。
   * content-type 和 host 为必选头部 。 
   * 注意： 
   * 1. 头部 key 统一转成小写； 
   * 2. 多个头部 key（小写）按照 ASCII 升序进行拼接，并且以分号（;）分隔 。 
   */
  // 传入需要做 HTTP 请求的正文 body
  var payload = {
      "ImageUrl":"https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/product/ocr-demo/css/img/GeneralBasicOCR1.jpg", 
      "LanguageType":"auto" // 语言类型，可选，此处我用的是 auto 即自动
  } 
  /**  说明:
   * 对请求体加密后的字符串 , 每个语言加密加密最终结果一致 , 但加密方法不同 , 
   * 这里 nodejs 的加密方法为 crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex'); 
   * 选择加密函数需要能够满足对 HTTP 请求正文做 SHA256 哈希 , 然后十六进制编码 , 最后编码串转换成小写字母的功能即可 。
  */
  var HashedRequestPayload = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex'); 
  // 最后拼接以上六个字段 , 注意中间用 '/n' 拼接 , 拼接格式一定要如下格式 , 否则会报错
  var CanonicalRequest =  HTTPRequestMethod + '\n' +
    CanonicalURI + '\n' +
    CanonicalQueryString + '\n' +
    CanonicalHeaders + '\n' +
    SignedHeaders + '\n' +
    HashedRequestPayload;
  console.log('1. 拼接规范请求串' + '\n' + CanonicalRequest);
  
  // 2. 拼接待签名字符串
  // 签名算法，接口鉴权v3为固定值 TC3-HMAC-SHA256
  var Algorithm = "TC3-HMAC-SHA256"; 
  // 请求时间戳，即请求头部的公共参数 X-TC-Timestamp 取值，取当前时间 UNIX 时间戳，精确到秒
  var RequestTimestamp = Math.round(new Date().getTime()/1000) + "";
  /**
   * Date 必须从时间戳 X-TC-Timestamp 计算得到，且时区为 UTC+0。
   * 如果加入系统本地时区信息，例如东八区，将导致白天和晚上调用成功，但是凌晨时调用必定失败。
   * 假设时间戳为 1551113065，在东八区的时间是 2019-02-26 00:44:25，但是计算得到的 Date 取 UTC+0 的日期应为 2019-02-25，而不是 2019-02-26。
   * Timestamp 必须是当前系统时间，且需确保系统时间和标准时间是同步的，如果相差超过五分钟则必定失败。
   * 如果长时间不和标准时间同步，可能导致运行一段时间后，请求必定失败，返回签名过期错误。
  */ 
  var t = new Date();
  var date = t.toISOString().substr(0, 10); // 计算 Date 日期   date = "2019-08-26"
  /**
   *  拼接 CredentialScope 凭证范围，格式为 Date/service/tc3_request ， 
   * service 为服务名，慧眼用 faceid ， OCR 文字识别用 ocr
  */
  var CredentialScope = date + "/ocr/tc3_request"; 
  // 将第一步拼接得到的 CanonicalRequest 再次进行哈希加密
  var HashedCanonicalRequest = crypto.createHash('sha256').update(CanonicalRequest).digest('hex'); 
  // 拼接 StringToSign
  var StringToSign = Algorithm + '\n' +
    RequestTimestamp + '\n' +
    CredentialScope + '\n' +
    HashedCanonicalRequest;
  console.log('2. 拼接待签名字符串' + '\n' + StringToSign);

  // 3. 计算签名 Signature
  var SecretKey = "请替换 Your SecretKey";
  var SecretDate = crypto.createHmac('sha256', "TC3"+SecretKey).update(date).digest();
  var SecretService = crypto.createHmac('sha256', SecretDate).update("ocr").digest();
  var SecretSigning = crypto.createHmac('sha256', SecretService).update("tc3_request").digest();
  var Signature = crypto.createHmac('sha256', SecretSigning).update(StringToSign).digest('hex');
  console.log('3. 计算签名' + '\n' + Signature); 

  // 4. 拼接签名 Authorization
  var SecretId = "请替换 Your SecretId";
  var Algorithm = "TC3-HMAC-SHA256";
  var Authorization =
    Algorithm + ' ' +
    'Credential=' + SecretId + '/' + CredentialScope + ', ' +
    'SignedHeaders=' + SignedHeaders + ', ' +
    'Signature=' + Signature
  console.log('4. 拼接Authorization' + '\n' + Authorization)

  // 5. 发送POST请求 options 配置
  var options = {
    url: 'https://ocr.tencentcloudapi.com/',
    method:'POST',
    json: true,
    headers: {
      "Content-Type": "application/json",
      "Authorization": Authorization,
      "Host": "ocr.tencentcloudapi.com",
      "X-TC-Action": "GeneralBasicOCR",
      "X-TC-Version": "2018-11-19",
      "X-TC-Timestamp": RequestTimestamp,
      "X-TC-Region": "ap-guangzhou"
    },
    body: payload,
  };
  // 发起请求
  request(options, function (error, response, body) {
    if (error) throw new Error(error); 
    console.log(JSON.stringify(body))
  });
