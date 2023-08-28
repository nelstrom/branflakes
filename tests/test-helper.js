import Application from 'branflakes/app';
import config from 'branflakes/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

QUnit.config.urlConfig.push({
  id: 'seed',
  label: 'Randomize',
  tooltip: 'When checked, tests run in a random order',
});

if (QUnit.config.seed) {
  const { origin, pathname, search } = window.location;
  const params = new URLSearchParams(search);
  params.set('seed', QUnit.config.seed);
  const link = new URL(`${origin}${pathname}?${params}`);
  console.log('Using seed: ', QUnit.config.seed);
  console.log('Click link to re-run tests with same seed: ', link.href);
}

start();
