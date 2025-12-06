import { mount } from "@vue/test-utils";
import Home from "../src/pages/Home.vue";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("Home Page buttons", () => {
  let wrapper;
  const mockRouter = { push: vi.fn() };

  beforeEach(() => {
    wrapper = mount(Home, {
      global: {
        mocks: {
          $router: mockRouter, // mock router for navigation
        },
      },
    });
    mockRouter.push.mockClear(); // reset mock before each test
  });

  it("navigates to /characters when clicking Characters button", async () => {
    await wrapper.find('[data-test="btn-characters"]').trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith("/characters");
  });

  it("navigates to /weapons when clicking Weapons button", async () => {
    await wrapper.find('[data-test="btn-weapons"]').trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith("/weapons");
  });

  it("navigates to /artifacts when clicking Artifacts button", async () => {
    await wrapper.find('[data-test="btn-artifacts"]').trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith("/artifacts");
  });
});
