# chrome-reading-list-api

[![npm version](https://img.shields.io/npm/v/chrome-reading-list-api)](https://npmjs.com/package/chrome-reading-list-api)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/chrome-reading-list-api/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-reading-list-api/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/chrome-reading-list-api?style=social)](https://github.com/theluckystrike/chrome-reading-list-api)

> Chrome Reading List API wrapper for managing saved articles.

**chrome-reading-list-api** provides utilities to add, remove, and manage articles in Chrome's Reading List. Part of the Zovo Chrome extension utilities.

Part of the [Zovo](https://zovo.one) developer tools family.

## Overview

chrome-reading-list-api provides utilities to add, remove, and manage articles in Chrome's Reading List.

## Features

- ✅ **Add Articles** - Save articles to Reading List
- ✅ **List Management** - Get, filter, and search items
- ✅ **Update Items** - Modify titles and URLs
- ✅ **Remove Items** - Delete articles from list
- ✅ **TypeScript Support** - Full type definitions included

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

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/reading-list-improvement`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/reading-list-improvement`
7. **Submit** a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/theluckystrike/chrome-reading-list-api.git
cd chrome-reading-list-api

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [zovo-extension-template](https://github.com/theluckystrike/zovo-extension-template) - Boilerplate for building privacy-first Chrome extensions
- [zovo-types-webext](https://github.com/theluckystrike/zovo-types-webext) - Comprehensive TypeScript type definitions for browser extensions
- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) - Type-safe storage wrapper

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions
- [Zovo Permissions Scanner](https://chrome.google.com/webstore/detail/zovo-permissions-scanner) - Check extension privacy grades

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT - [Zovo](https://zovo.one)

---

*Built by developers, for developers. No compromises on privacy.*
