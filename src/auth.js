import { ref } from "vue";
import { supabase } from "./supabaseClient";

export const user = ref(null);

export async function initAuth() {
  const { data } = await supabase.auth.getSession();
  user.value = data.session?.user ?? null;

  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user ?? null;
  });
}

export function logout() {
  return supabase.auth.signOut();
}
