<template>
  <div class="flex flex-row gap-10">
    <div
      class="w-1/2 bg-secondary rounded-2xl shadow-lg hover:shadow-2xl transition"
    >
      <div class="overflow-hidden rounded-t-2xl h-[350px]">
        <img
          class="w-full scale-[1.4]"
          src="./../../assets/images/skirk.webp"
          alt=""
          loading="lazy"
        />
      </div>
      <div class="p-4">
        <h1>Weapon Archive</h1>
        <div class="divider m-0"></div>
        <p class="text-gray-300 leading-relaxed tracking-wide">
          Here you can find a list of all weapons available in Genshin Impact.
          <br />
          With their materials, stats and attributes.
        </p>
        <div class="flex justify-start my-4">
          <RouterLink
            class="font-acme tracking-wider no-underline text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg px-4 py-3 leading-5 transition-all duration-300 ease-out hover:scale-[1.03]"
            to="/weapons"
          >
            Go to Weapons
          </RouterLink>
        </div>
      </div>
    </div>
    <div
      class="w-1/2 bg-secondary rounded-2xl shadow-lg hover:shadow-2xl transition"
    >
      <div class="overflow-hidden rounded-t-2xl h-[350px]">
        <img
          class="w-full scale-[1.4]"
          src="./../../assets/images/chiori.webp"
          alt=""
          loading="lazy"
        />
      </div>
      <div class="p-4">
        <h1>Artifact Archive</h1>
        <div class="divider m-0"></div>
        <p class="text-gray-300 leading-relaxed tracking-wide">
          Here you can find a list of all artifacts available in Genshin Impact.
          <br />
          With their set bonuses and where to farm them.
        </p>
        <div class="flex justify-start my-4">
          <RouterLink
            class="font-acme tracking-wider no-underline text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg px-4 py-3 leading-5 transition-all duration-300 ease-out hover:scale-[1.03]"
            to="/artifacts"
          >
            Go to Artifacts
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
