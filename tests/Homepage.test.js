import { mount } from "@vue/test-utils";
import TopSection from "../src/components/Home/TopSection.vue";
import MiddleSection from "../src/components/Home/MiddleSection.vue";
import { describe, it, expect } from "vitest";

describe("TopSection buttons", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TopSection, {
      global: {
        stubs: ["router-link"],
      },
    });
  });

  it("renders Characters button with correct route", () => {
    const btn = wrapper.find('[data-test="btn-characters"]');
    expect(btn.exists()).toBe(true);
    expect(btn.attributes("to")).toBe("/characters");
  });
});

describe("MiddleSection buttons", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MiddleSection, {
      global: {
        stubs: ["router-link"],
      },
    });
  });

  it("renders Characters button with correct route", () => {
    const btn = wrapper.find('[data-test="btn-weapons"]');
    expect(btn.exists()).toBe(true);
    expect(btn.attributes("to")).toBe("/weapons");
  });

  it("renders Characters button with correct route", () => {
    const btn = wrapper.find('[data-test="btn-artifacts"]');
    expect(btn.exists()).toBe(true);
    expect(btn.attributes("to")).toBe("/artifacts");
  });


});
