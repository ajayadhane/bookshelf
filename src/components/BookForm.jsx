import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";

const BookForm = ({ open, onClose, onSubmit, initialData }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      publishedYear: "",
      status: "Available",
    },
  });

  useEffect(() => {
    reset({
      title: "",
      author: "",
      genre: "",
      publishedYear: "",
      status: "Available",
      ...initialData,
    });
  }, [initialData, reset]);

  const submitHandler = (data) => {
    if (initialData?._id) {
      data._id = initialData._id;
    }
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Edit Book" : "Add Book"}</DialogTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    label="Title"
                    fullWidth
                    variant="outlined"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="author"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    label="Author"
                    fullWidth
                    variant="outlined"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="genre"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    label="Genre"
                    fullWidth
                    variant="outlined"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="publishedYear"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    label="Published Year"
                    type="number"
                    fullWidth
                    variant="outlined"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    select
                    label="Status"
                    fullWidth
                    variant="outlined"
                    {...field}
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Issued">Issued</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookForm;
