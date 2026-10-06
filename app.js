const $=s=>document.querySelector(s);
const screens=[...document.querySelectorAll('.screen')];
function nav(id){screens.forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo(0,0)}
document.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>nav(b.dataset.nav)));

const subjects=[
["Mathematics","Algebra, geometry, functions & practice"],
["English Language","Reading, writing, grammar & comprehension"],
["Biology","Cells, systems, genetics & life science"],
["Chemistry","Matter, reactions, equations & lab concepts"],
["Physics","Motion, energy, forces & electricity"],
["History","People, events, causes & consequences"],
["Geography","Places, environments, maps & data"],
["Computer Science","Algorithms, logic, coding & digital concepts"],
["SAT","Reading, Writing & Math practice"]
];
const sg=$("#subjects");
subjects.forEach(([name,desc])=>{
 const b=document.createElement("button"); b.className="subject";
 b.innerHTML=`<b>${name}</b><small>${desc}</small>`;
 b.onclick=()=>openLesson(name); sg.appendChild(b);
});
let currentSubject="", questionIndex=0, score=0;
const qbank={
"Mathematics":["If 2x + 4 = 10, what is x?","3","4","5","6"],
"English Language":["Which word is a synonym for 'brief'?","long","short","loud","late"],
"Biology":["What is the basic unit of life?","Atom","Cell","Organ","Tissue"],
"Chemistry":["What is H₂O commonly called?","Oxygen","Hydrogen","Water","Salt"],
"Physics":["What is the SI unit of force?","Joule","Watt","Newton","Volt"],
"History":["Which event is commonly associated with 1776 in U.S. history?","Moon landing","Declaration of Independence","Civil War","Constitutional Convention"],
"Geography":["Which tool is used to represent Earth's surface on a flat surface?","Thermometer","Map","Barometer","Scale"],
"Computer Science":["What does an algorithm provide?","A random guess","A step-by-step procedure","A password","A drawing"],
"SAT":["If x=5, what is 2x+3?","8","10","13","15"]
};
function openLesson(s){currentSubject=s;$("#lessonSubject").textContent=s.toUpperCase();$("#lessonTitle").textContent=`${s} lesson`;$("#lessonBody").textContent=`Focusly will teach a short ${s} concept, then check understanding with a quick evaluation. Missed answers can be corrected and retested.`;$("#lessonProgress").style.width="30%";nav("lesson")}
$("#testBtn").onclick=()=>{questionIndex=0;score=0;renderQ();nav("test")};
function renderQ(){const q=qbank[currentSubject]||qbank.Mathematics;$("#questionText").textContent=q[0];$("#answers").innerHTML="";$("#feedback").textContent="";$("#nextQuestion").classList.add("hidden");q.slice(1).forEach((a,i)=>{const b=document.createElement("button");b.className="answer";b.textContent=a;b.onclick=()=>answer(b,a,q);$("#answers").appendChild(b)})}
function answer(btn,a,q){document.querySelectorAll(".answer").forEach(x=>x.disabled=true);const correct=q[1];if(a===correct){btn.classList.add("correct");score++;$("#feedback").textContent="Correct! Great work."}else{btn.classList.add("wrong");$("#feedback").textContent=`Not quite. The correct answer is ${correct}. Let's review it and try again.`}$("#nextQuestion").classList.remove("hidden")}
$("#nextQuestion").onclick=()=>{if(questionIndex===0){questionIndex=1;const q=qbank[currentSubject]||qbank.Mathematics;const old=q.slice(1);$("#questionText").textContent="Which answer would you choose after reviewing the correction?";$("#answers").innerHTML="";["I understand the correction","I need another explanation","I want to retry"].forEach(a=>{const b=document.createElement("button");b.className="answer";b.textContent=a;b.onclick=()=>{b.classList.add("correct");$("#feedback").textContent="Nice. Personalized review complete — you can continue studying or retake the test.";$("#nextQuestion").classList.add("hidden")};$("#answers").appendChild(b)})}};

$("#fileInput").onchange=e=>{const list=$("#fileList");list.innerHTML="";[...e.target.files].forEach(f=>{const d=document.createElement("div");d.className="file-item";d.innerHTML=`<span>📄 ${f.name}</span><small>${Math.round(f.size/1024)} KB</small>`;list.appendChild(d)})};

// Drawing canvas
const canvas=$("#canvas"),ctx=canvas.getContext("2d");let drawing=false;
function resizeCanvas(){const r=canvas.getBoundingClientRect(),d=devicePixelRatio||1;canvas.width=r.width*d;canvas.height=r.height*d;ctx.scale(d,d);ctx.lineCap="round";ctx.lineJoin="round"}
resizeCanvas();addEventListener("resize",resizeCanvas);
function point(e){const r=canvas.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top]}
function start(e){drawing=true;ctx.beginPath();const [x,y]=point(e);ctx.moveTo(x,y);e.preventDefault()}
function move(e){if(!drawing)return;const [x,y]=point(e);ctx.lineWidth=$("#brush").value;ctx.strokeStyle="#5e536f";ctx.lineTo(x,y);ctx.stroke();e.preventDefault()}
function end(){drawing=false}
canvas.addEventListener("pointerdown",start);canvas.addEventListener("pointermove",move);canvas.addEventListener("pointerup",end);canvas.addEventListener("pointerleave",end);
$("#clearCanvas").onclick=()=>ctx.clearRect(0,0,canvas.width,canvas.height);

