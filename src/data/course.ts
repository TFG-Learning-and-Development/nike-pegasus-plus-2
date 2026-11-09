/** Learner copy follows the approved Pegasus Plus 2 storyboard. */
export interface TableColumn { key: string; label: string }
export type TableRow = Record<string, string>;
const asset = "/assets/course/";
export const courseData = {
  meta: { title: "Nike Pegasus Plus 2 | Quick Course", description: "Match the Pegasus Plus 2 to a Customer's running needs." },
  brand: { homeLabel: "Go to the Nike Pegasus Plus 2 overview" },
  lessons: [
    { id: "pegasus-plus-2-course", path: "/", label: "Nike Pegasus Plus 2" },
  ],
  navigationLessons: [
    { id: "meet", title: "Meet the Nike Pegasus Plus 2", targetId: "overview" },
    { id: "choose", title: "Choose the right Pegasus", targetId: "pegasus-model-choice" },
    { id: "check", title: "Check and recommend", targetId: "pegasus-check" },
  ],
  progressSections: [
    { id: "pegasus-intro", label: "What is the Pegasus Plus 2 and why choose it?", milestoneIds: ["pegasus-intro", "pegasus-customer"] },
    { id: "pegasus-benefits", label: "Focus on the benefits that matter", milestoneIds: ["pegasus-benefits"] },
    { id: "pegasus-model-choice", label: "Choose the right Pegasus", milestoneIds: ["pegasus-model-choice"] },
    { id: "pegasus-getsales", label: "Follow the eight GETSALES steps", milestoneIds: ["pegasus-getsales"] },
    { id: "pegasus-check", label: "Check your understanding", milestoneIds: ["pegasus-check-model", "pegasus-check-benefits", "pegasus-check-other-model", "pegasus-check-getsales"] },
    { id: "pegasus-finish", label: "Ready to recommend", milestoneIds: ["pegasus-finish"] },
  ],
  hero: { title: "Meet the Nike Pegasus Plus 2", description: "Light, bouncy and made for faster training.", actionLabel: "Explore the shoe", image: { src: asset+"pegasus-plus-2-white-green-product.png", alt: "White Nike Pegasus Plus 2 shoes with lime green details" } },
  introduction: {
    title: "What is the Pegasus Plus 2 and why choose it?",
    paragraphs: [
      "The Nike Pegasus Plus 2 is a light, bouncy running shoe for faster training. It is a good option for a Customer who already has an everyday running shoe and wants a lighter, more responsive feel for faster sessions.",
      "It offers a responsive push, secure fit and room for the toes. Match these benefits to how the Customer trains and what they want from their run.",
    ],
    customer: "I already have an everyday running shoe. I want something lighter and bouncier for faster training sessions.",
    question: "Why could the Nike Pegasus Plus 2 suit this Customer?",
    answer: "They want something lighter and bouncier for faster sessions—the same needs this light, bouncy daily training shoe is made to meet.",
    sellingPoint: "Understand how the Customer trains before recommending the shoe.",
    position: "Pegasus Plus 2 = light, bouncy and made for faster training.",
  },
  benefits: {
    title: "Focus on the benefits that matter",
    intro: "You do not need to explain every technical detail. Focus on the benefits that match what the Customer needs.",
    image: { src: asset+"pegasus-plus-2-feature-views.png", alt: "Side and outsole views of the white Nike Pegasus Plus 2" },
    items: [
      { id: "zoomx-foam", title: "ZoomX foam", benefit: "Helps the shoe feel light and bouncy.", say: "The ZoomX foam gives you a light and bouncy feel when you run." },
      { id: "air-zoom", title: "Curved Air Zoom unit", benefit: "Helps push the runner forward during faster runs.", say: "The Air Zoom unit gives you a responsive push with each step." },
      { id: "secure-fit", title: "Secure fit with more toe room", benefit: "Supports the middle of the foot while giving the toes more space.", say: "Your foot feels secure, but your toes still have room to move." },
      { id: "waffle-outsole", title: "Waffle outsole", benefit: "Provides grip and bends naturally as the runner moves.", say: "The outsole gives you grip while still feeling flexible." },
    ],
    tip: "Ask how the Customer trains. Then explain only one or two benefits that match the Customer’s needs.",
  },
  models: {
    title: "Choose the right Pegasus",
    intro: "Use the Customer’s training needs to guide the recommendation.",
    models: [
      { id: "pegasus-42", name: "Pegasus 42", bestFor: "Everyday runs and general daily training.", position: "A reliable everyday running shoe with a balanced feel.", image: asset+"pegasus-42-on-foot.webp", alt: "Nike Pegasus 42 shoes worn outdoors" },
      { id: "pegasus-plus-2", name: "Pegasus Plus 2", bestFor: "Faster-paced runs and short bursts of faster running.", position: "A light and bouncy shoe for runners who want a faster feel.", image: asset+"pegasus-plus-2-red-product.avif", alt: "Red Nike Pegasus Plus 2 running shoes" },
      { id: "pegasus-premium", name: "Pegasus Premium", bestFor: "Runners who want the most cushioning in the Pegasus range.", position: "The premium Pegasus option with the most cushioning and bounce.", image: asset+"pegasus-premium-on-foot.webp", alt: "Nike Pegasus Premium shoes worn outdoors" },
    ],
    needs: [
      { id: "everyday", prompt: "Balanced everyday running", correctId: "pegasus-42", reason: "Pegasus 42 is a reliable everyday running shoe with a balanced feel." },
      { id: "faster", prompt: "Light, bouncy faster training", correctId: "pegasus-plus-2", reason: "Pegasus Plus 2 is light and bouncy for faster-paced runs and short bursts of faster running." },
      { id: "cushioning", prompt: "The most cushioning", correctId: "pegasus-premium", reason: "Pegasus Premium offers the most cushioning and bounce in the Pegasus range." },
    ],
    honesty: "If another Pegasus model better matches the Customer’s training, comfort needs or budget, recommend that option instead.",
  },
  getsales: {
    title: "Put it into practice with GETSALES",
    intro: "GETSALES for Totalsports guides the conversation from greeting the Customer to saying thank you. Follow the eight steps below, using your own words and keeping the Customer’s needs at the centre.",
    customer: "I run three or four times a week. I already have a shoe for easy runs, but I want something lighter for faster-paced sessions and short bursts of faster running.",
    steps: [
      { id: "greet", letter: "G", title: "Greet the Customer", body: "Welcome to Totalsports! How can I help?" },
      { id: "establish", letter: "E", title: "Establish the need", body: "What runs will you use them for, and what feel, fit and budget matter to you?" },
      { id: "test", letter: "T", title: "Test understanding", body: "So you want a lighter shoe for faster sessions—is that right?" },
      { id: "sell", letter: "S", title: "Sell using Features, Advantages and Benefits", body: "ZoomX foam gives a light, bouncy feel; the curved Air Zoom unit adds a responsive push for your faster sessions. Let’s check the fit." },
      { id: "address", letter: "A", title: "Address objections", body: "If fit is a concern: “Where does it feel uncomfortable? Let’s check the fit or try another option.”" },
      { id: "lead", letter: "L", title: "Lead to relevant add-ons", body: "If relevant: “Do you need running socks too?”" },
      { id: "ensure", letter: "E", title: "Ensure future service", body: "Come back if you have any questions about your shoes." },
      { id: "thanks", letter: "S", title: "Say thank you", body: "Thank you for visiting. Enjoy your runs!" },
    ],
  },
  check: {
    title: "Check your understanding",
    intro: "Choose the best answer for each Customer situation. Think about the Customer’s needs before choosing the shoe or response.",
    questions: [
      { id: "model", title: "Choose the best Pegasus model", prompt: "A Customer runs five times a week. Most runs are easy, but the Customer already owns an everyday trainer and wants a second shoe for faster training sessions. The Customer prefers a light, bouncy feel. What is the best starting recommendation?", options: ["Pegasus 42, because it is designed for balanced everyday runs.", "Pegasus Plus 2, because it is designed for lighter and faster training.", "Pegasus Premium, because it has the most cushioning in the range.", "Any Pegasus model, because all three are used in the same way."], correctIndex: 1, feedback: "The Customer already has an everyday trainer and wants a lighter shoe for faster sessions. That makes the Pegasus Plus 2 the strongest starting point." },
      { id: "benefits", title: "Choose the best explanation", prompt: "The Customer asks, “How do this shoe’s features help during faster runs?” Which answer best explains the Pegasus Plus 2’s benefits?", options: ["It has a 38 mm heel stack, a 28 mm forefoot stack and a 10 mm offset.", "ZoomX foam helps the shoe feel light and bouncy, while the curved Air Zoom unit helps push you forward.", "It is the newest shoe in the Pegasus range, so it is automatically the best option.", "It has several technical features, but you will need to read the product card for the details."], correctIndex: 1, feedback: "This answer connects the product features to a clear Customer benefit without overloading the Customer with specifications." },
      { id: "other-model", title: "Respond when the product is not the best match", prompt: "A Customer only does relaxed everyday runs and wants a balanced shoe for regular training. The Customer does not need a lighter shoe for faster sessions. What should you do?", options: ["Recommend the Pegasus Plus 2 because it is faster.", "Recommend the Pegasus Premium because it is the premium option.", "Start with the Pegasus 42 because it better matches balanced everyday running.", "Explain all three models and let the Customer decide without guidance."], correctIndex: 2, feedback: "A good recommendation is based on the Customer’s training needs. The Pegasus 42 is the better starting point for balanced everyday runs." },
      { id: "getsales", title: "Apply the GETSALES selling step", prompt: "You have established how the Customer trains. The Customer says, “I use my current shoes for easy runs. I want something lighter for short bursts of faster running, but I also need enough room for my toes.” You confirm both needs and the Customer agrees. What is the best next response?", options: ["The Pegasus Plus 2 is our faster option. Would you like your normal size?", "The Pegasus Plus 2 has ZoomX foam, Air Zoom, engineered mesh and a waffle outsole.", "The Pegasus Plus 2’s ZoomX foam gives a light, bouncy feel for your faster sessions. Its secure fit also gives your toes more room. Let’s try it on and check the fit.", "The Pegasus Premium has the most cushioning, so I would choose that one instead."], correctIndex: 2, feedback: "You have established the need and tested your understanding. This response applies the selling step by linking the features to benefits that address both faster training and toe room, then inviting the Customer to check the fit." },
    ],
  },
  finish: {
    title: "Ready to recommend", intro: "Before you go, remember:", summary: "Pegasus Plus 2: light, bouncy and made for faster training.",
    points: [
      "Ask the Customer how they run and what they want from the shoe.",
      "Explain only the benefits that matter to that Customer.",
      "Recommend Pegasus 42 for everyday runs, Pegasus Plus 2 for faster training and Pegasus Premium for the most cushioning.",
      "Let the Customer try the shoe and use the fit to confirm the recommendation.",
    ],
    action: "On your next running-shoe conversation, use GETSALES to guide the interaction. Confirm the Customer’s needs before recommending, explain one or two relevant benefits, and use the try-on to check the match.",
    closing: "Start with the Customer’s needs. Keep your explanation simple. Recommend with confidence.",
  },
  footer: { text: "Return to People Connect to continue" },
} as const;
