<script setup>
import { ref, onMounted, computed } from "vue";
import { db } from "../firebase/init.js";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";
import { doc, deleteDoc } from "firebase/firestore";

const posts = ref([]);
const isLoading = ref(true);
const selectedCat = ref("");
const currentPage = ref(1);
const pageSize = 5;
const router = useRouter();

const filteredPosts = computed(() => {
  return posts.value.filter((post) =>
    selectedCat.value === "all"
      ? true
      : post.category.includes(selectedCat.value)
  );
});

const pageCount = computed(() => {
  return Math.ceil(filteredPosts.value.length / pageSize);
});

const paginatedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return filteredPosts.value.slice(startIndex, endIndex);
});

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const postsLocal = [];

  querySnapshot.forEach((doc) => {
    const post = {
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      category: doc.data().category,
      createdAt: doc.data().createdAt,
      userId: doc.data().userId,
    };
    postsLocal.push(post);
  });
  posts.value = postsLocal;
  isLoading.value = false;
});

const setPage = (page) => {
  currentPage.value = page;
};
</script>

<template>
  <div class="div">
    <div class="search">
      <select
        name="category"
        id="category"
        v-model="selectedCat"
        class="search__input"
      >
        <option disabled value="">Choose Category</option>
        <option value="all">All</option>
        <option v-for="post in posts" :value="post.category" :key="post.id">
          {{ post.category }}
        </option>
      </select>
    </div>
  </div>
  <div class="card-row-container">
    <div v-if="isLoading" class="center-spinner">
    </div>
    <div
      v-else
      v-for="(post, index) in paginatedPosts"
      :key="post.id"
      class="card-row"
      :class="{ 'card-row-last': (index + 1) % 4 === 0 }"
    >
      <div class="card">
        <div class="container-btn">
          <button @click.prevent="editPost(post.id)" style="background-color: orange; color:white; border:none; padding: 2px; border-radius: 2px;">
            Edit Post
          </button>
          <button @click.prevent="deletePost(post.id)" style="background-color: maroon; color:white; border:none; padding: 2px; border-radius: 2px;">
            Delete Post
          </button>
        </div>
        <h3 class="card__title">{{ post.title }}</h3>
        <p class="card__content" style="text-align: center;">{{ post.description }}</p>
        <p style="text-align: center;">{{ post.category }}</p>
    
      </div>
    </div>
  </div>
  <div style="display: flex; justify-content: end; margin-top: -30px; margin-right: 20px;">
    <button
      v-for="page in pageCount"
      :key="page"
      @click="setPage(page)"
      :class="{ edit: page === currentPage, delete: page !== currentPage }"
      style="
        border-radius: 50%;
        width: 32px;
        height: 32px;
        border: none;
        color: white;
        margin: 2px;
        background-color: orange;
        margin-top: 20px;
      "
    >
      {{ page }}
    </button>
  </div>
</template>
<style scoped>
.container-btn {
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 10px;
}

.card-row-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
 
}

.card-row {
  flex: 0 0 25%; 
  padding: 0 10px; 
  margin-bottom: 20px; 
}

.card-row-last {
  margin-bottom: 0; 
}

.card {
  --border-radius: 0.75rem;
  --primary-color: #2980b9;
  --secondary-color: #3c3852;
  width: 100%;
  font-family: "Arial";
  padding: 1rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  background: #dfdfe2;
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
  position: relative;
}

.card > * + * {
  margin-top: 1.1em;
}

.card .card__content {
  color: var(--secondary-color);
  font-size: 0.86rem;
}

.card .card__title {
  padding: 0;
  font-size: 1.3rem;
  font-weight: normal;
  text-align: center;
}

.search {
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 50px; 
  margin-left: 20px;
}

.search__input {
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: box-shadow 0.3s ease;
}

.search__input:focus {
  outline: none;
  box-shadow: 0 0 5px #7257fa;
}

.filter {
  padding: 10px;
  width: 300px;
  margin-top: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: box-shadow 0.3s ease;
}

.center-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>