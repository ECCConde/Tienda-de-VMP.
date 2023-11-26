<template>
    <div class="product-card">
      <img :src="product.imageUrl" :alt="product.name">
      <div class="product-details">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">${{ product.price }}</p>
        <button @click="addToCart">Agregar al Carrito</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: Object,
    },
    methods: {
      addToCart() {
        this.$emit('addToCart');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente Product */
  .product-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 20px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
  }
  
  .product-card:hover {
    transform: scale(1.05);
  }
  
  .product-card img {
    width: 100%;
    height: auto;
  }
  
  .product-details {
    padding: 20px;
  }
  
  .product-name {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  .product-description {
    margin-bottom: 10px;
  }
  
  .product-price {
    font-size: 1.1rem;
    color: #27ae60;
  }
  
  button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #27ae60;
    color: #fff;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  button:hover {
    background-color: #218c53;
  }
  </style>