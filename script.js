const services=[{icon:"🪪",title:"नया राशन कार्ड",desc:"पात्रता, आवेदन प्रक्रिया और जरूरी दस्तावेज़ों की जानकारी।",url:"https://fcs.up.gov.in/"},{icon:"👨‍👩‍👧",title:"परिवार का नाम जोड़ें",desc:"परिवार के नए सदस्य का नाम जोड़ने की प्रक्रिया समझें।",url:"https://fcs.up.gov.in/"},{icon:"📄",title:"नाम हटाने की जानकारी",desc:"सदस्य का नाम हटाने के लिए संबंधित प्रक्रिया देखें।",url:"https://fcs.up.gov.in/"},{icon:"✍️",title:"राशन कार्ड में सुधार",desc:"नाम, पता या अन्य विवरण सुधारने के लिए मार्गदर्शन।",url:"https://fcs.up.gov.in/"},{icon:"🔗",title:"आधार लिंकिंग",desc:"आधार संबंधी निर्देश और आधिकारिक पोर्टल तक पहुँचें।",url:"https://fcs.up.gov.in/"},{icon:"☝️",title:"e-KYC सहायता",desc:"e-KYC की उपलब्ध प्रक्रिया और अधिकृत केंद्र की जानकारी।",url:"https://nfsa.gov.in/"},{icon:"🔎",title:"आवेदन स्टेटस",desc:"आधिकारिक वेबसाइट पर उपलब्ध स्थिति-जाँच विकल्प देखें।",url:"https://fcs.up.gov.in/"},{icon:"⬇️",title:"राशन कार्ड डाउनलोड",desc:"सूची या कार्ड देखने/डाउनलोड करने के आधिकारिक विकल्प।",url:"https://fcs.up.gov.in/"},{icon:"🏛️",title:"NFSA की जानकारी",desc:"राष्ट्रीय खाद्य सुरक्षा अधिनियम और संबंधित आधिकारिक जानकारी।",url:"https://nfsa.gov.in/"},{icon:"🪪",title:"आधार की जानकारी",desc:"आधार से जुड़ी जानकारी के लिए UIDAI की आधिकारिक वेबसाइट।",url:"https://www.uidai.gov.in/"},{icon:"🏪",title:"राशन दुकान / वितरण",desc:"राशन वितरण और दुकान से जुड़ी जानकारी के लिए राज्य पोर्टल देखें।",url:"https://fcs.up.gov.in/"}];const grid=document.getElementById("serviceGrid");function render(q=""){const list=services.filter(s=>(s.title+" "+s.desc).toLowerCase().includes(q.toLowerCase()));grid.innerHTML=list.map(s=>'<article class="service-card"><div class="service-icon">'+s.icon+'</div><h3>'+s.title+'</h3><p>'+s.desc+'</p><a href="'+s.url+'" target="_blank" rel="noopener">आधिकारिक पोर्टल खोलें ↗</a></article>').join("");document.getElementById("empty").classList.toggle("hidden",list.length>0)}render();document.getElementById("serviceSearch").addEventListener("input",e=>render(e.target.value));document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));document.getElementById("year").textContent=new Date().getFullYear();document.getElementById("helpForm").addEventListener("submit",e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target).entries());try{const old=JSON.parse(localStorage.getItem("ajjuRationDemoRequests")||"[]");old.push({...data,createdAt:new Date().toLocaleString("hi-IN")});localStorage.setItem("ajjuRationDemoRequests",JSON.stringify(old));document.getElementById("formMsg").textContent="डेमो अनुरोध इस डिवाइस के ब्राउज़र में सेव हुआ। यह किसी कार्यालय को नहीं भेजा गया।";e.target.reset()}catch(err){document.getElementById("formMsg").textContent="ब्राउज़र स्टोरेज उपलब्ध नहीं है।"}});
// Interactive helper tools (preparation only; no government submission)
const docChecklist=document.getElementById("docChecklist");
if(docChecklist){const checks=[...docChecklist.querySelectorAll('input[type="checkbox"]')];const count=document.getElementById("checkCount");const bar=document.getElementById("checkProgress");function updateChecklist(){const done=checks.filter(c=>c.checked).length;count.textContent=done+" में से "+checks.length+" काम पूरे";bar.style.width=(done/checks.length*100)+"%"}checks.forEach(c=>c.addEventListener("change",updateChecklist));document.getElementById("resetChecklist").addEventListener("click",()=>{checks.forEach(c=>c.checked=false);updateChecklist()});document.getElementById("printChecklist").addEventListener("click",()=>window.print());updateChecklist()}
const portalChoice=document.getElementById("portalChoice");if(portalChoice){document.getElementById("openPortal").addEventListener("click",()=>{const url=portalChoice.value;const msg=document.getElementById("portalMsg");if(!url){msg.textContent="पहले एक सेवा चुनें।";return}window.open(url,"_blank","noopener,noreferrer");msg.textContent="आधिकारिक वेबसाइट नए टैब में खोलने का प्रयास किया गया।"})}


