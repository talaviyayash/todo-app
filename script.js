let idToEdit;
let indexOfCountry;
let indexOfState;
let submitOrEdit;
const tableBodyElement = document.getElementById("table-body-container");
const stateSelectElement = document.getElementById("state");
const countrySelectElement = document.getElementById("country");
const citySelectElement = document.getElementById("city");
const nameInputElement = document.getElementById("name");
const emailInputElement = document.getElementById("email");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const genderError = document.getElementById("genderError");
const hobbyError = document.getElementById("hobbyError");
const countryError = document.getElementById("countryError");
const stateError = document.getElementById("stateError");
const cityError = document.getElementById("cityError");
const searchInputElement = document.getElementById("search-input");
const formElement = document.getElementById("data-enter-form");
const submitBtnElement = document.getElementById("submit");
const formatTableElement = document.getElementById("format");
const noDataElement = document.getElementById("no-data");
const MODES = {
  SUBMIT: "SUBMIT",
  EDIT: "EDIT",
};
const ALL_ERROR_IN_ARRAY = [
  nameError,
  emailError,
  genderError,
  hobbyError,
  countryError,
  stateError,
  cityError,
];
const dataForTable = getToLocalStorage("dataOfTable");
if (!dataForTable || dataForTable.length == 0) {
  storeToLocalStorage("dataOfTable", dataOfTable);
}
formElement.addEventListener("submit", submitForm);
defaultToShow();
showDataInTable();
function optionMaker(value, innerText, selected) {
  return `<option value="${value}" ${
    selected ? "selected" : ""
  }>${innerText}</option>`;
}

function defaultToShow() {
  submitOrEdit = MODES.SUBMIT;
  submitBtnElement.innerHTML = "Submit";
  idToEdit = undefined;
  countrySelectElement.innerHTML = optionMaker("", "Select country", true);
  country.forEach((val) => {
    countrySelectElement.innerHTML =
      countrySelectElement.innerHTML + optionMaker(val._id, val.name, false);
  });
  citySelectElement.innerHTML = optionMaker("", "Select city", true);
  stateSelectElement.innerHTML = optionMaker("", "Select state", true);
}

function hobbyCheakeArray() {
  var checkedBoxes = document.querySelectorAll("input[name=hobby]:checked");
  const allValue = [];
  checkedBoxes.forEach((value) => {
    allValue.push(value.value);
  });
  return allValue;
}

function resetPage() {
  clearAllError();
  formElement.reset();
  defaultToShow();
  showDataInTable();
}

