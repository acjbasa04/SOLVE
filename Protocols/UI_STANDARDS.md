# UI_STANDARDS.md
# UI Implementation Standard: Word Integrity & Mobile Scaling

**Goal:** Zero word-splitting. High information density. Stable responsive containers.

## 1. Word Integrity (Universal Rule)
All text elements (H1-H6, P, LI) must strictly adhere to the following logic to prevent "Liv-ed" splitting:
- **Align**: `text-align: left !important` (Never justify).
- **Hyphens**: `hyphens: none !important` (No browser-native splitting).
- **Wrap**: `word-break: normal !important` + `overflow-wrap: break-word !important`.

## 2. Handheld Scale (Mobile & Tablet)
For devices < 1024px, we prioritize density over "cinematic" impact.

| Element | Handheld Size | Tailwind Class | Desktop Size |
| :--- | :--- | :--- | :--- |
| **Main Header** | 24px - 28px | `text-2xl md:text-3xl` | `text-4xl` |
| **Sub Header** | 18px - 20px | `text-lg md:text-xl` | `text-2xl` |
| **Body Text** | **14px** | `text-sm md:text-base` | `text-base` |
| **Labels** | 12px | `text-xs` | `text-sm` |

## 3. Container Integrity
- All content containers must use `max-width: 100%` and `overflow-x: hidden`.
- Padding must be absolute: `px-4` (Mobile) / `px-12` (Desktop).
