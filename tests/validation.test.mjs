import test from 'node:test';
import assert from 'node:assert/strict';
import {validateDowntime} from '../src/validation.js';

test('downtime form requires a machine, reason, and duration',()=>{
  assert.deepEqual(Object.keys(validateDowntime({machine:'',reason:'',duration:''})),['machine','reason','duration']);
});

test('duration must be a whole number within a shift-safe range',()=>{
  for(const duration of ['0','-2','3.5','481','words'])assert.ok(validateDowntime({machine:'CNC-04',reason:'Other',duration}).duration);
  assert.deepEqual(validateDowntime({machine:'PRESS-02',reason:'Equipment fault',duration:'34'}),{});
});
