export async function getBase64(selectedFile) {
    return new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
            resolve(reader.result);
        }
    })
}