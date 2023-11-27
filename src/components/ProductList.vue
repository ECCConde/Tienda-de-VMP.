<template>
  <div class="product-list-container">
    <div v-if="!isLoggedIn">
      <div style="text-align: center">
        <h1>Lista de productos</h1>
      </div>
      <AuthForm />
    </div>
    <div class="title-bar">

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
        <p v-if="isLoggedIn">¡Bienvenido, {{ user.username }}!</p>
      </div>
      <section class="product-section">
        <h2>Productos Disponibles</h2>
        <div class="product-list">
          <ul>
            <li
              v-for="product in filteredProducts"
              :key="product.id"
              class="product-item"
            >
              <Product
                :product="product"
                @addToCart="addToCart"
                @buyNow="buyNow"
              />
              <span class="stock-info">Stock: {{ product.stock }}</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <button @click="toggleCartVisibility">Ver Carrito</button>
    <Cart
      :cartItems="cartItems"
      :visible="cartVisible"
      @checkout="checkout"
      @clear-cart="clearCart"
    />

    <!-- Incluir el componente Footer -->
    <Footer />
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import AuthForm from "./AuthForm.vue";
import Product from "./Product.vue";
import Cart from "./Cart.vue";

export default {
  components: {
    Footer,
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
          imageUrl: "/vitamin_d.png",
          price: 10.99,
          category: "Vitaminas",
          stock: 50,
        },
        {
          id: 2,
          name: "Vitamina C",
          description:
            "Antioxidante, ayuda en la recuperación y apoya al sistema inmunológico.",
          imageUrl: "/vitamin_c.png",
          price: 12.99,
          category: "Vitaminas",
          stock: 30,
        },
        {
          id: 3,
          name: "Vitamina B12",
          description:
            "Esencial para la formación de glóbulos rojos y el funcionamiento del sistema nervioso.",
          imageUrl: "/vitamin_b12.png",
          price: 14.99,
          category: "Vitaminas",
          stock: 20,
        },
        {
          id: 4,
          name: "Vitamina A",
          description:
            "Importante para la visión, el sistema inmunológico y la salud de la piel.",
          imageUrl: "/vitamin_a.png",
          price: 16.99,
          category: "Vitaminas",
          stock: 25,
        },
        {
          id: 5,
          name: "Vitamina E",
          description:
            "Propiedades antioxidantes y ayuda a mantener la piel sana.",
          imageUrl: "/vitamin_e.png",
          price: 18.99,
          category: "Vitaminas",
          stock: 15,
        },
        {
          id: 6,
          name: "Calcio",
          description: "Esencial para la salud ósea y dental.",
          imageUrl: "/calcium.png",
          price: 20.99,
          category: "Minerales",
          stock: 40,
        },
        {
          id: 7,
          name: "Hierro",
          description:
            "Importante para la formación de hemoglobina y el transporte de oxígeno en la sangre.",
          imageUrl: "/iron.png",
          price: 22.99,
          category: "Minerales",
          stock: 35,
        },
        {
          id: 8,
          name: "Magnesio",
          description:
            "Contribuye al funcionamiento muscular y nervioso, así como a la formación ósea.",
          imageUrl: "/magnesium.png",
          price: 24.99,
          category: "Minerales",
          stock: 30,
        },
        {
          id: 9,
          name: "Zinc",
          description:
            "Participa en el sistema inmunológico y contribuye a la salud de la piel.",
          imageUrl: "/zinc.png",
          price: 26.99,
          category: "Minerales",
          stock: 25,
        },
        {
          id: 10,
          name: "Yodo",
          description:
            "Necesario para la función tiroidea y el desarrollo adecuado.",
          imageUrl: "/iodine.png",
          price: 28.99,
          category: "Minerales",
          stock: 20,
        },
        {
          id: 11,
          name: "Proteína en polvo",
          description: "Ayuda en la reparación y construcción muscular.",
          imageUrl: "/protein_powder.png",
          price: 30.99,
          category: "Suplementos Alimenticios",
          stock: 15,
        },
        {
          id: 12,
          name: "Omega-3 (ácidos grasos esenciales)",
          description:
            "Beneficioso para la salud cardiovascular y el funcionamiento cerebral.",
          imageUrl: "/omega_3.png",
          price: 32.99,
          category: "Suplementos Alimenticios",
          stock: 10,
        },
        {
          id: 13,
          name: "Glutamina",
          description:
            "Importante para la recuperación muscular y el sistema inmunológico.",
          imageUrl: "/glutamine.png",
          price: 34.99,
          category: "Suplementos Alimenticios",
          stock: 18,
        },
        {
          id: 14,
          name: "Creatina",
          description:
            "Contribuye a la mejora del rendimiento atlético y la fuerza muscular.",
          imageUrl: "/creatine.png",
          price: 36.99,
          category: "Suplementos Alimenticios",
          stock: 12,
        },
        {
          id: 15,
          name: "Fibra alimentaria",
          description:
            "Promueve la salud digestiva y ayuda en el control del peso.",
          imageUrl: "/fiber.png",
          price: 38.99,
          category: "Suplementos Alimenticios",
          stock: 25,
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
        existingCartItem.quantity += 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }

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
      const insufficientStockProducts = this.cartItems.filter(
        (item) => item.quantity > item.stock
      );

      if (insufficientStockProducts.length > 0) {
        alert("No hay suficiente stock para algunos productos en el carrito.");
        return;
      }

      this.cartItems.forEach((item) => {
        const updatedProduct = this.productList.find(
          (product) => product.id === item.id
        );
        if (updatedProduct) {
          updatedProduct.stock -= item.quantity;
        }
      });

      alert("Compra realizada con éxito");
      this.cartItems = [];
    },
    clearCart() {
      this.cartItems = [];
    },
    navigateToCategory(categoryName) {
      if (categoryName) {
        this.selectedCategory = categoryName;
      } else {
        this.selectedCategory = null;
      }
    },
    logout() {
      this.$store.commit("logout");
    },
    buyNow(product) {
      const selectedQuantity = prompt(
        `Ingrese la cantidad de "${product.name}" que desea comprar:`,
        "1"
      );

      const quantity = parseInt(selectedQuantity, 10);

      if (isNaN(quantity) || quantity <= 0) {
        alert("La cantidad ingresada no es válida.");
        return;
      }

      if (quantity > product.stock) {
        alert("No hay suficiente stock para la cantidad seleccionada.");
        return;
      }

      const existingCartItem = this.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        this.cartItems.push({ ...product, quantity });
      }

      const totalCost = this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const confirmationMessage = `Precio total: $${totalCost.toFixed(
        2
      )}\n¿Desea confirmar la compra?`;

      if (window.confirm(confirmationMessage)) {
        this.cartItems.forEach((item) => {
          const updatedProduct = this.productList.find((p) => p.id === item.id);
          if (updatedProduct) {
            updatedProduct.stock -= item.quantity;
          }
        });

        alert("Compra realizada con éxito");
        this.cartItems = [];
      } else {
        // Lógica adicional si se cancela la compra
        console.log("Compra cancelada. Implementa aquí la lógica necesaria.");
      }
    },
  },
};
</script>

<style scoped>
.product-list {
  column-count: 2;
}

.product-item img {
  max-width: 10%;
  height: 10%;
}

.layout-container {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1200px; /* Puedes ajustar este valor según tus necesidades */
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
  width: 200px;
  margin-right: auto;
  margin-left: auto;
}

.product-section {
  flex-basis: 70%;
  margin-top: 20px;
}
.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  text-align: center;
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
  position: absolute;
  top: 20px;
  right: 400px;
  width: 50px;
  height: 50px;
}

.cart-item-count {
  position: absolute;
  top: -3px;
  right: 400px;
  background-color: #e74c3c;
  color: #fff;
  border-radius: 50%;
  padding: 2px;
  font-size: 20px;
}

.stock-info {
  color: #777;
}
.product-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-bottom: 20px;
  overflow: hidden;
  padding: 5px;
  transition: transform 0.3s ease-in-out;
  width: 60%;
  box-sizing: border-box;
}
</style>
