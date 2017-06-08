const assert = require('assert')
const commandGenerator = require('./generate-commands.js')
const electron = require('electron')
const BrowserWindow = electron.BrowserWindow

console.log("test-runner loaded");

exports.runTest = function(url, steps) {
    console.log("run test");
    console.log(url);
    let testCommands = commandGenerator.generateCommands(steps);

    let testWindow = new BrowserWindow({width: 800, height: 600});

    testWindow.loadURL(url);
}
