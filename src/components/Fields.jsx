import React, { useState } from "react";
function Fields(props) {
  const [input, setInput] = useState("");
  function handleSubmit(e) {
    props.handleAdd(input);
    e.preventDefault();
    setInput("");
  }
  return (
    <div>
      <div className="title">Fields</div>
      <div className="list-box">
        <ul>
          {props.value.map((element) => {
            return (
              <li>
                <button
                  className="delete-list-el"
                  onClick={() => props.deleteField(element)}
                ></button>
                {element}
              </li>
            );
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            pattern="^[a-zA-Z][a-zA-Z0-9]{0,19}$"
            required
          />
          <input type="submit" value=" " />
        </form>
      </div>
    </div>
  );
}
export default Fields;