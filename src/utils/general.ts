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

export async function readFileAsync(
  file: File,
  encoding: 'utf8' | 'iso8859-1' = 'utf8',
  retry = true,
): Promise<string> {
  const reader = new FileReader();
  const { promise, resolve, reject } = promisify<string>();
  reader.onload = async e => {
    const content = e.target?.result;
    if (content?.toString().includes('�') && retry) {
      if (encoding === 'utf8') {
        resolve(await readFileAsync(file, 'iso8859-1', false));
        return;
      }
    }
    resolve(content?.toString() ?? '');
  };
  reader.onerror = e => reject(e.target?.error?.message);
  reader.readAsText(file, encoding);
  return promise;
}

export function addToDate(date: Date, seconds: number): Date {
  return new Date(date.getTime() + seconds * 1000);
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function NOOP(): void {}
