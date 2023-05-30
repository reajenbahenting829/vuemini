<script setup>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { auth } from "../firebase/init.js";
import { onMounted, ref } from "vue";

const isLoggedIn = ref(false);
const emailName = ref("");

const router = useRouter();

onMounted(() => {
  // Check the current logged-in user
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      emailName.value = getEmailName(user.email);
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignout = () => {
  if (confirm("Are you sure you want to sign out?")) {
    signOut(auth).then(() => {
      router.push("/");
    });
  }
};

function getEmailName(email) {
  // Split the email address on the @ symbol.
  const parts = email.split("@");

  // Return the first part of the email address.
  return parts[0];
}
</script>

<template>
  <nav class="bg-slate-500 text-white p-2" style="background-color: #0c192c;
    color: rgb(255, 255, 255);">
    <div class="navbar">
      <div class="logo">
        <router-link to="/">
          <img
            src="https://cdn.dribbble.com/users/31864/screenshots/3666062/free_logos_dribbble_ph.jpg?compress=1&resize=400x300&vertical=top"
            alt=""
          />
        </router-link>
      </div>
      <div class="btn-group ms-5" >

            <router-link to="/" v-if="isLoggedIn" class="nav-link text-white m-2 text-slate-100 hover:text-slate-400 duration-300">
              <i class="fa fa-list-alt" aria-hidden="true"></i>
                &nbsp;&nbsp;Category
            </router-link>
          
 
            <router-link to="/create-post" v-if="isLoggedIn" class="nav-link text-white m-2 text-slate-100 hover:text-slate-400 duration-300">
                <i class='fa-solid fa-signs-post'></i>
                 &nbsp;&nbsp;Posts</router-link>
          
 
            <router-link to="/authors"  v-if="isLoggedIn" class="nav-link text-white m-2 text-slate-100 hover:text-slate-400 duration-300">
                     <i class="fa fa-user" aria-hidden="true"></i>
                      &nbsp;&nbsp;Author
                  </router-link>
          
 
            <router-link to="/feed"  v-if="isLoggedIn" class="nav-link text-white m-2 text-slate-100 hover:text-slate-400 duration-300">
                <i class='fas fa-user-friends'></i>
                &nbsp;&nbsp;Authors Post</router-link>
          
  <div v-if="!isLoggedIn">
              <router-link to="/register" class="nav-link text-white text-slate-100 hover:text-slate-400 duration-300">
                <i class="fa fa-registered" aria-hidden="true"></i>
                    &nbsp;&nbsp;Register</router-link>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div v-if="!isLoggedIn">
              <router-link to="/sign-in" class="nav-link text-white text-slate-100 hover:text-slate-400 duration-300">
                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                    &nbsp;&nbsp;Login</router-link>
            </div>

        </div>

 
          <div class="btn-group">
                          <button type="button" class="btn btn-transparent"><i class='fas fa-user-circle'
                                  style='font-size:48px;color:#f2eeee'></i></button>
                                 &nbsp;&nbsp; <button @click="handleSignout" v-if="isLoggedIn">
                           <span class="nav-link">{{ emailName }}</span>
                           </button>
      </div>
       
      </div>
  </nav>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

aside {
	display: flex;
	flex-direction: column;
	background-color: #0c192c;
    color: rgb(255, 255, 255);
	width: calc(11rem + 50px);
	overflow: hidden;
	min-height: 100vh;
	padding: 2rem;
	transition: 0.2s ease-in-out;
	.flex {
		flex: 1 1 0%;
	}
	.logo {
		margin-bottom: 2rem;
		img {
			width: 4rem;
		}
	}
	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;
		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;
		.menu-toggle {
			transition: 0.2s ease-in-out;
			.material-icons {
				font-size: 3rem;
				color: var(--light);
				transition: 0.2s ease-out;
			}
			
			&:hover {
				.material-icons {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}
	h3, .button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}
	h3 {
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}
	.menu {
		margin: 0 -1rem;
		.button {
			display: flex;
			align-items: center;
			text-decoration: none;
			transition: 0.2s ease-in-out;
			padding: 0.5rem 1rem;
			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-in-out;
			}
			.text {
				color: var(--light);
				transition: 0.2s ease-in-out;
			}
			&:hover {
				background-color: var(--primary);
				.material-icons, .text {
					color: var(--ligh);
				}
			}
			&.router-link-exact-active {
				background-color: var(--dark-alt);
				border-right: 5px solid var(--primary);
				.material-icons, .text {
					color: var(--light);
				}
			}
		}
	}
	&.is-expanded {
		width: var(--sidebar-width);
		.menu-toggle-wrap {
			top: -3rem;
			
		.menu-toggle {
				transform: rotate(-180deg);
			}
		}
		h3, .button .text {
			opacity: 1;
            color: white;
		}
		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}
		.footer {
			opacity: 0;
		}
	}
	@media (max-width: 1024px) {
		position: absolute;
		z-index: 99;
	}
}



.logo {
  display: flex;
  align-items: left;
  justify-content: left;
}
.logo img {
  width: 50px;
  border-radius: 20px;
}
.logo a {
  color: white;
  font-size: 27px;
  font-weight: 600;
  text-decoration: none;
}

.menu ul {
  display: flex;
  align-items: center;
}

.menu li {
  list-style: none;
  margin: 0 15px;
}

.menu li a {
  color: white;
  font-size: 17px;
  font-weight: 500;
  text-decoration: none;
}

.box {
  width: 140px;
  height: auto;
  float: left;
  transition: 0.3s ease-in-out;
  position: relative;
  display: block;
  overflow: hidden;
  padding: 8px;
  text-align: center;
  margin: 0 3px;
  background: transparent;
  text-transform: uppercase;
  font-weight: 900;
}

.box:before {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  height: 4px;
  width: 100%;
  border-bottom: 4px solid transparent;
  border-left: 4px solid transparent;
  box-sizing: border-box;
  transform: translateX(100%);
}

.box:after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  border-top: 4px solid transparent;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  transform: translateX(-100%);
}

.box:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.box:hover:before {
  border-color: #e4e0df;
  height: 100%;
  transform: translateX(0);
  transition: 0.3s transform linear, 0.3s height linear 0.3s;
}

.box:hover:after {
  border-color: #e4e0df;
  height: 100%;
  transform: translateX(0);
  transition: 0.3s transform linear, 0.3s height linear 0.5s;
}

button {
  color: white;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
}

.nav-link:hover {
    color: white;
    border-bottom: 1px solid white;
    border-radius: 10px;
    background-color: hwb(336 2% 31% / 0.056);


}
.new_1 {
    width: 180px;
    border-radius: 50%;
    border: 3px solid #cccccc;
    border-bottom: none;
    margin: auto;
    margin-top: 10px;
}
.iconss {
    margin: auto;
    font-size: 20px;
}.iconss i:hover {
    transform: scale(1.09);
}
footer {
    background-color: rgb(0, 0, 54);
    height: 250px;
}
.barrel {
    border: 1px solid rgb(58, 58, 99);
    padding: 6px;
    background-color: rgb(60, 57, 107);
    border-radius: 12px;
    margin-bottom: 50px;
    margin-left: 13px;
    margin-right: 6px;
}
.itemss {
    background-color: rgb(0, 0, 54);
}
</style>
