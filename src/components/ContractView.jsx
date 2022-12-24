import React, { useState, useEffect } from "react";

import Assets from "./Assets";
import Fields from "./Fields";
import Name from "./Name";
import Agreement from "./Agreement";
import Function from "./Function";

import { Contract, Function as FunctionConstructor, getCode } from "./Contract";

function ContractView(props) {
  const [cont, setCont] = useState(new Contract());
  return (
    <div className="grid-container">
      <div className="grid-files">
        <input type="file" onChange={handleFileSelect}></input>
        <button onClick={saveState}>Save project</button>
      </div>
      <div className="grid-name">
        <Name
          name={cont.name}
          handleAdd={(newName) => setCont({ ...cont, name: newName })}
        />
      </div>
      <div className="grid-assets">
        <Assets handleAdd={(asset) => addAsset(asset)} value={cont.assets} />
      </div>
      <div className="grid-fields">
        <Fields handleAdd={(field) => addField(field)} value={cont.fields} />
      </div>
      <div className="grid-agreement">
        {" "}
        <Agreement
          agreement={cont.agreement}
          setAgreement={(element) => setAgreement(element)}
          fields={cont.fields}
        />
      </div>
      <div className="grid-code">
        <p className="code">{getCode(cont)}</p>
      </div>
      <div className="grid-graph">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta laborum
        sequi dolorum, hic sapiente deleniti ad corrupti nobis, enim aliquam
        magnam incidunt necessitatibus id, illo praesentium corporis optio
        numquam error.
      </div>
      <div className="grid-function">
        {cont.functions.map((element, index) => {
          return (
            <Function
              fun={element}
              actions={element.actions}
              fields={cont.fields}
              assets={cont.assets}
              parties={cont.agreement.parties}
              setFunction={(fun) => {
                setFunction(fun, index);
              }}
            />
          );
        })}
        <button onClick={addFunction}>New function</button>
      </div>
    </div>
  );
  function addFunction() {
    setCont({
      ...cont,
      functions: [...cont.functions, new FunctionConstructor()],
    });
  }
  function setFunction(element, index) {
    let tmp = [...cont.functions];
    tmp.splice(index, 1, element);
    setCont({ ...cont, functions: tmp });
    console.log(cont);
  }
  function setAgreement(element) {
    setCont({ ...cont, agreement: element });
  }
  function addAsset(element) {
    setCont({ ...cont, assets: [...cont.assets, element] });
  }
  function addField(element) {
    setCont({ ...cont, fields: [...cont.fields, element] });
  }
  function saveState() {
    const state = { cont };
    const stateJson = JSON.stringify(state);

    const a = document.createElement("a");
    a.href =
      "data:application/json;charset=utf-8," + encodeURIComponent(stateJson);
    a.download = "state.json";
    a.click();
  }
  function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const state = JSON.parse(event.target.result);
      setCont(state.cont);
    };

    reader.readAsText(file);
  }
}
export default ContractView;
