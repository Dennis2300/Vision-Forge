<template>
  <div
    class="w-[750px] h-[500px] bg-secondary rounded-xl p-8 flex flex-row relative"
  >
    <div class="w-1/2 flex justify-center items-center">
      <div
        class="w-full h-full overflow-hidden flex justify-center items-center rounded-xl"
      >
        <img
          src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/06/01/237301566/ae7e17c9b384252d5a7f61139088cbc5_6253157773035785190.png?x-oss-process=image%2Fformat%2Cwebp"
          alt=""
        />
      </div>
    </div>
    <div class="w-1/2 h-full flex flex-col">
      <div class="h-1/3 flex justify-center items-center">
        <h1>Login</h1>
      </div>
      <div class="h-1/3 flex flex-col justify-center items-center gap-4">
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
      </div>
      <div class="h-1/3 relative flex justify-center items-center">
        <p v-if="loginError" class="absolute top-4 text-red-500">
          {{ loginError }}
        </p>
        <button class="btn btn-primary px-4" v-if="!loginLoader" @click="login">
          Login
        </button>
        <div class="btn btn-primary px-4" v-if="loginLoader">Logging in...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { supabase } from "./../supabaseClient";
import { useRouter } from "vue-router";
import { user } from "./../auth";

let email = ref("");
let password = ref("");
const loginError = ref("");
const loginLoader = ref(false);

const router = useRouter();

async function login() {
  loginError.value = "";
  loginLoader.value = true;

  if (!email.value.trim()) {
    loginError.value = "Email is required.";
    loginLoader.value = false;
    return;
  }

  if (!password.value.trim()) {
    loginError.value = "Password is required.";
    loginLoader.value = false;
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    if (error.message) {
      loginError.value = "Invalid login credentials";
    }
    loginLoader.value = false;
    return;
  }

  loginLoader.value = false;
  router.push("/admin");
}

const isAuth = computed(() => !!user.value);

onMounted(() => {
  if (isAuth.value) {
    router.push("/admin");
  } else {
    router.push("/login");
  }
});
</script>
