import React, { useState } from "react";

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
    props.setAgreement({
      ...props.agreement,
      parties: [...props.agreement.parties, inputParty],
    });

    e.preventDefault();
  }
  function handleAddFieldAuth(e) {
    props.setAgreement({
      ...props.agreement,
      fieldsAuthority: [...props.agreement.fieldsAuthority, inputFA],
    });

    e.preventDefault();
  }
  function handleAddFieldDS(e) {
    props.setAgreement({
      ...props.agreement,
      fieldsDS: [...props.agreement.fieldsDS, inputFDS],
    });

    e.preventDefault();
  }
  function handleAddFieldParties(e) {
    props.setAgreement({
      ...props.agreement,
      fieldsParties: [...props.agreement.fieldsParties, inputFP],
    });

    e.preventDefault();
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
            handleChangeAuthority(e.target.value);
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
            handleChangeDS(e.target.value);
          }}
        />
      </div>
      <div className="grid-parties list-box">
        <label htmlFor="parties">Parties of the contract</label>
        <ul id="parties">
          {props.agreement.parties.map((element) => {
            return <li>{element}</li>;
          })}
        </ul>
        <form onSubmit={handleAddParty}>
          <input
            type="text"
            value={inputParty}
            onChange={(e) => {
              setInputParty(e.target.value);
            }}
          />
          <input type="submit" value=" " />
        </form>
      </div>
      <div className="grid-fields-auth list-box">
        <label htmlFor="fields-auth">Fields agreed with authority</label>
        <ul id="fields-auth">
          {props.agreement.fieldsAuthority.map((element) => {
            return <li>{element}</li>;
          })}
        </ul>
        <form onSubmit={handleAddFieldAuth}>
          <select
            type="text"
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
      <div className="grid-fields-ds list-box">
        <label htmlFor="fields-ds">Fields agreed with data source</label>
        <ul id="fields-ds">
          {props.agreement.fieldsDS.map((element) => {
            return <li>{element}</li>;
          })}
        </ul>
        <form onSubmit={handleAddFieldDS}>
          <select
            type="text"
            onChange={(e) => {
              setInputFDS(e.target.value);
            }}
          >
            {props.fields.map((element) => {
              return <option value={element}>{element}</option>;
            })}
          </select>
          <input type="submit" value=" " />
        </form>
      </div>

      <div className="grid-fields-parties list-box">
        <label htmlFor="fields-parties">Fields agreed with parties</label>
        <ul id="fields-parties">
          {props.agreement.fieldsParties.map((element) => {
            return <li>{element}</li>;
          })}
        </ul>
        <form onSubmit={handleAddFieldParties}>
          <select
            type="text"
            onChange={(e) => {
              setInputFP(e.target.value);
            }}
          >
            {props.fields.map((element) => {
              return <option value={element}>{element}</option>;
            })}
          </select>
          <input type="submit" value=" " />
        </form>
      </div>
    </div>
  );
}
export default Agreement;
