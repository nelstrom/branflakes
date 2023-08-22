// import { waitForPromise } from '@ember/test-waiters';
import { modifier } from 'ember-modifier';
import 'highlight.js/styles/github.css';
import { flakeTime } from '../utils/timeout';

export default modifier(async function highlighter(element) {
  // await waitForPromise(flakeTime());
  // const module = await waitForPromise(import('highlight.js'));
  await flakeTime();
  const module = await import('highlight.js');
  const hljs = module.default;

  hljs.highlightElement(element);
});
