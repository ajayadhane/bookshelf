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
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getBooks } from "../api/Books";

const BookTable = ({ onEdit, onDelete, refreshKey }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const booksPerPage = 10;

  const fetchBooks = async () => {
    const { data } = await getBooks();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, [refreshKey]);

  useEffect(() => {
    let result = books;
    if (searchTerm)
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    if (genreFilter) result = result.filter((b) => b.genre === genreFilter);
    if (statusFilter) result = result.filter((b) => b.status === statusFilter);
    setFilteredBooks(result);
    setPage(0);
  }, [books, searchTerm, genreFilter, statusFilter]);

  const handleChangePage = (_, newPage) => setPage(newPage);

  return (
    <>
      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <TextField
          label="Search Title or Author"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 200 }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={genreFilter}
            label="Genre"
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {["Fiction", "Non-fiction", "Sci‑fi", "Biography", "Programming"].map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {["Available", "Issued"].map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: 4,
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
            <TableRow>
              {["Title", "Author", "Genre", "Year", "Status", "Actions"].map((h) => (
                <TableCell key={h} sx={{ fontWeight: "bold" }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks
              .slice(page * booksPerPage, page * booksPerPage + booksPerPage)
              .map((book) => (
                <TableRow
                  key={book.id}
                  sx={{
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#f1f8ff",
                    },
                  }}
                >
                  <TableCell>
                    <Typography fontWeight={500}>{book.title}</Typography>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.publishedYear}</TableCell>
                  <TableCell>
                    <Chip
                      label={book.status}
                      color={book.status === "Available" ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => onEdit(book)}
                      size="small"
                      startIcon={<Edit />}
                      variant="outlined"
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onDelete(book)}
                      size="small"
                      startIcon={<Delete />}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredBooks.length}
          rowsPerPage={booksPerPage}
          rowsPerPageOptions={[booksPerPage]}
          page={page}
          onPageChange={handleChangePage}
        />
      </TableContainer>
    </>
  );
};

export default BookTable;
