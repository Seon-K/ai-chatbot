const sitePreview = document.querySelector("#sitePreview");
const chatStage = document.querySelector("#chatStage");
const openChat = document.querySelector("#openChat");
const closeChat = document.querySelector("#closeChat");
const chatBody = document.querySelector("#chatBody");
const emptyState = document.querySelector("#emptyState");
const emptyTitle = emptyState.querySelector("h2");
const emptyDescription = emptyState.querySelector("p");
const starterGrid = document.querySelector("#starterGrid");
const messageForm = document.querySelector("#messageForm");
const messageInput = document.querySelector("#messageInput");
const languageSelect = document.querySelector("#languageSelect");
const caseStrip = document.querySelector("#caseStrip");
const caseIntent = document.querySelector("#caseIntent");
const caseBooking = document.querySelector("#caseBooking");
const caseStatus = document.querySelector("#caseStatus");

let language = "en";
let started = false;
let activeBooking = "";
let activeIntent = "General";
let supportCaseCount = 0;
const chatHistory = [];

const lang = {
  en: {
    emptyTitle: "How can Festrips help today?",
    emptyDescription: "Send a message to start, or choose a common request below.",
    placeholderStart: "Type your message to start...",
    placeholderNext: "Type another message...",
    greeting: "Thanks for contacting Festrips. I can help with approved FAQs, booking status intake, payment confirmation, changes, cancellation, refund, corporate travel, and sub-agent partnership inquiries.",
    askNext: "Please choose the closest option so I can guide you properly.",
    bookingAsk: "Please enter your booking code so we can prepare the request for the Festrips team. Example: FT-12345.",
    bookingThanks: "Thank you. What would you like to do with this booking?",
    supportIntro: "This needs support review. Please complete the form below and I will create a case.",
    caseCreated: "Your support case has been created. A Festrips team member will contact you using the details provided.",
    fallback: "I can help with tour packages, flights, hotels, existing bookings, payment confirmation, cancellation, refunds, corporate travel, and support handoff.",
    approvedFaq: "Here are approved {intent} FAQs.",
    supportBest: "This request is best handled by a Festrips team member.",
    assistantMeta: "Festrips Assistant | Just now",
    continue: "Continue",
    createCase: "Create Case",
    fields: {
      name: "Full Name",
      email: "Email",
      phone: "Contact Number",
      product: "Product Type",
      booking: "Booking Code",
      travelDate: "Travel Date",
      message: "Message",
      messagePlaceholder: "Please describe your concern."
    },
    case: {
      intent: "Intent",
      booking: "Booking",
      status: "Status",
      notProvided: "Not provided",
      selfService: "Self-service",
      supportDraft: "Support case draft",
      created: "Case created",
      captured: "Booking code captured"
    }
  },
  ko: {
    emptyTitle: "오늘 무엇을 도와드릴까요?",
    emptyDescription: "메시지를 입력해 시작하거나 아래 자주 묻는 문의를 선택하세요.",
    placeholderStart: "메시지를 입력하면 상담이 시작됩니다...",
    placeholderNext: "추가 메시지를 입력하세요...",
    greeting: "Festrips에 문의해 주셔서 감사합니다. FAQ, 예약 상태 접수, 결제 확인, 변경, 취소, 환불, 기업 여행, 서브에이전트 문의를 도와드릴 수 있습니다.",
    askNext: "정확한 안내를 위해 가장 가까운 문의 유형을 선택해 주세요.",
    bookingAsk: "Festrips 담당자가 확인할 수 있도록 예약 코드를 입력해 주세요. 예: FT-12345",
    bookingThanks: "감사합니다. 이 예약과 관련해 어떤 도움이 필요하신가요?",
    supportIntro: "담당자 확인이 필요한 문의입니다. 아래 양식을 입력하면 상담 케이스를 생성하겠습니다.",
    caseCreated: "상담 케이스가 생성되었습니다. Festrips 담당자가 입력하신 연락처로 안내드릴 예정입니다.",
    fallback: "투어 패키지, 항공권, 호텔, 기존 예약, 결제 확인, 취소, 환불, 기업 여행, 상담 연결을 도와드릴 수 있습니다.",
    approvedFaq: "{intent} 관련 FAQ입니다.",
    supportBest: "이 문의는 Festrips 담당자 확인이 가장 적합합니다.",
    assistantMeta: "Festrips Assistant | 방금 전",
    continue: "계속",
    createCase: "케이스 생성",
    fields: {
      name: "이름",
      email: "이메일",
      phone: "연락처",
      product: "상품 유형",
      booking: "예약 코드",
      travelDate: "여행일",
      message: "문의 내용",
      messagePlaceholder: "문의 내용을 입력해 주세요."
    },
    case: {
      intent: "문의 유형",
      booking: "예약",
      status: "상태",
      notProvided: "미입력",
      selfService: "자동 응대",
      supportDraft: "상담 케이스 작성 중",
      created: "케이스 생성됨",
      captured: "예약 코드 입력됨"
    }
  },
  tl: {
    emptyTitle: "Paano makakatulong ang Festrips ngayon?",
    emptyDescription: "Magpadala ng mensahe para magsimula, o pumili ng karaniwang tanong sa ibaba.",
    placeholderStart: "I-type ang mensahe para magsimula...",
    placeholderNext: "Mag-type pa ng mensahe...",
    greeting: "Salamat sa pakikipag-ugnayan sa Festrips. Makakatulong ako sa mga FAQ, pagkuha ng booking status, kumpirmasyon ng bayad, pagbabago, pagkansela, refund, corporate travel, at sub-agent partnership inquiries.",
    askNext: "Piliin ang pinakamalapit na uri ng inquiry para magabayan kita nang maayos.",
    bookingAsk: "Pakilagay ang iyong booking code para maihanda namin ang request para sa Festrips team. Halimbawa: FT-12345.",
    bookingThanks: "Salamat. Ano ang gusto mong gawin tungkol sa booking na ito?",
    supportIntro: "Kailangan itong i-review ng support team. Pakikumpleto ang form sa ibaba at gagawa ako ng support case.",
    caseCreated: "Nagawa na ang iyong support case. Makikipag-ugnayan ang Festrips team gamit ang mga detalyeng ibinigay mo.",
    fallback: "Makakatulong ako sa tour packages, flights, hotels, existing bookings, payment confirmation, cancellation, refunds, corporate travel, at support handoff.",
    approvedFaq: "Narito ang mga approved FAQ para sa {intent}.",
    supportBest: "Mas mabuting i-review ito ng isang Festrips team member.",
    assistantMeta: "Festrips Assistant | Ngayon lang",
    continue: "Magpatuloy",
    createCase: "Gumawa ng Case",
    fields: {
      name: "Buong Pangalan",
      email: "Email",
      phone: "Contact Number",
      product: "Uri ng Produkto",
      booking: "Booking Code",
      travelDate: "Petsa ng Biyahe",
      message: "Mensahe",
      messagePlaceholder: "Pakilarawan ang iyong concern."
    },
    case: {
      intent: "Uri ng Inquiry",
      booking: "Booking",
      status: "Status",
      notProvided: "Hindi pa nailalagay",
      selfService: "Self-service",
      supportDraft: "Draft ng support case",
      created: "Nagawa ang case",
      captured: "Nakuha ang booking code"
    }
  }
};

