import createFileInput from "../utils/createFileInput"


export const simpleUpload = (url, project) => {
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
        }
    
        createFileInput(upload)
    });
}

export const simpleDownload = (url) => {
    const fileLink = document.createElement('a');
    fileLink.href = url + "&disposition=attachment";
    fileLink.display = "none"
    document.body.appendChild(fileLink);
    fileLink.click();
}