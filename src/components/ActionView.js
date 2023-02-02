import React, { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { Contract, Action } from "./Contract";
export function ActionsList(props) {
  return (
    <div className="action-view">
      <AddButton
        previous=""
        setActions={props.setActions}
        actions={props.actions}
        when={props.actions.length <= 0}
      />
      {props.actions.map((element, i) => {
        return (
          <ActionView
            element={element}
            setActions={props.setActions}
            actions={props.actions}
            deleteAction={props.deleteAction}
            when={i >= props.actions.length - 1}
          />
        );
      })}
    </div>
  );
}
function AddButton(props) {
  //when = 1 if it has to show when types
  const [show, setShow] = useState(false);
  let menuRef = useRef();

  //Close menu on click
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShow(false);
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
      let tmp = props.actions.slice();
      let index = 0;
      index = tmp.findIndex((item) => item.id === props.previous);
      tmp.splice(index + 1, 0, new Action(type, uuid()));
      props.setActions(tmp);
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
        {!props.when ? (
          <></>
        ) : (
          <>
            <DropdownItem text="After x time then..." type="WHEN1" {...props} />
            <DropdownItem
              text="At a certain date then..."
              type="WHEN2"
              {...props}
            />
          </>
        )}
      </div>
    </li>
  );
}
function ActionView(props) {
  const [par, setPar] = useState({ par1: "", par2: "", par3: "", par4: "" });
  const [conditions, setConditions] = useState(props.element.conditions);
  useEffect(() => {
    console.log("State changed:", par);
    let tmp = props.actions.slice();
    let index = 0;
    index = tmp.findIndex((item) => item.id === props.element.id);
    tmp.splice(index, 1, {
      ...props.actions[index],
      par1: par.par1,
      par2: par.par2,
      par3: par.par3,
      par4: par.par4,
    });
    props.setActions(tmp);
  }, [par]);
  function setCondition(cond, i) {
    let tmp = conditions.slice();
    tmp[i] = cond;
    setConditions(tmp);
  }
  useEffect(() => {
    let tmp = props.actions.slice();
    let index = 0;
    index = tmp.findIndex((item) => item.id === props.element.id);
    tmp.splice(index, 1, {
      ...props.actions[index],
      conditions: conditions,
    });
    props.setActions(tmp);
  }, [conditions]);
  function setThen(element, elId) {
    let index = props.actions.findIndex((item) => item.id === elId);
    let tmp = props.actions.slice();
    tmp.splice(index, 1, { ...props.actions[index], ifThen: element });
    props.setActions(tmp);
  }
  function setElseThen(element, elId) {
    let index = props.actions.findIndex((item) => item.id === elId);
    let tmp = props.actions.slice();
    tmp.splice(index, 1, { ...props.actions[index], elseThen: element });
    props.setActions(tmp);
  }
  function deleteAction(elId) {
    const tmp = props.actions.filter((item) => item.id !== elId);
    props.setActions(tmp);
  }
  return (
    <div>
      <li className="action">
        {(() => {
          switch (props.element.type) {
            case "SEND1":
              return (
                <div>
                  <label>Send:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par1: e.target.value });
                    }}
                    value={props.element.par1}
                  />
                  <label>to:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par2: e.target.value });
                    }}
                    value={props.element.par2}
                  />
                </div>
              );
            case "SEND2":
              return (
                <div>
                  <label>Send:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par1: e.target.value });
                    }}
                    value={props.element.par1}
                  />
                  <select
                    onChange={(e) => {
                      setPar({ ...par, par2: e.target.value });
                    }}
                    value={props.element.par2}
                  >
                    <option value="none" selected disabled hidden>
                      Select...
                    </option>
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="×">×</option>
                    <option value="÷">÷</option>
                  </select>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par3: e.target.value });
                    }}
                    value={props.element.par3}
                  />
                  <label>to:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par4: e.target.value });
                    }}
                    value={props.element.par4}
                  />
                </div>
              );
            case "MOVE1":
              return (
                <div>
                  <label>Move:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par1: e.target.value });
                    }}
                    value={props.element.par1}
                  />
                  <label>to:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par2: e.target.value });
                    }}
                    value={props.element.par2}
                  />
                </div>
              );
            case "MOVE2":
              return (
                <div>
                  <label>Move</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par1: e.target.value });
                    }}
                    value={props.element.par1}
                  />
                  <label>of</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par2: e.target.value });
                    }}
                    value={props.element.par2}
                  />
                  <label>to:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par3: e.target.value });
                    }}
                    value={props.element.par3}
                  />
                </div>
              );
            case "IF":
              return (
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <label>If:</label>
                    <ul style={{ padding: 0 }}>
                      {props.element.conditions.map((cond, i) => {
                        return (
                          <li>
                            <input
                              type="text"
                              onChange={(e) => {
                                setCondition(
                                  { ...cond, par1: e.target.value },
                                  i
                                );
                              }}
                              value={cond.par1}
                            />
                            <select
                              onChange={(e) => {
                                setCondition(
                                  { ...cond, par2: e.target.value },
                                  i
                                );
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
                                setCondition(
                                  { ...cond, par3: e.target.value },
                                  i
                                );
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
                              <option value="" selected></option>
                              <option value="&&">and</option>
                              <option value="||">or</option>
                            </select>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <label>then:</label>
                  <ActionsList
                    actions={props.element.ifThen}
                    setActions={(el) => setThen(el, props.element.id)}
                  />
                  <label>else:</label>
                  <ActionsList
                    actions={props.element.elseThen}
                    setActions={(el) => setElseThen(el, props.element.id)}
                  />
                </div>
              );
            case "WHEN1":
              return (
                <div>
                  <hr />
                  <label>After</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par1: e.target.value });
                    }}
                    value={props.element.par1}
                  />
                  <select
                    onChange={(e) => {
                      setPar({ ...par, par2: e.target.value });
                    }}
                    value={props.element.par2}
                  >
                    <option value="none" selected disabled hidden>
                      Select...
                    </option>
                    <option value="d">days</option>
                    <option value="w">weeks</option>
                    <option value="m">months</option>
                    <option value="y">years</option>
                  </select>
                  <label>from state:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par3: e.target.value });
                    }}
                    value={props.element.par3}
                  />
                  <label>to state:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par4: e.target.value });
                    }}
                    value={props.element.par4}
                  />
                  <label>then:</label>
                  <ActionsList
                    actions={props.element.ifThen}
                    setActions={(el) => setThen(el, props.element.id)}
                  />
                </div>
              );
            case "WHEN2":
              return (
                <div>
                  <hr />
                  <label>At</label>
                  <input
                    type="date"
                    onChange={(e) => {
                      setPar({ ...par, par1: e.target.value });
                    }}
                    value={props.element.par1}
                  />
                  <label>from state:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par2: e.target.value });
                    }}
                    value={props.element.par2}
                  />
                  <label>to state:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPar({ ...par, par3: e.target.value });
                    }}
                    value={props.element.par3}
                  />
                  <label>then:</label>
                  <ActionsList
                    actions={props.element.ifThen}
                    setActions={(el) => setThen(el, props.element.id)}
                  />
                </div>
              );
            default:
              return <>Error</>;
          }
        })()}
        <button
          className="delete-act"
          onClick={() => deleteAction(props.element.id)}
        ></button>
      </li>
      <AddButton
        previous={props.element.id}
        setActions={props.setActions}
        actions={props.actions}
        when={props.when}
      />
    </div>
  );
}
export default ActionView;
