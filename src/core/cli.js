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