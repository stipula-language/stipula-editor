import { empty } from "uuidv4";

export class Contract {
  constructor() {
    this.name = "";
    this.assets = [];
    this.fields = [];
    this.agreement = new Agreement();
    this.functions = [];
  }
}
function printActions(ac, i, tab) {
  let act = tab;
  if (i < ac.length) {
    switch (ac[i].type) {
      case "SEND1":
        act += ac[i].par1 + " -> " + ac[i].par2;
        break;
      case "SEND2":
        act += ac[i].par1 + ac[i].par2 + ac[i].par3 + " -> " + ac[i].par4;
        break;
      case "MOVE1":
        act += ac[i].par1 + " -o " + ac[i].par2;
        break;
      case "MOVE2":
        act +=
          "(" +
          ac[i].par1 +
          "*" +
          ac[i].par2 +
          ") -o " +
          ac[i].par2 +
          ", " +
          ac[i].par3;
        break;
      case "IF":
        act += "if (";
        ac[i].conditions.map((cond) => {
          act +=
            cond.par1 +
            cond.par2 +
            cond.par3 +
            (cond.par4 != "" ? " " + cond.par4 + " " : "");
        });
        act += ") {";
        act +=
          printActions(ac[i].ifThen, 0, tab + tab).slice(0, -3) +
          "\n" +
          tab +
          "_\n" +
          (ac[i].elseThen.length > 0
            ? tab +
              "else {" +
              printActions(ac[i].elseThen, 0, tab + tab).slice(0, -3)
            : "");
        act += "\n" + tab + "}";
        break;

      case "WHEN1":
        act += "now + " + ac[i].par1 + " >> @" + ac[i].par2 + " {";
        act += printActions(ac[i].ifThen, 0, tab + tab).slice(0, -3) + "\n";
        act += tab + "} ==> @" + ac[i].par3;
        break;
      case "WHEN2":
        act += ac[i].par1 + " >> @" + ac[i].par2 + " {";
        act +=
          printActions(ac[i].ifThen, 0, tab + tab) +
          (ac[i].elseThen.length > 0
            ? tab + "else {\n" + printActions(ac[i].elseThen, 0, tab + tab)
            : "");
        act += tab + "} ==> @" + ac[i].par3;
        break;
    }
    if (i == ac.length - 1 && ac[i].type != "WHEN1" && ac[i].type != "WHEN2") {
      act = "\n" + act;
      act += ";\n_";
    } else if (i == ac.length - 1) {
      act = ";\n" + act;
    } else {
      act = "\n" + act;
    }
    return act + printActions(ac, i + 1, tab);
  } else return "";
}
export function getCode(contract) {
  var tab = "  ";

  // AGREEMENT
  var assets = "asset " + contract.assets.join(", ");

  var fields = "field " + contract.fields.join(", ");

  var agreement = "agreement (" + contract.agreement.parties.join(", ");
  agreement +=
    contract.agreement.dataSource != ""
      ? ", " + contract.agreement.dataSource
      : "";
  agreement +=
    contract.agreement.authority != ""
      ? ", " + contract.agreement.authority
      : "";
  agreement +=
    ")(" +
    [
      ...new Set([
        ...contract.agreement.fieldsAuthority,
        ...contract.agreement.fieldsDS,
        ...contract.agreement.fieldsParties,
      ]),
    ].join(", ") +
    ") {\n" +
    tab;
  agreement +=
    contract.agreement.fieldsAuthority.length != 0 &&
    contract.agreement.authority != ""
      ? contract.agreement.authority +
        ", " +
        contract.agreement.parties.join(", ") +
        ": " +
        contract.agreement.fieldsAuthority.join(", ") +
        "\n"
      : "";
  agreement +=
    contract.agreement.fieldsDS.length != 0 &&
    contract.agreement.dataSource != ""
      ? contract.agreement.dataSource +
        ", " +
        contract.agreement.parties.join(", ") +
        ": " +
        contract.agreement.fieldsDS.join(", ") +
        "\n"
      : "";
  agreement +=
    contract.agreement.fieldsParties.length != 0
      ? contract.agreement.parties.join(", ") +
        ": " +
        contract.agreement.fieldsParties.join(", ")
      : "";
  agreement += "\n} ==> @" + contract.agreement.state;

  //FUNCTIONS
  var fun = "";
  contract.functions.map((el) => {
    fun +=
      "\n\n@" +
      el.fromState.join("@") +
      " " +
      el.caller +
      " : " +
      el.name +
      "(" +
      el.fields.join(", ") +
      ")" +
      "[" +
      el.assets.join(", ") +
      "]";

    if (el.conditions.length > 1 || el.conditions[0].par1 != "") {
      fun += "(";
      el.conditions.map((cond) => {
        fun +=
          cond.par1 +
          cond.par2 +
          cond.par3 +
          (cond.par4 != "" ? " " + cond.par4 + " " : "");
      });
      fun += ")";
    }
    fun += "{" + printActions(el.actions, 0, tab) + "\n} ==> @" + el.toState;
  });

  var code =
    "stipula " +
    contract.name +
    " {\n" +
    tab +
    assets +
    "\n" +
    tab +
    fields +
    "\n" +
    tab +
    "init " +
    contract.agreement.state +
    "\n\n" +
    tab +
    agreement +
    fun +
    "\n}";
  return code;
}
function Agreement() {
  this.state = "";
  this.authority = "";
  this.dataSource = "";
  this.parties = [];
  this.fieldsAuthority = [];
  this.fieldsDS = [];
  this.fieldsParties = [];
}

export function Function(id) {
  this.name = "";
  this.fromState = [];
  this.id = id;
  this.toState = "";
  this.assets = [];
  this.fields = [];
  this.caller = [];
  this.conditions = [{ par1: "", par2: "", par3: "", par4: "" }];
  this.actions = [];
}

export function Action(type, id) {
  // type: SEND1 - SEND2 - MOVE1 - MOVE2 - IF - WHEN - WHEN2
  this.type = type;
  this.id = id;
  this.par1 = "";
  this.par2 = "";
  this.par3 = "";
  this.par4 = "";
  this.conditions = [{ par1: "", par2: "", par3: "", par4: "" }];
  this.ifThen = [];
  this.elseThen = [];
}
export function cleanStr(str) {
  return str.replace(/[^a-zA-Z0-9_]/g, "");
}
