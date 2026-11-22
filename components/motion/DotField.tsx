"use client";

import { useEffect, useRef } from "react";
import { clamp, ease, prefersReducedMotion } from "@/lib/motion";
import { createShape, type DotShape } from "@/lib/shapes";

const DESKTOP_DOTS = 2200;
const MOBILE_DOTS = 1300;
const MOBILE_QUERY = "(max-width: 820px)";

interface Anchor {
  element: HTMLElement;
  stage: HTMLElement;
  name: string;
}

export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const root = document.documentElement;
    const anchors: Anchor[] = [];
    for (const element of document.querySelectorAll<HTMLElement>("[data-shape]")) {
      const stage = element.closest("[data-scene]")?.querySelector<HTMLElement>("[data-stage]");
      if (stage && element.dataset.shape) anchors.push({ element, stage, name: element.dataset.shape });
    }
    if (!anchors.length) return;

    const sections = [...document.querySelectorAll<HTMLElement>("[data-tone]")];
    const words = [...document.querySelectorAll<HTMLElement>("[data-word]")];
    const reading = document.querySelector<HTMLElement>("[data-read]");
    const still = prefersReducedMotion();
    const mobile = window.matchMedia(MOBILE_QUERY);
    const random = Float32Array.from({ length: DESKTOP_DOTS * 3 }, Math.random);
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, force: 0, target: 0 };

    let shapes: DotShape[] = [];
    let count = 0;
    let width = 0;
    let height = 0;
    let scale = 0;
    let position: number | null = null;
    let active = -1;
    let intro = still ? 1 : 0;
    let introStart = 0;
    let burst = 0;
    let previous = 0;
    let frame = 0;
    let disposed = false;
    let touchTimer: ReturnType<typeof setTimeout> | undefined;

    const getPosition = () => {
      const focus = height * (mobile.matches ? 0.64 : 0.5);
      const remaining = root.scrollHeight - height - window.scrollY;
      const offsets = anchors.map(({ element }, index) => {
        if (index === 0) return -window.scrollY;
        const { top, height: size } = element.getBoundingClientRect();
        const center = mobile.matches ? Math.min(size / 2, height * 0.12) : size / 2;
        return Math.min(top + center - focus, remaining);
      });

      const next = offsets.findIndex((offset) => offset > 0.5);
      if (next < 0) return anchors.length - 1;
      if (next === 0) return 0;
      return next - 1 - offsets[next - 1] / (offsets[next] - offsets[next - 1]);
    };

    const getPlacement = (index: number) => {
      const shape = shapes[index];
      const { stage } = anchors[index];
      const box = stage.getBoundingClientRect();
      return {
        points: shape.points,
        tilt: shape.tilt,
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
        size: Math.min(stage.clientWidth / (shape.halfWidth * 2), stage.clientHeight / (shape.halfHeight * 2)),
        radius: shape.radius,
      };
    };

    const draw = (at: number) => {
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.clearRect(0, 0, width, height);

      const index = Math.min(Math.floor(at), anchors.length - 1);
      const next = Math.min(index + 1, anchors.length - 1);
      const progress = at - index;
      const changesStage = anchors[index].stage !== anchors[next].stage;
      const from = getPlacement(index);
      const to = getPlacement(next);

      const introLeft = (1 - intro) ** 3;
      const tiltX = still ? 0 : clamp(pointer.x / width - 0.5, -0.5, 0.5) * pointer.force;
      const tiltY = still ? 0 : clamp(pointer.y / height - 0.5, -0.5, 0.5) * pointer.force;
      const fromYaw = progress * 1.1 + from.tilt * 0.55 + tiltX * 0.65;
      const toYaw = (progress - 1) * 1.1 + to.tilt * 0.55 + tiltX * 0.65;
      const fromPitch = from.tilt * 0.36 + tiltY * 0.3;
      const toPitch = to.tilt * 0.36 + tiltY * 0.3;
      const fromCos = Math.cos(fromYaw);
      const fromSin = Math.sin(fromYaw);
      const fromUp = Math.cos(fromPitch);
      const fromDeep = Math.sin(fromPitch);
      const toCos = Math.cos(toYaw);
      const toSin = Math.sin(toYaw);
      const toUp = Math.cos(toPitch);
      const toDeep = Math.sin(toPitch);

      const start = changesStage ? 0.12 : 0.28;
      const span = 1 - start * 2;
      const midway = Math.sin(Math.PI * clamp((progress - start) / span));
      const scatter = Math.min(width, height) * (changesStage ? 0.16 : 0.025);
      const reach = mobile.matches ? 55 : 100;

      context.globalAlpha = changesStage ? 1 - midway * 0.65 : 1;
      context.fillStyle = "#fff";
      context.beginPath();

      for (let i = 0; i < count; i++) {
        const p = i * 3;
        const seedX = random[p] - 0.5;
        const seedY = random[p + 1] - 0.5;
        const seed = random[p + 2];
        const local = ease(clamp(((progress - start) / span - (i / count) * 0.34 - seed * 0.08) / 0.58));

        let x = from.points[p];
        let y = from.points[p + 1];
        let z = from.points[p + 2];
        let turned = x * fromCos + z * fromSin;
        let depth = z * fromCos - x * fromSin;
        let risen = y * fromUp + depth * fromDeep;
        depth = depth * fromUp - y * fromDeep;
        let perspective = 4 / (4 - depth);
        const startX = from.x + turned * from.size * perspective;
        const startY = from.y + risen * from.size * perspective;
        const startRadius = from.radius * from.size * perspective ** 2;

        x = to.points[p];
        y = to.points[p + 1];
        z = to.points[p + 2];
        turned = x * toCos + z * toSin;
        depth = z * toCos - x * toSin;
        risen = y * toUp + depth * toDeep;
        depth = depth * toUp - y * toDeep;
        perspective = 4 / (4 - depth);
        const endX = to.x + turned * to.size * perspective;
        const endY = to.y + risen * to.size * perspective;
        const endRadius = to.radius * to.size * perspective ** 2;

        const loose = local * (1 - local) * 4 * scatter + burst * 170;
        let drawX = startX + (endX - startX) * local + seedX * (loose + introLeft * width * 1.4);
        let drawY = startY + (endY - startY) * local + seedY * (loose + introLeft * height * 1.4);

        if (pointer.force > 0.001) {
          const awayX = drawX - pointer.x;
          const awayY = drawY - pointer.y;
          const squared = awayX * awayX + awayY * awayY;
          if (squared < reach * reach) {
            const distance = Math.sqrt(squared) || 1;
            const push = (1 - distance / reach) ** 2 * reach * pointer.force * (0.55 + seed * 0.6);
            drawX += (awayX / distance) * push;
            drawY += (awayY / distance) * push;
          }
        }

        if (drawX < -8 || drawX > width + 8 || drawY < -8 || drawY > height + 8) continue;
        const radius = Math.max(0.65, startRadius + (endRadius - startRadius) * local);
        context.moveTo(drawX + radius, drawY);
        context.arc(drawX, drawY, radius, 0, Math.PI * 2);
      }

      context.fill();
      context.globalAlpha = 1;
    };

    const updatePage = (at: number) => {
      const current = Math.round(at);
      if (current !== active) {
        active = current;
        anchors.forEach(({ element }, index) => element.toggleAttribute("data-active", index === active));
      }

      const tone = sections.find((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        return top <= 32 && bottom > 32;
      });
      if (tone?.dataset.tone) root.dataset.navTone = tone.dataset.tone;

      if (!reading) return;
      const read = still ? 1 : clamp((height * 0.88 - reading.getBoundingClientRect().top) / (height * 0.48));
      words.forEach((word, index) => {
        word.style.opacity = `${0.24 + clamp(read * (words.length + 3) - index) * 0.76}`;
      });
    };

    const tick = (now: number) => {
      const elapsed = previous ? clamp(now - previous, 0, 250) : 16;
      const target = getPosition();
      const follow = (time: number) => (still ? 1 : 1 - Math.exp(-elapsed / time));

      const current = position ?? target;
      const eased = current + (target - current) * follow(85);
      position = Math.abs(target - eased) < 0.0005 ? target : eased;

      if (shapes.length && intro < 1) {
        introStart ||= now;
        intro = clamp((now - introStart) / 1700);
      }
      burst = burst < 0.001 ? 0 : burst * Math.exp(-elapsed / 220);
      pointer.force += (pointer.target - pointer.force) * follow(130);
      if (Math.abs(pointer.target - pointer.force) < 0.002) pointer.force = pointer.target;
      pointer.x += (pointer.targetX - pointer.x) * follow(60);
      pointer.y += (pointer.targetY - pointer.y) * follow(60);

      const shown = still ? Math.round(position) : position;
      if (shapes.length) draw(shown);
      updatePage(shown);

      const moving =
        position !== target ||
        (shapes.length > 0 && intro < 1) ||
        burst > 0 ||
        pointer.force !== pointer.target ||
        Math.abs(pointer.targetX - pointer.x) + Math.abs(pointer.targetY - pointer.y) > 0.2;

      previous = moving ? now : 0;
      frame = moving ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(tick);
    };

    const buildShapes = () => {
      count = mobile.matches ? MOBILE_DOTS : DESKTOP_DOTS;
      const family = getComputedStyle(document.body).fontFamily;
      shapes = anchors.map(({ name }) => createShape(name, count, family));
      root.dataset.dots = "";
      wake();
    };

    const resize = () => {
      const nextWidth = root.clientWidth;
      const nextHeight = window.innerHeight;
      const nextScale = Math.min(window.devicePixelRatio, 2);
      if (nextWidth === width && nextHeight === height && nextScale === scale) return wake();

      width = nextWidth;
      height = nextHeight;
      scale = nextScale;
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      cancelAnimationFrame(frame);
      tick(performance.now());
    };

    const onPointer = (event: PointerEvent) => {
      if (still || (event.pointerType !== "mouse" && event.type === "pointermove" && !pointer.target)) return;
      clearTimeout(touchTimer);
      if (!pointer.force) {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
      }
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.target = 1;

      if (event.type === "pointerdown") {
        const box = anchors[active]?.stage.getBoundingClientRect();
        const inside =
          box &&
          event.clientX >= box.left &&
          event.clientX <= box.right &&
          event.clientY >= box.top &&
          event.clientY <= box.bottom;
        if (inside) burst = 1;
      }
      wake();
    };

    const onRelease = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.type !== "pointerleave") return;
      clearTimeout(touchTimer);
      touchTimer = setTimeout(() => {
        pointer.target = 0;
        wake();
      }, 120);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    resize();

    document.fonts
      .load(`800 320px ${getComputedStyle(document.body).fontFamily}`)
      .catch(() => [])
      .then(() => {
        if (!disposed) buildShapes();
      });

    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("pointerup", onRelease);
    window.addEventListener("pointercancel", onRelease);
    root.addEventListener("pointerleave", onRelease);
    mobile.addEventListener("change", buildShapes);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(touchTimer);
      observer.disconnect();
      delete root.dataset.dots;
      delete root.dataset.navTone;
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("pointerup", onRelease);
      window.removeEventListener("pointercancel", onRelease);
      root.removeEventListener("pointerleave", onRelease);
      mobile.removeEventListener("change", buildShapes);
    };
  }, []);

  return <canvas className="dot-field" ref={canvasRef} aria-hidden="true" />;
}
