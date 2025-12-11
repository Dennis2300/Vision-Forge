<template>
  <div class="flex flex-col gap-6">
    <RouterLink to="/admin">Admin</RouterLink>
    <h1>Login</h1>
    <div class="flex flex-row justify-between items-center gap-4">
      <label for="email">Email:</label>
      <input type="text" name="email" id="email" />
    </div>
    <div class="flex flex-row justify-between items-center gap-4">
      <label for="password">Password:</label>
      <input type="password" name="password" id="password" />
    </div>
    <div class="mt-6 flex flex-col gap-2">
      <button>Create</button>
      <button>Log in</button>
      <button>See user</button>
      <button>Log out</button>
    </div>
  </div>
</template>
