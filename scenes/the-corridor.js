(()=>{let ls5=[],sil,aw=0,sw=0,dr2;
const faceEvent=s=>{if(s.st.face)return;s.st.face=1;sil.visible=false;jump();scratch();setTimeout(()=>say('It had your face.',{k:'red',hold:1500}),450)};
Story.add({id:'corridor',title:'The East Corridor',sub:'It only moves when you forget it exists',fog:[0x030202,.07],cam:[0,1.6,0],out:'dark',base:.35,goal:'Do not lose sight of it',nudge:'Read the torn page on the wall. Then look away, and look back.',tip:'Push the cursor to a screen edge to look away. Then look back.',
build(g,s){room(g,3.4,3.8,38,-17,{wall:0x2a1e1a,floor:0x120a06});amb(g,0x120a06,.3);
add(g,PL(1.3,38),surf('cloth',0x4a0c10,1,12,1),0,.02,-17).rotation.x=-Math.PI/2;
[-3,-9,-15,-21,-27].forEach((z,i)=>{[-1.55,1.55].forEach(x=>{const b=lathe([[0,0],[.05,0],[.03,.1],[.07,.2],[.05,.26],[0,.26]],BRASS(),8);b.position.set(x,1.9,z);b.rotation.z=x<0?-.5:.5;g.add(b);});ls5.push(light(g,0xffb060,1.2,9,0,3,z));glow(g,-1.4,2.2,z,0xffb060,.5);glow(g,1.4,2.2,z,0xffb060,.5);if(i%2)frameOf(g,i%4==1?-1.62:1.62,1.9,z+3,.7,.9).rotation.y=i%4==1?Math.PI/2:-Math.PI/2});
add(g,PL(2,3.6),MB(0x3a2616),0,1.8,-35.9);light(g,0xff9a50,2.6,9,0,1.8,-33);
sil=grp(g,0,0,-27);const bm=M(0x050505,0x000000,.6);const tor=lathe([[0,0],[.22,0],[.25,.9],[.3,1.5],[.2,1.9],[0,1.95]],bm,12);tor.position.y=.4;sil.add(tor);add(sil,SP(.2,14),bm,0,2.55,.05).scale.set(.9,1.3,.9);[.42,-.42].forEach(x=>{const a=add(sil,CY(.04,.03,1.9,6),bm,x,1.45,0);a.rotation.z=x*.2});[.12,-.12].forEach(x=>add(sil,CY(.07,.04,.5,6),bm,x,.2,0));
dr2=grp(g,1.68,1.15,-9);add(dr2,PL(1,2.3),MB(0));dr2.rotation.y=-Math.PI/2;
const dy=grp(g,-1.68,1.4,-4.2);dy.rotation.y=Math.PI/2;add(dy,PL(.5,.66),M(0xcbb88a,EM,.9));
s.hot(dy,'diary','Torn page',0);s.hot(dr2,'scratch','Scratching, behind the wall',0,{clue:false});
const dd=grp(g,0,0,-35.8);[-.5,.5].forEach(x=>add(dd,BX(.95,3.3,.08),surf('wood',0x24140a,1,1,.5),x,1.65,0));s.hot(dd,'end','The ward doors',1.6,{go:true})},
on:{diary:()=>doc({t:'A PAGE, TORN FROM SOMETHING',b:'If you can see it, it cannot move.\nIf you look away, it will use the time.\n\nDo not run. It runs only in the dark behind your eyes.\nDo not close your eyes. It will have all the time it needs.\n\nWhen it is close enough to touch, it will want to show you a face.\nYou will know the face.',s:'— E.V.'}),
scratch:()=>{scratch();say('Something inside is writing "'+S.name+'" over and over.',{k:'whisper'})}},
gate:s=>s.st.face,
enter(s){if(!s.st.t2)s.st.t2=performance.now();sil.visible=!s.st.face;ls5.forEach(l=>l.intensity=1.2);wind(.1)},
tick(dt,T,s){if(!s.st.face&&!S.busy&&!S.paused){if(Math.abs(yaw)>.8){aw+=dt;if(aw>.35&&!sw){sw=1;scratch()}}else{if(aw>.8){s.st.mv=(s.st.mv||0)+1;fear(.12);if(s.st.mv>=3)faceEvent(s);else{sil.position.z+=8;creak()}}aw=0;sw=0}if(performance.now()-s.st.t2>28000)faceEvent(s)}
ls5.forEach((l,i)=>{if(!s.st.dead)l.intensity=1.2*(.85+.15*Math.sin(T*(8+i)))})},
async leave(s){s.st.dead=1;for(const l of ls5){l.intensity=0;await sleep(220)}await moveTo(0,1.6,-13,1500)}})})();
