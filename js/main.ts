// @ts-ignore

import MemberRow from "./components/memberRow.js"

let teamMembersState = [...exampleTeamMembers];

function genTableHead(table: HTMLTableElement, tableHeaders: Array<string>) {
  const thead = table.createTHead() as HTMLTableSectionElement;
  const row = thead.insertRow() as HTMLTableRowElement;
  row.className = "table-header-row";

  tableHeaders.forEach((header, index) => {
    let widthStyle: Array<string> = ['25%', '25%', '50%']
    const th = document.createElement("th") as HTMLTableHeaderCellElement;
    const text = document.createTextNode(header);
    th.appendChild(text);
    th.setAttribute("style", `width: ${widthStyle[index]}`);
    row.appendChild(th);
  });
}

function genTableBody(table: HTMLTableElement, teamMembers: Array<Member>) {
  const tBody = table.createTBody() as HTMLTableSectionElement;
  tBody.id = "members-table";
  teamMembers.forEach((member: Member, index) => {
    const memberRow = new MemberRow()
    memberRow.test = "test"
    tBody.appendChild(memberRow);
    // const row = tBody.insertRow() as HTMLTableRowElement;
    // genTableRow(row, member, index);
  });
}

function genMemberRow(member: Member) {
  const memberRow = document.createElement("member-row") as any
  memberRow.filter = 'test'
  memberRow.filter = 'test2'
  return memberRow
}

// function genTableRow(row: HTMLTableRowElement, member: Member, index: number) {
//   row.className = 'member-row';
//   row.id = `memberRow${index}`;
//   Object.keys(member).forEach(key => {
//     let cell, text;
//     switch (key) {
//       case "lastName":
//         cell = row.insertCell();
//         text = document.createTextNode(isAcceptedName(member));
//         cell.appendChild(text);
//         cell.id = `memberName${index}`;
//         cell.className = "member-name-cell";
//         addProfilePic(member, cell);
//         break;
//       case "email":
//         cell = row.insertCell();
//         text = document.createTextNode(member[key]);
//         cell.appendChild(text);
//         cell.id = `memberEmail${index}`;
//         cell.className = "member-email-cell";
//         break;
//       case "perms":
//         cell = row.insertCell();
//         text = document.createTextNode(member[key]);
//         cell.appendChild(text);
//         cell.id = `memberPerms${index}`;
//         cell.className = "member-perms-cell";
//         addDeleteButton(cell, index);
//       default:
//         break;
//     }
//   });
// }

function addProfilePic(member: Member, cell: HTMLTableCellElement) {
  const profilePic = document.createElement("img");
  profilePic.src = `./img/${isAcceptedProfilePic(member)}`;
  profilePic.align = "middle";
  profilePic.className = "profile-pic";
  cell.insertBefore(profilePic, cell.childNodes[0]);
}

function addDeleteButton(cell: HTMLTableCellElement, index: number) {
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.onclick = () => deleteMember(index);
  const deleteButtonIcon = document.createElement("i");
  deleteButtonIcon.style.backgroundImage = "url('./img/bin.png')"
  deleteButtonIcon.className = "delete-button-icon";
  deleteButton.appendChild(deleteButtonIcon);
  cell.appendChild(deleteButton);
}

function deleteMember(index: number) {
  const row: HTMLTableRowElement = document.getElementById(`memberRow${index}`) as HTMLTableRowElement;
  Array.from(row.children).forEach((cell) => {
    cell.setAttribute("style", "opacity: 0; background-color: white! important");
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
  const totalMembersCount = document.getElementById("total-members") as HTMLElement
  totalMembersCount.innerHTML = `${teamMembersState.length}`;
}

function countActiveMembers() {
  let activeMembers: number = 0;
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
