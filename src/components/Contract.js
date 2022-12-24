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
          ac[i].par1 +
          "*" +
          ac[i].par2 +
          " -o " +
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
        act += ") {\n";
        act +=
          printActions(ac[i].ifThen, 0, tab + tab) +
          (ac[i].elseThen.length > 0
            ? tab + "else {\n" + printActions(ac[i].elseThen, 0, tab + tab)
            : "");
        act += tab + "}";
        break;

      case "WHEN1":
        act +=
          "now + " +
          ac[i].par1 +
          " " +
          ac[i].par2 +
          " >> @" +
          ac[i].par2 +
          " {\n ";
        act +=
          printActions(ac[i].ifThen, 0, tab + tab) +
          (ac[i].elseThen.length > 0
            ? tab + "else {\n" + printActions(ac[i].elseThen, 0, tab + tab)
            : "");
        act += tab + "} ==> @" + ac[i].par3;
        break;
      case "WHEN2":
        act += ac[i].par1 + " >> @" + ac[i].par2 + " {\n ";
        act +=
          printActions(ac[i].ifThen, 0, tab + tab) +
          (ac[i].elseThen.length > 0
            ? tab + "else {\n" + printActions(ac[i].elseThen, 0, tab + tab)
            : "");
        act += tab + "} ==> @" + ac[i].par3;
        break;
    }
    return act + "\n" + printActions(ac, i + 1, tab);
  } else return "";
}
export function getCode(contract) {
  var tab = "  ";

  // AGREEMENT
  var assets = "assets " + contract.assets.join(", ");

  var fields = "fields " + contract.fields.join(", ");

  var agreement =
    "agreement (" +
    contract.agreement.parties.join(", ") +
    ", " +
    contract.agreement.dataSource +
    ", " +
    contract.agreement.authority +
    ") {\n" +
    tab;
  agreement +=
    contract.agreement.fieldsAuthority.length != 0
      ? contract.agreement.authority +
        ", " +
        contract.agreement.parties.join(", ") +
        contract.agreement.fieldsAuthority.join(", ") +
        "\n"
      : "";
  agreement +=
    contract.agreement.fieldsDS.length != 0
      ? contract.agreement.ds +
        ", " +
        contract.agreement.parties.join(", ") +
        contract.agreement.fieldsAuthority.join(", ") +
        "\n"
      : "";
  agreement +=
    contract.agreement.fieldsParties.length != 0
      ? +contract.agreement.ds +
        ", " +
        contract.agreement.parties.join(", ") +
        contract.agreement.fieldsAuthority.join(", ")
      : "";
  agreement += "\n} ==> @" + contract.agreement.state;

  //FUNCTIONS
  var fun = "";
  contract.functions.map((el) => {
    fun +=
      "\n\n@" +
      el.fromState +
      " " +
      el.caller +
      " : " +
      el.name +
      "(" +
      el.fields.join(", ") +
      ")" +
      "[" +
      el.assets.join(", ") +
      "]" +
      "\n(";
    el.conditions.map((cond) => {
      fun +=
        cond.par1 +
        cond.par2 +
        cond.par3 +
        (cond.par4 != "" ? " " + cond.par4 + " " : "");
    });
    fun += "){\n" + printActions(el.actions, 0, tab) + "\n}\n";
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
    "\n\n" +
    tab +
    agreement +
    fun;
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

export function Function() {
  this.name = "";
  this.fromState = "";
  this.toState = "";
  this.assets = [];
  this.fields = [];
  this.caller = "";
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