// Ajju AI Ration Sahayak — local FAQ assistant (no API key or personal data collection)
(function initRationChatbot(){
  const panel=document.getElementById("chatPanel");
  const launcher=document.getElementById("chatLauncher");
  const close=document.getElementById("chatClose");
  const form=document.getElementById("chatForm");
  const input=document.getElementById("chatInput");
  const messages=document.getElementById("chatMessages");
  const suggestions=document.getElementById("chatSuggestions");
  if(!panel||!launcher||!close||!form||!input||!messages)return;
  const UP="https://fcs.up.gov.in/";
  const NFSA="https://nfsa.gov.in/";
  const UIDAI="https://www.uidai.gov.in/";
  function answerFor(raw){
    const q=raw.toLowerCase().replace(/[!?.,।]/g," ").replace(/\s+/g," ").trim();
    if(/\b(hello|hi|hey)\b/.test(q)||q.includes("नमस्ते")||q.includes("प्रणाम")||q.includes("हेलो"))
      return {text:"नमस्ते! 🙏 राशन कार्ड से जुड़ा कौन-सा काम करना है? मैं प्रक्रिया, दस्तावेज़ और आधिकारिक पोर्टल के बारे में सामान्य जानकारी दे सकता हूँ।",url:null};
    if(q.includes("नया")&&(q.includes("कार्ड")||q.includes("राशन"))||q.includes("new ration"))
      return {text:"नया राशन कार्ड बनवाने के लिए पहले उत्तर प्रदेश खाद्य एवं रसद विभाग के पोर्टल पर उपलब्ध नवीनतम निर्देश देखें। पात्रता और दस्तावेज़ परिवार की स्थिति के अनुसार तय होते हैं। मैं यहाँ से आवेदन जमा नहीं कर सकता।",url:UP,label:"UP खाद्य एवं रसद पोर्टल खोलें"};
    if(q.includes("जोड़")||q.includes("jod")||q.includes("add member")||q.includes("नाम जोड़")||q.includes("सदस्य जोड़"))
      return {text:"परिवार के सदस्य का नाम जोड़ने के लिए UP खाद्य एवं रसद विभाग के पोर्टल पर संशोधन/सदस्य जोड़ने से जुड़े विकल्प और निर्देश देखें। आवश्यक प्रमाण सेवा के अनुसार बदल सकते हैं।",url:UP,label:"आधिकारिक पोर्टल खोलें"};
    if(q.includes("हटाने")||q.includes("हटाना")||q.includes("नाम हट")||q.includes("remove member"))
      return {text:"राशन कार्ड से सदस्य का नाम हटाने के लिए राज्य के आधिकारिक पोर्टल या अधिकृत केंद्र से सही प्रक्रिया की पुष्टि करें।",url:UP,label:"UP पोर्टल खोलें"};
    if(q.includes("e-kyc")||q.includes("ekyc")||q.includes("ई केवाईसी")||q.includes("केवाईसी"))
      return {text:"e-KYC के लिए आधिकारिक निर्देश देखें और जरूरत पड़ने पर उचित राशन दुकान/अधिकृत केंद्र से संपर्क करें। अपना OTP या आधार नंबर इस चैट में न भेजें।",url:UP,label:"UP खाद्य एवं रसद पोर्टल खोलें"};
    if(q.includes("स्टेटस")||q.includes("status")||q.includes("आवेदन की स्थिति")||q.includes("application status"))
      return {text:"आवेदन का स्टेटस देखने के लिए UP खाद्य एवं रसद विभाग की आधिकारिक वेबसाइट पर उपलब्ध स्थिति-जाँच विकल्प खोजें। विकल्प और प्रक्रिया बदल सकती है; आवेदन की रसीद/संदर्भ संख्या अपने पास रखें।",url:UP,label:"स्टेटस के लिए आधिकारिक पोर्टल"};
    if(q.includes("डाउनलोड")||q.includes("download")||q.includes("प्रिंट")||q.includes("कार्ड कैसे देखें"))
      return {text:"राशन कार्ड सूची या कार्ड डाउनलोड करने के लिए राज्य के आधिकारिक पोर्टल पर उपलब्ध सूची/डाउनलोड विकल्प देखें। अपनी निजी जानकारी केवल आधिकारिक वेबसाइट पर ही दर्ज करें।",url:UP,label:"UP पोर्टल खोलें"};
    if(q.includes("दस्तावेज़")||q.includes("दस्तावेज")||q.includes("document")||q.includes("कागज")||q.includes("काग़ज़"))
      return {text:"आमतौर पर आधार, पते और परिवार से संबंधित दस्तावेज़ मांगे जा सकते हैं। सही सूची सेवा और स्थिति पर निर्भर है, इसलिए आवेदन से पहले आधिकारिक निर्देश जरूर देखें।",url:UP,label:"आधिकारिक दस्तावेज़ निर्देश देखें"};
    if(q.includes("आधार")||q.includes("aadhaar")||q.includes("uidai"))
      return {text:"आधार से जुड़ी जानकारी और सेवाओं के लिए UIDAI की आधिकारिक वेबसाइट का उपयोग करें। इस चैट में पूरा आधार नंबर, OTP या कोई दस्तावेज़ न भेजें।",url:UIDAI,label:"UIDAI आधिकारिक वेबसाइट"};
    if(q.includes("पात्र")||q.includes("पात्रता")||q.includes("eligible")||q.includes("eligibility"))
      return {text:"राशन कार्ड की पात्रता परिवार की स्थिति और लागू सरकारी नियमों पर निर्भर करती है। मैं आपकी पात्रता की आधिकारिक पुष्टि नहीं कर सकता; कृपया राज्य के नवीनतम नियम देखें।",url:UP,label:"आधिकारिक नियम देखें"};
    if(q.includes("nfsa")||q.includes("राष्ट्रीय खाद्य"))
      return {text:"राष्ट्रीय खाद्य सुरक्षा अधिनियम (NFSA) से जुड़ी जानकारी के लिए राष्ट्रीय आधिकारिक पोर्टल देखें।",url:NFSA,label:"NFSA पोर्टल खोलें"};
    if(q.includes("शिकायत")||q.includes("complaint")||q.includes("हेल्पलाइन")||q.includes("helpline")||q.includes("राशन नहीं"))
      return {text:"राशन वितरण या दुकान से जुड़ी शिकायत के लिए राज्य के आधिकारिक पोर्टल पर उपलब्ध शिकायत/संपर्क विकल्प देखें। स्थानीय स्थिति के अनुसार अधिकृत विभाग से पुष्टि करें।",url:UP,label:"UP पोर्टल और संपर्क विकल्प"};
    if(q.includes("फीस")||q.includes("पैसा")||q.includes("कितना खर्च")||q.includes("charge"))
      return {text:"फीस या सेवा शुल्क के बारे में केवल आधिकारिक पोर्टल या अधिकृत केंद्र से पुष्टि करें। किसी अनजान व्यक्ति को बिना रसीद पैसे न दें।",url:UP,label:"आधिकारिक पोर्टल खोलें"};
    if(q.includes("सरकारी वेबसाइट")||q.includes("official website")||q.includes("लिंक"))
      return {text:"यह स्वतंत्र सहायता वेबसाइट है, सरकारी वेबसाइट नहीं। राशन कार्ड के लिए राज्य का आधिकारिक पोर्टल और राष्ट्रीय जानकारी के लिए NFSA पोर्टल इस्तेमाल करें।",url:UP,label:"UP खाद्य एवं रसद पोर्टल"};
    return {text:"मैं इस सवाल का सटीक जवाब अभी नहीं पहचान पाया। आप इनमें से किसी विषय पर पूछें: नया राशन कार्ड, सदस्य जोड़ना/हटाना, e-KYC, स्टेटस, डाउनलोड या दस्तावेज़। नवीनतम और आधिकारिक जानकारी के लिए सरकारी पोर्टल देखें।",url:UP,label:"UP आधिकारिक पोर्टल"};
  }
  function addBubble(text,kind,link,label){
    const bubble=document.createElement("div");
    bubble.className="chat-bubble "+(kind==="user"?"user-bubble":"bot-bubble");
    bubble.textContent=text;
    if(link&&kind!=="user"){
      const anchor=document.createElement("a");
      anchor.href=link;anchor.target="_blank";anchor.rel="noopener noreferrer";
      anchor.textContent="\n"+(label||"आधिकारिक पोर्टल खोलें")+" ↗";
      bubble.appendChild(document.createElement("br"));
      bubble.appendChild(anchor);
    }
    messages.appendChild(bubble);
    messages.scrollTop=messages.scrollHeight;
  }
  function sendQuestion(question){
    const clean=question.trim();
    if(!clean)return;
    addBubble(clean,"user");
    const answer=answerFor(clean);
    addBubble(answer.text,"bot",answer.url,answer.label);
  }
  launcher.addEventListener("click",()=>{panel.hidden=!panel.hidden;launcher.setAttribute("aria-expanded",String(!panel.hidden));if(!panel.hidden)input.focus()});
  close.addEventListener("click",()=>{panel.hidden=true;launcher.setAttribute("aria-expanded","false");launcher.focus()});
  form.addEventListener("submit",e=>{e.preventDefault();const q=input.value;input.value="";sendQuestion(q);input.focus()});
  suggestions.addEventListener("click",e=>{const button=e.target.closest("button[data-question]");if(button)sendQuestion(button.dataset.question)});
})();
