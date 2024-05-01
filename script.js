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
const errorElement = document.getElementById("error");
const formElement = document.getElementById("data-enter-form");
const submitBtnElement = document.getElementById("submit");
const formatTableElement = document.getElementById("format");
formElement.addEventListener("submit", submitForm);
let indexWhereToEdit;
showDataInTable(dataOfTable);
firstTimeShow();
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
  const idOfCountry = e.target.value;
  citySelectElement.innerHTML = `<option value="" selected>select one</option>`;
  stateSelectElement.innerHTML = `<option value="" selected>select one</option>`;
  stateName.forEach((value) => {
    if (idOfCountry == value.c_id) {
      stateSelectElement.innerHTML =
        stateSelectElement.innerHTML +
        `<option value="${value._id}">${value.name}</option>`;
    }
  });
}

function loadCity(e) {
  const idOfState = e.target.value;
  citySelectElement.innerHTML = `<option value="" selected>select one</option>`;
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
      console.log(elementToBeDeleted);
      if (value._id == elementToBeDeleted) {
        dataOfTable.splice(index, 1);
      }
    });
    showDataInTable(dataOfTable);
    resetForm();
    errorElement.innerHTML = "";
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

function submitForm(e, whereToAdd = dataOfTable.length) {
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

  if (
    anyError(
      nameValue,
      emailValue,
      selectedGenderValue,
      hobbyValue,
      countryValue,
      stateValue,
      cityValue
    )
  ) {
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
    dataOfTable[whereToAdd] = newObj;
    resetForm();
    errorElement.innerHTML = "";
  }
}

function anyError(
  nameValue,
  emailValue,
  selectedGenderValue,
  hobbyValue,
  countryValue,
  stateValue,
  cityValue
) {
  // if (nameValue == "") {
  //   errorElement.innerHTML = "Please enter the name. ";
  //   return false;
  // }
  // if (
  //   emailValue == "" ||
  //   !(emailValue.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) == 0)
  // ) {
  //   errorElement.innerHTML = "Please enter the valid email. ";
  //   return false;
  // }
  // if (!selectedGenderValue) {
  //   errorElement.innerHTML = "Please select your gender. ";
  //   return false;
  // }
  // if (hobbyValue.length == 0) {
  //   errorElement.innerHTML = "Please select your hobby ";
  //   return false;
  // }
  // if (!countryValue) {
  //   errorElement.innerHTML = "Please select your country ";
  //   return false;
  // }
  // if (!stateValue) {
  //   errorElement.innerHTML = "Please select your state ";
  //   return false;
  // }
  // if (!cityValue) {
  //   errorElement.innerHTML = "Please select your city ";
  //   return false;
  // }
  // return true;
}
function validName() {
  console.log("dsklck");
  const nameValue = nameInputElement.value.trim();
  const regexForName = /^[a-zA-Z\s-]+$/;
  if (!(nameValue == "") && nameValue.search(regexForName)) {
    errorElement.innerHTML = "Please enter the name. ";
    return false;
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
  console.log(findValue);
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
  if (
    anyError(
      nameValue,
      emailValue,
      selectedGenderValue,
      hobbyValue,
      countryValue,
      stateValue,
      cityValue
    )
  ) {
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
    errorElement.innerHTML = "";
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
  errorElement.innerHTML = "";
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
  console.log(e.target.value);
  const filterdData = dataOfTable.filter((value) => {
    if (value.name.match(e.target.value)) {
      return true;
    }
    return false;
  });
  showDataInTable(filterdData);
}
