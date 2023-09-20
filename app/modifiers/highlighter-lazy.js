import { modifier } from 'ember-modifier';
// import { waitForPromise } from '@ember/test-waiters';

async function load() {
  await import('highlight.js/styles/github.css');
  return await import('highlight.js');
}

export default modifier(async (element) => {
  const module = await load();
  const hljs = module.default;

  hljs.highlightElement(element);
});
