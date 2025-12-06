import { mount } from "@vue/test-utils";
import TopSection from "./../src/components/Home/TopSection.vue"
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("TopSection buttons", () => {
  let wrapper;
  const mockRouter = { push: vi.fn() };

  beforeEach(() => {
    wrapper = mount(TopSection, {
      global: {
        mocks: { $router: mockRouter },
      },
    });
    mockRouter.push.mockClear();
  });

  it("navigates to /characters when clicking Characters button", async () => {
    await wrapper.find('[data-test="btn-characters"]').trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith("/characters");
  });
});
