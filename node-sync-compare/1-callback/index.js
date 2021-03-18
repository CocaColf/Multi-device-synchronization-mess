const getData = require('./getData').getData;

getData('../myText.txt', (data) => {
    console.log(data);
});