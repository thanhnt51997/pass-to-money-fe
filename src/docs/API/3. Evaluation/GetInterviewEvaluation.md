# Get Interview Evaluation Result

API này cho phép lấy kết quả đánh giá chi tiết của một phiên phỏng vấn từ AI.

## Endpoint
`GET /api/interviews/{id}/result`

## Authentication
Required (JWT Token)

## Authorization
- Chỉ chủ sở hữu (Candidate) của phiên phỏng vấn hoặc Admin mới có quyền truy cập.

## Response Success (Processing)
Nếu AI vẫn đang trong quá trình đánh giá:
```json
{
    "success": true,
    "data": {
        "interview_session_id": 1,
        "status": "processing"
    },
    "message": "Interview results retrieved successfully."
}
```

## Response Success (Completed)
Khi đánh giá đã hoàn tất:
```json
{
    "success": true,
    "data": {
        "interview_session_id": 1,
        "score_total": 85.0,
        "recommendation": "hire",
        "ai_summary": "Ứng viên thể hiện kỹ năng tốt về Laravel và hệ thống.",
        "score_detail": [
            {
                "question_id": 101,
                "score": 9,
                "strengths": ["Giải thích rõ ràng về Service Provider"],
                "weaknesses": [],
                "comment": "Rất tốt."
            }
        ]
    },
    "message": "Interview results retrieved successfully."
}
```

## Error Cases
- **400 Bad Request**: Nếu phiên phỏng vấn chưa được nộp (chưa `completed`).
- **403 Forbidden**: Nếu người dùng không có quyền xem kết quả.
- **404 Not Found**: Nếu không tìm thấy phiên phỏng vấn.
PROMPT;
