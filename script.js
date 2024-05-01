const dataOfTable = [
  {
    _id: Date.now(),
    name: "sdefs",
    email: "yashtalaviya654@gmail.com",
    gender: "male",
    hobby: ["reading", "traveling"],
    country: { name: "india", _id: 1 },
    state: {
      _id: 1,
      name: "gujrat",
    },
    city: {
      _id: 1,
      name: "surat",
    },
  },
  {
    _id: Date.now() + 1,
    name: "sdesafs",
    email: "yash@gmail.com",
    gender: "male",
    hobby: ["reading"],
    country: { name: "india", _id: 1 },
    state: {
      _id: 1,
      name: "gujrat",
    },
    city: {
      _id: 1,
      name: "surat",
    },
  },
];
const country = [
  {
    _id: 1,
    name: "india",
    states: [
      {
        _id: 1,
        name: "gujrat",
        city: [
          { _id: 1, name: "surat" },
          { _id: 2, name: "ahemdabad" },
        ],
      },
      {
        _id: 2,
        name: "maharastra",
        city: [
          { _id: 1, name: "mumbai" },
          { _id: 2, name: "nagpur" },
        ],
      },
    ],
  },
  {
    _id: 2,
    name: "usa",
    states: [
      {
        _id: 1,
        name: "california",
        city: [
          { _id: 1, name: "los angeles" },
          { _id: 2, name: "san francisco" },
        ],
      },
      {
        _id: 2,
        name: "texas",
        city: [
          { _id: 1, name: "houston" },
          { _id: 2, name: "texas City" },
        ],
      },
    ],
  },
];
let indexWhereToEdit;
let forDisabledTheChild = {};
let indexOfCountry;
let indexOfState;
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
formElement.addEventListener("submit", submitForm);
firstTimeShow();
showDataInTable(dataOfTable);

