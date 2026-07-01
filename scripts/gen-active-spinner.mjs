/**
 * Generates public/slides/assets/active-progress.gif — 16×16 blue arc spinner.
 */
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../public/slides/assets/active-progress.gif");

const W = 16;
const H = 16;
const FRAMES = 12;
const DELAY_CS = 4; // 40ms per frame

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const t = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}

function framePixels(angle) {
  const pixels = Buffer.alloc(W * H, 0);
  const cx = 7.5;
  const cy = 7.5;
  const r = 5.2;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < r - 1.4 || dist > r + 0.6) continue;
      let a = Math.atan2(dy, dx);
      let da = ((a - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      if (da > 0 && da < Math.PI * 1.35) pixels[y * W + x] = 1;
    }
  }
  return pixels;
}

mkdirSync(dirname(OUT), { recursive: true });

const header = Buffer.from("GIF89a");
const lsd = Buffer.from([W, 0, H, 0, 0xf7, 0, 0]);
const gct = Buffer.alloc(768, 0);
// index 0: transparent, index 1: #0078d4
gct[3] = 0;
gct[4] = 120;
gct[5] = 212;

const appExt = Buffer.concat([
  Buffer.from([0x21, 0xff, 0x0b]),
  Buffer.from("NETSCAPE2.0"),
  Buffer.from([0x03, 0x01, 0x00, 0x00, 0x00]),
]);

const parts = [header, lsd, gct, appExt];

for (let f = 0; f < FRAMES; f++) {
  const angle = (f / FRAMES) * Math.PI * 2;
  const pixels = framePixels(angle);
  const gce = Buffer.from([0x21, 0xf9, 0x04, 0x05, DELAY_CS, 0x00, 0x00, 0x00]);
  const imgDesc = Buffer.from([0x00, 0x00, 0x00, 0x00, W, 0, H, 0, 0x87]);
  parts.push(gce, Buffer.from([0x2c]), imgDesc, Buffer.from([0x02, 0x04]), pixels, Buffer.from([0x00]));
}

parts.push(Buffer.from([0x3b]));
writeFileSync(OUT, Buffer.concat(parts));
console.log(`Wrote ${OUT} (${FRAMES} frames)`);
