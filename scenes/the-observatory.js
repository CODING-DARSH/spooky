(()=>{let eye,bl,pl,ej=[],eo=0,lt;
Story.add({id:'observatory',title:'The Observatory',sub:'Where it has always been looking',fog:[0x030202,.03],cam:[0,1.6,6],out:'glitch',base:.75,quiet:true,goal:'',
build(g,s){amb(g,0x0c0808,.5);const wm=surf('stone',0x1c1a18,12,2,.8);wm.side=THREE.BackSide;add(g,new THREE.CylinderGeometry(9,9,9,48,1,true),wm,0,4.5,-2);
const dm=surf('stone',0x161412,10,6,.8);dm.side=THREE.BackSide;add(g,new THREE.SphereGeometry(9,32,12,0,Math.PI*2,0,Math.PI/2),dm,0,9,-2);
for(let i=0;i<8;i++){const r=add(g,new THREE.TorusGeometry(9,.12,8,32,Math.PI),BRASS(),0,9,-2);r.rotation.y=i*Math.PI/8;r.castShadow=false}
const ft=tex(512,512,(x)=>{x.fillStyle='#0a0808';x.fillRect(0,0,512,512);x.strokeStyle='#e0722a';[60,110,170,230].forEach((r,i)=>{x.lineWidth=2+i;x.beginPath();x.arc(256,256,r,0,7);x.stroke()});for(let i=0;i<48;i++){const a=i/48*6.283;x.lineWidth=2;x.beginPath();x.moveTo(256+Math.cos(a)*236,256+Math.sin(a)*236);x.lineTo(256+Math.cos(a)*(i%4?246:252),256+Math.sin(a)*(i%4?246:252));x.stroke()}x.beginPath();x.ellipse(256,256,40,22,0,0,7);x.stroke();x.beginPath();x.arc(256,256,10,0,7);x.stroke()}),fm=M(0xffffff,0xffffff,.35,.2);fm.map=fm.emissiveMap=ft;fm.emissiveIntensity=.35;add(g,new THREE.CircleGeometry(9,48),fm,0,.01,-2).rotation.x=-Math.PI/2;
for(let i=0;i<8;i++){const a=i/8*6.283,px=Math.cos(a)*8.3,pz=-2+Math.sin(a)*8.3;add(g,CY(.4,.45,9,14),wm,px,4.5,pz);if(i%2==0&&Math.abs(px)<8){const j=jarEye(g,px*.93,1.9,pz*.93+(-2)*.07,.2);ej.push(j.eye)}}
add(g,CY(3,3.3,.3,40),surf('stone',0x1a1816,3,1),0,.15,-2);const lt2=M(0x2a0a0a,0,.55),ch=grp(g,0,.3,-1.6);add(ch,BX(.9,.18,1.1),lt2,0,.55,0);add(ch,BX(.9,1.2,.2),lt2,0,1.2,.55);add(ch,BX(.4,.3,.25),lt2,0,1.95,.6);[-.52,.52].forEach(x=>{add(ch,BX(.1,.1,1),lt2,x,.9,-.05);add(ch,new THREE.TorusGeometry(.1,.02,6,14),BRASS(),x,.97,-.35)});add(ch,CY(.06,.06,.5,8),IRON(),0,.28,0);
phonograph(g,3.2,-1.2);
eye=eyeBall(g,0,4.6,-10.4,3.2);eye.scale.y=.02;pl=eye.pupil;const rg=add(g,new THREE.TorusGeometry(3.5,.16,12,56),BRASS(),0,4.6,-10.2);rg.castShadow=false;
bl=grp(g,0,4.6,-10.1);for(let i=0;i<14;i++){const a=i/14*6.283,b=grp(bl,0,0,0);b.rotation.z=a;add(b,BX(.1,1.4,.04),BRASS(),0,4.1,0).castShadow=false}
lt=light(g,0xff5a20,0,40,0,4.6,-6.5)},
async enter(s){if(s.st.ran)return;s.st.ran=1;s.st.lock=1;flOn=1;heart(1100);wind(0);await sleep(4200);const V=(t,o={})=>say(t,{k:'voice',hold:700,...o});
await V('Forty-one came before you.');await V('Each one believed they were investigating me.');await V('Vane thought attention made things real. It does not. Attention makes things hungry.');
await V('I sent the invitation. Look at the signature.',{hold:300});S.sig=1;toast('The invitation\'s signature has changed.');sting();fear(.2);await sleep(1400);
await say(S.name+'. You wrote it. You will write it again.',{k:'red',hold:900});
const o=['Sit in the chair'];if(has('cyl'))o.push('Play the wax cylinder');o.push('Close your eyes');const c=await choose(o);S.ending=o[c][0]==='S'?0:o[c][0]==='P'?1:2;s.st.lock=0;s.st.done=1;advance()},
tick(dt,T,s){if(s.st.ran&&eo<1)eo=Math.min(1,eo+dt/3.2);const e=eo*eo*(3-2*eo);eye.scale.y=.02+.98*e;lt.intensity=e*3;eye.lookAt(cam.position);pl.scale.setScalar(1+.25*Math.sin(T*1.7)+(S.dread>.8?.3:0));bl.rotation.z=T*.05;ej.forEach(j=>j.lookAt(cam.position))},
async leave(s){const e=S.ending;$('#msg').classList.remove('show');if(e===0){heart(500);await moveTo(0,1.45,-.4,1800)}
else if(e===1){wind(.2);for(let i=0;i<8;i++){nz(500+Math.random()*900,3,.25,.3);tn(180+Math.random()*30,170,.3,.12,'sawtooth');await sleep(260)}flOn=0;heart(0);await sleep(1000)}
else{$('#fx').className='cut';heart(900);await sleep(1500)}}})})();
