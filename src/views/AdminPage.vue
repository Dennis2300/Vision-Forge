<template>
  <div>
    <h1>This is the Admin page</h1>
    <div class="flex flex-row gap-2">
      <p>Account:</p>
      <p>{{ account?.data?.session?.user?.email }}</p>
    </div>
    <button class="btn btn-primary px-4" @click="logout">Log out</button>
  </div>
</template>

<script setup>
import { supabase } from "./../supabaseClient";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const account = ref();
const router = useRouter();

async function getSession() {
  account.value = await supabase.auth.getSession();
}

async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    router.push("/");
    console.log("Logged Out");
  }
}

onMounted(() => {
  getSession();
});
</script>
