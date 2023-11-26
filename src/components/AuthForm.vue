<!-- src/components/AuthForm.vue -->

<template>
    <div>
      <form @submit.prevent="submitForm">
        <div v-if="isLogin">
          <h2>Iniciar Sesión</h2>
        </div>
        <div v-else>
          <h2>Registrarse</h2>
        </div>
        <label for="username">Nombre de usuario:</label>
        <input type="text" v-model="username" required>
  
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" required>
  
        <button type="submit">{{ isLogin ? 'Iniciar Sesión' : 'Registrarse' }}</button>
      </form>
      <button @click="toggleForm">{{ isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión' }}</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLogin: true,
        username: '',
        password: '',
      };
    },
    methods: {
      toggleForm() {
        this.isLogin = !this.isLogin;
      },
      submitForm() {
        const userData = {
          username: this.username,
          password: this.password,
        };
  
        if (this.isLogin) {
          // Lógica de inicio de sesión (simulado)
          this.$store.commit('login', userData);
        } else {
          // Lógica de registro (simulado)
          this.$store.commit('register', userData);
        }
      },
    },
  };
  </script>
  