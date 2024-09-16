import axiosClient from "./axiosClient";
import { handleApiError } from "./errorHandling";

/**
 * Fetches all profiles.
 * @param {Function} setErrorMsg
 */
export const fetchUserProfile = async (setErrorMsg) => {
  try {
    const response = await axiosClient.get("/profiles");
    return response.data;
  } catch (error) {
    return handleApiError(error, setErrorMsg, {
      serverError: "Error fetching profiles.",
    });
  }
};

/**
 * Fetches the user profile by its ID.
 * @param {string} profileId
 * @param {Function} setErrorMsg
 */
export const fetchUserProfileById = async (profileId, setErrorMsg) => {
  try {
    const response = await axiosClient.get(`/profiles/${profileId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, setErrorMsg, {
      serverError: "Error fetching profile by ID.",
    });
  }
};

/**
 * Updates the user's profile.
 * @param {string} profileId
 * @param {Object} profileData
 * @param {Function} setErrorMsg
 */
export const updateUserProfile = async (
  profileId,
  profileData,
  setErrorMsg
) => {
  try {
    const response = await axiosClient.put(
      `/profiles/${profileId}`,
      profileData
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, setErrorMsg, {
      serverError: "Error updating profile.",
    });
  }
};

/**
 * Uploads or updates the user's profile image.
 * @param {string} userId
 * @param {File} imageFile
 * @param {Function} setErrorMsg
 */
export const updateProfileImage = async (userId, imageFile, setErrorMsg) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    const response = await axiosClient.post(
      `/storage/${userId}/profile-image`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return response.data.imageUrl;
  } catch (error) {
    return handleApiError(error, setErrorMsg, {
      serverError: "Error uploading profile image.",
    });
  }
};
