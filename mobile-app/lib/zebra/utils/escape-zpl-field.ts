/**
 * Escape carets so literal text in ^FD…^FS is not parsed as ZPL commands.
 */
const escapeZplField = (text: string) => text.replaceAll("^", "^^");

export { escapeZplField };
