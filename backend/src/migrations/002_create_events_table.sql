CREATE TABLE IF NOT EXISTS events (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title VARCHAR(200) NOT NULL,

    description TEXT,

    banner_url TEXT,

    venue VARCHAR(255) NOT NULL,

    start_date TIMESTAMPTZ NOT NULL,

    end_date TIMESTAMPTZ NOT NULL,

    max_participants INTEGER NOT NULL,

    registration_deadline TIMESTAMPTZ NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'UPCOMING'
        CHECK (status IN ('UPCOMING','ONGOING','COMPLETED','CANCELLED')),

    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_start_date
ON events(start_date);

CREATE INDEX IF NOT EXISTS idx_events_status
ON events(status);