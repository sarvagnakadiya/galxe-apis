function evaluateExpression(data) {
  return data && data.result ? 1 : 0;
}

const exampleExpression1 = { result: true };
const exampleExpression2 = { result: false };

console.log(evaluateExpression(exampleExpression1)); // Output: 1
console.log(evaluateExpression(exampleExpression2)); // Output: 0



function(resp) {
    return resp && resp.result ? 1 : 0;
  }