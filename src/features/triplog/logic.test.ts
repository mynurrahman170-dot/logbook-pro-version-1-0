import {describe,it,expect} from 'vitest';
import {fuelMath,ordinalLabel,rankPeople} from './logic';
describe('Transport rules',()=>{
 it('multiplies litres by manual unit price',()=>expect(fuelMath(50,105,40).total).toBe(5250));
 it('subtracts allowance from entered fuel without clamping',()=>expect(fuelMath(30,105,40).excess).toBe(-10));
 it('labels second and third trips',()=>{expect(ordinalLabel(2)).toBe('২য় ট্রিপ');expect(ordinalLabel(3)).toBe('তৃতীয় ট্রিপ');});
 it('ranks people highest to lowest',()=>expect(rankPeople([{supervisor_id:'a',driver_id:'x'},{supervisor_id:'b',driver_id:'y'},{supervisor_id:'b',driver_id:'x'}],'supervisor_id')).toEqual([{id:'b',count:2},{id:'a',count:1}]));
});

import {pairTrips,joinRoute,weekday} from './logic';
describe('trip reconciliation',()=>{
 const r=(id:string,d:string,t:string,dir:string,nh=false)=>({id,entry_date:d,entry_time:t,vehicle_id:'v',direction:dir,night_hold:nh,route_id:null});
 it('joins Kalkini-Dhaka + Dhaka-Madaripur into one route',()=>{expect(joinRoute('কালকিনি - ঢাকা','ঢাকা - মাদারীপুর')).toBe('কালকিনি - ঢাকা - মাদারীপুর');});
 it('pairs night-hold up trip with next-day down trip',()=>{const p=pairTrips([r('a','2026-10-20','20:00','up',true),r('b','2026-10-21','08:00','down')]);expect(p).toHaveLength(1);expect(p[0]?.down?.id).toBe('b');});
 it('does not pair across days without night hold',()=>{const p=pairTrips([r('a','2026-10-20','20:00','up'),r('b','2026-10-21','08:00','down')]);expect(p).toHaveLength(2);});
 it('weekday is derived from date',()=>{expect(weekday('2026-10-20','en')).toBe('Tuesday');});
});
import {expectedFuel as ef,variance as vr,bnTime as bt,sortRouteGroups as srg,groupSerials} from './logic';
import {test as t2,expect as e2} from 'vitest';
t2('expected fuel = km ÷ mileage',()=>{e2(ef(200,4)).toBe(50);e2(ef(100,0)).toBe(0);});
t2('variance colors: over red, equal blue, zero litre green negative',()=>{e2(vr(55,50).cls).toBe('var-over');e2(vr(50,50).cls).toBe('var-even');const z=vr(0,50);e2(z.cls).toBe('var-under');e2(z.diff).toBe(-50);});
t2('bengali 12h periods',()=>{e2(bt('05:30')).toBe('ভোর ৫:৩০');e2(bt('13:05')).toBe('দুপুর ১:০৫');e2(bt('20:00')).toBe('রাত ৮:০০');});
t2('trip list groups by route, time ascending within group',()=>{
 const rows=[
  {id:'1',route_id:'r2',entry_date:'2026-11-01',entry_time:'09:00'},
  {id:'2',route_id:'r1',entry_date:'2026-11-01',entry_time:'18:00'},
  {id:'3',route_id:'r1',entry_date:'2026-11-01',entry_time:'07:00'},
  {id:'4',route_id:'r1',entry_date:'2026-10-31',entry_time:'20:00'}];
 const out=srg(rows,rid=>rid==='r1'?'Madaripur - Gulistan':'Madaripur - Kadamtali');
 e2(out.map(x=>x.id)).toEqual(['4','3','2','1']);});
 t2('route numbers order schedules and share chronology across same-number routes',()=>{
  const rows=[{id:'a',route_id:'down-1',entry_date:'2026-11-02',entry_time:'09:00'},{id:'b',route_id:'route-2',entry_date:'2026-11-01',entry_time:'08:00'},{id:'c',route_id:'up-1',entry_date:'2026-11-01',entry_time:'07:00'}];
  const ordered=srg(rows,id=>id??'',id=>id==='route-2'?2:id?1:null);
  e2(ordered.map(x=>x.id)).toEqual(['c','a','b']);
  const serials=groupSerials(ordered,row=>row.route_id==='route-2'?'2':'1');
  e2([...serials.values()]).toEqual([1,2,1]);
 });
