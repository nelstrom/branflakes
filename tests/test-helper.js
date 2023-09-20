import Application from 'branflakes/app';
import config from 'branflakes/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

// QUnit.config.reorder = false;

QUnit.config.urlConfig.push({
  id: 'seed',
  label: 'Randomize',
  tooltip: 'When checked, tests run in a random order',
});

start();
