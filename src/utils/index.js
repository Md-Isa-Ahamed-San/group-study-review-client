export const uploadToCloudinary = async (file, uploadPreset, cloudName) => {//upload preset is some rules of cloudinary
    if (!file) {
      throw new Error("No file provided for upload.");
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset); // Replace with your Cloudinary upload preset
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to upload file.");
      }
  
      const data = await response.json();
      console.log("link of file after upload: ", data)
      return data.secure_url; // Return the secure URL of the uploaded file
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw error;
    }
  };
  