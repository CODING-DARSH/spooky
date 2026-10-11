(()=>{let fig,arm,head,rdoor,gl,gx,gt,lag=0,turn=0,rv=0;
const names=a=>{gx.clearRect(0,0,256,340);gx.globalAlpha=a;gx.fillStyle='#d8cfbd';gx.font='16px "Special Elite",monospace';gx.textAlign='center';for(let i=0;i<41;i++){gx.save();gx.translate(60+(i%3)*68,26+Math.floor(i/3)*20);gx.rotate((Math.random()-.5)*.15);gx.fillText(['Alder','M. Pike','J. Orne','Weir','Tallis','Hask','R. Crane','Ives','Marr','N. Voss','Dunn','Sable','Quill','O. Frane'][i%14],0,0);gx.restore()}gx.fillStyle='#a3141b';gx.font='30px "Special Elite",monospace';gx.fillText(S.name,128,320);gx.globalAlpha=1;gt.needsUpdate=true};
Story.add({id:'mirror',title:'The Mirror Room',sub:'Forty-one went in',fog:[0x020405,.06],cam:[0,1.6,2.2],out:'glitch',base:.55,goal:'Make the glass tell the truth',next:'step through',nudge:'Click the mirror. You are holding something that might help.',tip:'The reflection is half a second late.',
build(g,s){room(g,7,5,9,-3,{wall:0x14181c,floor:0x1a1010});amb(g,0x10161c,.4);light(g,0x7a9aaa,1.2,12,0,3.8,-6);
[-3.35,3.35].forEach(x=>[-2,-5].forEach(z=>{const f=frameOf(g,x,2.2,z,1.2,2.2);f.rotation.y=x<0?Math.PI/2:-Math.PI/2;const v=add(g,sheetG(1.5,2.6,1.4,10),surf('cloth',0x1a1a1c,1,1,1),x<0?-3.3:3.3,2.2,z);v.rotation.x=Math.PI/2;v.rotation.z=x<0?-Math.PI/2:Math.PI/2}));
const mg=grp(g,0,2.2,-7.4);frameOf(mg,0,0,0,2.4,3.6);
const gc=document.createElement('canvas');gc.width=256;gc.height=340;gx=gc.getContext('2d');gt=new THREE.CanvasTexture(gc);
gl=add(mg,PL(2.4,3.6),new THREE.MeshStandardMaterial({color:0x04090b,emissive:0x0a1a22,roughness:.05,metalness:.6,transparent:true,opacity:.82}),0,0,.06);gl.castShadow=false;const nm=add(mg,PL(2.2,3),new THREE.MeshBasicMaterial({map:gt,transparent:true,depthWrite:false}),0,0,.07);
add(g,PL(2.4,3.6),MB(0x03080a),0,2.2,-7.75);
fig=grp(g,-.3,.5,-7.55);const fm=M(0x2a2e30,0x0c1214,.7);fig.add(lathe([[0,0],[.3,0],[.28,.9],[.35,1.4],[0,1.5]],fm,12));head=grp(fig,0,1.72,0);const hm=M(0xcfc6b6,0x181410,.6);add(head,SP(.17,14),hm).scale.y=1.25;[-.06,.06].forEach(x=>add(head,SP(.025,8),MB(0),x,.04,.15));
arm=grp(fig,.34,1.3,0);add(arm,CY(.05,.05,.8,6),fm,0,-.4,0);
rdoor=grp(g,.7,1.6,-7.6);add(rdoor,PL(.8,1.9),MB(0xe0722a));add(rdoor,PL(.66,1.76),MB(0),0,0,.01);rdoor.visible=false;
const cl=candle(g,0,0,-5);s.cl=cl;
s.hot(mg,'mirror','The mirror',0);s.hot(rdoor,'rdoor','The door in the reflection',0,{go:true})},
on:{async mirror(s){if(s.st.rv)return;if(!has('lens')){say('Only glass. Whatever is behind it needs something to look through.',{k:'whisper'});s.seen.delete('mirror');return}
s.st.rv=1;await say('You raise the lens. The glass looks back.',{k:'whisper',hold:900});sting();fear(.2);rv=1;head.rotation.y=0;await say('You brought it with you.',{k:'red',hold:1100});rdoor.visible=true;creak()}},
enter(s){s.st.t3=performance.now();turn=0;rv=s.st.rv?1:0;rdoor.visible=!!s.st.rv;if(s.st.rv)names(1)},
tick(dt,T,s){flick(s.cl,T,2);if(!rv){lag+=(yaw-lag)*dt*1.1;fig.rotation.y=-lag*.9;head.rotation.y=-lag*.5}
else{fig.rotation.y*=1-Math.min(1,dt*3);arm.rotation.z+=(2.8-arm.rotation.z)*Math.min(1,dt*1.3);head.rotation.y*=1-Math.min(1,dt*3);s.st.na=Math.min(1,(s.st.na||0)+dt*.5);names(s.st.na)}}
,async leave(){await moveTo(0,1.6,-6.2,1200)}})})();
