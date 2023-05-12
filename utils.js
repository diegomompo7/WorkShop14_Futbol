const generateRandom = (min = 0, max = 100) => {
    const difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
  
    return rand;
  };
  
  const toUppercase = (text) => {
    return text.toUppercase();
  };
  
  module.exports = {
    generateRandom,
    toUppercase,
  };
  