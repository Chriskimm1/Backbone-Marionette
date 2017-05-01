import 'babel-polyfill';
import $ from 'jquery'
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import '../styles/index.css';

import Router from './router';

var App = new Marionette.Application({
  onStart: function(options) {
    var router = new Router({
      pushState: true,
    });

    Backbone.history.start();
  }
});

$(document).ready(function(){
  App.start();
});
