import createFileInput from "../utils/createFileInput"


export const simpleUpload = (url, project) => {
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
        
    }
    createFileInput(upload)
}