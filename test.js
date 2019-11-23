const arr = [null, 'X', null];

const bool = !arr.every(e => e === null);
console.log(bool);