let counter = 0;

export function v4(): string {
  counter++;
  return `test-uuid-${counter.toString().padStart(8, '0')}-0000-4000-a000-000000000000`;
}
