const openChat = document.querySelector('#openChat');
const closeChat = document.querySelector('#closeChat');
const sitePreview = document.querySelector('#sitePreview');
const chatStage = document.querySelector('#chatStage');
const chatBody = document.querySelector('#chatBody');
const emptyState = document.querySelector('#emptyState');
const emptyTitle = emptyState.querySelector('h2');
const emptyDescription = emptyState.querySelector('p');
const starterGrid = document.querySelector('#starterGrid');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');
const languageSelect = document.querySelector('#languageSelect');
const caseStrip = document.querySelector('#caseStrip');
const caseIntent = document.querySelector('#caseIntent');
const caseBooking = document.querySelector('#caseBooking');
const caseStatus = document.querySelector('#caseStatus');

let language = 'en';
let started = false;
let ended = false;
let activeIntent = 'General';
let supportCaseCount = 0;
let supportFormCount = 0;

const ui = {
  en: {
    emptyTitle: 'Choose a support topic',
    emptyDescription: 'Select a topic below or type a keyword to get help.',
    input: 'Type a keyword or choose a button...',
    endedInput: 'Chat ended',
    welcome: 'Welcome to Festrips. Please choose a prepared support topic.',
    chooseAnother: 'Sure. Please choose another topic.',
    fallback: 'Please choose one of the prepared topics below.',
    loading: 'One moment, preparing the answer...',
    support: 'Please provide your name, contact, booking code if any, and concern. A Festrips team member should review booking-specific issues.',
    end: 'Thank you for contacting Festrips. You can close this chat or reopen the chatbot if you need more help later.',
    prepared: 'View common questions',
    talkSupport: 'Talk to Support',
    supportSub: 'Create a support case',
    askAnother: 'Ask another question',
    askAnotherSub: 'Return to the main FAQ topics',
    endChat: 'End chat',
    endChatSub: 'Finish this conversation',
    userAskAnother: 'Ask another question',
    userEnd: 'End chat',
    intent: 'Intent',
    booking: 'Booking',
    status: 'Status',
    general: 'General',
    notProvided: 'Not provided',
    selfService: 'Self-service',
    faqBrowsing: 'FAQ browsing',
    supportDraft: 'Support case draft',
    caseCreated: 'Support case created',
    reviewRequest: 'Your request has been prepared. Would you like to edit it or end the chat?',
    editRequest: 'Edit request',
    editRequestSub: 'Keep the form open and update details',
    finishRequest: 'End chat',
    finishRequestSub: 'Lock the submitted form',
    editHint: 'You can edit the form above and submit it again.',
    submitCase: 'Submit request',
    resubmitCase: 'Submit updated request',
    formTitle: 'Support Request Form',
    fullName: 'Full Name',
    email: 'Email',
    contact: 'Contact Number',
    productType: 'Product Type',
    bookingCode: 'Booking Code',
    travelDate: 'Travel Date',
    concern: 'Concern',
    optional: 'Optional',
    ended: 'Ended',
    meta: 'Festrips Button Assistant | Just now'
  },
  ko: {
    emptyTitle: '문의 유형을 선택해 주세요',
    emptyDescription: '아래 문의 유형을 선택하거나 키워드를 입력해 주세요.',
    input: '키워드를 입력하거나 버튼을 선택하세요...',
    endedInput: '채팅 종료됨',
    welcome: 'Festrips에 오신 것을 환영합니다. 준비된 문의 유형을 선택해 주세요.',
    chooseAnother: '좋습니다. 다른 문의 유형을 선택해 주세요.',
    fallback: '아래 준비된 문의 유형 중 하나를 선택해 주세요.',
    loading: '잠시만 기다려 주세요. 답변을 준비하고 있습니다...',
    support: '이름, 연락처, 예약 코드가 있다면 예약 코드, 문의 내용을 남겨주세요. 예약별 확인은 Festrips 담당자 검토가 필요합니다.',
    end: 'Festrips에 문의해 주셔서 감사합니다. 채팅을 닫거나 나중에 다시 열어 문의하실 수 있습니다.',
    prepared: '자주 묻는 질문 보기',
    talkSupport: '상담원 연결',
    supportSub: '상담 케이스 생성',
    askAnother: '다른 질문하기',
    askAnotherSub: '처음 문의 유형으로 돌아가기',
    endChat: '채팅 종료',
    endChatSub: '이 대화 마치기',
    userAskAnother: '다른 질문하기',
    userEnd: '채팅 종료',
    intent: '문의 유형',
    booking: '예약',
    status: '상태',
    general: '일반',
    notProvided: '미입력',
    selfService: '자동 응대',
    faqBrowsing: 'FAQ 탐색 중',
    supportDraft: '상담 케이스 작성 중',
    caseCreated: '상담 케이스 생성됨',
    reviewRequest: '상담 요청이 준비되었습니다. 내용을 수정하시겠습니까, 아니면 채팅을 종료하시겠습니까?',
    editRequest: '수정하기',
    editRequestSub: '양식을 열어둔 상태로 내용 수정',
    finishRequest: '채팅 종료',
    finishRequestSub: '제출한 양식 잠그기',
    editHint: '위 양식을 수정한 뒤 다시 제출할 수 있습니다.',
    submitCase: '요청 제출',
    resubmitCase: '수정 내용 다시 제출',
    formTitle: '상담 요청 양식',
    fullName: '이름',
    email: '이메일',
    contact: '연락처',
    productType: '상품 유형',
    bookingCode: '예약 코드',
    travelDate: '여행일',
    concern: '문의 내용',
    optional: '선택',
    ended: '종료됨',
    meta: 'Festrips Button Assistant | 방금 전'
  },
  tl: {
    emptyTitle: 'Pumili ng support topic',
    emptyDescription: 'Pumili ng topic sa ibaba o mag-type ng keyword.',
    input: 'Mag-type ng keyword o pumili ng button...',
    endedInput: 'Tapos na ang chat',
    welcome: 'Welcome sa Festrips. Pumili ng nakahandang support topic.',
    chooseAnother: 'Sige. Pumili pa ng ibang topic.',
    fallback: 'Pumili ng isa sa mga nakahandang topic sa ibaba.',
    loading: 'Sandali lang, inihahanda ko ang sagot...',
    support: 'Pakibigay ang pangalan, contact, booking code kung mayroon, at concern. Kailangang i-review ng Festrips team ang booking-specific issues.',
    end: 'Salamat sa pakikipag-ugnayan sa Festrips. Maaari mong isara ang chat o buksan ulit kung kailangan mo pa ng tulong.',
    prepared: 'Tingnan ang common questions',
    talkSupport: 'Kausapin ang Support',
    supportSub: 'Gumawa ng support case',
    askAnother: 'Magtanong pa',
    askAnotherSub: 'Bumalik sa main FAQ topics',
    endChat: 'Tapusin ang chat',
    endChatSub: 'Tapusin ang usapan',
    userAskAnother: 'Magtanong pa',
    userEnd: 'Tapusin ang chat',
    intent: 'Uri ng Inquiry',
    booking: 'Booking',
    status: 'Status',
    general: 'General',
    notProvided: 'Hindi pa nailalagay',
    selfService: 'Self-service',
    faqBrowsing: 'FAQ browsing',
    supportDraft: 'Draft ng support case',
    caseCreated: 'Nagawa ang support case',
    reviewRequest: 'Nakahanda na ang support request. Gusto mo bang i-edit ito o tapusin ang chat?',
    editRequest: 'I-edit ang request',
    editRequestSub: 'Panatilihing bukas ang form at baguhin ang details',
    finishRequest: 'Tapusin ang chat',
    finishRequestSub: 'I-lock ang submitted form',
    editHint: 'Pwede mong i-edit ang form sa itaas at i-submit ulit.',
    submitCase: 'I-submit ang request',
    resubmitCase: 'I-submit ang updated request',
    formTitle: 'Support Request Form',
    fullName: 'Buong Pangalan',
    email: 'Email',
    contact: 'Contact Number',
    productType: 'Uri ng Produkto',
    bookingCode: 'Booking Code',
    travelDate: 'Petsa ng Biyahe',
    concern: 'Concern',
    optional: 'Optional',
    ended: 'Tapos na',
    meta: 'Festrips Button Assistant | Ngayon lang'
  }
};

