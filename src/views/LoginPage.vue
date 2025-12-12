<template>
  <div
    class="w-[750px] h-[500px] bg-secondary rounded-xl p-8 flex flex-row relative"
  >
    <div class="w-1/2 flex justify-center items-center">
      <h1>Admin Login</h1>
    </div>
    <!---->
    <div class="w-1/2 flex flex-col justify-center items-center gap-4">
      <p v-if="loginError" class="absolute bottom-24 text-red-500">
        {{ loginError }}
      </p>
      <!---->
      <div class="flex flex-col">
        <label for="email">Email</label>
        <input
          class="input"
          v-model="email"
          type="text"
          name="email"
          id="email"
        />
      </div>
      <!---->
      <div class="flex flex-col">
        <label for="password">Password</label>
        <input
          class="input"
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
    <!---->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "./../supabaseClient";
import { useRouter } from "vue-router";

let email = ref("");
let password = ref("");
const loginError = ref("");
const loggingIn = ref(false);

const router = useRouter();

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
  router.push("/admin");
}
</script>
