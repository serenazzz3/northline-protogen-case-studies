export function validateDowntime({machine,reason,duration}){
  const errors={};
  if(!machine)errors.machine='Choose a machine to continue.';
  if(!reason)errors.reason='Choose a reason to continue.';
  const minutes=Number(duration);
  if(duration===''||!Number.isInteger(minutes)||minutes<1||minutes>480)errors.duration='Enter a whole number from 1 to 480 minutes.';
  return errors;
}
