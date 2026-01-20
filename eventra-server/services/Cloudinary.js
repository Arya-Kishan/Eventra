import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: "dwvuqahw2",
  api_key: "563441375781984",
  api_secret: "x2dEVPTIwie3i9dBNG2-wyCMz1Y",
});

const getImageUrl = async (file) => {
  let result = await uploadAssesAndGetUrl(file, "image");
  return result;
};

const getVideoUrl = async (file) => {
  let result = await uploadAssesAndGetUrl(file, "video");
  return result;
};

const getAudioUrl = async (file) => {
  let result = await uploadAssesAndGetUrl(file, "video");
  return result;
};

export const uploadFileToCloudinary = async (fileType, file) => {
  if (fileType == "image") {
    return getImageUrl(file.image[0]);
  }

  if (fileType == "video") {
    return getVideoUrl(file.video[0]);
  }

  if (fileType == "audio") {
    return getAudioUrl(file.audio[0]);
  }
};

export const deleteFileFromCloudinary = async (cloudinary_public_id) => {
  let result = await cloudinary.uploader.destroy(cloudinary_public_id);
  return result;
};

export const uploadAssesAndGetUrl = async (file, type) => {
  try {
    if (file) {
      let streamUpload = (file) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            {
              resource_type: type,
              folder: "Eventra",
            },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );

          streamifier.createReadStream(file.buffer).pipe(stream);
        });
      };

      async function upload(file) {
        let result = await streamUpload(file);
        return {
          url: result.secure_url,
          public_id: result.public_id,
          success: true,
        };
      }

      return upload(file);
    }
  } catch (error) {
    console.log(error);
    console.log("inside of getUrl");
    return { url: "CAN'T GET URL", public_id: "", success: false };
  }
};
