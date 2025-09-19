<template>
  <div class="container py-4">
    <h1 class="mb-4">Add Book</h1>
    <form @submit.prevent="addBook" class="mb-4">
      <!-- ISBN -->
      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN:</label>
        <input
          type="text"
          v-model="isbn"
          id="isbn"
          required
          class="form-control"
          placeholder="Enter ISBN"
        />
      </div>

      <!-- Name -->
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input
          type="text"
          v-model="name"
          id="name"
          required
          class="form-control"
          placeholder="Enter Book Name"
        />
      </div>

      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

    <!-- Book List -->
    <BookList />
  </div>
</template>

<script>
import { ref } from "vue";
import { db } from "../Firebase/init.js";
import { collection, addDoc } from "firebase/firestore";
import BookList from "../components/BookList.vue";

export default {
  components: { BookList },
  setup() {
    const isbn = ref("");
    const name = ref("");

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert("ISBN must be a valid number");
          return;
        }

        await addDoc(collection(db, "books"), {
          isbn: isbnNumber,
          name: name.value,
        });

        isbn.value = "";
        name.value = "";
        alert("Book added successfully!");
      } catch (error) {
        console.error("Error adding book: ", error);
      }
    };

    return { isbn, name, addBook };
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
