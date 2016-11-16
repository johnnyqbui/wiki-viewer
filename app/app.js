require('./styles/style.scss');
var angular = require('angular');
var ngAnimate = require('angular-animate');
var ngSanitize = require('angular-sanitize');
var module = angular.module('wikiApp', ['ngAnimate', 'ngSanitize']);
// ngSanitize to allow images to be loaded

require('./controller.js');
require('./factory.js');