"use client";

import { Box, Modal, Typography } from "@mui/material";
import { Stack, Button, Link, TextField } from "@mui/material";
import { useState } from "react";
import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import createProduct from "../actions/create-product";
import { CloudUpload } from "@mui/icons-material";

import { CSSProperties } from "react";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CreateProductModalProps {
  open: boolean;
  handleClose: () => void;
}

const fileInputStyles: CSSProperties = {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
};

export default function CreateProductModal({
  open,
  handleClose,
}: CreateProductModalProps) {
  const [response, setResponse] = useState<FormResponse>();
  const onClose = () => {
    setResponse(undefined);
    handleClose();
    setFilename("");
  };
  const [fileName, setFilename] = useState("");

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles}>
        <form
          className="w-full max-w-xs"
          action={async (formData) => {
            const response = await createProduct(formData);
            setResponse(response);
            if (!response.error) {
              onClose();
            }
          }}
        >
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              helperText={response?.error}
              error={!!response?.error}
              required
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              helperText={response?.error}
              error={!!response?.error}
              required
            />
            <TextField
              name="price"
              label="Price"
              variant="outlined"
              helperText={response?.error}
              error={!!response?.error}
              required
            />
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
            >
              Upload File
              <input
                type="file"
                name="image"
                style={fileInputStyles}
                onChange={(e) =>
                  e.target.files && setFilename(e.target.files[0].name)
                }
              ></input>
            </Button>
            <Typography>{fileName}</Typography>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
