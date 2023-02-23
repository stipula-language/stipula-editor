import React, { useState } from "react";
import { cleanStr } from "./Contract";
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
              setInput(cleanStr(e.target.value));
            }}
            required
          />
          <input type="submit" value=" " />
        </form>
      </div>
    </div>
  );
}
export default Fields;
