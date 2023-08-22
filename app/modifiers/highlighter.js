// import { waitForPromise } from '@ember/test-waiters';
import { modifier } from 'ember-modifier';
import { flakeTime } from '../utils/timeout';

async function load() {
  await flakeTime({ label: 'import', probability: 0.5 });
  await import('highlight.js/styles/github.css');
  return await import('highlight.js');
}

export default modifier(async function highlighter(element) {
  // const module = await waitForPromise(load());
  const module = await load();
  const hljs = module.default;

  hljs.highlightElement(element);
});
