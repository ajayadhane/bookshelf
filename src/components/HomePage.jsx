// HomePage.jsx - Fully working version

import React, { useState } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Container, Typography, Button, Box } from "@mui/material";
import BookTable from "../components/BookTable";
import BookForm from "../components/BookForm";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { addBook, updateBook, deleteBook } from "../api/Books";

const HomeContent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [openForm, setOpenForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const openAdd = () => {
    setEditingBook(null);
    setOpenForm(true);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setOpenForm(true);
  };

  const handleFormSubmit = async (book) => {
    try {
      if (book.id) {
        await updateBook(book.id, book);
        enqueueSnackbar("Book updated successfully", { variant: "success" });
      } else {
        await addBook(book);
        enqueueSnackbar("Book added successfully", { variant: "success" });
      }
      setOpenForm(false);
      setEditingBook(null);
      setRefreshKey((prev) => prev + 1);
    } catch {
      enqueueSnackbar("Operation failed", { variant: "error" });
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteBook(deletingBook.id);
      enqueueSnackbar("Book deleted!", { variant: "success" });
      setDeletingBook(null);
      setRefreshKey((prev) => prev + 1);
    } catch {
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
        <Button variant="contained" onClick={openAdd}>
          Add New Book
        </Button>
      </Box>

      <BookTable
        onEdit={handleEdit}
        onDelete={setDeletingBook}
        refreshKey={refreshKey}
      />

      <BookForm
        open={openForm}
        initialData={editingBook}
        onClose={() => {
          setOpenForm(false);
          setEditingBook(null);
        }}
        onSubmit={handleFormSubmit}
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
