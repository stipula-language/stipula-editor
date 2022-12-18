import React, { useState } from "react";
function Name(props) {
  const [input, setInpunt] = useState("");
  function handleChange() {
    props.handleAdd(input);
  }
  return (
    <div>
      <label htmlFor="contract-name">Insert the contract name</label>
      <input
        type="text"
        id="contract-name"
        value={input}
        onChange={(e) => {
          setInpunt(e.target.value);
          handleChange();
        }}
      />
    </div>
  );
}
export default Name;
