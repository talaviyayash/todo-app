const a = [
  {
    city: "surat",
    state: "",
  },
  {
    city: "mumbai",
    state: "maha",
  },
];

const [{ city, state }, { city: city1, state: state1 }] = a;
console.log(city1, city);
// const d = b;
