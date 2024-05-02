const dataOfTable = [
  {
    _id: Date.now(),
    name: "yash",
    email: "yashtalaviya654@gmail.com",
    gender: "Male",
    hobby: ["Reading", "Traveling"],
    country: { name: "India", _id: 1 },
    state: {
      _id: 1,
      name: "Gujrat",
    },
    city: {
      _id: 1,
      name: "Surat",
    },
  },
  {
    _id: Date.now() + 1,
    name: "abhi",
    email: "abhi@gmail.com",
    gender: "Male",
    hobby: ["Reading"],
    country: { name: "India", _id: 1 },
    state: {
      _id: 1,
      name: "Gujrat",
    },
    city: {
      _id: 1,
      name: "Surat",
    },
  },
  {
    _id: Date.now() + 2,
    name: "aman",
    email: "aman@gmail.com",
    gender: "Male",
    hobby: ["Reading"],
    country: { name: "India", _id: 1 },
    state: {
      _id: 1,
      name: "Gujrat",
    },
    city: {
      _id: 1,
      name: "Surat",
    },
  },
  {
    _id: Date.now() + 3,
    name: "aana",
    email: "aana@gmail.com",
    gender: "Female",
    hobby: ["Reading"],
    country: { name: "India", _id: 1 },
    state: {
      _id: 1,
      name: "Gujrat",
    },
    city: {
      _id: 1,
      name: "Surat",
    },
  },
];
const country = [
  {
    _id: 1,
    name: "India",
    states: [
      {
        _id: 1,
        name: "Gujrat",
        city: [
          { _id: 1, name: "Surat" },
          { _id: 2, name: "Ahemdabad" },
        ],
      },
      {
        _id: 2,
        name: "Maharastra",
        city: [
          { _id: 1, name: "Mumbai" },
          { _id: 2, name: "Nagpur" },
        ],
      },
    ],
  },
  {
    _id: 2,
    name: "Usa",
    states: [
      {
        _id: 1,
        name: "California",
        city: [
          { _id: 1, name: "Los angeles" },
          { _id: 2, name: "San francisco" },
        ],
      },
      {
        _id: 2,
        name: "Texas",
        city: [
          { _id: 1, name: "Houston" },
          { _id: 2, name: "Texas City" },
        ],
      },
    ],
  },
];
let idToAdd;
let forDisabledTheChild = {};
let indexOfCountry;
let indexOfState;
let submitOrEdit;
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
const noDataElement = document.getElementById("no-data");
