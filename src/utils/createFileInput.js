export default function(uploadFunc) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', (event) => {
        uploadFunc(event.target.files[0]);
    });

    document.body.appendChild(fileInput);
    fileInput.click();
}