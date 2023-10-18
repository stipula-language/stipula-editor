import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import Assets from "./Assets";
import Fields from "./Fields";
import Name from "./Name";
import Agreement from "./Agreement";
import Function from "./Function";
import { v4 as uuid } from "uuid";
import {
  Contract,
  Function as FunctionConstructor,
  getCode,
  getCodeHOinput,
} from "./Contract";
import { cleanStr } from "./Contract";
import Parties from "./Parties";
import HOinputs from "./HOinputs";

function ContractView(props) {
  const [cont, setCont] = useState(new Contract());
  const [currentTab, setCurrentTab] = useState("contract");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode(cont));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  function TabSwitcher() {
    return (
      <div className={"tabswitcher"}>
        <button
          className={currentTab === "contract" ? "selected" : ""}
          onClick={() => setCurrentTab("contract")}
        >
          Edit Contract
        </button>
        <button
          className={currentTab === "highorder" ? "selected" : ""}
          onClick={() => setCurrentTab("highorder")}
        >
          Edit Higher-order function input
        </button>
      </div>
    );
  }
  return (
    <div className="grid-container">
      <div className="grid-files">
        <div>
          Save the project to continue editing it later or if you are done,
          download the code to execute it directly!
        </div>
        <div className="files">
          <p htmlFor="fileInput">Upload your project: </p>
          <input
            type="file"
            id="fileInput"
            className="file-input"
            onChange={handleFileSelect}
          ></input>

          <button onClick={saveState}>Save project</button>
          <button onClick={handleDownload}>Save code and project</button>
        </div>
      </div>
      <TabSwitcher />
      {currentTab === "contract" ? (
        <>
          <div className="grid-name">
            <Name
              name={cont.name}
              handleAdd={(newName) =>
                setCont({ ...cont, name: cleanStr(newName) })
              }
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
              handleInit={(field, value) => addFieldInit(field, value)}
              value={cont.fields}
              valueInit={cont.fieldInit}
              deleteField={(field) => deleteField(field)}
            />
          </div>
          <div className="grid-parties">
            <Parties
              handleAdd={(party) => addParty(party)}
              value={cont.parties}
              deleteParty={(party) => deleteParty(party)}
            />
          </div>
          <div className="grid-agreement">
            {" "}
            <Agreement
              agreements={cont.agreements}
              setAgreements={(element) =>
                setCont({ ...cont, agreements: element })
              }
              parties={cont.parties}
              fields={cont.fields}
              state={cont.firstState}
              setState={(element) => setCont({ ...cont, firstState: element })}
            />
          </div>
          <div className="grid-code">
            <p className="code">{getCode(cont)}</p>
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
          <div className="grid-function">
            {cont.functions.map((element, index) => {
              return (
                <Function
                  fun={element}
                  actions={element.actions}
                  fields={cont.fields}
                  assets={cont.assets}
                  HOinputs={cont.HOinputs}
                  parties={cont.parties.filter((str) => str.trim() !== "")}
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
                  deleteParty={(name) => {
                    const updatedList = cont.functions[index].caller.filter(
                      (item) => item !== name
                    );
                    setFunction(
                      { ...cont.functions[index], caller: updatedList },
                      index
                    );
                  }}
                />
              );
            })}
            <button onClick={addFunction}>New function</button>
          </div>
        </>
      ) : (
        <HOinputs
          parties={cont.parties}
          HOinputs={cont.HOinputs}
          setHOinputs={(inputs) => {
            setCont({ ...cont, HOinputs: inputs });
          }}
        />
      )}
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
    const updatedList = cont.functions.slice();
    updatedList.splice(index, 1);

    setCont({ ...cont, functions: updatedList });
  }
  function addAsset(element) {
    if (!cont.assets.includes((element = cleanStr(element))))
      setCont({ ...cont, assets: [...cont.assets, element] });
  }
  function deleteAsset(element) {
    const updatedList = cont.assets.filter((item) => item !== element);
    setCont({ ...cont, assets: updatedList });
  }
  function addField(element) {
    if (!cont.fields.includes((element = cleanStr(element))))
      setCont({ ...cont, fields: [...cont.fields, element] });
  }
  function addFieldInit(element, value) {
    if(value !== '') {
      cont.fieldInit[element] = value;
      setCont({
        ...cont
      });
    }
  }
  function deleteField(element) {
    const updatedList = cont.fields.filter((item) => item !== element);
    setCont({ ...cont, fields: updatedList });
  }
  function addParty(element) {
    if (!cont.parties.includes((element = cleanStr(element))))
      setCont({ ...cont, parties: [...cont.parties, element] });
  }
  function deleteParty(element) {
    const updatedList = cont.parties.filter((item) => item !== element);
    setCont({ ...cont, parties: updatedList });
  }
  function saveState() {
    const state = { cont };
    const stateJson = JSON.stringify(state);

    const a = document.createElement("a");
    a.href =
      "data:application/json;charset=utf-8," + encodeURIComponent(stateJson);
    a.download = cont.name + "-project" + ".json";
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
    const zip = new JSZip();
    zip.file(
      cont.name.trim().length ? cont.name + ".stipula" : "noname.stipula",
      getCode(cont)
    );
    cont.HOinputs.map((el, i) => {
      zip.file("input_code_" + (i + 1) + ".stipula", getCodeHOinput(el));
    });
    const state = { cont };
    const stateJson = JSON.stringify(state);
    zip.file(
      cont.name.trim().length
        ? cont.name + "-project.json"
        : "noname-project.json",
      stateJson
    );
    zip.generateAsync({ type: "blob" }).then(function (content) {
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = cont.name.trim().length
        ? cont.name + ".zip"
        : "noname.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    // const a = document.createElement("a");
    // a.href = "data:charset=utf-8," + encodeURIComponent(getCode(cont));

    // a.download = cont.name.trim().length
    //   ? cont.name + ".stipula"
    //   : "noname.stipula";
    // a.click();
  }
}
export default ContractView;
