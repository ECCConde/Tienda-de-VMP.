<!-- src/components/Header.vue -->

<template>
    <header>
      <div class="header-content">
        <div class="logo">
          <!-- Agrega aquí tu logo -->
          <img src="../assets/logo.png" alt="Logo" />
        </div>
        <div class="title">
          <h1>Vitaminas y Suplementos Deportivos</h1>
        </div>
        <div v-if="isLoggedIn" class="user-info">
          <p>Bienvenido, {{ user.username }} </p>
          <button @click="logout">Cerrar Sesión</button>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      },
      user() {
        return this.$store.state.user;
      },
    },
    methods: {
      logout() {
        this.$store.commit('logout');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente Header */
  header {
    background-color: #3498db;
    color: #fff;
    padding: 20px;
    text-align: center;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo img {
    max-height: 50px; /* Ajusta la altura según tus necesidades */
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  button {
    background-color: #e74c3c;
    color: #fff;
    border: none;
    padding: 5px 10px;
    margin-left: 10px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c0392b;
  }
  </style>
  