<template>
  <div class="flex flex-row gap-10 mt-10">
    <!-- left -->
    <div
      class="bg-secondary w-2/3 rounded-2xl shadow-lg hover:shadow-2xl transition"
    >
      <div
        class="w-full h-[500px] overflow-hidden flex justify-center items-center rounded-t-2xl"
      >
        <img
          class="scale-[0.69]"
          src="./../../assets/images/zhongli.webp"
          alt=""
          loading="lazy"
        />
      </div>
      <div class="p-4">
        <h1 class="">Welcome to Vision Forge</h1>
        <div class="divider m-0"></div>

        <p class="text-gray-300 leading-relaxed tracking-wide">
          Vision Forge is a simple, fan-made space where you can find character
          builds, materials, and team compositions for Genshin Impact. My goal
          is to cut through the complexity and help you forge your perfect
          character.
        </p>

        <p class="text-gray-300 leading-relaxed tracking-wide">
          This isn't a pro-level guide, just a fun project where I explore and
          find what works best for me. Hope you find something useful here! and
          enjoy your time in Teyvat!
        </p>
      </div>
    </div>

    <!-- right -->
    <div
      class="bg-secondary w-1/3 rounded-2xl shadow-lg hover:shadow-2xl transition"
    >
      <div
        class="w-full h-[500px] overflow-hidden flex justify-center items-center rounded-t-2xl"
      >
        <img
          class="scale-50"
          src="./../../assets/images/twins.webp"
          alt=""
          loading="lazy"
        />
      </div>
      <div class="p-4">
        <h1 class="text-center">Welcome to Vision Forge</h1>
        <div class="divider m-0"></div>

        <p class="text-gray-300 leading-relaxed text-center tracking-wide">
          Here you can find a comprehensive list of all playable characters
          available in Genshin Impact.
        </p>
        <div class="flex justify-center mt-4 mb-2">
          <router-link
            class="font-acme tracking-wider no-underline text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg px-4 py-3 leading-5 transition-all duration-300 ease-out hover:scale-[1.03]"
            to="/characters"
          >
            Go to Characters
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