const intentData = {
  "Tour Package": {
    labels: { en: "Tour Package", ko: "투어 패키지", tl: "Tour Package / Pakete ng Tour" },
    descriptions: {
      en: "Package inclusions, deposits, group departures",
      ko: "포함 사항, 보증금, 단체 출발",
      tl: "Kasama sa package, deposit, group departure"
    }
  },
  "Flight Booking": {
    labels: { en: "Flight Booking", ko: "항공권 예약", tl: "Flight Booking / Booking ng Flight" },
    descriptions: {
      en: "Fares, e-ticket, baggage, rebooking",
      ko: "요금, e-ticket, 수하물, 재예약",
      tl: "Pamasahe, e-ticket, baggage, rebooking"
    }
  },
  "Hotel Reservation": {
    labels: { en: "Hotel Reservation", ko: "호텔 예약", tl: "Hotel Reservation / Reserbasyon sa Hotel" },
    descriptions: {
      en: "Rates, vouchers, room requests, no-show",
      ko: "요금, 바우처, 객실 요청, 노쇼",
      tl: "Rate, voucher, room request, no-show"
    }
  },
  "Existing Booking": {
    labels: { en: "Existing Booking", ko: "기존 예약", tl: "Existing Booking / Kasalukuyang Booking" },
    descriptions: {
      en: "Payment, ticket, voucher, status",
      ko: "결제, 항공권, 바우처, 상태 확인",
      tl: "Bayad, ticket, voucher, status"
    }
  },
  "Cancellation / Refund": {
    labels: { en: "Cancellation / Refund", ko: "취소 / 환불", tl: "Pagkansela / Refund" },
    descriptions: {
      en: "Supplier policy review and case creation",
      ko: "공급사 정책 확인 및 케이스 생성",
      tl: "Supplier policy review at paggawa ng case"
    }
  },
  "Talk to Support": {
    labels: { en: "Talk to Support", ko: "상담원 연결", tl: "Kausapin ang Support" },
    descriptions: {
      en: "Create a support case",
      ko: "상담 케이스 생성",
      tl: "Gumawa ng support case"
    }
  },
  "Payment / Confirmation": {
    labels: { en: "Payment / Confirmation", ko: "결제 / 확정", tl: "Bayad / Kumpirmasyon" },
    descriptions: {
      en: "Payment proof, booking confirmation, status",
      ko: "결제 증빙, 예약 확정, 상태",
      tl: "Proof of payment, confirmation, status"
    }
  }
};

