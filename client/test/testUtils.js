import checkPropTypes from "check-prop-types";

/**
 * Function to find tests by attribute
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - shallow enzyme wrapper
 * @param {sting} val - name of test attribute
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
