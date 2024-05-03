const dataForTable = getToLocalStorage("dataOfTable");
if (!dataForTable || dataForTable.length == 0) {
  storeToLocalStorage("dataOfTable", dataOfTable);
}
formElement.addEventListener("submit", submitForm);
defaultToShow();
showDataInTable();

function optionMake(value, innerText, selected) {
  return `<option value="${value}" ${
    selected ? "selected" : ""
  }>${innerText}</option>`;
}

function defaultToShow() {
  submitOrEdit = MODES.SUBMIT;
  submitBtnElement.innerHTML = "Submit";
  idToEdit = undefined;
  countrySelectElement.innerHTML = optionMake("", "Select country", true);
  country.forEach((val) => {
    countrySelectElement.innerHTML =
      countrySelectElement.innerHTML + optionMake(val._id, val.name, false);
  });
  citySelectElement.innerHTML = optionMake("", "Select city", true);
  stateSelectElement.innerHTML = optionMake("", "Select state", true);
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
    dataFromLocalStorage.forEach((value, index) => {
      if (value._id == elementToBeDeleted) {
        dataFromLocalStorage.splice(index, 1);
      }
    });
    storeToLocalStorage("dataOfTable", dataFromLocalStorage);
    showDataInTable();
  }
}

function submitForm(e) {
  e.preventDefault();
  const anyErrorInForm = anyError();
  if (!anyErrorInForm) {
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
    let getIndexFromId;
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
            if (item._id == idToEdit) {
              return { _id: item._id, ...newObj };
            } else {
              return true;
            }
          })
        : [...dataFromLocalStorage, { _id: Date.now(), ...newObj }];
    // getIndexFromId = dataFromLocalStorage.findIndex((value) => {
    //   return value._id == idToEdit;
    // });
    // const updatedArray = dataFromLocalStorage.map((value) => {
    // console.log(value);
    // });

    // dataFromLocalStorage[
    //   submitOrEdit == MODES.EDIT ? getIndexFromId : dataFromLocalStorage.length
    // ] = newObj;
    storeToLocalStorage("dataOfTable", updatedArr);
    resetPage();
  }
}

function loadEditDataInTable(idWhereToUpdate) {
  idToEdit = idWhereToUpdate;
  const dataFromLocalStorage = getToLocalStorage("dataOfTable");
  clearAllError();
  submitBtnElement.innerHTML = "Update the data";
  const findValue = dataFromLocalStorage.find((value) => {
    if (value._id == idWhereToUpdate) {
      return true;
    }
    return false;
  });
  nameInputElement.value = findValue.name;
  emailInputElement.value = findValue.email;
  countrySelectElement.innerHTML;
  citySelectElement.innerHTML = optionMake("", "Select city", false);
  stateSelectElement.innerHTML = optionMake("", "Select state", false);
  countrySelectElement.innerHTML = optionMake("", "Select country", false);
  let countryIndex;
  let stateIndex;
  country.forEach((value, index) => {
    const valueFound = value._id == findValue.country._id;
    if (valueFound) {
      countryIndex = index;
    }
    countrySelectElement.innerHTML =
      countrySelectElement.innerHTML +
      optionMake(value._id, value.name, valueFound);
  });
  country[countryIndex].states.forEach((value, index) => {
    const valueFound = value._id == findValue.state._id;
    if (valueFound) {
      stateIndex = index;
    }
    stateSelectElement.innerHTML =
      stateSelectElement.innerHTML +
      optionMake(value._id, value.name, valueFound);
  });
  country[countryIndex].states[stateIndex].city.forEach((value) => {
    const valueFound = value._id == findValue.city._id;
    citySelectElement.innerHTML =
      citySelectElement.innerHTML +
      optionMake(value._id, value.name, valueFound);
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
  submitOrEdit = MODES.EDIT;
  showDataInTable();
}

function getToLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function storeToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function anyError() {
  const forName = validName();
  const forEmail = validEmail();
  const forGender = validGender();
  const forHobby = validHobby();
  const forCountry = validCountry();
  const forState = validState();
  const forCity = validCity();
  const isAnyError =
    forName &&
    forEmail &&
    forGender &&
    forHobby &&
    forCountry &&
    forState &&
    forCity;
  return !isAnyError;
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
  citySelectElement.innerHTML = optionMake("", "Select city", true);
  stateSelectElement.innerHTML = optionMake("", "Select state", true);
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
  citySelectElement.innerHTML = optionMake("", "Select city", true);
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
  let dataToShow;
  if (formatTableElement.value == "Ascending") {
    dataToShow = ascending();
  } else if (formatTableElement.value == "Descending") {
    dataToShow = descending();
  } else {
    dataToShow = getToLocalStorage("dataOfTable");
  }
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
