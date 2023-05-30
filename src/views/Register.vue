<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import Spinner from "../components/Spinner.vue";
import { db } from "../firebase/init.js";
import { collection, addDoc } from "firebase/firestore";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const gender = ref("");
const errMsg = ref("");
const router = useRouter();
const isLoading = ref(false);

// creating a users

const createUser = async () => {
  const colRef = collection(db, "users");

  const userObj = {
    name: email.value,
    password: password.value,
    gender: gender.value,
  };

  await addDoc(colRef, userObj);
  // isLoading.value = true;
  console.log(gender.value);
};

const register = async (e) => {
  e.preventDefault();

  if (password.value !== confirmPassword.value) {
    alert("password dont match");
    confirmPassword.value = "";
    password.value = "";
    return;
  }

  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      router.push("/authors");
    })
    .catch((err) => (errMsg.value = extractValueInParenthesis(err.message)));
  isLoading.value = true;
  createUser();
  console.log(gender.value);
};

function extractValueInParenthesis(str) {
  const regex = /\((.*?)\)/; // regex to match text inside parentheses
  const matches = str.match(regex);
  if (matches) {
    const value = matches[1].replace("auth/", ""); // remove "auth/" prefix
    return value;
  }
  return ""; // return empty string if no match found
}
</script>
<template>
  <div v-if="isLoading">
    <Spinner />
  </div>
  <div class="container" v-else>
    <div class="login-box">
      <form class="form" @submit.prevent="register">
        <p class="form-title">Register account</p>
             <div class="form-group mb-3 mt-1 col-sm-10 offset-sm-1">
        <div class="">
   <span class="input-group-text" id="basic-addon1"><i
        class="fa fa-envelope"></i>
          <input type="email" v-model="email" class="form-control" placeholder="Email" required /></span>
          <!-- <label>Email</label></span> -->
        </div>
        </div>
      <div class="form-group mb-3 mt-1 col-sm-10 offset-sm-1">
          <div class="">
     <span class="input-group-text" id="basic-addon1">
      <i class="fa fa-lock"></i>
            <input type="password" v-model="password" class="form-control" placeholder="Password" required /></span>
            <!-- <label>Email</label></span> -->
          </div>
          </div>
        <div class="form-group mb-3 mt-1 col-sm-10 offset-sm-1">
          <div class="">
     <span class="input-group-text" id="basic-addon1">
      <i class="fa fa-lock"></i>
            <input type="password" v-model="confirmPassword" class="form-control" placeholder="Confirm Password" required /></span>
          </div>
          </div>

        <div class="form-group mb-3 mt-1 d-flex justify-content-end">
           <select name="gender" id="gender" wire:model.defer="gender">
             <option hidden="true">Gender</option>
              <option disabled value>Gender</option>
                <option value="Male">Male</option>
                  <option value="Female">Female</option>
             </select>
                </div>
        <button type="submit">
          <span class="circle1"></span>
          <span class="circle2"></span>
          <span class="circle3"></span>
          <span class="circle4"></span>
          <span class="circle5"></span>
          <span class="text">Submit</span>
        </button>
      </form>
    </div>
  </div>
</template>
<style scoped>

.radio-style,
.form-title {
  color: rgb(41, 38, 38);
}
.form-title {
  text-align: center;
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: #f2f8f9;
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
  color: #2e2c2c;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #494545;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #292727;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #bdb8b8;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #ffffff;
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
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: white;
  background-color: #171717;
  padding: 1em 2em;
  border: none;
  border-radius: 0.6rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

button span:not(:nth-child(6)) {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 30px;
  width: 30px;
  background-color: #005a8b87;
  border-radius: 50%;
  transition: 0.6s ease;
}

button span:nth-child(6) {
  position: relative;
}

button span:nth-child(1) {
  transform: translate(-3.3em, -4em);
}

button span:nth-child(2) {
  transform: translate(-6em, 1.3em);
}

button span:nth-child(3) {
  transform: translate(-0.2em, 1.8em);
}

button span:nth-child(4) {
  transform: translate(3.5em, 1.4em);
}

button span:nth-child(5) {
  transform: translate(3.5em, -3.8em);
}

button:hover span:not(:nth-child(6)) {
  transform: translate(-50%, -50%) scale(4);
  transition: 1.5s ease;
}

</style>
