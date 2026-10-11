/* THE EYE engine: audio, renderer, flashlight, story flow, inventory, documents, markers, dread */
const $=s=>document.querySelector(s),sleep=ms=>new Promise(r=>setTimeout(r,ms));
const S={cur:-1,busy:false,paused:false,name:'Visitor',dread:0,inv:new Set(),ending:0,sig:0,flat:0};let ovOn=0;
/* ---------- audio: dry bus + convolution reverb + dread drone ---------- */
let AC,MG,SB,NB,WG,DG,muted=false,hb;
function aud(){if(AC)return;AC=new(window.AudioContext||window.webkitAudioContext)();MG=AC.createGain();MG.gain.value=muted?0:.9;MG.connect(AC.destination);
SB=AC.createGain();SB.connect(MG);const cv=AC.createConvolver(),n=AC.sampleRate*2.6,ib=AC.createBuffer(2,n,AC.sampleRate);for(let c=0;c<2;c++){const d=ib.getChannelData(c);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,2.6)}cv.buffer=ib;const wg=AC.createGain();wg.gain.value=.55;SB.connect(wg);wg.connect(cv);cv.connect(MG);
NB=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);const d=NB.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
const s=AC.createBufferSource();s.buffer=NB;s.loop=true;const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=380;WG=AC.createGain();WG.gain.value=0;s.connect(f);f.connect(WG);WG.connect(MG);s.start();
const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=.15;lg.gain.value=150;l.connect(lg);lg.connect(f.frequency);l.start();
DG=AC.createGain();DG.gain.value=0;DG.connect(MG);[55,55.4,82.4].forEach(fr=>{const o=AC.createOscillator();o.type='sawtooth';o.frequency.value=fr;const lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=160;o.connect(lp);lp.connect(DG);o.start()})}
const wind=v=>AC&&WG.gain.setTargetAtTime(v,AC.currentTime,1);
function nz(fr,q,dur,v,type='bandpass'){if(!AC)return;const s=AC.createBufferSource();s.buffer=NB;const f=AC.createBiquadFilter();f.type=type;f.frequency.value=fr;f.Q.value=q;const g=AC.createGain(),t=AC.currentTime;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+dur*.3);g.gain.linearRampToValueAtTime(0,t+dur);s.connect(f);f.connect(g);g.connect(SB);s.start(t,Math.random(),dur)}
function tn(f1,f2,dur,v,type='sine'){if(!AC)return;const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.type=type;o.frequency.setValueAtTime(f1,t);o.frequency.exponentialRampToValueAtTime(f2,t+dur);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);o.connect(g);g.connect(SB);o.start(t);o.stop(t+dur)}
const thud=v=>tn(70,35,.3,v),beat=()=>{thud(.9);setTimeout(()=>thud(.55),170)},tick=()=>tn(1500,1100,.03,.05,'square'),creak=()=>tn(80,150,1.4,.1,'sawtooth'),
whisper=()=>{nz(1600,4,1.4,.6);setTimeout(()=>nz(2400,6,1,.35),250)},scratch=()=>{for(let i=0;i<6;i++)setTimeout(()=>nz(4000,1,.15,.35,'highpass'),i*110)},
sting=()=>{nz(300,1,.5,.9,'lowpass');tn(900,300,.5,.2,'sawtooth')},knock=()=>[0,260,520].forEach(d=>setTimeout(()=>tn(160,70,.12,.9,'triangle'),d)),
ring=()=>{for(let i=0;i<3;i++)setTimeout(()=>{tn(480,470,.12,.12,'square');setTimeout(()=>tn(440,430,.12,.12,'square'),130)},i*250)},
drip=()=>tn(1800,700,.09,.1),bell=()=>{tn(520,515,1.4,.12);tn(780,775,1,.06)},unlock=()=>{nz(2500,8,.08,.5);setTimeout(()=>tn(200,120,.2,.5,'triangle'),90)};
const heart=ms=>{clearInterval(hb);if(ms)hb=setInterval(beat,ms)};
function setMute(m){muted=m;if(MG)MG.gain.value=m?0:.9;$('#snd').textContent='sound '+(m?'off':'on')}
/* ---------- renderer, flashlight, dust ---------- */
const R=new THREE.WebGLRenderer({canvas:$('#c'),antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.2;R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(68,1,.1,200);cam.rotation.order='YXZ';sc.add(cam);
function rs(){R.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}addEventListener('resize',rs);rs();
const FL=new THREE.SpotLight(0xffe2b0,2.6,28,.46,.7,1.2);FL.castShadow=true;FL.shadow.mapSize.set(1024,1024);FL.shadow.bias=-.0005;sc.add(FL);sc.add(FL.target);
let flOn=1,flK=1;const pn={x:0,y:0};
const blackout=async(ms=700)=>{for(let i=0;i<6;i++){flK=i%2?1:0;await sleep(ms/6)}flK=1};
/* ---------- helpers ---------- */
const EM=0x3a1804,M=(c,e=0,r=.9,m=0)=>new THREE.MeshStandardMaterial({color:c,emissive:e,roughness:r,metalness:m}),MB=c=>new THREE.MeshBasicMaterial({color:c});
const add=(p,geo,mat,x=0,y=0,z=0)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);o.castShadow=geo.type!=='PlaneGeometry'&&!mat.isMeshBasicMaterial;o.receiveShadow=true;p.add(o);return o};
const BX=(w,h,d)=>new THREE.BoxGeometry(w,h,d),PL=(w,h)=>new THREE.PlaneGeometry(w,h),CY=(a,b,h,s=10)=>new THREE.CylinderGeometry(a,b,h,s),SP=(r,s=16)=>new THREE.SphereGeometry(r,s,s);
const tex=(w,h,fn)=>{const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);return new THREE.CanvasTexture(c)};
const grp=(g,x,y,z)=>{const o=new THREE.Group();o.position.set(x,y,z);g.add(o);return o};
const amb=(g,c,i)=>g.add(new THREE.AmbientLight(c,i));
const light=(g,col,i,d,x,y,z)=>{const l=new THREE.PointLight(col,i,d,2);l.position.set(x,y,z);g.add(l);return l};
const lathe=(pts,mat,seg=14)=>{const m=new THREE.Mesh(new THREE.LatheGeometry(pts.map(([r,y])=>new THREE.Vector2(r,y)),seg),mat);m.castShadow=m.receiveShadow=true;return m};
const GT=tex(64,64,(x)=>{const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.3,'rgba(255,255,255,.3)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64)});
const glow=(g,x,y,z,col,sz)=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:GT,color:col,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false}));s.position.set(x,y,z);s.scale.set(sz,sz,1);g.add(s);return s};
const hex=n=>'#'+n.toString(16).padStart(6,'0');
const _tx={};
function surf(kind,col=0x888888,rx=1,ry=1,rough=.9,met=0){const k=kind+col;let b=_tx[k];
if(!b){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d'),rn=Math.random;x.fillStyle=hex(col);x.fillRect(0,0,256,256);
if(kind==='wood'){for(let i=0;i<70;i++){x.strokeStyle=`rgba(0,0,0,${.05+rn()*.18})`;x.lineWidth=1+rn()*2;x.beginPath();const y=rn()*256;x.moveTo(0,y);for(let q=1;q<=8;q++)x.lineTo(q*32,y+(rn()-.5)*7);x.stroke()}x.strokeStyle='rgba(0,0,0,.65)';x.lineWidth=3;for(let i=0;i<=256;i+=64){x.beginPath();x.moveTo(0,i);x.lineTo(256,i);x.stroke()}}
else if(kind==='wall'){x.fillStyle='rgba(0,0,0,.2)';for(let i=0;i<256;i+=32)x.fillRect(i,0,5,256);for(let j=0;j<256;j+=64)for(let i=16;i<256;i+=32){x.beginPath();x.ellipse(i,j+32,8,16,0,0,7);x.fill();x.fillStyle='rgba(255,255,255,.05)';x.beginPath();x.ellipse(i,j+32,3,8,0,0,7);x.fill();x.fillStyle='rgba(0,0,0,.2)'}}
else if(kind==='stone'){for(let j=0;j<256;j+=64)for(let i=(j/64%2)*32;i<256;i+=64){x.strokeStyle='rgba(0,0,0,.75)';x.lineWidth=4;x.strokeRect(i,j,64,64);x.fillStyle=`rgba(${rn()<.5?0:255},${rn()<.5?0:255},${rn()<.5?0:255},.05)`;x.fillRect(i,j,64,64)}}
else if(kind==='cloth'){x.strokeStyle='rgba(0,0,0,.18)';x.lineWidth=1;for(let i=0;i<256;i+=3){x.beginPath();x.moveTo(i,0);x.lineTo(i,256);x.moveTo(0,i);x.lineTo(256,i);x.stroke()}}
else if(kind==='metal'){for(let i=0;i<120;i++){x.strokeStyle=`rgba(255,255,255,${rn()*.08})`;x.beginPath();const y=rn()*256;x.moveTo(0,y);x.lineTo(256,y+rn()*4);x.stroke()}}
for(let i=0;i<5;i++){const px=rn()*256,py=rn()*256,r=30+rn()*60,g=x.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,'rgba(0,0,0,.35)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,256,256)}
if(kind==='wall'||kind==='stone')for(let i=0;i<14;i++){const px=rn()*256,g=x.createLinearGradient(0,0,0,256);g.addColorStop(0,'rgba(0,0,0,.4)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(px,0,1+rn()*3,80+rn()*176)}
for(let i=0;i<500;i++){x.fillStyle=`rgba(${rn()<.5?0:255},${rn()<.5?0:255},${rn()<.5?0:255},.07)`;x.fillRect(rn()*256,rn()*256,2,2)}
b=_tx[k]=new THREE.CanvasTexture(c);b.wrapS=b.wrapT=THREE.RepeatWrapping}
const t=b.clone();t.needsUpdate=true;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);return new THREE.MeshStandardMaterial({map:t,bumpMap:t,bumpScale:.7,roughness:rough,metalness:met,side:THREE.DoubleSide})}
function room(g,w,h,d,cz,o={}){const zb=cz-d/2,zf=cz+d/2,wc=o.wall??0x4a3a30,fc=o.floor??0x2a1a10,cc=o.ceil??0x2a2420;
const Q=(geo,m,x,y,z,rx,ry)=>{const p=add(g,geo,m,x,y,z);p.rotation.set(rx||0,ry||0,0);p.receiveShadow=true;p.castShadow=false;return p};
Q(PL(w,h),surf('wall',wc,w/1.6,h/1.6),0,h/2,zb);Q(PL(w,h),surf('wall',wc,w/1.6,h/1.6),0,h/2,zf,0,Math.PI);Q(PL(d,h),surf('wall',wc,d/1.6,h/1.6),-w/2,h/2,cz,0,Math.PI/2);Q(PL(d,h),surf('wall',wc,d/1.6,h/1.6),w/2,h/2,cz,0,-Math.PI/2);
Q(PL(w,d),surf(o.fk||'wood',fc,w/1.3,d/1.3,.5),0,0,cz,-Math.PI/2);Q(PL(w,d),surf('plaster',cc,w/2,d/2),0,h,cz,Math.PI/2);
if(o.wains!==false){const wm=surf('wood',0x1c1008,2,1,.5);[[0,zb+.025,w,1],[0,zf-.025,w,1],[-w/2+.025,cz,d,0],[w/2-.025,cz,d,0]].forEach(([x,z,len,a])=>{[[.5,1,.05],[.1,.2,.08],[h-.09,.18,.12],[1.04,.07,.09]].forEach(([y,hh,dd])=>{const b=add(g,a?BX(len,hh,dd):BX(dd,hh,len),wm,x,y,z);b.castShadow=false})})}}
/* ---------- inventory, toasts, documents, choices ---------- */
const ITEMS={invite:{n:'Invitation',svg:'<path d="M3 6h18v12H3zM3 6l9 7 9-7"/>',use:()=>doc({k:'phone',f:'Unknown number',b:`HOLLOWMERE. 11:58 TONIGHT.\nCome alone.\n\nIf you hear your name, don't look behind you.\n\n— ${S.sig?S.name:'E.V.'}`})},
key:{n:'Iris Key',svg:'<circle cx="7" cy="12" r="3.5"/><circle cx="7" cy="12" r="1"/><path d="M10.5 12H21M17 12v3M20 12v2"/>',use:()=>say('A brass key. The bow is an eye. The pupil turns.',{k:'whisper'})},
cyl:{n:'Wax cylinder',svg:'<rect x="6" y="5" width="12" height="14" rx="2"/><path d="M6 9h12M6 12h12M6 15h12"/>',use:()=>say('Labelled in Vane\'s hand: THE CLOSING.',{k:'whisper'})},
lens:{n:'Observer\'s lens',svg:'<circle cx="11" cy="11" r="6"/><path d="M16 16l5 5M8 9a4 4 0 0 1 3-2"/>',use:()=>say('The glass is warm. Through it, the room looks slightly more honest.',{k:'whisper'})}};
const has=id=>S.inv.has(id);
let tT;function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(tT);tT=setTimeout(()=>e.classList.remove('show'),2600)}
function give(id){if(has(id))return;S.inv.add(id);const i=ITEMS[id],b=document.createElement('button');b.className='slot';b.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">${i.svg}</svg><span>${i.n}</span>`;b.onclick=()=>i.use&&i.use();$('#inv').appendChild(b);toast('Acquired: '+i.n);bell()}
function doc(o){return new Promise(r=>{const el=$('#ov'),t=(o.b||'').replace(/\n/g,'<br>');el.className='on';el.innerHTML=o.k==='phone'?`<div class="phone"><div class="pb"><span>11:41</span><span>●●●  ▮</span></div><div class="from">${o.f||''}</div><div class="bub">${t}</div><div class="tap">tap to close</div></div>`:`<div class="sheet"><h3>${o.t||''}</h3><p>${t}</p><i>${o.s||''}</i><div class="tap">click to close</div></div>`;ovOn=1;el.onclick=()=>{el.className='';ovOn=0;r()}})}
const choose=opts=>new Promise(r=>{const c=$('#choices');c.innerHTML='';opts.forEach((t,i)=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>{c.innerHTML='';r(i)};c.appendChild(b)})});
let sayT,sayId=0;
async function say(t,o={}){const id=++sayId;clearInterval(sayT);const m=$('#msg');m.className='show '+(o.k||'');m.textContent='';let i=0;const sp=o.k==='red'?55:o.k==='whisper'?40:22;
await new Promise(r=>{sayT=setInterval(()=>{if(id!==sayId){clearInterval(sayT);return r()}m.textContent=t.slice(0,++i);if(i>=t.length){clearInterval(sayT);r()}},sp)});
if(id!==sayId)return;const h=o.hold??Math.min(4200,1100+t.length*32);if(h){await sleep(h);if(id===sayId)m.classList.remove('show')}}
let hT;function hint(t){const h=$('#hint');h.textContent=t;h.classList.add('show');clearTimeout(hT);hT=setTimeout(()=>h.classList.remove('show'),5000)}
const blink=async()=>{const f=$('#fx');f.className='cut';await sleep(260);f.className=''};
const fear=n=>{S.dread=Math.min(1,S.dread+n)};
const jump=()=>{sting();face.visible=true;setTimeout(()=>face.visible=false,170);$('#vig').classList.add('deep');fear(.25);S.flat=1;setTimeout(()=>S.flat=0,900);blackout(500)};
const face=add(cam,PL(1.1,1.5),new THREE.MeshBasicMaterial({map:tex(256,340,(x,w,h)=>{x.fillStyle='#d9d2c0';x.beginPath();x.ellipse(w/2,h/2,100,150,0,0,7);x.fill();x.fillStyle='#000';[-45,45].forEach(d=>{x.beginPath();x.ellipse(w/2+d,h/2-40,24,36,0,0,7);x.fill()});x.beginPath();x.ellipse(w/2,h/2+80,40,64,0,0,7);x.fill()}),transparent:true,depthTest:false}),0,0,-.7);face.visible=false;face.renderOrder=9;
/* ---------- story registry ---------- */
const Story={list:[],add(s){s.st={};s.seen=new Set();s.hots=[];s.hot=(o,id,label,lift=0,op={})=>{const h={o,id,label,lift,go:!!op.go,clue:!op.go&&op.clue!==false};s.hots.push(h);return h};this.list.push(s)}};
const L=Story.list,P=new THREE.Vector3();let yaw=0,pitch=0,ty=0,tp=0,ls=1;
const ready=s=>!!(s.st.done||(!s.st.lock&&s.hots.filter(h=>h.clue).every(h=>s.seen.has(h.id))&&(!s.gate||s.gate(s))));
const cur=()=>L[S.cur];
function moveTo(x,y,z,ms){const a=P.clone(),b=new THREE.Vector3(cur().g.position.x+x,y,z),t0=performance.now();return new Promise(r=>{(function s(){const k=Math.min(1,(performance.now()-t0)/ms);P.lerpVectors(a,b,k*k*(3-2*k));k<1?requestAnimationFrame(s):r()})()})}
async function glitch(ms){const c=$('#c');sting();for(let i=0;i<ms/60;i++){c.style.transform=`translate(${(Math.random()-.5)*40}px,${(Math.random()-.5)*10}px) scale(${1+Math.random()*.05})`;c.style.filter=`hue-rotate(${Math.random()*360}deg) contrast(1.6) saturate(2)`;await sleep(60)}c.style.transform=c.style.filter=''}
async function trans(type,mid){const f=$('#fx');if(type==='glitch')await glitch(450);f.className='dark';await sleep(900);mid();await sleep(200);f.className='';await sleep(700)}
/* ---------- markers ---------- */
function hl(o,on){o.traverse(m=>{const t=m.material;if(t&&t.emissive){if(t.userData.b===undefined)t.userData.b=t.emissiveIntensity;t.emissiveIntensity=on?t.userData.b+1.4:t.userData.b}})}
function marks(s){const m=$('#marks');m.innerHTML='';s.hots.forEach(h=>{const e=document.createElement('button');e.className='mk'+(s.seen.has(h.id)?' seen':'');e.innerHTML='<b></b><i>▲</i><span>'+h.label+'</span>';e.onclick=()=>inspect(h);e.onmouseenter=()=>hl(h.o,1);e.onmouseleave=()=>hl(h.o,0);m.appendChild(e);h.el=e;h.ar=e.querySelector('i')})}
const V3=new THREE.Vector3();
function place(s){cam.updateMatrixWorld();cam.matrixWorldInverse.copy(cam.matrixWorld).invert();const w=innerWidth,hh=innerHeight,rd=ready(s),block=S.busy||S.paused||ovOn||$('#choices').children.length;
for(const k of s.hots){const hid=block||s.hideMarks||(k.go&&!rd)||k.hid;k.el.classList.toggle('hid',!!hid);if(hid)continue;
k.o.getWorldPosition(V3);V3.y+=k.lift;V3.project(cam);let x=V3.x,y=V3.y;const bh=V3.z>1;if(bh){x=-x;y=-y}
const off=bh||Math.abs(x)>.9||Math.abs(y)>.84;if(off){const q=Math.max(Math.abs(x)/.9,Math.abs(y)/.84,1e-3);x/=q;y/=q}
k.sx=(x+1)/2*w;k.sy=(1-y)/2*hh;k.off=off;k.el.style.transform=`translate(${k.sx}px,${k.sy}px)`;k.el.classList.toggle('off',off);if(off)k.ar.style.transform=`rotate(${Math.atan2(x,y)}rad)`}}
/* ---------- flow ---------- */
function inspect(h){const s=cur();if(S.busy||S.paused||ovOn||(s.st.lock&&!h.go))return;if(h.go&&!ready(s))return;s.seen.add(h.id);h.el.classList.add('seen');if(s.on&&s.on[h.id])s.on[h.id](s,h);if(h.go)advance()}
function advance(){const s=cur();if(!S.busy&&!S.paused&&S.cur<L.length-1&&ready(s))go(S.cur+1)}
function next(){const s=cur();if(S.busy||S.paused||s.end)return;if(!ready(s)){hint(s.nudge||'Click the glowing marks. Something here is not finished with you.');return}advance()}
const prev=()=>{if(!S.busy&&!S.paused&&S.cur>1&&!cur().end)go(S.cur-1,true)};
async function go(n,back){if(S.busy||n<0||n>=L.length)return;S.busy=true;const c=cur();if(!back&&c&&c.leave)await c.leave(c);await trans(back?'dark':(c&&c.out)||'dark',()=>enter(n));S.busy=false}
function enter(i){const s=L[i];S.cur=i;L.forEach(t=>t.g.visible=t===s);s.g.updateMatrixWorld(true);sc.fog=new THREE.FogExp2(s.fog[0],s.fog[1]);sc.background=new THREE.Color(s.fog[0]);
P.set(s.g.position.x+s.cam[0],s.cam[1],s.cam[2]);yaw=pitch=ty=tp=0;ls=s.look??1;marks(s);$('#vig').classList.remove('deep');$('#gt').textContent=s.goal||'';document.body.classList.toggle('ended',!!s.end);$('#end').classList.toggle('on',!!s.end);
if(i>0&&!s.end){$('#chap').innerHTML=`<h2>${s.title}</h2><p>${s.sub}</p>`;$('#chap').classList.add('on');setTimeout(()=>$('#chap').classList.remove('on'),1700)}
if(s.tip)setTimeout(()=>S.cur===i&&hint(s.tip),1900);s.enter&&s.enter(s)}
/* ---------- loop: camera, flashlight, dread, pulse monitor ---------- */
const dustG=new THREE.BufferGeometry(),dp=new Float32Array(480);for(let i=0;i<480;i+=3){dp[i]=(Math.random()-.5)*14;dp[i+1]=(Math.random()-.5)*5;dp[i+2]=(Math.random()-.5)*14}dustG.setAttribute('position',new THREE.BufferAttribute(dp,3));
const dust=new THREE.Points(dustG,new THREE.PointsMaterial({size:.035,color:0xffe0b0,transparent:true,opacity:.4,depthWrite:false,blending:THREE.AdditiveBlending}));sc.add(dust);
const ecx=$('#ecg').getContext('2d'),pu=p=>{p%=1;return p<.1?Math.sin(p/.1*Math.PI)*.12:p>.2&&p<.23?-.15:p>=.23&&p<.28?-1:p>=.28&&p<.32?.4:p>.5&&p<.62?Math.sin((p-.5)/.12*Math.PI)*.2:0};
let last=0,lastGoal='',ep=0,fr=0,gv=-1,flm=new THREE.Vector3(),rr=new THREE.Vector3();
function loop(t){requestAnimationFrame(loop);const dt=Math.min(.05,(t-last)/1000||0),T=t/1000;last=t;fr++;const s=cur();
yaw+=(ty-yaw)*Math.min(1,dt*4);pitch+=(tp-pitch)*Math.min(1,dt*4);const tr=S.dread*.004;
cam.position.set(P.x+Math.sin(T*.7)*.012,P.y+Math.sin(T*1.3)*.025,P.z);cam.rotation.set(pitch+(Math.random()-.5)*tr,yaw+(Math.random()-.5)*tr,Math.sin(T*.9)*.006);cam.updateMatrixWorld();
flm.set(.22,-.18,0).applyMatrix4(cam.matrixWorld);FL.position.copy(flm);rr.set(pn.x,pn.y,.5).unproject(cam).sub(cam.position).normalize();FL.target.position.copy(cam.position).addScaledVector(rr,10);FL.target.updateMatrixWorld();
FL.intensity=flOn*flK*2.6*(1-S.dread*.25*Math.abs(Math.sin(T*23)*Math.sin(T*7)));dust.position.copy(cam.position);dust.rotation.y=T*.02;
S.dread=Math.max(s&&s.base||0,S.dread-dt*.012);
if(fr%15===0){const g=Math.round(S.dread*40);if(g!==gv){gv=g;document.documentElement.style.setProperty('--gr',(.06+S.dread*.12).toFixed(3));if(AC)DG.gain.setTargetAtTime(.01+S.dread*.09,AC.currentTime,.6)}if(S.dread>.55&&Math.random()<.12){const c=$('#c');c.style.filter='blur(1.4px) contrast(1.3)';setTimeout(()=>c.style.filter='',90)}}
if(fr%2===0){ep+=dt*2*(58+S.dread*100)/60;ecx.clearRect(0,0,150,34);ecx.strokeStyle=`rgb(${150+S.dread*100|0},${200-S.dread*170|0},${150-S.dread*130|0})`;ecx.lineWidth=1.3;ecx.beginPath();for(let x=0;x<150;x++){const y=17-(S.flat?0:pu(ep-(150-x)/150*1.6))*13;x?ecx.lineTo(x,y):ecx.moveTo(x,y)}ecx.stroke()}
if(s){if(!S.paused&&s.tick)s.tick(dt,T,s);place(s);const rd=ready(s),nd=s.hots.filter(h=>h.clue),sn=nd.filter(h=>s.seen.has(h.id)).length;
if(rd&&!s.st._r){s.st._r=1;if(!s.end&&!s.quiet){hint(s.onReady?'':'The way on is open. Click the glowing mark, or press →.');bell()}s.onReady&&s.onReady(s)}
const g=s.end?'':nd.length&&!rd?`${sn}/${nd.length}`:rd&&!s.end&&!s.quiet?'· the way is open':'';if(g!==lastGoal){lastGoal=g;$('#prog').textContent=g}
const nb=$('#next');nb.style.display=s.end||s.st.lock?'none':'block';nb.textContent=s.next||'continue';nb.classList.toggle('ready',rd)}
R.render(sc,cam)}
/* ---------- input & boot ---------- */
function boot(){L.forEach((s,i)=>{const g=new THREE.Group();g.position.x=i*100;g.visible=false;sc.add(g);s.g=g;s.i=i;s.build&&s.build(g,s)});
const gc=document.createElement('canvas');gc.width=gc.height=160;const gx=gc.getContext('2d'),id=gx.createImageData(160,160);for(let i=0;i<id.data.length;i+=4){const v=Math.random()*255;id.data[i]=id.data[i+1]=id.data[i+2]=v;id.data[i+3]=255}gx.putImageData(id,0,0);$('#grain').style.backgroundImage=`url(${gc.toDataURL()})`;
$('#jump').innerHTML='<option value="">Jump to chapter…</option>'+L.map((s,i)=>`<option value="${i}">${s.title||'Endings'}</option>`).join('');
addEventListener('pointermove',e=>{const dx=(e.clientX/innerWidth-.5)*2,dy=(e.clientY/innerHeight-.5)*2,z=(v,k)=>Math.sign(v)*Math.max(0,Math.abs(v)-k)/(1-k);pn.x=dx;pn.y=-dy;ty=-(z(dx,.5)*1.25+dx*.06)*ls;tp=-(z(dy,.62)*.5+dy*.03)*ls});
addEventListener('keydown',e=>{if(S.cur<0)return;if(e.key==='Escape'){S.paused=!S.paused;$('#menu').classList.toggle('on',S.paused);return}if(e.key==='f'||e.key==='F'){flOn=flOn?0:1;return}if(S.paused||S.busy||ovOn)return;
if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev();else if(e.key==='Enter'&&e.target.tagName!=='BUTTON'){e.preventDefault();const s=cur(),c=s.hots.filter(h=>h.el&&!h.el.classList.contains('hid')&&!h.off&&!s.seen.has(h.id)).sort((a,b)=>Math.abs(a.sx-innerWidth/2)-Math.abs(b.sx-innerWidth/2))[0];c?inspect(c):next()}});
$('#next').onclick=e=>{next();e.target.blur()};
$('#go').onclick=()=>{S.name=($('#nm').value.trim()||'Visitor').slice(0,18);aud();$('#start').style.display='none';enter(0)};
$('#snd').onclick=$('#snd2').onclick=()=>setMute(!muted);
$('#mn').onclick=e=>{S.paused=true;$('#menu').classList.add('on');e.target.blur()};
$('#res').onclick=()=>{S.paused=false;$('#menu').classList.remove('on')};
$('#skip').onclick=()=>{S.paused=false;$('#menu').classList.remove('on');const s=cur();s.st.done=1;s.st.lock=0;s.hideMarks=0;advance()};
$('#jump').onchange=e=>{const v=e.target.value;e.target.value='';if(v==='')return;S.paused=false;$('#menu').classList.remove('on');go(+v,true)};
$('#again').onclick=()=>location.reload();
requestAnimationFrame(loop)}
