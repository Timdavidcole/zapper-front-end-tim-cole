let teamMembers = [...exampleTeamMembers];

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
  const tBody = table.createTBody();
  tBody.setAttribute("id", `membersTable`);

  tableBody.forEach((member, index) => {
    const row = tBody.insertRow();
    genTableRow(row, member, index);
  });
}

function genTableRow(row, member, index) {
  row.setAttribute("class", `member-row`);
  row.setAttribute("id", `memberRow${index}`);
  Object.keys(member).forEach(key => {
    let cell, text;
    switch (key) {
      case "lastName":
        cell = row.insertCell();
        text = document.createTextNode(isAcceptedName(member));
        cell.appendChild(text);
        cell.setAttribute("id", `memberName${index}`);
        addProfilePic(member, cell);
        break;
      case "email":
        cell = row.insertCell();
        text = document.createTextNode(member[key]);
        cell.appendChild(text);
        cell.setAttribute("id", `memberEmail${index}`);
        break;
      case "perms":
        cell = row.insertCell();
        text = document.createTextNode(member[key]);
        cell.appendChild(text);
        cell.setAttribute("id", `memberPerms${index}`);
        addDeleteButton(cell, row, index);
      default:
        break;
    }
  });
}

function addProfilePic(member, cell) {
  const profilePic = document.createElement("i");
  profilePic.setAttribute(
    "style",
    `background-image: url('./img/${isAcceptedProfilePic(member)}')`
  );
  profilePic.setAttribute("class", "profile-pic");
  cell.insertBefore(profilePic, cell.childNodes[0]);
}

function addDeleteButton(cell, row, index) {
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete-button");
  deleteButton.setAttribute("onclick", `deleteMember(${index})`);
  const deleteButtonIcon = document.createElement("i");
  deleteButtonIcon.setAttribute(
    "style",
    `background-image: url('./img/bin.png')`
  );
  deleteButtonIcon.setAttribute("class", "delete-button-icon");
  deleteButton.appendChild(deleteButtonIcon);
  cell.appendChild(deleteButton);
}

function deleteMember(index) {
  teamMembers.splice(index, 1);
  const row = document.getElementById(`memberRow${index}`)
  row.parentNode.removeChild(row);
}

let membersTable = document.getElementById("members-table-main");
genTableHead(membersTable, tableHeaders);
genTableBody(membersTable, teamMembers);
