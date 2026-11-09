# Nike Pegasus Plus 2 course handover

## Storyboard activity mapping

| Storyboard section | Component | Reason | Required trigger |
| --- | --- | --- | --- |
| Meet the shoe | Existing hero and EditorialSplit | Introduces the product with editorial imagery and approved copy | VIEW introduction |
| Customer need and product position | Adapted ordered RevealGroup and static summary | Reveals the statement before its explanation | EXPLORE both reveals |
| Four product benefits | New FeatureHotspots | Links a labelled shoe view to benefit and sales wording | EXPLORE four features |
| Three-model decision | New ModelChoice | Lets learners match each Customer need to a Pegasus model with a reason | EXPLORE three needs after a choice |
| GETSALES | Adapted ordered StepGroup with compact vertical rows | Reveals all eight steps in sequence while the Customer statement stays visible | EXPLORE eight visible steps |
| Four recommendation checks | New AssessmentSequence using the shared PremiumAssessment composition | Shuffles options and shows immediate feedback on a valid single-choice selection | Four attempt-based SUBMIT milestones, one per question |
| Ready to recommend | Static completion summary | Recaps the approved guide without repeating the full feature content | VIEW summary |

The course uses one continuous page, shared typography and spacing tokens. The mood board specifies Totalsports blue `#009fd7`, used for the navbar, accordion, model-choice bar and active GETSALES step. The lighter and darker brand accents now resolve to that same exact blue; neutral surfaces carry the contrast where needed. The white Totalsports PNG retains its aspect ratio, and the Lessons and Progress buttons use white outlines and text. Lessons links to the three logical lesson starts on the same page. The duplicated “Choose and practise” intro was removed, with the second link targeting the existing model-choice section. Progress groups activities under six section anchors. The default footer wording stays static. The ten milestone IDs and their weighting remain stable. The course has a versioned standalone storage key and distinct SCORM package identity. No learner text enters suspend data.

## Review status

- `npm run build`: passed. The output has one learner course page and two redirects for old lesson bookmarks.
- `npm run verify`: passed on the prior course state; it was not rerun for the focused visual and navigation fixes below.
- `npm run verify:pegasus`: passed the one-page learner path, ordered reveals and steps, all four features, three model needs, section and activity links, immediate answer feedback without a form submission, four attempt milestones, narrow mobile and touch controls, exact Totalsports blue accents, and refresh restoration. The GETSALES checks cover numbered and lettered order, approved titles, explored checkmarks, unavailable rows, Previous/Next and keyboard navigation, one event per new exploration, row alignment, desktop footer alignment, and mobile wrapping without overflow.
- The SCORM ZIP and its earlier simulated LMS verification predate the latest visual and navigation fixes. The ZIP was deliberately not regenerated or verified in this pass.
- Visual review: inspected the GETSALES interaction at 320px, 768px and 1280px in initial and explored states using the fresh static build. All eight compact rows remain visible, the long approved selling title wraps inside its row, the right image and footer align with the selector on desktop, and mobile controls have separate touch space. No page-level horizontal overflow or browser page errors were found.

These checks do not replace live People Connect import, launch, resume and reporting acceptance testing.