function deleteElement(elementToBeDeleted) {
  if (confirm("Are you sure you want to delete data?")) {
    const dataFromLocalStorage = getToLocalStorage("dataOfTable");
    const updatedArr = dataFromLocalStorage.filter((value) => {
      return !(value._id == elementToBeDeleted);
    });
    storeToLocalStorage("dataOfTable", updatedArr);
    showDataInTable();
  }
}
function submitForm(e) {
  e.preventDefault();
  const isAllFieldValidate = allFieldValidate();
  if (isAllFieldValidate) {
    const nameValue = nameInputElement.value.trim();
    const emailValue = emailInputElement.value.trim();
    const selectedGenderValue = document.querySelector(
      'input[name="gender"]:checked'
    )?.value;
    const hobbyValue = hobbyCheakeArray();
    const countryValue = countrySelectElement.value;
    const stateValue = stateSelectElement.value;
    const cityValue = citySelectElement.value;
    const countryValueFromId = country.find((value) => {
      return value._id == countryValue ? true : false;
    });
    const stateValueFromId = countryValueFromId.states.find((value) => {
      return value._id == stateValue ? true : false;
    });
    const cityValueFromId = stateValueFromId.city.find((value) => {
      return value._id == cityValue ? true : false;
    });
    const dataFromLocalStorage = getToLocalStorage("dataOfTable");
    const newObj = {
      hobby: hobbyValue,
      gender: selectedGenderValue,
      name: nameValue,
      email: emailValue,
      state: {
        _id: stateValueFromId._id,
        name: stateValueFromId.name,
      },
      city: {
        _id: cityValueFromId._id,
        name: cityValueFromId.name,
      },
      country: {
        _id: countryValueFromId._id,
        name: countryValueFromId.name,
      },
    };
    const updatedArr =
      submitOrEdit == MODES.EDIT
        ? dataFromLocalStorage.map((item) => {
            return item._id == idToEdit ? { _id: item._id, ...newObj } : item;
          })
        : [...dataFromLocalStorage, { _id: Date.now(), ...newObj }];
    storeToLocalStorage("dataOfTable", updatedArr);
    resetPage();
  }
}
function loadEditDataInTable(idWhereToUpdate) {
  clearAllError();
  idToEdit = idWhereToUpdate;
  submitBtnElement.innerHTML = "Update the data";
  const dataFromLocalStorage = getToLocalStorage("dataOfTable");
  const findValue = dataFromLocalStorage.find((value) => value._id == idToEdit);
  nameInputElement.value = findValue.name;
  emailInputElement.value = findValue.email;
  countrySelectElement.innerHTML;
  citySelectElement.innerHTML = optionMaker("", "Select city", false);
  stateSelectElement.innerHTML = optionMaker("", "Select state", false);
  countrySelectElement.innerHTML = optionMaker("", "Select country", false);
  let countryIndex;
  let stateIndex;
  country.forEach((value, index) => {
    const isValueFound = value._id == findValue.country._id;
    countryIndex = isValueFound ? index : countryIndex;
    countrySelectElement.innerHTML =
      countrySelectElement.innerHTML +
      optionMaker(value._id, value.name, isValueFound);
  });
  country[countryIndex].states.forEach((value, index) => {
    const isValueFound = value._id == findValue.state._id;
    stateIndex = isValueFound ? index : stateIndex;
    stateSelectElement.innerHTML =
      stateSelectElement.innerHTML +
      optionMaker(value._id, value.name, isValueFound);
  });
  country[countryIndex].states[stateIndex].city.forEach((value) => {
    const isValueFound = value._id == findValue.city._id;
    citySelectElement.innerHTML =
      citySelectElement.innerHTML +
      optionMaker(value._id, value.name, isValueFound);
  });
  document.querySelectorAll('input[name="gender"]').forEach((element) => {
    element.checked = element.value == findValue.gender ? true : false;
  });
  document.querySelectorAll('input[name="hobby"]').forEach((element) => {
    element.checked = false;
  });
  document.querySelectorAll('input[name="hobby"]').forEach((element) => {
    element.checked = findValue.hobby.includes(element.value) ? true : false;
  });
  submitOrEdit = MODES.EDIT;
  showDataInTable();
}

function getToLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function storeToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function allFieldValidate() {
  const forName = validName();
  const forEmail = validEmail();
  const forGender = validGender();
  const forHobby = validHobby();
  const forCountry = validCountry();
  const forState = validState();
  const forCity = validCity();
  const allValidate =
    forName &&
    forEmail &&
    forGender &&
    forHobby &&
    forCountry &&
    forState &&
    forCity;
  return allValidate;
}

function validName() {
  const nameValue = nameInputElement.value.trim();
  if (nameValue.length < 4 || !(nameValue.search(regexForName) == 0)) {
    nameError.innerHTML = "Please enter the valid name. ";
    return false;
  } else {
    nameError.innerHTML = "";
    return true;
  }
}

function validEmail() {
  const emailValue = emailInputElement.value.trim();
  if (emailValue.length < 6 || !(emailValue.search(regexForEmail) == 0)) {
    emailError.innerHTML = "Please enter the valid email.";
    return false;
  } else {
    emailError.innerHTML = "";
    return true;
  }
}

function validGender() {
  const selectedGenderValue = document.querySelector(
    'input[name="gender"]:checked'
  )?.value;
  if (!selectedGenderValue) {
    genderError.innerHTML = "Please select your gender. ";
    return false;
  } else {
    genderError.innerHTML = "";
    return true;
  }
}

