<template>
  <div id="app">
    <pre>{{ jsondata }}</pre>
    <p v-if="error" style="color:red">Error: {{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      jsondata: null, 
      error: null,
    };
  },
  mounted() {
    this.getBookCountAPI();
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get(
          'https://us-central1-week7-yangxu.cloudfunctions.net/countBooks'
        );
        this.jsondata = response.data; 
        this.error = null;
      } catch (error) {
        console.error('Error fetching book count:', error);
        this.error = error.message; 
        this.jsondata = null;
      }
    },
  },
};
</script>
