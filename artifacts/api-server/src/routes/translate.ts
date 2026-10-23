import { Router, type IRouter } from "express";

const router: IRouter = Router();

interface MyMemoryResponse {
  responseData?: { translatedText?: string };
  responseStatus?: number;
}

router.post("/translate", async (req, res): Promise<void> => {
  const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";
  if (!text) {
    res.status(400).json({ error: "Text is required" });
    return;
  }

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ar`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Translation service unavailable");
    const data = (await response.json()) as MyMemoryResponse;
    const translated = data.responseData?.translatedText;
    if (!translated) throw new Error("Translation service returned no result");
    res.json({ translation: translated });
  } catch (error) {
    res.status(502).json({
      error:
        error instanceof Error ? error.message : "Unable to translate text",
    });
  }
});

export default router;