function validHobby() {
  const hobbyValue = hobbyCheakeArray();
  if (hobbyValue.length == 0) {
    hobbyError.innerHTML = "Please select your hobby ";
    return false;
  } else {
    hobbyError.innerHTML = "";
    return true;
  }
}

function validCountry() {
  const countryValue = countrySelectElement.value.trim();
  if (!countryValue) {
    countryError.innerHTML = "Please select your country";
    return false;
  } else {
    countryError.innerHTML = "";
    return true;
  }
}

function validState() {
  const stateValue = stateSelectElement.value.trim();
  if (!stateValue) {
    stateError.innerHTML = "Please select your state";
    return false;
  } else {
    stateError.innerHTML = "";
    return true;
  }
}

function validCity() {
  const cityValue = citySelectElement.value;
  if (!cityValue) {
    cityError.innerHTML = "Please select your city";
    return false;
  } else {
    cityError.innerHTML = "";
    return true;
  }
}

function clearAllError() {
  ALL_ERROR_IN_ARRAY.forEach((element) => {
    element.innerHTML = "";
  });
}

function loadState(e) {
  citySelectElement.innerHTML = optionMaker("", "Select city", true);
  stateSelectElement.innerHTML = optionMaker("", "Select state", true);
  const validOrNot = validCountry();
  if (!validOrNot) {
    return false;
  }
  const idOfCountry = e.target.value;
  country.forEach((value) => {
    if (value._id == idOfCountry) {
      value.states.forEach((val) => {
        stateSelectElement.innerHTML =
          stateSelectElement.innerHTML +
          `<option value="${val._id}">${val.name}</option>`;
      });
    }
  });
}

function loadCity(e) {
  const validOrNot = validState();
  citySelectElement.innerHTML = optionMaker("", "Select city", true);
  if (!validOrNot) {
    return false;
  }
  const idOfState = e.target.value;
  const idOfCountry = countrySelectElement.value;
  country.forEach((value) => {
    if (value._id == idOfCountry) {
      value.states.forEach((val) => {
        if (val._id == idOfState) {
          val.city.forEach((value) => {
            citySelectElement.innerHTML =
              citySelectElement.innerHTML +
              `<option value="${value._id}">${value.name}</option>`;
          });
        }
      });
    }
  });
}

function ascending() {
  const dataFromLocalStorage = getToLocalStorage("dataOfTable");
  dataFromLocalStorage.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  return dataFromLocalStorage;
}

function descending() {
  const dataFromLocalStorage = getToLocalStorage("dataOfTable");
  dataFromLocalStorage.sort((a, b) => {
    return b.name.localeCompare(a.name);
  });
  return dataFromLocalStorage;
}

function search(dataToShow) {
  const rege = new RegExp(`${searchInputElement.value.trim()}`, "i");
  const filterdData = dataToShow.filter((value) => {
    const findValue =
      value.name.match(rege) ||
      value.email.match(rege) ||
      value.gender.match(rege) ||
      value.hobby.join(" , ").match(rege) ||
      value.country.name.match(rege) ||
      value.state.name.match(rege) ||
      value.city.name.match(rege);
    return findValue;
  });
  return filterdData;
}

function showDataInTable() {
  tableBodyElement.innerHTML = "";
  let dataToShow =
    formatTableElement.value == "Ascending"
      ? ascending()
      : formatTableElement.value == "Descending"
      ? descending()
      : getToLocalStorage("dataOfTable");
  const filterdData = search(dataToShow);
  if (filterdData.length == 0) {
    noDataElement.innerHTML = `There is no data available.`;
    return 0;
  }
  noDataElement.innerHTML = "";
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
            <td><button onclick="deleteElement(${val._id})" class="table-delete"
            ${
              idToEdit == val._id
                ? 'style="background-color: rgb(139, 77, 77)" disabled'
                : ""
            }
            >Delete</button>
              <a onclick="loadEditDataInTable(${
                val._id
              })" href="#form-container"><button class="table-remove">Edit</button></a></td>
          </tr>`;
  });
}