const topics = {
  'Tour Package': {
    labels: { en: 'Tour Package', ko: '투어 패키지', tl: 'Tour Package / Pakete ng Tour' },
    faqs: {
      en: [
        ['What is included?', 'Tour packages may include flights, accommodations, meals, transfers, and tours depending on the itinerary.'],
        ['Is it confirmed immediately?', 'No. Final confirmation is issued after payment verification and supplier availability confirmation.'],
        ['Are deposits refundable?', 'Deposits are generally non-refundable because they secure airline seats and land arrangements.']
      ],
      ko: [
        ['무엇이 포함되나요?', '투어 패키지는 일정에 따라 항공, 숙박, 식사, 차량 이동, 투어 등이 포함될 수 있습니다.'],
        ['즉시 확정되나요?', '아닙니다. 결제 확인 및 공급사 가능 여부가 확인된 후 최종 확정됩니다.'],
        ['보증금은 환불되나요?', '보증금은 항공 좌석과 현지 서비스 확보에 사용되므로 일반적으로 환불되지 않습니다.']
      ],
      tl: [
        ['Ano ang kasama?', 'Maaaring kasama ang flights, accommodation, meals, transfers, at tours depende sa itinerary.'],
        ['Confirmed ba agad?', 'Hindi. Final confirmation ay ibinibigay pagkatapos ma-verify ang bayad at supplier availability.'],
        ['Refundable ba ang deposit?', 'Karaniwang hindi refundable ang deposit dahil ginagamit ito para ma-secure ang airline seats at land arrangements.']
      ]
    }
  },
  'Flight Booking': {
    labels: { en: 'Flight Booking', ko: '항공권 예약', tl: 'Flight Booking / Booking ng Flight' },
    faqs: {
      en: [
        ['Are fares guaranteed?', 'Fares may change until booking is confirmed and ticketed.'],
        ['When is e-ticket issued?', 'E-tickets are sent after payment is confirmed and ticketing is completed.'],
        ['Can I rebook or refund?', 'Changes and refunds depend on airline fare rules, availability, and applicable fees.']
      ],
      ko: [
        ['요금은 보장되나요?', '항공 요금은 예약 확정 및 발권 전까지 변동될 수 있습니다.'],
        ['e-ticket은 언제 발행되나요?', '결제가 확인되고 발권이 완료된 후 e-ticket이 발송됩니다.'],
        ['변경이나 환불이 가능한가요?', '변경 및 환불은 항공사 운임 규정, 좌석 가능 여부, 수수료에 따라 달라집니다.']
      ],
      tl: [
        ['Guaranteed ba ang fare?', 'Maaaring magbago ang fare hanggang hindi pa confirmed at ticketed ang booking.'],
        ['Kailan lalabas ang e-ticket?', 'Ipinapadala ang e-ticket pagkatapos ma-confirm ang bayad at matapos ang ticketing.'],
        ['Pwede bang mag-rebook o refund?', 'Changes and refunds ay nakadepende sa airline fare rules, availability, at applicable fees.']
      ]
    }
  },
  'Hotel Reservation': {
    labels: { en: 'Hotel Reservation', ko: '호텔 예약', tl: 'Hotel Reservation / Reserbasyon sa Hotel' },
    faqs: {
      en: [
        ['Is hotel confirmed immediately?', 'Hotel bookings are confirmed only after payment and supplier availability confirmation.'],
        ['When is voucher issued?', 'Hotel vouchers are issued after payment confirmation and booking finalization.'],
        ['What about no-show?', 'No-show bookings are generally non-refundable and subject to hotel policies.']
      ],
      ko: [
        ['호텔 예약은 즉시 확정되나요?', '호텔 예약은 결제 및 공급사 가능 여부 확인 후 확정됩니다.'],
        ['바우처는 언제 발행되나요?', '결제 확인 및 예약 최종 처리 후 호텔 바우처가 발행됩니다.'],
        ['노쇼는 어떻게 되나요?', '노쇼 예약은 일반적으로 환불되지 않으며 호텔 정책이 적용됩니다.']
      ],
      tl: [
        ['Confirmed ba agad ang hotel?', 'Confirmed lang ang hotel booking pagkatapos ng payment at supplier availability confirmation.'],
        ['Kailan lalabas ang voucher?', 'Ibinibigay ang hotel voucher pagkatapos ng payment confirmation at booking finalization.'],
        ['Paano kung no-show?', 'Ang no-show bookings ay karaniwang non-refundable at subject sa hotel policies.']
      ]
    }
  },
  'Existing Booking': {
    labels: { en: 'Existing Booking', ko: '기존 예약', tl: 'Existing Booking / Kasalukuyang Booking' },
    faqs: {
      en: [
        ['Payment confirmation', 'Payment confirmation is booking-specific. Please provide your booking code for support review.'],
        ['Ticket / voucher status', 'Ticket and voucher status requires booking-specific review by Festrips support.'],
        ['Incorrect details', 'Incorrect passenger or guest details may involve penalties or reissuance. Support review is recommended.']
      ],
      ko: [
        ['결제 확인', '결제 확인은 예약별 검토가 필요합니다. 지원팀 확인을 위해 예약 코드를 알려주세요.'],
        ['항공권 / 바우처 상태', '항공권 및 바우처 상태는 Festrips 지원팀의 예약별 확인이 필요합니다.'],
        ['정보 오류', '탑승객 또는 투숙객 정보 오류는 패널티나 재발행이 발생할 수 있어 담당자 확인이 필요합니다.']
      ],
      tl: [
        ['Kumpirmasyon ng bayad', 'Booking-specific ang payment confirmation. Pakibigay ang booking code para ma-review ng support.'],
        ['Status ng ticket / voucher', 'Kailangan ng booking-specific review ng Festrips support para sa ticket at voucher status.'],
        ['Maling details', 'Maling passenger o guest details ay maaaring magdulot ng penalties o reissuance. Recommended ang support review.']
      ]
    }
  },
  'Cancellation / Refund': {
    labels: { en: 'Cancellation / Refund', ko: '취소 / 환불', tl: 'Pagkansela / Refund' },
    faqs: {
      en: [
        ['Request cancellation or refund', 'Cancellation and refund requests are subject to supplier policies, timing, penalties, and booking-specific review. Please complete the support request form so the Festrips team can check your case.'],
        ['How is refund amount calculated?', 'Refund amounts depend on selling price, supplier penalty, refund service fee, and supplier approval. Festrips support must review the booking details.'],
        ['Can I change to another travel date?', 'Date changes may be considered case-by-case, subject to supplier approval, seat availability, fare differences, and penalties.']
      ],
      ko: [
        ['취소 또는 환불 요청하기', '취소 및 환불은 공급사 정책, 요청 시점, 패널티, 예약별 검토에 따라 달라집니다. Festrips 담당자가 확인할 수 있도록 상담 요청 양식을 작성해 주세요.'],
        ['환불 금액은 어떻게 계산되나요?', '환불 금액은 판매가, 공급사 패널티, 환불 서비스 수수료, 공급사 승인 여부에 따라 달라지므로 예약별 검토가 필요합니다.'],
        ['다른 날짜로 변경할 수 있나요?', '날짜 변경은 공급사 승인, 좌석 가능 여부, 운임 차액, 패널티에 따라 케이스별로 검토됩니다.']
      ],
      tl: [
        ['Humiling ng cancellation o refund', 'Ang cancellation at refund requests ay nakadepende sa supplier policies, timing, penalties, at booking-specific review. Pakikumpleto ang support request form para ma-check ng Festrips team.'],
        ['Paano kinakalkula ang refund amount?', 'Ang refund amount ay nakadepende sa selling price, supplier penalty, refund service fee, at supplier approval. Kailangang i-review ng Festrips support ang booking details.'],
        ['Pwede bang lumipat sa ibang travel date?', 'Date changes ay case-by-case at subject sa supplier approval, seat availability, fare differences, at penalties.']
      ]
    }
  }
};

