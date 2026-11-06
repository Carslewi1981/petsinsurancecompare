# PetPlan Compare design system: "the itemized bill"

Subject: pet insurance comparison. Audience: owners worried about a surprise vet bill. The look comes from the
vet clinic's paperwork: invoices, dotted leader lines, rubber stamps, ID tags, exam-room wall tile.

The one memorable element is the invoice in the homepage hero (`components/VetBill.tsx`). It prints out of a slot
on load and recalculates when the visitor picks a pet and a procedure. Everything else stays quiet.

## Tokens (defined in `app/globals.css`, `@theme`)

| Token | Hex | Use |
| --- | --- | --- |
| `chart` | `#f6f8f5` | page background |
| `paper` | `#ffffff` | invoices, cards, fields |
| `mint` / `mint-soft` | `#d9ebe2` / `#ebf4ef` | exam-room wall: section bands, panels |
| `scrub` / `scrub-deep` | `#0b3b3c` / `#072a2b` | primary dark: How it works, footer |
| `teal` | `#146c6a` | links and actions on light |
| `tag` / `tag-soft` | `#ffd23f` / `#fff1b8` | ID-tag yellow: buttons, highlighter, CTA band |
| `stamp` | `#d93a2b` | costs, exclusions, stamps |
| `ink` | `#0f2524` | text, borders, hard shadows |
| `muted` | `#4b6361` | secondary text (AA on `chart`) |

Semantic risk and grade colors live in `lib/healthRisk.ts`.

## Type

- **Bricolage Grotesque** (variable, `opsz` + `wdth` axes) for everything.
  - `.display`: weight 800, width 75%, tight leading. Page titles and section headings.
  - `.heading`: weight 700, width 85%. Card titles, sub-headings.
  - Body: normal width, 17 to 19px, line length capped with `.prose-measure`.
- **IBM Plex Mono** only inside the invoice (`.mono`), where it is literal rather than decorative.
- Sentence case everywhere. No all-caps labels, no eyebrow labels above headings.

## Building blocks

- `.btn` is a pill with a 2px ink border and a hard offset shadow that presses in on `:active`.
  Variants: `.btn-quiet` (outline), `.btn-ink` (use on yellow), `.btn-sm`. Wrap dark sections in `.on-dark`.
- `.leader` gives a dotted leader line between a label and a value (invoice rows, plan terms).
- `.torn-bottom`, `.highlight`, `.strike`, `.stamp` are the invoice parts.
- `.field` and `.field-label` style every form control.
- Cards are paper with a 2px ink border and a hard offset shadow when selected.
- Numbered markers are used only where the content is a real sequence (How it works).

## Motion

One orchestrated moment: the invoice printing out and the stamp landing. After that, motion only answers input
(counting numbers, drawers, dialogs). `prefers-reduced-motion` turns both off.

## Quality floor

Visible focus rings, skip link, `aria-pressed`/`aria-checked` on toggles, Escape closes dialogs, no horizontal
scroll at 375px, text contrast AA or better.

## Copy

Plain verbs, sentence case, the same name for an action everywhere ("Compare plans", "Get a quote").
Insurance numbers in the invoice are an illustration (80% reimbursement, $250 deductible) and are labeled as such.
