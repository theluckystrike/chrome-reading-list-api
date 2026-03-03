# chrome-reading-list-api

Chrome Reading List API wrapper for managing saved articles.

## Overview

chrome-reading-list-api provides utilities to add, remove, and manage articles in Chrome's Reading List.

## Installation

```bash
npm install chrome-reading-list-api
```

## Usage

### Add to Reading List

```javascript
import { ReadingList } from 'chrome-reading-list-api';

await ReadingList.add({
  title: 'Article Title',
  url: 'https://example.com/article',
});
```

### Get All Items

```javascript
const items = await ReadingList.getAll();
console.log(items.length);
items.forEach(item => console.log(item.title));
```

### Remove Item

```javascript
await ReadingList.remove(itemId);
```

## API

### Methods

- `add(item)` - Add article to list
- `getAll()` - Get all items
- `getById(id)` - Get specific item
- `remove(id)` - Remove item
- `update(id, updates)` - Update item

### Item Properties

- `title` - Article title
- `url` - Article URL
- `dateAdded` - When added
- `dateLastVisited` - Last viewed

## Manifest

```json
{
  "permissions": ["readingList"]
}
```

## Browser Support

- Chrome 120+

## License

MIT
