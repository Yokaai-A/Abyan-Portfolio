I want you to REFACTOR the existing DEV SKILLS section shown in the
current project.

IMPORTANT:
Inspect the current implementation first.

Do NOT redesign the entire page.
Do NOT modify unrelated sections.
Preserve the existing pixel-art nautical visual identity.

The current Skills section already has:

- DEV SKILLS heading
- CAPTAIN'S TOOLKIT label
- Frontend / Backend / Database / Tools navigation
- technology cards
- ITEM INSPECTION panel
- ship interior background

I want to keep the overall visual identity but significantly simplify
the interaction and layout.

==================================================

1. # REMOVE ITEM INSPECTION COMPLETELY

Remove the entire:

ITEM INSPECTION

panel.

I no longer want users to click a technology to inspect its details.

Remove:

- Item Inspection heading
- selected technology state
- selected technology description panel
- technology inspection logic
- active technology detail state
- large right-side inspection container
- any code that only exists for the inspection feature

Technology cards themselves should now be the primary content.

The Skills interface should become simpler and immediately scannable.

# ================================================== 2. TOOLKIT SHOULD USE THE FULL CONTAINER

After removing Item Inspection, let the technology toolkit use the
available width of the Skills box.

Current concept:

┌──────────────────────────────────────────────────────────────┐
│ FRONTEND | BACKEND | DATABASE | TOOLS │
├────────────────────────┬─────────────────────────────────────┤
│ TOOLKIT │ ITEM INSPECTION │
│ │ │
│ [TS] [RE] [NX] │ TypeScript... │
│ [TW] [FM] [HTML] │ │
└────────────────────────┴─────────────────────────────────────┘

REMOVE this.

New concept:

┌──────────────────────────────────────────────────────────────┐
│ FRONTEND | BACKEND | DATABASE | TOOLS │
├──────────────────────────────────────────────────────────────┤
│ │
│ FRONTEND TOOLKIT │
│ │
│ [TypeScript] [React] [Next.js] [Tailwind] [Framer] │
│ [HTML] [shadcn/ui] [...] │
│ │
│ │
└──────────────────────────────────────────────────────────────┘

The toolkit grid should use the full width.

# ================================================== 3. USE REAL TECHNOLOGY ICONS

The current cards use abbreviations such as:

TS
RE
NX
TW
FM

Replace these abbreviation boxes with the recognizable official-style
technology icons already available through the project's icon system.

Prefer using Simple Icons / React Icons if they are already installed.

For example, if react-icons is already available:

import {
SiTypescript,
SiReact,
SiNextdotjs,
SiTailwindcss,
SiFramer,
SiHtml5,
SiNodedotjs,
SiExpress,
SiNestjs,
SiPostgresql,
SiMongodb,
SiRedis,
SiPrisma,
SiDocker,
SiGit,
...
} from "react-icons/si";

IMPORTANT:

Do not install another icon library if the project already contains a
suitable one.

Use recognizable technology logos.

Do NOT use:

TS
RE
NX

as fake text icons when a proper technology icon exists.

If a technology does not have an appropriate icon in the current icon
library, use a simple fallback icon consistent with the design.

Do not use emojis.

# ================================================== 4. ICON VISUAL STYLE

The technology icons should remain recognizable while fitting the
portfolio.

Do NOT necessarily use every brand's original brand color.

Prefer category-based coloring so the interface remains visually
consistent.

Icons may inherit the category accent color.

Example:

FRONTEND
cyan / electric blue

BACKEND
yellow / amber

DATABASE
green / teal

TOOLS
purple / violet

Use colors that already work with the existing dark navy website.

Do NOT introduce overly bright rainbow colors.

# ================================================== 5. CATEGORY COLOR SYSTEM

Each category should have its own accent color.

Create the category color system using CSS variables or the project's
existing styling architecture.

Suggested direction:

FRONTEND
Cyan / Electric Blue

BACKEND
Yellow / Amber

DATABASE
Green / Teal

TOOLS
Purple / Violet

These colors should affect:

- category heading
- active category navigation
- technology icon
- subtle card hover border
- small decorative indicators

Example:

FRONTEND TOOLKIT
→ cyan text

BACKEND TOOLKIT
→ yellow text

DATABASE TOOLKIT
→ green text

TOOLS TOOLKIT
→ purple text

