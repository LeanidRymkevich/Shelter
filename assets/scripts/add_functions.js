function randomNumberSet(from, to, set_length){
  const start_sequence = new Set();
  let random;
  let result; 
  while(start_sequence.size < set_length){
    random = from + Math.floor(Math.random() * to);
    start_sequence.add(random);
  }
  result = Array.from(start_sequence);
  return result;
}

function randomSetExceptOf(array, from, to){
  const set = new Set();
  let result;
  let random;

  array.forEach(item => set.add(item));
  while(set.size < array.length * 2){
    random = from + Math.floor(Math.random() * to);
    set.add(random);
  }
  
  result = Array.from(set).slice(array.length, set.size);

  return result;
}

export {randomNumberSet, randomSetExceptOf};