const DEFAULT_DELAY = 300;

export async function timeout(delay = DEFAULT_DELAY) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

export async function flakeTime({ probability, label }) {
  const duration = Math.random() >= probability ? 0 : DEFAULT_DELAY;
  console.log(`[flakeTime] "${label}" delayed by: ${duration}`);
  await timeout(duration);
}
