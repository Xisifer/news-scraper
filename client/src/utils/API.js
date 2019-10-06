import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/articles");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/scrape" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/scrape" + id);
  },
  addComment: function(id) {
    return axios.post("/addComment" + id);
  },
  deleteComment: function(id) {
    return axios.post("/deleteComment" + id);
  },
  getComments: function(id) {
    return axios.get("/getComments" + id);
  },
};
