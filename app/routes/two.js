import Route from '@ember/routing/route';

export default class TwoRoute extends Route {
  model() {
    window.myGlobalVariable = 'Hi!';
  }
}
