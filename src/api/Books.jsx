import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getBooks = () => axios.get(`${BASE_URL}/books`);

export const addBook = (book) => axios.post(`${BASE_URL}/books`, book);

export const updateBook = (id, book) =>
  axios.put(`${BASE_URL}/books/${id}`, book);

export const deleteBook = (id) => axios.delete(`${BASE_URL}/books/${id}`);
