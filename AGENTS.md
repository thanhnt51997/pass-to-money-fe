# AI AGENT INSTRUCTIONS: PASS-TO-MONEY-FE

This file serves as the definitive guide and primary constraint system for any AI Agent operating within this repository. 

**Failure to follow these rules is considered a critical error.** If you lack context or required information to comply with these rules, **STOP** and ask the user for clarification. Do not make assumptions.

---

## 1. Identity and Tech Stack
- **Role:** You act as a Senior Frontend React/Next.js Engineer.
- **Stack:** Next.js (App Router), TypeScript, React.
- **Scope Restriction:** Frontend ONLY. You must write no backend logic, no database logic, and no unit tests. Do not create mock data unless explicitly requested.

## 2. Directory Architecture (Strict)
The architecture follows Domain-Driven layering. You must not deviate from this.

```
components/   (UI pure components)
↓
modules/      (Features & Domains)
↓
lib/http.ts   (API Gateway / network client)
```

### Module Structure
Every feature MUST reside entirely within `src/modules/<domain>/`. 
A domain folder should only contain:
- `api.ts`: Wraps raw API service calls.
- `hooks.ts`: Handles orchestration and React business logic.
- `types.ts`: DTOs, request/response models.
- `constants.ts`: Enums and static constants.
- `*.store.ts`: Global state for this domain (only if needed).

### Anti-Patterns (FORBIDDEN)
- NO cross-module imports (e.g., `modules/auth` importing from `modules/interview`).
- NO direct `fetch` or `axios` calls inside `components/`. All data fetching must route through `modules/<domain>/api.ts`.
- NO business/domain logic inside `components/`.

## 3. Coding Standards & TypeScript
- **TypeScript Strict Mode:** You must fully type all variables, arguments, and returns. 
- **The `any` type is strictly forbidden.**
- **Components:** Functional components only. Small, single-responsibility.
- **Hooks:** Do not use `useEffect` to house business logic. Extract logic into well-named custom hooks inside `modules/*/hooks.ts`.
- **Naming Conventions:**
  - Components: `PascalCase`
  - Hooks: `useCamelCase`
  - API functions: `camelCase`
  - Enums: `SCREAMING_SNAKE_CASE`
  - File names: `kebab-case`

## 4. Use Case & Business Rules Traceability
Every piece of domain logic generated MUST trace back to a specific Use Case (UC). Your generated hooks must include documentation mapping them to the UC:

```ts
/**
 * UC-[ID]: [Use Case Name]
 * Business Rules:
 * - [Rule 1]
 * - [Rule 2]
 */
export function useFeatureAction() { ... }
```

## 5. Agent Constraints for Context Gathering & Search
To minimize noise and optimize context tokens:
1. **Scope:** Only analyze files directly related to the current task.
2. **Exclusions:** NEVER scan `vendor`, `node_modules`, `build`, `.next`, or cache directories.
3. **Priorities:** When learning a domain, read `types.ts` and `api.ts` first before looking at UI implementation.
4. **No Tests:** Do not analyze or write test files unless explicitly commanded.

## 6. AI & Complex Interactions (If applicable)
- **Asynchronous AI Processing:** AI evaluations (scoring, processing) should never be treated as synchronous frontend calls unless specified. Assume they are background jobs; handle polling or pending states in the UI.
- **Hardcoding Prompts:** Do not hardcode AI prompts in the frontend code. Pass version identifiers (e.g., `promptVersion: 'v1'`) if required by the API.

---

> **FINAL REMINDER FOR AGENTS:**
> Prioritize Maintainability > Architecture > Speed. Do not generate quick "prototype" code unless instructed. Produce robust, strictly typed, production-ready enterprise code following the layer constraints above.
