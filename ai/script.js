const openChat = document.querySelector('#openChat');
const closeChat = document.querySelector('#closeChat');
const sitePreview = document.querySelector('#sitePreview');
const chatStage = document.querySelector('#chatStage');
const chatBody = document.querySelector('#chatBody');
const emptyState = document.querySelector('#emptyState');
const starterGrid = document.querySelector('#starterGrid');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');
const languageSelect = document.querySelector('#languageSelect');
const caseStrip = document.querySelector('#caseStrip');
const caseBooking = document.querySelector('#caseBooking');
const caseStatus = document.querySelector('#caseStatus');
let started=false;let history=[];let supportCaseCount=0;
let lastBookingCode='';
const starterExamples={
  en:[
    ['Refund rules','Can I refund my flight booking?'],
    ['Hotel confirmation','Is my hotel booking confirmed immediately?'],
    ['Existing booking','I need help with booking FT-12345'],
    ['Tour deposits','How do tour package deposits work?']
  ],
  ko:[
    ['환불 규정','항공권 예약을 환불할 수 있나요?'],
    ['호텔 확정','호텔 예약은 바로 확정되나요?'],
    ['기존 예약','FT-12345 예약 확인이 필요해요.'],
    ['투어 보증금','투어 패키지 보증금은 어떻게 처리되나요?']
  ],
  tl:[
    ['Refund rules','Pwede bang i-refund ang flight booking?'],
    ['Hotel confirmation','Confirmed ba agad ang hotel booking?'],
    ['Existing booking','Kailangan ko ng tulong sa booking FT-12345'],
    ['Tour deposits','Paano gumagana ang tour package deposits?']
  ]
};
const suggestions={
  en:[
    'Are tour packages confirmed immediately?',
    'Can I refund my hotel booking?',
    'When will I receive my e-ticket?',
    'Can I change my travel date?',
    'What if I entered incorrect passenger details?',
    'What payment methods are accepted?'
  ],
  ko:[
    '투어 패키지는 바로 확정되나요?',
    '호텔 예약 환불이 가능한가요?',
    'e-ticket은 언제 받을 수 있나요?',
    '여행 날짜를 변경할 수 있나요?',
    '탑승객 정보를 잘못 입력했어요.',
    '어떤 결제 수단을 사용할 수 있나요?'
  ],
  tl:[
    'Confirmed ba agad ang tour package?',
    'Pwede bang i-refund ang hotel booking?',
    'Kailan ko matatanggap ang e-ticket?',
    'Pwede bang baguhin ang travel date?',
    'Mali ang passenger details ko.',
    'Anong payment methods ang tinatanggap?'
  ]
};
function escapeHtml(value){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
function normalizeMessage(value){return String(value).replace(/\*\*(.*?)\*\*/g,'$1').replace(/\n?(Next step:)/gi,'\n\n$1').replace(/\n{3,}/g,'\n\n').trim();}
function formatMessage(value){return escapeHtml(normalizeMessage(value)).replace(/\n/g,'<br>');}
function renderStarterGrid(){starterGrid.innerHTML=starterExamples[languageSelect.value].map(([label,question])=>`<button data-example="${question}">${label}</button>`).join('');}
function bot(text){const row=document.createElement('div');row.className='message-row';row.innerHTML=`<div class="avatar">F</div><div class="bubble-wrap"><div class="bubble">${formatMessage(text)}</div><div class="meta">Festrips AI Assistant | Just now</div></div>`;chatBody.append(row);chatBody.scrollTop=chatBody.scrollHeight;}
function user(text){const row=document.createElement('div');row.className='message-row user';row.innerHTML=`<div class="bubble-wrap"><div class="bubble">${formatMessage(text)}</div></div>`;chatBody.append(row);chatBody.scrollTop=chatBody.scrollHeight;}
function t(values){return values[languageSelect.value]||values.en;}
function supportText(key){const copy={
  title:{en:'Support Request Form',ko:'상담 요청 양식',tl:'Support Request Form'},
  intro:{en:'Please leave your details so Festrips support can review this case and contact you after checking.',ko:'Festrips 지원팀이 케이스를 검토한 뒤 연락드릴 수 있도록 정보를 남겨주세요.',tl:'Pakilagay ang details para ma-review ng Festrips support ang case at makontak ka pagkatapos.'},
  name:{en:'Full Name',ko:'이름',tl:'Buong Pangalan'},
  email:{en:'Email',ko:'이메일',tl:'Email'},
  contact:{en:'Contact Number',ko:'연락처',tl:'Contact Number'},
  booking:{en:'Booking Code',ko:'예약 코드',tl:'Booking Code'},
  type:{en:'Concern Type',ko:'문의 유형',tl:'Uri ng Concern'},
  concern:{en:'Concern Details',ko:'문의 내용',tl:'Detalye ng Concern'},
  submit:{en:'Submit for review',ko:'검토 요청 제출',tl:'I-submit for review'},
  created:{en:'Support request received',ko:'상담 요청이 접수되었습니다',tl:'Natanggap ang support request'},
  follow:{en:'Festrips support will review your request and contact you after checking the booking details.',ko:'Festrips 지원팀이 예약 내용을 검토한 뒤 연락드릴 예정입니다.',tl:'Ire-review ng Festrips support ang request at kokontakin ka pagkatapos ma-check ang booking details.'}
};return t(copy[key]);}
function needsSupport(value){return /(refund|cancel|change|rebook|incorrect|wrong|passenger|voucher|ticket|payment|\b[A-Z]{2}-?\d{3,}\b|환불|취소|변경|잘못|오입력|탑승객|결제|바우처|티켓|mali|palitan)/i.test(value);}
function concernType(value){if(/refund|환불/i.test(value))return 'Refund / Cancellation';if(/incorrect|wrong|passenger|잘못|오입력|탑승객/i.test(value))return 'Passenger Details';if(/change|rebook|변경/i.test(value))return 'Change / Rebooking';if(/payment|결제/i.test(value))return 'Payment Confirmation';return 'Booking Support';}
function concernTypeOptions(selected){return ['Booking Support','Refund / Cancellation','Passenger Details','Change / Rebooking','Payment Confirmation','Ticket / Voucher Issue'].map(option=>`<option value="${option}"${option===selected?' selected':''}>${option}</option>`).join('');}
function renderSupportForm(reason=''){if(chatBody.querySelector('.support-form'))return;const form=document.createElement('form');form.className='support-form';form.innerHTML=`
  <div class="field full"><strong>${supportText('title')}</strong><span>${supportText('intro')}</span></div>
  <div class="field"><label>${supportText('name')}</label><input required name="name" placeholder="Juan Dela Cruz"></div>
  <div class="field"><label>${supportText('email')}</label><input required type="email" name="email" placeholder="juan@example.com"></div>
  <div class="field"><label>${supportText('contact')}</label><input required name="contact" placeholder="+63 912 345 6789"></div>
  <div class="field"><label>${supportText('booking')}</label><input required name="booking" placeholder="FT-12345" value="${escapeHtml(lastBookingCode)}"></div>
  <div class="field full"><label>${supportText('type')}</label><select required name="type">${concernTypeOptions(concernType(reason))}</select></div>
  <div class="field full"><label>${supportText('concern')}</label><textarea required name="concern">${escapeHtml(reason)}</textarea></div>
  <button type="submit">${supportText('submit')}</button>
`;form.addEventListener('submit',event=>{event.preventDefault();const data=Object.fromEntries(new FormData(form).entries());const caseId=`FS-${String(++supportCaseCount).padStart(4,'0')}`;lastBookingCode=data.booking;caseBooking.textContent='Booking: '+data.booking.toUpperCase();caseStatus.textContent='Status: Support request '+caseId;form.querySelectorAll('input,select,textarea,button').forEach(control=>control.disabled=true);form.classList.add('is-locked');bot(`${supportText('created')}: ${caseId}\n\n${supportText('follow')}`);});chatBody.append(form);chatBody.scrollTop=chatBody.scrollHeight;}
function suggestionTitle(){return languageSelect.value==='ko'?'예상 질문':languageSelect.value==='tl'?'Mga mungkahing tanong':'Suggested questions';}
function renderSuggestions(){chatBody.querySelectorAll('.suggestion-panel').forEach(panel=>panel.remove());const panel=document.createElement('div');panel.className='suggestion-panel';panel.innerHTML=`<strong>${suggestionTitle()}</strong><div>${suggestions[languageSelect.value].map(item=>`<button type="button" data-suggestion="${item}">${item}</button>`).join('')}</div>`;chatBody.append(panel);chatBody.scrollTop=chatBody.scrollHeight;}
function start(){if(started)return;started=true;emptyState.classList.add('is-hidden');caseStrip.classList.remove('is-hidden');bot(languageSelect.value==='ko'?'궁금한 내용을 직접 입력하거나 아래 예상 질문을 선택해 주세요.':languageSelect.value==='tl'?'Mag-type ng tanong o pumili sa mga mungkahing tanong sa ibaba.':'Type your question or choose a suggested question below.');renderSuggestions();}
function typing(){const message=t({en:'One moment, I am checking your request...',ko:'잠시만 기다려 주세요. 문의 내용을 확인하고 있습니다...',tl:'Sandali lang, chine-check ko ang request mo...'});const row=document.createElement('div');row.className='message-row typing-row';row.innerHTML=`<div class="avatar">F</div><div class="bubble-wrap"><div class="bubble loading-bubble"><span class="loading-spinner" aria-hidden="true"></span><span>${message}</span></div><div class="meta">Festrips AI Assistant | Just now</div></div>`;chatBody.append(row);chatBody.scrollTop=chatBody.scrollHeight;return row;}
function detectBooking(text){const m=text.match(/\b[A-Z]{2}-?\d{3,}\b/i);if(m){lastBookingCode=m[0].toUpperCase();caseBooking.textContent='Booking: '+lastBookingCode;}}
async function ask(message){const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,language:languageSelect.value,history:history.slice(-6)})});const data=await res.json().catch(()=>({}));if(!res.ok)throw new Error(data.error||'AI request failed');return data.answer;}
async function send(value){user(value);history.push({role:'user',content:value});start();detectBooking(value);chatBody.querySelectorAll('.suggestion-panel').forEach(panel=>panel.remove());const row=typing();try{const answer=await ask(value);row.remove();bot(answer);history.push({role:'assistant',content:answer});caseStatus.textContent='Status: AI answered';if(needsSupport(value)){renderSupportForm(value);}renderSuggestions();}catch(err){row.remove();bot('OpenRouter AI response failed. Please check the local server API key, model, or free usage limit. You can use the button FAQ version while the API is unavailable. Error: '+err.message);caseStatus.textContent='Status: AI error';if(needsSupport(value)){renderSupportForm(value);}renderSuggestions();}}
openChat.onclick=()=>{sitePreview.classList.add('is-hidden');chatStage.classList.remove('is-hidden');messageInput.focus();};
closeChat.onclick=()=>{chatStage.classList.add('is-hidden');sitePreview.classList.remove('is-hidden');};
starterGrid.onclick=e=>{const b=e.target.closest('button[data-example]');if(!b)return;send(b.dataset.example);};
chatBody.onclick=e=>{const b=e.target.closest('button[data-suggestion]');if(!b)return;send(b.dataset.suggestion);};
messageForm.onsubmit=e=>{e.preventDefault();const value=messageInput.value.trim();if(!value)return;messageInput.value='';send(value);};
languageSelect.onchange=()=>{renderStarterGrid();if(started)renderSuggestions();};
renderStarterGrid();
