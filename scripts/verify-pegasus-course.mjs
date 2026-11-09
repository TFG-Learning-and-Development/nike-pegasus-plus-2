import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
const dist = path.resolve("dist");
const home = await readFile(path.join(dist, "index.html"), "utf8");
const config = JSON.parse(home.match(/<script\b[^>]*data-course-config[^>]*>([\s\S]*?)<\/script>/)?.[1] || "null");
if (config?.identity?.id !== "nike-pegasus-plus-2") throw new Error("Build the Pegasus course before running this check.");
const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml" };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    let target = path.resolve(dist, `.${pathname}`);
    if (!target.startsWith(dist + path.sep) && target !== dist) throw new Error("Invalid path");
    if ((await stat(target)).isDirectory()) target = path.join(target, "index.html");
    response.writeHead(200, { "Content-Type": mime[path.extname(target)] || "application/octet-stream" });
    response.end(await readFile(target));
  } catch { response.writeHead(404); response.end("Not found"); }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
const page = await context.newPage();
await page.addInitScript(() => { window.__getsalesExploreEvents = []; window.addEventListener("course-progress:explore", (event) => { if (event.detail.activityId === "pegasus-getsales") window.__getsalesExploreEvents.push(event.detail.itemId); }); });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
page.on("response", (response) => { if (response.status() >= 400) errors.push(`HTTP ${response.status()} ${response.url()}`); });
const completed = () => page.evaluate((key) => JSON.parse(localStorage.getItem(key) || "{}").completed || [], config.completion.storageKey);
const waitFor = (id) => page.waitForFunction(({ key, id }) => JSON.parse(localStorage.getItem(key) || "{}").completed?.includes(id), { key: config.completion.storageKey, id });
try {
  await page.goto(origin + "/choose-and-practise/", { waitUntil: "networkidle" });
  await page.waitForURL(origin + "/");
  if (await page.title() !== "Content") throw new Error("Browser title changed from Content.");
  if ((await page.locator('img[src="/assets/course/totalsports-wordmark-white.png"]').count()) !== 1) throw new Error("White Totalsports wordmark missing from navigation.");
  if (await page.locator(".lesson-navigation, [data-assessment-submit]").count()) throw new Error("Obsolete lesson navigation or Submit control remains.");
  if (await page.locator(".lessons-toggle").count() !== 1 || await page.locator(".course-links a[data-course-section]").count() !== 3) throw new Error("Three-lesson navigation is missing.");
  if (await page.locator(".site-header").evaluate((header) => getComputedStyle(header).backgroundColor) !== "rgb(0, 159, 215)") throw new Error("Navbar is not the mood-board Totalsports blue.");
  const brandTokens = await page.locator(".course-page").evaluate((root) => ({ accent: getComputedStyle(root).getPropertyValue("--course-accent").trim(), strong: getComputedStyle(root).getPropertyValue("--course-accent-strong").trim() }));
  if (brandTokens.accent !== "#009fd7" || brandTokens.strong !== "#009fd7") throw new Error("Course accent tokens diverged from the Totalsports navbar blue.");
  for (const selector of [".lessons-toggle", "[data-progress-trigger]"]) {
    const treatment = await page.locator(selector).evaluate((button) => ({ background: getComputedStyle(button).backgroundColor, border: getComputedStyle(button).borderTopColor }));
    if (!treatment.background.startsWith("rgba(255, 255, 255,") || treatment.border !== "rgba(255, 255, 255, 0.85)") throw new Error(`${selector} lost the white header treatment.`);
  }
  if (await page.locator("#choose-and-practise").count() || await page.getByRole("heading", { name: "Choose and practise" }).count()) throw new Error("Duplicated Choose and practise intro remains.");
  for (const targetId of ["overview", "pegasus-model-choice", "pegasus-check"]) {
    await page.locator(".lessons-toggle").click();
    await page.locator(`.course-links a[data-course-section="${targetId}"]`).click();
    const aligned = await page.locator(`#${targetId}`).evaluate((target) => {
      const top = target.getBoundingClientRect().top;
      return top >= document.querySelector(".site-header").getBoundingClientRect().height - 2 && top < innerHeight;
    });
    if (!aligned) throw new Error(`Lesson anchor ${targetId} was obscured by the sticky header.`);
    await page.waitForFunction((id) => document.querySelector(`.course-links a[data-course-section="${id}"]`)?.getAttribute("aria-current") === "location", targetId);
  }
  await page.locator(".lessons-toggle").click();
  await page.locator("[data-progress-trigger]").click();
  if (await page.locator(".lessons-toggle").getAttribute("aria-expanded") !== "false" || await page.locator("[data-progress-trigger]").getAttribute("aria-expanded") !== "true") throw new Error("Progress did not dismiss Lessons.");
  await page.locator("[data-progress-close]").click();
  for (const selector of ["#pegasus-intro", "#pegasus-customer", "#pegasus-benefits", "#pegasus-model-choice", "#pegasus-getsales", "#pegasus-check", "#pegasus-finish"]) {
    if ((await page.locator(selector).count()) !== 1) throw new Error(`Section ${selector} is missing or duplicated.`);
  }
  if ((await completed()).some((id) => id.startsWith("pegasus-check-"))) throw new Error("A question completed on launch.");
  await page.locator("#pegasus-intro").scrollIntoViewIfNeeded();
  await waitFor("pegasus-intro");
  if (!(await page.locator('#pegasus-customer [data-reveal-id="reason"]').isDisabled())) throw new Error("Customer explanation was not ordered.");
  await page.locator('#pegasus-customer [data-reveal-id="customer"]').click();
  await page.waitForFunction(() => getComputedStyle(document.querySelector('#pegasus-customer [data-reveal-id="customer"]')).backgroundColor === "rgb(0, 159, 215)");
  await page.locator('#pegasus-customer [data-reveal-id="reason"]').click();
  await waitFor("pegasus-customer");
  for (const id of ["zoomx-foam", "air-zoom", "secure-fit", "waffle-outsole"]) await page.locator(`#pegasus-benefits [data-explore-item="${id}"]`).click();
  await waitFor("pegasus-benefits");
  await page.locator("#pegasus-model-choice").scrollIntoViewIfNeeded();
  if (await page.locator(".model-choice__needs").evaluate((bar) => getComputedStyle(bar).backgroundColor) !== "rgb(0, 159, 215)") throw new Error("Model choice bar is not Totalsports blue.");
  await page.locator('#pegasus-model-choice [data-explore-item="everyday"]').click();
  await page.locator('#pegasus-model-choice [data-model-id="pegasus-plus-2"]').click();
  const modelFeedback = page.locator("#pegasus-model-choice [data-model-feedback]");
  if (!(await modelFeedback.isVisible()) || !(await modelFeedback.textContent())?.includes("Another model is a better match.")) throw new Error("Incorrect model feedback copy is missing.");
  for (const width of [320, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const feedbackStyle = await modelFeedback.evaluate((feedback) => {
      const style = getComputedStyle(feedback);
      const bounds = feedback.getBoundingClientRect();
      return { color: style.color, background: style.backgroundColor, left: bounds.left, right: bounds.right, viewport: innerWidth };
    });
    if (feedbackStyle.color !== "rgb(255, 255, 255)" || feedbackStyle.background !== "rgb(30, 31, 32)") throw new Error(`Incorrect model feedback lost readable white-on-charcoal styling at ${width}px.`);
    if (feedbackStyle.left < 0 || feedbackStyle.right > feedbackStyle.viewport) throw new Error(`Model feedback overflows at ${width}px.`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [need, model] of [["everyday", "pegasus-42"], ["faster", "pegasus-plus-2"], ["cushioning", "pegasus-premium"]]) {
    await page.locator(`#pegasus-model-choice [data-explore-item="${need}"]`).click();
    await page.locator(`#pegasus-model-choice [data-model-id="${model}"]`).click();
  }
  if (!(await modelFeedback.isVisible()) || !(await modelFeedback.textContent())?.includes("Best match.")) throw new Error("Correct model feedback copy is missing.");
  await waitFor("pegasus-model-choice");
  const steps = page.locator("#pegasus-getsales [data-step-id]");
  if (JSON.stringify(await page.locator("#pegasus-getsales .step-group__ordinal").allTextContents()) !== JSON.stringify(["01", "02", "03", "04", "05", "06", "07", "08"])) throw new Error("GETSALES step numbers are out of order.");
  if (JSON.stringify(await page.locator("#pegasus-getsales .step-group__letter").allTextContents()) !== JSON.stringify(["G", "E", "T", "S", "A", "L", "E", "S"])) throw new Error("GETSALES letters are out of order.");
  if (JSON.stringify(await page.locator("#pegasus-getsales .step-group__label").allTextContents()) !== JSON.stringify(["Greet the Customer", "Establish the need", "Test understanding", "Sell using Features, Advantages and Benefits", "Address objections", "Lead to relevant add-ons", "Ensure future service", "Say thank you"])) throw new Error("Approved GETSALES step titles changed.");
  if (!(await steps.first().getAttribute("aria-label"))?.includes("Greet the Customer")) throw new Error("GETSALES full step name is missing from the accessible label.");
  if (await steps.nth(1).locator(".step-group__letter").evaluate((letter) => getComputedStyle(letter).color) !== "rgb(0, 159, 215)") throw new Error("GETSALES letter lost Totalsports blue.");
  if (!(await steps.nth(2).isDisabled())) throw new Error("Future GETSALES steps were available before their turn.");
  if (await steps.first().evaluate((tab) => getComputedStyle(tab).backgroundColor) !== "rgb(0, 159, 215)") throw new Error("Selected GETSALES step is not Totalsports blue.");
  if (await page.locator("#pegasus-getsales .step-group__check:visible").count() > 1) throw new Error("Unexplored GETSALES steps gained checkmarks on render.");
  for (let i = 1; i < 8; i++) {
    await page.locator("#pegasus-getsales [role=tabpanel]:visible").scrollIntoViewIfNeeded();
    await page.locator("#pegasus-getsales [data-step-next]").click();
  }
  await page.locator("#pegasus-getsales [role=tabpanel]:visible").scrollIntoViewIfNeeded();
  await waitFor("pegasus-getsales");
  if (await page.locator("#pegasus-getsales .step-group__check:visible").count() !== 8) throw new Error("Explored GETSALES steps are missing checkmarks.");
  if (await page.locator("#pegasus-getsales [data-step-status]").innerText() !== "8 of 8 steps explored") throw new Error("GETSALES explored count did not follow saved state.");
  if (!(await page.locator("#pegasus-getsales [data-step-next]").isDisabled())) throw new Error("GETSALES Next remained available on the last step.");
  await page.locator("#pegasus-getsales [data-step-prev]").click();
  if (await page.locator("#pegasus-getsales [data-step-count]").innerText() !== "Step 7 of 8") throw new Error("GETSALES Previous did not update the counter.");
  await page.locator("#pegasus-getsales [data-step-next]").click();
  await steps.nth(7).focus();
  await page.keyboard.press("ArrowUp");
  if (await steps.nth(6).getAttribute("aria-selected") !== "true") throw new Error("GETSALES keyboard navigation did not select the previous step.");
  await page.keyboard.press("ArrowDown");
  if (await steps.nth(7).getAttribute("aria-selected") !== "true") throw new Error("GETSALES keyboard navigation did not restore the final step.");
  const exploreEvents = await page.evaluate(() => window.__getsalesExploreEvents);
  if (exploreEvents.length !== 8 || new Set(exploreEvents).size !== 8) throw new Error(`GETSALES navigation emitted duplicate or missing exploration events: ${JSON.stringify(exploreEvents)}`);
  for (const width of [1280, 768, 320]) {
    await page.setViewportSize({ width, height: 844 });
    const layout = await page.locator("#pegasus-getsales .step-group").evaluate((group) => {
      const tabs = group.querySelector(".step-group__tabs"); const content = group.querySelector(".step-group__content"); const footer = group.querySelector(".step-group__controls");
      const tabBox = tabs.getBoundingClientRect(); const contentBox = content.getBoundingClientRect(); const footerBox = footer.getBoundingClientRect();
      const controlsInside = [...footer.querySelectorAll("button, [data-step-count]")].every((element) => { const box = element.getBoundingClientRect(); return box.left >= footerBox.left - 1 && box.right <= footerBox.right + 1; });
      const titles = [...tabs.querySelectorAll(".step-group__label")];
      const titleXs = titles.map((title) => title.getBoundingClientRect().left);
      const counter = footer.querySelector("[data-step-count]").getBoundingClientRect();
      const buttons = [...footer.querySelectorAll("button")].map((button) => button.getBoundingClientRect());
      return { overflow: document.documentElement.scrollWidth > innerWidth + 1, horizontal: tabBox.right <= contentBox.left + 2, bottomAligned: Math.abs(tabBox.bottom - footerBox.bottom) < 2, internalScroll: tabs.scrollHeight > tabs.clientHeight + 1, longTitleFits: titles[3].scrollHeight <= titles[3].clientHeight + 1, titlesAligned: Math.max(...titleXs) - Math.min(...titleXs) < 2, mobileControlsSeparated: innerWidth > 480 || (counter.bottom + 6 <= Math.min(...buttons.map((button) => button.top))), controlsInside };
    });
    if (layout.overflow || layout.internalScroll || !layout.longTitleFits || !layout.titlesAligned || !layout.mobileControlsSeparated || !layout.controlsInside || (width > 768 && (!layout.horizontal || !layout.bottomAligned)) || (width <= 768 && layout.horizontal)) throw new Error(`GETSALES layout failed at ${width}px: ${JSON.stringify(layout)}`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#pegasus-check").scrollIntoViewIfNeeded();
  await page.locator("[data-progress-trigger]").click();
  await page.locator('a[href$="#pegasus-check-benefits"]').click();
  if (!(await page.locator('[data-question-id="benefits"]').isVisible())) throw new Error("Progress link did not reveal the hidden question.");
  if ((await completed()).includes("pegasus-check-benefits")) throw new Error("Question navigation earned an empty attempt.");
  await page.locator("[data-question-prev]").click();
  const first = page.locator('[data-question-id="model"]');
  if (await page.locator("[data-assessment-submit]").count()) throw new Error("Submit answer button remains.");
  if ((await completed()).includes("pegasus-check-model")) throw new Error("Empty answer earned completion.");
  await first.evaluate((form) => { form.dataset.submitEvents = "0"; form.addEventListener("submit", () => { form.dataset.submitEvents = String(Number(form.dataset.submitEvents) + 1); }); });
  await first.locator('input[value="0"]').check();
  await waitFor("pegasus-check-model");
  if (await first.getAttribute("data-submit-events") !== "0") throw new Error("Radio selection still submitted the form.");
  if (!(await first.locator('[data-answer-feedback][data-result="incorrect"]').isVisible())) throw new Error("Incorrect feedback missing.");
  for (const index of [1, 2, 3]) {
    if (index === 1) { await page.locator("[data-question-next]").focus(); await page.keyboard.press("Enter"); }
    else await page.locator("[data-question-next]").click();
    const form = page.locator(".assessment-sequence__form:visible");
    if (index === 1) await form.locator('input[value="1"]').check();
    else if (index === 2) { const radio = form.locator("input").first(); await radio.focus(); await radio.press("Space"); }
    else await form.locator("input").first().check();
    if (index === 1 && !(await form.locator('[data-answer-feedback][data-result="correct"]').isVisible())) throw new Error("Shuffled correct answer lost its identity.");
  }
  if (!(await page.locator("[data-question-next]").isDisabled()) || await page.locator("[data-question-count]").innerText() !== "Question 4 of 4") throw new Error("Final question controls are incorrect.");
  await page.locator("[data-question-prev]").click();
  if (!(await page.locator('[data-question-id="other-model"] input:checked').count()) || !(await page.locator('[data-question-id="other-model"] [data-answer-feedback][data-result]').isVisible())) throw new Error("Answer state was lost between questions.");
  await page.locator("[data-question-next]").click();
  await page.setViewportSize({ width: 320, height: 844 });
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) throw new Error("Final question overflowed a narrow mobile viewport.");
  const finalActionInside = await page.locator(".assessment-sequence__navigation").evaluate((node) => {
    const box = node.getBoundingClientRect(); return box.left >= 0 && box.right <= innerWidth + 1;
  });
  if (!finalActionInside) throw new Error("Final question controls left the mobile viewport.");
  await page.locator(".lessons-toggle").click();
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) throw new Error("Mobile lesson menu overflowed the viewport.");
  await page.keyboard.press("Escape");
  if (await page.locator(".lessons-toggle").getAttribute("aria-expanded") !== "false") throw new Error("Escape did not close Lessons.");
  for (const id of ["pegasus-check-benefits", "pegasus-check-other-model", "pegasus-check-getsales"]) await waitFor(id);
  await page.locator("#pegasus-finish").scrollIntoViewIfNeeded();
  await waitFor("pegasus-finish");
  if ((await completed()).length !== 10) throw new Error("Not all ten approved milestones completed.");
  await page.reload({ waitUntil: "networkidle" });
  if (await page.locator("#pegasus-getsales [data-step-count]").innerText() !== "Step 8 of 8" || await page.locator("#pegasus-getsales .step-group__check:visible").count() !== 8) throw new Error("GETSALES selection or checkmarks did not restore.");
  for (let i = 0; i < 3 && await page.locator("[data-question-prev]").isEnabled(); i++) await page.locator("[data-question-prev]").click();
  if (!(await first.locator('[data-answer-feedback][data-result="incorrect"]').isVisible())) throw new Error("Submitted feedback did not restore.");
  const touchContext = await browser.newContext({ viewport: { width: 320, height: 844 }, reducedMotion: "reduce", hasTouch: true, isMobile: true });
  try {
    const touchPage = await touchContext.newPage();
    touchPage.on("pageerror", (error) => errors.push(error.message));
    await touchPage.goto(origin + "/", { waitUntil: "networkidle" });
    for (let i = 0; i < 3; i++) await touchPage.locator("#pegasus-getsales [data-step-next]").tap();
    const selectedStepInside = await touchPage.locator("#pegasus-getsales [aria-selected=true]").evaluate((tab) => {
      const tabBox = tab.getBoundingClientRect(); const stripBox = tab.parentElement.getBoundingClientRect();
      return tabBox.left >= stripBox.left - 1 && tabBox.right <= stripBox.right + 1;
    });
    if (!selectedStepInside) throw new Error("The active GETSALES step left the narrow mobile tab strip.");
    await touchPage.locator(".lessons-toggle").tap();
    await touchPage.locator('.course-links a[data-course-section="pegasus-check"]').tap();
    if (!(await touchPage.locator("#pegasus-check").isVisible()) || await touchPage.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) throw new Error("Touch lesson navigation failed or overflowed.");
    await touchPage.locator('[data-question-id="model"] [data-option-card]').first().tap();
    if (!(await touchPage.locator('[data-question-id="model"] [data-answer-feedback][data-result]').isVisible())) throw new Error("Touch answer selection did not show feedback.");
  } finally { await touchContext.close(); }
  if (errors.length) throw new Error(errors.join("\n"));
  console.log("Pegasus one-page learner path passed: ordered reveals and steps, four features, three model matches, progress anchors, immediate answer feedback, four attempt milestones, completion, and refresh restoration.");
} finally {
  await context.close();
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
