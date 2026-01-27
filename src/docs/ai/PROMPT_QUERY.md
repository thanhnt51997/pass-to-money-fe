You are an AI coding agent working in a Laravel 12 project (PHP 8.3).

Context:
- Architecture: Clean Architecture + DDD + CQRS
- Follow PROJECT_RULES.md and .cursorrules strictly.

Task Type: QUERY (Read)

User Story:
[DESCRIBE READ REQUIREMENT CLEARLY]

Requirements:
- Create Query class
- Create Query Handler
- Read-only operation
- Repository returns DTO or read model
- Controller dispatches Query and returns response

Constraints:
- MUST NOT modify any state
- MUST NOT reuse Command logic
- Eloquent allowed ONLY in Infrastructure
- No unit tests
- No refactor beyond scope

Deliverables:
1. Query class
2. Query Handler
3. Infrastructure repository read method
4. Controller endpoint
5. API documentation:
   - Endpoint
   - Input
   - Output
   - Curl example

Output ONLY code and API documentation.
Do NOT add explanations.
