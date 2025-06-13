import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { getBooks } from "../api/Books";

const BookTable = ({ onEdit, onDelete }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);

  const booksPerPage = 10;

  const fetchBooks = async () => {
    try {
      const { data } = await getBooks();
      setBooks(data);
      setFilteredBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (genreFilter) {
      filtered = filtered.filter((book) => book.genre === genreFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((book) => book.status === statusFilter);
    }

    setFilteredBooks(filtered);
    setPage(0);
  }, [searchTerm, genreFilter, statusFilter, books]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
        <TextField
          label="Search by Title or Author"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Genre</InputLabel>
          <Select
            value={genreFilter}
            label="Genre"
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Fiction">Fiction</MenuItem>
            <MenuItem value="Non-fiction">Non-fiction</MenuItem>
            <MenuItem value="Sci-fi">Sci-fi</MenuItem>
            <MenuItem value="Biography">Biography</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Issued">Issued</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Genre</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Year</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks
              .slice(page * booksPerPage, page * booksPerPage + booksPerPage)
              .map((book, index) => (
                <TableRow
                  key={book._id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.publishedYear}</TableCell>
                  <TableCell>{book.status}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => onEdit(book)}
                      variant="outlined"
                      color="primary"
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onDelete(book)}
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[booksPerPage]}
          component="div"
          count={filteredBooks.length}
          rowsPerPage={booksPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </TableContainer>
    </>
  );
};

export default BookTable;
