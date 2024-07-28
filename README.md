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

## 代码生成器

```js
import fs from 'fs';

function capitalizeFirstLetter(string) {
  if (typeof string !== "string" || string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const genApiFile = (url, prefix, modules, path) => {
  let str = `import {
  createAxios,
  useRuoyiAuth,
  useRuoyiFileApi,
  useRuoyiModuleApi,
} from "rufs";
import axios from "axios";

const http = createAxios(axios, "${url}");

export const { uploadFile } = useRuoyiFileApi(http);
export const { login, getInfo } = useRuoyiAuth(http);

`;
  modules.forEach((module) => {
    str += `
export const {
  update${capitalizeFirstLetter(module)}Xhr,
  inster${capitalizeFirstLetter(module)}Xhr,
  select${capitalizeFirstLetter(module)}Xhr,
  delete${capitalizeFirstLetter(module)}Xhr,
  select${capitalizeFirstLetter(module)}ListXhr,
} = useRuoyiModuleApi(http, "${prefix}", "${module}");
    `;
  });

  fs.writeFile(path, str, () => {
    console.log("init success")
  })
};


genApiFile("http://docs.feli.top:2473/", "system", [ "article" ], "./preApi.js")

```