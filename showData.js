function ascending() {
  dataOfTable.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}
function descending() {
  dataOfTable.sort((a, b) => {
    return b.name.localeCompare(a.name);
  });
}
function search() {
  const rege = new RegExp(`${searchInputElement.value.trim()}`, "i");
  const filterdData = dataOfTable.filter((value) => {
    const findValue =
      value.name.match(rege) ||
      value.email.match(rege) ||
      value.gender.match(rege) ||
      value.hobby.join(" , ").match(rege) ||
      value.country.name.match(rege) ||
      value.state.name.match(rege) ||
      value.city.name.match(rege);
    if (findValue) {
      return true;
    }
    return false;
  });
  return filterdData;
}
function showDataInTable() {
  tableBodyElement.innerHTML = `<tr class="center">There is no data avilable</tr>`;
  if (formatTableElement.value == "Ascending") {
    ascending();
  } else if (formatTableElement.value == "Descending") {
    descending();
  }
  const filterdData = search();
  tableBodyElement.innerHTML = "";
  filterdData.forEach((val) => {
    tableBodyElement.innerHTML =
      tableBodyElement.innerHTML +
      `<tr>
            <td>${val.name}</td>
            <td>${val.email}</td>
            <td>${val.gender}</td>
            <td>${val.hobby.join(" , ")}</td>
            <td> ${val.country.name}</td>
            <td>${val.state.name}</td>
            <td>${val.city.name}</td>
            <td><button onclick="deleteElement(${
              val._id
            })" class="table-delete">Delete</button>
              <a onclick="editFunc(event,${
                val._id
              })" href="#form-container"><button class="table-remove">Edit</button></a></td>
          </tr>`;
  });
}
