import test from 'node:test';
import assert from 'node:assert/strict';
import {sampleEvents,summarizeDowntime} from '../src/mobile-data.js';

test('sample events provide realistic context without claiming a live feed',()=>{
  const events=sampleEvents(new Date('2026-10-28T20:00:00Z'));
  assert.equal(events.length,2);
  assert.ok(events.every(event=>event.sample));
  assert.deepEqual(summarizeDowntime(events),{count:2,minutes:46});
});

test('a saved event changes the visible activity totals',()=>{
  const events=[...sampleEvents(new Date('2026-10-28T20:00:00Z')),{duration:12}];
  assert.deepEqual(summarizeDowntime(events),{count:3,minutes:58});
  assert.deepEqual(summarizeDowntime([]),{count:0,minutes:0});
});
