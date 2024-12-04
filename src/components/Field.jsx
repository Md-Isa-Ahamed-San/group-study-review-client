/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";

const Field = ({ children, label, htmlFor,error }) => {
  const id = htmlFor || getChildId(children);

  return (
    <div className=" mb-6">
      {/* {label && <label htmlFor={id} className="text-sm text-start">{label}</label>} */}
      <div>{children}</div>
      {!!error && <div className="text-red-500 absolute">{error.message}</div>}
    </div>
  );
};

export default Field;

const getChildId = (children) => {
  const child = React.Children.only(children);
  return child?.props?.id;
};
