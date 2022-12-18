import React, { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { Contract, Action } from "./Contract";

function Function(props) {
  const [inputFA, setInputFA] = useState("");
  const [inputAsset, setInputAsset] = useState("");
  function handleChange() {}
  function handleChangeActions(element) {
    props.setFunction({ ...props.fun, actions: element });
    console.log(props.fun);
  }
  function handleChangeName(element) {
    props.setFunction({ ...props.fun, name: element });
  }
  function handleChangeFromState(element) {
    props.setFunction({ ...props.fun, fromState: element });
  }
  function handleChangeToState(element) {
    props.setFunction({ ...props.fun, toState: element });
  }
  function setCaller(element) {
    props.setFunction({ ...props.fun, caller: element });
  }
  function handleAddField(element) {}
  function handleAddFA() {
    props.setFunction({ ...props.fun, fields: inputFA });
  }
  function handleAddAsset(e) {
    console.log(inputAsset);
    props.setFunction({
      ...props.fun,
      assets: [...props.fun.assets, inputAsset],
    });
    e.preventDefault();
  }
  return (
    <div className="grid-container-function">
      <div className="title">Function</div>
      <div className="grid-f-name">
        <label htmlFor="function-name">Name:</label>
        <input
          id="function-name"
          type="text"
          value={props.fun.name}
          onChange={(e) => {
            handleChangeName(e.target.value);
          }}
        />
      </div>
      <div className="grid-from-state">
        <label htmlFor="function-from-state">From state:</label>
        <input
          id="function-from-state"
          type="text"
          value={props.fun.fromState}
          onChange={(e) => {
            handleChangeFromState(e.target.value);
          }}
        />
      </div>
      <div className="grid-to-state">
        <label htmlFor="function-to-state">To state:</label>
        <input
          id="function-to-state"
          type="text"
          value={props.fun.toState}
          onChange={(e) => {
            handleChangeToState(e.target.value);
          }}
        />
      </div>
      <div className="grid-f-party ">
        <label htmlFor="function-caller">Who can call it?</label>
        <select
          onChange={(e) => {
            setCaller(e.target.value);
          }}
        >
          {props.parties.map((element) => {
            return <option value={element}>{element}</option>;
          })}
        </select>
      </div>
      <div className="grid-f-fields list-box">
        <label>Formal parameters</label>
        <ul>
          {props.fun.fields.map((element) => {
            return <li>{element}</li>;
          })}
        </ul>
        <form onSubmit={handleAddField}>
          <select
            onChange={(e) => {
              setInputFA(e.target.value);
            }}
          >
            {props.fields.map((element) => {
              return <option value={element}>{element}</option>;
            })}
          </select>
          <input type="submit" value=" " />
        </form>
      </div>

      <div className="grid-f-assets list-box">
        <label>Assets parameters</label>
        <ul>
          {props.fun.assets.map((element) => {
            return <li>{element}</li>;
          })}
        </ul>
        <form onSubmit={handleAddAsset}>
          <select
            onChange={(e) => {
              setInputAsset(e.target.value);
            }}
          >
            {props.assets.map((element) => {
              return <option value={element}>{element}</option>;
            })}
          </select>
          <input type="submit" value=" " />
        </form>
      </div>
      <div className="grid-f-actions">
        <ul>
          <ActionView
            actions={props.fun.actions}
            setActions={handleChangeActions}
          />
        </ul>
      </div>
    </div>
  );
}
function ActionView(props) {
  function setThen(element, elId) {
    let index = props.actions.findIndex((item) => item.id === elId);
    let tmp = props.actions.slice();
    tmp.splice(index, 1, { ...props.actions[index], ifThen: element });
    props.setActions(tmp);
  }
  return (
    <div className="action-view">
      <AddButton
        previous=""
        setActions={props.setActions}
        actions={props.actions}
      />
      {props.actions.map((element) => {
        return (
          <div>
            <li className="action">
              {(() => {
                switch (element.type) {
                  case "SEND1":
                    return (
                      <div>
                        <label>Send:</label>
                        <input type="text" />
                        <label>to:</label>
                        <input type="text" />
                      </div>
                    );
                  case "SEND2":
                    return (
                      <div>
                        <label>Send:</label>
                        <input type="text" />
                        <select>
                          <option value="+">+</option>
                          <option value="-">-</option>
                          <option value="×">×</option>
                          <option value="÷">÷</option>
                        </select>
                        <input type="text" />
                        <label>to:</label>
                        <input type="text" />
                      </div>
                    );
                  case "MOVE1":
                    return (
                      <div>
                        <label>Move:</label>
                        <input type="text" />
                        <label>to:</label>
                        <input type="text" />
                      </div>
                    );
                  case "MOVE2":
                    return (
                      <div>
                        <label>Move</label>
                        <input type="text" />
                        <label>of</label>
                        <input type="text" />
                        <label>to:</label>
                        <input type="text" />
                      </div>
                    );
                  case "IF":
                    return (
                      <div>
                        <label>If:</label>
                        <input type="text" />
                        <select>
                          <option value="=" />
                        </select>
                        <input type="text" />
                        <label>then:</label>
                        <ActionView
                          actions={element.ifThen}
                          setActions={(el) => setThen(el, element.id)}
                        />
                      </div>
                    );
                  case "WHEN1":
                    return (
                      <div>
                        <label>After</label>
                        <input type="text" />
                        <select>
                          <option>days</option>
                          <option>weeks</option>
                          <option>months</option>
                          <option>years</option>
                        </select>
                        <label>then:</label>
                        <ActionView
                          actions={element.ifThen}
                          setActions={(el) => setThen(el, element.id)}
                        />
                      </div>
                    );
                  case "WHEN2":
                    return (
                      <div>
                        <label>At</label>
                        <input type="date" />
                        <select>
                          <option>days</option>
                          <option>weeks</option>
                          <option>months</option>
                          <option>years</option>
                        </select>
                        <label>then:</label>
                        <ActionView
                          actions={element.ifThen}
                          setActions={(el) => setThen(el, element.id)}
                        />
                      </div>
                    );
                  default:
                    return <>Error</>;
                }
              })()}
            </li>
            <AddButton
              previous={element.id}
              setActions={props.setActions}
              actions={props.actions}
            />
          </div>
        );
      })}
    </div>
  );
}
function AddButton(props) {
  const [show, setShow] = useState(false);
  let menuRef = useRef();

  //Close menu on click
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShow(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  function DropdownItem(props) {
    function addAction(type) {
      setShow(false);
      if (props.previous != "") {
        let tmp = props.actions.slice();
        let index = tmp.findIndex((item) => item.id === props.previous);
        tmp.splice(index + 1, 0, new Action(type, uuid()));
        props.setActions(tmp);
      } else {
        console.log(props.previous);
        props.setActions([new Action(type, uuid())]);
      }
    }
    return (
      <li>
        <a onClick={() => addAction(props.type)}> {props.text} </a>
      </li>
    );
  }
  return (
    <li ref={menuRef}>
      <div
        className="menu-trigger"
        value="add"
        onClick={() => {
          setShow(!show);
        }}
      />
      <div className={`dropdown ${show ? "active" : "inactive"}`}>
        <DropdownItem text="Send x to y" type="SEND1" {...props} />
        <DropdownItem text="Send x (+-×÷) z to y" type="SEND2" {...props} />
        <DropdownItem text="Move x to y" type="MOVE1" {...props} />
        <DropdownItem text="Move a part of x to y" type="MOVE2" {...props} />
        <DropdownItem text="If something happen then..." type="IF" {...props} />
        <DropdownItem text="After x time then..." type="WHEN1" {...props} />
        <DropdownItem
          text="At a certain date then..."
          type="WHEN2"
          {...props}
        />
      </div>
    </li>
  );
}
export default Function;
