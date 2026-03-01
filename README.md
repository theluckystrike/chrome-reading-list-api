# chrome-reading-list-api — Reading List API for Chrome Extensions
> **Built by [Zovo](https://zovo.one)**

Add, remove, mark read/unread, query, and manage Reading List entries. `npm i chrome-reading-list-api`

```typescript
import { ReadingList } from 'chrome-reading-list-api';
await ReadingList.addCurrentTab();
const unread = await ReadingList.getUnread();
await ReadingList.markRead(url);
```
MIT License