IMPORTANT:

Do not color entire cards.

Keep card backgrounds dark navy.

Use category colors as accents only.

# ================================================== 6. CATEGORY NAVIGATION COLORS

Keep the existing top navigation:

FRONTEND
BACKEND
DATABASE
TOOLS

But make the active category visually inherit its category color.

Example:

FRONTEND selected:
cyan border + cyan text

BACKEND selected:
yellow border + yellow text

DATABASE selected:
green border + green text

TOOLS selected:
purple border + purple text

Inactive categories should remain muted.

Keep the small yellow corner / pixel indicator only if it still works
with the category system.

Do not over-decorate it.

# ================================================== 7. TECHNOLOGY CARD DESIGN

Make the cards more compact now that Item Inspection is gone.

Each card should contain:

TECHNOLOGY ICON

Technology Name

Optional:
very short category/type label if useful

Example:

┌───────────────┐
│ │
│ [⚙] │
│ │
│ TypeScript │
│ │
└───────────────┘

The actual implementation must use the technology icon, not emoji.

Cards should:

- use sharp corners
- use dark navy background
- use thin muted border
- have category-colored icon
- have category-colored hover border
- use existing pixel typography

Do not add descriptions to every card.

Do not add percentages.

Do not add progress bars.

Do not add proficiency ratings.

# ================================================== 8. STATIC / FIXED SKILLS CONTAINER SIZE

This is VERY IMPORTANT.

Currently the Skills box may change its height depending on how many
technologies exist in the selected category.

I DO NOT want that.

The outer Skills container should have a consistent FIXED visual height
on desktop.

Changing:

Frontend → Backend → Database → Tools

must NOT cause the entire Skills section to grow or shrink.

The category content area should have a fixed/minimum defined height.

If there are more technologies than can fit:

MAKE THE TOOLKIT CONTENT SCROLLABLE.

Do NOT expand the outer Skills container.

Example:

┌─────────────────────────────────────────────┐
│ FRONTEND TOOLKIT │
│ │
│ [TS] [RE] [NX] [TW] [FM] │
│ [HT] [SH] [...] │
│ │
│ ▓ │
│ ▓ │
│ ░ │
└─────────────────────────────────────────────┘

Only the toolkit content area should scroll.

Prefer vertical scrolling.

Use:

overflow-y: auto

Do NOT create a page-level horizontal scrollbar.

# ================================================== 9. CUSTOM PIXEL SCROLLBAR

If scrolling is needed, style the internal scrollbar so it fits the
website.

Use:

- thin scrollbar
- dark track
- category-colored thumb or cyan neutral thumb
- square edges
- no rounded modern scrollbar

Keep it subtle.

Do not make the scrollbar visually dominant.

# ================================================== 10. CONSISTENT GRID

Use a responsive grid for technology cards.

Desktop:

approximately 5-6 technology cards per row depending on available width.

Large desktop:
up to 6

Tablet:
3-4

Mobile:
2-3

Use CSS Grid rather than manually positioning cards.

Example:

grid-template-columns:
repeat(auto-fill, minmax(...))

But ensure cards remain visually consistent.

# ================================================== 11. BACKGROUND BEHAVIOR

This is VERY IMPORTANT.

The ship storage / ship interior image should ONLY be the background
of the DEV SKILLS visual area.

I do NOT want the background image to stretch based on the size of
the Skills box.

I do NOT want the background to continue indefinitely down the page.

The background should have its own controlled section height.

Concept:

┌──────────────────────────────────────────────┐
│ │
│ SHIP INTERIOR BACKGROUND │
│ │
│ DEV SKILLS │
│ │
│ ┌────────────────────────────────┐ │
│ │ │ │
│ │ SKILLS TOOLKIT │ │
│ │ │ │
│ └────────────────────────────────┘ │
│ │
└──────────────────────────────────────────────┘
END BACKGROUND

             ↓

         EMPTY SPACING

             ↓

       NEXT PAGE CONTENT

The background belongs to the Skills hero/toolkit area only.

It should NOT be attached to the height of all content below it.

# ================================================== 12. BACKGROUND SIZE

Create a dedicated Skills background wrapper.

For example conceptually:

<section className="skills">
    <div className="skillsBackgroundArea">

        <SkillsHeader />

        <SkillsToolkit />

    </div>

    <div className="afterSkillsSpacing" />

