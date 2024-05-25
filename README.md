# SpringBoot-File-Server

# 简单文件

## POST 简单文件上传

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

GET /simplefile/download

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|filename|query|string| 否 |文件名|
|mediaType|query|string| 否 |文件类型|
|project|query|string| 否 |所属项目|

# m3u8视频文件

## POST m3u8视频文件上传

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