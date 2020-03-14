let teamMembersState = [...exampleTeamMembers];

function genTableHead(table: HTMLTableElement, tableHeaders: Array<string>) {
  const thead = table.createTHead() as HTMLTableSectionElement;
  const row = thead.insertRow() as HTMLTableRowElement;
  row.setAttribute("class", "table-header-row");

  tableHeaders.forEach(header => {
    const th = document.createElement("th") as HTMLTableHeaderCellElement;
    const text = document.createTextNode(header);
    th.appendChild(text);
    row.appendChild(th);
  });
}

function genTableBody(table: HTMLTableElement, teamMembers: Array<Member>) {
  const tBody = table.createTBody() as HTMLTableSectionElement;
  tBody.setAttribute("id", "members-table");

  teamMembers.forEach((member: Member, index) => {
    const row = tBody.insertRow() as HTMLTableRowElement;
    genTableRow(row, member, index);
  });
}

function genTableRow(row: HTMLTableRowElement, member: Member, index: number) {
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
        addDeleteButton(cell, index);
      default:
        break;
    }
  });
}

function addProfilePic(member: Member, cell: HTMLTableCellElement) {
  const profilePic = document.createElement("img");
  profilePic.setAttribute("src", `./img/${isAcceptedProfilePic(member)}`);
  profilePic.setAttribute("align", "middle");
  profilePic.setAttribute("class", "profile-pic");
  cell.insertBefore(profilePic, cell.childNodes[0]);
}

function addDeleteButton(cell: HTMLTableCellElement, index: number) {
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

function deleteMember(index: number) {
  const row: HTMLTableRowElement = document.getElementById(`memberRow${index}`) as HTMLTableRowElement;
  Array.from(row.children).forEach((cell) => {
    cell.setAttribute("style", "opacity: 0");
  });
  setTimeout(() => {
    teamMembersState.splice(index, 1);
    const tableBody = row.parentNode as HTMLTableSectionElement
    tableBody.removeChild(row);
    generateNewBody();
  }, 600);
}

function changeActiveMembers() {
  const activeMembersCount = document.getElementById("active-members") as HTMLElement
  activeMembersCount.innerHTML = countActiveMembers();
}

function changeTotalMembers() {
  const totalMembersCount = document.getElementById("active-members") as HTMLElement
  console.log(teamMembersState.length)
  totalMembersCount.innerHTML = `${teamMembersState.length}`;
}

function countActiveMembers() {
  let activeMembers = 0;
  teamMembersState.forEach((member: Member) => {
    member.accepted ? activeMembers++ : null;
  });
  return `${activeMembers}`;
}

function addRandomMember() {
  teamMembersState.push(generateRandomMember());
  generateNewBody();
}

function generateNewBody() {
  var table = document.getElementById("members-table-main") as HTMLTableElement;
  table.removeChild(table.childNodes[2]);
  genTableBody(membersTable, teamMembersState);
  changeActiveMembers();
  changeTotalMembers();
}

let membersTable = document.getElementById("members-table-main") as HTMLTableElement;

genTableHead(membersTable, tableHeaders);
genTableBody(membersTable, teamMembersState);
changeActiveMembers();
changeTotalMembers();
