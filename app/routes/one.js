import Route from '@ember/routing/route';
import { service } from '@ember/service';
export default class OneRoute extends Route {
  // @service('browser/window') window;

  model() {
    window.myGlobalVariable = 'Hello!';
  }
}
