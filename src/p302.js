import {quality, qualityValue, storyMonths, plantRate} from './data.js';

const chart=document.querySelector('#story-chart');
const detail=document.querySelector('#chart-detail');
const colors={A:'#538c87',B:'#d66f55',C:'#9bad74'};
let selectedLine='all',measure='rate';

function svg(tag,attributes={}) {const element=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [key,value] of Object.entries(attributes))element.setAttribute(key,String(value));return element;}
function format(value){return measure==='rate'?`${value.toFixed(1)}%`:`${Math.round(value)} defects`;}
function showExact(line,index){detail.textContent=`${storyMonths[index]} · Line ${line}: ${format(qualityValue(line,index,measure))} from ${quality[line].output[index].toLocaleString()} units produced.`;}

function drawChart(){
  chart.querySelectorAll('g[data-generated]').forEach(el=>el.remove());
  const layer=svg('g',{'data-generated':'true'});chart.append(layer);
  const left=52,right=720,top=28,bottom=298;
  const max=measure==='rate'?6:160;
  const ticks=measure==='rate'?[0,1.5,3,4.5,6]:[0,40,80,120,160];
  ticks.forEach(tick=>{
    const y=bottom-(tick/max)*(bottom-top);
    layer.append(svg('line',{x1:left,y1:y,x2:right,y2:y,class:'grid-line'}));
    const label=svg('text',{x:4,y:y+4,class:'axis-label'});label.textContent=measure==='rate'?`${tick}%`:tick;layer.append(label);
  });
  storyMonths.forEach((month,index)=>{const x=left+(right-left)*index/5;const label=svg('text',{x:x-10,y:335,class:'axis-label'});label.textContent=month;layer.append(label);});
  const markerX=left+(right-left)*2/5;
  layer.append(svg('line',{x1:markerX,y1:top,x2:markerX,y2:bottom,stroke:'#c9a994','stroke-width':2,'stroke-dasharray':'5 6'}));
  const markerLabel=svg('text',{x:markerX+8,y:43,class:'axis-label'});markerLabel.textContent='INSPECTION CHANGE';layer.append(markerLabel);
  for(const line of ['A','B','C']){
    const isMuted=selectedLine!=='all'&&selectedLine!==line;
    const points=storyMonths.map((_,i)=>({x:left+(right-left)*i/5,y:bottom-(qualityValue(line,i,measure)/max)*(bottom-top)}));
    const path=svg('path',{d:points.map((point,i)=>`${i?'L':'M'} ${point.x} ${point.y}`).join(' '),class:'line-path',stroke:colors[line],opacity:isMuted?.16:1});layer.append(path);
    points.forEach((point,index)=>{
      const circle=svg('circle',{cx:point.x,cy:point.y,r:isMuted?5:7,fill:colors[line],opacity:isMuted?.25:1,class:'point',tabindex:'0',role:'button','aria-label':`${storyMonths[index]} Line ${line}, ${format(qualityValue(line,index,measure))}`});
      const title=svg('title');title.textContent=`${storyMonths[index]} Line ${line}: ${format(qualityValue(line,index,measure))}`;circle.append(title);
      circle.addEventListener('mouseenter',()=>showExact(line,index));circle.addEventListener('focus',()=>showExact(line,index));circle.addEventListener('click',()=>showExact(line,index));
      circle.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();showExact(line,index);}});
      layer.append(circle);
    });
  }
  chart.querySelector('#chart-svg-title').textContent=`Monthly ${measure==='rate'?'defect rate':'defect count'} by production line`;
  document.querySelector('#chart-measure-label').textContent=measure==='rate'?'DEFECT RATE · % OF OUTPUT':'DEFECT COUNT · ITEMS';
  const lineText=selectedLine==='all'?'all lines':`Line ${selectedLine}`;
  document.querySelector('#chart-subtitle').textContent=`Monthly quality for ${lineText}`;
  if(selectedLine==='B')document.querySelector('#story-takeaway p').textContent=measure==='rate'?'Line B fell from 5.1% in February to 1.6% in June, the sharpest rate change.':'Line B fell from 143 defects in February to 50 in June, even as its output rose.';
  else if(selectedLine==='all')document.querySelector('#story-takeaway p').textContent=measure==='rate'?'Line B moved from 5.1% in February to 1.6% in June — the steepest change in the plant.':'Plant defects fell from 343 in January to 202 in June. Compare rate to account for changing output.';
  else document.querySelector('#story-takeaway p').textContent=`Line ${selectedLine} improved gradually from ${format(qualityValue(selectedLine,0,measure))} in January to ${format(qualityValue(selectedLine,5,measure))} in June.`;
  detail.textContent='Select or focus a chart point for its exact value.';
}

function populateTable(){const body=document.querySelector('#story-data-table tbody');for(let i=0;i<storyMonths.length;i++){for(const line of ['A','B','C']){const row=document.createElement('tr');for(const value of [storyMonths[i],`Line ${line}`,quality[line].output[i].toLocaleString(),quality[line].defects[i],`${qualityValue(line,i).toFixed(1)}%`]){const cell=document.createElement('td');cell.textContent=value;row.append(cell);}body.append(row);}}}

document.querySelectorAll('#line-controls button').forEach(button=>button.addEventListener('click',()=>{selectedLine=button.dataset.line;document.querySelectorAll('#line-controls button').forEach(item=>{const active=item===button;item.classList.toggle('selected',active);item.setAttribute('aria-pressed',active);});drawChart();}));
document.querySelectorAll('#measure-controls button').forEach(button=>button.addEventListener('click',()=>{measure=button.dataset.measure;document.querySelectorAll('#measure-controls button').forEach(item=>{const active=item===button;item.classList.toggle('selected',active);item.setAttribute('aria-pressed',active);});drawChart();}));

const revealSections=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});revealSections.forEach(section=>observer.observe(section));}else revealSections.forEach(section=>section.classList.add('visible'));

populateTable();drawChart();
document.querySelector('.chapter-stat p').textContent=`January to June · down ${(plantRate(0)-plantRate(5)).toFixed(1)} percentage points`;
