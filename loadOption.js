function loadState(e) {
  citySelectElement.innerHTML = `<option value="" selected>Select city</option>`;
  stateSelectElement.innerHTML = `<option value="" selected>Select state</option>`;
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
  citySelectElement.innerHTML = `<option value="" selected>Select city</option>`;
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
