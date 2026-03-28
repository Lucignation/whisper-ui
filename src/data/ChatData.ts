// ─── Types ────────────────────────────────────────────────────────────────────

export interface Message {
  id: number;
  name: string;
  time: string;
  timestamp: string;
  message: string;
  imageUrl?: string;
  reactions: Record<string, string[]>;
}

export interface Conversation {
  id: string;
  type: "channel" | "dm";
  name: string;        // slug / channel key
  displayName: string; // shown in the UI
  imageUrl?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline?: boolean;
  memberCount?: number;
  place: string;       // kept for backward compat (= displayName)
  messages: Message[];
}

// ─── Channel data ─────────────────────────────────────────────────────────────

export const channels: Conversation[] = [
  {
    id: "ch-general",
    type: "channel",
    name: "general",
    displayName: "general",
    place: "# general",
    lastMessage: "James: Ready for the stand-up meeting?",
    lastMessageTime: "9:00 AM",
    unreadCount: 3,
    memberCount: 24,
    messages: [
      {
        id: 1,
        time: "9:00 AM",
        timestamp: "2025-03-18T09:00:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message: "Morning, Sophia! Ready for the stand-up meeting?",
        reactions: { "😂": [], "👍": [] },
      },
      {
        id: 2,
        time: "9:02 AM",
        timestamp: "2025-03-18T09:02:00Z",
        name: "Sophia",
        message:
          "Morning! Yeah, but I feel like I barely made any progress over the weekend. Too many last-minute client requests.",
        reactions: { "👍": ["user1", "user2"], "❤️": ["user3"], "😂": [] },
      },
      {
        id: 3,
        time: "9:05 AM",
        timestamp: "2025-03-18T09:05:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message:
          "I get that. I had to rewrite the API docs because the backend team changed some endpoints.",
        reactions: { "😂": [] },
      },
      {
        id: 4,
        time: "9:07 AM",
        timestamp: "2025-03-18T09:07:00Z",
        name: "Sophia",
        message:
          "Ugh, I know. I had to update the frontend to match those changes, and I still don't think everything is aligned.",
        reactions: { "👍": ["user1", "user2"], "❤️": ["user3"], "😂": [] },
      },
      {
        id: 5,
        time: "9:10 AM",
        timestamp: "2025-03-18T09:10:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message:
          "Should we bring it up in the meeting? Maybe get the backend team to finalize things before we refactor again.",
        reactions: { "😂": [] },
      },
      {
        id: 6,
        time: "9:12 AM",
        timestamp: "2025-03-18T09:12:00Z",
        name: "Sophia",
        message:
          "Definitely. Also, I think the QA team found some unexpected issues in the last build.",
        reactions: { "😂": [] },
      },
      {
        id: 7,
        time: "9:14 AM",
        timestamp: "2025-03-18T09:14:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message: "Oh, great. More debugging… Do you know what kind of issues?",
        reactions: { "😂": [] },
      },
      {
        id: 8,
        time: "9:16 AM",
        timestamp: "2025-03-18T09:16:00Z",
        name: "Sophia",
        message:
          "Some UI glitches and performance lag in mobile views. They sent me a report this morning.",
        reactions: { "👍": ["user1", "user2"], "❤️": ["user3"], "😂": [] },
      },
      {
        id: 9,
        time: "9:18 AM",
        timestamp: "2025-03-18T09:18:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message:
          "We should address that right after the stand-up. Otherwise, it's just going to pile up.",
        reactions: { "😂": [] },
      },
      {
        id: 10,
        time: "9:20 AM",
        timestamp: "2025-03-18T09:20:00Z",
        name: "Sophia",
        message: "Agreed. Let's grab a coffee after this, we're gonna need it.",
        reactions: { "👍": ["user1", "user2"], "❤️": ["user3"], "😂": [] },
      },
    ],
  },
  {
    id: "ch-product",
    type: "channel",
    name: "product",
    displayName: "product",
    place: "# product",
    lastMessage: "David: MVP deadline moved to next Friday 🚀",
    lastMessageTime: "3:05 PM",
    unreadCount: 0,
    memberCount: 12,
    messages: [
      {
        id: 1,
        time: "3:00 PM",
        timestamp: "2025-03-22T15:00:00Z",
        name: "Sophia",
        message: "Team, we need to talk about the project deadline.",
        reactions: { "👍": ["user1", "user2"], "❤️": ["user3"], "😂": [] },
      },
      {
        id: 2,
        time: "3:02 PM",
        timestamp: "2025-03-22T15:02:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message: "Is it getting pushed forward or delayed?",
        reactions: {},
      },
      {
        id: 3,
        time: "3:05 PM",
        timestamp: "2025-03-22T15:05:00Z",
        name: "Sophia",
        message:
          "Pushed forward. The client wants the MVP ready by next Friday instead of the end of the month.",
        reactions: { "👍": ["user1", "user2"], "❤️": ["user3"], "😂": [] },
      },
      {
        id: 4,
        time: "3:07 PM",
        timestamp: "2025-03-22T15:07:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message:
          "Next Friday?! That's insane. We still have three modules to complete!",
        reactions: {},
      },
      {
        id: 5,
        time: "3:10 PM",
        timestamp: "2025-03-22T15:10:00Z",
        name: "Sophia",
        message:
          "I know. I already spoke to the team — we're prioritising the core features.",
        reactions: { "👍": ["user1", "user2"], "❤️": ["user3"], "😂": [] },
      },
      {
        id: 6,
        time: "3:15 PM",
        timestamp: "2025-03-22T15:15:00Z",
        name: "David",
        message:
          "Authentication, payment integration, and dashboard analytics first. Everything else can come post-launch.",
        reactions: { "🚀": ["user1", "user2", "user3"] },
      },
    ],
  },
  {
    id: "ch-design",
    type: "channel",
    name: "design",
    displayName: "design",
    place: "# design",
    lastMessage: "Sophia: Updated the component library",
    lastMessageTime: "Yesterday",
    unreadCount: 1,
    memberCount: 8,
    messages: [
      {
        id: 1,
        time: "2:00 PM",
        timestamp: "2025-03-21T14:00:00Z",
        name: "Sophia",
        message:
          "Just pushed the updated Figma component library. New button variants and dark-mode tokens are in.",
        reactions: { "🎉": ["user1", "user2", "user3"], "👏": ["user1"] },
      },
      {
        id: 2,
        time: "2:15 PM",
        timestamp: "2025-03-21T14:15:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message: "Looks great! The spacing on the modal variants is much better now.",
        reactions: { "👍": ["user1"] },
      },
    ],
  },
  {
    id: "ch-engineering",
    type: "channel",
    name: "engineering",
    displayName: "engineering",
    place: "# engineering",
    lastMessage: "Peter: Android 11 crash root-caused",
    lastMessageTime: "7:18 PM",
    unreadCount: 7,
    memberCount: 18,
    messages: [
      {
        id: 1,
        time: "7:00 PM",
        timestamp: "2025-03-23T19:00:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message:
          "Sophia, we have a major issue. The app keeps crashing on certain devices.",
        reactions: { "😮": ["user3"] },
      },
      {
        id: 2,
        time: "7:03 PM",
        timestamp: "2025-03-23T19:03:00Z",
        name: "Sophia",
        message: "Oh no… When did this start?",
        reactions: {},
      },
      {
        id: 3,
        time: "7:05 PM",
        timestamp: "2025-03-23T19:05:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message: "QA found it an hour ago. It only happens on Android 11.",
        reactions: {},
      },
      {
        id: 4,
        time: "7:08 PM",
        timestamp: "2025-03-23T19:08:00Z",
        name: "Sophia",
        message: "That sounds like a compatibility issue. Did you check the logs?",
        reactions: {},
      },
      {
        id: 5,
        time: "7:10 PM",
        timestamp: "2025-03-23T19:10:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message: "Yeah, it's throwing some weird memory allocation errors.",
        reactions: { "👍": ["user1", "user2"], "❤️": ["user3"] },
      },
      {
        id: 6,
        time: "7:12 PM",
        timestamp: "2025-03-23T19:12:00Z",
        name: "Sophia",
        message:
          "Hmm… That could be related to how we're handling state. Is this happening on specific screens?",
        reactions: {},
      },
      {
        id: 7,
        time: "7:15 PM",
        timestamp: "2025-03-23T19:15:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message: "Mostly on the dashboard when switching between tabs.",
        reactions: {},
      },
      {
        id: 8,
        time: "7:18 PM",
        timestamp: "2025-03-23T19:18:00Z",
        name: "Sophia",
        message:
          "Okay, let's debug it together. We should try running it in a lower memory environment and see what happens.",
        reactions: {},
      },
    ],
  },
  {
    id: "ch-marketing",
    type: "channel",
    name: "marketing",
    displayName: "marketing",
    place: "# marketing",
    lastMessage: "Launch campaign draft is ready for review",
    lastMessageTime: "Mon",
    unreadCount: 0,
    memberCount: 6,
    messages: [
      {
        id: 1,
        time: "10:00 AM",
        timestamp: "2025-03-17T10:00:00Z",
        name: "Sophia",
        message:
          "The launch campaign draft is ready. Can everyone review by EOD and drop comments in Notion?",
        reactions: { "👍": ["user1", "user2"] },
      },
    ],
  },
];

