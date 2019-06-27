let person = {
  name: "John",
  age: 32,
  partTime: false
};


console.log(person);

let cards = [
    {
      suit: "Hearts",
      value: "Queen"
    },
    
    {
      suit: "Clubs",
      value: "King"
    }
  ];
  
  console.log(cards[1]);
  
  let randomCard = (Math.random() * 52) - 1;
  randomCard = Math.trunc(randomCard);
  
  console.log(randomCard);
  
  let date = new Date().toDateString();
  
  console.log(date);
l