</section>

The background image should be applied to:

skillsBackgroundArea

NOT to the entire Skills page.

Use something conceptually similar to:

background-image: ...
background-size: cover;
background-position: center;
background-repeat: no-repeat;

Give the background area a controlled height / min-height.

The Skills toolkit must fit comfortably inside it.

# ================================================== 13. ADD SPACE BELOW THE BACKGROUND

After the ship background ends, add deliberate breathing room before the
next section.

I want the visual composition to clearly show:

SHIP BACKGROUND
↓
DEV SKILLS
↓
BACKGROUND ENDS
↓
DARK/NORMAL PAGE BACKGROUND
↓
SPACING
↓
CAPTAIN'S WORKSTATION

Do not place Captain's Workstation directly against the Skills box.

Use the existing normal dark navy page background after the image ends.

# ================================================== 14. DO NOT MAKE BACKGROUND FOLLOW TOOLKIT SIZE

Do NOT dynamically resize the ship background based on:

- number of technologies
- selected category
- scroll content
- toolkit grid height

The background area should remain visually stable.

This is one of the main goals of this refactor.

# ================================================== 15. CAPTAIN'S HARDWARE & RIGGING GEAR

There is currently another section called:

CAPTAIN'S HARDWARE & RIGGING GEAR

Simplify this section.

I only want TWO cards.

Rename the section preferably to:

CAPTAIN'S WORKSTATION

Subtitle:

The setup behind the voyage.

Remove unnecessary cards such as:

- Shell & Terminal
- Audio Frequency

I only want:

1. SYSTEM / WORKSTATION
2. HELM / EDITORS

# ================================================== 16. WORKSTATION CARD

Card title:

[ SYSTEM / WORKSTATION ]

Content:

Windows
macOS

This card represents the operating systems I use.

If suitable icons already exist in the project's icon library, use:

Windows icon
Apple/macOS icon

Do not invent hardware specifications.

Do not mention Linux.

Do not mention UNIX.

Do not invent a specific Mac model or Windows PC specification.

Example:

┌──────────────────────────────────┐
│ SYSTEM / WORKSTATION │
│ │
│ [Windows Icon] Windows │
│ [Apple Icon] macOS │
│ │
│ Primary operating environments │
└──────────────────────────────────┘

Keep the description concise.

# ================================================== 17. EDITORS CARD

Card title:

[ HELM / EDITORS ]

Content:

Visual Studio Code
Kiro
Antigravity

Use their recognizable icons if suitable local/project icons already
exist.

Do NOT invent fake brand logos.

If Kiro or Antigravity icons are unavailable in the current icon
library, check whether the project already contains their assets.

If no appropriate icon exists, use a neutral editor/tool fallback icon
instead of drawing an inaccurate logo.

Example:

┌──────────────────────────────────┐
│ HELM / EDITORS │
│ │
│ [icon] Visual Studio Code │
│ [icon] Kiro │
│ [icon] Antigravity │
│ │
│ Editors used across the voyage │
└──────────────────────────────────┘

# ================================================== 18. WORKSTATION LAYOUT

Desktop:

CAPTAIN'S WORKSTATION
The setup behind the voyage.

┌──────────────────────┐ ┌──────────────────────┐
│ SYSTEM / WORKSTATION │ │ HELM / EDITORS │
│ │ │ │
│ Windows │ │ Visual Studio Code │
│ macOS │ │ Kiro │
│ │ │ Antigravity │
└──────────────────────┘ └──────────────────────┘

Both cards should have equal width.

Do NOT create four small cards.

On mobile:

stack them vertically.

# ================================================== 19. RESPONSIVE SKILLS BEHAVIOR

Desktop:

- fixed-height Skills container
- category navigation in one row
- toolkit fills full width
- 5-6 cards per row
- internal scroll if needed

Tablet:

- category navigation remains easy to access
- approximately 3-4 cards per row
- internal scrolling remains

Mobile:

- category navigation may become horizontally scrollable
- 2-3 cards per row
- Skills container may use a responsive fixed/min-height appropriate
  for mobile
- internal content scroll remains
- no page horizontal overflow

Do not make the mobile container absurdly tall.

# ================================================== 20. ACCESSIBILITY

Category navigation should use real buttons.

Provide:

