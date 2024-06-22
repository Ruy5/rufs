# rufs

## 项目介绍

本项目目前包括
 - 后端
    - SpringBoot2
    - Maven
    - Java
    - FFmpeg(如果需要m3u8接口可以不安装)
- 前端
    - JavaScript
    - Fetch

后端可以直接打包部署使用，前端提供了npm现成的api, 你可以选择自己构建自定义请求，也可以直接使用rufs Api

如果需要设置文件的存储目录，修改 */rufs/src/main/resources/application.properties* 文件中 file.upload-dir 的值，并重新打包即可

## rufs Api 安装方法

```bash
npm install rufs
```

# 简单文件

## POST 简单文件上传

### API

```
simpleUpload(url, project)

例如
simpleUpload("http://localhost:1024/simplefile/upload", "项目标识")
```

### 接口文档

POST /simplefile/upload

> Body 请求参数

```curl
curl --location --request POST 'http://localhost:1024/simplefile/upload' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
  --form 'file=@"C:\\Users\\29704\\Pictures\\wallhaven-werdv6.png"' \
  --form 'project="wlt"'
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|file|body|string(binary)| 是 |文件|
|project|body|string| 否 |所属项目|

> 返回示例

> 200 Response

```json
{
  "errno": 0,
  "data": {
    "url": "/simplefile/download?filename=1716616916942wallhaven-werdv6.png&mediaType=image/png&project=wlt",
    "alt": "1716616916942wallhaven-werdv6.png",
    "href": "http://localhost:1024/simplefile/download?filename=1716616916942wallhaven-werdv6.png&mediaType=image/png&project=wlt"
  },
  "message": null
}
```


## GET 简单文件下载

### API

```
simpleDownload(url)

例如
simpleDownload("/simplefile/download")
```

### 接口文档

GET /simplefile/download

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|filename|query|string| 否 |文件名|
|mediaType|query|string| 否 |文件类型|
|project|query|string| 否 |所属项目|

# m3u8视频文件

## POST m3u8视频文件上传

### API
m3u8视频上传无需单独api, 直接服用简单文件上传api即可，但是需要更换对应的url地址

```
simpleUpload(url, project)

例如
simpleUpload("http://localhost:1024/m3u8/upload", "项目标识")
```

### 接口文档

POST /m3u8/upload

> Body 请求参数

```curl
curl --location --request POST 'http://localhost:1024/m3u8/upload' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
  --form 'file=@"C:\\Users\\29704\\Videos\\178826.mp4"' \
  --form 'project="wlt"'
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|file|body|string(binary)| 否 |文件|
|project|body|string| 否 |所属项目|

> 返回示例

> 200 Response

```json
{
  "errno": 0,
  "data": {
    "url": "/m3u8/index?filename=1716617472130178826.m3u8&mediaType=application/vnd.apple.mpegurl&project=wlt",
    "alt": "1716617472130178826.m3u8",
    "href": "http://localhost:1024/m3u8/index?filename=1716617472130178826.m3u8&mediaType=application/vnd.apple.mpegurl&project=wlt"
  },
  "message": null
}
```

## GET m3u8索引文件下载

GET /m3u8/index

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|filename|query|string| 否 |none|
|mediaType|query|string| 否 |none|
|project|query|string| 否 |none|

## GET m3u8 Ts 文件下载

GET /m3u8/ts/{project}/{filename}


## 分片文件上传

### Api

```
sliceUpload(url, project, chunkSize) 

例如
sliceUpload("http://localhost:1024/slicefile/upload", "项目标识", 1024000) 

```


## 分片文件下载

```
sliceDownload(url, params)

例如
sliceDownload("http://localhost:1024/slicefile/download", {
    fileName: 文件名,
    fileMd5: 文件md5值,
    chunkSize: 1024000,
    currentIndex: 切片索引
}) 

```