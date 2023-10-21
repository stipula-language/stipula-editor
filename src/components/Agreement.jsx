import React, { useState } from "react";
import { cleanStr } from "./Contract";
function Agreement(props) {
  const [empty, setEmpty] = useState("");

  function handleChangeExpiration(key, value) {
    props.expiration[key] = value;
    props.setExpiration(props.expiration);
  }
  function handleChangeState(value) {
    props.setState(value);
  }
  function handleAddFieldAgr(element, i) {
    if (!props.agreements[i].fields.includes(element)) {
      let tmp = props.agreements.slice();
      tmp[i].fields = [...tmp[i].fields, element];
      props.setAgreements(tmp);
    }
  }
  function handleDeleteFieldAgr(element, i) {
    const tmp = props.agreements.slice();
    tmp[i].fields = props.agreements[i].fields.filter(
      (item) => item !== element
    );
    props.setAgreements(tmp);
  }
  function handleAddPartyAgr(element, i) {
    if (!props.agreements[i].parties.includes(element)) {
      const tmp = props.agreements.slice();
      tmp[i].parties = [...tmp[i].parties, element];
      props.setAgreements(tmp);
    }
  }
  function handleDeletePartyAgr(element, i) {
    const tmp = props.agreements.slice();
    tmp[i].parties = props.agreements[i].parties.filter(
      (item) => item !== element
    );
    props.setAgreements(tmp);
  }
  return (
    <div className="grid-container-agreement">
      <div className="title">Agreement</div>
      <div className="container-agreements">
        {props.agreements.map((ag, i) => {
          return (
            <div className="agreement-row">
              <div className="list-box">
                <label htmlFor="fields-agreeds">Fields to be agreed</label>
                <ul id="fields-agreeds">
                  {ag.fields.map((element) => {
                    return (
                      <li>
                        <button
                          className="delete-list-el"
                          onClick={() => handleDeleteFieldAgr(element, i)}
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
                      handleAddFieldAgr(e.target.value, i);
                    }}
                    value={empty}
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
              <label>agreed with</label>
              <div className="list-box">
                <label htmlFor="parties-agreeds">Parties that agree</label>
                <ul id="parties-agreeds">
                  {ag.parties.map((element) => {
                    return (
                      <li>
                        <button
                          className="delete-list-el"
                          onClick={() => handleDeletePartyAgr(element, i)}
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
                      handleAddPartyAgr(e.target.value, i);
                    }}
                    value={empty}
                  >
                    <option value="" selected disabled hidden>
                      Select...
                    </option>
                    {props.parties.map((element) => {
                      return <option value={element}>{element}</option>;
                    })}
                  </select>
                </form>
              </div>
              <button
                className="remove-button"
                onClick={() => {
                  let tmp = props.agreements.slice();
                  tmp.splice(i, 1);
                  props.setAgreements(tmp);
                }}
              ></button>
            </div>
          );
        })}
        <button
          className="add-button"
          onClick={() =>
            props.setAgreements([
              ...props.agreements,
              { fields: [], parties: [] },
            ])
          }
        ></button>
      </div>
      <div>Expiration</div>
      <div style={{display: 'flex'}}>
        <span style={{margin: 'auto'}}>
          <label>When</label>
          <input type="text" value={props.expiration.expireTime} onChange={
            (e) => {handleChangeExpiration('expireTime', e.target.value);
          }} />
        </span>
        <span style={{margin: 'auto'}}>
          <label>From state</label>
          <input type="text" value={props.expiration.sourceState} onChange={
            (e) => {handleChangeExpiration('sourceState', e.target.value);
          }} />
        </span>
        <span style={{margin: 'auto'}}>
          <label>To state</label>
          <input type="text" value={props.expiration.destinationState} onChange={(e) => {
            handleChangeExpiration('destinationState', e.target.value);
          }} />
        </span>
      </div>
      <div className="grid-state">
        <label htmlFor="ag-state">State name after the agreement:</label>
        <input
          type="text"
          id="ag-state"
          value={props.firstState}
          onChange={(e) => {
            handleChangeState(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
export default Agreement;
