import axios from "../../libs/axios";
async function getVariables() {
  try {
    const response = await axios.get("/config");
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Ha ocurrido un error:", error);
  }
}

async function configureCloudinary() {
  const config = await getVariables();
  const options = {
    cloudName: config.cloudinaryCloud,
    uploadPreset: config.cloudinaryPreset,
    apiKey: config.cloudinaryKey,
  };
  return options;
}

export default configureCloudinary;
