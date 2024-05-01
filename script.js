const dataOfTable = [
  {
    _id: new Date().getMilliseconds(),
    name: "sdefs",
    email: "das",
    gender: "male",
    hobby: ["reading", "traveling"],
    country: { name: "india", _id: 1 },
    state: {
      _id: 1,
      c_id: 1,
      name: "gujrat",
    },
    city: {
      _id: 1,
      s_id: 1,
      c_id: 1,
      name: "ahmedabad",
    },
  },
  {
    _id: new Date().getMilliseconds() + 1,
    name: "sdesafs",
    email: "das",
    gender: "male",
    hobby: ["reading"],
    country: { name: "india", _id: 1 },
    state: {
      _id: 1,
      c_id: 1,
      name: "gujrat",
    },
    city: {
      _id: 1,
      s_id: 1,
      c_id: 1,
      name: "ahmedabad",
    },
  },
];

const countryName = [
  {
    _id: 1,
    name: "india",
  },
  {
    _id: 2,
    name: "usa",
  },
];

const stateName = [
  {
    _id: 1,
    c_id: 1,
    name: "gujrat",
  },
  {
    c_id: 1,
    _id: 2,
    name: "haryana",
  },
  {
    c_id: 1,
    _id: 3,
    name: "maharashtra",
  },
  {
    c_id: 2,
    _id: 4,
    name: "california",
  },
  {
    c_id: 2,
    _id: 5,
    name: "texas",
  },
  {
    c_id: 2,
    _id: 6,
    name: "florida",
  },
];

