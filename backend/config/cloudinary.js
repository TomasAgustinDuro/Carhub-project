// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: "dxdtyx8je",
//   api_key: "452444677838544",
//   api_secret: "J-SviECNoO0p5-wnOtIQ_JdiI88",
// });

// export const uploadImages = async (images) => {
//   const uploadPromises = images.map((image) =>
//     cloudinary.uploader.upload(image, {
//       folder: "carhub/autos",
//     })
//   );
//   const results = await Promise.all(uploadPromises);
//   return results.map((res) => res.secure_url);
// };
