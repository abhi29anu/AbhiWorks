export function isWindowScroller(scroller: Element | Window): boolean {
  if (typeof window === "undefined") return true;
  return (
    scroller === window ||
    scroller === document.documentElement ||
    scroller === document.body ||
    !(scroller instanceof Element)
  );
}

export function observeWindowResize(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  let rafId: number | null = null;
  const onResize = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      callback();
    });
  };
  window.addEventListener("resize", onResize);
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("resize", onResize);
  };
}

export function waitForScrollerReady(_scroller: Element | Window): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }
    if (document.readyState === "complete") {
      requestAnimationFrame(() => resolve());
    } else {
      const onReady = () => {
        window.removeEventListener("load", onReady);
        requestAnimationFrame(() => resolve());
      };
      window.addEventListener("load", onReady);
    }
  });
}
