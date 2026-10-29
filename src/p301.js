import {operations, exceptions, filterOperations, summarizeOperations, cellPerformance, outputGapInsight} from './data.js';

const shiftSelect = document.querySelector('#shift-filter');
const cellSelect = document.querySelector('#cell-filter');
const queue = document.querySelector('#exception-list');
const ACK_KEY = 'northline-acknowledged-exceptions';
let acknowledged;
try { acknowledged = new Set(JSON.parse(localStorage.getItem(ACK_KEY) || '[]')); }
catch { acknowledged = new Set(); }

function scopedIssues() {
  return exceptions.filter(item => (shiftSelect.value === 'all' || item.shift === shiftSelect.value) && (cellSelect.value === 'all' || item.cell === cellSelect.value) && !acknowledged.has(item.id));
}

function showMetrics(summary, rowCount) {
  const pct = summary.target ? summary.output / summary.target * 100 : 0;
  document.querySelector('#output-value').textContent = summary.output.toLocaleString();
  document.querySelector('#output-detail').textContent = `${Math.round(pct)}% of ${summary.target.toLocaleString()} target`;
  document.querySelector('#output-track').style.width = `${Math.min(pct,100)}%`;
  document.querySelector('#yield-value').textContent = `${summary.yieldRate.toFixed(1)}%`;
  const difference = summary.yieldRate - 98;
  document.querySelector('#yield-detail').textContent = `${Math.abs(difference).toFixed(1)} pts ${difference >= 0 ? 'above' : 'below'} target`;
  document.querySelector('#yield-track').style.width = `${summary.yieldRate}%`;
  document.querySelector('#downtime-value').textContent = `${summary.downtime}m`;
  document.querySelector('#downtime-detail').textContent = `${Math.max(0,summary.downtime - rowCount * 20)}m over guide`;
  document.querySelector('#downtime-track').style.width = `${Math.min(summary.downtime / (rowCount * 50) * 100,100)}%`;
  document.querySelector('#alerts-value').textContent = String(summary.alertCount).padStart(2,'0');
  document.querySelector('#alerts-detail').textContent = `${summary.alertCount} ${summary.alertCount === 1 ? 'item' : 'items'} to review`;
  document.querySelector('#alerts-track').style.width = `${Math.min(summary.alertCount * 25,100)}%`;
}

function renderQueue(issues) {
  document.querySelector('#queue-count').textContent = issues.length;
  queue.replaceChildren();
  if (!issues.length) {
    const empty = document.createElement('div'); empty.className='empty-state';
    empty.innerHTML='<strong>All clear in this view</strong><p>No open exceptions match these filters. Change the scope or reset the demo to review more.</p>';
    queue.append(empty); return;
  }
  issues.forEach(issue => {
    const item=document.createElement('article'); item.className='exception-item';
    const summary=document.createElement('button'); summary.className='exception-summary'; summary.type='button'; summary.setAttribute('aria-expanded','false');
    const marker=document.createElement('span'); marker.className=`priority-marker ${issue.severity === 'medium' ? 'medium' : ''}`; marker.setAttribute('aria-hidden','true');
    const copy=document.createElement('span'); copy.className='exception-copy';
    const title=document.createElement('strong'); title.textContent=issue.title;
    const meta=document.createElement('small'); meta.textContent=issue.meta;
    copy.append(title,meta);
    const chevron=document.createElement('span'); chevron.className='exception-chevron'; chevron.textContent='⌄'; chevron.setAttribute('aria-hidden','true');
    summary.append(marker,copy,chevron);
    const detail=document.createElement('div'); detail.className='exception-detail';
    const context=document.createElement('p'); context.textContent=issue.detail;
    const action=document.createElement('button'); action.type='button'; action.textContent='Acknowledge & take ownership';
    action.addEventListener('click',()=>{acknowledged.add(issue.id);try{localStorage.setItem(ACK_KEY,JSON.stringify([...acknowledged]));}catch{}render();});
    detail.append(context,action); item.append(summary,detail); queue.append(item);
    summary.addEventListener('click',()=>{const open=item.classList.toggle('expanded');summary.setAttribute('aria-expanded',String(open));});
  });
}

