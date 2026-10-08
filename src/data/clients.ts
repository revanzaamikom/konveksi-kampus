import type { Client } from "@/lib/content/types";

/**
 * Clients / institutions (foundation §10, §22).
 *
 * DELIBERATELY EMPTY until the client confirms which clients may be shown publicly and
 * provides their logos (foundation §22: do not fabricate clients or logos).
 *
 * The UI hides the client strip while this array is empty.
 */
export const clients: Client[] = [];
