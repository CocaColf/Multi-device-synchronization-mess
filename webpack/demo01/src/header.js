function Header() {
    var root = document.getElementById('root');
    var header = document.createElement('div');
    header.innerHTML = '这是Header';
    root.append(header);
}

export default Header;