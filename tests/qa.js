// Automated QA suite: verifies all 15 topics across all 7 difficulty levels (105 combinations)
const assert = require("assert");
const { COURSE_TOPICS, generateQuestionForTopic } = require("../src/gen.js");

assert.strictEqual(COURSE_TOPICS.length, 15, "Expected exactly 15 course topics");
for (const topic of COURSE_TOPICS) {
  for (let lvl = 1; lvl <= 7; lvl++) {
    const q = generateQuestionForTopic(topic.id, lvl);
    assert.ok(q.prompt && q.prompt.length > 5, `Missing prompt for ${topic.id} L${lvl}`);
    assert.strictEqual(q.options.length, 4, `Expected 4 options for ${topic.id} L${lvl}`);
    assert.ok(q.correctIndex >= 0 && q.correctIndex <= 3, `Invalid correctIndex for ${topic.id} L${lvl}`);
  }
}
console.log("✓ QA PASSED: All 15 topics × 7 levels (105 generator paths) verified.");
