import { modifier } from 'ember-modifier';

async function load() {
  await import('highlight.js/styles/github.css');
  return await import('highlight.js');
}

export default modifier(async function highlighter(element) {
  const module = await load();
  const hljs = module.default;

  hljs.highlightElement(element);
});
