const DEFAULT_DELAY = 300;

export async function timeout(delay = DEFAULT_DELAY) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

export async function flakeTime(probability = 0.5) {
  const duration = Math.random() > probability ? 0 : DEFAULT_DELAY;
  console.log('flakeTime duration:', duration);
  await timeout(duration);
}
