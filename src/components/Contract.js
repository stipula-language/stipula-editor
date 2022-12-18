export class Contract {
  constructor() {
    this.name = "";
    this.assets = [];
    this.fields = [];
    this.agreement = new Agreement();
    this.functions = [];
  }
}
export function getCode(contract) {
  var tab = "  ";

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
    agreement;
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
  this.ifThen = [];
  this.elseThen = [];
}
