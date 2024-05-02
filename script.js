formElement.addEventListener("submit", submitForm);
firstTimeShow();
showDataInTable();

function firstTimeShow() {
  indexWhereToEdit = undefined;
  submitOrEdit = "submit";
  countrySelectElement.innerHTML = `<option value="" selected>select country</option>`;
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
  clearAllError();
  formElement.reset();
  firstTimeShow();
  citySelectElement.innerHTML = `<option value="" selected>select city</option>`;
  stateSelectElement.innerHTML = `<option value="" selected>select state</option>`;
  submitBtnElement.innerHTML = "Submit";
  showDataInTable();
  submitOrEdit = "submit";
}
