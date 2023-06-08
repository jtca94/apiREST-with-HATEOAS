import { Pool } from 'pg'

export const pool = new Pool({
    allowExitOnIdle: true,
});

