<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="h5 mb-0">Book List</h2>
        <small class="text-muted" v-if="books.length">Total: {{ books.length }}</small>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-4">
        <div class="spinner-border" role="status" />
        <div class="mt-2 text-muted">Loading books…</div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="alert alert-danger mb-0" role="alert">
        {{ error }}
      </div>

      <!-- Empty -->
      <div v-else-if="!books.length" class="text-center py-4 text-muted">
        No books yet. Add one above!
      </div>

      <!-- Table -->
      <div v-else class="table-responsive">
        <table class="table table-striped align-middle mb-0">
          <thead>
            <tr>
              <th style="width: 120px;">ISBN</th>
              <th>Name</th>
              <th style="width: 120px;" class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in books" :key="b.id">
              <td class="font-monospace">{{ b.isbn }}</td>
              <td>{{ b.name }}</td>
              <td class="text-end">
                <!-- <button class="btn btn-sm btn-outline-secondary me-2" @click="editBook(b)">Edit</button> -->
                <button class="btn btn-sm btn-outline-danger" @click="deleteBook(b.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { db } from '../Firebase/init.js'
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore'

const books = ref([])
const loading = ref(true)
const error = ref('')

let unsubscribe = null

onMounted(() => {
  try {
    const q = query(collection(db, 'books'), orderBy('isbn', 'asc'))
    unsubscribe = onSnapshot(
      q,
      (snap) => {
        books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        loading.value = false
      },
      (err) => {
        error.value = 'Failed to load books: ' + (err?.message || '')
        loading.value = false
      }
    )
  } catch (e) {
    error.value = 'Failed to subscribe: ' + (e?.message || '')
    loading.value = false
  }
})

onUnmounted(() => {
  if (typeof unsubscribe === 'function') unsubscribe()
})

const deleteBook = async (id) => {
  const ok = confirm('Delete this book?')
  if (!ok) return
  try {
    await deleteDoc(doc(db, 'books', id))
  } catch (e) {
    alert('Delete failed: ' + (e?.message || 'unknown error'))
  }
}

// const editBook = (book) => { /* open modal and call updateDoc(...) */ }
</script>

<style scoped>
.card {
  border: 0;
  border-radius: 1rem;
}
thead th {
  white-space: nowrap;
}
</style>
