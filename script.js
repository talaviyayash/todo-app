const dataOfTable = [
  {
    name: "sdefs",
    email: "das",
    gender: "male",
    hobby: "reading",
    country: "india",
    state: "gujrati",
    city: "surat",
  },
  {
    name: "sdesafs",
    email: "das",
    gender: "male",
    hobby: "reading",
    country: "india",
    state: "gujrati",
    city: "surat",
  },
];

const countryName = [
  {
    india: [{ asa: ["dascsd", "dscs"] }, { maharastra: ["dascsd", "dscs"] }],
  },
  {
    afaric: [
      { gujrati: ["dascsd", "dscs"] },
      { maharastra: ["dasdsfvdsfdscsd", "dscs"] },
    ],
  },
  {
    asdas: [{ sdcqwsd: ["dascascdscsd", "dscs"] }, { sdcsd: ["sdc", "sdcsd"] }],
  },
];

const country = [
  {
    name: "India",
    states: [
      {
        id: "01",
        name: "gujrat",
        city: [{ name: "surat", id: "01" }],
      },
    ],
  },
];

let cuntryCurrentIndex = 0;
// const state = [];
const tableBodyElement = document.getElementById("table-body-container");
const stateOptionElement = document.getElementById("state");
const countrySelectElement = document.getElementById("country");
const citySelectElement = document.getElementById("city");
const nameInputElement = document.getElementById("name");
const emailInputElement = document.getElementById("email");
showDataInTable(dataOfTable);

function showDataInTable(data) {
  tableBodyElement.innerHTML = "";
  dataOfTable.forEach((val, index) => {
    tableBodyElement.innerHTML =
      tableBodyElement.innerHTML +
      `<tr>
            <td>${val.name}</td>
            <td>${val.email}</td>
            <td>${val.gender}</td>
            <td>${val.hobby}</td>
            <td> ${val.country}</td>
            <td>${val.state}</td>
            <td>${val.city}</td>
            <td><button onclick="deleteElement(${index})" class="table-delete">Delete</button></td>
            <td><a href="#form-container"><button class="table-remove">Edit</button></a></td>
          </tr>`;
  });
}
countrySelectElement.innerHTML = "";
countryName.forEach((val) => {
  val = Object.keys(val)[0];
  countrySelectElement.innerHTML =
    countrySelectElement.innerHTML +
    `
<option value="${val}">${val}</option>;
  `;
});
function loadState(e) {
  citySelectElement.innerHTML = "";
  stateOptionElement.innerHTML = "";
  countryName.forEach((val, index) => {
    const key = Object.keys(val)[0];
    if (e.target.value == key) {
      cuntryCurrentIndex = index;
      val[key].forEach((value) => {
        const keyOfState = Object.keys(value)[0];
        stateOptionElement.innerHTML =
          stateOptionElement.innerHTML +
          `<option value="${keyOfState}">${keyOfState}</option>`;
      });
    }
  });
}

function loadCountry(e) {
  citySelectElement.innerHTML = "";
  Object.values(countryName[cuntryCurrentIndex])[0].forEach((val) => {
    if (val[e.target.value]) {
      val[e.target.value].forEach((value) => {
        citySelectElement.innerHTML =
          citySelectElement.innerHTML +
          `<option value="${value}">${value}</option>`;
      });
    }
  });
}

function submitForm() {
  const selectedHobbyValue = document.querySelector(
    'input[name="hobby"]:checked'
  );
  const selectedGenderValue = document.querySelectorAll(
    'input[name="gender"]:checked'
  );
  const newObj = {
    hobby: selectedHobbyValue.value,
    gender: selectedGenderValue.value,
    name: nameInputElement.value,
    email: emailInputElement.value,
    state: stateOptionElement.value,
    city: citySelectElement.value,
    country: countrySelectElement.value,
  };
  selectedHobbyValue.checked = false;
  selectedGenderValue.checked = false;
  nameInputElement.value = "";
  emailInputElement.value = "";
  stateOptionElement.value = "";
  citySelectElement.value = "";
  countrySelectElement.value = "";
  dataOfTable.push(newObj);
  dataOfTable.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  showDataInTable(dataOfTable);
}

function deleteElement(elementToBeDeleted) {
  dataOfTable.splice(elementToBeDeleted, 1);
  showDataInTable(dataOfTable);
}