const intentOrder = [
  "Tour Package",
  "Flight Booking",
  "Hotel Reservation",
  "Existing Booking",
  "Cancellation / Refund",
  "Talk to Support"
];

const starterOrder = [
  "Tour Package",
  "Existing Booking",
  "Payment / Confirmation",
  "Cancellation / Refund"
];

const starterMessages = {
  en: {
    "Tour Package": "I want to ask about a tour package",
    "Existing Booking": "I need help with an existing booking",
    "Payment / Confirmation": "How do payment and confirmation work?",
    "Cancellation / Refund": "I want to cancel or request a refund"
  },
  ko: {
    "Tour Package": "투어 패키지에 대해 문의하고 싶어요",
    "Existing Booking": "기존 예약 관련 도움이 필요해요",
    "Payment / Confirmation": "결제와 예약 확정 절차가 궁금해요",
    "Cancellation / Refund": "취소 또는 환불을 요청하고 싶어요"
  },
  tl: {
    "Tour Package": "May tanong ako tungkol sa tour package",
    "Existing Booking": "Kailangan ko ng tulong sa existing booking",
    "Payment / Confirmation": "Paano gumagana ang bayad at kumpirmasyon?",
    "Cancellation / Refund": "Gusto kong magkansela o humiling ng refund"
  }
};