function showDataInTable(data) {
  tableBodyElement.innerHTML = "";
  data.forEach((val) => {
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
function firstTimeShow() {
  indexWhereToEdit = undefined;
  countrySelectElement.innerHTML = `<option value="" selected>select country</option>`;
  country.forEach((val) => {
    countrySelectElement.innerHTML =
      countrySelectElement.innerHTML +
      `
  <option value="${val._id}">${val.name}</option>;
    `;
  });
}
function loadState(e) {
  citySelectElement.innerHTML = `<option value="" selected>select city</option>`;
  stateSelectElement.innerHTML = `<option value="" selected>select state</option>`;
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
  // country[idOfCountry].forEach((value, index) => {});
}

function loadCity(e) {
  const validOrNot = validState();
  citySelectElement.innerHTML = `<option value="" selected>select city</option>`;
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

function deleteElement(elementToBeDeleted) {
  if (confirm("Are you sure you want to delete data?")) {
    dataOfTable.forEach((value, index) => {
      if (value._id == elementToBeDeleted) {
        dataOfTable.splice(index, 1);
      }
    });
    showDataInTable(dataOfTable);
    resetForm();
  }
}
function howManyHobbyIsCheaked() {
  var checkedBoxes = document.querySelectorAll("input[name=hobby]:checked");
  const allValue = [];
  checkedBoxes.forEach((value) => {
    allValue.push(value.value);
  });
  return allValue;
}

function submitForm(e) {
  if (indexWhereToEdit == undefined) {
    indexWhereToEdit = dataOfTable.length;
  }
  e.preventDefault();
  const nameValue = nameInputElement.value.trim();
  const emailValue = emailInputElement.value.trim();
  const selectedGenderValue = document.querySelector(
    'input[name="gender"]:checked'
  )?.value;
  const hobbyValue = howManyHobbyIsCheaked();
  const countryValue = countrySelectElement.value;
  const stateValue = stateSelectElement.value;
  const cityValue = citySelectElement.value;

  if (anyError()) {
    const countryValueFromId = country.find((value) => {
      return value._id == countryValue ? true : false;
    });
    const stateValueFromId = countryValueFromId.states.find((value) => {
      return value._id == stateValue ? true : false;
    });
    const cityValueFromId = stateValueFromId.city.find((value) => {
      return value._id == cityValue ? true : false;
    });
    const newObj = {
      _id: new Date().getMilliseconds(),
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
    dataOfTable[indexWhereToEdit] = newObj;
    resetForm();
    forDisabledTheChild.disabled = false;
  }
  indexWhereToEdit == undefined;
}

function anyError() {
  const forName = validName();
  const forEmail = validEmail();
  const forGender = validGender();
  const forHobby = validHobby();
  const forCountry = validCountry();
  const forState = validState();
  const forCity = validCity();

  if (
    forName &&
    forEmail &&
    forGender &&
    forHobby &&
    forCountry &&
    forState &&
    forCity
  ) {
    return true;
  }
  return false;
}
function validName() {
  const nameValue = nameInputElement.value.trim();
  const regexForName = /^[a-zA-Z\s-]+$/;
  if (nameValue.length < 4 || !(nameValue.search(regexForName) == 0)) {
    nameError.innerHTML = "Please enter the name valid name. ";
    return false;
  } else {
    nameError.innerHTML = "";
    return true;
  }
}
function validEmail() {
  const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
  const hobbyValue = howManyHobbyIsCheaked();
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
function editFunc(e, idWhereToUpdate) {
  forDisabledTheChild.disabled = false;
  forDisabledTheChild = e.target.parentNode.parentNode.childNodes[0];
  forDisabledTheChild.disabled = true;
  submitBtnElement.innerHTML = "Update the data";
  let indexToAdd = dataOfTable.length;
  const findValue = dataOfTable.find((value, index) => {
    if (value._id == idWhereToUpdate) {
      indexToAdd = index;
      return true;
    }
    return false;
  });
  indexWhereToEdit = indexToAdd;
  nameInputElement.value = findValue.name;
  emailInputElement.value = findValue.email;
  countrySelectElement.innerHTML;
  citySelectElement.innerHTML = `<option value="" >select city</option>`;
  stateSelectElement.innerHTML = `<option value="" >select state</option>`;
  countrySelectElement.innerHTML = `<option value="" >select country</option>`;
  let countryIndex;
  let stateIndex;
  country.forEach((value, index) => {
    if (value._id == findValue.country._id) {
      countryIndex = index;
      countrySelectElement.innerHTML =
        countrySelectElement.innerHTML +
        `
  <option value="${value._id}" selected>${value.name}</option>;
    `;
    } else {
      countrySelectElement.innerHTML =
        countrySelectElement.innerHTML +
        `
  <option value="${value._id}">${value.name}</option>;
    `;
    }
  });
  country[countryIndex].states.forEach((value, index) => {
    if (value._id == findValue.state._id) {
      stateIndex = index;
      stateSelectElement.innerHTML =
        stateSelectElement.innerHTML +
        `
  <option value="${value._id}" selected>${value.name}</option>;
    `;
    } else {
      stateSelectElement.innerHTML =
        stateSelectElement.innerHTML +
        `
  <option value="${value._id}">${value.name}</option>;
    `;
    }
  });
  country[countryIndex].states[stateIndex].city.forEach((value) => {
    if (value._id == findValue.city._id) {
      citySelectElement.innerHTML =
        citySelectElement.innerHTML +
        `
  <option value="${value._id}" selected>${value.name}</option>;
    `;
    } else {
      citySelectElement.innerHTML =
        citySelectElement.innerHTML +
        `
  <option value="${value._id}">${value.name}</option>;
    `;
    }
  });
  document.querySelectorAll('input[name="gender"]').forEach((element) => {
    if (element.value == findValue.gender) {
      element.checked = true;
    }
  });
  document.querySelectorAll('input[name="hobby"]').forEach((element) => {
    element.checked = false;
  });
  findValue.hobby.forEach((value) => {
    document.querySelectorAll('input[name="hobby"]').forEach((element) => {
      if (element.value == value) {
        element.checked = true;
      }
    });
  });
}
function resetForm() {
  formatTableElement.selectedIndex = "0";
  searchInputElement.value = "";
  [
    nameError,
    emailError,
    genderError,
    hobbyError,
    countryError,
    stateError,
    cityError,
  ].forEach((element) => {
    element.innerHTML = "";
  });
  formElement.reset();
  firstTimeShow();
  citySelectElement.innerHTML = `<option value="" selected>select city</option>`;
  stateSelectElement.innerHTML = `<option value="" selected>select state</option>`;
  submitBtnElement.innerHTML = "Submit";
  showDataInTable(dataOfTable);
}
function formateTheTable() {
  searchInputElement.value = "";
  if (formatTableElement.value == "ascending") {
    ascending();
  } else if (formatTableElement.value == "descending") {
    descending();
  } else {
    showDataInTable(dataOfTable);
  }
}
function ascending() {
  dataOfTable.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  showDataInTable(dataOfTable);
}
function descending() {
  dataOfTable.sort((a, b) => {
    return b.name.localeCompare(a.name);
  });
  showDataInTable(dataOfTable);
}
function search(e) {
  const filterdData = dataOfTable.filter((value) => {
    if (value.name.match(e.target.value.trim())) {
      return true;
    }
    return false;
  });
  showDataInTable(filterdData);
}
