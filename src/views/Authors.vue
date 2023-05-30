<script setup>
import { ref, onMounted, computed } from "vue";
import { db } from "../firebase/init.js";

import { collection, getDocs } from "firebase/firestore";

import Spinner from "../components/Spinner.vue";

const authors = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "users"));

  const authorLocal = [];

  querySnapshot.forEach((doc) => {
    const auth = {
      id: doc.id,
      name: doc.data().name,
      authors: doc.data().authors,
      password: doc.data().password,
      gender: doc.data().gender,
    };

    authorLocal.push(auth);
  });
  authors.value = authorLocal;
  isLoading.value = false;
});
</script>
<template>
  <div v-if="isLoading">
    <Spinner />
  </div>
  <div v-else>
    <br><br>
   
    <div class="container">
      <div class="terminal_toolbar">
          <div class="butt">
              <h1 class="text-dark text-center">Author</h1>
              <button class="btn btn-color"></button>
             
    <div class="grid">
      <div class="card" v-for="author in authors" :key="author.id">
        <div class="card-info">
          <div class="card-avatar"><i class='fas fa-user-circle' style='font-size:48px;color:#a9acc6;'></i></div>
          <div class="card-subtitle">
            <div class="card-subtitle">
            <p :style="{ color: author.name === 'male' ? 'black' : 'black' }">
              {{ author.authors}}
            </p>
          </div>
            <p :style="{ color: author.gender === 'male' ? 'black' : 'black' }">
              {{ author.name }}
            </p>
          </div>
              <span></span>
          <div class="card-subtitle">
            <span
              :style="{
                color: author.gender === 'male' ? 'black' : 'violet',
              }"
            >
              {{ author.gender }}
            </span>
          </div>
        </div>
        <ul class="card-social">
          <li class="card-social__item">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 9h3l-.375 3H14v9h-3.89v-9H8V9h2.11V6.984c0-1.312.327-2.304.984-2.976C11.75 3.336 12.844 3 14.375 3H17v3h-1.594c-.594 0-.976.094-1.148.281-.172.188-.258.5-.258.938V9z"
              ></path>
            </svg>
          </li>
          <li class="card-social__item">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.875 7.5v.563c0 3.28-1.18 6.257-3.54 8.93C14.978 19.663 11.845 21 7.938 21c-2.5 0-4.812-.687-6.937-2.063.5.063.86.094 1.078.094 2.094 0 3.969-.656 5.625-1.968a4.563 4.563 0 0 1-2.625-.915 4.294 4.294 0 0 1-1.594-2.226c.375.062.657.094.844.094.313 0 .719-.063 1.219-.188-1.031-.219-1.899-.742-2.602-1.57a4.32 4.32 0 0 1-1.054-2.883c.687.328 1.375.516 2.062.516C2.61 9.016 1.938 7.75 1.938 6.094c0-.782.203-1.531.609-2.25 2.406 2.969 5.515 4.547 9.328 4.734-.063-.219-.094-.562-.094-1.031 0-1.281.438-2.36 1.313-3.234C13.969 3.437 15.047 3 16.328 3s2.375.484 3.281 1.453c.938-.156 1.907-.531 2.907-1.125-.313 1.094-.985 1.938-2.016 2.531.969-.093 1.844-.328 2.625-.703-.563.875-1.312 1.656-2.25 2.344z"
              ></path>
            </svg>
          </li>
          <li class="card-social__item">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.547 3c.406 0 .75.133 1.031.398.281.266.422.602.422 1.008v15.047c0 .406-.14.766-.422 1.078a1.335 1.335 0 0 1-1.031.469h-15c-.406 0-.766-.156-1.078-.469C3.156 20.22 3 19.86 3 19.453V4.406c0-.406.148-.742.445-1.008C3.742 3.133 4.11 3 4.547 3h15zM8.578 18V9.984H6V18h2.578zM7.36 8.766c.407 0 .743-.133 1.008-.399a1.31 1.31 0 0 0 .399-.96c0-.407-.125-.743-.375-1.009C8.14 6.133 7.813 6 7.406 6c-.406 0-.742.133-1.008.398C6.133 6.664 6 7 6 7.406c0 .375.125.696.375.961.25.266.578.399.984.399zM18 18v-4.688c0-1.156-.273-2.03-.82-2.624-.547-.594-1.258-.891-2.133-.891-.938 0-1.719.437-2.344 1.312V9.984h-2.578V18h2.578v-4.547c0-.312.031-.531.094-.656.25-.625.687-.938 1.312-.938.875 0 1.313.578 1.313 1.735V18H18z"
              ></path>
            </svg>
          </li>
        </ul>
      </div>
    </div>
  </div>
   </div>
    </div>
      </div>
</template>

<style scoped>
.card {
 --primary-clr: #1C204B;
 --dot-clr: #BBC0FF;
 --play: hsl(195, 74%, 62%);
 width: 200px;
 height: 170px;
 border-radius: 10px;
}

.card.icon {
 font-family: "Arial";
 display: grid;
 cursor: pointer;
 grid-template-rows: 50px 1fr;
}

.grid {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.card-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card_box {
  width: 200px;
  height: 250px;
  border-radius: 20px;
  background: linear-gradient(170deg, rgba(58, 56, 56, 0.623) 0%, rgb(31, 31, 31) 100%);
  position: relative;
  box-shadow: 0 25px 50px rgba(0,0,0,0.55);
  cursor: pointer;
  transition: all .3s;
}

.card_box:hover {
  transform: scale(0.9);
}

.card_box span {
  position: absolute;
  overflow: hidden;
  width: 150px;
  height: 150px;
  top: -10px;
  left: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card_box span::before {
  content: 'Premium';
  position: absolute;
  width: 150%;
  height: 40px;
  background-image: linear-gradient(45deg, #ff6547 0%, #ffb144  51%, #ff7053  100%);
  transform: rotate(-45deg) translateY(-20px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 5px 10px rgba(0,0,0,0.23);
}

.card_box span::after {
  content: '';
  position: absolute;
  width: 10px;
  bottom: 0;
  left: 0;
  height: 10px;
  z-index: -1;
  box-shadow: 140px -140px #cc3f47;
  background-image: linear-gradient(45deg, #FF512F 0%, #F09819  51%, #FF512F  100%);
}
/*Image*/
.card-avatar {
  --size: 40px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  transition: transform 0.2s ease;
  margin-bottom: 1rem;
}

/*Card footer*/
.card-social {
  transform: translateY(200%);
  display: flex;
  justify-content: space-around;
  width: 100%;
  opacity: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.card-social__item {
  list-style: none;
}

.card-social__item svg {
  display: block;
  height: 18px;
  width: 18px;
  fill: #515f65;
  cursor: pointer;
  transition: fill 0.2s ease, transform 0.2s ease;
}

/*Text*/
.card-title {
  color: #333;
  font-size: 1.5em;
  font-weight: 600;
  line-height: 2rem;
}

.card-subtitle {
  color: #859ba8;
  font-size: 0.8em;
}

/*Hover*/
.card:hover {
  box-shadow: 0 8px 50px #23232333;
}

.card:hover .card-info {
  transform: translateY(-5%);
}

.card:hover .card-social {
  transform: translateY(100%);
  opacity: 1;
}

.card-social__item svg:hover {
  fill: #232323;
  transform: scale(1.1);
}

.card-avatar:hover {
  transform: scale(1.1);
}

</style>
