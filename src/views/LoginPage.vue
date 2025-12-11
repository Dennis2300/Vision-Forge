<template>
  <div class="flex flex-col gap-6">
    <RouterLink to="/admin">Admin</RouterLink>
    <h1>Login</h1>
    <div class="flex flex-row justify-between items-center gap-4">
      <label for="email">Email:</label>
      <input type="text" name="email" id="email" v-model="email" />
    </div>
    <div class="flex flex-row justify-between items-center gap-4">
      <label for="password">Password:</label>
      <input type="password" name="password" id="password" v-model="password" />
    </div>
    <div class="mt-6 flex flex-col gap-2">
      <button @click="createUser">Create</button>
      <button @click="login">Log in</button>
      <button @click="logout">Log out</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "./../supabaseClient";

let email = ref("");
let password = ref("");

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
