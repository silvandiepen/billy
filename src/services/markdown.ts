import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  breaks: true,
  linkify: true,
  html: true,
});

export const renderMarkdown = (str: string): string => {
  return md.render(str);
};
