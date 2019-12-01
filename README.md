# Storage Space Creator 📂💫😎

Create more storage space for your personal computer.

## About

Storage Space Creator 📂💫😎 uses an innovative compression pattern to achieve a perfect 100% compression ratio. Using Storage Space Creator 📂💫😎, we can achieve infinite storage on exactly every storage volume in existence. Also, P=NP.

Storage Space Creator 📂💫😎 uses an innovative emoji system for displaying errors and indexing files. If you don't like emojis, find another solution for creating storage space 😡

⚠️ Please read the FAQ's for more information ⚠️

## Installation

Install via npm to integrate with your node package:
```
$ npm i nickvirag/DownloadMoreStorageSpace
```

Or clone the repository directly:
```
$ git clone https://github.com/nickvirag/DownloadMoreStorageSpace.git
```

## Usage: Console

Storage Space Creator 📂💫😎 can be run directly from the console.

Supported args:

* -h, --help: Show help information
* -c, --compress: Compress input filepath
* -e, --expand: Expand input filepath
* -i=, --input=: Input filepath
* -o=, --output=: Output filepath
* -r, --replace: Overwrite output if exists

Example usage:
```
$ npm run main -- path/to/input -c
$ npm run main -- path/to/input path/to/output -c
$ npm run main -- -i path/to-input -o path/to/output -c
```

## Usage: API

Storage Space Creator 📂💫😎 can be integrated with your own Node.js package.

Four methods are provided. Detailed error reporting is available further below.

### compress
```
async function compress(sourcePath, destinationPath, options={ shouldOverwriteOutput: false })
```
Compress a source using the Storage Space Creator 📂💫😎 compression algorithm.

Example:
```
await compress(
  'path/to/input',
  'path/to/output',
  { shouldOverwriteOutput: true },
);
```

### expand
```
async function expand(sourcePath, destinationPath, options={ shouldOverwriteOutput: false })
```
Expand a source that has been compressed using the Storage Space Creator 📂💫😎 compression algorithm.

Example:
```
await expand(
  'path/to/input',
  'path/to/output',
  { shouldOverwriteOutput: true },
);
```

### bufferToFilepaths
```
function bufferToFilepaths(buffer)
```
Convert a buffer to a list of filepaths that will be created by Storage Space Creator 📂💫😎. Unlike `compress`, this does not create an output file on the user's hard drive.

Example:
```
const buffer = Buffer.from(...);
const filepaths = await bufferToFilepaths(buffer);
```

### filepathsToBuffer
```
function filepathsToBuffer(buffer)
```
Convert a list of filepaths that have been defined by Storage Space Creator 📂💫😎's `bufferToFilepaths` or `compress` methods into a buffer. Unlike `expand`, this does not create an output file on the user's hard drive.

Example:
```
const filepaths = [...];
const buffer = await filepathsToBuffer(filepaths);
```

### Error messages

Error messages are transcoded to emoji.

Here is a list of possible error messages:

* 🤫
* 🤔
* 🤲
* 🤯
* 🙅‍♀️

These emoji are sufficiently self-descriptive, so no further error message documentation is necessary.

## Frequently Asked Questions

### How does it work?
macOS doesn't include filenames when calculating folder size, so by creating empty files where each filename is an encoded byte array representing the source, we can spoof the user into thinking that a folder full of data is empty.

Before compression:
![before compression](doc/before.png)

After compression:
![after compression](doc/after.png)

### Why did you do this?
I don't know. I'm sorry.

### Does this work on Windows?
I have a Windows computer, but I've decided not to test this code on it.

### What's the largest filesize that this supports?
This loads the entire file or directory into memory when encoding and decoding, so it probably doesn't support very big files.