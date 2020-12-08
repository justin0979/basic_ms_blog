import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { findByTestAttr } from "#test/testUtils";
import App from "components/App";

/**
 * Function to setup tests for App component
 * @function setup
 * @param {object} props
 * @param {object} state
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  return shallow(<App {...props} />);
};

test("renders without crashing", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "appComponent");
  expect(appComponent.length).not.toBe(0);
});

test("lazyLoadLazy returns default message", () => {
  const wrapper = setup();
  const lazyLoadLazyDefault = findByTestAttr(
    wrapper,
    "lazyLoadLazyDefault"
  );
  expect(lazyLoadLazyDefault.text()).toBe("Loaded here");
});

describe("lazyLoadButton", () => {
  test("renders", () => {
    const wrapper = setup();
    const lazyLoadButton = findByTestAttr(wrapper, "lazyLoadButton");
    expect(lazyLoadButton.length).toBe(1);
  });
});
