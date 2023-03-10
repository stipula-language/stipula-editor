import React, { useState } from "react";
function Name(props) {
  const [input, setInpunt] = useState("");
  return (
    <div>
      <label htmlFor="contract-name">Insert the contract name</label>
      <input
        type="text"
        id="contract-name"
        value={props.name}
        onChange={(e) => {
          setInpunt(e.target.value);
          props.handleAdd(e.target.value);
        }}
      />
    </div>
  );
}
export default Name;