function renderRhythm(summary) {
  const chart=document.querySelector('#rhythm-chart'); chart.replaceChildren();
  const target=summary.target/6;
  const max=Math.max(...summary.hourly,target,1)*1.12;
  summary.hourly.forEach((value,index)=>{
    const group=document.createElement('div');group.className='bar-group';
    const pace=document.createElement('div');pace.className='bar';pace.style.height=`${target/max*100}%`;
    const actual=document.createElement('div');actual.className='bar actual';actual.style.height=`${value/max*100}%`;
    const label=document.createElement('span');label.className='bar-label';label.textContent=`H${index+1}`;
    group.append(pace,actual,label);chart.append(group);
  });
  chart.setAttribute('aria-label',`Hourly output ${summary.hourly.join(', ')} units. Even pace ${Math.round(target)} units per hour.`);
  const last=summary.hourly.at(-1),first=summary.hourly[0];
  document.querySelector('#rhythm-insight').textContent=last >= first ? `Output rose from ${first} to ${last} units per hour across the selected scope. Review exceptions before assuming the pace will hold.` : `Output eased from ${first} to ${last} units per hour. Review the queue for an explanation.`;
}

function renderReadout(rows,issues) {
  const {totalGap,lead,share}=outputGapInsight(rows);
  const title=document.querySelector('#readout-title');
  const copy=document.querySelector('#readout-detail');
  if(!totalGap){title.textContent='The selected scope is on pace.';copy.textContent='Output has met its planned target. Keep reviewing quality and open exceptions before closing the shift.';return;}
  title.textContent=rows.some(row=>row.cell!==lead.cell) ? `Cell ${lead.cell} drives ${share}% of the output gap.` : `Cell ${lead.cell} is ${lead.gap} units short of target.`;
  const nextStep=issues.some(issue=>issue.cell===lead.cell) ? `Open the Cell ${lead.cell} exception before shifting capacity.` : `Review the Cell ${lead.cell} shift log before shifting capacity.`;
  copy.textContent=`The selected scope is ${totalGap} units below plan. Cell ${lead.cell} accounts for ${lead.gap} of those units and ${lead.downtime} minutes of recorded downtime. ${nextStep}`;
}

function renderCells(rows) {
  const body=document.querySelector('#cell-performance-rows');body.replaceChildren();
  for(const item of cellPerformance(rows)){
    const row=document.createElement('tr');
    const cells=[`Cell ${item.cell}`,`${item.output.toLocaleString()} / ${item.target.toLocaleString()}`,`${Math.round(item.output/item.target*100)}%`,`${item.yieldRate.toFixed(1)}%`,`${item.downtime} min`];
    cells.forEach((value,index)=>{const cell=document.createElement(index?'td':'th');if(!index)cell.setAttribute('scope','row');cell.textContent=value;row.append(cell);});
    body.append(row);
  }
}

function render() {
  const rows=filterOperations(operations,shiftSelect.value,cellSelect.value);
  const issues=scopedIssues();
  const summary=summarizeOperations(rows,issues);
  document.querySelector('#scope-label').textContent=`${shiftSelect.value === 'all' ? 'ALL SHIFTS' : shiftSelect.value.toUpperCase()+' SHIFT'} · ${cellSelect.value === 'all' ? 'ALL CELLS' : 'CELL '+cellSelect.value}`;
  showMetrics(summary,rows.length);renderReadout(rows,issues);renderQueue(issues);renderRhythm(summary);renderCells(rows);
}

shiftSelect.addEventListener('change',render);cellSelect.addEventListener('change',render);
document.querySelector('#reset-alerts').addEventListener('click',()=>{acknowledged.clear();try{localStorage.removeItem(ACK_KEY);}catch{}render();});
render();
