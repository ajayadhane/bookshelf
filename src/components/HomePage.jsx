// src/pages/HomePage.jsx
import React, { useState } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import BookTable from "../components/BookTable";
import BookForm from "../components/BookForm";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { addBook, updateBook, deleteBook } from "../api/Books";
import { Container, Typography, Button, Box } from "@mui/material";

const HomeContent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [editingBook, setEditingBook] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [deletingBook, setDeletingBook] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (book) => {
    setEditingBook(book);
    setOpenForm(true);
  };

  const handleDelete = (book) => {
    setDeletingBook(book);
  };

  const handleFormSubmit = async (book) => {
    try {
      if (book._id) {
        await updateBook(book._id, book);
        enqueueSnackbar("Book updated successfully", { variant: "success" });
      } else {
        await addBook(book);
        enqueueSnackbar("Book added successfully", { variant: "success" });
      }
      setOpenForm(false);
      setEditingBook(null);
      setRefresh(!refresh);
    } catch (err) {
      enqueueSnackbar("Operation failed", { variant: "error" });
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteBook(deletingBook._id);
      enqueueSnackbar("Book deleted", { variant: "success" });
      setDeletingBook(null);
      setRefresh(!refresh);
    } catch (err) {
      enqueueSnackbar("Delete failed", { variant: "error" });
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        📚 Book-Shelf 📚
      </Typography>

      <Box textAlign="right" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenForm(true)}
          sx={{ borderRadius: "8px", paddingX: 3 }}
        >
          Add New Book
        </Button>
      </Box>

      <BookTable key={refresh} onEdit={handleEdit} onDelete={handleDelete} />

      <BookForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingBook(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingBook}
      />

      <ConfirmDeleteDialog
        open={Boolean(deletingBook)}
        onClose={() => setDeletingBook(null)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
};

export default function HomePage() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <HomeContent />
    </SnackbarProvider>
  );
}
