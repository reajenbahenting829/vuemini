<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <router-view />
</template>
<style lang="scss">
:root {
	--primary: #de4ab2;
	--primary-alt: #22c55e;
	--dark-alt: #334155;
	--sidebar-width: 200px;

	--personal: var(--danger);
	--light: #EEE;
	--grey: #888;
	--dark: #313154;
	--danger: #ff5b57;
	--shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	
	--personal-glow: 0px 0px 4px rgba(234, 64, 164, 0.75);
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}
body {
	background: var(--light);
}
button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}
.app {
	display: flex;
	main {
		flex: 1 1 0;
		padding: 2rem;
		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}
input:not([type="radio"]):not([type="checkbox"]), button {
	appearance: none;
	border: none;
	outline: none;
	background: none;
	cursor: initial;
}
body {
	background: var(--light);
	color: var(--light);
}
section {
	margin-top: 2rem;
	margin-bottom: 2rem;
	padding-left: 1.5rem;
	padding-right: 1.5em;
}
h3 {
	color: var(--primary);
	font-size: 1rem;
	font-weight: 400;
	margin-bottom: 0.5rem;
}
h1 {
	color: white;
}
h4 {
	color: var(--light);
	font-size: 0.875rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
}
.greeting .title {
	display: flex;
}
.greeting .title input {
	margin-left: 0.5rem;
	flex: 1 1 0%;
	min-width: 0;
}
.greeting .title,
.greeting .title input {
	color: var(--dark);
	font-size: 1.5rem;
	font-weight: 700;
}


.nav-container {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100px;
    background-color: #f5edede6;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-btn {
    width: 300px;
    display: flex;
    justify-content: space-evenly;
  }
  .nav-container h3{
    text-decoration: none;
    color: white;
    font-size: 100px;
  }
  .nav-container a{
    text-decoration: none;
    font-size: 25px;
    color: white;
  }
  .nav-container img:hover{
    background-color: rgb(230, 234, 236);
  }
  .logo {
    height: 50px;
    width: 150px;
    margin-left: 3em;
  }
</style>

