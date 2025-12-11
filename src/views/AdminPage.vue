<template>
  <h1>This is the Admin page</h1>
  <p>Account:</p>
  <p>{{ account?.data?.session?.user?.email }}</p>
</template>

<script setup>
import { supabase } from "./../supabaseClient";
import { onMounted, ref } from "vue";

const account = ref();

async function getSession() {
  account.value = await supabase.auth.getSession();
}

onMounted(() => {
  getSession();
});
</script>
