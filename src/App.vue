<template>
  <div>
    <Header />
    <ProductList />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import ProductList from './components/ProductList.vue';

export default {
  components: {
    Header,
    ProductList,
  },
};
</script>