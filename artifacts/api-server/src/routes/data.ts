import { Router, type IRouter } from "express";
import { readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const router: IRouter = Router();
const dataPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../data.json",
);
const tempPath = `${dataPath}.tmp`;

interface CatalogData {
  products: unknown[];
  categories: unknown[];
  offers: unknown[];
  projects: unknown[];
  testimonials: unknown[];
  translations?: Record<string, unknown>;
}

function hasEmbeddedImageData(value: unknown): boolean {
  return typeof value === "string" && value.startsWith("data:image/");
}

function isCatalogData(value: unknown): value is CatalogData {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<CatalogData>;
  const translationsOk =
    data.translations === undefined ||
    (typeof data.translations === "object" &&
      data.translations !== null &&
      !Array.isArray(data.translations));
  return (
    Array.isArray(data.products) &&
    Array.isArray(data.categories) &&
    Array.isArray(data.offers) &&
    Array.isArray(data.projects) &&
    Array.isArray(data.testimonials) &&
    translationsOk
  );
}

function containsEmbeddedCatalogImage(data: CatalogData): boolean {
  const productsHaveEmbeddedImages = data.products.some((product) => {
    if (!product || typeof product !== "object") return false;
    const productData = product as { images?: unknown; seed?: unknown };
    const images = productData.images;
    return (
      hasEmbeddedImageData(productData.seed) ||
      (Array.isArray(images) && images.some(hasEmbeddedImageData))
    );
  });
  const offersHaveEmbeddedImages = data.offers.some((offer) => {
    if (!offer || typeof offer !== "object") return false;
    return hasEmbeddedImageData((offer as { image?: unknown }).image);
  });
  const projectsHaveEmbeddedImages = data.projects.some((project) => {
    if (!project || typeof project !== "object") return false;
    const projectData = project as { images?: unknown };
    return (
      Array.isArray(projectData.images) &&
      projectData.images.some(hasEmbeddedImageData)
    );
  });
  const testimonialsHaveEmbeddedImages = data.testimonials.some(
    (testimonial) => {
      if (!testimonial || typeof testimonial !== "object") return false;
      return hasEmbeddedImageData((testimonial as { image?: unknown }).image);
    },
  );
  return (
    productsHaveEmbeddedImages ||
    offersHaveEmbeddedImages ||
    projectsHaveEmbeddedImages ||
    testimonialsHaveEmbeddedImages
  );
}

router.get("/data", async (req, res): Promise<void> => {
  try {
    const content = await readFile(dataPath, "utf8");
    const data: unknown = JSON.parse(content);
    if (!isCatalogData(data)) {
      req.log.error("Catalog data has an invalid shape");
      res.status(500).json({ error: "Catalog data is invalid" });
      return;
    }
    res.json(data);
  } catch (error) {
    req.log.error({ err: error }, "Unable to read catalog data");
    res.status(500).json({ error: "Unable to read catalog data" });
  }
});

router.post("/data", async (req, res): Promise<void> => {
  if (!isCatalogData(req.body)) {
    res.status(400).json({
      error:
        "Catalog data must contain products, categories, and offers arrays",
    });
    return;
  }
  if (containsEmbeddedCatalogImage(req.body)) {
    res.status(400).json({
      error:
        "Catalog image fields must contain upload URLs, not embedded image data",
    });
    return;
  }

  try {
    await writeFile(tempPath, `${JSON.stringify(req.body, null, 2)}\n`, "utf8");
    await rename(tempPath, dataPath);
    res.json(req.body);
  } catch (error) {
    req.log.error({ err: error }, "Unable to write catalog data");
    res.status(500).json({ error: "Unable to save catalog data" });
  }
});

export default router;
