# AGENTS.md

# KonveksiKampus — AI Development Instructions

This file contains the mandatory instructions for any AI coding agent working on the KonveksiKampus project.

The purpose of this file is to keep development aligned with the product requirements and prevent unnecessary scope expansion.

---

# 1. PRIMARY OBJECTIVE

The primary objective is to build and maintain the KonveksiKampus website according to the requirements defined in `PRD.md`.

The AI agent must always prioritize:

1. Product requirements
2. User experience
3. Functional correctness
4. Maintainable architecture
5. Performance
6. Visual quality
7. Simplicity

Do not prioritize technical complexity over actual business value.

---

# 2. SOURCE OF TRUTH

The following files have different responsibilities:

```text
PRD.md
→ Product goals, features, package levels, and business requirements.

TECH_SPEC.md
→ Technical stack, architecture, infrastructure, and implementation decisions.

AGENTS.md
→ Rules and behavior that the AI coding agent must follow.
```

When these files exist, they must be read before making significant architectural or feature decisions.

If requirements conflict:

```text
Explicit user instruction
        ↓
PRD.md
        ↓
TECH_SPEC.md
        ↓
AGENTS.md
        ↓
AI agent assumptions
```

Never treat an AI assumption as a requirement.

---

# 3. CORE PRODUCT DIRECTION

KonveksiKampus is a professional digital platform for a convection/garment business.

The product evolves through:

```text
STANDARD
Professional online catalog
        ↓
BUSINESS
Managed digital catalog
        ↓
PRO
Digital sales & inquiry platform
        ↓
FUTURE
Product configurator / advanced commerce
```

The current development phase must always be respected.

Do not implement features from a higher package unless explicitly requested.

---

# 4. CURRENT SCOPE

The current target is:

> Standard Website with an architecture that can reasonably evolve into Business.

The current MVP focuses on:

- Homepage
- Product catalog
- Product categories
- Product detail
- About
- Contact
- Search/filter where appropriate
- Responsive design
- Basic SEO
- Customer inquiry/contact CTA

The Business admin system is a future development phase unless explicitly requested.

---

# 5. DO NOT OVERBUILD

The AI agent must not add features simply because they might be useful later.

Do NOT automatically implement:

- Authentication
- Admin dashboard
- Database
- Payment gateway
- Customer accounts
- Order management
- Inventory system
- ERP
- Product configurator
- Complex analytics
- AI recommendation systems
- Complex CMS
- Unnecessary third-party integrations

unless they are explicitly part of the current task.

Future requirements may influence architecture, but future features must not be implemented prematurely.

---

# 6. FEATURE DISCIPLINE

Before implementing a feature, determine:

1. Is it required by the current PRD?
2. Is it required by the current task?
3. Does it directly support the product goal?
4. Does it introduce unnecessary complexity?

If the answer to the first three questions is no, do not implement it.

If a feature appears useful but is outside the current scope:

- Do not implement it automatically.
- Mention it as a possible future improvement if relevant.
- Continue with the requested scope.

---

# 7. DO NOT INVENT REQUIREMENTS

The AI agent must not invent:

- Business rules
- Product pricing
- Customer workflows
- Admin workflows
- Database requirements
- Payment behavior
- Authentication rules
- Product attributes
- Brand guidelines
- Company information

unless they are provided by the user or documented in the project.

If an important requirement is missing and guessing could affect the architecture or user experience, ask for clarification.

For minor implementation details, choose the simplest reasonable solution.

---

# 8. UI/UX PRINCIPLES

The website should feel:

- Modern
- Clean
- Professional
- Trustworthy
- Simple
- Product-focused

Avoid:

- Excessive animations
- Visual clutter
- Unnecessary gradients
- Excessive decorative elements
- Complicated navigation
- UI patterns that make the website look like a generic template

The product catalog should remain the visual priority.

---

# 9. RESPONSIVE DESIGN

The website must work properly on:

- Mobile
- Tablet
- Desktop

Mobile must not be treated as an afterthought.

Do not solve responsive problems by hiding important content.

Use proper responsive layouts rather than hardcoded positioning whenever possible.

---

# 10. COMPONENT PRINCIPLES

Create reusable components when there is meaningful repetition.

Examples:

- Navbar
- Footer
- ProductCard
- ProductGrid
- CategoryCard
- Button
- Section
- ImageGallery
- CTA

However:

> Do not create abstractions simply for the sake of abstraction.

A component should exist because it improves:

- Reusability
- Readability
- Maintainability
- Consistency

Avoid creating dozens of tiny components that make the project harder to understand.

---

# 11. DATA & CONTENT

Product data should be structured consistently.

A product should have a predictable model.

At minimum:

```text
id
name
slug
category
description
images
status
```

Do not invent additional product fields unless they are required.

The architecture should allow additional fields later without requiring a complete rewrite.

---

# 12. IMAGES & ASSETS

Use appropriate image handling for performance.

Images should:

- Have meaningful filenames where possible.
- Use appropriate dimensions.
- Avoid unnecessarily huge file sizes.
- Have useful alt text.
- Preserve visual quality.

Do not use placeholder images in production unless explicitly intended.

Do not invent company/product imagery when real assets have not been provided.

---

# 13. SEO

The public website should follow basic SEO practices.

At minimum:

- Proper page titles
- Meta descriptions
- Semantic HTML
- Correct heading hierarchy
- Descriptive URLs
- Image alt text
- Appropriate metadata

