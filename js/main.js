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
  tableBody.forEach((member, index) => {
    const row = tBody.insertRow();
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
          addDeleteButton(cell)
        default:
          break;
      }
    });
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

function addDeleteButton(cell) {
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete-button");
  const deleteButtonIcon = document.createElement("i");
  deleteButtonIcon.setAttribute(
    "style",
    `background-image: url('./img/bin.png')`
  );
  deleteButtonIcon.setAttribute("class", "delete-button-icon");
  deleteButton.appendChild(deleteButtonIcon)
  cell.appendChild(deleteButton);
}

let membersTable = document.getElementById("members-table-main");
genTableHead(membersTable, tableHeaders);
genTableBody(membersTable, exampleTeamMembers);
