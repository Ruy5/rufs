const downloadM3U8 = () => {

};

function createFileInput(uploadFunc) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', (event) => {
        uploadFunc(event.target.files[0]);
    });

    document.body.appendChild(fileInput);
    fileInput.click();
}

const simpleUpload = (url, project) => {
    return new Promise(function(resolve, reject){
        const upload = (file) => {
            const formData = new FormData();
            formData.append('file', file);

            if(project != undefined) {
                formData.append('project', project);
            }

            fetch(url, {
                method: 'POST',
                body: formData
            }).then(response => response.json())
            .then(data => resolve(data))
            .catch((error) => reject(error)); 
        };
    
        createFileInput(upload);
    });
};

const simpleDownload = (url) => {
    const fileLink = document.createElement('a');
    fileLink.href = url + "&disposition=attachment";
    fileLink.display = "none";
    document.body.appendChild(fileLink);
    fileLink.click();
};

(function(factory){if(typeof exports==="object"){module.exports=factory();}else if(typeof define==="function"&&define.amd){define(factory);}else {var glob;try{glob=window;}catch(e){glob=self;}glob.SparkMD5=factory();}})(function(undefined$1){var hex_chr=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function md5cycle(x,k){var a=x[0],b=x[1],c=x[2],d=x[3];a+=(b&c|~b&d)+k[0]-680876936|0;a=(a<<7|a>>>25)+b|0;d+=(a&b|~a&c)+k[1]-389564586|0;d=(d<<12|d>>>20)+a|0;c+=(d&a|~d&b)+k[2]+606105819|0;c=(c<<17|c>>>15)+d|0;b+=(c&d|~c&a)+k[3]-1044525330|0;b=(b<<22|b>>>10)+c|0;a+=(b&c|~b&d)+k[4]-176418897|0;a=(a<<7|a>>>25)+b|0;d+=(a&b|~a&c)+k[5]+1200080426|0;d=(d<<12|d>>>20)+a|0;c+=(d&a|~d&b)+k[6]-1473231341|0;c=(c<<17|c>>>15)+d|0;b+=(c&d|~c&a)+k[7]-45705983|0;b=(b<<22|b>>>10)+c|0;a+=(b&c|~b&d)+k[8]+1770035416|0;a=(a<<7|a>>>25)+b|0;d+=(a&b|~a&c)+k[9]-1958414417|0;d=(d<<12|d>>>20)+a|0;c+=(d&a|~d&b)+k[10]-42063|0;c=(c<<17|c>>>15)+d|0;b+=(c&d|~c&a)+k[11]-1990404162|0;b=(b<<22|b>>>10)+c|0;a+=(b&c|~b&d)+k[12]+1804603682|0;a=(a<<7|a>>>25)+b|0;d+=(a&b|~a&c)+k[13]-40341101|0;d=(d<<12|d>>>20)+a|0;c+=(d&a|~d&b)+k[14]-1502002290|0;c=(c<<17|c>>>15)+d|0;b+=(c&d|~c&a)+k[15]+1236535329|0;b=(b<<22|b>>>10)+c|0;a+=(b&d|c&~d)+k[1]-165796510|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b&~c)+k[6]-1069501632|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a&~b)+k[11]+643717713|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d&~a)+k[0]-373897302|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c&~d)+k[5]-701558691|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b&~c)+k[10]+38016083|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a&~b)+k[15]-660478335|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d&~a)+k[4]-405537848|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c&~d)+k[9]+568446438|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b&~c)+k[14]-1019803690|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a&~b)+k[3]-187363961|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d&~a)+k[8]+1163531501|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c&~d)+k[13]-1444681467|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b&~c)+k[2]-51403784|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a&~b)+k[7]+1735328473|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d&~a)+k[12]-1926607734|0;b=(b<<20|b>>>12)+c|0;a+=(b^c^d)+k[5]-378558|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[8]-2022574463|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[11]+1839030562|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[14]-35309556|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[1]-1530992060|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[4]+1272893353|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[7]-155497632|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[10]-1094730640|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[13]+681279174|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[0]-358537222|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[3]-722521979|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[6]+76029189|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[9]-640364487|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[12]-421815835|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[15]+530742520|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[2]-995338651|0;b=(b<<23|b>>>9)+c|0;a+=(c^(b|~d))+k[0]-198630844|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a|~c))+k[7]+1126891415|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d|~b))+k[14]-1416354905|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c|~a))+k[5]-57434055|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b|~d))+k[12]+1700485571|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a|~c))+k[3]-1894986606|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d|~b))+k[10]-1051523|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c|~a))+k[1]-2054922799|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b|~d))+k[8]+1873313359|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a|~c))+k[15]-30611744|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d|~b))+k[6]-1560198380|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c|~a))+k[13]+1309151649|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b|~d))+k[4]-145523070|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a|~c))+k[11]-1120210379|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d|~b))+k[2]+718787259|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c|~a))+k[9]-343485551|0;b=(b<<21|b>>>11)+c|0;x[0]=a+x[0]|0;x[1]=b+x[1]|0;x[2]=c+x[2]|0;x[3]=d+x[3]|0;}function md5blk(s){var md5blks=[],i;for(i=0;i<64;i+=4){md5blks[i>>2]=s.charCodeAt(i)+(s.charCodeAt(i+1)<<8)+(s.charCodeAt(i+2)<<16)+(s.charCodeAt(i+3)<<24);}return md5blks}function md5blk_array(a){var md5blks=[],i;for(i=0;i<64;i+=4){md5blks[i>>2]=a[i]+(a[i+1]<<8)+(a[i+2]<<16)+(a[i+3]<<24);}return md5blks}function md51(s){var n=s.length,state=[1732584193,-271733879,-1732584194,271733878],i,length,tail,tmp,lo,hi;for(i=64;i<=n;i+=64){md5cycle(state,md5blk(s.substring(i-64,i)));}s=s.substring(i-64);length=s.length;tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<length;i+=1){tail[i>>2]|=s.charCodeAt(i)<<(i%4<<3);}tail[i>>2]|=128<<(i%4<<3);if(i>55){md5cycle(state,tail);for(i=0;i<16;i+=1){tail[i]=0;}}tmp=n*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(state,tail);return state}function md51_array(a){var n=a.length,state=[1732584193,-271733879,-1732584194,271733878],i,length,tail,tmp,lo,hi;for(i=64;i<=n;i+=64){md5cycle(state,md5blk_array(a.subarray(i-64,i)));}a=i-64<n?a.subarray(i-64):new Uint8Array(0);length=a.length;tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<length;i+=1){tail[i>>2]|=a[i]<<(i%4<<3);}tail[i>>2]|=128<<(i%4<<3);if(i>55){md5cycle(state,tail);for(i=0;i<16;i+=1){tail[i]=0;}}tmp=n*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(state,tail);return state}function rhex(n){var s="",j;for(j=0;j<4;j+=1){s+=hex_chr[n>>j*8+4&15]+hex_chr[n>>j*8&15];}return s}function hex(x){var i;for(i=0;i<x.length;i+=1){x[i]=rhex(x[i]);}return x.join("")}if(hex(md51("hello"))!=="5d41402abc4b2a76b9719d911017c592");if(typeof ArrayBuffer!=="undefined"&&!ArrayBuffer.prototype.slice){(function(){function clamp(val,length){val=val|0||0;if(val<0){return Math.max(val+length,0)}return Math.min(val,length)}ArrayBuffer.prototype.slice=function(from,to){var length=this.byteLength,begin=clamp(from,length),end=length,num,target,targetArray,sourceArray;if(to!==undefined$1){end=clamp(to,length);}if(begin>end){return new ArrayBuffer(0)}num=end-begin;target=new ArrayBuffer(num);targetArray=new Uint8Array(target);sourceArray=new Uint8Array(this,begin,num);targetArray.set(sourceArray);return target};})();}function toUtf8(str){if(/[\u0080-\uFFFF]/.test(str)){str=unescape(encodeURIComponent(str));}return str}function utf8Str2ArrayBuffer(str,returnUInt8Array){var length=str.length,buff=new ArrayBuffer(length),arr=new Uint8Array(buff),i;for(i=0;i<length;i+=1){arr[i]=str.charCodeAt(i);}return returnUInt8Array?arr:buff}function arrayBuffer2Utf8Str(buff){return String.fromCharCode.apply(null,new Uint8Array(buff))}function concatenateArrayBuffers(first,second,returnUInt8Array){var result=new Uint8Array(first.byteLength+second.byteLength);result.set(new Uint8Array(first));result.set(new Uint8Array(second),first.byteLength);return result}function hexToBinaryString(hex){var bytes=[],length=hex.length,x;for(x=0;x<length-1;x+=2){bytes.push(parseInt(hex.substr(x,2),16));}return String.fromCharCode.apply(String,bytes)}function SparkMD5(){this.reset();}SparkMD5.prototype.append=function(str){this.appendBinary(toUtf8(str));return this};SparkMD5.prototype.appendBinary=function(contents){this._buff+=contents;this._length+=contents.length;var length=this._buff.length,i;for(i=64;i<=length;i+=64){md5cycle(this._hash,md5blk(this._buff.substring(i-64,i)));}this._buff=this._buff.substring(i-64);return this};SparkMD5.prototype.end=function(raw){var buff=this._buff,length=buff.length,i,tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],ret;for(i=0;i<length;i+=1){tail[i>>2]|=buff.charCodeAt(i)<<(i%4<<3);}this._finish(tail,length);ret=hex(this._hash);if(raw){ret=hexToBinaryString(ret);}this.reset();return ret};SparkMD5.prototype.reset=function(){this._buff="";this._length=0;this._hash=[1732584193,-271733879,-1732584194,271733878];return this};SparkMD5.prototype.getState=function(){return {buff:this._buff,length:this._length,hash:this._hash.slice()}};SparkMD5.prototype.setState=function(state){this._buff=state.buff;this._length=state.length;this._hash=state.hash;return this};SparkMD5.prototype.destroy=function(){delete this._hash;delete this._buff;delete this._length;};SparkMD5.prototype._finish=function(tail,length){var i=length,tmp,lo,hi;tail[i>>2]|=128<<(i%4<<3);if(i>55){md5cycle(this._hash,tail);for(i=0;i<16;i+=1){tail[i]=0;}}tmp=this._length*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(this._hash,tail);};SparkMD5.hash=function(str,raw){return SparkMD5.hashBinary(toUtf8(str),raw)};SparkMD5.hashBinary=function(content,raw){var hash=md51(content),ret=hex(hash);return raw?hexToBinaryString(ret):ret};SparkMD5.ArrayBuffer=function(){this.reset();};SparkMD5.ArrayBuffer.prototype.append=function(arr){var buff=concatenateArrayBuffers(this._buff.buffer,arr),length=buff.length,i;this._length+=arr.byteLength;for(i=64;i<=length;i+=64){md5cycle(this._hash,md5blk_array(buff.subarray(i-64,i)));}this._buff=i-64<length?new Uint8Array(buff.buffer.slice(i-64)):new Uint8Array(0);return this};SparkMD5.ArrayBuffer.prototype.end=function(raw){var buff=this._buff,length=buff.length,tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],i,ret;for(i=0;i<length;i+=1){tail[i>>2]|=buff[i]<<(i%4<<3);}this._finish(tail,length);ret=hex(this._hash);if(raw){ret=hexToBinaryString(ret);}this.reset();return ret};SparkMD5.ArrayBuffer.prototype.reset=function(){this._buff=new Uint8Array(0);this._length=0;this._hash=[1732584193,-271733879,-1732584194,271733878];return this};SparkMD5.ArrayBuffer.prototype.getState=function(){var state=SparkMD5.prototype.getState.call(this);state.buff=arrayBuffer2Utf8Str(state.buff);return state};SparkMD5.ArrayBuffer.prototype.setState=function(state){state.buff=utf8Str2ArrayBuffer(state.buff,true);return SparkMD5.prototype.setState.call(this,state)};SparkMD5.ArrayBuffer.prototype.destroy=SparkMD5.prototype.destroy;SparkMD5.ArrayBuffer.prototype._finish=SparkMD5.prototype._finish;SparkMD5.ArrayBuffer.hash=function(arr,raw){var hash=md51_array(new Uint8Array(arr)),ret=hex(hash);return raw?hexToBinaryString(ret):ret};return SparkMD5});

