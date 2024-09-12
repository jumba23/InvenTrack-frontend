import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useProfile } from "@/utils/hooks/useProfile"; // Assuming this hook is created
import { useForm, Controller } from "react-hook-form";

export default function SettingsDialog({ open, onClose }) {
  const { profile, updateImage, setProfile } = useProfile(); // Using updateImage to update the profile image
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile?.full_name || "", // Initialize with full name from profile
      cell: profile?.cell_number || "", // Initialize with cell number or empty if null
      email: profile?.email || "", // Initialize with email or empty if null
    },
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Reset form values when profile data changes
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.full_name || "",
        cell: profile.cell_number || "",
        email: profile.email || "",
      });
    }
  }, [profile, reset]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (imageFile) {
        await updateImage(profile.user_id, imageFile); // Ensure profile.user_id is valid
      }
      console.log("Submitted data:", data);
      onClose(); // Close dialog after successful update
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Account Settings</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Display Avatar */}
          <Avatar
            src={profile?.profile_image_url || "/images/default-avatar.png"} // Correct path
            alt="Profile Image"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {/* Name Field */}
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

          {/* Cell Number Field */}
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

          {/* Email Field */}
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

          {/* Submit Button */}
          <DialogActions>
            <Button
              onClick={onClose}
              disabled={loading}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="outlined" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Save"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
