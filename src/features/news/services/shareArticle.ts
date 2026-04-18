export interface ShareArticlePayload {
  title: string;
  url: string;
}

export interface ShareAdapter {
  share: (content: { message: string; title: string; url: string }) => Promise<unknown>;
}

export interface ShareArticleResult {
  ok: boolean;
  error?: string;
}

const isValidHttpUrl = (value: string): boolean => /^https?:\/\//i.test(value.trim());

export const shareArticle = async (
  payload: ShareArticlePayload,
  adapter: ShareAdapter
): Promise<ShareArticleResult> => {
  if (!isValidHttpUrl(payload.url)) {
    return { ok: false, error: "Invalid article URL" };
  }

  try {
    await adapter.share({
      message: `${payload.title}\n${payload.url}`,
      title: payload.title,
      url: payload.url,
    });
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to share article";
    return { ok: false, error: message };
  }
};
