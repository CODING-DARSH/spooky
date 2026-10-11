(()=>{let cyl,pt,rg,lmp,t0=0;
Story.add({id:'study',title:'Vane\'s Study',sub:'He never left this room',fog:[0x050806,.06],cam:[0,1.6,2],out:'dark',base:.2,goal:'Learn what Vane built',nudge:'The journal, the phone, and the wax cylinder on the phonograph.',tip:'Everything he wrote is still on the desk.',
build(g,s){room(g,8,4.5,8,-2,{wall:0x1e3024,floor:0x2a1a10});amb(g,0x0e1410,.4);lmp=lampOil(g,0,.98,-4.4);
const dk=table(g,0,-4.5,2.2,.9,.9,0x2a1808);add(dk,BX(.7,.7,.8),surf('wood',0x2a1808,1,1,.5),.7,.4,0);chair(g,0,-5.6,0,0x1a0e08);
const jn=grp(g,-.5,.95,-4.4);add(jn,BX(.5,.04,.36),M(0x3a1010,0,.7),0,.02,0);add(jn,BX(.46,.015,.32),M(0xcfc3a0,0,.9),0,.05,0);s.hot(jn,'journal','Vane\'s journal',.2);
pt=phone(g,.7,.95,-4.4);s.hot(pt,'phone','The telephone',.2);
const pg=phonograph(g,-2.8,-2.6);cyl=pg.cyl;s.hot(cyl,'cyl','Wax cylinder',.1);
shelf(g,-3.75,-3.5,Math.PI/2,2.8,2.8);shelf(g,3.75,-3.5,-Math.PI/2,2.8,2.8);
const fp=grp(g,0,0,-5.95);add(fp,BX(2.4,1.6,.4),surf('stone',0x181614,1,1),0,.8,0);add(fp,BX(1.5,1.1,.1),MB(0x020202),0,.55,.2);add(fp,BX(2.8,.15,.5),surf('wood',0x1c1008),0,1.7,0);rg=glow(g,0,.3,-5.6,0xff4a10,1.2);rg.material.opacity=.3;
s.hot(grp(g,3.9,1.1,-1),'door','Door to the east corridor',0,{go:true})},
on:{journal:()=>doc({t:'DR. ELIAS VANE — PRIVATE JOURNAL',b:'14 Oct 1897. The Apparatus works. When a mind attends to a thing without pause, the thing becomes more present. I have built a place that does nothing but attend.\n\n19 Oct. The staff no longer come to dinner. I find them in the wards, eyes open, quite content.\n\n26 Oct. It does not wish to be watched. It wishes to be the watcher. It requires a Witness, someone to lend it their sight.\n\nRULE: it walks only when unobserved. Keep it in your sight. Never let it reach you.\n\nI have sent for the first Witness. I wrote the invitation in my own hand. I think I am the Witness.',s:'— E.V.'}),
async phone(s){if(s.st.called)return say('Dead air. It is still listening.',{k:'whisper'});s.st.called=1;const c=await choose(['Answer','Let it ring']);
if(!c){await say('"It\'s me. '+S.name+'. Listen. We don\'t have long."',{k:'voice',hold:1200});await say('"Take the lens from the Ward. The mirror lies without it."',{k:'voice',hold:1200});await say('"And when it asks you to sit — don\'t. Or you send the next one."',{k:'voice'});fear(.15)}
else{for(let i=0;i<3;i++){ring();await sleep(700)}await say('The line clicks. A recording plays. Your own voice, hoarse: "Take the lens from the Ward."',{k:'whisper',hold:1800})}},
cyl:async s=>{cyl.visible=false;give('cyl');say('A label in Vane\'s hand: THE CLOSING. Do not play until the end.',{k:'whisper'})}},
enter(s){s.st.hot=1},
tick(dt,T,s){lmp.intensity=1.8*(.8+.2*Math.sin(T*9)*Math.sin(T*4));rg.scale.setScalar(1.1+.2*Math.sin(T*6));if(!s.st.called&&T-t0>2){t0=T;ring()}}})})();
