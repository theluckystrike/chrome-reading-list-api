/**
 * Reading List — Chrome Reading List API wrapper
 */

/** Custom error class for ReadingList operations */
export class ReadingListError extends Error {
    constructor(
        message: string,
        public code: string,
        public suggestion?: string
    ) {
        super(message);
        this.name = 'ReadingListError';
        Error.captureStackTrace(this, this.constructor);
    }
}

/** Error codes for ReadingList operations */
export const ReadingListErrorCode = {
    INVALID_URL: 'INVALID_URL',
    INVALID_TITLE: 'INVALID_TITLE',
    API_NOT_AVAILABLE: 'API_NOT_AVAILABLE',
    OPERATION_FAILED: 'OPERATION_FAILED',
    TAB_NOT_FOUND: 'TAB_NOT_FOUND',
} as const;

/** Validate URL */
function validateUrl(url: string): void {
    if (!url || typeof url !== 'string') {
        throw new ReadingListError(
            'URL is required and must be a non-empty string',
            ReadingListErrorCode.INVALID_URL,
            'Provide a valid URL (e.g., "https://example.com")'
        );
    }
    try {
        new URL(url);
    } catch {
        throw new ReadingListError(
            `Invalid URL format: ${url}`,
            ReadingListErrorCode.INVALID_URL,
            'Provide a valid absolute URL starting with http:// or https://'
        );
    }
}

/** Validate title */
function validateTitle(title: string): void {
    if (!title || typeof title !== 'string') {
        throw new ReadingListError(
            'Title is required and must be a non-empty string',
            ReadingListErrorCode.INVALID_TITLE,
            'Provide a title for the reading list entry'
        );
    }
}

/** Check if Reading List API is available */
function checkApiAvailable(): void {
    if (!(chrome as any).readingList || !(chrome as any).readingList.addEntry) {
        throw new ReadingListError(
            'Reading List API is not available in this browser',
            ReadingListErrorCode.API_NOT_AVAILABLE,
            'This API requires Chrome 120+ or a browser that supports the Reading List API'
        );
    }
}

export class ReadingList {
    /** Add an entry to the reading list */
    static async add(url: string, title: string, hasBeenRead: boolean = false): Promise<void> {
        try {
            validateUrl(url);
            validateTitle(title);
            checkApiAvailable();
            await (chrome as any).readingList.addEntry({ url, title, hasBeenRead });
        } catch (error) {
            if (error instanceof ReadingListError) throw error;
            throw new ReadingListError(
                `Failed to add to reading list: ${error instanceof Error ? error.message : 'Unknown error'}`,
                ReadingListErrorCode.OPERATION_FAILED,
                'Ensure the URL is valid and not already in the reading list'
            );
        }
    }

    /** Remove an entry */
    static async remove(url: string): Promise<void> {
        try {
            validateUrl(url);
            checkApiAvailable();
            await (chrome as any).readingList.removeEntry({ url });
        } catch (error) {
            if (error instanceof ReadingListError) throw error;
            throw new ReadingListError(
                `Failed to remove from reading list: ${error instanceof Error ? error.message : 'Unknown error'}`,
                ReadingListErrorCode.OPERATION_FAILED,
                'Ensure the URL exists in your reading list'
            );
        }
    }

    /** Mark as read */
    static async markRead(url: string): Promise<void> {
        try {
            validateUrl(url);
            checkApiAvailable();
            await (chrome as any).readingList.updateEntry({ url, hasBeenRead: true });
        } catch (error) {
            if (error instanceof ReadingListError) throw error;
            throw new ReadingListError(
                `Failed to mark as read: ${error instanceof Error ? error.message : 'Unknown error'}`,
                ReadingListErrorCode.OPERATION_FAILED,
                'Ensure the URL exists in your reading list'
            );
        }
    }

    /** Mark as unread */
    static async markUnread(url: string): Promise<void> {
        try {
            validateUrl(url);
            checkApiAvailable();
            await (chrome as any).readingList.updateEntry({ url, hasBeenRead: false });
        } catch (error) {
            if (error instanceof ReadingListError) throw error;
            throw new ReadingListError(
                `Failed to mark as unread: ${error instanceof Error ? error.message : 'Unknown error'}`,
                ReadingListErrorCode.OPERATION_FAILED,
                'Ensure the URL exists in your reading list'
            );
        }
    }

    /** Get all entries */
    static async getAll(): Promise<Array<{ url: string; title: string; hasBeenRead: boolean; creationTime: number }>> {
        try {
            checkApiAvailable();
            return await (chrome as any).readingList.query({});
        } catch (error) {
            if (error instanceof ReadingListError) throw error;
            throw new ReadingListError(
                `Failed to get reading list: ${error instanceof Error ? error.message : 'Unknown error'}`,
                ReadingListErrorCode.OPERATION_FAILED
            );
        }
    }

    /** Get unread entries */
    static async getUnread(): Promise<Array<{ url: string; title: string }>> {
        try {
            checkApiAvailable();
            return await (chrome as any).readingList.query({ hasBeenRead: false });
        } catch (error) {
            if (error instanceof ReadingListError) throw error;
            throw new ReadingListError(
                `Failed to get unread entries: ${error instanceof Error ? error.message : 'Unknown error'}`,
                ReadingListErrorCode.OPERATION_FAILED
            );
        }
    }

    /** Get read entries */
    static async getRead(): Promise<Array<{ url: string; title: string }>> {
        try {
            checkApiAvailable();
            return await (chrome as any).readingList.query({ hasBeenRead: true });
        } catch (error) {
            if (error instanceof ReadingListError) throw error;
            throw new ReadingListError(
                `Failed to get read entries: ${error instanceof Error ? error.message : 'Unknown error'}`,
                ReadingListErrorCode.OPERATION_FAILED
            );
        }
    }

    /** Add current tab to reading list */
    static async addCurrentTab(): Promise<{ success: boolean; error?: string }> {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tab?.url || !tab?.title) {
                throw new ReadingListError(
                    'No active tab found or tab lacks URL/title',
                    ReadingListErrorCode.TAB_NOT_FOUND,
                    'Ensure you have an active tab open'
                );
            }
            await this.add(tab.url, tab.title);
            return { success: true };
        } catch (error) {
            if (error instanceof ReadingListError) throw error;
            return { 
                success: false, 
                error: error instanceof Error ? error.message : 'Unknown error' 
            };
        }
    }

    /** Get count */
    static async count(): Promise<{ total: number; unread: number; read: number }> {
        try {
            const all = await this.getAll();
            const unread = all.filter((e) => !e.hasBeenRead).length;
            return { total: all.length, unread, read: all.length - unread };
        } catch (error) {
            if (error instanceof ReadingListError) throw error;
            throw new ReadingListError(
                `Failed to get count: ${error instanceof Error ? error.message : 'Unknown error'}`,
                ReadingListErrorCode.OPERATION_FAILED
            );
        }
    }
}
