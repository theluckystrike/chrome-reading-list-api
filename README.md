# Chrome Reading List API

A TypeScript wrapper for the Chrome Reading List API, available in Manifest V3 extensions.

## Overview

chrome-reading-list-api provides utilities to add, remove, and manage articles in Chrome's Reading List. The library offers a simple static class interface for performing common reading list operations.

## Features

- Add articles to the reading list
- Remove articles from the reading list
- Mark articles as read or unread
- Query all, unread, or read articles
- Add the current browser tab to the reading list
- Get count statistics for the reading list

## Installation

```bash
npm install chrome-reading-list-api
```

## Usage

### Add an Article

```typescript
import { ReadingList } from 'chrome-reading-list-api';

await ReadingList.add('https://example.com/article', 'Article Title');
```

### Add an Article and Mark as Read

```typescript
await ReadingList.add('https://example.com/article', 'Article Title', true);
```

### Get All Articles

```typescript
const items = await ReadingList.getAll();
console.log(`Total items: ${items.length}`);
items.forEach(item => {
  console.log(`${item.title} - ${item.url}`);
  console.log(`Read: ${item.hasBeenRead}`);
});
```

### Get Unread Articles Only

```typescript
const unread = await ReadingList.getUnread();
console.log(`Unread items: ${unread.length}`);
```

### Mark an Article as Read

```typescript
await ReadingList.markRead('https://example.com/article');
```

### Mark an Article as Unread

```typescript
await ReadingList.markUnread('https://example.com/article');
```

### Remove an Article

```typescript
await ReadingList.remove('https://example.com/article');
```

### Add Current Tab

```typescript
// Adds the currently active tab to the reading list
await ReadingList.addCurrentTab();
```

### Get Statistics

```typescript
const stats = await ReadingList.count();
console.log(`Total: ${stats.total}, Unread: ${stats.unread}, Read: ${stats.read}`);
```

## API Reference

### ReadingList

Static class providing methods for reading list management.

#### add

```typescript
static async add(url: string, title: string, hasBeenRead?: boolean): Promise<void>
```

Adds an entry to the reading list.

#### remove

```typescript
static async remove(url: string): Promise<void>
```

Removes an entry from the reading list.

#### markRead

```typescript
static async markRead(url: string): Promise<void>
```

Marks an entry as read.

#### markUnread

```typescript
static async markUnread(url: string): Promise<void>
```

Marks an entry as unread.

#### getAll

```typescript
static async getAll(): Promise<Array<{ url: string; title: string; hasBeenRead: boolean; creationTime: number }>>
```

Returns all reading list entries.

#### getUnread

```typescript
static async getUnread(): Promise<Array<{ url: string; title: string }>>
```

Returns only unread entries.

#### getRead

```typescript
static async getRead(): Promise<Array<{ url: string; title: string }>>
```

Returns only read entries.

#### addCurrentTab

```typescript
static async addCurrentTab(): Promise<void>
```

Adds the currently active browser tab to the reading list.

#### count

```typescript
static async count(): Promise<{ total: number; unread: number; read: number }>
```

Returns counts for total, unread, and read entries.

## Manifest Configuration

Add the readingList permission to your manifest.json:

```json
{
  "permissions": [
    "readingList"
  ]
}
```

## Requirements

- Chrome 120 or later
- Manifest V3

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run tests
npm test
```

## Related

- [zovo-extension-template](https://github.com/theluckystrike/zovo-extension-template) - Boilerplate for building Chrome extensions
- [zovo-types-webext](https://github.com/theluckystrike/zovo-types-webext) - TypeScript type definitions for browser extensions
- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) - Type-safe storage wrapper for Chrome extensions

## License

MIT License

## About

Part of the [zovo.one](https://zovo.one) developer tools family. Built by theluckystrike.
