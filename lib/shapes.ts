export interface DotShape {
  points: Float32Array;
  halfWidth: number;
  halfHeight: number;
  radius: number;
  tilt: number;
}

type Point = [x: number, y: number, z: number];
type Draw = (context: CanvasRenderingContext2D) => void;
type Solid = (index: number, count: number) => Point;

const TAU = Math.PI * 2;
const GOLDEN = 0.618034;
const CANVAS = 480;

const disc = (context: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
  context.beginPath();
  context.arc(x, y, radius, 0, TAU);
  context.fill();
};

const ring = (context: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
  context.beginPath();
  context.arc(x, y, radius, 0, TAU);
  context.stroke();
};

const trace = (context: CanvasRenderingContext2D, points: number[]) => {
  context.beginPath();
  context.moveTo(points[0], points[1]);
  for (let i = 2; i < points.length; i += 2) context.lineTo(points[i], points[i + 1]);
};

const line = (context: CanvasRenderingContext2D, ...points: number[]) => {
  trace(context, points);
  context.stroke();
};

const polygon = (context: CanvasRenderingContext2D, ...points: number[]) => {
  trace(context, points);
  context.closePath();
  context.fill();
};

const cut = (context: CanvasRenderingContext2D, draw: () => void) => {
  context.globalCompositeOperation = "destination-out";
  draw();
  context.globalCompositeOperation = "source-over";
};

const DRAWINGS: Record<string, Draw> = {
  frontend: (c) => {
    c.lineWidth = 52;
    line(c, 136, 130, 34, 240, 136, 350);
    line(c, 344, 130, 446, 240, 344, 350);
    line(c, 278, 100, 202, 380);
  },
  medituri: (c) => {
    c.translate(240, 240);
    c.rotate(-Math.PI / 4);
    c.lineWidth = 28;
    c.beginPath();
    c.roundRect(-210, -92, 420, 184, 92);
    c.stroke();
    c.beginPath();
    c.roundRect(-210, -92, 210, 184, [92, 0, 0, 92]);
    c.fill();
  },
  crewmates: (c) => {
    polygon(c, 24, 220, 240, 36, 456, 220, 402, 220, 402, 440, 78, 440, 78, 220);
    cut(c, () => {
      c.beginPath();
      c.roundRect(192, 284, 96, 170, [48, 48, 0, 0]);
      c.fill();
      disc(c, 240, 188, 36);
    });
  },
  acquaintdb: (c) => {
    polygon(c, 240, 62, 464, 166, 240, 270, 16, 166);
    c.beginPath();
    c.moveTo(94, 240);
    c.lineTo(94, 342);
    c.quadraticCurveTo(240, 438, 386, 342);
    c.lineTo(386, 240);
    c.lineTo(240, 308);
    c.fill();
    c.lineWidth = 18;
    line(c, 444, 180, 444, 330);
    disc(c, 444, 350, 25);
  },
  dukkan: (c) => {
    polygon(c, 88, 154, 392, 154, 440, 448, 40, 448);
    c.lineWidth = 30;
    c.beginPath();
    c.arc(240, 154, 92, Math.PI, 0);
    c.stroke();
    cut(c, () => {
      c.beginPath();
      c.arc(240, 250, 78, 0, Math.PI);
      c.stroke();
    });
  },
  thymos: (c) => {
    c.beginPath();
    c.moveTo(240, 432);
    c.bezierCurveTo(-58, 238, 26, 48, 144, 48);
    c.bezierCurveTo(190, 48, 224, 74, 240, 112);
    c.bezierCurveTo(256, 74, 290, 48, 336, 48);
    c.bezierCurveTo(454, 48, 538, 238, 240, 432);
    c.fill();
    cut(c, () => {
      c.lineWidth = 26;
      line(c, 10, 232, 142, 232, 184, 154, 246, 308, 292, 200, 316, 232, 470, 232);
    });
  },
  "practice-suite": (c) => {
    c.beginPath();
    c.roundRect(70, 22, 340, 436, 36);
    c.fill();
    cut(c, () => {
      c.fillRect(120, 78, 240, 30);
      c.fillRect(120, 140, 150, 30);
      c.fillRect(120, 326, 60, 82);
      c.fillRect(210, 268, 60, 140);
      c.fillRect(300, 210, 60, 198);
    });
  },
  dodare: (c) => {
    c.lineWidth = 40;
    ring(c, 214, 266, 178);
    ring(c, 214, 266, 96);
    disc(c, 214, 266, 36);
    c.lineWidth = 22;
    line(c, 214, 266, 424, 56);
    polygon(c, 386, 92, 386, 34, 420, 4, 426, 54, 476, 60, 444, 92);
  },
};

const drawMedals =
  (count: number): Draw =>
  (c) => {
    const size = [1, 0.64, 0.5][count - 1] ?? 1 / count;

    for (let i = 0; i < count; i++) {
      c.save();
      c.translate(240 + (i - (count - 1) / 2) * 296 * size, count === 3 && i === 1 ? 278 : 240);
      c.scale(size, size);
      polygon(c, -116, -228, -42, -228, 22, -80, -52, -80);
      polygon(c, 116, -228, 42, -228, -22, -80, 52, -80);
      disc(c, 0, 68, 144);
      cut(c, () => {
        c.lineWidth = 16;
        ring(c, 0, 68, 112);
        polygon(c, -34, 20, 18, -10, 18, 146, -14, 146, -14, 40, -34, 50);
      });
      c.restore();
    }
  };

