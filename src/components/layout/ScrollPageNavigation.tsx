
"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// #region PAGE ORDER

const PAGE_ORDER = [
  "/",
  "/about",
  "/projects",
  "/skills",
  "/contact",
];

// #endregion

// #region SETTINGS

const WHEEL_THRESHOLD = 180;
const SWIPE_THRESHOLD = 110;
const NAVIGATION_COOLDOWN = 900;
const ROUTE_TIMEOUT = 5000;

type SlideDirection = "next" | "previous";
type ScrollDestination = "top" | "bottom";

type PendingRoute = {
  pathname: string;
  scrollDestination: ScrollDestination;
  complete: () => void;
};

let pendingRoute: PendingRoute | null = null;
let navigationInProgress = false;
let lastNavigationEnd = 0;

// #endregion

// #region COMPONENT

export default function ScrollPageNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  // #region RESTORE CORRECT SCROLL POSITION

  useLayoutEffect(() => {
    const pending = pendingRoute;

    if (!pending || pending.pathname !== pathname) {
      return;
    }

    // Going backward by scrolling should show
    // the bottom of the previous page.
    const destination =
      pending.scrollDestination === "bottom"
        ? Math.max(
            0,
            document.documentElement.scrollHeight -
              window.innerHeight
          )
        : 0;

    window.scrollTo({
      top: destination,
      behavior: "instant",
    });

    pendingRoute = null;
    pending.complete();
  }, [pathname]);

  // #endregion

  useEffect(() => {
    const currentIndex = PAGE_ORDER.indexOf(pathname);

    // Do not activate on individual project pages.
    if (currentIndex === -1) {
      return;
    }

    // #region FIND NEIGHBOURING PAGES

    const previousPage =
      currentIndex > 0
        ? PAGE_ORDER[currentIndex - 1]
        : null;

    const nextPage =
      currentIndex < PAGE_ORDER.length - 1
        ? PAGE_ORDER[currentIndex + 1]
        : null;

    // #endregion

    // #region SCROLL TRACKING

    let wheelAmount = 0;
    let lastWheelTime = 0;
    let lastWheelDirection = 0;

    let touchStartY = 0;
    let touchStartEdge: "top" | "bottom" | null =
      null;

    // #endregion

    // #region SCROLL HELPERS

    const isAtTop = () => window.scrollY <= 8;

    const isAtBottom = () => {
      const documentHeight =
        document.documentElement.scrollHeight;

      return (
        window.scrollY + window.innerHeight >=
        documentHeight - 8
      );
    };

    const shouldIgnore = (
      target: EventTarget | null
    ) => {
      if (!(target instanceof Element)) {
        return false;
      }

      // Do not interfere with form inputs,
      // dialogs, expanded tool popups, etc.
      if (
        target.closest(
          [
            "input",
            "textarea",
            "select",
            "iframe",
            "dialog",
            '[role="dialog"]',
            '[contenteditable="true"]',
            "details[open]",
            "[data-scroll-nav-ignore]",
          ].join(",")
        )
      ) {
        return true;
      }

      // Do not hijack scrolling inside
      // independently scrollable containers.
      let element: Element | null = target;

      while (
        element &&
        element !== document.body &&
        element !== document.documentElement
      ) {
        const style = window.getComputedStyle(element);

        const independentlyScrollable =
          style.overflowY === "auto" ||
          style.overflowY === "scroll";

        if (
          independentlyScrollable &&
          element.scrollHeight >
            element.clientHeight + 4
        ) {
          return true;
        }

        element = element.parentElement;
      }

      return false;
    };

    // #endregion

    // #region SLIDE NAVIGATION

    const navigateTo = (
      destination: string,
      direction: SlideDirection,
      scrollDestination: ScrollDestination
    ) => {
      if (
        navigationInProgress ||
        Date.now() - lastNavigationEnd <
          NAVIGATION_COOLDOWN
      ) {
        return;
      }

      navigationInProgress = true;

      let finished = false;

      const finishNavigation = () => {
        if (finished) return;

        finished = true;
        navigationInProgress = false;
        lastNavigationEnd = Date.now();

        document.documentElement.removeAttribute(
          "data-galaxy-slide"
        );
      };

      // #region REDUCED MOTION / FALLBACK

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (
        reducedMotion ||
        !document.startViewTransition
      ) {
        pendingRoute = {
          pathname: destination,
          scrollDestination,
          complete: finishNavigation,
        };

        router.push(destination, {
          scroll: false,
        });

        window.setTimeout(() => {
          if (
            pendingRoute?.pathname === destination
          ) {
            pendingRoute = null;
          }

          finishNavigation();
        }, ROUTE_TIMEOUT);

        return;
      }

      // #endregion

      // #region START REAL PAGE SLIDE

      document.documentElement.setAttribute(
        "data-galaxy-slide",
        direction
      );

     let routeTimer: number | undefined;

      const transition =
        document.startViewTransition(
          () =>
            new Promise<void>((resolve) => {
              pendingRoute = {
                pathname: destination,
                scrollDestination,
                complete: resolve,
              };

              // Avoid freezing the old page forever
              // if a destination fails to load.
              routeTimer = window.setTimeout(() => {
                if (
                  pendingRoute?.pathname ===
                  destination
                ) {
                  pendingRoute = null;
                  resolve();
                }
              }, ROUTE_TIMEOUT);

              router.push(destination, {
                scroll: false,
              });
            })
        );


// #region SAFE TRANSITION HANDLING

// A browser can cancel the slide if its viewport
// changes while the new page is being prepared.
// Handle that cancellation without crashing.

void transition.ready.catch(() => {
  // The visual transition was cancelled.
  // The page navigation can still complete.
});

// Always unlock navigation, even if the
// browser skips the animation.

void transition.finished
  .catch(() => {
    // Handle unexpected animation failures.
  })
  .finally(() => {
    if (routeTimer) {
      window.clearTimeout(routeTimer);
    }

    finishNavigation();
  });

// #endregion


      // #endregion
    };

    // #endregion

    // #region MOUSE WHEEL NAVIGATION

    const handleWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        Math.abs(event.deltaX) >
          Math.abs(event.deltaY)
      ) {
        return;
      }

      if (shouldIgnore(event.target)) {
        wheelAmount = 0;
        return;
      }

      const direction = Math.sign(event.deltaY);

      if (direction === 0) return;

      const goingForward =
        direction > 0 &&
        isAtBottom() &&
        nextPage !== null;

      const goingBackward =
        direction < 0 &&
        isAtTop() &&
        previousPage !== null;

      if (!goingForward && !goingBackward) {
        wheelAmount = 0;
        lastWheelDirection = 0;
        return;
      }

      const now = Date.now();

      if (
        now - lastWheelTime > 500 ||
        direction !== lastWheelDirection
      ) {
        wheelAmount = 0;
      }

      lastWheelTime = now;
      lastWheelDirection = direction;

      const delta =
        event.deltaMode === 1
          ? event.deltaY * 16
          : event.deltaMode === 2
          ? event.deltaY * window.innerHeight
          : event.deltaY;

      wheelAmount += Math.min(
        Math.abs(delta),
        120
      );

      if (wheelAmount < WHEEL_THRESHOLD) {
        return;
      }

      wheelAmount = 0;

      if (goingForward && nextPage) {
        navigateTo(nextPage, "next", "top");
      } else if (goingBackward && previousPage) {
        navigateTo(
          previousPage,
          "previous",
          "bottom"
        );
      }
    };

    // #endregion

    // #region MOBILE SWIPE NAVIGATION

    const handleTouchStart = (event: TouchEvent) => {
      if (
        event.touches.length !== 1 ||
        shouldIgnore(event.target)
      ) {
        touchStartEdge = null;
        return;
      }

      touchStartY = event.touches[0].clientY;

      if (isAtTop() && previousPage) {
        touchStartEdge = "top";
      } else if (isAtBottom() && nextPage) {
        touchStartEdge = "bottom";
      } else {
        touchStartEdge = null;
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (
        !touchStartEdge ||
        event.changedTouches.length !== 1
      ) {
        touchStartEdge = null;
        return;
      }

      const touchEndY =
        event.changedTouches[0].clientY;

      const swipeDistance =
        touchStartY - touchEndY;

      if (
        touchStartEdge === "bottom" &&
        swipeDistance >= SWIPE_THRESHOLD &&
        isAtBottom() &&
        nextPage
      ) {
        navigateTo(nextPage, "next", "top");
      }

      if (
        touchStartEdge === "top" &&
        swipeDistance <= -SWIPE_THRESHOLD &&
        isAtTop() &&
        previousPage
      ) {
        navigateTo(
          previousPage,
          "previous",
          "bottom"
        );
      }

      touchStartEdge = null;
    };

    // #endregion

    // #region NAVBAR AND INTERNAL LINK NAVIGATION

    const handleLinkClick = (event: MouseEvent) => {
      // Preserve Ctrl+Click, middle-click,
      // open-in-new-tab, and browser shortcuts.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      if (!(event.target instanceof Element)) {
        return;
      }

      const link = event.target.closest(
        "a[href]"
      ) as HTMLAnchorElement | null;

      if (!link) return;

      if (
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      ) {
        return;
      }

      // External links behave normally.
      if (link.origin !== window.location.origin) {
        return;
      }

      // Do not interfere with anchors,
      // project detail pages or search parameters.
      if (link.hash || link.search) {
        return;
      }

      const destination =
        link.pathname.replace(/\/+$/, "") || "/";

      const destinationIndex =
        PAGE_ORDER.indexOf(destination);

      if (
        destinationIndex === -1 ||
        destinationIndex === currentIndex
      ) {
        return;
      }

      // Prevent the default Link navigation.
      // We navigate with the slide instead.
      event.preventDefault();

      const direction: SlideDirection =
        destinationIndex > currentIndex
          ? "next"
          : "previous";

      // Navbar links should open a page at its top.
      navigateTo(destination, direction, "top");
    };

    // #endregion

    // #region REGISTER LISTENERS

    window.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    window.addEventListener(
      "touchstart",
      handleTouchStart,
      { passive: true }
    );

    window.addEventListener(
      "touchend",
      handleTouchEnd,
      { passive: true }
    );

    document.addEventListener(
      "click",
      handleLinkClick,
      true
    );

    // #endregion

    // #region CLEANUP

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      );

      window.removeEventListener(
        "touchstart",
        handleTouchStart
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd
      );

      document.removeEventListener(
        "click",
        handleLinkClick,
        true
      );
    };

    // #endregion
  }, [pathname, router]);

  return null;
}

// #endregion
