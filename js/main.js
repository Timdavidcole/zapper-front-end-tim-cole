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

let membersTable = document.getElementById("members-table-main");
genTableHead(membersTable, tableHeaders);
