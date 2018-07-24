//https://open.kattis.com/problems/catch

const initialTime = 0;
const maxTime = 1000;
const array = 
  [
    [0,1,0,900,0.2],
    [0,2,100,500,1.0],
    [2,1,500,700,1.0],
    [2,1,501,701,0.1],
    [0,3,200,400,0.5],
    [3,1,500,800,0.1],
    [3,0,550,650,0.9],
    [0,1,700,900,0.1]
  ]

class person {
  constructor(location, activeTime, pathArray, chanceArray) {
    this.location = location;
    this.activeTime = activeTime;
    this.pathArray = pathArray;
    this.chanceArray = chanceArray;
  }

  result() {
    if (!this.chanceArray) {
      return 0;
    } else {
      var result = 1;
      this.chanceArray.map(chance => result = result * chance[0]);
      return result;
    }
  }
}

var travellers = [];

travellers.push(new person(0, -1, [0], []))

for (var time = initialTime; time <= maxTime; time++)
{
  array.forEach((row) => {
    if (time === row[2]) {
      const departingStation = row[0];
      const arrivalStation = row[1];
      const arrivalTime = row[3];
      const arrivalChance = row[4];
      //console.log(`departures from station ${departingStation} at time ${time}`)

      travellers.forEach((traveller) => {
        if (traveller.location === departingStation && traveller.activeTime < time) {
          //splitting into two quantum travellers
          //console.log(`splitting at station ${departingStation} at time ${time}`)
          travellers.push(new person(arrivalStation, arrivalTime, [...traveller.pathArray, arrivalStation], [...traveller.chanceArray, [arrivalChance, false]]))
          traveller.chanceArray = [...traveller.chanceArray, [arrivalChance === 1? 1: 1 - arrivalChance, true]]
        }
      })
    }
  })
}

travellers.forEach((traveller) => {
  if (traveller.location === 1) {
    console.log(traveller.pathArray, traveller.chanceArray)
    //console.log(traveller.result())
  }
})