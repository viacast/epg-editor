export function hasValue(data: unknown): boolean {
  return data !== undefined && data !== null && !Number.isNaN(data);
}

export function promisify<Type = unknown>() {
  let res!: (value: Type) => void;
  let rej!: (reason?: string | Error) => void;
  const promise = new Promise<Type>((rs, rj) => {
    res = rs;
    rej = rj;
  });
  return { promise, resolve: res, reject: rej };
}

export async function readFileAsync(file: File): Promise<string> {
  const reader = new FileReader();
  const { promise, resolve, reject } = promisify<string>();
  reader.onload = e => {
    const content = e.target?.result;
    resolve(content?.toString() ?? '');
  };
  reader.onerror = e => reject(e.target?.error?.message);
  reader.readAsText(file);
  return promise;
}
