const remote = require('electron').remote;
const buttonElement = document.getElementById("button");

buttonElement.addEventListener("click", function() {
    remote.app.emit("run-test", "553");
})