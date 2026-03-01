/**
 * Reading List — Chrome Reading List API wrapper
 */
export class ReadingList {
    /** Add an entry to the reading list */
    static async add(url: string, title: string, hasBeenRead: boolean = false): Promise<void> {
        await (chrome as any).readingList.addEntry({ url, title, hasBeenRead });
    }

    /** Remove an entry */
    static async remove(url: string): Promise<void> {
        await (chrome as any).readingList.removeEntry({ url });
    }

    /** Mark as read */
    static async markRead(url: string): Promise<void> {
        await (chrome as any).readingList.updateEntry({ url, hasBeenRead: true });
    }

    /** Mark as unread */
    static async markUnread(url: string): Promise<void> {
        await (chrome as any).readingList.updateEntry({ url, hasBeenRead: false });
    }

    /** Get all entries */
    static async getAll(): Promise<Array<{ url: string; title: string; hasBeenRead: boolean; creationTime: number }>> {
        return (chrome as any).readingList.query({});
    }

    /** Get unread entries */
    static async getUnread(): Promise<Array<{ url: string; title: string }>> {
        return (chrome as any).readingList.query({ hasBeenRead: false });
    }

    /** Get read entries */
    static async getRead(): Promise<Array<{ url: string; title: string }>> {
        return (chrome as any).readingList.query({ hasBeenRead: true });
    }

    /** Add current tab to reading list */
    static async addCurrentTab(): Promise<void> {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab?.url && tab?.title) await this.add(tab.url, tab.title);
    }

    /** Get count */
    static async count(): Promise<{ total: number; unread: number; read: number }> {
        const all = await this.getAll();
        const unread = all.filter((e) => !e.hasBeenRead).length;
        return { total: all.length, unread, read: all.length - unread };
    }
}
