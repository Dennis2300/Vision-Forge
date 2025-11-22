<template>
  <article>
    <h1 class="divider mt-20 px-32 mb-5 tracking-wide">
      {{ character.name }}'s Information
    </h1>
    <div
      class="character-info flex flex-row justify-between items-center h-72 mx-24 px-5 rounded-2xl gap-24"
    >
      <!--Left-->
      <div class="flex flex-col justify-around w-full h-full">
        <!-- Rarity -->
        <div class="flex flex-col">
          <div class="flex flex-row justify-between">
            <h2 class="font-acme text-gray-500">Rarity:</h2>
            <h2 class="tracking-wide text-yellow-400">
              <span v-for="n in character.rarity" :key="n">★</span>
            </h2>
          </div>
          <div class="divider m-0"></div>
        </div>
        <!-- Cons -->
        <div class="flex flex-col">
          <div class="flex flex-row justify-between">
            <h2 class="font-acme text-gray-500">Constellation:</h2>
            <h2 class="tracking-wide text-tertiary">
              {{ character.constellation }}
            </h2>
          </div>
          <div class="divider m-0"></div>
        </div>
        <!-- Signature Dish-->
        <div class="flex flex-col">
          <div class="flex flex-row justify-between">
            <h2 class="font-acme text-gray-500">Signature Dish:</h2>
            <div
              v-if="character.signature_dish"
              class="flex flex-row gap-2 items-center group relative"
            >
              <!-- Dish Image-->
              <img
                class="w-fit h-8 cursor-pointer"
                :src="character.signature_dish.image_url"
                alt=""
              />

              <!-- Dish Pop up -->
              <div
                class="dish-pop-up absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center rounded-lg"
              >
                <div
                  class="bg-secondary backdrop-blur-md p-2 w-96 h-auto flex flex-col items-center rounded-lg shadow-xl"
                >
                  <img
                    class="w-48"
                    :src="character.signature_dish.image_url"
                    alt=""
                  />
                  <h3 class="text-center text-tertiary tracking-wide">
                    {{ character.signature_dish.name }}
                  </h3>
                  <div class="divider m-0"></div>
                  <p class="text-center px-5 mb-3">
                    {{ character.signature_dish.description }}
                  </p>
                </div>
              </div>
              <!-- Dish name-->
              <h2 class="tracking-wide text-tertiary max-w-64 truncate">
                <a
                  class="link"
                  :href="character.signature_dish.url"
                  target="_blank"
                >
                  {{ character.signature_dish.name }}
                </a>
              </h2>
            </div>
            <div v-else>Not Revealed Yet</div>
          </div>

          <div class="divider m-0"></div>
        </div>
      </div>
      <!--Right-->
      <div class="flex flex-col justify-around w-full h-full">
        <div class="flex flex-col">
          <div class="flex flex-row justify-between">
            <h2 class="font-acme text-gray-500">Weapon:</h2>
            <div class="flex flex-row gap-2">
              <h2
                v-if="character.weapon_type"
                class="tracking-wide text-tertiary"
              >
                {{ character.weapon_type.name }}
              </h2>
              <img
                v-if="character.weapon_type"
                class="w-fit h-8"
                :src="character.weapon_type.image_url"
                alt=""
              />
            </div>
          </div>
          <div class="divider m-0"></div>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-row justify-between">
            <h2 class="font-acme text-gray-500">Birthday:</h2>
            <h2 v-if="character.birthday" class="tracking-wide text-tertiary">
              {{ character.birthday }}
            </h2>
            <p v-else>Not Revealed Yet</p>
          </div>
          <div class="divider m-0"></div>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-row justify-between">
            <h2 class="font-acme text-gray-500">Date Released:</h2>
            <h2 class="tracking-wide text-tertiary">
              {{
                new Date(character.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </h2>
          </div>
          <div class="divider m-0"></div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>
