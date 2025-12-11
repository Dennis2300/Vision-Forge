<template>
  <div class="w-[750px] h-[500px] bg-secondary rounded-xl p-8 flex flex-row">
    <div class="w-1/2 bg-blue-500 flex justify-center items-center">
      <h1>Admin Login</h1>
    </div>
    <!---->
    <div
      class="w-1/2 bg-red-500 flex flex-col justify-center items-center gap-4"
    >
      <div class="flex flex-col">
        <label for="email">Email</label>
        <input v-model="email" type="text" name="email" id="email" />
      </div>
      <!---->
      <div class="flex flex-col">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
        />
      </div>
        <button class="btn btn-primary px-4" @click="login">
          {{ loggingIn ? "Logging in..." : "Login" }}
        </button>
    </div>
  </div>
  <!-- <div class="flex flex-col gap-6">
    <RouterLink to="/admin">Admin</RouterLink>
    <h1>Login</h1>
    <div class="mt-6 flex flex-col gap-2">
      <button @click="createUser">Create</button>
      <button @click="login">
        {{ loggingIn ? "Logging in..." : "Login" }}
      </button>
      <button @click="logout">Log out</button>
    </div>
  </div>
  <p v-if="loginError" class="absolute top-24">
    {{ loginError }}
  </p> -->
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "./../supabaseClient";

let email = ref("");
let password = ref("");
const loginError = ref("");
const loggingIn = ref(false);

async function createUser() {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

async function login() {
  loginError.value = "";

  if (!email.value.trim()) {
    loginError.value = "Email is required.";
    return;
  }
  if (!password.value.trim()) {
    loginError.value = "Password is required.";
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    console.log("Logged Out");
  }
}
</script>
