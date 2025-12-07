import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import UpdatesSection from "@/components/UpdatesSection.vue";

vi.mock("../src/supabaseClient.js", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue({
        data: [
          { id: 1, title: "Test Update" },
          { id: 2, title: "Another Update" },
        ],
        error: null,
      }),
    })),
  },
}));

describe("Updates.vue", () => {
  it("fetches updates and populates the updates ref", async () => {
    const wrapper = mount(UpdatesSection);

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.updates.length).toBeGreaterThan(0);
  });
});
