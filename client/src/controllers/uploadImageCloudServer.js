export default async function(imageBlob){
    const formData = new FormData();
    formData.append('imageCloud', imageBlob);

    const options = {
        method: 'POST',
        body: formData
    };

    //? use /upload_images from server API to up image in cloudinary
    const response = await fetch(`${import.meta.env.VITE_URL_API}/upload_images`, options);
    const data = await response.json();

    return data;
}