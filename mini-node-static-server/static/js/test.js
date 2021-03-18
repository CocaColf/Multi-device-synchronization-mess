window.onload = function () {
    alert('欢迎使用这个Node静态服务器');
}

document.getElementsByTagName('button')[0].onclick = function () {
    window.location.href = 'http://localhost:4300/test.html';
}