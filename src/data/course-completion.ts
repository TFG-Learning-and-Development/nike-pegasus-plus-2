export type CompletionType = "view" | "watch" | "submit" | "explore" | "complete" | "optional";
export type CompletionMilestone = {
  id: string; label: string; type: CompletionType; targetId: string; path: string; required: boolean;
  requiredItems?: string[]; threshold?: number;
};
export const completionSettings = {
  storageKey: "astro-course-progress:nike-pegasus-plus-2:v1",
  sequentialUnlocking: false,
  // The original three-route package used the same IDs and evidence contract.
  legacySignatures: ["0729a9e31a2a9d90"],
} as const;
export const completionMilestones: CompletionMilestone[] = [
  { id: "pegasus-intro", label: "Meet the Pegasus Plus 2", type: "view", targetId: "pegasus-intro", path: "/", required: true },
  { id: "pegasus-customer", label: "Explore the Customer's need", type: "explore", targetId: "pegasus-customer", path: "/", requiredItems: ["customer", "reason"], required: true },
  { id: "pegasus-benefits", label: "Explore four product benefits", type: "explore", targetId: "pegasus-benefits", path: "/", requiredItems: ["zoomx-foam", "air-zoom", "secure-fit", "waffle-outsole"], required: true },
  { id: "pegasus-model-choice", label: "Match three Customer needs", type: "explore", targetId: "pegasus-model-choice", path: "/", requiredItems: ["everyday", "faster", "cushioning"], required: true },
  { id: "pegasus-getsales", label: "Explore eight GETSALES steps", type: "explore", targetId: "pegasus-getsales", path: "/", requiredItems: ["greet", "establish", "test", "sell", "address", "lead", "ensure", "thanks"], required: true },
  { id: "pegasus-check-model", label: "Answer the model recommendation", type: "submit", targetId: "pegasus-check-model", path: "/", required: true },
  { id: "pegasus-check-benefits", label: "Answer the benefit explanation", type: "submit", targetId: "pegasus-check-benefits", path: "/", required: true },
  { id: "pegasus-check-other-model", label: "Answer the alternative model response", type: "submit", targetId: "pegasus-check-other-model", path: "/", required: true },
  { id: "pegasus-check-getsales", label: "Answer the GETSALES response", type: "submit", targetId: "pegasus-check-getsales", path: "/", required: true },
  { id: "pegasus-finish", label: "Review the recommendation guide", type: "view", targetId: "pegasus-finish", path: "/", required: true },
];
