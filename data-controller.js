let vn30Data = tickerList; // Danh sách 30 mã vốn hoá
let velocity = velocityRandom; // Vận tốc tăng trưởng của vốn hoá
let initialCapital = initialMarketCapitalization; // vốn hoá ban đầu
const vn30DataKeys = Object.keys(vn30Data);

for (let i = 0; i < vn30DataKeys.length; i++) {
  let locationVn30DataKeys = vn30Data[vn30DataKeys[i]];
  for (let j = 0; j < locationVn30DataKeys.length; j++) {
    locationVn30DataKeys[j].color = getRandomColor();
  }
}

function generateData(vn30Data, initialCapital, velocity, startYear, endYear) {
  let data = {};
  const fakeColor = [];
  const fakeColorIndex = 100;
  for (let i = 0; i < fakeColorIndex; i++) {
    fakeColor.push(getRandomColor());
  }
  let randomTickers = getRandomTickers();
  for(let year = startYear; year < endYear; year++) {
    let dataYear = [];
    for(let tickerIndex = 0; tickerIndex < vn30Data.length; tickerIndex++) {
      let ticker = vn30Data[tickerIndex];
      dataYear.push({
        "ticker": ticker,
        "capital": initialCapital[tickerIndex] + (year - startYear) * getRandInteger(velocity[tickerIndex][0], velocity[tickerIndex][1]),
        "color": fakeColor[vn30Data.indexOf(randomTickers[tickerIndex])]
      })
    }
    data[year] = dataYear;
  }
  return data;
}

// Random capital

function getRandInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
// Random color
function getRandomColor() {
  let letters = "0123456789ABCDEF".split('');
  let color = "#";
  let colorCodeNumber = 6;
  for (let i = 0; i < colorCodeNumber; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// Random 34 năm ngầu nhiên
function getRandomTickers() {
  const randomIndexes = [];
  const randomTickers = [];
  const randomAmountTickers = 4;
  for (let i = 0; i < randomAmountTickers; i++) {
    const randomIndex = getRandInteger(0, randomAmountTickers);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
      randomTickers.push(vn30Data[randomIndex]);
    } else {
      i--;
    }
  }
  return randomTickers;
}