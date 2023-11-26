<!-- En Cart.vue -->
<template>
  <div>
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
      this.$emit('clear-cart');
    },
    checkout() {
      this.$emit('checkout');
    },
  
  },
};
</script>

<style scoped>
/* Estilos específicos del componente Cart */
.cart-container {
  max-width: 400px;
  margin: 10px; /* Agregado para separar del borde de la ventana */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: fixed;
  top: 400px; /* Fijar en la parte superior */
  right: 0; /* Fijar en la parte derecha */
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
