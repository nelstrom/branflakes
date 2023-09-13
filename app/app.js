import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'branflakes/config/environment';
import { service } from '@ember/service';

// window.myGlobalVariable = 'Hello!';

export default class App extends Application {
  @service('browser/window') window;

  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
