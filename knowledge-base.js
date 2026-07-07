const knowledgeBase = `
Festrips is a Philippine travel OTA and professional travel marketplace.
Early business focus: B2B travel agencies, sub-agents, corporate clients, and gradual B2C growth.

Core positioning:
- Professional travel marketplace supported by Hanatour global sourcing and Aboex local market expertise.
- Not positioned as a mass-market OTA competing directly against Agoda, Booking.com, Traveloka, Klook, or Expedia in the first stage.

Main user types:
- General customer / guest
- Existing booking customer
- Travel agent / sub-agent
- Corporate or institutional client

Product categories:
1. Tour Package
- Packages may include flights, accommodations, meals, transfers, and tours depending on itinerary.
- Group tour packages follow fixed itineraries arranged in advance.
- Tour packages are not confirmed immediately.
- Final confirmation is issued after booking processing, payment verification, and supplier availability confirmation.
- Deposits are generally non-refundable because they secure airline seats and land arrangements.
- Date changes or transfers may be considered case-by-case, subject to supplier approval, seat availability, fare difference, and penalties.
- If minimum participants are not met, Festrips may coordinate alternatives such as schedule adjustment, revised arrangement, or transfer to another group date.

2. Flight Booking
- Flight bookings are confirmed only after payment has been received and ticket issuance is completed.
- Airline fares may change without prior notice until booking is confirmed and ticketed.
- E-tickets are sent after payment verification and successful ticketing.
- Seat selection and baggage allowance depend on airline fare rules.
- Rebooking, refunds, and schedule changes depend on airline fare rules, availability, and applicable fees.
- Incorrect passenger details after ticket issuance may cause penalties, reissuance, or inability to use the ticket.

3. Hotel Reservation
- Hotel bookings are confirmed only after payment is received and the hotel or supplier confirms availability.
- Hotel rates may change until booking is paid and confirmed.
- Hotel vouchers are issued after payment confirmation and booking finalization.
- Room type or view requests are subject to hotel availability and are not guaranteed unless confirmed.
- Modifications and refunds depend on hotel or supplier policies.
- No-show bookings are generally non-refundable and subject to hotel policies.

Payment and confirmation:
- Accepted channels may include bank transfer, e-wallets, online payments, and other approved payment channels.
- Payment instructions are provided upon booking.
- Bookings are not final until payment verification and supplier confirmation are complete.

Support handoff rules:
- Booking-specific questions require booking code collection and support handoff.
- Payment confirmation, ticket or voucher status, refund amount calculation, passenger detail errors, corporate quotations, and B2B partnership requests should be routed to support.

Strict guardrails:
- Do not guarantee booking confirmation.
- Do not guarantee fares.
- Do not guarantee availability.
- Do not approve refunds.
- Do not say a cancellation/change is definitely allowed.
- For booking-specific issues, ask for booking code and recommend support review.
- If information is not in the knowledge base, say that the Festrips team should review it.
`;

module.exports = { knowledgeBase };
