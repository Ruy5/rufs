(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.fw = factory());
})(this, (function () { 'use strict';

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
        const upload = (file) => {
            const formData = new FormData();
            formData.append('file', file);

            if(project != undefined) {
                formData.append('project', project);
            }

            return new Promise(function(resolve, reject){
                fetch(url, {
                    method: 'POST',
                    body: formData
                }).then(response => response.json())
                  .then(data => resolve(data))
                  .catch((error) => reject(error));
            });
            
        };
        createFileInput(upload);
    };

    const sliceDownload = () => {

    };

    const sliceUpload = () => {

    };

    const rufs = {
        downloadM3U8, simpleUpload, sliceDownload, sliceUpload
    };
    window.rufs = rufs;

    return rufs;

}));
