const devMode = (process.env.NODE_ENV !== 'development');

export default {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecrete: process.env.CLOUDINARY_API_SECRET
};