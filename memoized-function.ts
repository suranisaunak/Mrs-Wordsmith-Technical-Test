type MemoizedFunction<T extends (...args: any[]) => any> = T & {
  cache: Map<string, ReturnType<T>>;
};

function memoize<F extends (...args: any[]) => any>(func: F): MemoizedFunction<F> {
  const cache = new Map<string, ReturnType<F>>();

  const memoized = (...args: Parameters<F>): ReturnType<F> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  };

  memoized.cache = cache;
  return memoized;
}

// Example usage
function expensiveOperation(n: number): number {
  console.log(`Performing expensive operation for ${n}`);
  // ... some time-consuming computation
  return n * n;
}

const memoizedExpensiveOperation = memoize(expensiveOperation);

console.log(memoizedExpensiveOperation(5)); // Invokes the original function and computes the result
console.log(memoizedExpensiveOperation(5)); // Retrieves the cached result without invoking the original function again

console.log(memoizedExpensiveOperation(10)); // Invokes the original function and computes the result
console.log(memoizedExpensiveOperation(10)); // Retrieves the cached result without invoking the original function again

console.log(memoizedExpensiveOperation.cache); // Access the internal cache