const cityName = [
  {
    _id: 1,
    s_id: 1,
    c_id: 1,
    name: "ahmedabad",
  },
  {
    _id: 2,
    s_id: 1,
    c_id: 1,
    name: "gandhinagar",
  },
  {
    _id: 3,
    s_id: 1,
    c_id: 1,
    name: "surat",
  },
  {
    _id: 4,
    s_id: 2,
    c_id: 1,
    name: "faizabad",
  },
  {
    _id: 5,
    s_id: 2,
    c_id: 1,
    name: "farakhpur",
  },
  {
    _id: 6,
    s_id: 2,
    c_id: 1,
    name: "bhiwani",
  },
  {
    _id: 7,
    s_id: 3,
    c_id: 1,
    name: "mumbai",
  },
  {
    _id: 8,
    s_id: 3,
    c_id: 1,
    name: "Nagpur",
  },
  {
    _id: 9,
    s_id: 4,
    c_id: 2,
    name: "los angeles",
  },
  {
    _id: 10,
    s_id: 4,
    c_id: 2,
    name: "san francisco",
  },
  {
    _id: 11,
    s_id: 5,
    c_id: 2,
    name: "houston",
  },
  {
    _id: 12,
    s_id: 5,
    c_id: 2,
    name: "texas City",
  },
  {
    _id: 13,
    s_id: 6,
    c_id: 2,
    name: "miami",
  },
  {
    _id: 14,
    s_id: 6,
    c_id: 2,
    name: "orlando",
  },
  {
    _id: 15,
    s_id: 6,
    c_id: 2,
    name: "florida city",
  },
];
let cuntryCurrentIndex = 0;
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
const formElement = document.getElementById("data-enter-form");
const submitBtnElement = document.getElementById("submit");
const formatTableElement = document.getElementById("format");
formElement.addEventListener("submit", submitForm);
let indexWhereToEdit;
showDataInTable(dataOfTable);
firstTimeShow();
// countrySelectElement.addEventListener(onchange, validCountry);
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
            })" class="table-delete">Delete</button></td>
            <td><a onclick="editFunc(${
              val._id
            })" href="#form-container"><button class="table-remove">Edit</button></a></td>
          </tr>`;
  });
}
function firstTimeShow() {
  indexWhereToEdit = undefined;
  countrySelectElement.innerHTML = `<option value="" selected>select one</option>`;
  countryName.forEach((val) => {
    countrySelectElement.innerHTML =
      countrySelectElement.innerHTML +
      `
  <option value="${val._id}">${val.name}</option>;
    `;
  });
}
function loadState(e) {
  citySelectElement.innerHTML = `<option value="" selected>select one</option>`;
  stateSelectElement.innerHTML = `<option value="" selected>select one</option>`;
  const validOrNot = validCountry();
  if (!validOrNot) {
    return false;
  }
  const idOfCountry = e.target.value;
  stateName.forEach((value) => {
    if (idOfCountry == value.c_id) {
      stateSelectElement.innerHTML =
        stateSelectElement.innerHTML +
        `<option value="${value._id}">${value.name}</option>`;
    }
  });
}

function loadCity(e) {
  const validOrNot = validState();
  citySelectElement.innerHTML = `<option value="" selected>select one</option>`;
  if (!validOrNot) {
    return false;
  }
  const idOfState = e.target.value;
  cityName.forEach((value) => {
    if (idOfState == value.s_id) {
      citySelectElement.innerHTML =
        citySelectElement.innerHTML +
        `<option value="${value._id}">${value.name}</option>`;
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
    const countryValueFromId = countryName.find((value) => {
      return value._id == countryValue ? true : false;
    });
    const cityValueFromId = cityName.find((value) => {
      return value._id == cityValue ? true : false;
    });
    const stateValueFromId = stateName.find((value) => {
      return value._id == stateValue ? true : false;
    });
    const newObj = {
      _id: new Date().getMilliseconds(),
      hobby: hobbyValue,
      gender: selectedGenderValue,
      name: nameValue,
      email: emailValue,
      state: stateValueFromId,
      city: cityValueFromId,
      country: countryValueFromId,
    };
    dataOfTable[indexWhereToEdit] = newObj;
    resetForm();
  }
}

function anyError() {
  const forName = validName();
  const forGender = validGender();
  const forHobby = validHobby();
  const forCountry = validCountry();
  const forState = validState();
  const forCity = validCity();
  if (forName && forGender && forHobby && forCountry && forState && forCity) {
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
function editFunc(idWhereToUpdate) {
  submitBtnElement.innerHTML = "Update";
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
  citySelectElement.innerHTML = `<option value="" >select one</option>`;
  stateSelectElement.innerHTML = `<option value="" >select one</option>`;
  countrySelectElement.innerHTML = `<option value="" >select one</option>`;
  countryName.forEach((value) => {
    if (value._id == findValue.country._id) {
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
  stateName.forEach((value) => {
    if (value._id == findValue.state._id) {
      stateSelectElement.innerHTML =
        stateSelectElement.innerHTML +
        `
  <option value="${value._id}" selected>${value.name}</option>;
    `;
    } else if (value.c_id == findValue.country._id) {
      stateSelectElement.innerHTML =
        stateSelectElement.innerHTML +
        `
  <option value="${value._id}">${value.name}</option>;
    `;
    }
  });
  cityName.forEach((value) => {
    if (value._id == findValue.city._id) {
      citySelectElement.innerHTML =
        citySelectElement.innerHTML +
        `
  <option value="${value._id}" selected>${value.name}</option>;
    `;
    } else if (value.s_id == findValue.state._id) {
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
  formElement.addEventListener("submit", editAllData);
  formElement.removeEventListener("submit", submitForm);
}
function editAllData(event) {
  event.preventDefault();
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
    const countryValueFromId = countryName.find((value) => {
      return value._id == countryValue ? true : false;
    });
    const cityValueFromId = cityName.find((value) => {
      return value._id == cityValue ? true : false;
    });
    const stateValueFromId = stateName.find((value) => {
      return value._id == stateValue ? true : false;
    });
    dataOfTable[indexWhereToEdit] = {
      ...dataOfTable[indexWhereToEdit],
      hobby: hobbyValue,
      gender: selectedGenderValue,
      email: emailValue,
      name: nameValue,
      state: stateValueFromId,
      city: cityValueFromId,
      country: countryValueFromId,
    };
    showDataInTable(dataOfTable);
    formElement.removeEventListener("submit", editAllData);
    formElement.addEventListener("submit", submitForm);
    formElement.reset();
    indexWhereToEdit = dataOfTable.length;
    resetForm();
  }
}
function resetForm() {
  formElement.reset();
  firstTimeShow();
  citySelectElement.innerHTML = `<option value="" selected>select one</option>`;
  stateSelectElement.innerHTML = `<option value="" selected>select one</option>`;
  submitBtnElement.innerHTML = "Submit";
  formElement.removeEventListener("submit", editAllData);
  formElement.addEventListener("submit", submitForm);
  showDataInTable(dataOfTable);
}
function formateTheTable() {
  if (formatTableElement.value == "ascending") {
    ascending();
  } else {
    descending();
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
