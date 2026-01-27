# Notification & Event Module - Implementation Summary

## 📋 Tổng quan
Module **Notification & Event** triển khai kiến trúc **event-driven** để tách biệt business logic và notification system, đảm bảo không mất sự kiện và dễ mở rộng.

## ✅ Đã hoàn thành (30% Foundation)

### 1. Database Layer (100%)
**Migrations:**
- ✅ `create_events_table` - Event sourcing & audit:
  - event_key (indexed)
  - aggregate_type & aggregate_id
  - payload (JSON)
  - created_at (indexed)

- ✅ `create_notifications_table` - Multi-channel notifications:
  - user_id (FK)
  - title, content, type, channel
  - event_key (link to event)
  - is_read, read_at
  - metadata (JSON)
  - Composite index: (user_id, is_read, created_at)

- ✅ `create_notification_templates_table` - Dynamic templates:
  - event_key + channel (unique)
  - title_template, content_template
  - is_active flag
  - Template variables: {{variable}}

### 2. Architecture Design (100%)
**Event-Driven Flow:**
```
Core Modules
    ↓ dispatch(Event)
Event Bus (Laravel Events)
    ↓ Listener
Notification Service
    ↓
├─→ In-App Notification (DB)
├─→ Email Queue (Async)
└─→ Push Queue (Future)
```

**Benefits:**
- ✅ Decoupled: Core modules không biết về notification
- ✅ Extensible: Dễ thêm channels mới
- ✅ Reliable: Event log cho audit & replay
- ✅ Async: Email/Push không block

### 3. Event Types Defined

#### **User Events**
- `user.registered` - User đăng ký
- `user.login` - User đăng nhập
- `user.subscription_upgraded` - Nâng cấp gói
- `user.subscription_expired` - Gói hết hạn

#### **Interview/Learning Events**
- `interview.started` - Bắt đầu interview
- `interview.completed` - Hoàn thành
- `interview.passed` - Đạt (score >= 7.0)
- `interview.failed` - Không đạt
- `roadmap.generated` - AI tạo roadmap
- `roadmap.updated` - Roadmap thay đổi

#### **System/Admin Events**
- `question.published` - Câu hỏi mới
- `template.updated` - Template cập nhật
- `system.announcement` - Thông báo hệ thống

### 4. Domain Layer (0%)
**Cần tạo:**
- ⏳ Event base class/interface
- ⏳ Notification entity
- ⏳ NotificationService
- ⏳ TemplateRenderer
- ⏳ Event listeners

### 5. Infrastructure Layer (0%)
**Cần tạo:**
- ⏳ Eloquent models (Event, Notification, NotificationTemplate)
- ⏳ Repositories
- ⏳ Queue jobs (SendEmailNotification, SendPushNotification)

### 6. Application Layer (0%)
**Cần tạo:**
- ⏳ Commands: MarkNotificationAsRead, MarkAllAsRead
- ⏳ Queries: GetUserNotifications, GetUnreadCount

### 7. Presentation Layer (0%)
**Cần tạo:**
- ⏳ NotificationController (User APIs)
- ⏳ NotificationTemplateController (Admin APIs)
- ⏳ Routes

## 🎯 Event Dispatch Pattern

### Example: Interview Completed
```php
// In SubmitInterviewHandler
use App\Domain\Events\InterviewCompletedEvent;
use Illuminate\Support\Facades\Event;

Event::dispatch(new InterviewCompletedEvent(
    userId: $interview->getUserId(),
    interviewId: $interview->getId(),
    score: $interview->getScoreTotal(),
    level: $interview->getLevel(),
    stack: $interview->getStack(),
    passed: $interview->getScoreTotal() >= 7.0
));
```

### Event Listener
```php
class InterviewCompletedListener
{
    public function handle(InterviewCompletedEvent $event)
    {
        // Log event
        EventLog::create([
            'event_key' => 'interview.completed',
            'aggregate_type' => 'interview',
            'aggregate_id' => $event->interviewId,
            'payload' => $event->toArray(),
        ]);

        // Trigger notification
        NotificationService::notify(
            eventKey: $event->passed ? 'interview.passed' : 'interview.failed',
            userId: $event->userId,
            data: $event->toArray()
        );
    }
}
```

## 🔔 Notification Service Logic

### Core Method
```php
public function notify(string $eventKey, int $userId, array $data): void
{
    // Get active templates for this event
    $templates = NotificationTemplate::where('event_key', $eventKey)
        ->where('is_active', true)
        ->get();

    foreach ($templates as $template) {
        // Render title & content
        $title = $this->renderTemplate($template->title_template, $data);
        $content = $this->renderTemplate($template->content_template, $data);

        // Dispatch based on channel
        match ($template->channel) {
            'in_app' => $this->createInAppNotification($userId, $title, $content, $eventKey, $data),
            'email' => $this->queueEmailNotification($userId, $title, $content, $data),
            'push' => $this->queuePushNotification($userId, $title, $content, $data),
        };
    }
}
```

### Template Rendering
```php
private function renderTemplate(string $template, array $data): string
{
    // Replace {{variable}} with actual values
    return preg_replace_callback('/\{\{(\w+)\}\}/', function($matches) use ($data) {
        return $data[$matches[1]] ?? '';
    }, $template);
}
```

## 📊 API Design

### User APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications` | List notifications (paginated) |
| GET | `/api/notifications/unread-count` | Get unread count |
| PATCH | `/api/notifications/{id}/read` | Mark as read |
| PATCH | `/api/notifications/read-all` | Mark all as read |

