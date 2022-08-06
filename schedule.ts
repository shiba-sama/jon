// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Data

const raw = {
  "1": "0300 - 0400",
  "2": "0600 - 0800",
  "3": "1100 - 1200",
  "4": "1400 - 1800",
  "5": "1900 - 2200",
}

const schedule = Object.values(raw)
  .map(str => str.split("-").map(Number))

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Methods

/**
 * Check whether `n` is a number which represents a valid 24-hour timestamp.
 */
function isValidTime(n:number) {
  return Number.isSafeInteger(n)
    && 0 <= n        // no negative
    && n % 100 <= 59 // no minutes 60 or above
}

/**
 * - Expect `"0300 - 0400"` as input.
 * - Return boolean based on schedule conflict.
 */
function canSchedule(str:string) {
  const [start, end] = str.split("-").map(Number) // [0300, 0400]

  for (const [t0, tF] of schedule)
    if (t0 < start && start < tF || t0 < end && end < tF)
      return false
  return true
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Test

const tests = [
  "0200 - 0301", // false
  "0301 - 0301", // false
  "0259 - 0301", // false
  "0359 - 0400", // false
  "2159 - 2200", // false
  "0200 - 0259", // true
  "0400 - 0400", // true
  "0400 - 0600", // true
  "2200 - 0300", // true
]

let results = tests.map(canSchedule)
console.log(results)

// "1": "0300 - 0400",
// "2": "0600 - 0800",
// "3": "1100 - 1200",
// "4": "1400 - 1800",
// "5": "1900 - 2200",
