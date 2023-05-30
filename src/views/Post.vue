<script setup>
import { ref, onMounted } from "vue";

import { db, auth } from "../firebase/init.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useRouter } from "vue-router";
import Spinner from "../components/Spinner.vue";

const authors = ref("");
const title = ref("");
const description = ref("");
const errMsg = ref("");
const category = ref("");
const isLoading = ref(false);
const userIdPost = ref(null);

const router = useRouter();

const createPost = async () => {
  const colref = collection(db, "posts");

  const dataObj = {
     authors: authors.value,
    title: title.value,
    description: description.value,
    category: category.value,
    createdAt: serverTimestamp(),
    userId: userIdPost.value,
  };

  await addDoc(colref, dataObj);
  router.push("/");
  isLoading.value = true;
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      userIdPost.value = uid;
    } else {
      // User is signed out
      // ...
    }
  });
});
</script>

<template>
  <div v-if="isLoading">
    <Spinner />
  </div>
  
  <div class="container" v-else>
        <div class="card card-body col-md-2 offset-md-2 mt-5">
       <div class="card-header bg-primary">
     <h3 class="text-center text-warning text-Ialic">Create Posts</h3>
    </div>

    <form @submit.prevent="createPost">
   <div class="col-md-4 offset-md-4">
          <input type="text" v-model="authors" class="mt-3 mb-2 form-control" style="resize: none;"  placeholder="Authors"  required />
          <!-- <label>Title</label> -->
        </div>
          <input type="text"  class=" mb-3 form-control" v-model="title"  placeholder="Title"  required />
               
           <textarea name="description" placeholder="Whats on your mind?" style="resize: none;" class="form-control"
                     v-model="description" required></textarea>
                     <br>
            <div class="form-floating mb-3">
                  <div class="">
          <input type="text"  class="form-control text-dark"  placeholder="Category"  v-model="category" required />
           <label>Category</label> 
        </div>
                    <!-- <label>Category</label> -->
              </div>

      <!-- <div class="user-box">
        <input type="text" v-model="category" required />
        <label>Category</label>
      </div> -->
      <button class="mt-3 " type="submit">
        Post
        <span></span>
      </button>
    </form>
  </div>
   </div>
   
</template>

<style scoped>
.card {
  width: 350px;
  height: 420px;
  position: relative;
  padding: 25px;
  background: radial-gradient(178.94% 106.41% at 26.42% 106.41%, #FFF7B1 0%, rgba(255, 255, 255, 0) 71.88%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #FFFFFF;
  box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01), 0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09), 0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 23px;
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
}


.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(231, 226, 226, 0.987);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #252323;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #1f1d1d;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #201e1e;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #413d3d;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box a:hover {
  background: #03f40f;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03f40f, 0 0 25px #03f40f, 0 0 50px #03f40f,
    0 0 100px #03f40f;
}

.login-box a span {
  position: absolute;
  display: block;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(1) {
  bottom: 2px;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03f40f);
  animation: btn-anim1 2s linear infinite;
}

/* button style */
button {
  border: none;
  display: block;
  position: relative;
  padding: 0.7em 2.4em;
  font-size: 18px;
  background: transparent;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  color: rgb(3, 11, 33);
  z-index: 1;
  font-family: inherit;
  font-weight: 500;
}

button span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: -1;
  border: 4px solid rgb(4, 114, 134);
}

button span::before {
  content: "";
  display: block;
  position: absolute;
  width: 8%;
  height: 500%;
  background: var(--lightgray);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-60deg);
  transition: all 0.3s;
}

button:hover span::before {
  transform: translate(-50%, -50%) rotate(-90deg);
  width: 100%;
  background: rgb(3, 117, 137);
}

button:hover {
  color: white;
}

button:active span::before {
  background: #2751cd;
}
</style>
