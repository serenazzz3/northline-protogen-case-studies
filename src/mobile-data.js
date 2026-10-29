export function sampleEvents(now=new Date()) {
  const format = date => new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}).format(date);
  return [
    {id:'sample-1',machine:'PRESS-02',reason:'Equipment fault',duration:34,note:'Material feed cleared and restart confirmed.',time:format(new Date(now.getTime()-30*60000)),sample:true},
    {id:'sample-2',machine:'CNC-04',reason:'Changeover',duration:12,note:'Tooling checked before restart.',time:format(new Date(now.getTime()-80*60000)),sample:true}
  ];
}

export function summarizeDowntime(events) {
  return { count:events.length, minutes:events.reduce((sum,event)=>sum+Number(event.duration||0),0) };
}
