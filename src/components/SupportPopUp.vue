<template>
  <div class="fixed top-16 right-1 m-4 z-50">
    <div @click="showPopup = !showPopup" class="relative cursor-pointer group">
      <img
        width="85"
        src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/06/01/237301566/741d1a62ad6e8d6818c53c97eeccdce6_2278495532066979603.gif"
        alt="Support"
        class="transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
      />
    </div>
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-if="showPopup"
        class="absolute top-20 right-16 w-80 bg-secondary rounded-2xl shadow-2xl border border-tertiary/20 overflow-hidden"
      >
        <div class="bg-gradient-to-r from-tertiary to-purple-600 p-4 relative">
          <button
            @click="showPopup = false"
            class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
              />
            </svg>
          </button>
          <h2 class="text-white text-xl font-bold">Love Stratagema? ❤️</h2>
          <p class="text-white/80 text-sm mt-1">
            Every contribution makes a difference
          </p>
        </div>
        <div class="p-4 space-y-4">
          <div class="space-y-3">
            <a
              href="#"
              class="flex items-center gap-3 p-3 bg-primary rounded-lg hover:bg-tertiary/20 transition-all duration-200 group no-underline"
            >
              <div
                class="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <img
                  src="/src/assets/images/icons/patreon.png"
                  alt="patreon"
                  class="w-6"
                />
              </div>
              <div class="flex-grow">
                <h3 class="text-white font-semibold text-sm">Patreon</h3>
                <p class="text-gray-400 text-xs">
                  Your support keeps us running!
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="text-gray-400 group-hover:text-tertiary group-hover:translate-x-1 transition-all"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </a>
            <a
              href="#"
              class="flex items-center gap-3 p-3 bg-primary rounded-lg hover:bg-tertiary/20 transition-all duration-200 group no-underline"
            >
              <div
                class="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="text-tertiary"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                  />
                  <path
                    d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"
                  />
                </svg>
              </div>
              <div class="flex-grow">
                <h3 class="text-white font-semibold text-sm">FAQ</h3>
                <p class="text-gray-400 text-xs">Find quick answers</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="text-gray-400 group-hover:text-tertiary group-hover:translate-x-1 transition-all"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
const showPopup = ref(false);
</script>
