# Modevo Motion — analisis HTML+CSS

Sumber:
- CSS shared 6961 baris: base Webflow generik + tema Modevo, minim animasi.
- HTML `modevo-fashion.webflow.io`: `data-wf-page=68b66c49...`, `data-wf-site=68b66c48...`, `w-mod-js`, `data-w-id`, `webflow.*.js` + jquery.

## Keyframes
- Satu-satunya `@keyframes spin` (line 2026): `rotate(0)->360deg`, dipakai `.w-lightbox-spinner` (`animation: .8s linear infinite spin`). Lightbox-only.
- Tidak ada keyframes marquee / hero / reveal di CSS. Gerak utama di IX2 (JS).

## Transitions + hover (CSS, eksak)
- `.nav-link`, `.page-link`: `transition: all .25s`, hover = `underline`.
- `.footer-social-link`: `transition: all .25s`, hover `background: var(--black)`.
- `.explore-button`, `.contact-button`, `.add-to-cart-button`, `.checkout-button`, `.error-button`: `transition: all .25s`, hover invert bg transparent <-> solid + swap warna teks.
- `.w-slider-dot`: `transition: background-color .1s, color .1s`.
- `.w-lightbox-control`: `transition: all .3s`.
- `.summer-item-abs-link`: base `opacity:0` + glass (`backdrop-filter: blur(3px)`); breakpoint mobile paksa `opacity:1`.
- Tidak ada `cubic-bezier` di shared CSS. Tidak ada `animation-timeline` / `scroll-behavior`.

## Kelas target (CSS statis, tanpa animasi)
- `.home-images-block`: grid 3 kolom, gap 22px.
- `.home-image`: `border-radius:20px`; `._02 { margin-top:100px }` (40px mobile, radius 14px mobile).
- `.fresh-title`: `margin-right:auto`; `.look-title`: `margin-left:auto` — layout only.
- `.marquee-wrapper`: flex + `overflow:clip`; `.marquee-items`: flex `flex:none`; `.marquee-item`: width 290/247/223/189/242px + `margin-right:66px` (30px mobile); gradients tepi 240px -> 160/120/60px responsif. Nol animasi di CSS = gerak via IX2.

## Cara kerja Webflow IX2 (hanya dari bukti)
1. Server render elemen dengan `style="opacity:0"` + `data-w-id` + inject `<style>` initial-state per-page (`opacity:0`, `translate3d(0,100%,0)`) scoped `html.w-mod-js:not(.w-mod-ix)`, diduplikasi breakpoint >=992px dan 768-991px.
2. Inline script tambah `w-mod-js` (+`w-mod-touch`) ke `<html>` — tanpa JS, class tak ada, konten tetap tampil (progressive enhancement).
3. `webflow.schunk.*.js` + `webflow.7d6b0624.js` boot IX2, baca JSON interaksi (di bundle JS, tak terlihat di HTML/CSS), animasikan tiap `data-w-id` ke end-state saat trigger fire, lalu tambah `w-mod-ix`.
4. Tipe trigger (load/scroll/hover/click), durasi, easing, stagger: TIDAK ada di HTML/CSS — hanya start-state terlihat. Klaim angka per-elemen = inferensi, bukan bukti.
5. Bukti spesifik: hero `.home-image._01/_02/_03` + `.fresh-title`/`.look-title` + collection/summer/customers/footer semua `opacity:0` + `data-w-id`; navbar `data-duration="400" data-easing="ease"`; hamburger `data-animation-type="lottie" data-autoplay="0" data-ix2-initial-state="0"`.

## Mapping ke padanan kita
| Modevo (IX2) | Kita (`src/`) |
|---|---|
| Entrance `opacity:0->1`, `translateY 100%->0` | `[data-reveal]` -> `[data-revealed=true]` (`Reveal.tsx` + `globals.css`): IO `threshold 0.12`, `rootMargin -12%`, failsafe 2500ms; pola `armed` = cermin `w-mod-js` gating |
| Hero title rise (`fresh/look-title`) | `.mask[data-loaded]` (`MaskReveal.tsx`): `translate 110%`, `1.05s var(--ease-out-expo)` |
| Image wipe (`.home-image`, `.collection-image`) | `[data-clip]` (`Reveal clip`): `clip-path inset` wipe, `1.15s expo` |
| Marquee IX2 (JS, nol CSS) | `@keyframes marquee` + `.marquee-track` (`Marquee.tsx`): `38s linear infinite`, pause on hover; gap: tanpa `:focus-within`, tanpa stop reduced-motion untuk track |
| Hover invert `.25s all` | `.link-underline` sweep (`.45s expo`, transform-only, lebih murah dari `all`) |
| `w-mod-js` gating | `armed` state `Reveal.tsx`; hidden hanya setelah mount |
| `prefers-reduced-motion` | blok reduce `globals.css` paksa final state |
| Easing | `--ease-out-expo: cubic-bezier(0.16,1,0.3,1)`; nilai easing Modevo tak bisa diketahui dari CSS (di JSON IX2), expo-out = padanan standar terdekat |

Unknowns (jangan asumsi): durasi/easing/delay per-elemen IX2, offset scroll, velocitas marquee, mapping frame lottie.