const faqData = {
  en: {
    "Tour Package": [
      ["What is included in a tour package?", "Tour packages may include flights, accommodations, meals, transfers, and tours depending on the specific itinerary."],
      ["Are tour packages confirmed immediately?", "Tour packages are subject to supplier availability. Final confirmation is issued after payment is verified and availability is secured."],
      ["Are deposits refundable?", "Deposits are generally non-refundable because they are used to secure airline seats and land arrangements."]
    ],
    "Flight Booking": [
      ["Are flight bookings guaranteed once I submit a request?", "Flight bookings are confirmed only once payment has been received and ticket issuance has been completed."],
      ["Are airline fares guaranteed?", "Fares may change without prior notice until the booking is confirmed and ticketed."],
      ["Can I rebook or refund my flight?", "Changes and refunds depend on airline fare rules, availability, and applicable fees."]
    ],
    "Hotel Reservation": [
      ["Is my hotel booking confirmed immediately?", "Hotel bookings are confirmed only once payment has been received and the hotel or supplier has confirmed availability."],
      ["When will I receive my hotel voucher?", "Hotel vouchers are issued once payment has been confirmed and the booking is finalized."],
      ["What happens if I do not show up?", "No-show bookings are generally non-refundable and subject to hotel policies."]
    ],
    "Existing Booking": [
      ["Payment confirmation", "Payment confirmation is booking-specific and must be verified by the Festrips support or finance team."],
      ["Ticket / voucher status", "E-tickets and hotel vouchers are issued after payment verification and supplier confirmation."],
      ["Incorrect passenger or guest details", "Incorrect details may cause penalties, reissuance, or inability to use the ticket. Support review is recommended."]
    ],
    "Payment / Confirmation": [
      ["When is a booking final?", "A booking is final only after payment verification and supplier confirmation. Tickets or vouchers are issued after that process."],
      ["What payment methods are accepted?", "Festrips may accept bank transfers, e-wallets, online payments, and other approved payment channels. Instructions are provided upon booking."]
    ]
  },
  ko: {
    "Tour Package": [
      ["투어 패키지에는 무엇이 포함되나요?", "투어 패키지는 일정에 따라 항공, 숙박, 식사, 차량 이동, 투어 등이 포함될 수 있습니다."],
      ["투어 패키지는 즉시 확정되나요?", "아닙니다. 공급사 가능 여부가 확보되고 결제가 확인된 후 최종 확정됩니다."],
      ["보증금은 환불되나요?", "보증금은 항공 좌석과 현지 서비스 확보에 사용되므로 일반적으로 환불되지 않습니다."]
    ],
    "Flight Booking": [
      ["항공권 요청만 하면 예약이 보장되나요?", "항공권은 결제가 확인되고 발권이 완료된 후에만 확정됩니다."],
      ["항공 요금은 보장되나요?", "항공 요금은 예약 확정 및 발권 전까지 사전 고지 없이 변동될 수 있습니다."],
      ["항공권 변경이나 환불이 가능한가요?", "변경 및 환불은 항공사 운임 규정, 좌석 가능 여부, 적용 수수료에 따라 달라집니다."]
    ],
    "Hotel Reservation": [
      ["호텔 예약은 즉시 확정되나요?", "호텔 예약은 결제가 확인되고 호텔 또는 공급사가 가능 여부를 확정한 후 최종 확정됩니다."],
      ["호텔 바우처는 언제 받나요?", "결제가 확인되고 예약이 최종 처리된 후 호텔 바우처가 발행됩니다."],
      ["노쇼가 발생하면 어떻게 되나요?", "노쇼 예약은 일반적으로 환불되지 않으며 호텔 정책이 적용됩니다."]
    ],
    "Existing Booking": [
      ["결제 확인", "결제 확인은 예약별 확인이 필요하며 Festrips 지원팀 또는 재무팀 검토가 필요합니다."],
      ["항공권 / 바우처 상태", "항공권과 호텔 바우처는 결제 확인 및 공급사 확정 후 발행됩니다."],
      ["탑승객 또는 투숙객 정보 오류", "정보 오류는 패널티, 재발행, 이용 불가로 이어질 수 있으므로 담당자 확인이 필요합니다."]
    ],
    "Payment / Confirmation": [
      ["예약은 언제 최종 확정되나요?", "예약은 결제 확인 및 공급사 확정 후 최종 확정됩니다. 이후 항공권 또는 바우처가 발행됩니다."],
      ["어떤 결제 수단을 사용할 수 있나요?", "은행 송금, 전자지갑, 온라인 결제 등 승인된 결제 채널을 사용할 수 있으며 안내는 예약 시 제공됩니다."]
    ]
  },
  tl: {
    "Tour Package": [
      ["Ano ang kasama sa tour package?", "Maaaring kasama sa tour package ang flights, accommodation, meals, transfers, at tours depende sa partikular na itinerary."],
      ["Confirmed ba agad ang tour package?", "Hindi agad. Nakadepende ito sa availability ng supplier. Ibinibigay ang final confirmation pagkatapos ma-verify ang bayad at ma-secure ang availability."],
      ["Refundable ba ang deposit?", "Karaniwang hindi refundable ang deposit dahil ginagamit ito para ma-secure ang airline seats at land arrangements."]
    ],
    "Flight Booking": [
      ["Guaranteed ba ang flight booking pagkatapos mag-submit ng request?", "Confirmed lang ang flight booking kapag natanggap na ang bayad at natapos na ang ticket issuance."],
      ["Guaranteed ba ang airline fare?", "Maaaring magbago ang fare nang walang paunang abiso hanggang hindi pa confirmed at ticketed ang booking."],
      ["Pwede ba akong mag-rebook o mag-refund ng flight?", "Ang changes at refunds ay nakadepende sa airline fare rules, availability, at applicable fees."]
    ],
    "Hotel Reservation": [
      ["Confirmed ba agad ang hotel booking?", "Confirmed lang ang hotel booking kapag natanggap na ang bayad at kinumpirma na ng hotel o supplier ang availability."],
      ["Kailan ko matatanggap ang hotel voucher?", "Ibibigay ang hotel voucher kapag confirmed na ang bayad at finalized na ang booking."],
      ["Ano ang mangyayari kung hindi ako sumipot?", "Ang no-show bookings ay karaniwang hindi refundable at susunod sa hotel policies."]
    ],
    "Existing Booking": [
      ["Kumpirmasyon ng bayad", "Ang payment confirmation ay kailangang i-verify batay sa booking ng Festrips support o finance team."],
      ["Status ng ticket / voucher", "Ibinibigay ang e-ticket at hotel voucher pagkatapos ma-verify ang bayad at makumpirma ng supplier."],
      ["Maling passenger o guest details", "Ang maling detalye ay maaaring magdulot ng penalties, reissuance, o hindi paggamit ng ticket. Inirerekomenda ang support review."]
    ],
    "Payment / Confirmation": [
      ["Kailan nagiging final ang booking?", "Nagiging final ang booking pagkatapos ng payment verification at supplier confirmation. Pagkatapos nito, ibinibigay ang ticket o voucher."],
      ["Anong payment methods ang tinatanggap?", "Maaaring tumanggap ang Festrips ng bank transfer, e-wallets, online payments, at iba pang approved payment channels. Ibibigay ang instructions sa booking."]
    ]
  }
};

