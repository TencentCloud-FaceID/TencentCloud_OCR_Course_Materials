# 通用印刷体接口调用

> 腾讯云官网提供了一款在线测试工具，拥有在线调用、签名验证、`SDK` 代码生成和快速检索接口等能力，能显著降低使用云 `API 3.0` 的难度 。通过这个工具，我们就能使用很少的参数，实现代码生成和 `API` 的快速调用 。

## 在线调用

### 开通服务

- `cloud.tencent.com` => 产品 => 人工智能 => 图像识别 => 文字识别 => 管理控制台 => 找到想要的服务开通服务（见图一 ~ 图三）
- [也可直接点击此处访问开通服务页面](https://console.cloud.tencent.com/ocr/generalexact)

- **图一： 开通 OCR 文字识别服务入口**

![开通OCR服务入口](/online_call_img/开通OCR服务入口.png)

- **图二： 进入控制台开通服务**

![管理控制台](/online_call_img/管理控制台.png)

- **图三： 点击立即开通**

![立即开通](/online_call_img/立即开通.png)

### 接口文档

- **开通服务之后，请看右上角有接口文档入口，见图四**

- 也可以点击这里[通用印刷体接口文档](https://cloud.tencent.com/document/product/866/33526)
- **图四：接口文档入口**

![接口文档入口](/online_call_img/接口文档入口.png)

### 在线调用

- 进入接口文档之后，`Ctrl + f` 搜索页面中的 `API Explorer` 或者可直接访问 [API 3.0 Explorer](https://console.cloud.tencent.com/api/explorer?Product=ocr&Version=2018-11-19&Action=GeneralBasicOCR) 进入到 ` API 3.0` 在线调用平台，见图五
- **图五： API Explorer**

![explorer](/online_call_img/explorer.png)

### 获取密钥

- 可直接访问[API 密钥管理](https://console.cloud.tencent.com/cam/capi)创建或查看密钥，注意密钥需严格保管，避免泄露，见图六、图七
- **图六： 获取密钥**

![查看密钥](/online_call_img/查看密钥.png)

- **图七： API 密钥管理**

![API密钥](/online_call_img/API密钥.png)

### 输入参数并发送请求

- **图八： 发送请求**

![GeneralBasicOCR_POST](/online_call_img/GeneralBasicOCR_POST.png)

## SDK DEMO 本地调用

### 在线生成代码

- **图九：在线生成代码及 SDK 使用说明入口**

![SDKdemo引导](/online_call_img/SDKdemo引导.png)

### SDK 使用说明

- 见图九截图右上角 `SDK` 使用说明，点击进入，或直接点击链接 [Nodejs](https://cloud.tencent.com/document/sdk/Node.js) 进入

### 依赖环境

- 文档继续往下翻，注意下依赖环境

### 安装

- 执行命令安装

```cmd
npm install tencentcloud-sdk-nodejs --save
```

- 也可以通过 `Github` 上的[**tencentcloud-sdk-nodejs**](https://github.com/tencentcloud/tencentcloud-sdk-nodejs) 源码安装

### 本地调用

- 进入**安装**步骤时讲到的 [**tencentcloud-sdk-nodejs**](https://github.com/tencentcloud/tencentcloud-sdk-nodejs) 地址中去，见图十一
- **图十： 示例代码，将刚才在 `API 3.0 Explorer` 在线生成的代码复制粘贴到此处即可**

![示例代码](/online_call_img/示例代码.png)

## 资料文件

课程结束后我会将本次课程讲解的所有 PPT、 markdown 课件、代码等上传至腾讯云大学及[github](https://github.com/TencentCloud-FaceID/TencentCloud_OCR_Course_Materials)，欢迎参阅 。