function text(key) { return ui[language][key]; }
function topicLabel(key) { return topics[key].labels[language]; }
function scrollDown() { chatBody.scrollTop = chatBody.scrollHeight; }

function bot(content) {
  const row = document.createElement('div');
  row.className = 'message-row';
  row.innerHTML = `<div class="avatar">F</div><div class="bubble-wrap"><div class="bubble">${content}</div><div class="meta">${text('meta')}</div></div>`;
  chatBody.append(row);
  scrollDown();
}

function botLoading(content, after) {
  const row = document.createElement('div');
  row.className = 'message-row typing-row';
  row.innerHTML = `<div class="avatar">F</div><div class="bubble-wrap"><div class="bubble loading-bubble"><span class="loading-spinner" aria-hidden="true"></span><span>${text('loading')}</span></div><div class="meta">${text('meta')}</div></div>`;
  chatBody.append(row);
  scrollDown();
  window.setTimeout(() => {
    row.remove();
    bot(content);
    if (after) after();
  }, 380);
}

function user(content) {
  const row = document.createElement('div');
  row.className = 'message-row user';
  row.innerHTML = `<div class="bubble-wrap"><div class="bubble">${content}</div></div>`;
  chatBody.append(row);
  scrollDown();
}

function updateStaticLanguage() {
  emptyTitle.textContent = text('emptyTitle');
  emptyDescription.textContent = text('emptyDescription');
  messageInput.placeholder = ended ? text('endedInput') : text('input');
  caseIntent.textContent = `${text('intent')}: ${activeIntent === 'General' ? text('general') : topicLabel(activeIntent)}`;
  caseBooking.textContent = `${text('booking')}: ${text('notProvided')}`;
  caseStatus.textContent = `${text('status')}: ${ended ? text('ended') : text('selfService')}`;
  renderStarterGrid();
}

