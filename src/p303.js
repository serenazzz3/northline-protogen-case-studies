import {validateDowntime} from './validation.js';
import {sampleEvents,summarizeDowntime} from './mobile-data.js';

const STORAGE_KEY='northline-downtime-events';
const form=document.querySelector('#downtime-form');
const list=document.querySelector('#event-list');
const success=document.querySelector('#save-success');
let events;
try {const stored=localStorage.getItem(STORAGE_KEY);events=stored===null?sampleEvents():JSON.parse(stored);if(!Array.isArray(events))events=sampleEvents();}
catch {events=sampleEvents();}

function setError(name,message){const input=form.elements[name];input.setAttribute('aria-invalid',String(Boolean(message)));document.querySelector(`#${name}-error`).textContent=message;}
function validate(){
  const errors=validateDowntime({machine:form.elements.machine.value,reason:form.elements.reason.value,duration:form.elements.duration.value});
  for(const name of ['machine','reason','duration'])setError(name,errors[name]||'');
  return Object.keys(errors).length===0;
}
function render(){
  const summary=summarizeDowntime(events);
  document.querySelector('#event-count').textContent=String(summary.count).padStart(2,'0');
  document.querySelector('#total-minutes').textContent=String(summary.minutes);
  document.querySelector('#summary-note').textContent=events.some(event=>event.sample)
    ? 'Example entries show the handoff context. Your new event joins this log.'
    : events.length ? 'These are your browser-local demo records. Save another stop to update the total.' : 'No events yet. Save a stop to begin this demo log.';
  list.replaceChildren();
  if(!events.length){const empty=document.createElement('div');empty.className='empty-state';empty.innerHTML='<strong>No downtime logged yet</strong><p>Saved events will appear here so you can confirm the record before moving on.</p>';list.append(empty);return;}
  events.slice(0,5).forEach(event=>{
    const card=document.createElement('div');card.className='event-item';
    const icon=document.createElement('span');icon.className='event-icon';icon.textContent='◷';icon.setAttribute('aria-hidden','true');
    const copy=document.createElement('div');copy.className='event-copy';const title=document.createElement('strong');title.textContent=`${event.machine} · ${event.reason}`;const subtitle=document.createElement('span');subtitle.textContent=event.sample?`Example · ${event.time}`:event.time;copy.append(title,subtitle);
    const duration=document.createElement('span');duration.className='event-duration';duration.textContent=`${event.duration} min`;
    card.append(icon,copy,duration);list.append(card);
    if(event.note){const note=document.createElement('div');note.className='event-note';note.textContent=event.note;list.append(note);}
  });
}
form.addEventListener('submit',event=>{
  event.preventDefault();success.hidden=true;
  if(!validate()){form.querySelector('[aria-invalid="true"]')?.focus();return;}
  const item={id:Date.now(),machine:form.elements.machine.value,reason:form.elements.reason.value,duration:Number(form.elements.duration.value),note:form.elements.note.value.trim(),time:new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}).format(new Date())};
  events.unshift(item);
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(events));}catch{ /* visible current-session record remains */ }
  form.reset();['machine','reason','duration'].forEach(name=>setError(name,''));
  success.textContent=`Saved ${item.duration} minutes of downtime for ${item.machine}. The event is now in Recent events.`;
  success.hidden=false;render();success.scrollIntoView({behavior:'smooth',block:'nearest'});
});
for(const name of ['machine','reason','duration'])form.elements[name].addEventListener('input',()=>setError(name,''));
document.querySelector('#reset-events').addEventListener('click',()=>{events=[];try{localStorage.setItem(STORAGE_KEY,'[]');}catch{}success.hidden=true;render();});
render();
const hour=new Date().getHours();
document.querySelector('#current-shift').textContent=hour>=6&&hour<18?'DAY SHIFT':'NIGHT SHIFT';
