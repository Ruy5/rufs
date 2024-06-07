import createFileInput from "../utils/createFileInput"


export const simpleUpload = (url) => {
    const upload = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(data => {
              console.log('Success:', data);
              alert('文件上传成功');
          })
          .catch((error) => {
              console.error('Error:', error);
              alert('文件上传失败');
          });
    }
    createFileInput(upload)
}