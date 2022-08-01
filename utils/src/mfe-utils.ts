export function emitEvent(name: string, data: any) {
  dispatchEvent(
    new CustomEvent(name, {
      detail: data,
    }),
  );
}

export function listenEvent(name: string, callback: () => void) {
  window.addEventListener(name, callback);
}
