You are an AI coding agent working in a Laravel 12 project (PHP 8.3).

Context:
- Architecture: Clean Architecture + DDD + CQRS
- Follow PROJECT_RULES.md and .cursorrules strictly.

Task Type: COMMAND (Write)

User Story:
[DESCRIBE BUSINESS ACTION CLEARLY]

Requirements:
- Create Command class
- Create Command Handler
- Use Domain entities and repository interfaces
- Infrastructure implements repository with Eloquent
- Controller only validates request and dispatches Command

Constraints:
- Do NOT use Eloquent outside Infrastructure
- Do NOT add new packages
- Do NOT refactor unrelated code
- One command = one responsibility
- No unit tests

Deliverables:
1. Command class
2. Command Handler
3. Infrastructure repository implementation (if needed)
4. Controller endpoint
5. API documentation:
   - Endpoint
   - Input
   - Output
   - Curl example

Output ONLY code and API documentation.
Do NOT add explanations.
