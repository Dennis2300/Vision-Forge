<template>
  <div class="w-3/4 min-h-[700px] p-6 bg-secondary rounded-2xl">
    <h1 class="divider my-4 px-16">Admin panel</h1>
    <div class="flex flex-row">
      <div class="w-1/2">
        <h2>
          Hello!
          <span class="text-tertiary">
            {{ account?.data?.session?.user?.user_metadata?.username }}
          </span>
        </h2>
      </div>
      <div class="w-1/2">
        <CreateAccount />
      </div>
    </div>
  </div>
</template>

<script setup>
import { supabase } from "./../supabaseClient";
import { onMounted, ref } from "vue";
import CreateAccount from "@/components/CreateAccount.vue";

const account = ref();

async function getSession() {
  account.value = await supabase.auth.getSession();
}

onMounted(() => {
  getSession();
});
</script>
