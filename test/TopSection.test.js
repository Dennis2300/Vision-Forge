import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import TopSection from "./../src/components/Home/TopSection.vue";

const routes = [{ path: "/characters", name: "Characters" }];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

describe("TopSection.vue", () => {
  it('renders router-link with correct "to" attribute', async () => {
    const wrapper = mount(TopSection, {
      global: {
        plugins: [router],
      },
    });

    await router.isReady();

    const link = wrapper.findComponent({ name: "RouterLink" });
    expect(link.exists()).toBe(true);
    expect(link.props("to")).toBe("/characters");
    expect(link.text()).toBe("Go to Characters");
  });
});
