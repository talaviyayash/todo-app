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
  const anyErrorInForm = anyError();
  if (anyErrorInForm) {
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
    const countryValueFromId = country.find((value) => {
      return value._id == countryValue ? true : false;
    });
    const stateValueFromId = countryValueFromId.states.find((value) => {
      return value._id == stateValue ? true : false;
    });
    const cityValueFromId = stateValueFromId.city.find((value) => {
      return value._id == cityValue ? true : false;
    });
    if (submitOrEdit == "edit") {
      let ind = 0;
      const dataFromLocalStorage = getToLocalStorage("dataOfTable");
      dataFromLocalStorage.forEach((value, index) => {
        if (value._id == idToAdd) {
          ind = index;
        }
      });
      const newObj = {
        ...dataFromLocalStorage[ind],
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
      dataFromLocalStorage[ind] = newObj;
      storeToLocalStorage("dataOfTable", dataFromLocalStorage);
      idToAdd = undefined;
      submitOrEdit = "submit";
      formetTablet();
      forDisabledTheChild.disabled = false;
      return 0;
    }
    const dataFromLocalStorage = getToLocalStorage("dataOfTable");
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
    dataFromLocalStorage[dataFromLocalStorage.length] = newObj;
    storeToLocalStorage("dataOfTable", dataFromLocalStorage);
    idToAdd = undefined;
    formetTablet();
    forDisabledTheChild.disabled = false;
  }
}
function loadEditData(e, idWhereToUpdate) {
  const dataFromLocalStorage = getToLocalStorage("dataOfTable");
  clearAllError();
  if (forDisabledTheChild?.style?.backgroundColor) {
    forDisabledTheChild.disabled = false;
    forDisabledTheChild.style.backgroundColor = "#e55656";
  }
  forDisabledTheChild = e.target.parentNode.parentNode.childNodes[0];
  forDisabledTheChild.disabled = true;
  forDisabledTheChild.style.backgroundColor = "#8b4d4d";
  submitBtnElement.innerHTML = "Update the data";
  const findValue = dataFromLocalStorage.find((value) => {
    if (value._id == idWhereToUpdate) {
      idToAdd = value._id;
      return true;
    }
    return false;
  });
  nameInputElement.value = findValue.name;
  emailInputElement.value = findValue.email;
  countrySelectElement.innerHTML;
  citySelectElement.innerHTML = `<option value="" >Select city</option>`;
  stateSelectElement.innerHTML = `<option value="" >Select state</option>`;
  countrySelectElement.innerHTML = `<option value="" >Select country</option>`;
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
  submitOrEdit = "edit";
  showDataInTable();
}