// ─── Direct messages ───────────────────────────────────────────────────────────

export const directMessages: Conversation[] = [
  {
    id: "dm-james",
    type: "dm",
    name: "james-mide",
    displayName: "James Mide",
    place: "James Mide",
    imageUrl:
      "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
    lastMessage: "I figured. Is it getting pushed forward or delayed?",
    lastMessageTime: "3:02 PM",
    unreadCount: 2,
    isOnline: true,
    messages: [
      {
        id: 1,
        time: "9:00 AM",
        timestamp: "2025-03-18T09:00:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message: "Morning, Sophia! Ready for the stand-up meeting?",
        reactions: { "😂": [] },
      },
      {
        id: 2,
        time: "9:02 AM",
        timestamp: "2025-03-18T09:02:00Z",
        name: "Sophia",
        message:
          "Morning! Yeah, but I feel like I barely made any progress over the weekend. Too many last-minute client requests.",
        reactions: { "👍": ["user1", "user2"], "❤️": ["user3"], "😂": [] },
      },
      {
        id: 3,
        time: "9:05 AM",
        timestamp: "2025-03-18T09:05:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message:
          "I get that. I had to rewrite the API docs because the backend team changed some endpoints.",
        reactions: { "😂": [] },
      },
      {
        id: 4,
        time: "3:00 PM",
        timestamp: "2025-03-22T15:00:00Z",
        name: "Sophia",
        message: "James, we need to talk about the project deadline.",
        reactions: { "❤️": ["user3"], "😂": [] },
      },
      {
        id: 5,
        time: "3:02 PM",
        timestamp: "2025-03-22T15:02:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message: "I figured. Is it getting pushed forward or delayed?",
        reactions: { "👍": ["user1", "user2"], "😂": [] },
      },
    ],
  },
  {
    id: "dm-sophia",
    type: "dm",
    name: "sophia-henry",
    displayName: "Sophia Henry",
    place: "Sophia Henry",
    imageUrl:
      "https://img.freepik.com/free-vector/telecommuting-concept-with-man-home_23-2148488959.jpg",
    lastMessage: "Agreed. Let's grab a coffee after this.",
    lastMessageTime: "9:20 AM",
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: 1,
        time: "3:00 PM",
        timestamp: "2025-03-22T15:00:00Z",
        name: "Sophia",
        message: "James, we need to talk about the project deadline.",
        reactions: { "👍": ["user1", "user2"], "❤️": ["user3"], "😂": [] },
      },
      {
        id: 2,
        time: "3:02 PM",
        timestamp: "2025-03-22T15:02:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message: "I figured. Is it getting pushed forward or delayed?",
        reactions: {},
      },
      {
        id: 3,
        time: "3:05 PM",
        timestamp: "2025-03-22T15:05:00Z",
        name: "Sophia",
        message:
          "Pushed forward. The client wants the MVP ready by next Friday instead of the end of the month.",
        reactions: { "👍": ["user1", "user2"], "❤️": ["user3"], "😂": [] },
      },
      {
        id: 4,
        time: "3:07 PM",
        timestamp: "2025-03-22T15:07:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message:
          "Next Friday?! That's insane. We still have three modules to complete!",
        reactions: {},
      },
      {
        id: 5,
        time: "3:25 PM",
        timestamp: "2025-03-22T15:25:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message:
          "Makes sense. I'll handle the payment part since I've worked on it before. Can you tackle the analytics?",
        reactions: { "👍": ["user1", "user2"], "❤️": ["user3"], "😂": [] },
      },
    ],
  },
  {
    id: "dm-peter",
    type: "dm",
    name: "peter-femi",
    displayName: "Peter Femi",
    place: "Peter Femi",
    imageUrl:
      "https://img.freepik.com/free-vector/character-playing-videogame-concept_23-2148514207.jpg",
    lastMessage: "Let's debug it together tonight.",
    lastMessageTime: "7:18 PM",
    unreadCount: 1,
    isOnline: false,
    messages: [
      {
        id: 1,
        time: "7:00 PM",
        timestamp: "2025-03-23T19:00:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message:
          "Sophia, we have a major issue. The app keeps crashing on certain devices.",
        reactions: {},
      },
      {
        id: 2,
        time: "7:03 PM",
        timestamp: "2025-03-23T19:03:00Z",
        name: "Sophia",
        message: "Oh no… When did this start?",
        reactions: { "👍": ["user1"], "❤️": ["user3"], "😂": [] },
      },
      {
        id: 3,
        time: "7:05 PM",
        timestamp: "2025-03-23T19:05:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message: "QA found it an hour ago. It only happens on Android 11.",
        reactions: {},
      },
      {
        id: 4,
        time: "7:10 PM",
        timestamp: "2025-03-23T19:10:00Z",
        name: "James",
        imageUrl:
          "https://img.freepik.com/free-vector/dismissed-concept-illustration_114360-23764.jpg",
        message: "Yeah, it's throwing some weird memory allocation errors.",
        reactions: { "👍": ["user1", "user2"], "❤️": ["user3"] },
      },
      {
        id: 5,
        time: "7:18 PM",
        timestamp: "2025-03-23T19:18:00Z",
        name: "Sophia",
        message:
          "Let's debug it together. We should try running it in a lower memory environment and see what happens.",
        reactions: {},
      },
    ],
  },
  {
    id: "dm-david",
    type: "dm",
    name: "david-chen",
    displayName: "David Chen",
    place: "David Chen",
    imageUrl:
      "https://img.freepik.com/free-vector/man-having-online-meeting-work_23-2148288483.jpg",
    lastMessage: "Authentication, payment, and analytics first.",
    lastMessageTime: "3:15 PM",
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: 1,
        time: "3:15 PM",
        timestamp: "2025-03-22T15:15:00Z",
        name: "David",
        message:
          "Authentication, payment integration, and dashboard analytics first. Everything else can come post-launch.",
        reactions: { "🚀": ["user1", "user2", "user3"] },
      },
      {
        id: 2,
        time: "3:20 PM",
        timestamp: "2025-03-22T15:20:00Z",
        name: "Sophia",
        message: "Totally agree. Want to split payment and auth between us?",
        reactions: { "👍": ["user1"] },
      },
    ],
  },
];

// ─── Combined export (backward compat) ────────────────────────────────────────

export const ChatData: Conversation[] = [...channels, ...directMessages];
