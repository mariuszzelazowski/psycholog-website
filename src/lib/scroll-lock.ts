/** Blokada scrolla tła przy otwartym menu mobilnym. */
let lockCount = 0;
let savedScrollY = 0;
let touchBlockActive = false;

const SCROLL_LOCK_IGNORE = "[data-scroll-lock-ignore]";

function readScrollY() {
  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

/** iOS Safari — `position: fixed` na body po scrollu często blokuje UI i psuje sticky. */
export function prefersSoftScrollLock() {
  if (typeof window === "undefined") {
    return false;
  }

  const ua = window.navigator.userAgent;
  const ios =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (ios) {
    return true;
  }

  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

function touchMoveShouldAllow(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }
  return Boolean(target.closest(SCROLL_LOCK_IGNORE));
}

function blockTouchScroll(event: TouchEvent) {
  if (touchMoveShouldAllow(event.target)) {
    return;
  }
  event.preventDefault();
}

function applyLockFixed() {
  savedScrollY = readScrollY();
  const { body } = document;

  body.dataset.scrollLocked = "true";
  body.style.position = "fixed";
  body.style.top = `-${savedScrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
  body.style.overflow = "hidden";
}

function applyLockSoft() {
  savedScrollY = readScrollY();
  const { documentElement, body } = document;

  documentElement.dataset.scrollLocked = "soft";
  documentElement.style.overflow = "hidden";
  body.dataset.scrollLocked = "true";
  body.style.overflow = "hidden";

  if (!touchBlockActive) {
    document.addEventListener("touchmove", blockTouchScroll, { passive: false });
    touchBlockActive = true;
  }
}

function applyUnlockFixed() {
  const { body } = document;
  const scrollY = savedScrollY;

  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
  body.style.overflow = "";
  delete body.dataset.scrollLocked;

  window.scrollTo(0, scrollY);
}

function applyUnlockSoft() {
  const { documentElement, body } = document;
  const scrollY = savedScrollY;

  documentElement.style.overflow = "";
  delete documentElement.dataset.scrollLocked;
  body.style.overflow = "";
  delete body.dataset.scrollLocked;

  if (touchBlockActive) {
    document.removeEventListener("touchmove", blockTouchScroll);
    touchBlockActive = false;
  }

  window.scrollTo(0, scrollY);
}

function applyLock() {
  if (prefersSoftScrollLock()) {
    applyLockSoft();
  } else {
    applyLockFixed();
  }
}

function applyUnlock() {
  if (document.documentElement.dataset.scrollLocked === "soft") {
    applyUnlockSoft();
  } else {
    applyUnlockFixed();
  }
}

export function lockBodyScroll() {
  if (lockCount === 0) {
    applyLock();
  }
  lockCount += 1;
}

export function unlockBodyScroll() {
  if (lockCount <= 0) {
    return;
  }
  lockCount -= 1;
  if (lockCount === 0) {
    applyUnlock();
  }
}

/** Po przejściu na desktop / unmount — zawsze odblokuj. */
export function resetBodyScrollLock() {
  const locked =
    lockCount > 0 ||
    touchBlockActive ||
    document.body.dataset.scrollLocked === "true" ||
    document.documentElement.dataset.scrollLocked === "soft";

  if (!locked) {
    return;
  }

  lockCount = 0;
  applyUnlock();
}
