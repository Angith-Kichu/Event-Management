CREATE TABLE IF NOT EXISTS registrations (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,

    status VARCHAR(20) NOT NULL DEFAULT 'REGISTERED'
        CHECK (status IN ('REGISTERED','CANCELLED')),

    registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    attendance_status BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT unique_registration
        UNIQUE(user_id, event_id)
);

CREATE INDEX IF NOT EXISTS idx_registrations_user
ON registrations(user_id);

CREATE INDEX IF NOT EXISTS idx_registrations_event
ON registrations(event_id);