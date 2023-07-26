const getName = () => {
  return "Atik";
};

const getAge = () => {
  return "26";
};

const cgpa = 3.72;
/*
 exports.getName = getName;
 exports.getAge = getAge;
 exports.result = cgpa;
*/

//Short way

module.exports = { getName, getAge, cgpa };
