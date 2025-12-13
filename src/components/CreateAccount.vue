<template>
  <LoadingSpinner v-if="loading" />
  <div
    v-else
    class=" bg-secondary rounded-2xl p-4 flex flex-col justify-center items-center"
  >
    <h1>Create User</h1>
    <div class="flex flex-col mt-4">
      <label for="email">Email</label>
      <input
        v-model="email"
        type="text"
        name="email"
        class="input input-primary"
      />
    </div>
    <div class="flex flex-col mt-4">
      <label for="password">Password</label>
      <input
        v-model="password"
        type="password"
        name="password"
        class="input input-primary"
      />
    </div>
    <div class="flex flex-col mt-4">
      <label for="username">Username</label>
      <input v-model="username" type="text" class="input input-primary" />
    </div>
    <button class="btn btn-primary mt-8 px-8" @click="createAccount">
      Create
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabaseClient";
import { useRouter } from "vue-router";
import LoadingSpinner from "@/components/Loadings/LoadingSpinner.vue";

const loading = ref(false);

let email = ref("");
let password = ref("");
let username = ref("");

const router = useRouter();

async function createAccount() {
  console.log("Create Account Clicked!");
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        username: username.value,
      },
    },
  });
  if (error) {
    console.log(error);
  } else {
    console.log(data);
    router.push("/admin");
  }
}
</script>
