export const industries = {
  Dental: { tag: "FOR DENTAL PRACTICES", title: "A full diary. Without a full-time receptionist.", copy: "Sofia answers every patient call, handles bookings and changes, and sends confirmations—all while your team stays focused on the patient in the chair.", exchange: ["I need to move my hygiene appointment.", "Of course. I can see Wednesday at 2:30 or Friday at 10. Which works better?"], log: ["09:14  Rescheduled · Hygiene", "09:16  SMS confirmation sent", "09:22  New patient booked"] },
  Salon: { tag: "FOR SALONS", title: "Turn every ring into a filled chair.", copy: "Sofia knows your services, stylists and availability. She books, moves appointments and keeps your waitlist working.", exchange: ["Can I book colour with Mia next week?", "Mia has Tuesday at 11 or Thursday at 3:30. Would either suit you?"], log: ["10:04  Colour booked · Mia", "10:08  Waitlist updated", "10:15  Patch test reminder"] },
  Trades: { tag: "FOR TRADES", title: "Take the job. Even when your hands are full.", copy: "Sofia answers while you’re on site, identifies emergencies and captures everything you need for the next job.", exchange: ["A pipe has burst under our kitchen sink.", "Turn off the stopcock if it’s safe. I’m checking the emergency schedule now."], log: ["11:21  Urgent call triaged", "11:23  Engineer dispatched", "11:29  Quote request logged"] },
  Legal: { tag: "FOR LAW FIRMS", title: "A professional first response, every time.", copy: "Sofia handles enquiries with care, qualifies new matters and books consultations without giving legal advice.", exchange: ["I’d like to speak to someone about a contract.", "I can help arrange an initial consultation. May I ask what type of contract it concerns?"], log: ["12:02  Enquiry qualified", "12:06  Consultation booked", "12:08  Intake details sent"] },
  Restaurant: { tag: "FOR RESTAURANTS", title: "More covers. Fewer interruptions.", copy: "Sofia handles reservations, dietary notes and changes while your team looks after the room.", exchange: ["A table for six this Saturday—one guest is coeliac.", "I have 7:15 available and I’ve noted the dietary requirement. Shall I book it?"], log: ["18:11  Table for 6 booked", "18:12  Dietary note added", "18:20  Reservation changed"] },
} as const;

export type IndustryName = keyof typeof industries;

export const liveConversation = [
  "CALLER · I need to move tomorrow’s appointment",
  "SOFIA · Of course — Friday at 2pm is available",
  "CALLER · Friday works perfectly, thank you",
  "SOFIA · You’re booked. I’ve sent your confirmation",
  "NEW CALL · Incoming enquiry answered",
];
