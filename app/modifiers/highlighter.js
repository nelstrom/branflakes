import { modifier } from 'ember-modifier';
import 'highlight.js/styles/github.css';

export default modifier(async function highlighter(element) {
  const module = await import('highlight.js');
  const hljs = module.default;

  hljs.highlightElement(element);
});
