<!-- src/components/Cart.vue -->

<template>
    <div v-if="visible" class="cart-container">
      <div class="cart-header">
        <h2>Carrito de Compras</h2>
        <button @click="clearCart">Limpiar</button>
      </div>
      <div v-if="cartItems.length === 0">
        <p>El carrito está vacío</p>
      </div>
      <ul v-else>
        <li v-for="(item, index) in cartItems" :key="index">
          {{ item.name }} - Cantidad: {{ item.quantity }} - Precio: ${{ item.price * item.quantity }}
        </li>
      </ul>
      <button @click="checkout">Realizar Compra</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cartItems: Array,
      visible: Boolean,
    },
    methods: {
      clearCart() {
        this.$emit('clear-cart'); // Emitir evento para limpiar el carrito en el componente padre
      },
      checkout() {
        this.$emit('checkout'); // Emitir evento para realizar la compra en el componente padre
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente Cart */
  .cart-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  button {
    padding: 5px 10px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>
  