"use strict";
let teamMembersState = [...exampleTeamMembers];
function genTableHead(table, tableHeaders) {
    const thead = table.createTHead();
    const row = thead.insertRow();
    row.className = "table-header-row";
    tableHeaders.forEach((header, index) => {
        let widthStyle = ['25%', '25%', '50%'];
        const th = document.createElement("th");
        const text = document.createTextNode(header);
        th.appendChild(text);
        th.setAttribute("style", `width: ${widthStyle[index]}`);
        row.appendChild(th);
    });
}
function genTableBody(table, teamMembers) {
    const tBody = table.createTBody();
    tBody.id = "members-table";
    teamMembers.forEach((member, index) => {
        const row = tBody.insertRow();
        genTableRow(row, member, index);
    });
}
function genTableRow(row, member, index) {
    row.className = `member-row`;
    row.id = `memberRow${index}`;
    Object.keys(member).forEach(key => {
        let cell, text;
        switch (key) {
            case "lastName":
                cell = row.insertCell();
                text = document.createTextNode(isAcceptedName(member));
                cell.appendChild(text);
                cell.id = `memberName${index}`;
                cell.className = "member-name-cell";
                addProfilePic(member, cell);
                break;
            case "email":
                cell = row.insertCell();
                text = document.createTextNode(member[key]);
                cell.appendChild(text);
                cell.id = `memberEmail${index}`;
                cell.className = "member-email-cell";
                break;
            case "perms":
                cell = row.insertCell();
                text = document.createTextNode(member[key]);
                cell.appendChild(text);
                cell.id = `memberPerms${index}`;
                cell.className = "member-perms-cell";
                addDeleteButton(cell, index);
            default:
                break;
        }
    });
}
function addProfilePic(member, cell) {
    const profilePic = document.createElement("img");
    profilePic.src = `./img/${isAcceptedProfilePic(member)}`;
    profilePic.align = "middle";
    profilePic.className = "profile-pic";
    cell.insertBefore(profilePic, cell.childNodes[0]);
}
function addDeleteButton(cell, index) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.onclick = () => deleteMember(index);
    const deleteButtonIcon = document.createElement("i");
    deleteButtonIcon.style.backgroundImage = "url('./img/bin.png')";
    deleteButtonIcon.className = "delete-button-icon";
    deleteButton.appendChild(deleteButtonIcon);
    cell.appendChild(deleteButton);
}
function deleteMember(index) {
    const row = document.getElementById(`memberRow${index}`);
    Array.from(row.children).forEach((cell) => {
        cell.setAttribute("style", "opacity: 0; background-color: white! important");
    });
    setTimeout(() => {
        teamMembersState.splice(index, 1);
        const tableBody = row.parentNode;
        tableBody.removeChild(row);
        generateNewBody();
    }, 600);
}
function changeActiveMembers() {
    const activeMembersCount = document.getElementById("active-members");
    activeMembersCount.innerHTML = countActiveMembers();
}
function changeTotalMembers() {
    const totalMembersCount = document.getElementById("total-members");
    totalMembersCount.innerHTML = `${teamMembersState.length}`;
}
function countActiveMembers() {
    let activeMembers = 0;
    teamMembersState.forEach((member) => {
        member.accepted ? activeMembers++ : null;
    });
    return `${activeMembers}`;
}
function addRandomMember() {
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
