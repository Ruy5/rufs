import {downloadM3U8} from "./core/m3u8.js"
import {simpleUpload, simpleDownload} from "./core/simple.js"

import {sliceDownload, sliceUpload} from "./core/slice.js"

const rufs = {
    downloadM3U8, simpleUpload, simpleDownload, sliceDownload, sliceUpload
}
window.rufs = rufs
export default rufs