- keyboard accessibility
- visible focus state
- aria-selected or appropriate tab semantics
- meaningful technology names

Technology icons are decorative if the technology name is already visible.

Use aria-hidden on decorative icons.

Do not rely solely on category color.

The active category must also have a border/indicator.

# ================================================== 21. REMOVE OLD CODE

Remove code that is no longer needed for:

- Item Inspection
- selected technology detail
- percentage ratings
- progress bars
- dynamic Skills container sizing
- old four-card hardware section

Do not remove code used elsewhere.

# ================================================== 22. KEEP DATA-DRIVEN ARCHITECTURE

Keep skills data separate from the UI.

Conceptually:

const skillCategories = {
frontend: {
label: "Frontend",
accent: "...",
skills: [...]
},

    backend: {
        label: "Backend",
        accent: "...",
        skills: [...]
    },

    database: {
        label: "Database",
        accent: "...",
        skills: [...]
    },

    tools: {
        label: "Tools",
        accent: "...",
        skills: [...]
    }

};

Each skill should approximately contain:

{
name: "TypeScript",
icon: ...
}

No percentage field.

No proficiency field required.

No description required for the grid.

# ================================================== 23. FINAL INFORMATION ARCHITECTURE

The final page should approximately feel like:

        CAPTAIN'S TOOLKIT

           DEV SKILLS

Tools and technologies collected throughout the voyage.

┌───────────────────────────────────────────────────┐
│ [FRONTEND] [BACKEND] [DATABASE] [TOOLS] │
│ │
│ FRONTEND TOOLKIT │
│ │
│ [icon] [icon] [icon] [icon] │
│ TypeScript React Next.js Tailwind │
│ │
│ [icon] [icon] [icon] │
│ Framer HTML shadcn/ui │
│ │
│ internal scroll if ↓ │
└───────────────────────────────────────────────────┘

        END OF SHIP BACKGROUND


             whitespace


        CAPTAIN'S WORKSTATION

        The setup behind the voyage.

┌───────────────────────┐ ┌────────────────────────┐
│ SYSTEM / WORKSTATION │ │ HELM / EDITORS │
│ │ │ │
│ Windows │ │ Visual Studio Code │
│ macOS │ │ Kiro │
│ │ │ Antigravity │
└───────────────────────┘ └────────────────────────┘

# ================================================== 24. DO NOT

DO NOT:

- recreate Item Inspection
- create technology detail panels
- use percentage proficiency
- use progress bars
- use fake text abbreviations when proper icons exist
- make the Skills container dynamically grow based on skill count
- make the background grow with the toolkit
- make the ship background continue behind Captain's Workstation
- add Linux
- add terminal/shell setup
- add audio setup
- invent hardware specifications
- invent skill levels
- add unnecessary dependencies
- change unrelated sections
- change the global font
- redesign the navbar
- change the overall nautical pixel-art theme

# ================================================== 25. IMPLEMENTATION WORKFLOW

1. Inspect the existing Skills implementation and assets.
2. Inspect which icon library is already installed.
3. Remove Item Inspection completely.
4. Remove selected technology detail state.
5. Expand the toolkit grid to full width.
6. Replace abbreviation icons with recognizable technology icons.
7. Implement category-specific accent colors.
8. Make the outer Skills box visually fixed/stable in height.
9. Make overflowing toolkit content internally scrollable.
10. Style the internal scrollbar consistently.
11. Separate the ship background from the content below.
12. Ensure the background has a controlled size.
13. Add breathing room after the ship background.
14. Refactor Captain's Hardware & Rigging Gear into
    CAPTAIN'S WORKSTATION.
15. Reduce Captain's Workstation to exactly two cards:
    SYSTEM / WORKSTATION
    HELM / EDITORS.
16. Use only Windows + macOS for the workstation.
17. Use only Visual Studio Code + Kiro + Antigravity for editors.
18. Make both areas responsive.
19. Check TypeScript, lint, and build errors.
20. Remove unused code caused by this refactor.
21. Do not modify unrelated sections.

Implement the changes directly in the project.

Do not only explain the implementation.

At the end, summarize:

- files modified
- Item Inspection code removed
- icon source used
- category color mapping
- how fixed-height scrolling works
- how to add another technology later
- how the Skills background is bounded
- changes made to Captain's Workstation
