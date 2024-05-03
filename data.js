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
const regexForName = /^[a-zA-Z\s-]+$/;
const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
