"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import CircularProgress from "@mui/material/CircularProgress";
import { useProfile } from "@/utils/hooks/useProfile";
import { useAuth } from "@/context/AuthContext";
import SettingsDialog from "./SettingsDialog";
import Image from "next/image";
import { useState } from "react";

/**
 * ======================================== SUMMARY ========================================
 * AccountMenu Component
 *
 * Purpose:
 * - This component provides a dropdown menu for account-related actions such as
 *   accessing account settings, viewing the profile, and logging out.
 * - It uses MUI's `Menu`, `MenuItem`, and `Avatar` components to display the account menu.
 *
 * Functionality:
 * - Displays the user's profile picture (fetched from ProfileContext) in the avatar.
 * - Allows the user to access "My Account", "Settings", and "Logout" functionalities.
 * - Utilizes ProfileContext to fetch the current user's profile, including the profile image.
 *
 * Props:
 * - None (as it relies on context data and local state).
 *
 * Usage:
 * - This component is typically used in the application's header or navigation bar.
 *
 * Features:
 * - Loads the user's profile image and displays it in the account avatar.
 * - Opens a settings dialog where the user can update profile details such as name, cell number, and image.
 * - Displays a loading spinner while fetching profile data.
 *
 * ===========================================================================================
 */

export default function AccountMenu() {
  // Fetch the profile context for loading profile data
  const { profile, loading } = useProfile();
  const { toggleLogoutModal } = useAuth();

  // Local state for handling the menu open/close behavior
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSettings, setOpenSettings] = useState(false); // For opening settings dialog

  const open = Boolean(anchorEl);

  // Open the menu when the user clicks on the avatar
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Open the logout modal
  const handleOpenLogoutModal = () => {
    toggleLogoutModal(); // This opens the logout modal
    handleClose();
  };

  // Open the settings dialog
  const handleOpenSettings = () => {
    setOpenSettings(true); // Open settings dialog when user selects "Settings"
    handleClose();
  };

  return (
    <>
      {/* User Avatar */}
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="medium"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {/* Show a loading spinner if profile data is still being loaded */}
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Avatar sx={{ width: 46, height: 46 }}>
                {profile?.profile_image_url ? (
                  <Image
                    src={profile.profile_image_url} // Use profile image if available
                    alt="Profile Image"
                    width={45}
                    height={45}
                    className="rounded-full cursor-pointer hover:opacity-75"
                    style={{
                      objectFit: "contain", // Ensures the whole image fits inside
                      objectPosition: "center", // Centers the image within the avatar
                      width: "100%", // Ensures it takes full width of the container
                      height: "100%", // Ensures it takes full height of the container
                    }}
                  />
                ) : (
                  <Image
                    src="/images/default-avatar.png" // Default image if profile image is not available
                    alt="Default Avatar"
                    width={45}
                    height={45}
                    className="rounded-full cursor-pointer hover:opacity-75"
                    style={{
                      objectFit: "contain", // Ensures the whole image fits inside
                      objectPosition: "center", // Centers the image within the avatar
                      width: "100%", // Ensures it takes full width of the container
                      height: "100%", // Ensures it takes full height of the container
                    }}
                  />
                )}
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* "My Account" menu item */}
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>

        {/* Divider */}
        <Divider />

        {/* "Settings" menu item */}
        <MenuItem onClick={handleOpenSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        {/* "Logout" menu item */}
        <MenuItem onClick={handleOpenLogoutModal}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Settings Dialog for updating profile details */}
      <SettingsDialog
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      />
    </>
  );
}
