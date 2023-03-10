import React, { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import ActionView, { ActionsList } from "./ActionView";
import { cleanStr } from "./Contract";

function Function(props) {
  const [hide, setHide] = useState(false);
  const [inputField, setInputField] = useState("");
  const [inputAsset, setInputAsset] = useState("");
  const [conditions, setConditions] = useState(props.fun.conditions);
  const [caller, setCaller] = useState("");
  const [fromState, setFromState] = useState("");
  function handleChangeActions(element) {
    props.setFunction({ ...props.fun, actions: element });
    console.log(props.fun);
  }
  function handleChangeName(element) {
    props.setFunction({ ...props.fun, name: element });
  }
  function addFromState(e) {
    if (!props.fun.fromState.includes(fromState))
      props.setFunction({
        ...props.fun,
        fromState: [...props.fun.fromState, fromState],
      });
    setFromState("");
    e.preventDefault();
  }
  function handleChangeToState(element) {
    props.setFunction({ ...props.fun, toState: element });
  }
  function addCaller(element) {
    if (!props.fun.caller.includes(element)) {
      if (element == "~") {
        props.setFunction({
          ...props.fun,
          caller: [element],
        });
      } else
        props.setFunction({
          ...props.fun,
          caller: [...props.fun.caller.filter((item) => item !== "~"), element],
        });
    }
    setCaller("");
  }
  function handleAddCaller(e) {
    if (!props.fun.caller.includes(caller))
      props.setFunction({
        ...props.fun,
        caller: [...props.fun.caller, caller],
      });
    setCaller("");
    e.preventDefault();
  }
  function handleAddField(e) {
    if (!props.fun.fields.includes(inputField))
      props.setFunction({
        ...props.fun,
        fields: [...props.fun.fields, inputField],
      });
    setInputField("");
    e.preventDefault();
  }
  function handleAddAsset(e) {
    if (!props.fun.fromState.includes(inputAsset))
      props.setFunction({
        ...props.fun,
        assets: [...props.fun.assets, inputAsset],
      });
    setInputAsset("");
    e.preventDefault();
  }
  function setCondition(cond, i) {
    let tmp = conditions.slice();
    tmp[i] = cond;
    setConditions(tmp);
  }
  useEffect(() => {
    console.log(conditions);
    props.setFunction({ ...props.fun, conditions: conditions });
  }, [conditions]);
  return (
    <div className="grid-container-function">
      <div className="title">
        <button
          className="delete-f"
          onClick={() => props.deleteFunction()}
        ></button>
        Function: {props.fun.name}
        <button onClick={() => setHide(!hide)}>
          {hide ? "expand" : "collapse"}
        </button>
      </div>
      {!hide ? (
        <>
          <div className="grid-f-name">
            <label htmlFor="function-name">Name:</label>
            <input
              id="function-name"
              type="text"
              value={props.fun.name}
              onChange={(e) => {
                handleChangeName(cleanStr(e.target.value));
              }}
            />
          </div>
          <div>
            <label>Higher-order function</label>
            <input
              type="checkbox"
              onChange={(e) => {
                props.setFunction({ ...props.fun, isHO: e.target.checked });
              }}
              checked={props.fun.isHO}
            ></input>
          </div>
          {props.fun.isHO ? (
            <div>
              <label>Choose your input code</label>
              <select
                onChange={(e) => {
                  props.setFunction({ ...props.fun, HOinput: e.target.value });
                }}
                defaultValue=""
                value={props.fun.HOinput}
              >
                <option></option>
                {props.HOinputs.map((v, i) => {
                  return <option>input_code_{i + 1}</option>;
                })}
              </select>
            </div>
          ) : (
            ""
          )}
          <div className="grid-from-state list-box">
            <label htmlFor="function-from-state">From state:</label>
            <ul>
              {props.fun.fromState.map((element) => {
                return (
                  <li>
                    <button
                      className="delete-list-el"
                      onClick={() => props.deleteFromState(element)}
                    ></button>
                    {element}
                  </li>
                );
              })}
            </ul>
            <form onSubmit={addFromState}>
              <input
                id="function-from-state"
                type="text"
                value={fromState}
                onChange={(e) => {
                  setFromState(cleanStr(e.target.value));
                }}
                pattern="^[a-zA-Z][a-zA-Z0-9]{0,19}$"
                required
              />
              <input type="submit" value=" "></input>
            </form>
          </div>
          <div className="grid-f-fields list-box">
            <label>Formal parameters</label>
            <ul>
              {props.fun.fields.map((element) => {
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
            <form onSubmit={handleAddField}>
              <input
                type="text"
                value={inputField}
                onChange={(e) => {
                  setInputField(cleanStr(e.target.value));
                }}
              />
              <input type="submit" value=" " />
            </form>
          </div>

          <div className="grid-f-assets list-box">
            <label>Assets parameters</label>
            <ul>
              {props.fun.assets.map((element) => {
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
            <form onSubmit={handleAddAsset}>
              <input
                type="text"
                value={inputAsset}
                onChange={(e) => {
                  setInputAsset(cleanStr(e.target.value));
                }}
              />
              <input type="submit" value=" " />
            </form>
          </div>
          <div className="grid-f-party list-box">
            <label>Who can call it?</label>
            <ul>
              {props.fun.caller.map((element) => {
                return (
                  <li>
                    <button
                      className="delete-list-el"
                      onClick={() => props.deleteParty(element)}
                    ></button>
                    {element}
                  </li>
                );
              })}
            </ul>

            {props.isHO !== 1 ? (
              <>
                <form>
                  <select
                    onChange={(e) => {
                      addCaller(e.target.value);
                    }}
                    value={caller}
                  >
                    <option value="" selected disabled hidden>
                      Select...
                    </option>
                    <option value="~">All the parties</option>
                    {props.parties.map((element) => {
                      return <option value={element}>{element}</option>;
                    })}
                  </select>
                </form>
              </>
            ) : (
              <>
                <form onSubmit={handleAddCaller}>
                  <input
                    type="text"
                    value={caller}
                    onChange={(e) => {
                      setCaller(cleanStr(e.target.value));
                    }}
                  />
                  <input type="submit" value=" " />
                </form>
              </>
            )}
          </div>

          {!props.fun.isHO ? (
            <>
              <div className="grid-to-state">
                <label htmlFor="function-to-state">To state:</label>
                <input
                  id="function-to-state"
                  type="text"
                  value={props.fun.toState}
                  onChange={(e) => {
                    handleChangeToState(cleanStr(e.target.value));
                  }}
                />
              </div>

              <div className="grid-f-conditions">
                <ul>
                  <label>Necessary conditions for executing actions:</label>
                  {props.fun.conditions.map((cond, i) => {
                    return (
                      <li>
                        <input
                          type="text"
                          onChange={(e) => {
                            setCondition({ ...cond, par1: e.target.value }, i);
                          }}
                          value={cond.par1}
                        />
                        <select
                          onChange={(e) => {
                            setCondition({ ...cond, par2: e.target.value }, i);
                          }}
                          value={cond.par2}
                        >
                          <option value="" selected>
                            Select...
                          </option>
                          <option value="==">equal</option>
                          <option value="<">smaller</option>
                          <option value="<=">smaller or equal</option>
                          <option value=">=">greater or equal</option>
                          <option value=">">greater</option>
                          <option value="!=">different</option>
                        </select>
                        <input
                          type="text"
                          onChange={(e) => {
                            setCondition({ ...cond, par3: e.target.value }, i);
                          }}
                          value={cond.par3}
                        />
                        <select
                          onChange={(e) => {
                            console.log(conditions);
                            if (e.target.value == "") {
                              console.log(1);
                              let tmp = conditions.slice(0, i);
                              tmp[i] = { ...cond, par4: e.target.value };
                              setConditions(tmp);
                            } else if (conditions.length <= i + 1) {
                              console.log(i, conditions.length);
                              let tmp = conditions.slice();
                              tmp[i] = { ...cond, par4: e.target.value };
                              tmp = tmp.concat({
                                par1: "",
                                par2: "",
                                par3: "",
                                par4: "",
                              });
                              setConditions(tmp);
                            } else
                              setCondition(
                                { ...cond, par4: e.target.value },
                                i
                              );
                          }}
                          value={cond.par4}
                        >
                          <option value="" selected>
                            Add condition...
                          </option>
                          <option value="&&">and</option>
                          <option value="||">or</option>
                        </select>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="grid-f-actions">
                <ul>
                  <ActionsList
                    actions={props.fun.actions}
                    setActions={handleChangeActions}
                    father={1}
                  />
                </ul>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="f-recap">
          <ul>
            <li>Callers: {props.fun.caller.join(", ")}</li>
            <li>From states: {props.fun.fromState.join(", ")}</li>
            <li>To state: {props.fun.toState}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Function;
