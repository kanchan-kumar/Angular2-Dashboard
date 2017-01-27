#!/usr/bin/env node

var program = require('commander');
var exec = require('child_process').exec;
var fs = require('fs');

var run = function(cmd) {
    var child = exec(cmd, function(error, stdout, stderr) {
        if (stderr !== null) {
            console.log('' + stderr);
        }
        if (stdout !== null) {
            console.log('' + stdout);
        }
        if (error !== null) {
            console.log('' + error);
        }
    });
};

var depNameArr = ['angular2-grid', 'angular2-logger'];
var depPathArr = ['https://github.com/BTMorton/angular2-grid.git', 'https://github.com/code-chunks/angular2-logger.git'];
var path = './src/vendors/';

try {
    for (var i = 0; i < depNameArr.length; i++) {
        //Is it a directory?
        if (fs.existsSync(path + depNameArr[i])) {
            console.info('Dependency ' + depNameArr[i] + ' Already available.');
        } else {
            run("git clone " + depPathArr[i] + " " + path + depNameArr[i]);
        }
    }
} catch (e) {
    console.error(e);
}