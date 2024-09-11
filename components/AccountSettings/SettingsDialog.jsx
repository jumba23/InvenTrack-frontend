import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Avatar,
} from "@mui/material";
import { useProfile } from "@/context/ProfileContext"; // Assuming this context is created
import { useForm, Controller } from "react-hook-form";

export default function SettingsDialog({ open, onClose }) {
  const { profile, updateImage } = useProfile();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: profile ? { name: profile.name, cell: profile.cell } : {},
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (imageFile) {
        await updateImage(profile.userId, imageFile); // Update profile image
      }
      // Handle the name and cell number update here (you can make another API call)
      console.log(data);
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
            src={profile?.imageUrl}
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
            rules={{ required: "Cell number is required" }}
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
      {/* Snackbar for success/error messages */}
    </Dialog>
  );
}
