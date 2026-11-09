# Building a course with the generic engine

The current Pegasus Plus 2 course has one scrolling page at `/`. Its content, section labels and order come from `src/data/course.ts`; `src/data/course-config.ts` supplies validated runtime and package configuration. Edit milestone requirements and storage version in `course-completion.ts`, and package identifier and filename in `course-config.ts`. Keep the shared typography and component system for future courses.

## Add a lesson

1. Add `{ id: "review", path: "/review/", label: "Review" }` to `courseData.lessons`.
2. Add an Astro page for the new route and its approved content. The current catch-all route only redirects the two former Pegasus lesson URLs; it does not generate new lesson pages automatically. Give the new page unique targets and package-safe links.
3. Add matching milestones in `course-completion.ts`. For example:

   ```ts
   { id: "review-intro", label: "Read the review", type: "view",
     targetId: "review-intro", path: "/review/", required: true }
   ```

4. Increment the storage key version when changing the meaning or order of existing milestones. Set `sequentialUnlocking` to `false` if every lesson should always be available. A lesson with no required milestones passes through unlocking and shows no false 100% score.
5. Set a course-specific `identity.id`, package identifier and ZIP filename. Use a real logo under `public/assets/` if needed and provide descriptive alt text.
6. Run `npm run build`, `npm run verify`, `npm run package:scorm`, and `npm run verify:scorm`. Test the ZIP in the target LMS before handover.

## Reusable Codex prompts

**Build a course from the attached storyboard, mood board and assets:** “Read and follow AGENTS.md, especially its mandatory component authoring and review requirements. Act as a senior UX/UI designer and Astro developer. Build the course from the approved storyboard, mood board and supplied assets. Map the learning activities to suitable shared components, adaptations or new reusable components, with their required completion triggers. Make routine design decisions within the approved brief and proceed with implementation. When the library cannot serve the learning purpose, create the required premium component using the shell's quality standards; a separate request is not needed. Configure unique course, package, activity, target and versioned storage identities, and connect the actual tracking and restoration requirements. Preserve the approved navigation, Progress UI, typography, footer and SCORM behaviour. Inspect the rendered course, repair spacing and interaction defects, and run the relevant checks before handover. Document new components and add neutral gallery examples. Do not invent missing learner content or requirements; flag material gaps for approved direction. Report changes, verification evidence and anything still awaiting visual or live LMS testing.”

**Configure a course:** “Using the storyboard I provide, replace the neutral lesson data with ordered routes and copy. Keep the shared typography, People Connect footer, accessible header and pinned dependencies. Show the proposed lesson and milestone map before implementing it.”

**Audit completion:** “Compare every implemented required activity with `course-completion.ts`. Check target IDs, VIEW/WATCH/SUBMIT/COMPLETE/EXPLORE triggers, optional exclusions, unlock order, storage version and LMS completion criteria. Fix mismatches and run the browser and extracted-ZIP verifiers.”

**Prepare handover:** “Run build, browser verification, SCORM packaging and extracted-ZIP verification. Report typography and completion checks, the ZIP path, and what still requires live People Connect import, launch, resume and reporting tests.”
