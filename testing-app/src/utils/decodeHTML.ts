export function decodeHTML(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    return doc.documentElement.textContent || html;
}