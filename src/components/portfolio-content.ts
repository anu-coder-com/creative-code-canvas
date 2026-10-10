// Narrative content for the story-driven portfolio. Project details are draft copy until the owner confirms them.
export const navItems = ['ME', 'STORY', 'WORK', 'CRAFT', 'EXPERIMENTS', 'CONTACT'];
export const navIds = ['me', 'story', 'work', 'craft', 'experiments', 'contact'];

export const heroWords = ['I DESIGN THINGS.', 'I BUILD THINGS.', 'I CONNECT THINGS.', 'I SHIP THINGS.', 'I MAKE IDEAS REAL.'];
export const heroNotes = ['designer', 'engineer', 'builder', 'problem solver'];

export const metroStations = ['CURIOSITY', 'CODE', 'DESIGN', 'FRONTEND', 'BACKEND', 'PRODUCTS', 'STARTUPS', 'WHATEVER COMES NEXT'];

export const capabilities = [
  { label: 'UI', flow: ['IDEA', 'SKETCH', 'SYSTEM'], note: 'pixels with opinions' },
  { label: 'FRONTEND', flow: ['CLICK', 'STATE', 'UI'], note: 'feels instant' },
  { label: 'BACKEND', flow: ['API', 'DATABASE', 'RESPONSE'], note: 'quietly reliable' },
  { label: 'APIs', flow: ['REQUEST', 'VALIDATE', 'REPLY'], note: 'clean contracts' },
  { label: 'AUTOMATION', flow: ['TRIGGER', 'WORKFLOW', 'DONE'], note: 'boring work, deleted' },
  { label: 'DATABASES', flow: ['WRITE', 'INDEX', 'QUERY'], note: 'data that behaves' },
  { label: 'PAYMENTS', flow: ['ORDER', 'PAYMENT', 'CONFIRMATION'], note: 'money moves safely' },
  { label: 'INTEGRATIONS', flow: ['WEBHOOK', 'SYNC', 'NOTIFY'], note: 'everything talks' },
  { label: 'EXPERIMENTS', flow: ['WHAT IF', 'BREAK', 'HUH, NICE'], note: 'no brief needed' },
];

export const caseStages = ['THE IDEA', 'THE PROBLEM', 'THE DESIGN', 'THE FRONTEND', 'THE BACKEND', 'THE CONNECTIONS', 'THE RESULT'];

export const projects = [
  { id: 'sparq', name: 'SPARQ', kind: 'WhatsApp commerce', status: 'Concept study · draft', flow: ['CUSTOMER', 'WHATSAPP', 'SPARQ', 'WORKFLOW', 'PAYMENT / BOOKING / ORDER', 'BUSINESS'], stages: [
    'Let a business sell where its customers already talk — inside WhatsApp.',
    'Orders, bookings and payments were scattered across chats, screenshots and spreadsheets.',
    'Conversation-first flows: every step feels like a message, not a form.',
    'A dashboard for businesses to shape catalogues, workflows and replies.',
    'Workflow engine that turns incoming messages into structured orders and bookings.',
    'WhatsApp messaging, payment confirmation and booking callbacks wired into one loop.',
    'The intended outcome: one thread from “hi” to “paid”. This is an illustrative concept, not a verified shipped result.',
  ]},
  { id: 'nab', name: 'NAB', kind: 'Education / assessment', status: 'Concept study · draft', flow: ['STUDENT', 'ASSESSMENT', 'ENGINE', 'SCORING', 'REPORT', 'TEACHER'], stages: [
    'Make assessments feel less like paperwork and more like useful feedback.',
    'Creating, running and grading tests took far too much manual effort.',
    'Calm, distraction-free test screens and reports that read at a glance.',
    'Timed assessment flows that survive flaky connections.',
    'Question banks, attempts and scoring logic kept consistent server-side.',
    'Reports and results flow back to the people who need them.',
    'The intended outcome: less grading, more teaching. Illustrative concept; results are not verified.',
  ]},
  { id: 'homestay', name: 'HOMESTAY', kind: 'Hospitality / booking', status: 'Concept study · draft', flow: ['GUEST', 'LISTING', 'AVAILABILITY', 'BOOKING', 'PAYMENT', 'HOST'], stages: [
    'Give small hosts a booking experience as warm as their homes.',
    'Availability lived in phone calls and notebooks. Double bookings happened.',
    'Photo-led listings with honest details and a three-tap booking.',
    'Responsive listing pages, date pickers and a clear checkout.',
    'Availability locking so two guests can never book the same night.',
    'Payment and confirmation messages connected for guests and hosts.',
    'The intended outcome: fewer phone calls and clearer bookings. Illustrative concept; results are not verified.',
  ]},
  { id: 'lab', name: 'EXPERIMENTS', kind: 'Things that probably shouldn’t exist', status: 'Creative experiments', flow: ['WHAT IF', 'PROTOTYPE', 'BREAK', 'FIX', 'HUH, NICE'], stages: [
    'Small ideas built just to see if they work.',
    'Sometimes the problem is simply: can this even be done?',
    'Odd interactions, strange interfaces, tiny tools.',
    'Animation, physics and cursor play.',
    'Throwaway APIs that sometimes stop being throwaway.',
    'Whatever service makes the idea funnier.',
    'Half of them break. The other half end up in real products.',
  ]},
];

export const hoodNodes = ['FRONTEND', 'API', 'AUTH', 'DATABASE', 'WEBHOOK', 'PAYMENT', 'DEPLOYMENT'];
export const projectTypes = ['PRODUCT', 'WEBSITE', 'SAAS', 'EXPERIMENT', 'SOMETHING WEIRD'];
