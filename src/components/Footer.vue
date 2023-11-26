<!-- Footer.vue -->

<template>
    <footer class="footer">
      <p> Ever Cristian Conde Cala - {{ currentDate }}</p>
    </footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        yourName: "Tu Nombre",
        currentDate: new Date().toLocaleDateString(),
      };
    },
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #3498db;
    color: #fff;
    padding: 20px;
    text-align: center;
  }
  </style>
  