const SOLIDS: Record<string, Solid> = {
  sphere: (i, n) => {
    const y = 1 - (2 * (i + 0.5)) / n;
    const radius = Math.sqrt(1 - y * y);
    const angle = i * TAU * GOLDEN;
    return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
  },
  backend: (i, n) => {
    const edge = i % 12;
    const along = -0.68 + (1.36 * Math.floor(i / 12)) / Math.max(1, Math.floor((n - 1) / 12));
    const a = edge & 1 ? 0.68 : -0.68;
    const b = edge & 2 ? 0.68 : -0.68;
    const spread = ((i * GOLDEN) % 1) * TAU;
    const u = Math.cos(spread) * 0.055;
    const v = Math.sin(spread) * 0.055;
    if (edge < 4) return [along, a + u, b + v];
    if (edge < 8) return [a + u, along, b + v];
    return [a + u, b + v, along];
  },
  database: (i, n) => {
    const level = i % 3;
    const part = Math.floor(i / 3) / (n / 3);
    const angle = i * TAU * GOLDEN;
    const top = (level - 1) * 0.62 - 0.2;
    const onTop = part < 0.38;
    const radius = onTop ? Math.sqrt(part / 0.38) * 0.8 : 0.8;
    const y = onTop ? top : top + ((part - 0.38) / 0.62) * 0.4;
    return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
  },
  ui: (i, n) => {
    const side = Math.ceil(Math.sqrt(n));
    const x = ((i % side) / (side - 1)) * 2 - 1;
    const z = (Math.floor(i / side) / (side - 1)) * 2 - 1;
    return [x * 0.92, Math.sin(x * 3.4 + z * 1.4) * 0.27 + Math.cos(z * 3) * 0.12, z * 0.92];
  },
  devops: (i, n) => {
    const around = (i / n) * TAU;
    const tube = i * TAU * GOLDEN;
    const width = 1 / (1 + Math.sin(around) ** 2);
    return [
      Math.cos(around) * width * 0.94 + Math.cos(tube) * 0.11,
      Math.sin(around) * Math.cos(around) * width * 1.3 + Math.sin(tube) * 0.11,
      Math.sin(around) * 0.15 + Math.sin(tube * 2) * 0.06,
    ];
  },
  integrations: (i, n) => {
    const around = (i / n) * TAU * 2;
    const tube = i * TAU * GOLDEN;
    const radius = 0.56 + Math.cos(tube) * 0.12;
    const u = Math.cos(around) * radius;
    const v = Math.sin(around) * radius;
    const w = Math.sin(tube) * 0.12;
    return i < n / 2 ? [u - 0.3, v, w] : [u + 0.3, w, v];
  },
};

const fromSolid = (solid: Solid, count: number): DotShape => {
  const ordered = Array.from({ length: count }, (_, i) => solid(i, count)).sort((a, b) => a[0] - b[0]);
  return {
    points: new Float32Array(ordered.flat()),
    halfWidth: 1.12,
    halfHeight: 1.22,
    radius: 0.46 / Math.sqrt(count),
    tilt: 1,
  };
};

const fromDrawing = (width: number, height: number, count: number, draw: Draw): DotShape => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true })!;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = 30;
  draw(context);

  const { data } = context.getImageData(0, 0, width, height);
  let area = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] > 128) area++;

  let spacing = Math.max(1.5, Math.sqrt(area / (count * 0.866)));
  let dots: Point[] = [];

  for (let attempt = 0; attempt < 40; attempt++) {
    dots = [];
    const rowHeight = spacing * 0.866;
    for (let row = 0; row * rowHeight < height; row++) {
      const y = row * rowHeight;
      for (let x = row % 2 ? spacing / 2 : 0; x < width; x += spacing) {
        if (data[(Math.floor(y) * width + Math.floor(x)) * 4 + 3] > 128) {
          dots.push([(x - width / 2) / 240, (y - height / 2) / 240, 0]);
        }
      }
    }
    if (dots.length <= count) break;
    spacing *= 1.01;
  }

  dots.sort((a, b) => a[0] - b[0]);
  const points = new Float32Array(count * 3);
  if (dots.length) {
    for (let i = 0; i < count; i++) points.set(dots[Math.floor((i * dots.length) / count)], i * 3);
  }

  return {
    points,
    halfWidth: width / 480,
    halfHeight: height / 480,
    radius: (spacing * 0.4) / 240,
    tilt: 0,
  };
};

const fromText = (text: string, count: number, family: string) => {
  const font = `800 320px ${family}`;
  const probe = document.createElement("canvas").getContext("2d")!;
  probe.font = font;
  const metrics = probe.measureText(text);
  const ascent = metrics.actualBoundingBoxAscent;
  const width = Math.ceil(metrics.width + 24);
  const height = Math.ceil(ascent + metrics.actualBoundingBoxDescent + 24);

  return fromDrawing(width, height, count, (context) => {
    context.font = font;
    context.fillText(text, 12, ascent + 12);
  });
};

export function createShape(name: string, count: number, family: string): DotShape {
  if (name.startsWith("text:")) return fromText(name.slice(5), count, family);
  if (name.startsWith("medals:")) {
    return fromDrawing(CANVAS, CANVAS, count, drawMedals(Number(name.slice(7))));
  }
  if (DRAWINGS[name]) return fromDrawing(CANVAS, CANVAS, count, DRAWINGS[name]);
  return fromSolid(SOLIDS[name] ?? SOLIDS.sphere, count);
}