function t(key) {
  return lang[language][key] || lang.en[key];
}

function labelIntent(intent) {
  return intentData[intent]?.labels[language] || intent;
}

function describeIntent(intent) {
  return intentData[intent]?.descriptions[language] || "";
}

function caseText(key) {
  return t("case")[key];
}

function updateStaticLanguage() {
  emptyTitle.textContent = t("emptyTitle");
  emptyDescription.textContent = t("emptyDescription");
  messageInput.placeholder = started ? t("placeholderNext") : t("placeholderStart");
  Array.from(starterGrid.querySelectorAll("[data-starter-intent]")).forEach((button, index) => {
    const intent = starterOrder[index];
    button.dataset.starterIntent = intent;
    button.textContent = labelIntent(intent);
  });
  updateCase(activeIntent, activeBooking || caseText("notProvided"), caseStatus.dataset.statusKey || "selfService");
}

function resetConversationForLanguage() {
  started = false;
  activeIntent = "General";
  activeBooking = caseText("notProvided");
  chatBody.querySelectorAll(".message-row, .choice-list, .faq-list, .booking-form, .support-form").forEach(node => node.remove());
  emptyState.classList.remove("is-hidden");
  caseStrip.classList.add("is-hidden");
  caseStatus.dataset.statusKey = "selfService";
  updateStaticLanguage();
}

function startConversation() {
  if (started) return;
  started = true;
  emptyState.classList.add("is-hidden");
  caseStrip.classList.remove("is-hidden");
  bot(t("greeting"));
  bot(t("askNext"));
  renderIntentButtons();
  messageInput.placeholder = t("placeholderNext");
}

function startAiConversation() {
  if (started) return;
  started = true;
  emptyState.classList.add("is-hidden");
  caseStrip.classList.remove("is-hidden");
  messageInput.placeholder = t("placeholderNext");
}

function bot(message) {
  const row = document.createElement("div");
  row.className = "message-row";
  row.innerHTML = `
    <div class="avatar">F</div>
    <div class="bubble-wrap">
      <div class="bubble">${message}</div>
      <div class="meta">${t("assistantMeta")}</div>
    </div>
  `;
  chatBody.append(row);
  scrollDown();
}

function typingMessage() {
  const row = document.createElement("div");
  row.className = "message-row typing-row";
  row.innerHTML = `
    <div class="avatar">F</div>
    <div class="bubble-wrap">
      <div class="bubble">Festrips AI is checking the knowledge base...</div>
      <div class="meta">${t("assistantMeta")}</div>
    </div>
  `;
  chatBody.append(row);
  scrollDown();
  return row;
}

