<template>
    <div class="product-list-container">
      <div class="title-bar">
        <h1>Lista de productos</h1>
        <div class="user-info">
          <p v-if="isLoggedIn">¡Bienvenido, {{ user.username }}!</p>
          <button v-if="isLoggedIn" @click="logout">Cerrar Sesión</button>
        </div>
        <div class="cart-icon" @click="toggleCartVisibility">
          <img
            src="../assets/cart-icon.png"
            alt="Carrito de Compras"
            width="25"
            height="25"
          />
          <span class="cart-item-count">{{ cartItems.length }}</span>
        </div>
      </div>
      <div class="layout-container">
        <div class="categories-sidebar">
          <h3>Categorías</h3>
          <ul>
            <li @click="navigateToCategory(null)">Todos</li>
            <li
              v-for="category in categories"
              :key="category.id"
              @click="navigateToCategory(category.name)"
            >
              {{ category.name }}
            </li>
          </ul>
          <!-- Mensaje de bienvenida arriba de las categorías -->
          <p v-if="isLoggedIn">¡Bienvenido, {{ user.username }}!</p>
        </div>
        <section class="product-section">
          <h2>Productos Disponibles</h2>
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-item"
          >
            <!-- Agrega el componente Product aquí -->
            <Product :product="product" @addToCart="addToCart(product)" />
            <span class="stock-info">Stock: {{ product.stock }}</span>
          </div>
        </section>
      </div>
      <button @click="toggleCartVisibility">Ver Carrito</button>
      <!-- Agrega el componente Cart aquí -->
      <Cart
        :cartItems="cartItems"
        :visible="cartVisible"
        @checkout="checkout"
        @clear-cart="clearCart"
      />
      <div v-if="!isLoggedIn">
        <h3>Inicio de Sesión / Registro</h3>
        <!-- Agrega el componente AuthForm aquí -->
        <AuthForm />
      </div>
    </div>
  </template>
  
  <script>
  import AuthForm from "./AuthForm.vue";
  import Product from "./Product.vue"; // Asegúrate de importar el componente Product
  import Cart from "./Cart.vue";
  
  export default {
    components: {
      AuthForm,
      Product,
      Cart,
    },
    data() {
      return {
        productList: [
          {
            id: 1,
            name: "Vitamina D",
            description:
              "Importante para la salud ósea y el sistema inmunológico.",
            imageUrl: "vitamin_d.jpg",
            price: 10.99,
            category: "Vitaminas",
            stock: 50,
          },
          {
            id: 2,
            name: "Vitamina C",
            description:
              "Antioxidante, ayuda en la recuperación y apoya al sistema inmunológico.",
            imageUrl: "vitamin_c.jpg",
            price: 12.99,
            category: "Vitaminas",
            stock: 30,
          },
        ],
        cartItems: [],
        cartVisible: false,
        selectedCategory: null,
      };
    },
    computed: {
      categories() {
        const allCategories = [{ id: null, name: "Todos" }];
        const uniqueCategories = new Set(
          this.productList.map((product) => product.category)
        );
        return allCategories.concat(
          Array.from(uniqueCategories).map((category) => ({
            id: category,
            name: category,
          }))
        );
      },
      filteredProducts() {
        return this.selectedCategory
          ? this.productList.filter(
              (product) => product.category === this.selectedCategory
            )
          : this.productList;
      },
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      },
      user() {
        return this.$store.state.user;
      },
    },
    methods: {
      addToCart(product) {
        const existingCartItem = this.cartItems.find(
          (item) => item.id === product.id
        );
  
        if (existingCartItem) {
          // Si el producto ya está en el carrito, actualiza la cantidad
          existingCartItem.quantity += 1;
        } else {
          // Si el producto no está en el carrito, añádelo
          this.cartItems.push({ ...product, quantity: 1 });
        }
  
        // Actualiza el stock del producto
        const updatedProduct = this.productList.find(
          (item) => item.id === product.id
        );
        if (updatedProduct) {
          updatedProduct.stock -= 1;
        }
      },
      toggleCartVisibility() {
        this.cartVisible = !this.cartVisible;
      },
      checkout() {
        // Verifica el stock antes de finalizar la compra
        const insufficientStockProducts = this.cartItems.filter(
          (item) => item.quantity > item.stock
        );
  
        if (insufficientStockProducts.length > 0) {
          alert(
            "No hay suficiente stock para algunos productos en el carrito."
          );
          return;
        }
  
        // Si hay suficiente stock, realiza la compra y actualiza el stock
        this.cartItems.forEach((item) => {
          const updatedProduct = this.productList.find(
            (product) => product.id === item.id
          );
          if (updatedProduct) {
            updatedProduct.stock -= item.quantity;
          }
        });
  
        // Implementa la lógica de pago y confirmación aquí
        alert("Compra realizada con éxito");
        this.cartItems = []; // Limpiar el carrito después de la compra
      },
      clearCart() {
        this.cartItems = []; // Limpiar el carrito
      },
      navigateToCategory(categoryName) {
        if (categoryName) {
          // Filtrar por categoría
          this.selectedCategory = categoryName;
        } else {
          // Mostrar todos los productos
          this.selectedCategory = null;
        }
      },
      logout() {
        this.$store.commit("logout");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente ProductList */
  .product-list-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .layout-container {
    display: flex;
  }
  
  .categories-sidebar {
    width: 200px;
    margin-right: 20px;
  }
  
  .categories-sidebar h3 {
    margin-bottom: 10px;
  }
  
  .categories-sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .categories-sidebar li {
    cursor: pointer;
    padding: 5px;
    margin-bottom: 5px;
    background-color: #eee;
    border-radius: 3px;
  }
  
  .categories-sidebar li:hover {
    background-color: #ddd;
  }
  
  .product-section {
    flex-grow: 1;
    margin-top: 20px;
  }
  
  .title-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c0392b;
  }
  
  .cart-icon {
    cursor: pointer;
    position: relative;
  }
  
  .cart-icon img {
    width: 50px;
    height: 50px;
  }
  
  .cart-item-count {
    position: absolute;
    top: -3px;
    right: -3px;
    background-color: #e74c3c;
    color: #fff;
    border-radius: 50%;
    padding: 2px;
    font-size: 20px;
  }
  
  .stock-info {
    color: #777;
  }
  </style>