function resetChatForLanguage() {
  started = false;
  ended = false;
  activeIntent = 'General';
  chatBody.querySelectorAll('.message-row, .choice-list, .faq-list').forEach(node => node.remove());
  emptyState.classList.remove('is-hidden');
  caseStrip.classList.add('is-hidden');
  messageInput.disabled = false;
  updateStaticLanguage();
}

function renderStarterGrid() {
  starterGrid.innerHTML = Object.keys(topics).map(key => `<button data-topic="${key}">${topicLabel(key)}</button>`).join('');
}

function start() {
  if (started) return;
  started = true;
  ended = false;
  emptyState.classList.add('is-hidden');
  caseStrip.classList.remove('is-hidden');
  messageInput.disabled = false;
  messageInput.placeholder = text('input');
  bot(text('welcome'));
  renderTopics();
}

function renderTopics() {
  const list = document.createElement('div');
  list.className = 'choice-list';
  list.innerHTML = Object.keys(topics).map(key => `
    <button class="choice-button" data-topic="${key}">
      ${topicLabel(key)}<small>${text('prepared')}</small>
    </button>
  `).join('') + `
    <button class="choice-button" data-support="true">
      ${text('talkSupport')}<small>${text('supportSub')}</small>
    </button>
  `;
  chatBody.append(list);
  scrollDown();
}