// Timer
let seconds=1500,timerHandle=null;function paintTime(){let m=Math.floor(seconds/60),s=seconds%60;$("#timer").textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`}
$("#timerStart").onclick=()=>{if(timerHandle){clearInterval(timerHandle);timerHandle=null;$("#timerStart").textContent="Start 25-minute focus";return}$("#timerStart").textContent="Pause focus";timerHandle=setInterval(()=>{if(seconds>0){seconds--;paintTime()}else{clearInterval(timerHandle);timerHandle=null}},1000)};paintTime();

// Focus audio: generated locally with Web Audio (no copyrighted track required)
let audioCtx, master, beatTimer, audioOn=false;
function startAudio(){if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();master=audioCtx.createGain();master.gain.value=.045;master.connect(audioCtx.destination)}
audioCtx.resume();audioOn=true;$("#soundBtn").textContent="🔊";$("#audioStart").textContent="Lo-fi focus audio playing";
if(beatTimer)return; beatTimer=setInterval(()=>{const t=audioCtx.currentTime; const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type="sine";o.frequency.value=110;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.18,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+.18);o.connect(g);g.connect(master);o.start(t);o.stop(t+.2)},900)}
function stopAudio(){if(audioCtx){audioCtx.suspend();}audioOn=false;$("#soundBtn").textContent="🔇"}
$("#audioStart").onclick=()=>audioOn?stopAudio():startAudio();$("#soundBtn").onclick=()=>audioOn?stopAudio():startAudio();

// Buddy
const buddy=$("#buddy"),panel=$("#buddyPanel");let dragging=false,offset=[0,0];
buddy.addEventListener("pointerdown",e=>{dragging=true;const r=buddy.getBoundingClientRect();offset=[e.clientX-r.left,e.clientY-r.top];buddy.setPointerCapture(e.pointerId)});
buddy.addEventListener("pointermove",e=>{if(!dragging)return;buddy.style.left=(e.clientX-offset[0])+"px";buddy.style.top=(e.clientY-offset[1])+"px";buddy.style.right="auto";buddy.style.bottom="auto"});
buddy.addEventListener("pointerup",()=>dragging=false);
$("#buddyOpenBtn").onclick=()=>panel.classList.toggle("hidden");$("#buddyClose").onclick=()=>panel.classList.add("hidden");
function buddyReply(msg){const name=$("#buddyName").value||"Buddy";const replies=[`I'm here. Let's take it one step at a time.`,`You’ve got this. Want to focus for the next 10 minutes?`,`Good question. I can help you break that down.`,`Let's make this simpler together.`];const text=replies[Math.floor(Math.random()*replies.length)];$("#buddyBubble").textContent=`${name}: ${text}`;return text}
$("#buddySend").onclick=()=>{const v=$("#buddyInput").value.trim();if(v){const t=buddyReply(v);if(speechSynthesis) speechSynthesis.speak(new SpeechSynthesisUtterance(t));$("#buddyInput").value=""}};
$("#buddySpeak").onclick=()=>{const t=buddyReply("");if(speechSynthesis){const u=new SpeechSynthesisUtterance(t);const mode=$("#voiceSelect").value;u.pitch=mode==="bright"?1.2:mode==="soft"?.85:1;u.rate=mode==="soft"?.9:1;speechSynthesis.speak(u)}};

// Ask assistant local fallback
$("#chatForm").onsubmit=e=>{e.preventDefault();const input=$("#chatInput"),v=input.value.trim();if(!v)return;addMsg(v,"user");input.value="";setTimeout(()=>addMsg("I’m your Focusly study assistant. Connect an AI API/backend to enable live homework, research, and personalized answers. For now, I can help you navigate your study tools and practice flow.","buddy"),250)}
function addMsg(t,c){const d=document.createElement("div");d.className=`msg ${c}`;d.textContent=t;$("#chat").appendChild(d);d.scrollIntoView({behavior:"smooth",block:"end"})}
addMsg("Hi! I’m Focusly. Ask me about your homework, research, or what you should study next.","buddy");

// Headphone recommendation only once per browser
if(!localStorage.focuslyHeadphonesSeen){$("#headphoneNotice").classList.remove("hidden")}
$("#continueBtn").onclick=()=>{$("#headphoneNotice").classList.add("hidden");localStorage.focuslyHeadphonesSeen="1"};

/* Focusly Buddy — animated and draggable */
(function(){
  const b=document.getElementById('buddy'); if(!b)return;
  let x=Math.max(10,innerWidth-100), y=Math.max(90,innerHeight-180), vx=.55, vy=.18, drag=false,lx=0,ly=0;
  function pos(){x=Math.max(8,Math.min(innerWidth-90,x));y=Math.max(70,Math.min(innerHeight-110,y));b.style.left=x+'px';b.style.top=y+'px';b.style.right='auto';b.style.bottom='auto'}
  function loop(){if(!drag){x+=vx;y+=vy;if(x<8||x>innerWidth-90)vx*=-1;if(y<70||y>innerHeight-110)vy*=-1}b.style.transform=`translateY(${Math.sin(Date.now()/260)*3}px)`;pos();requestAnimationFrame(loop)}
  b.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;ly=e.clientY;b.setPointerCapture?.(e.pointerId);b.classList.add('buddy-dragging')});
  b.addEventListener('pointermove',e=>{if(!drag)return;x+=e.clientX-lx;y+=e.clientY-ly;lx=e.clientX;ly=e.clientY;pos()});
  b.addEventListener('pointerup',()=>{drag=false;b.classList.remove('buddy-dragging')});
  addEventListener('resize',pos);pos();loop();
  window.focuslyBuddyReact=()=>{b.classList.add('buddy-talking');setTimeout(()=>b.classList.remove('buddy-talking'),900)}
})();
