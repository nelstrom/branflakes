import { modifier } from 'ember-modifier';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default modifier((element) => {
  hljs.highlightElement(element);
});
