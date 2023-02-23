import React, { useState } from "react";
import { cleanStr } from "./Contract";
function Agreement(props) {
  const [inputParty, setInputParty] = useState("");
  const [inputFA, setInputFA] = useState("");
  const [inputFDS, setInputFDS] = useState("");
  const [inputFP, setInputFP] = useState("");

  function handleChangeState(value) {
    props.setAgreement({ ...props.agreement, state: value });
  }
  function handleChangeAuthority(value) {
    props.setAgreement({ ...props.agreement, authority: value });
  }
  function handleChangeDS(value) {
    props.setAgreement({ ...props.agreement, dataSource: value });
  }
  function handleAddParty(e) {
    if (!props.agreement.parties.includes(cleanStr(inputParty)))
      props.setAgreement({
        ...props.agreement,
        parties: [...props.agreement.parties, cleanStr(inputParty)],
      });

    e.preventDefault();
    setInputParty("");
  }
  function handleDeleteParty(element) {
    const updatedList = props.agreement.parties.filter(
      (item) => item !== element
    );
    props.setAgreement({ ...props.agreement, parties: updatedList });
  }
  function handleAddFieldAuth(element) {
    if (!props.agreement.fieldsAuthority.includes(element))
      props.setAgreement({
        ...props.agreement,
        fieldsAuthority: [...props.agreement.fieldsAuthority, element],
      });
    setInputFA("");
  }
  function handleDeleteFieldAuth(element) {
    const updatedList = props.agreement.fieldsAuthority.filter(
      (item) => item !== element
    );
    props.setAgreement({ ...props.agreement, fieldsAuthority: updatedList });
  }
  function handleAddFieldDS(element) {
    if (!props.agreement.fieldsDS.includes(element))
      props.setAgreement({
        ...props.agreement,
        fieldsDS: [...props.agreement.fieldsDS, element],
      });
    setInputFDS("");
  }
  function handleDeleteFieldDS(element) {
    const updatedList = props.agreement.fieldsDS.filter(
      (item) => item !== element
    );
    props.setAgreement({ ...props.agreement, fieldsDS: updatedList });
  }
  function handleAddFieldParties(element) {
    if (!props.agreement.fieldsParties.includes(element))
      props.setAgreement({
        ...props.agreement,
        fieldsParties: [...props.agreement.fieldsParties, element],
      });
    setInputFP("");
  }
  function handleDeleteFieldParties(element) {
    const updatedList = props.agreement.fieldsParties.filter(
      (item) => item !== element
    );
    props.setAgreement({ ...props.agreement, fieldsParties: updatedList });
  }
  return (
    <div className="grid-container-agreement">
      <div className="title">Agreement</div>
      <div className="grid-state">
        <label htmlFor="ag-state">State name after the agreement:</label>
        <input
          type="text"
          id="ag-state"
          value={props.agreement.state}
          onChange={(e) => {
            handleChangeState(e.target.value);
          }}
        />
      </div>
      <div className="grid-auth">
        <label htmlFor="authority">Authority name:</label>
        <input
          id="authority"
          type="text"
          value={props.agreement.authority}
          onChange={(e) => {
            handleChangeAuthority(cleanStr(e.target.value));
          }}
        />
      </div>
      <div className="grid-datasource">
        <label htmlFor="datasource">Data source name:</label>
        <input
          id="datasource"
          type="text"
          value={props.agreement.dataSource}
          onChange={(e) => {
            handleChangeDS(cleanStr(e.target.value));
          }}
        />
      </div>
      <div className="grid-parties list-box">
        <label htmlFor="parties">Parties of the contract</label>
        <ul id="parties">
          {props.agreement.parties.map((element) => {
            return (
              <li>
                <button
                  className="delete-list-el"
                  onClick={() => handleDeleteParty(element)}
                ></button>
                {element}
              </li>
            );
          })}
        </ul>
        <form onSubmit={handleAddParty}>
          <input
            type="text"
            value={inputParty}
            onChange={(e) => {
              setInputParty(cleanStr(e.target.value));
            }}
            required
          />
          <input type="submit" value=" " />
        </form>
      </div>
      <div className="grid-fields-auth list-box">
        <label htmlFor="fields-auth">Fields agreed with authority</label>
        <ul id="fields-auth">
          {props.agreement.fieldsAuthority.map((element) => {
            return (
              <li>
                <button
                  className="delete-list-el"
                  onClick={() => handleDeleteFieldAuth(element)}
                ></button>
                {element}
              </li>
            );
          })}
        </ul>
        <form>
          <select
            type="text"
            onChange={(e) => {
              handleAddFieldAuth(e.target.value);
            }}
            value={inputFA}
          >
            <option value="" selected disabled hidden>
              Select...
            </option>
            {props.fields.map((element) => {
              return <option value={element}>{element}</option>;
            })}
          </select>
        </form>
      </div>
      <div className="grid-fields-ds list-box">
        <label htmlFor="fields-ds">Fields agreed with data source</label>
        <ul id="fields-ds">
          {props.agreement.fieldsDS.map((element) => {
            return (
              <li>
                <button
                  className="delete-list-el"
                  onClick={() => handleDeleteFieldDS(element)}
                ></button>
                {element}
              </li>
            );
          })}
        </ul>
        <form>
          <select
            type="text"
            onChange={(e) => {
              handleAddFieldDS(e.target.value);
            }}
            value={inputFDS}
          >
            <option value="" selected disabled hidden>
              Select...
            </option>
            {props.fields.map((element) => {
              return <option value={element}>{element}</option>;
            })}
          </select>
        </form>
      </div>

      <div className="grid-fields-parties list-box">
        <label htmlFor="fields-parties">Fields agreed with parties</label>
        <ul id="fields-parties">
          {props.agreement.fieldsParties.map((element) => {
            return (
              <li>
                <button
                  className="delete-list-el"
                  onClick={() => handleDeleteFieldParties(element)}
                ></button>
                {element}
              </li>
            );
          })}
        </ul>
        <form>
          <select
            type="text"
            onChange={(e) => {
              handleAddFieldParties(e.target.value);
            }}
            value={inputFP}
          >
            <option value="" selected disabled hidden>
              Select...
            </option>
            {props.fields.map((element) => {
              return <option value={element}>{element}</option>;
            })}
          </select>
        </form>
      </div>
    </div>
  );
}
export default Agreement;
