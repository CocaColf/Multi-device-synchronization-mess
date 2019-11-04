import basketballJersey from  './basketball_jersey.png';

function createBj() {
    var img = new Image();
    img.src = basketballJersey;
    img.classList.add('bj');
    
    var root = document.getElementById('root');
    root.append(img);
}


export default createBj;