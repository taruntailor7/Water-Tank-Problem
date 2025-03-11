function getMaxProfit(totalTime) {
  // dp[t] will store the best result (profit and counts) when t time units have already been spent.
  const dp = new Array(totalTime + 1).fill(null);

  // Recursive function that computes the best outcome starting from timeUsed.
  function recurse(timeUsed) {
    // If we've used up (or exceeded) the time, no more construction can be done.
    if (timeUsed >= totalTime) {
      return { profit: 0, counts: { T: 0, P: 0, C: 0 } };
    }

    // Return cached result if available.
    if (dp[timeUsed] !== null) {
      return dp[timeUsed];
    }

    // Initialize best result (profit zero means no further development from this time).
    let best = { profit: 0, counts: { T: 0, P: 0, C: 0 } };

    // Define the three available properties.
    const properties = [
      { name: "T", buildTime: 5, earning: 1500 }, // Theatre
      { name: "P", buildTime: 4, earning: 1000 }, // Pub
      { name: "C", buildTime: 10, earning: 3000 }, // Commercial Park
    ];

    // Try each property if there is enough remaining time.
    for (let prop of properties) {
      const finishTime = timeUsed + prop.buildTime;
      if (finishTime <= totalTime) {
        // Profit from this property: it earns money for the remaining time units after it is built.
        const profitForThis = (totalTime - finishTime) * prop.earning;

        // Recursively compute the profit for subsequent constructions.
        const result = recurse(finishTime);
        const totalProfit = profitForThis + result.profit;

        // Update best result if this option is better.
        if (totalProfit > best.profit) {
          best.profit = totalProfit;
          // Copy counts from the recursive result and add the current property.
          best.counts = { ...result.counts };
          best.counts[prop.name] = best.counts[prop.name] + 1;
        }
      }
    }
    // Memoize the best result for the current timeUsed.
    dp[timeUsed] = best;
    return best;
  }

  return recurse(0);
}

/* ======= Test Cases ======= */

// Test Case 1: Time Unit = 7
// Expected solutions: Either T: 1 P: 0 C: 0 or T: 0 P: 1 C: 0 (Profit = $3000)
let result1 = getMaxProfit(7);
console.log("Test Case 1 - Time Unit: 7");
console.log("Maximum Profit: $" + result1.profit);
console.log(
  "Solution: T:" +
    result1.counts.T +
    " P:" +
    result1.counts.P +
    " C:" +
    result1.counts.C
);
console.log("------------------------------------------------------");

// Test Case 2: Time Unit = 8
// Expected solution: T: 1 P: 0 C: 0 (Profit = $4500)
let result2 = getMaxProfit(8);
console.log("Test Case 2 - Time Unit: 8");
console.log("Maximum Profit: $" + result2.profit);
console.log(
  "Solution: T:" +
    result2.counts.T +
    " P:" +
    result2.counts.P +
    " C:" +
    result2.counts.C
);
console.log("------------------------------------------------------");

// Test Case 3: Time Unit = 13
// Expected solution: T: 2 P: 0 C: 0 (Profit = $16500)
let result3 = getMaxProfit(13);
console.log("Test Case 3 - Time Unit: 13");
console.log("Maximum Profit: $" + result3.profit);
console.log(
  "Solution: T:" +
    result3.counts.T +
    " P:" +
    result3.counts.P +
    " C:" +
    result3.counts.C
);
console.log("------------------------------------------------------");
