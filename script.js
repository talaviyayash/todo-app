formElement.addEventListener("submit", submitForm);
defaultShow();
showDataInTable();

function defaultShow() {
  submitOrEdit = "submit";
  countrySelectElement.innerHTML = `<option value="" selected>Select country</option>`;
  country.forEach((val) => {
    countrySelectElement.innerHTML =
      countrySelectElement.innerHTML +
      `
  <option value="${val._id}">${val.name}</option>;
    `;
  });
}
function howManyHobbyIsCheaked() {
  var checkedBoxes = document.querySelectorAll("input[name=hobby]:checked");
  const allValue = [];
  checkedBoxes.forEach((value) => {
    allValue.push(value.value);
  });
  return allValue;
}
function resetForm() {
  idToAdd = undefined;
  clearAllError();
  formElement.reset();
  defaultShow();
  citySelectElement.innerHTML = `<option value="" selected>Select city</option>`;
  stateSelectElement.innerHTML = `<option value="" selected>Select state</option>`;
  submitBtnElement.innerHTML = "Submit";
  showDataInTable();
  submitOrEdit = "submit";
}
