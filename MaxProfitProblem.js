function getMaxProfit(totalTime) {
  // dp[t] will store an object: { profit, combos }
  // where profit is the maximum profit obtainable from timeUsed = t onward,
  // and combos is an array of building combinations (each combo is an object with counts for T, P, C)
  const dp = new Array(totalTime + 1).fill(null);

  // Recursive function that computes the best outcome from a given timeUsed.
  function recurse(timeUsed) {
    if (timeUsed >= totalTime) {
      // Base case: no time remains – profit zero and one (empty) combination.
      return { profit: 0, combos: [{ T: 0, P: 0, C: 0 }] };
    }
    if (dp[timeUsed] !== null) return dp[timeUsed];

    let bestProfit = 0;
    let bestCombos = [];
    
    // Define the three available properties.
    const properties = [
      { name: "T", buildTime: 5, earning: 1500 }, // Theatre
      { name: "P", buildTime: 4, earning: 1000 }, // Pub
      { name: "C", buildTime: 10, earning: 3000 }, // Commercial Park
    ];

    // Try each property if there is enough remaining time.
    for (let prop of properties) {
      const finishTime = timeUsed + prop.buildTime;
      if (finishTime < totalTime) {
        // Profit from this property: it earns money for the remaining time units after it is built.
        const profitForThis = (totalTime - finishTime) * prop.earning;
        // Get best outcome from finishTime onward.
        const result = recurse(finishTime);
        const totalProfit = profitForThis + result.profit;

        // If we get a new best profit, reset bestCombos.
        if (totalProfit > bestProfit) {
          bestProfit = totalProfit;
          bestCombos = result.combos.map(combo => {
            let newCombo = { ...combo };
            newCombo[prop.name] = (newCombo[prop.name] || 0) + 1;
            return newCombo;
          });
        } else if (totalProfit === bestProfit) {
          // If equal, append these new combos.
          const newCombos = result.combos.map(combo => {
            let newCombo = { ...combo };
            newCombo[prop.name] = (newCombo[prop.name] || 0) + 1;
            return newCombo;
          });
          bestCombos = bestCombos.concat(newCombos);
        }
      }
    }
    // If no property could be built, use the base combo.
    if (bestCombos.length === 0) {
      bestCombos = [{ T: 0, P: 0, C: 0 }];
    }
    dp[timeUsed] = { profit: bestProfit, combos: bestCombos };
    return dp[timeUsed];
  }

  return recurse(0);
}

// Helper: remove duplicate combos.
function getUniqueCombinations(combos) {
  const unique = [];
  const seen = new Set();
  combos.forEach(combo => {
    const key = `${combo.T || 0}-${combo.P || 0}-${combo.C || 0}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(combo);
    }
  });
  return unique;
}

// Helper: Print results for a given totalTime.
function printResult(totalTime) {
  const result = getMaxProfit(totalTime);
  console.log(`Test Case - Time Unit: ${totalTime}`);
  console.log("Maximum Profit: $" + result.profit);
  const uniqueCombos = getUniqueCombinations(result.combos);
  if (uniqueCombos.length > 1) {
    console.log("Possibilities:");
    uniqueCombos.forEach(combo => {
      console.log(`T: ${combo.T || 0}, P: ${combo.P || 0}, C: ${combo.C || 0}`);
    });
  } else {
    // If only one possibility, print it.
    const combo = uniqueCombos[0];
    console.log("Solution: T:" + (combo.T || 0) + " P:" + (combo.P || 0) + " C:" + (combo.C || 0));
  }
  console.log("------------------------------------------------------\n");
}

/* ======= Test Cases ======= */

// Test cases provided in the original code.
printResult(7);
printResult(8);
printResult(13);
printResult(49);
