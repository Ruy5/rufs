import "../utils/spark-md5.min.js";
import createFileInput from "../utils/createFileInput";

export const sliceDownload = (url, params) => {
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
    }
    downloadFileInChunks(params.fileName, params.fileMd5, params.chunkSize, params.chunkCount, params.project)
};

export const sliceUpload = (url, project, chunkSize) => {
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

          let res = null;
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
