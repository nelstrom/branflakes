import Route from '@ember/routing/route';

export default class OneRoute extends Route {
  model() {
    window.myGlobalVariable = 'Uno';
  }
}
