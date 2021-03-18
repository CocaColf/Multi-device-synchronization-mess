const getData = require('./getData').getData;

getData('../myText.txt')
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err) => {
        console.log(err);
    });