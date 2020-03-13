function genTableHead(table, tableHeads) {
  const thead = table.createTHead();
  const row = thead.insertRow();

  tableHeads.forEach(header => {
    const th = document.createElement("th");
    const text = document.createTextNode(header);
    th.appendChild(text);
    row.appendChild(th);
  });
}

function genTableBody(table, tableBody) {
  tableBody.forEach(member => {
    const row = table.insertRow();
    Object.keys(member).forEach(key => {
      let cell, text;
      switch (key) {
        case "lastName":
          cell = row.insertCell();
          text = document.createTextNode(isAcceptedName(member));
          cell.appendChild(text);
          break;
        case "email":
          cell = row.insertCell();
          text = document.createTextNode(member[key]);
          cell.appendChild(text);
          break;
        case "perms":
          cell = row.insertCell();
          text = document.createTextNode(member[key]);
          cell.appendChild(text);
        default:
          break;
      }
    });
  });
}

const isAcceptedName = (member) => {
  return member.accepted
    ? `${member["firstName"]} ${member["lastName"]}`
    : "Pending acceptance";
}

let membersTable = document.getElementById("members-table-main");
genTableHead(membersTable, tableHeaders);
genTableBody(membersTable, exampleTeamMembers);

export default subtract