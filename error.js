function anyError() {
  const forName = validName();
  const forEmail = validEmail();
  const forGender = validGender();
  const forHobby = validHobby();
  const forCountry = validCountry();
  const forState = validState();
  const forCity = validCity();

  return (
    forName &&
    forEmail &&
    forGender &&
    forHobby &&
    forCountry &&
    forState &&
    forCity
  );
}
function validName() {
  const nameValue = nameInputElement.value.trim();
  const regexForName = /^[a-zA-Z\s-]+$/;
  if (nameValue.length < 4 || !(nameValue.search(regexForName) == 0)) {
    nameError.innerHTML = "Please enter the valid name. ";
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
function clearAllError() {
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
}
