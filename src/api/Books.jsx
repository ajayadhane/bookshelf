import axios from "axios";
const BASE_URL =
  "https://crudcrud.com/api/b5716be7431d481c8944741fb98fa5c0/books";

export const getBooks = () => axios.get(BASE_URL);
export const addBook = (book) => axios.post(BASE_URL, book);

export const updateBook = (id, book) => {
  const updatedBook = { ...book };
  delete updatedBook._id;
  return axios.put(`${BASE_URL}/${id}`, updatedBook);
};

export const deleteBook = (id) => axios.delete(`${BASE_URL}/${id}`);
