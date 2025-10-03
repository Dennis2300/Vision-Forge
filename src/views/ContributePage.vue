<template>
  <div class="contribute-page-container">
    <div class="contribute-page-header">
      <h1 class="divider">Contribute Page</h1>
      <div class="contribute-header-text">
        <p>
          This is the contribution page. Before you contribute, I must say that
          contribution is not necessary but deeply appreciated. Your support
          helps me continue creating content, improving this project, and
          bringing new ideas to life. Every little bit makes a difference, but
          even just spreading the word or engaging with the community means a
          lot!
        </p>

        <p class="mt-4">
          If you choose to contribute, you can do so safely via Patreon by
          clicking the box below. Remember, your support—whether through
          contributions, kind words, or sharing this project—is what keeps this
          going. Thank you for being here and being part of this journey! ❤️
        </p>
      </div>
    </div>
    <div class="contribute-page-content">
      <div class="contribute-page-offset">Offset</div>
      <div class="supporters-list">Supporter's list</div>
    </div>
  </div>
</template>

<style scoped>
.contribute-page-container {
  min-height: 100vh;
  width: 1200px;
}

.contribute-page-header {
  padding: 1.5rem;
}

.contribute-header-text {
  padding: 0.5rem 2rem 2rem 2rem;
}

.contribute-page-content {
  background-color: darkblue;
  display: flex;
}

.contribute-page-offset {
    flex: 1;
}

.supporters-list {
    flex: 3;
}
</style>
