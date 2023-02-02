import React, { useState, useEffect } from "react";

import Assets from "./Assets";
import Fields from "./Fields";
import Name from "./Name";
import Agreement from "./Agreement";
import Function from "./Function";
import { v4 as uuid } from "uuid";
import { Contract, Function as FunctionConstructor, getCode } from "./Contract";

function ContractView(props) {
  const [cont, setCont] = useState(new Contract());
  return (
    <div className="grid-container">
      <div className="grid-files">
        <div>
          Save the project to continue editing it later, beware: this is not the
          executable file.
        </div>
        <input
          type="file"
          className="file-input"
          onChange={handleFileSelect}
        ></input>
        <button onClick={saveState}>Save project</button>
      </div>
      <div className="grid-name">
        <Name
          name={cont.name}
          handleAdd={(newName) => setCont({ ...cont, name: newName })}
        />
      </div>
      <div className="grid-assets">
        <Assets
          handleAdd={(asset) => addAsset(asset)}
          value={cont.assets}
          deleteAsset={(asset) => deleteAsset(asset)}
        />
      </div>
      <div className="grid-fields">
        <Fields
          handleAdd={(field) => addField(field)}
          value={cont.fields}
          deleteField={(field) => deleteField(field)}
        />
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
        <button onClick={handleDownload}>Download executable</button>
      </div>
      <div className="grid-graph"></div>
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
              deleteFunction={() => deleteFunction(index)}
              deleteField={(name) => {
                const updatedList = cont.functions[index].fields.filter(
                  (item) => item !== name
                );
                setFunction(
                  { ...cont.functions[index], fields: updatedList },
                  index
                );
              }}
              deleteAsset={(name) => {
                const updatedList = cont.functions[index].assets.filter(
                  (item) => item !== name
                );
                setFunction(
                  { ...cont.functions[index], assets: updatedList },
                  index
                );
              }}
              deleteFromState={(name) => {
                const updatedList = cont.functions[index].fromState.filter(
                  (item) => item !== name
                );
                setFunction(
                  { ...cont.functions[index], fromState: updatedList },
                  index
                );
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
      functions: [...cont.functions, new FunctionConstructor(uuid())],
    });
  }
  function setFunction(element, index) {
    let tmp = [...cont.functions];
    tmp.splice(index, 1, element);
    setCont({ ...cont, functions: tmp });
    console.log(cont);
  }
  function deleteFunction(index) {
    const updatedList = cont.functions.splice();
    updatedList.splice(index, 1);
    setCont({ ...cont, functions: updatedList });
  }
  function setAgreement(element) {
    setCont({ ...cont, agreement: element });
  }
  function addAsset(element) {
    setCont({ ...cont, assets: [...cont.assets, element] });
  }
  function deleteAsset(element) {
    const updatedList = cont.assets.filter((item) => item !== element);
    setCont({ ...cont, assets: updatedList });
  }
  function addField(element) {
    setCont({ ...cont, fields: [...cont.fields, element] });
  }
  function deleteField(element) {
    const updatedList = cont.fields.filter((item) => item !== element);
    setCont({ ...cont, fields: updatedList });
  }
  function saveState() {
    const state = { cont };
    const stateJson = JSON.stringify(state);

    const a = document.createElement("a");
    a.href =
      "data:application/json;charset=utf-8," + encodeURIComponent(stateJson);
    a.download = cont.name + ".json";
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
  function handleDownload() {
    const a = document.createElement("a");
    a.href = "data:charset=utf-8," + encodeURIComponent(getCode(cont));

    a.download = cont.name.trim().length
      ? cont.name + ".stipula"
      : "noname.stipula";
    a.click();
  }
}
export default ContractView;
