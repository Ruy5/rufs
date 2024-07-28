# rufs

## 安装

```
npm install rufs
```

## 引入

```
import rufs from "rufs"
```

## 文件上传(单个)

```tsx
import {createAxios, useRuoyiFileApi} from "rufs"
import axios from "axios";

const http = createAxios(axios, "http://docs.feli.top:2473/")
const {uploadFile} = useRuoyiFileApi(http)

<button onClick={uploadFile}>上传</button>
```

## 权限认证

```tsx
import {createAxios,  useRuoyiAuth} from "rufs"
import axios from "axios";

const http = createAxios(axios, "http://docs.feli.top:2473/")
const {login, getInfo} = useRuoyiAuth(http)

// 登录
await login({username: "admin", password: "admin123"})
// 获取 userinfo
await getInfo()
```

## 通用api

```tsx
import {createAxios,  useRuoyiApi} from "rufs"
import axios from "axios";

const http = createAxios(axios, "http://docs.feli.top:2473/")
const {updateXhr, insterXhr, selectXhr, deleteXhr, selectListXhr} = useRuoyiApi(http)


await selectListXhr("article")
await selectXhr("article", 1)
await insterXhr("article", {articleClassifyName: "分类"})
await updateXhr("article", {id: 2, articleClassifyName: "新分类"})
await deleteXhr("article", 2)
```

## 局部api

```tsx
import {createAxios,  useRuoyiModuleApi} from "rufs"
import axios from "axios";

const http = createAxios(axios, "http://docs.feli.top:2473/")
const {updateXhr, insterXhr, selectXhr, deleteXhr, selectListXhr} = useRuoyiModuleApi(http, "system", "article")

await selectArticleListXhr()
await selectArticleXhr(1)
await insterArticleXhr({articleClassifyName: "分类"})
await updateArticleXhr({id: 3, articleClassifyName: "新分类"})
await deleteArticleXhr(3)
```