import { NewsContentBlock } from "../../../models/phase2";

export type RenderableNewsBlock =
  | { id: string; kind: "text"; text: string; heading: boolean }
  | { id: string; kind: "image"; uri: string; caption?: string }
  | { id: string; kind: "unsupported-media"; label: string };

export const stripMarkup = (value: string): string =>
  value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim();

export const mapNewsBlocksToRenderableItems = (blocks: NewsContentBlock[]): RenderableNewsBlock[] =>
  blocks.map(block => {
    if (block.type === "heading") {
      return {
        id: block.id,
        kind: "text",
        text: stripMarkup(block.content),
        heading: true,
      };
    }

    if (block.type === "paragraph") {
      return {
        id: block.id,
        kind: "text",
        text: stripMarkup(block.content),
        heading: false,
      };
    }

    if (block.type === "image") {
      if (block.mediaUri) {
        return {
          id: block.id,
          kind: "image",
          uri: block.mediaUri,
          caption: stripMarkup(block.content),
        };
      }
      return {
        id: block.id,
        kind: "unsupported-media",
        label: "Image is unavailable for this article.",
      };
    }

    return {
      id: block.id,
      kind: "unsupported-media",
      label: "Embedded media is unavailable for this article.",
    };
  });
