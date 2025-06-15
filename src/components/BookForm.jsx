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
    if (open && initialData) {
      reset(initialData);
    } else {
      reset(); 
    }
  }, [open, initialData, reset]);

  const submitHandler = (data) => {
    onSubmit({ ...initialData, ...data });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Edit Book" : "Add Book"}</DialogTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent>
          <Grid container spacing={2}>
            {["title", "author", "genre"].map((field) => (
              <Grid key={field} item xs={12} sm={4}>
                <Controller
                  name={field}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: f }) => (
                    <TextField
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      fullWidth
                      variant="outlined"
                      {...f}
                    />
                  )}
                />
              </Grid>
            ))}
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
                    {["Available", "Issued"].map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
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
