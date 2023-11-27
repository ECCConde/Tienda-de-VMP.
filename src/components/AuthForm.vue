<template>
  <div class="auth-form-container">
    <form @submit.prevent="submitForm" class="auth-form">
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

      <button type="submit" :class="{ 'login-button': isLogin, 'register-button': !isLogin }">
        {{ isLogin ? 'Iniciar Sesión' : 'Registrarse' }}
      </button>
    </form>
    <button @click="toggleForm" class="toggle-button">
      {{ isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión' }}
    </button>
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
        this.$store.commit('login', userData);
      } else {
        this.$store.commit('register', userData);
      }
    },
  },
};
</script>

<style scoped>
.auth-form-container {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.auth-form {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  margin-top: 15px;
  padding: 10px;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.login-button {
  background-color: #3498db;
}

.register-button {
  background-color: #2ecc71;
}

button:hover {
  background-color: #258cd1;
}

.toggle-button {
  margin-top: 15px;
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  text-decoration: underline;
}

.toggle-button:hover {
  color: #258cd1;
}
</style>
