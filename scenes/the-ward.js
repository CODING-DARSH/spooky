(()=>{let eyes=[],ls6=[],wp=new THREE.Vector3(),nt=0;
Story.add({id:'ward',title:'The Observation Ward',sub:'Forty-one beds. Forty-two.',fog:[0x040708,.075],cam:[0,1.6,2],out:'dark',base:.5,goal:'Find what the ward remembers',nudge:'Bed 42, the jars, and the brass cabinet at the far end.',tip:'The eyes in the jars are following your light.',
build(g,s){room(g,6.4,4.2,24,-10,{wall:0x24302c,floor:0x1a1c1a,fk:'stone'});amb(g,0x0c1214,.35);
for(let i=0;i<5;i++){[-1,1].forEach(sd=>{bed(g,sd*2.2,-3.5-i*3.6,sd<0?Math.PI/2:-Math.PI/2)})}
[-3,-9,-15,-21].forEach(z=>{const l=light(g,0xa8d0c8,1.3,10,0,3.8,z);ls6.push(l);add(g,CY(.02,.02,.4,5),IRON(),0,4,z);add(g,lathe([[0,0],[.18,0],[.3,.12],[0,.2]],IRON()),0,3.7,z)});
const ch=grp(g,-2.2,.55,-18.7);ch.rotation.y=Math.PI/2;const cb=add(ch,BX(.05,.02,.02),M(0));const pt=grp(g,-2.9,.95,-18.7);add(pt,BX(.04,.3,.22),M(0xcbb88a,EM,.9));pt.rotation.y=0;s.hot(pt,'chart','Chart on bed 42',.2);
const sh=grp(g,2.7,0,-23);add(sh,BX(.3,.05,4),surf('wood',0x1c1008),0,1.3,0);add(sh,BX(.3,.05,4),surf('wood',0x1c1008),0,2.2,0);for(let i=0;i<5;i++){[1.3,2.2].forEach(y=>{const j=jarEye(sh,0,y+.28,-1.8+i*.8);eyes.push(j.eye)})}s.hot(sh,'jars','Jars of eyes',1.8);
const cabm=surf('wood',0x1c1008,1,1,.4),cab=grp(g,-2.6,0,-23);add(cab,BX(.6,2.2,1.4),cabm,0,1.1,0);const gl=add(cab,BX(.02,1.8,1.2),new THREE.MeshStandardMaterial({color:0x2a4a40,transparent:true,opacity:.3,roughness:.05}),.31,1.1,0);gl.castShadow=false;add(cab,BX(.4,.4,.3),BRASS(),.2,1.1,.2);s.hot(cab,'cabinet','Brass cabinet',1.2);
const sc2=grp(g,0,0,-22.6);const lt=M(0x2a0a0a,0,.6);add(sc2,BX(.7,.15,1.1),lt,0,.55,0);add(sc2,BX(.7,.9,.15),lt,0,1,.5);add(sc2,BX(.35,.2,.2),lt,0,1.65,.52);add(sc2,CY(.03,.03,.5,6),IRON(),0,.28,0);const tr=add(sc2,new THREE.TorusGeometry(.4,.03,8,28),BRASS(),0,1.45,-.35);tr.rotation.x=.4;s.hot(sc2,'chair','The surgical chair',1.1,{clue:false});
const dd=grp(g,0,0,-21.9);dd.visible=true;s.hot(grp(g,0,1.4,-21.8),'door','Door: OBSERVATION',0,{go:true})},
on:{chart:()=>doc({t:'PATIENT 42',b:'Name: '+S.name+'\nAdmitted: tonight, 11:58\nCondition: Observed\nComplaint: Believes they came here by choice.\n\nNotes: Pupils responsive. Subject has not blinked since the gate.\nPrognosis: Excellent. Witnesses always are.',s:''}),
jars:()=>{fear(.12);say('Every eye in the room has turned to look at you. One of them is still blinking.')},
cabinet:async s=>{if(has('lens'))return say('Velvet, and the shape of where the lens was.',{k:'whisper'});unlock();await say('The Iris Key fits. Same key. Same eye.',{k:'whisper',hold:900});give('lens');fear(.1)},
chair:()=>say('The straps are worn smooth. Forty-one grooves for forty-one pairs of wrists.')},
enter(){wind(.15)},
tick(dt,T,s){eyes.forEach(e=>{if(e.parent&&e.parent.parent&&e.parent.parent.parent&&e.parent.parent.parent.visible)e.lookAt(cam.position)});ls6.forEach((l,i)=>l.intensity=1.3*(Math.sin(T*(11+i)+i)>-.93?1:.15));if(T-nt>1.5+Math.random()*1.5){nt=T;drip()}}})})();
