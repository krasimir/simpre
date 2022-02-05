const name = {
  firstName: "Krasimir",
  lastName: "Tsonev",
  hoursPerDay: [8, 1, 4, 6, 0],
};

const userData = { age: 36, ...name };
console.log(userData); // age, first, last name and hours per day

const updates = { age: 37 };
const updatedData = { ...userData, ...updates };
console.log(updatedData); // age=37

console.log(Math.max(...userData.hoursPerDay)); // 8

const copy = [...userData.hoursPerDay];
console.log(copy === userData.hoursPerDay); // false

const updates = { age: 37 };
const updatedData = { ...userData, ...updates };
console.log(updatedData); // age=37

console.log(Math.max(...userData.hoursPerDay)); // 8

const copy = [...userData.hoursPerDay];
console.log(copy === userData.hoursPerDay); // false
const updates = { age: 37 };
const updatedData = { ...userData, ...updates };
console.log(updatedData); // age=37

console.log(Math.max(...userData.hoursPerDay)); // 8

const copy = [...userData.hoursPerDay];
console.log(copy === userData.hoursPerDay); // false
