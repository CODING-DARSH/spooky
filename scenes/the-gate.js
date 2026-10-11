(()=>{let leaves,pk=[],wl=[];
Story.add({id:'gate',title:'Hollowmere',sub:'11:58 p.m. · 31 October',fog:[0x04060a,.04],cam:[0,1.6,9],look:.5,out:'dark',base:.05,goal:'Read the gate. Then the door.',next:'enter the house',nudge:'Read the sign on the gate pillar first.',
build(g,s){amb(g,0x080b14,.9);const mo=new THREE.DirectionalLight(0x5a6a9a,.55);mo.position.set(-20,30,10);g.add(mo);glow(g,-30,40,-90,0x8aa0d0,60);
add(g,PL(260,260),surf('plaster',0x0a1210,50,50,1),0,0,0).rotation.x=-Math.PI/2;add(g,PL(3,60),surf('stone',0x24211e,1.5,30,.8),0,.02,-10).rotation.x=-Math.PI/2;
const ir=IRON();for(let x=-9;x<=9;x+=.32){if(Math.abs(x)<1.3)continue;add(g,CY(.015,.015,2.2,5),ir,x,1.1,3);add(g,new THREE.ConeGeometry(.04,.14,5),ir,x,2.28,3)}add(g,BX(18,.05,.05),ir,0,.4,3);add(g,BX(18,.05,.05),ir,0,1.8,3);
[-1.4,1.4].forEach(x=>{add(g,BX(.5,3,.5),surf('stone',0x1c1a18,1,2),x,1.5,3);add(g,SP(.28,10),surf('stone',0x1c1a18),x,3.1,3)});
leaves=[-1,1].map(d=>{const p=grp(g,d*1.2,0,3);for(let x=0;x<1.15;x+=.2){add(p,CY(.015,.015,2.2,5),ir,-d*x,1.1,0)}add(p,BX(1.15,.05,.05),ir,-d*.57,1.4,0);return p});leaves[0].rotation.y=.5;leaves[1].rotation.y=-.5;
const sg=grp(g,-1.4,1.7,3.28);add(sg,BX(.7,.4,.04),M(0x1a1a1c,0,.4,.8));s.hot(sg,'sign','Rusted plaque',0);
const stn=surf('stone',0x1a1816,3,2);add(g,BX(13,7,9),stn,0,3.5,-26);add(g,BX(3,9,.6),stn,-4,4.5,-21.3);const rf=add(g,new THREE.ConeGeometry(9.5,4.5,4),M(0x0c0a0a,0,.9),0,9.2,-26);rf.rotation.y=Math.PI/4;
const tw=add(g,CY(2.4,2.6,14,16),stn,-6.5,7,-27);add(g,new THREE.ConeGeometry(3,4,16),M(0x0c0a0a),-6.5,16,-27);add(g,BX(.9,2.4,.9),stn,4,10.5,-27);add(g,BX(.9,2.4,.9),stn,-1,10.5,-27);
[[-4.5,-1],[4.5,-1],[-4.5,3.2],[4.5,3.2],[0,6]].forEach(([x,y],i)=>{const w=add(g,PL(.9,1.4),MB(i==4?0x6a2a08:0x1a1008),x,y+1.6,-21.52);if(i<3){wl.push(w);glow(g,x,y+1.6,-21.2,0xff8a3a,2.2)}});
add(g,BX(.25,3.4,.25),stn,-1.6,1.7,-21.2);add(g,BX(.25,3.4,.25),stn,1.6,1.7,-21.2);add(g,BX(3.5,.3,.4),stn,0,3.5,-21.2);
add(g,PL(2.8,3),MB(0x1a0a04),0,1.5,-21.35);s.doors=[-1,1].map(d=>{const p=grp(g,d*1.4,0,-21.3);add(p,BX(1.35,3,.1),surf('wood',0x241208,1,1,.5),-d*.7,1.5,0);return p});
s.hot(grp(g,0,0,-21.3),'door','The door',1.5,{go:true});
for(let i=0;i<24;i++){const sd=i%2?1:-1,x=sd*(3.5+Math.random()*12),z=6-i*1.5,h=6+Math.random()*4,bm=surf('wood',0x120e0a,1,3,1);let y=0,px=x,rz=0;for(let k=0;k<3;k++){const seg=add(g,CY(.1+(2-k)*.08,.14+(2-k)*.08,h/3,7),bm,px,y+h/6,z);rz=(Math.random()-.5)*.4;seg.rotation.z=rz;y+=h/3;px+=Math.sin(rz)*-h/3}
for(let b=0;b<5;b++){const br=add(g,CY(.02,.08,2.4,5),bm,x,h*.5+b*.8,z);br.rotation.z=(Math.random()-.5)*2.6;br.rotation.y=Math.random()*3}}
[[-2.2,-2],[2.3,-9],[-2.4,-15]].forEach(([x,z],i)=>{const pt=tex(128,128,(c)=>{c.fillStyle='#000';c.fillRect(0,0,128,128);c.fillStyle='#ffd070';c.beginPath();[[24,40],[56,60],[40,52]].forEach(()=>{});c.moveTo(20,36);c.lineTo(52,36);c.lineTo(36,62);c.moveTo(76,36);c.lineTo(108,36);c.lineTo(92,62);c.moveTo(20,84);c.lineTo(34,100);c.lineTo(50,86);c.lineTo(64,104);c.lineTo(78,86);c.lineTo(94,100);c.lineTo(108,84);c.lineTo(108,96);c.lineTo(90,118);c.lineTo(38,118);c.lineTo(20,96);c.fill()});
const m=new THREE.MeshStandardMaterial({color:0xff6a00,emissive:0xffffff,emissiveMap:pt,emissiveIntensity:1.3,map:pt,roughness:.6}),p=add(g,SP(.45,18),m,x,.38,z);p.scale.y=.82;p.rotation.y=.9*(x<0?1:-1);glow(g,x,.5,z+.4,0xff7a1a,1.6);pk.push(light(g,0xff7a1a,1.4,8,x,.8,z+.5));if(!i)s.hot(p,'pumpkin','Jack-o\'-lantern',.5,{clue:false})});
const dh=grp(g,0,0,-21.3)},
on:{sign:()=>doc({t:'HOLLOWMERE INSTITUTE FOR OCULAR RESEARCH',b:'Established 1889.\nPatients by appointment.\nVisitors by invitation only.\n\nThe lower half of the plaque has been scratched with a blade:\n\n"NO ONE LEAVES. SOMEONE ALWAYS ARRIVES."',s:''}),pumpkin:()=>say('The candle inside has been burning since before Halloween existed.',{k:'whisper'})},
async enter(s){if(s.st.played)return;s.st.played=1;s.st.lock=1;s.hideMarks=1;
tn(90,60,.25,.6,'square');await sleep(500);tn(90,60,.25,.6,'square');await doc({k:'phone',f:'Unknown number · 11:41 PM',b:'HOLLOWMERE. 11:58 TONIGHT.\nCome alone.\nLeave the door as you find it.\n\nIf you hear your name, don\'t look behind you.\n\n— E.V.'});give('invite');
wind(.25);await sleep(500);for(let i=0;i<4;i++){thud(.3+i*.15);await sleep(620)}await sleep(500);
const b=document.body;b.style.setProperty('--d','1.2s');b.dataset.l=1;await sleep(1000);b.dataset.l=0;await sleep(350);b.style.setProperty('--d','1.8s');b.dataset.l=2;await sleep(1100);wind(.35);
s.st.lock=0;s.hideMarks=0;await say('YOU HAVE BEEN EXPECTED.',{k:'red',hold:800});hint('Your cursor is the flashlight. Click anything that glows. F toggles the light.')},
tick(dt,T){pk.forEach((l,i)=>l.intensity=1.4*(.7+.3*Math.sin(T*11+i*3)*Math.sin(T*5+i)))},
async leave(s){creak();const t0=performance.now();(function f(){const k=Math.min(1,(performance.now()-t0)/1800);s.doors[0].rotation.y=-k*1.5;s.doors[1].rotation.y=k*1.5;if(k<1)requestAnimationFrame(f)})();await moveTo(0,1.6,-19.2,2300)}})})();
