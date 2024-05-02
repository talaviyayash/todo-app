function deleteElement(elementToBeDeleted) {
  if (confirm("Are you sure you want to delete data?")) {
    dataOfTable.forEach((value, index) => {
      if (value._id == elementToBeDeleted) {
        dataOfTable.splice(index, 1);
      }
    });
    showDataInTable();
    resetForm();
  }
}

function submitForm(e) {
  const anyErrorInForm = anyError();
  if (anyErrorInForm) {
    if (idToAdd == undefined) {
      idToAdd = dataOfTable.length;
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
      dataOfTable.forEach((value, index) => {
        if (value._id == idToAdd) {
          ind = index;
        }
      });
      const newObj = {
        ...dataOfTable[ind],
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
      dataOfTable[ind] = newObj;
      submitOrEdit = "submit";
      resetForm();
      forDisabledTheChild.disabled = false;
      idToAdd == undefined;
      return 0;
    }
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
    dataOfTable[idToAdd] = newObj;
    resetForm();
    forDisabledTheChild.disabled = false;
  }
  idToAdd == undefined;
}
function editFunc(e, idWhereToUpdate) {
  clearAllError();
  if (forDisabledTheChild?.style?.backgroundColor) {
    forDisabledTheChild.disabled = false;
    forDisabledTheChild.style.backgroundColor = "#e55656";
  }
  forDisabledTheChild = e.target.parentNode.parentNode.childNodes[0];
  forDisabledTheChild.disabled = true;
  forDisabledTheChild.style.backgroundColor = "#8b4d4d";
  submitBtnElement.innerHTML = "Update the data";
  let indexToAdd;
  const findValue = dataOfTable.find((value) => {
    if (value._id == idWhereToUpdate) {
      indexToAdd = value._id;
      return true;
    }
    return false;
  });
  idToAdd = indexToAdd;
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
