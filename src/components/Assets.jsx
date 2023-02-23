import React, { useState } from "react";
import { cleanStr } from "./Contract";
function Assets(props) {
  const [input, setInput] = useState("");
  function handleSubmit(e) {
    props.handleAdd(input);
    e.preventDefault();
    setInput("");
  }
  return (
    <div>
      <div className="title">Assets</div>
      <div className="list-box">
        <ul>
          {props.value.map((element) => {
            return (
              <li>
                <button
                  className="delete-list-el"
                  onClick={() => props.deleteAsset(element)}
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
export default Assets;
