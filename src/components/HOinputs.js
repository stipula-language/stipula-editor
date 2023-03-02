import React, { useState } from "react";
import Fields from "./Fields";
import Assets from "./Assets";
import Parties from "./Parties";
import Function from "./Function";
import {
  cleanStr,
  Function as FunctionConstructor,
  getCodeHOinput,
  HOinput,
} from "./Contract";
import { v4 as uuid } from "uuid";
import { ActionsList } from "./ActionView";
function HOinputs(props) {
  return (
    <div className="hoinputs-container">
      Add and edit your inputs for higher-order functions:
      {props.HOinputs.map((el, i) => {
        return (
          <div className="hoinput">
            <HOinputView
              HOinput={el}
              setHOinput={(input) => {
                const updatedList = props.HOinputs.slice();
                updatedList.splice(i, 1, input);
                props.setHOinputs(updatedList);
              }}
              i={i + 1}
              parties={props.parties}
              deleteInput={() => {
                const updatedList = props.HOinputs.slice();
                updatedList.splice(i, 1);
                props.setHOinputs(updatedList);
              }}
            />
          </div>
        );
      })}
      <button
        onClick={() => {
          props.setHOinputs([...props.HOinputs, new HOinput()]);
          console.log(props.HOinputs);
        }}
      >
        New input code
      </button>
    </div>
  );
}
function HOinputView(props) {
  const [hide, setHide] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeHOinput(props.HOinput));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  function setFunction(element, index) {
    const updatedList = props.HOinput.functions.slice();
    updatedList.splice(index, 1, element);
    props.setHOinput({ ...props.HOinput, functions: updatedList });
  }
  function deleteFunction(index) {
    const updatedList = props.HOinput.functions.slice();
    updatedList.splice(index, 1);
    props.setHOinput({ ...props.HOinput, functions: updatedList });
  }
  function addAsset(element) {
    if (!props.HOinput.assets.includes((element = cleanStr(element))))
      props.setHOinput({
        ...props.HOinput,
        assets: [...props.HOinput.assets, element],
      });
  }
  function deleteAsset(element) {
    const updatedList = props.HOinput.assets.filter((item) => item !== element);
    props.setHOinput({ ...props.HOinput, assets: updatedList });
  }
  function addField(element) {
    if (!props.HOinput.fields.includes((element = cleanStr(element))))
      props.setHOinput({
        ...props.HOinput,
        fields: [...props.HOinput.fields, element],
      });
  }
  function deleteField(element) {
    const updatedList = props.HOinput.fields.filter((item) => item !== element);
    props.setHOinput({ ...props.HOinput, fields: updatedList });
  }
  function addParty(element) {
    if (!props.HOinput.parties.includes((element = cleanStr(element))))
      props.setHOinput({
        ...props.HOinput,
        parties: [...props.HOinput.parties, element],
      });
  }
  function deleteParty(element) {
    const updatedList = props.HOinput.parties.filter(
      (item) => item !== element
    );
    props.setHOinput({ ...props.HOinput, parties: updatedList });
  }
  function addFunction() {
    props.setHOinput({
      ...props.HOinput,
      functions: [...props.HOinput.functions, new FunctionConstructor(uuid())],
    });
  }
  function handleChangeActions(element) {
    props.setHOinput({ ...props.HOinput, actions: element });
  }
  return (
    <>
      <div className="title">
        <button
          className="delete-f"
          onClick={() => props.deleteInput()}
        ></button>
        Input Code {props.i}
        <button onClick={() => setHide(!hide)}>
          {hide ? "expand" : "collapse"}
        </button>
      </div>

      {!hide ? (
        <div className="ho-grid">
          <p className="ho-description">
            Add whatever you want to add to the contract
          </p>
          <div className="ho-assets">
            <Assets
              handleAdd={(asset) => addAsset(asset)}
              value={props.HOinput.assets}
              deleteAsset={(asset) => deleteAsset(asset)}
            />
          </div>
          <div className="ho-fields">
            <Fields
              handleAdd={(field) => addField(field)}
              value={props.HOinput.fields}
              deleteField={(field) => deleteField(field)}
            />
          </div>
          <div className="ho-parties">
            <Parties
              handleAdd={(party) => addParty(party)}
              value={props.HOinput.parties}
              deleteParty={(party) => deleteParty(party)}
            />
          </div>
          <div>
            <div className="ho-code code">{getCodeHOinput(props.HOinput)}</div>

            <button onClick={handleCopy}>Copy to clipboard</button>
            {copied && (
              <div
                style={{
                  width: "fit-content",
                  backgroundColor: "white",
                  position: "absolute",
                }}
              >
                Copied to clipboard!
              </div>
            )}
          </div>
          <div className="ho-actions">
            <p style={{ marginTop: "10px", marginBottom: "-10px" }}>
              Actions that will be executed immediately:
            </p>
            <ul>
              <ActionsList
                actions={props.HOinput.actions}
                setActions={handleChangeActions}
                father={1}
              />
            </ul>
          </div>
          <div className="ho-tostate">
            <label>Move to state</label>
            <input
              type="text"
              value={props.HOinput.toState}
              onChange={(e) =>
                props.setHOinput({
                  ...props.HOinput,
                  toState: cleanStr(e.target.value),
                })
              }
            ></input>
          </div>
          <div className="ho-function">
            {props.HOinput.functions.map((element, index) => {
              return (
                <Function
                  fun={element}
                  actions={element.actions}
                  isHO={1}
                  setFunction={(fun) => {
                    setFunction(fun, index);
                  }}
                  deleteFunction={() => deleteFunction(index)}
                  deleteField={(name) => {
                    const updatedList = props.HOinput.functions[
                      index
                    ].fields.filter((item) => item !== name);
                    setFunction(
                      {
                        ...props.HOinput.functions[index],
                        fields: updatedList,
                      },
                      index
                    );
                  }}
                  deleteAsset={(name) => {
                    const updatedList = props.HOinput.functions[
                      index
                    ].assets.filter((item) => item !== name);
                    setFunction(
                      {
                        ...props.HOinput.functions[index],
                        assets: updatedList,
                      },
                      index
                    );
                  }}
                  deleteFromState={(name) => {
                    const updatedList = props.HOinput.functions[
                      index
                    ].fromState.filter((item) => item !== name);
                    setFunction(
                      {
                        ...props.HOinput.functions[index],
                        fromState: updatedList,
                      },
                      index
                    );
                  }}
                  deleteParty={(name) => {
                    const updatedList = props.HOinput.functions[
                      index
                    ].caller.filter((item) => item !== name);
                    setFunction(
                      {
                        ...props.HOinput.functions[index],
                        caller: updatedList,
                      },
                      index
                    );
                  }}
                />
              );
            })}
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <button onClick={addFunction}>New Function</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default HOinputs;
