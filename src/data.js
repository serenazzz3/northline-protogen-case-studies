export const operations = [
  { cell:'A', shift:'day', output:520, target:540, yieldRate:98.4, downtime:12, hourly:[75,80,86,91,94,94] },
  { cell:'B', shift:'day', output:480, target:540, yieldRate:96.1, downtime:34, hourly:[73,79,76,82,84,86] },
  { cell:'C', shift:'day', output:515, target:540, yieldRate:97.6, downtime:18, hourly:[76,83,88,90,90,88] },
  { cell:'A', shift:'night', output:495, target:520, yieldRate:97.9, downtime:20, hourly:[69,76,81,85,91,93] },
  { cell:'B', shift:'night', output:445, target:520, yieldRate:95.8, downtime:44, hourly:[63,69,73,77,80,83] },
  { cell:'C', shift:'night', output:500, target:520, yieldRate:98.1, downtime:15, hourly:[70,78,83,87,90,92] }
];

export const exceptions = [
  { id:'e1', cell:'B', shift:'day', severity:'high', title:'Cell B below output pace', meta:'480 / 540 units · Day shift', detail:'Output is 60 units below the planned pace. Check the material feed and the 34-minute stop recorded at PRESS-02.' },
  { id:'e2', cell:'B', shift:'night', severity:'high', title:'Yield below quality threshold', meta:'95.8% first pass yield · Night shift', detail:'Cell B is 2.2 points below the 98% target. Review recent inspection rejects before the next handoff.' },
  { id:'e3', cell:'C', shift:'day', severity:'medium', title:'Changeover ran longer than planned', meta:'18 minutes downtime · Day shift', detail:'Cell C lost 18 minutes during changeover. Confirm the setup checklist is ready for the next run.' },
  { id:'e4', cell:'A', shift:'night', severity:'medium', title:'Maintenance follow-up due', meta:'CNC-04 · Night shift', detail:'The overnight team flagged an intermittent sensor fault. Assign a maintenance check before the next day shift.' }
];

export const storyMonths = ['Jan','Feb','Mar','Apr','May','Jun'];
export const quality = {
  A:{ output:[3000,3040,3090,3140,3170,3200], defects:[105,102,98,92,86,80] },
  B:{ output:[2800,2800,2900,2950,3050,3100], defects:[143,143,110,86,65,50] },
  C:{ output:[3200,3220,3240,3260,3280,3300], defects:[95,92,87,82,77,72] }
};

export function filterOperations(rows, shift='all', cell='all') {
  return rows.filter(row => (shift === 'all' || row.shift === shift) && (cell === 'all' || row.cell === cell));
}

export function summarizeOperations(rows, issues=[]) {
  const output = rows.reduce((sum,row) => sum + row.output, 0);
  const target = rows.reduce((sum,row) => sum + row.target, 0);
  const downtime = rows.reduce((sum,row) => sum + row.downtime, 0);
  const weightedYield = output ? rows.reduce((sum,row) => sum + row.yieldRate * row.output, 0) / output : 0;
  const hourly = Array.from({length:6},(_,i) => rows.reduce((sum,row) => sum + row.hourly[i],0));
  return { output, target, downtime, yieldRate:weightedYield, alertCount:issues.length, hourly };
}

export function qualityValue(line, monthIndex, measure='rate') {
  const item = quality[line];
  if (!item || monthIndex < 0 || monthIndex >= storyMonths.length) return null;
  return measure === 'count' ? item.defects[monthIndex] : item.defects[monthIndex] / item.output[monthIndex] * 100;
}

export function plantRate(monthIndex) {
  const lines = Object.values(quality);
  const defects = lines.reduce((sum,line) => sum + line.defects[monthIndex],0);
  const output = lines.reduce((sum,line) => sum + line.output[monthIndex],0);
  return defects / output * 100;
}