SEO implementation should remain proportional to the current project scope.

Do not introduce complex SEO infrastructure unless required.

---

# 14. PERFORMANCE

Performance is a core requirement.

Prefer:

- Static generation where appropriate
- Optimized images
- Minimal JavaScript
- Lazy loading where appropriate
- Reusable components
- Lightweight dependencies

Do not add a library for functionality that can reasonably be implemented without one.

Do not optimize prematurely.

Measure or identify actual problems before introducing complex performance solutions.

---

# 15. DEPENDENCY RULE

Before adding a dependency, consider:

1. Is it actually necessary?
2. Can the existing stack solve the problem?
3. Is the dependency maintained?
4. Does it significantly increase bundle size or complexity?
5. Will it create unnecessary lock-in?

Prefer the smallest reliable solution.

---

# 16. CODE QUALITY

Code should be:

- Readable
- Consistent
- Maintainable
- Predictable
- Properly structured

Avoid:

- Duplicate logic
- Dead code
- Unused imports
- Unused dependencies
- Extremely long files
- Magic values where configuration is appropriate
- Temporary hacks left in production

Do not refactor unrelated parts of the application unless necessary for the current task.

---

# 17. CHANGES MUST BE FOCUSED

When implementing a task:

> Change only what is necessary to accomplish the task.

Do not modify unrelated files simply because they could be improved.

Do not perform large-scale refactoring during a small feature request unless the existing structure makes the task impossible or unsafe.

If a broader refactor is genuinely necessary, explain why before doing it.

---

# 18. BEFORE CODING

For non-trivial tasks, the AI agent should first:

1. Read the relevant project files.
2. Understand the existing architecture.
3. Identify affected components/files.
4. Check whether the requested functionality already exists.
5. Determine the smallest reasonable implementation.
6. Implement the change.

Do not immediately rewrite existing systems without understanding them.

---

# 19. AFTER CODING

After making changes:

1. Check for syntax/type errors.
2. Run available tests.
3. Run the build if appropriate.
4. Check affected functionality.
5. Check responsive behavior for UI changes.
6. Remove temporary/debug code.
7. Verify that unrelated functionality was not broken.

If a check cannot be performed, state that clearly.

Never claim something was tested if it was not actually tested.

---

# 20. ERROR HANDLING

Errors should be handled intentionally.

Do not silently swallow errors.

User-facing errors should be:

- Understandable
- Short
- Actionable where possible

Developer-facing errors should contain enough information to debug the issue.

Do not expose sensitive implementation details to users.

---

# 21. SECURITY

Never expose:

- API keys
- Passwords
- Secrets
- Tokens
- Private credentials

Do not hardcode secrets into source code.

Use environment variables or the appropriate secret-management mechanism.

Do not commit `.env` files containing real secrets.

---

# 22. GIT DISCIPLINE

Do not make destructive Git operations without explicit permission.

Avoid:

- Force push
- Hard reset
- Deleting branches
- Removing large amounts of existing work

unless explicitly requested.

Keep changes logically focused.

Commit messages, when requested, should describe the actual change clearly.

---

# 23. COMMUNICATION STYLE

When reporting work:

Be concise and factual.

Explain:

- What was changed
- Why it was changed
- What was tested
- Any remaining issue

Do not claim success without verification.

Do not overwhelm the user with unnecessary implementation details unless requested.

---

# 24. HANDLING AMBIGUOUS REQUESTS

If a request is ambiguous but has a safe, obvious interpretation:

→ Use the simplest interpretation and continue.

If multiple interpretations would produce significantly different implementations:

→ Ask the user before proceeding.

Do not silently choose a complex interpretation.

---

# 25. FUTURE FEATURES

Future features may be documented in `PRD.md`.

They should be treated as:

> Architectural context, not current implementation requirements.

Example:

If the PRD says:

```text
Future:
Product Configurator
```

The AI may ensure the product architecture does not make a future configurator impossible.

But the AI must NOT build the configurator during the Standard MVP.

---

# 26. ANTI-SCOPE-CREEP RULE

The AI agent must actively prevent scope creep.

If a task starts as:

> "Buat product card."

Do not turn it into:

- Product comparison system
- Wishlist
- Cart
- Authentication
- Analytics
- Recommendation engine

unless explicitly requested.

Complete the requested task first.

---

# 27. ANTI-OVERENGINEERING RULE

The preferred solution is:

> The simplest solution that correctly solves the current problem while maintaining reasonable future flexibility.

Not:

> The most sophisticated architecture possible.

Complexity must be justified by actual requirements.

---

# 28. DESIGN CONSISTENCY

When modifying UI:

- Follow the existing design system.
- Reuse existing components.
- Maintain spacing consistency.
- Maintain typography consistency.
- Maintain responsive behavior.
- Do not introduce a completely different visual style without instruction.

If no design system exists yet, establish a simple and consistent one rather than creating unrelated styles per page.

---

# 29. PRIORITY ORDER

When making implementation decisions, use this priority:

```text
1. Explicit user instruction
2. Current task requirements
3. PRD.md
4. Existing project architecture
5. TECH_SPEC.md
6. UX / accessibility
7. Performance
8. Developer convenience
9. Future possibilities
```

Future possibilities must never override current requirements.

---

# 30. FINAL RULE

Before implementing anything, remember:

> Build what KonveksiKampus needs now.

> Do not build what the AI thinks KonveksiKampus might need someday.

The goal is not to create the biggest system.

The goal is to create the right system.

---

# END