function user(message) {
  const row = document.createElement("div");
  row.className = "message-row user";
  row.innerHTML = `<div class="bubble-wrap"><div class="bubble">${message}</div></div>`;
  chatBody.append(row);
  scrollDown();
}

async function askAi(message) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      language,
      history: chatHistory.slice(-6)
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "AI request failed");
  }
  return data.answer;
}

function saveTurn(role, content) {
  chatHistory.push({ role, content });
  if (chatHistory.length > 12) chatHistory.splice(0, chatHistory.length - 12);
}

function scrollDown() {
  chatBody.scrollTop = chatBody.scrollHeight;
}

function updateCase(intent, booking = activeBooking, statusKey = "selfService", statusValue = "") {
  activeIntent = intent;
  activeBooking = booking || caseText("notProvided");
  caseStatus.dataset.statusKey = statusKey;
  caseIntent.textContent = `${caseText("intent")}: ${intent === "General" ? "General" : labelIntent(intent)}`;
  caseBooking.textContent = `${caseText("booking")}: ${activeBooking}`;
  caseStatus.textContent = `${caseText("status")}: ${statusValue || caseText(statusKey)}`;
}

function renderIntentButtons() {
  const list = document.createElement("div");
  list.className = "choice-list";
  list.innerHTML = intentOrder.map(intent => `
    <button class="choice-button" type="button" data-intent="${intent}">
      ${labelIntent(intent)}
      <small>${describeIntent(intent)}</small>
    </button>
  `).join("");
  chatBody.append(list);
  scrollDown();
}

function renderFaq(intent) {
  const items = faqData[language][intent] || [];
  if (!items.length) {
    bot(t("supportBest"));
    renderSupportForm(intent);
    return;
  }
  const list = document.createElement("div");
  list.className = "faq-list";
  list.innerHTML = items.map((item, index) => `
    <button class="faq-button" type="button" data-faq="${intent}" data-index="${index}">
      ${item[0]}
    </button>
  `).join("");
  chatBody.append(list);
  scrollDown();
}

function renderBookingForm() {
  const form = document.createElement("form");
  form.className = "booking-form";
  form.innerHTML = `
    <input type="text" aria-label="Booking code" placeholder="FT-12345">
    <button type="submit">${t("continue")}</button>
  `;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const code = form.querySelector("input").value.trim().toUpperCase() || "FT-12345";
    user(code);
    form.remove();
    updateCase("Existing Booking", code, "captured");
    bot(t("bookingThanks"));
    renderFaq("Existing Booking");
  });
  chatBody.append(form);
  form.querySelector("input").focus();
  scrollDown();
}

function renderSupportForm(topic = "") {
  updateCase(topic || activeIntent, activeBooking, "supportDraft");
  bot(t("supportIntro"));
  const fields = t("fields");
  const form = document.createElement("form");
  form.className = "support-form";
  form.innerHTML = `
    <div class="field">
      <label>${fields.name}</label>
      <input required name="name" placeholder="Juan Dela Cruz">
    </div>
    <div class="field">
      <label>${fields.email}</label>
      <input required type="email" name="email" placeholder="juan@example.com">
    </div>
    <div class="field">
      <label>${fields.phone}</label>
      <input required name="phone" placeholder="+63 912 345 6789">
    </div>
    <div class="field">
      <label>${fields.product}</label>
      <select required name="product">
        <option value="${activeIntent}">${labelIntent(activeIntent)}</option>
        <option value="Tour Package">${labelIntent("Tour Package")}</option>
        <option value="Flight Booking">${labelIntent("Flight Booking")}</option>
        <option value="Hotel Reservation">${labelIntent("Hotel Reservation")}</option>
        <option value="Corporate Inquiry">Corporate Inquiry</option>
        <option value="Sub-Agent Partnership">Sub-Agent Partnership</option>
      </select>
    </div>
    <div class="field">
      <label>${fields.booking}</label>
      <input name="booking" placeholder="${caseText("notProvided")}" value="${activeBooking === caseText("notProvided") ? "" : activeBooking}">
    </div>
    <div class="field">
      <label>${fields.travelDate}</label>
      <input type="date" name="date">
    </div>
    <div class="field full">
      <label>${fields.message}</label>
      <textarea name="message" placeholder="${fields.messagePlaceholder}">${labelIntent(topic) || topic}</textarea>
    </div>
    <button type="submit">${t("createCase")}</button>
  `;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const id = `FS-${String(++supportCaseCount).padStart(4, "0")}`;
    form.remove();
    user(`${t("createCase")} ${id}`);
    updateCase(data.product || activeIntent, data.booking || activeBooking, "created", `${caseText("created")}: ${id}`);
    bot(t("caseCreated"));
  });
  chatBody.append(form);
  scrollDown();
}