const sliceDownload = (url, params) => {
    const downloadFileInChunks = (fileName, fileMd5, chunkSize, chunkCount, project) => {
        let currentIndex = 0;
        let fileBuffer = [];

        function downloadNextChunk() {
            if (currentIndex < chunkCount) {
                const params = new URLSearchParams({
                    fileName: fileName,
                    fileMd5: fileMd5,
                    chunkSize: chunkSize,
                    currentIndex: currentIndex,
                    project: project
                });
            
                fetch(`${url}?${params.toString()}`, {
                    method: 'GET'
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.arrayBuffer();
                }).then(data => {
                    fileBuffer.push(new Uint8Array(data));
                    currentIndex++;
                    downloadNextChunk(); // 假设这是一个已经定义的函数，用于处理下一个块的下载
                }).catch(error => {
                    console.error("Error downloading chunk:", error);
                });
            } else {
                let blob = new Blob(fileBuffer);
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            }
        }

        downloadNextChunk();
    };
    downloadFileInChunks(params.fileName, params.fileMd5, params.chunkSize, params.chunkCount, params.project);
};

const sliceUpload = (url, project, chunkSize) => {
  return new Promise(function (resolve, reject) {
    const upload = (file) => {
      var filePartList = [];
      var blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice;
      var chunkCount = Math.ceil(file.size / chunkSize); //分片数量
      var currentChunk = 0; //当前索引
      var spark = new SparkMD5.ArrayBuffer();
      var fileReader = new FileReader();
      fileReader.onload = (e) => {
        //FileReader.onload 回调函数会在每次读区完成后触发
        spark.append(e.target.result);
        currentChunk++;
        if (currentChunk < chunkCount) {
          loadNext();
        } else {
          var fileMd5 = spark.end();
          filePartList.forEach((item, index) => {
            let formData = new FormData();
            formData.append("file", item.filePart);
            formData.append("fileMd5", fileMd5);
            formData.append("chunkCount", chunkCount);
            formData.append("currentIndex", item.currentIndex);
            formData.append("fileName", file.name);
            if(project != undefined) {
                formData.append('project', project);
            }
            fetch(url, {
              method: "POST",
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => resolve(data))
              .catch((error) => reject(error));
            });
        }
      };
      fileReader.onerror = () => {
        console.log("文件读取处理发生错误");
      };

      function loadNext() {
        var temp = {};
        var start = currentChunk * chunkSize;
        var end =
          start + chunkSize >= file.size ? file.size : start + chunkSize;
        var filePart = blobSlice.call(file, start, end); //分隔文件
        temp.currentIndex = start;
        temp.filePart = filePart;
        filePartList.push(temp); //将分片文件加入到分片文件列表中
        fileReader.readAsArrayBuffer(filePart); //将分片文件使用FileReader读取
      }

      loadNext();
    };
    createFileInput(upload);
  });
};

const createAxios = (
  axios,
  baseUrl,
  autoSetAuthorization = true,
  autoSetToken = true
) => {
  const http = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
  });

  http.interceptors.request.use(
    (config) => {
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json;charset=UTF-8";
      }
      if (autoSetAuthorization && localStorage.getItem("token")) {
        config.headers["Authorization"] = localStorage.getItem("token");
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (response) => {
      if (autoSetToken && response.data.code == 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return http;
};

const useRuoyiAuth = (axios) => {
  return {
    login: async (data) => {
      const res = await axios.post(`/login`, data);
      return res.data;
    },
    getInfo: async () => {
      const res = await axios.get(`/getInfo`);
      return res.data;
    },
  };
};

const useRuoyiFileApi = (axios) => {
  return {
    uploadFile: () => {
      return new Promise(function (resolve, reject) {
        const upload = (file) => {
          const param = new FormData();
          param.append("file", file);
          const config = { headers: { "Content-Type": "multipart/form-data" } };
          axios
            .post("/common/upload", param, config)
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        };
        createFileInput(upload);
      });
    },
  };
};

const useRuoyiApi = (axios, prefix = "system") => {
  return {
    updateXhr: async (module, data = {}) => {
      const res = await axios.put(`/${prefix}/${module}`, data);
      return res.data;
    },
    insterXhr: async (module, data = {}) => {
      const res = await axios.post(`/${prefix}/${module}`, data);
      return res.data;
    },
    selectXhr: async (module, id) => {
      const res = await axios.get(`/${prefix}/${module}/${id}`);
      return res.data;
    },
    deleteXhr: async (module, id) => {
      const res = await axios.delete(`/${prefix}/${module}/${id}`);
      return res.data;
    },
    selectListXhr: async (module, params={}) => {
      const res = await axios.get(`/${prefix}/${module}/list`, {
        params: params
      });
      return res.data;
    },
  };
};

function capitalizeFirstLetter(string) {
  if (typeof string !== "string" || string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const useRuoyiModuleApi = (axios, prefix = "system", module) => {
  const { updateXhr, insterXhr, selectXhr, deleteXhr, selectListXhr } =
    useRuoyiApi(axios, prefix);
  const func = {};
  func[`update${capitalizeFirstLetter(module)}Xhr`] = async (data) => {
    return await updateXhr(module, data);
  };

  func[`inster${capitalizeFirstLetter(module)}Xhr`] = async (data) => {
    return await insterXhr(module, data);
  };

  func[`select${capitalizeFirstLetter(module)}Xhr`] = async (id) => {
    return await selectXhr(module, id);
  };

  func[`delete${capitalizeFirstLetter(module)}Xhr`] = async (id) => {
    return await deleteXhr(module, id);
  };

  func[`select${capitalizeFirstLetter(module)}ListXhr`] = async (params) => {
    return await selectListXhr(module, params);
  };

  return func;
};

const rufs = {
    downloadM3U8, simpleUpload, simpleDownload, sliceDownload, sliceUpload, createAxios, useRuoyiApi, useRuoyiModuleApi, useRuoyiAuth, useRuoyiFileApi
};

if(window) window.rufs = rufs;

export { createAxios, rufs as default, useRuoyiApi, useRuoyiAuth, useRuoyiFileApi, useRuoyiModuleApi };
