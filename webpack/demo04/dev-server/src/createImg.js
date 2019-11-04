import basketballJersey from  './basketball_jersey.png';
import style from './index.css';

function createBj() {
    var img = new Image();
    img.src = basketballJersey;
    img.classList.add(style.bj);
    
    var root = document.getElementById('root');
    root.append(img);
}


export default createBj;