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
      <div className="list-box" style={{width: 250}}>
        <ul>
          {props.value.map((element) => {
            return (
              <li>
                <button
                  className="delete-list-el"
                  onClick={() => props.deleteField(element)}
                ></button>
                {element}
                <input type="text" style={{width: 50}} value={props.valueInit[element]} onChange={(event) => {
                  let value = event.target.value;
                  try {
                    value = parseInt(value);
                  } catch(error) {
                    try {
                      value = parseFloat(value);
                    } catch(error) {

                    }
                  }
                  props.handleInit(element, value);
                }} />
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
