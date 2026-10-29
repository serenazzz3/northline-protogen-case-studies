import test from 'node:test';
import assert from 'node:assert/strict';
import {operations, exceptions, filterOperations, summarizeOperations, qualityValue, plantRate, outputGapInsight, cellPerformance, defectMixTotals, defectMixContribution, lineShareOfPlantDefectReduction} from '../src/data.js';

test('shift and cell filters narrow the same rows used for summary metrics', () => {
  const rows = filterOperations(operations, 'night', 'B');
  assert.equal(rows.length, 1);
  assert.equal(rows[0].output, 445);
  assert.equal(summarizeOperations(rows).target, 520);
});

test('dashboard totals and exception counts are derived from scoped data', () => {
  const all = summarizeOperations(operations, exceptions);
  assert.equal(all.output, 2955);
  assert.equal(all.target, 3180);
  assert.equal(all.alertCount, 4);
  assert.equal(all.hourly.length, 6);
  const day = summarizeOperations(filterOperations(operations, 'day'));
  assert.equal(day.output, 1515);
  assert.ok(day.yieldRate < 98);
});

test('quality rate uses output denominator and tells the intended story', () => {
  assert.ok(Math.abs(qualityValue('B', 1) - 5.107) < 0.01);
  assert.ok(Math.abs(qualityValue('B', 5) - 1.613) < 0.01);
  assert.equal(qualityValue('B', 1, 'count'), 143);
  assert.equal(qualityValue('B', 5, 'count'), 50);
  assert.equal(plantRate(0).toFixed(1), '3.8');
  assert.equal(plantRate(5).toFixed(1), '2.1');
});

test('invalid story coordinates return no value', () => {
  assert.equal(qualityValue('missing', 1), null);
  assert.equal(qualityValue('A', 6), null);
});

test('the dashboard readout identifies the cell driving the true output gap',()=>{
  const insight=outputGapInsight(operations);
  assert.equal(insight.totalGap,225);
  assert.equal(insight.lead.cell,'B');
  assert.equal(insight.lead.gap,135);
  assert.equal(insight.share,60);
  assert.equal(cellPerformance(filterOperations(operations,'night','B')).length,1);
});

test('defect categories reconcile to the displayed Line B totals',()=>{
  assert.deepEqual(defectMixTotals(),{january:143,june:50});
  assert.deepEqual(defectMixContribution('Misalignment'),{drop:46,percentDrop:74,shareOfTotalDrop:49});
  assert.equal(lineShareOfPlantDefectReduction('B'),66);
});
