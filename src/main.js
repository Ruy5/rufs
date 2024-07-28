import {downloadM3U8} from "./core/m3u8.js"
import {simpleUpload, simpleDownload} from "./core/simple.js"
import {sliceDownload, sliceUpload} from "./core/slice.js"
import {createAxios, useRuoyiApi, useRuoyiModuleApi, useRuoyiAuth, useRuoyiFileApi} from "./core/http.js"
import {genApiFile} from "./core/cli.js"

const rufs = {
    downloadM3U8, simpleUpload, simpleDownload, sliceDownload, sliceUpload, createAxios, useRuoyiApi, useRuoyiModuleApi, useRuoyiAuth, useRuoyiFileApi, genApiFile
}

if(window) window.rufs = rufs

export default rufs
export {createAxios, useRuoyiApi, useRuoyiModuleApi, useRuoyiAuth, useRuoyiFileApi, genApiFile}