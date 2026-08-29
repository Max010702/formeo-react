import React from "react";
import { Box, Button, Stack } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import "../../../css/userPage.css";

interface ProfileForm {
  memberNick: string;
  memberPhone: string;
  memberAddress: string;
  memberDesc: string;
}

export function Settings() {
  const defaultImage = "/icons/default-user.svg";

  const [profileImage, setProfileImage] = React.useState(defaultImage);
  const [form, setForm] = React.useState<ProfileForm>({
    memberNick: "Martin Robertson",
    memberPhone: "+82 10 2469 4424",
    memberAddress: "",
    memberDesc:
      "Inspired by thoughtful interiors, natural materials, and furniture designed to last.",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProfileImage(reader.result);
      }
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const removeImage = () => {
    setProfileImage(defaultImage);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send `form` and the selected image to your backend here.
    console.log("Updated profile:", form);
  };

  return (
    <Box component="form" className="settings" onSubmit={handleSubmit}>
      <Stack className="settings__media">
        <Box className="settings__image-wrapper">
          <img
            src={profileImage}
            className="settings__image"
            alt="Profile preview"
          />
        </Box>

        <Box className="settings__media-content">
          <Box className="settings__media-title">Profile image</Box>

          <Box className="settings__media-description">
            Upload a JPG, PNG, or WEBP image. The recommended size is at least
            500 × 500 pixels.
          </Box>

          <Stack className="settings__media-actions">
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadOutlinedIcon />}
              className="settings__upload-button"
            >
              Upload image
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                hidden
                onChange={handleImageChange}
              />
            </Button>

            <Button
              type="button"
              startIcon={<DeleteOutlineIcon />}
              className="settings__remove-button"
              onClick={removeImage}
              disabled={profileImage === defaultImage}
            >
              Remove
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Box className="settings__divider" />

      <Box className="settings__fields">
        <Box className="settings__field settings__field--full">
          <label htmlFor="memberNick">Full name</label>

          <input
            id="memberNick"
            type="text"
            name="memberNick"
            value={form.memberNick}
            placeholder="Enter your full name"
            autoComplete="name"
            onChange={handleChange}
            required
          />
        </Box>

        <Box className="settings__field">
          <label htmlFor="memberPhone">Phone number</label>

          <input
            id="memberPhone"
            type="tel"
            name="memberPhone"
            value={form.memberPhone}
            placeholder="+82 10 0000 0000"
            autoComplete="tel"
            onChange={handleChange}
          />
        </Box>

        <Box className="settings__field">
          <label htmlFor="memberAddress">Delivery address</label>

          <input
            id="memberAddress"
            type="text"
            name="memberAddress"
            value={form.memberAddress}
            placeholder="Enter your delivery address"
            autoComplete="street-address"
            onChange={handleChange}
          />
        </Box>

        <Box className="settings__field settings__field--full">
          <Stack className="settings__label-row">
            <label htmlFor="memberDesc">About you</label>
            <span>{form.memberDesc.length}/300</span>
          </Stack>

          <textarea
            id="memberDesc"
            name="memberDesc"
            value={form.memberDesc}
            placeholder="Tell us about your design preferences"
            maxLength={300}
            rows={6}
            onChange={handleChange}
          />
        </Box>
      </Box>

      <Stack className="settings__footer">
        <Box className="settings__footer-text">
          Your profile information is used to personalize your experience and
          furniture deliveries.
        </Box>

        <Button
          type="submit"
          variant="contained"
          startIcon={<SaveOutlinedIcon />}
          className="settings__save-button"
        >
          Save changes
        </Button>
      </Stack>
    </Box>
  );
}