function renderFaq(topic) {
  activeIntent = topic;
  caseIntent.textContent = `${text('intent')}: ${topicLabel(topic)}`;
  caseStatus.textContent = `${text('status')}: ${text('faqBrowsing')}`;
  const list = document.createElement('div');
  list.className = 'faq-list';
  list.innerHTML = topics[topic].faqs[language].map((item, index) => `
    <button class="faq-button" data-topic="${topic}" data-index="${index}">${item[0]}</button>
  `).join('');
  chatBody.append(list);
  scrollDown();
}

function renderNextActions() {
  const actions = document.createElement('div');
  actions.className = 'choice-list next-actions';
  actions.innerHTML = `
    <button class="choice-button" data-next="again">${text('askAnother')}<small>${text('askAnotherSub')}</small></button>
    <button class="choice-button" data-next="end">${text('endChat')}<small>${text('endChatSub')}</small></button>
  `;
  chatBody.append(actions);
  scrollDown();
}

function productOptions() {
  const current = activeIntent === 'General' ? text('general') : topicLabel(activeIntent);
  const remaining = Object.keys(topics)
    .filter(key => key !== activeIntent)
    .map(key => `<option value="${key}">${topicLabel(key)}</option>`)
    .join('');
  return `<option value="${activeIntent}">${current}</option>${remaining}`;
}

