# DOCUMENTATION_RULES.md

## Documentation Structure (MANDATORY)

- Documentation MUST be organized by MODULE
- Each API endpoint MUST have exactly ONE markdown file
- File path format:

docs/{Module}/{ApiName}.md

Example:
docs/Authen/Đăng Nhập.md

## Forbidden
- DO NOT create a global API_DOCUMENTATION.md
- DO NOT merge multiple APIs into one file
- DO NOT generate documentation outside docs/{Module}/

## File Language
- File name: Vietnamese
- Content: Vietnamese
- Technical terms remain in English

## Content Structure (FIXED)

Each API documentation file MUST follow exactly this structure:

1. API Name
2. Description
3. Endpoint
4. Method
5. Headers
6. Request Body
7. Response Success
8. Response Error
9. Curl Example

No extra sections.
No additional explanations.
