/* eslint-disable react/prop-types */
const FieldSet = ({ label, children }) => {
  return (
    <fieldset>
      {label && (
        <legend className="text-base font-semibold text-white">{label}</legend>
      )}
      <div>{children}</div>
    </fieldset>
  );
};

export default FieldSet;