function renderSupportForm(reason = '') {
  const formId = `support-${++supportFormCount}`;
  const form = document.createElement('form');
  form.className = 'support-form';
  form.innerHTML = `
    <div class="field full"><strong>${text('formTitle')}</strong></div>
    <div class="field"><label for="${formId}-name">${text('fullName')}</label><input id="${formId}-name" required name="name" placeholder="Juan Dela Cruz"></div>
    <div class="field"><label for="${formId}-email">${text('email')}</label><input id="${formId}-email" required type="email" name="email" placeholder="juan@example.com"></div>
    <div class="field"><label for="${formId}-contact">${text('contact')}</label><input id="${formId}-contact" required name="contact" placeholder="+63 912 345 6789"></div>
    <div class="field"><label for="${formId}-product">${text('productType')}</label><select id="${formId}-product" required name="product">${productOptions()}</select></div>
    <div class="field"><label for="${formId}-booking">${text('bookingCode')} (${text('optional')})</label><input id="${formId}-booking" name="booking" placeholder="FT-12345"></div>
    <div class="field"><label for="${formId}-date">${text('travelDate')}</label><input id="${formId}-date" type="date" name="date"></div>
    <div class="field full"><label for="${formId}-concern">${text('concern')}</label><textarea id="${formId}-concern" name="concern" placeholder="${text('support')}">${reason}</textarea></div>
    <button type="submit" data-submit-case>${text('submitCase')}</button>
    <button type="button" data-next="again">${text('askAnother')}</button>
    <button type="button" data-next="end">${text('endChat')}</button>
  `;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const caseId = form.dataset.caseId || `FS-${String(++supportCaseCount).padStart(4, '0')}`;
    form.dataset.caseId = caseId;
    form.dataset.submitted = 'true';
    caseStatus.textContent = `${text('status')}: ${text('caseCreated')} ${caseId}`;
    if (data.booking) caseBooking.textContent = `${text('booking')}: ${data.booking}`;
    form.querySelector('[data-form-review]')?.remove();
    form.querySelectorAll('button[data-next]').forEach(button => button.remove());
    form.querySelector('[data-submit-case]').textContent = text('resubmitCase');
    const review = document.createElement('div');
    review.className = 'field full form-review-actions';
    review.dataset.formReview = 'true';
    review.innerHTML = `
      <strong>${text('caseCreated')}: ${caseId}</strong>
      <span>${text('reviewRequest')}</span>
      <button type="button" data-form-action="edit">${text('editRequest')}<small>${text('editRequestSub')}</small></button>
      <button type="button" data-form-action="finish">${text('finishRequest')}<small>${text('finishRequestSub')}</small></button>
    `;
    form.append(review);
    bot(`${text('caseCreated')}: ${caseId}. ${text('reviewRequest')}`);
    scrollDown();
  });
  form.addEventListener('click', event => {
    const button = event.target.closest('button[data-form-action]');
    if (!button) return;
    if (button.dataset.formAction === 'edit') {
      user(text('editRequest'));
      bot(text('editHint'));
      const firstInput = form.querySelector('input, select, textarea');
      firstInput?.focus();
    }
    if (button.dataset.formAction === 'finish') {
      user(text('finishRequest'));
      lockSupportForm(form);
      endChat();
    }
  });
  chatBody.append(form);
  scrollDown();
}

