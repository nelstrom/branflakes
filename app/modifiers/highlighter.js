import { modifier } from 'ember-modifier';
import 'highlight.js/styles/github.css';
import { waitForPromise } from '@ember/test-waiters';

export default modifier(async function highlighter(element) {
  const module = await waitForPromise(import('highlight.js'));
  const hljs = module.default;

  hljs.highlightElement(element);
});