function handleIntent(intent) {
  updateCase(intent, activeBooking, "selfService");
  if (intent === "Existing Booking") {
    bot(t("bookingAsk"));
    renderBookingForm();
    return;
  }
  if (intent === "Cancellation / Refund" || intent === "Talk to Support") {
    renderSupportForm(intent);
    return;
  }
  bot(t("approvedFaq").replace("{intent}", labelIntent(intent)));
  renderFaq(intent);
}

function inferIntent(text) {
  const lower = text.toLowerCase();
  if (lower.includes("booking") || lower.includes("reservation") || lower.includes("예약") || lower.includes("ft-")) return "Existing Booking";
  if (lower.includes("refund") || lower.includes("cancel") || lower.includes("kansela") || lower.includes("환불") || lower.includes("취소")) return "Cancellation / Refund";
  if (lower.includes("flight") || lower.includes("ticket") || lower.includes("항공")) return "Flight Booking";
  if (lower.includes("hotel") || lower.includes("호텔")) return "Hotel Reservation";
  if (lower.includes("tour") || lower.includes("package") || lower.includes("패키지")) return "Tour Package";
  if (lower.includes("payment") || lower.includes("confirmation") || lower.includes("bayad") || lower.includes("결제") || lower.includes("확정")) return "Payment / Confirmation";
  if (lower.includes("corporate") || lower.includes("company") || lower.includes("기업")) return "Talk to Support";
  if (lower.includes("agent") || lower.includes("b2b") || lower.includes("support") || lower.includes("상담")) return "Talk to Support";
  return "";
}

openChat.addEventListener("click", () => {
  sitePreview.classList.add("is-hidden");
  chatStage.classList.remove("is-hidden");
  messageInput.focus();
});

closeChat.addEventListener("click", () => {
  chatStage.classList.add("is-hidden");
  sitePreview.classList.remove("is-hidden");
});

starterGrid.addEventListener("click", event => {
  const button = event.target.closest("button[data-starter-intent]");
  if (!button) return;
  const intent = button.dataset.starterIntent;
  const message = starterMessages[language][intent] || labelIntent(intent);
  user(message);
  startConversation();
  handleIntent(intent);
});

chatBody.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.intent) {
    user(labelIntent(button.dataset.intent));
    handleIntent(button.dataset.intent);
  }
  if (button.dataset.faq) {
    const item = faqData[language][button.dataset.faq][Number(button.dataset.index)];
    user(item[0]);
    bot(item[1]);
    if (button.dataset.faq === "Existing Booking") {
      renderSupportForm(item[0]);
    }
  }
});

messageForm.addEventListener("submit", event => {
  event.preventDefault();
  const value = messageInput.value.trim();
  if (!value) return;
  user(value);
  saveTurn("user", value);
  messageInput.value = "";
  startAiConversation();
  const intent = inferIntent(value);
  updateCase(intent || "General", activeBooking, "selfService");
  const typing = typingMessage();
  askAi(value)
    .then(answer => {
      typing.remove();
      const finalAnswer = answer || t("fallback");
      bot(finalAnswer);
      saveTurn("assistant", finalAnswer);
      if (intent === "Existing Booking") {
        renderBookingForm();
      } else if (intent === "Cancellation / Refund" || intent === "Talk to Support") {
        renderSupportForm(intent);
      }
    })
    .catch(() => {
      typing.remove();
      if (intent) {
        handleIntent(intent);
      } else {
        bot(t("fallback"));
      }
    });
});

languageSelect.addEventListener("change", () => {
  language = languageSelect.value;
  resetConversationForLanguage();
});

activeBooking = caseText("notProvided");
updateStaticLanguage();