function lockSupportForm(form) {
  form.querySelectorAll('input, select, textarea, button').forEach(control => {
    control.disabled = true;
  });
  form.classList.add('is-locked');
}

function support(reason = '') {
  caseStatus.textContent = `${text('status')}: ${text('supportDraft')}`;
  bot(text('support'));
  renderSupportForm(reason);
}

function askAgain() {
  ended = false;
  caseStatus.textContent = `${text('status')}: ${text('selfService')}`;
  bot(text('chooseAnother'));
  renderTopics();
}

function endChat() {
  ended = true;
  caseStatus.textContent = `${text('status')}: ${text('ended')}`;
  document.querySelectorAll('.support-form').forEach(form => lockSupportForm(form));
  bot(text('end'));
  messageInput.value = '';
  messageInput.disabled = true;
  messageInput.placeholder = text('endedInput');
}

openChat.onclick = () => {
  sitePreview.classList.add('is-hidden');
  chatStage.classList.remove('is-hidden');
  messageInput.focus();
};

closeChat.onclick = () => {
  chatStage.classList.add('is-hidden');
  sitePreview.classList.remove('is-hidden');
};

chatBody.onclick = event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.closest('#starterGrid')) return;
  if (button.dataset.next === 'again') { user(text('userAskAnother')); askAgain(); return; }
  if (button.dataset.next === 'end') { user(text('userEnd')); endChat(); return; }
  if (button.dataset.topic && button.dataset.index == null) { user(topicLabel(button.dataset.topic)); start(); renderFaq(button.dataset.topic); return; }
  if (button.dataset.topic) {
    const item = topics[button.dataset.topic].faqs[language][Number(button.dataset.index)];
    user(item[0]);
    botLoading(item[1], () => {
      if (button.dataset.topic === 'Cancellation / Refund' || item[0].toLowerCase().includes('refund') || item[0].toLowerCase().includes('cancellation') || item[0].includes('환불') || item[0].includes('취소') || item[0].toLowerCase().includes('rebook')) { support(item[0]); } else { renderNextActions(); }
    });
    return;
  }
  if (button.dataset.support) { user(text('talkSupport')); support(); }
};

starterGrid.onclick = event => {
  event.stopPropagation();
  const button = event.target.closest('button');
  if (!button) return;
  user(topicLabel(button.dataset.topic));
  start();
  renderFaq(button.dataset.topic);
};

messageForm.onsubmit = event => {
  event.preventDefault();
  if (ended) return;
  const value = messageInput.value.trim();
  if (!value) return;
  user(value);
  messageInput.value = '';
  start();
  const lowerValue = value.toLowerCase();
  const match = (lowerValue.includes('refund') || lowerValue.includes('cancel') || lowerValue.includes('환불') || lowerValue.includes('취소')) ? 'Cancellation / Refund' : Object.keys(topics).find(key => lowerValue.includes(key.toLowerCase().split(' ')[0]));
  if (match) renderFaq(match);
  else { botLoading(text('fallback'), renderTopics); }
};

languageSelect.onchange = () => {
  language = languageSelect.value;
  resetChatForLanguage();
};

updateStaticLanguage();


