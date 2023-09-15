import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class TwoRoute extends Route {
  @service('browser/window') window;

  model() {
    this.window.myGlobalVariable = 'Dos';
  }
}
