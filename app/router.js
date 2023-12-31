import EmberRouter from '@ember/routing/router';
import config from 'branflakes/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('one');
  this.route('two');
  this.route('three');
  this.route('information');
});
