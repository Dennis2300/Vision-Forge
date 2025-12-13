<template>
  <div class="w-3/4 min-h-[700px] p-6 bg-secondary rounded-2xl">
    <h1 class="divider mt-4 px-16">Admin panel</h1>
    <div class="flex flex-row gap-8 mt-10">
      <div class="w-1/2 flex flex-col gap-4">
        <div class="bg-primary p-4 rounded-xl">
          <h2>
            Hello!
            <span class="text-tertiary">
              {{ account?.data?.session?.user?.user_metadata?.username }}
            </span>
          </h2>
          <h3>
            logged in with email:
            <span class="text-tertiary">{{
              account?.data?.session?.user?.email
            }}</span>
          </h3>
        </div>
        <div class="bg-primary p-4 rounded-xl">
          <div class="flex flex-row justify-between">
            <h3>Give Update Message</h3>
            <button class="btn btn-primary px-4 tracking-wider">View current messages</button>
          </div>
          <textarea class="textarea w-full h-[200px] mt-4"></textarea>
        </div>
      </div>
      <div class="w-1/2">
        <div class="bg-primary rounded-xl">
          <CreateAccount />
        </div>
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
