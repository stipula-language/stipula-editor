import React, { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import ActionView, { ActionsList } from "./ActionView";

function Function(props) {
  const [inputField, setInputField] = useState("");
  const [inputAsset, setInputAsset] = useState("");
  const [conditions, setConditions] = useState(props.fun.conditions);
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
  function handleAddField(e) {
    console.log(inputField);
    props.setFunction({
      ...props.fun,
      fields: [...props.fun.fields, inputField],
    });
    setInputField("");
    e.preventDefault();
  }
  function handleAddAsset(e) {
    console.log(inputAsset);
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
          <option value="none" selected disabled hidden>
            Select...
          </option>
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
          <input
            type="text"
            value={inputField}
            onChange={(e) => {
              setInputField(e.target.value);
            }}
          />
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
          <input
            type="text"
            value={inputAsset}
            onChange={(e) => {
              setInputAsset(e.target.value);
            }}
          />
          <input type="submit" value=" " />
        </form>
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
                  <option value="" selected disabled hidden>
                    Select...
                  </option>
                  <option value="=">equal</option>
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
                    } else setCondition({ ...cond, par4: e.target.value }, i);
                  }}
                  value={cond.par4}
                >
                  <option value="" selected></option>
                  <option value="&">and</option>
                  <option value="|">or</option>
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
          />
        </ul>
      </div>
    </div>
  );
}

export default Function;
