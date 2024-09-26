/**
 * SettingsDialog Component
 *
 * This component renders a dialog for user profile settings, allowing users to view and edit
 * their profile information, including their avatar image, name, cell number, and email.
 *
 * Key features:
 * - Displays and allows updating of user avatar
 * - Provides form fields for editing user information
 * - Handles form submission and profile updates
 * - Manages loading states and error messages
 *
 * Props:
 * @param {boolean} open - Controls the visibility of the dialog
 * @param {function} onClose - Function to call when the dialog should be closed
 *
 * @requires React
 * @requires next/image
 * @requires @mui/material
 * @requires react-hook-form
 */

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useProfile } from "@/utils/hooks/useProfile";
import { useForm, Controller } from "react-hook-form";
import { updateUserProfile } from "@/utils/api/profileService";
import { handleApiError } from "@/utils/api/errorHandling";
import CancelButton from "../Buttons/CancelButton";
import SubmitButton from "../Buttons/SubmitButton";

export default function SettingsDialog({ open, onClose }) {
  const { profile, setProfile, updateImage } = useProfile();
  const [imageUploading, setImageUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      name: profile?.full_name || "",
      cell: profile?.cell_number || "",
      email: profile?.email || "",
    },
  });

  const [loading, setLoading] = useState(false);

  // Clear error message and reset form when dialog opens
  useEffect(() => {
    if (open) {
      setErrorMsg(null);
      reset({
        name: profile?.full_name || "",
        cell: profile?.cell_number || "",
        email: profile?.email || "",
      });
    }
  }, [open, profile, reset]);

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUploading(true);
      try {
        await updateImage(profile.user_id, file);
      } catch (error) {
        handleApiError(error, setErrorMsg);
      } finally {
        setImageUploading(false);
      }
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    const updatedFields = Object.keys(dirtyFields).reduce((acc, key) => {
      if (data[key] !== profile[key]) {
        acc[
          key === "name" ? "full_name" : key === "cell" ? "cell_number" : key
        ] = data[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      onClose();
      return;
    }

    setLoading(true);
    try {
      await updateUserProfile(profile.id, updatedFields);
      setProfile({ ...profile, ...updatedFields });
      onClose();
    } catch (error) {
      handleApiError(error, setErrorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle dialog close
  const handleClose = useCallback(() => {
    setErrorMsg(null);
    onClose();
  }, [onClose]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Account Settings</DialogTitle>
      <DialogContent>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                backgroundColor: "#2563ec", // Light gray background hex code
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src={
                    profile?.profile_image_url || "/images/default-avatar.png"
                  }
                  alt="Profile Image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: "10px" }}
            />
            {imageUploading && <CircularProgress size={24} />}
          </div>

          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{ mt: 2 }}
              />
            )}
          />
          <Controller
            name="cell"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Cell Number"
                fullWidth
                error={!!errors.cell}
                helperText={errors.cell?.message}
                sx={{ mt: 2 }}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mt: 2 }}
              />
            )}
          />
          <DialogActions>
            <CancelButton
              onClick={handleClose}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              Cancel
            </CancelButton>
            <SubmitButton
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? <CircularProgress size={24} /> : "Save"}
            </SubmitButton>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
