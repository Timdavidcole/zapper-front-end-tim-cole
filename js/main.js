let teamMembersState = [...exampleTeamMembers];

function genTableHead(table, tableHeads) {
  const thead = table.createTHead();
  const row = thead.insertRow();
  row.setAttribute("class", "table-header-row");

  tableHeads.forEach(header => {
    const th = document.createElement("th");
    const text = document.createTextNode(header);
    th.appendChild(text);
    row.appendChild(th);
  });
}

function genTableBody(table, tableBody) {
  const tBody = table.createTBody();
  tBody.setAttribute("id", "members-table");

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
        cell.setAttribute("class", "member-name-cell");
        addProfilePic(member, cell);
        break;
      case "email":
        cell = row.insertCell();
        text = document.createTextNode(member[key]);
        cell.appendChild(text);
        cell.setAttribute("id", `memberEmail${index}`);
        cell.setAttribute("class", "member-email-cell");
        break;
      case "perms":
        cell = row.insertCell();
        text = document.createTextNode(member[key]);
        cell.appendChild(text);
        cell.setAttribute("id", `memberPerms${index}`);
        cell.setAttribute("class", `member-perms-cell`);
        addDeleteButton(cell, row, index);
      default:
        break;
    }
  });
}

function addProfilePic(member, cell) {
  const profilePic = document.createElement("img");
  profilePic.setAttribute("src", `./img/${isAcceptedProfilePic(member)}`);
  profilePic.setAttribute("align", "middle");
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
  const row = document.getElementById(`memberRow${index}`);
  row.childNodes.forEach(node => {
    node.setAttribute("style", "opacity: 0");
  });
  setTimeout(() => {
    teamMembersState.splice(index, 1);
    row.parentNode.removeChild(row);
    generateNewBody();
  }, 600);
}

function changeActiveMembers() {
  document.getElementById("active-members").innerHTML = countActiveMembers();
}

function changeTotalMembers() {
  document.getElementById("total-members").innerHTML = teamMembersState.length;
}

function countActiveMembers() {
  let activeMembers = 0;
  teamMembersState.forEach(member => {
    member.accepted ? activeMembers++ : null;
  });
  return activeMembers;
}

function addRandomMember() {
  const membersTable = document.getElementById("members-table");
  const row = membersTable.insertRow();
  teamMembersState.push(generateRandomMember());
  generateNewBody();
}

function generateNewBody() {
  var table = document.getElementById("members-table-main");
  table.removeChild(table.childNodes[2]);
  genTableBody(membersTable, teamMembersState);
  changeActiveMembers();
  changeTotalMembers();
}

let membersTable = document.getElementById("members-table-main");

genTableHead(membersTable, tableHeaders);
genTableBody(membersTable, teamMembersState);
changeActiveMembers();
changeTotalMembers();
