const getData = require('./getData').getData;


async function loadData(filePath) {
    let data = await getData(filePath);
    return data.toString();
}

loadData('../myText.txt').then((data) => {
    console.log(data);
});