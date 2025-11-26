// cloudinary.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async(localFilePath)=>{
  try{
    if(localFilepath)return null;
   const response = await cloudinary.uploader.upload(localFilePath,{
      resource_type: "auto",
      //image has been successfully uploaded then we can remove it from local storage
    })
      console.log("file uploaded to cloudinary successfully",
        response.url);
        return response;

  }catch(error){
    fs.unlinkSync(localFilePath);// rempove the file from local storage in case of error
    console.log("error while uploading file to cloudinary", error);
    return null;
  }
}


export {uploadOnCloudinary};