### Admin APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/notification-templates` | List templates |
| POST | `/admin/notification-templates` | Create template |
| PUT | `/admin/notification-templates/{id}` | Update template |
| DELETE | `/admin/notification-templates/{id}` | Delete template |
| GET | `/admin/events` | View event log |
| POST | `/admin/announcement` | Broadcast system notification |

## 🚀 Queue & Async Strategy

### Queue Configuration
```php
// config/queue.php
'connections' => [
    'notification-email' => [
        'driver' => 'redis',
        'queue' => 'notification-email',
        'retry_after' => 90,
    ],
    'notification-push' => [
        'driver' => 'redis',
        'queue' => 'notification-push',
        'retry_after' => 60,
    ],
]
```

### Email Job
```php
class SendEmailNotificationJob implements ShouldQueue
{
    use Queueable;

    public $tries = 3;
    public $timeout = 60;

    public function handle()
    {
        Mail::to($this->user)->send(
            new NotificationMail($this->title, $this->content)
        );
    }
}
```

### Benefits
- ✅ Non-blocking: Email không làm chậm response
- ✅ Retry: Auto-retry on failure (3 attempts)
- ✅ Dead-letter: Failed jobs vào dead-letter queue
- ✅ Scalable: Multiple workers

## 🔐 Permission & Scope

### User Scope
- ✅ Chỉ xem notifications của mình
- ✅ Không xem được của user khác
- ✅ Filter by is_read, type, date

### Admin Scope
- ✅ Manage notification templates
- ✅ View event log (audit)
- ✅ Broadcast system announcements
- ✅ View notification analytics (Module 8)

## 🔄 Integration Points

### Module 2 - Auth
```php
Event::dispatch(new UserRegisteredEvent($user));
Event::dispatch(new UserLoginEvent($user));
```

### Module 4 - Interview
```php
Event::dispatch(new InterviewStartedEvent($interview));
Event::dispatch(new InterviewCompletedEvent($interview));
```

### Module 7 - AI Roadmap
```php
Event::dispatch(new RoadmapGeneratedEvent($roadmap));
Event::dispatch(new RoadmapUpdatedEvent($roadmap));
```

### Module 8 - Analytics
- Notification open rate
- Event frequency
- Channel effectiveness

## 📁 Files Created (3 migrations)

### Database
- create_events_table.php
- create_notifications_table.php
- create_notification_templates_table.php

## ⏳ Còn thiếu (70%)

### Domain Layer
- ⏳ Event base class/interface
- ⏳ Notification entity
- ⏳ NotificationService
- ⏳ TemplateRenderer
- ⏳ Event listeners (10+ events)

### Infrastructure Layer
- ⏳ Eloquent models (3)
- ⏳ Repositories (2)
- ⏳ Queue jobs (2)
- ⏳ Mail templates

### Application Layer
- ⏳ Commands (2)
- ⏳ Queries (2)

### Presentation Layer
- ⏳ NotificationController
- ⏳ NotificationTemplateController (Admin)
- ⏳ Routes

### Configuration
- ⏳ Event-Listener mapping
- ⏳ Queue configuration
- ⏳ Mail configuration

### Seeders
- ⏳ Notification templates seeder

### Documentation
- ⏳ API docs (User APIs)
- ⏳ API docs (Admin APIs)
- ⏳ Event catalog

## 🚀 Next Steps

### Immediate
1. **Create Domain Layer**:
   - Event base class
   - Notification entity
   - NotificationService

2. **Create Infrastructure**:
   - Eloquent models
   - Repositories

3. **Create Event Listeners**:
   - InterviewCompletedListener
   - RoadmapGeneratedListener
   - UserRegisteredListener

### Short-term
1. Implement User APIs
2. Implement Admin APIs
3. Create queue jobs
4. Seed notification templates

### Long-term
1. WebSocket/SSE for realtime
2. User preferences (opt-in/out)
3. Notification scheduling
4. Event replay mechanism
5. Push notifications (mobile/web)

## 💡 Advanced Features (Future)

### Real-time Notifications
```php
// WebSocket broadcast
broadcast(new NotificationCreated($notification))
    ->toOthers();
```

### User Preferences
```php
user_notification_preferences
- user_id
- channel (email, push, in_app)
- event_key
- is_enabled
```

### Notification Scheduling
```php
scheduled_notifications
- id
- user_id
- scheduled_at
- notification_data
- status
```

### Event Replay
```php
// Replay events for debugging
EventReplayService::replay($eventId);
```

## 📈 Progress

**Overall: 30% Complete**
- ✅ Database: 100% (3 tables)
- ✅ Architecture: 100% (design complete)
- ⏳ Domain: 0%
- ⏳ Infrastructure: 0%
- ⏳ Application: 0%
- ⏳ Presentation: 0%
- ⏳ Documentation: 0%

**Next milestone**: Complete Domain + Infrastructure layers

---

**Status**: 🟡 IN PROGRESS (Foundation complete)
**Priority**: HIGH (Critical for user engagement)
**Blockers**: None (can proceed with implementation)

## 🎓 Best Practices

### Event Naming
- ✅ Use dot notation: `entity.action`
- ✅ Past tense: `interview.completed` (not `interview.complete`)
- ✅ Descriptive: `roadmap.generated` (not `roadmap.new`)

### Template Variables
- ✅ Use {{variable}} syntax
- ✅ Provide defaults: {{name|Guest}}
- ✅ Escape HTML in content

### Queue Reliability
- ✅ Set retry attempts (3)
- ✅ Set timeout (60s)
- ✅ Use dead-letter queue
- ✅ Monitor queue health

### Performance
- ✅ Index frequently queried columns
- ✅ Paginate notifications list
- ✅ Cache unread count
- ✅ Async email/push

---

**Module 9 foundation is ready! Need to implement Domain, Infrastructure, and Application layers to complete.** 🚀
