/** Blokada scrolla tła — działa na iOS Safari (sam `overflow: hidden` na body nie wystarcza). */
let lockCount = 0;
let savedScrollY = 0;

function readScrollY() {
  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

function applyLock() {
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

function applyUnlock() {
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
  if (lockCount === 0) {
    return;
  }
  lockCount = 0;
  applyUnlock();
}
