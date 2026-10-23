import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Check,
  FileVideo,
  ImagePlus,
  LockKeyhole,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useCatalog } from "@/data/catalog-store";
import {
  getImageUrl,
  getProductImages,
  type CategoryInfo,
  type Offer,
  type Product,
  type Project,
  type Testimonial,
} from "@/data/products";

const ADMIN_PASSWORD = "Azza@2026";
type Tab =
  | "products"
  | "add"
  | "categories"
  | "offers"
  | "projects"
  | "reviews"
  | "translations";

async function uploadImageFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  const result: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      result &&
      typeof result === "object" &&
      "error" in result &&
      typeof result.error === "string"
        ? result.error
        : "Unable to upload image";
    throw new Error(message);
  }
  if (
    !result ||
    typeof result !== "object" ||
    !("url" in result) ||
    typeof result.url !== "string"
  ) {
    throw new Error("Upload response did not include an image URL");
  }
  return result.url;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
      {children}
    </label>
  );
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("lmr-admin-auth", "true");
      onLogin();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-card border border-border p-8 md:p-12"
      >
        <div className="flex items-center gap-3 text-primary mb-8">
          <LockKeyhole size={20} />
          <p className="text-xs uppercase tracking-[0.25em]">
            Private showroom panel
          </p>
        </div>
        <h1 className="font-serif text-4xl text-foreground mb-3">
          Admin access
        </h1>
        <p className="text-muted-foreground mb-8">
          Manage products, collections, and homepage offers.
        </p>
        <FieldLabel>Password</FieldLabel>
        <input
          autoFocus
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError("");
          }}
          className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-primary"
          placeholder="Enter password"
        />
        {error && <p className="text-destructive text-sm mt-3">{error}</p>}
        <button
          type="submit"
          className="w-full mt-6 bg-primary text-primary-foreground px-5 py-3 uppercase tracking-widest text-xs hover:bg-primary/90"
        >
          Log in
        </button>
        <Link
          href="/"
          className="block text-center mt-6 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          Return to website
        </Link>
      </form>
    </main>
  );
}

interface ProductFormProps {
  product: Product | null;
  products: Product[];
  categories: CategoryInfo[];
  onSave: (product: Product) => void;
  onCancel?: () => void;
}

function ProductForm({
  product,
  products,
  categories,
  onSave,
  onCancel,
}: ProductFormProps) {
  const [draft, setDraft] = useState<Product>(
    () =>
      product ?? {
        id: `product-${Date.now()}`,
        name: "",
        category: categories[0]?.name ?? "",
        description: "",
        price: "Inquire",
        seed: "new-product",
        images: [""],
      },
  );
  const [saving, setSaving] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const update = <K extends keyof Product>(key: K, value: Product[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));
  const uploadImage = async (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSaving(true);
    setUploadError(null);
    try {
      const value = await uploadImageFile(file);
      setDraft((current) => {
        const images = [...(current.images?.length ? current.images : [""])];
        images[index] = value;
        return { ...current, images };
      });
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Unable to upload image",
      );
    } finally {
      setSaving(false);
    }
  };
  const images = draft.images?.length ? draft.images : [draft.seed];

  return (
    <div className="bg-card border border-border p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-primary text-xs uppercase tracking-widest mb-2">
            {product ? "Edit piece" : "New piece"}
          </p>
          <h2 className="font-serif text-3xl text-foreground">
            {product ? product.name : "Add a product"}
          </h2>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <FieldLabel>Product photos · {images.length}/10</FieldLabel>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map((image, index) => (
              <div
                key={`${index}-${image.slice(0, 12)}`}
                className="relative border border-border bg-background p-2"
              >
                <div className="h-32 flex items-center justify-center bg-[#f5f5f5] overflow-hidden">
                  {image ? (
                    <img
                      src={getCatalogDisplayImage(image)}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <ImagePlus className="text-muted-foreground" />
                  )}
                </div>
                <label className="mt-2 flex cursor-pointer items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-primary hover:underline">
                  <ImagePlus size={12} /> Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => uploadImage(index, event)}
                  />
                </label>
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      update(
                        "images",
                        images.filter((_, imageIndex) => imageIndex !== index),
                      )
                    }
                    className="absolute right-1 top-1 rounded-full bg-foreground text-background p-1"
                    aria-label="Remove image"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
            {images.length < 10 && (
              <button
                type="button"
                onClick={() => update("images", [...images, ""])}
                className="min-h-40 border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary flex flex-col items-center justify-center gap-2 text-xs uppercase tracking-wider"
              >
                <Plus size={18} /> Add Another Image
              </button>
            )}
          </div>
          {uploadError && (
            <p className="mt-3 text-sm text-destructive">{uploadError}</p>
          )}
        </div>
        <div>
          <FieldLabel>Product name</FieldLabel>
          <input
            value={draft.name}
            onChange={(event) => update("name", event.target.value)}
            className="admin-input"
            placeholder="The product name"
          />
        </div>
        <div>
          <FieldLabel>Category</FieldLabel>
          <select
            value={draft.category}
            onChange={(event) => update("category", event.target.value)}
            className="admin-input"
          >
            {categories.map((category) => (
              <option key={category.slug} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:col-span-2">
          <FieldLabel>Description</FieldLabel>
          <textarea
            value={draft.description}
            onChange={(event) => update("description", event.target.value)}
            className="admin-input min-h-32"
            placeholder="Describe the piece"
          />
        </div>
        <div>
          <FieldLabel>Price / call to action</FieldLabel>
          <input
            value={draft.price}
            onChange={(event) => update("price", event.target.value)}
            className="admin-input"
          />
        </div>
        <div>
          <FieldLabel>Suggested product</FieldLabel>
          <select
            value={draft.suggestedProductId ?? ""}
            onChange={(event) =>
              update("suggestedProductId", event.target.value || undefined)
            }
            className="admin-input"
          >
            <option value="">No suggestion</option>
            {products
              .filter((item) => item.id !== draft.id)
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="lg:col-span-2">
          <FieldLabel>Section start label (optional)</FieldLabel>
          <input
            value={draft.sectionLabel ?? ""}
            onChange={(event) =>
              update("sectionLabel", event.target.value || undefined)
            }
            className="admin-input"
            placeholder="e.g. Blackout — leave empty unless this product should start a new section in the category sidebar"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6">
        <label className="flex items-center gap-3 text-sm text-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(draft.isNew)}
            onChange={(event) => update("isNew", event.target.checked)}
            className="accent-[hsl(var(--primary))] w-4 h-4"
          />
          Add this piece to the New Collection section
        </label>
        <label className="flex items-center gap-3 text-sm text-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(draft.isClearance)}
            onChange={(event) => update("isClearance", event.target.checked)}
            className="accent-[hsl(var(--primary))] w-4 h-4"
          />
          On Clearance (تخفيضات)
        </label>
      </div>
      <div className="flex gap-3 mt-8">
        <button
          disabled={saving || !draft.name.trim()}
          onClick={() =>
            onSave({
              ...draft,
              name: draft.name.trim(),
              images: images.filter(Boolean),
              seed: images.find(Boolean) || draft.seed,
            })
          }
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-xs disabled:opacity-50"
        >
          <Save size={14} /> {saving ? "Uploading photo..." : "Save product"}
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="border border-border px-6 py-3 uppercase tracking-widest text-xs hover:border-primary"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

function getCatalogDisplayImage(image: string) {
  return image.startsWith("http") || image.startsWith("/")
    ? image
    : getImageUrl(image);
}

function AdminProducts({ onEdit }: { onEdit: (product: Product) => void }) {
  const { products, updateProducts } = useCatalog();
  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-primary text-xs uppercase tracking-widest mb-2">
            Catalog
          </p>
          <h2 className="font-serif text-4xl">Products</h2>
        </div>
        <span className="text-sm text-muted-foreground">
          {products.length} pieces
        </span>
      </div>
      <div className="border border-border divide-y divide-border">
        {products.map((product) => (
          <div key={product.id} className="p-4 flex items-center gap-4">
            <div className="w-20 h-20 bg-[#f5f5f5] shrink-0 flex items-center justify-center overflow-hidden">
              <img
                src={getProductImages(product, 300, 240)[0]}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-xl truncate">{product.name}</p>
              <p className="text-xs uppercase tracking-widest text-primary mt-1">
                {product.category}
                {product.isNew ? " · New" : ""}
                {product.isClearance ? " · Clearance" : ""}
              </p>
            </div>
            <button
              onClick={() => onEdit(product)}
              className="p-2 text-muted-foreground hover:text-primary"
              aria-label={`Edit ${product.name}`}
            >
              <Pencil size={17} />
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Delete ${product.name}?`))
                  updateProducts(
                    products.filter((item) => item.id !== product.id),
                  );
              }}
              className="p-2 text-muted-foreground hover:text-destructive"
              aria-label={`Delete ${product.name}`}
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminCategories() {
  const { categories, products, updateCategories, updateProducts } =
    useCatalog();
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const add = () => {
    const name = newName.trim();
    if (
      !name ||
      categories.some(
        (category) => category.name.toLowerCase() === name.toLowerCase(),
      )
    )
      return;
    updateCategories([
      ...categories,
      {
        name,
        slug: name,
        seed: `lmr-cat-${name.toLowerCase().replace(/\s+/g, "-")}`,
        tagline: "Curated pieces",
      },
    ]);
    setNewName("");
  };
  const rename = (category: CategoryInfo) => {
    const name = editName.trim();
    if (!name || name === category.name) {
      setEditing(null);
      return;
    }
    updateCategories(
      categories.map((item) =>
        item.slug === category.slug ? { ...item, name, slug: name } : item,
      ),
    );
    updateProducts(
      products.map((product) =>
        product.category === category.name
          ? { ...product, category: name }
          : product,
      ),
    );
    setEditing(null);
  };
  return (
    <div>
      <p className="text-primary text-xs uppercase tracking-widest mb-2">
        Catalog structure
      </p>
      <h2 className="font-serif text-4xl mb-8">Categories</h2>
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          className="admin-input flex-1"
          placeholder="New category name"
        />
        <button
          onClick={add}
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 uppercase tracking-widest text-xs"
        >
          <Plus size={14} /> Add New Category
        </button>
      </div>
      <div className="border border-border divide-y divide-border">
        {categories.map((category) => (
          <div key={category.slug} className="p-4 flex items-center gap-3">
            {editing === category.slug ? (
              <input
                autoFocus
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && rename(category)}
                className="admin-input flex-1"
              />
            ) : (
              <span className="font-serif text-xl flex-1">{category.name}</span>
            )}
            <span className="text-xs text-muted-foreground">
              {
                products.filter((product) => product.category === category.name)
                  .length
              }{" "}
              products
            </span>
            {editing === category.slug ? (
              <button
                onClick={() => rename(category)}
                className="p-2 text-primary"
                aria-label="Save name"
              >
                <Check size={17} />
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditing(category.slug);
                  setEditName(category.name);
                }}
                className="p-2 text-muted-foreground hover:text-primary"
                aria-label={`Edit ${category.name}`}
              >
                <Pencil size={17} />
              </button>
            )}
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Delete ${category.name}? Products in this category will remain, but the category will be removed.`,
                  )
                )
                  updateCategories(
                    categories.filter((item) => item.slug !== category.slug),
                  );
              }}
              className="p-2 text-muted-foreground hover:text-destructive"
              aria-label={`Delete ${category.name}`}
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminOffers() {
  const { offers, updateOffers } = useCatalog();
  const [drafts, setDrafts] = useState(offers);
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  useEffect(() => setDrafts(offers), [offers]);
  const update = (id: string, patch: Partial<Offer>) =>
    setDrafts((current) =>
      current.map((offer) =>
        offer.id === id ? { ...offer, ...patch } : offer,
      ),
    );
  const upload = async (id: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(id);
    setUploadError(null);
    try {
      update(id, { image: await uploadImageFile(file) });
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Unable to upload image",
      );
    } finally {
      setUploading(null);
    }
  };
  return (
    <div>
      <p className="text-primary text-xs uppercase tracking-widest mb-2">
        Homepage content
      </p>
      <h2 className="font-serif text-4xl mb-8">Offers / Banners</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {drafts.map((offer) => (
          <div key={offer.id} className="bg-card border border-border p-5">
            <div className="relative h-48 bg-[#f5f5f5] flex items-center justify-center overflow-hidden mb-5">
              <img
                src={getCatalogDisplayImage(offer.image)}
                alt=""
                className="w-full h-full object-contain"
              />
              <label className="absolute bottom-3 left-3 bg-background/90 border border-border px-3 py-2 text-[10px] uppercase tracking-wider cursor-pointer hover:text-primary">
                {uploading === offer.id ? "Uploading..." : "Upload Photo"}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => upload(offer.id, event)}
                />
              </label>
            </div>
            <FieldLabel>Label</FieldLabel>
            <input
              value={offer.eyebrow}
              onChange={(event) =>
                update(offer.id, { eyebrow: event.target.value })
              }
              className="admin-input mb-4"
            />
            <FieldLabel>Title</FieldLabel>
            <input
              value={offer.title}
              onChange={(event) =>
                update(offer.id, { title: event.target.value })
              }
              className="admin-input mb-4"
            />
            <FieldLabel>Description</FieldLabel>
            <textarea
              value={offer.description}
              onChange={(event) =>
                update(offer.id, { description: event.target.value })
              }
              className="admin-input min-h-28"
            />
          </div>
        ))}
      </div>
      {uploadError && (
        <p className="mt-5 text-sm text-destructive">{uploadError}</p>
      )}
      <button
        onClick={() => updateOffers(drafts)}
        className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-xs"
      >
        <Save size={14} /> Save offers
      </button>
    </div>
  );
}

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [draft, setDraft] = useState<Project>(project);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const url = await uploadImageFile(file);
      setDraft((current) => ({ ...current, images: [...current.images, url] }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to upload photo");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };

  const addVideo = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const url = await uploadImageFile(file);
      setDraft((current) => ({ ...current, videos: [...current.videos, url] }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to upload video");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };

  return (
    <div className="bg-card border border-border p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-8">
        <h2 className="font-serif text-3xl text-foreground">
          {project.title ? "Edit project" : "New project"}
        </h2>
        <button
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <FieldLabel>Project title</FieldLabel>
      <input
        value={draft.title}
        onChange={(event) =>
          setDraft((current) => ({ ...current, title: event.target.value }))
        }
        className="admin-input mb-6"
        placeholder="e.g. Ahmed Shobeir Apartment"
      />

      <FieldLabel>Description</FieldLabel>
      <textarea
        value={draft.description}
        onChange={(event) =>
          setDraft((current) => ({
            ...current,
            description: event.target.value,
          }))
        }
        className="admin-input min-h-28 mb-6"
        placeholder="Describe the project"
      />

      <FieldLabel>Photos</FieldLabel>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {draft.images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative border border-border bg-background p-2"
          >
            <div className="h-28 flex items-center justify-center bg-[#f5f5f5] overflow-hidden">
              <img
                src={image}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <button
              type="button"
              onClick={() =>
                setDraft((current) => ({
                  ...current,
                  images: current.images.filter((_, i) => i !== index),
                }))
              }
              className="absolute right-1 top-1 rounded-full bg-foreground text-background p-1"
              aria-label="Remove photo"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        <label className="min-h-28 border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary flex flex-col items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer">
          <ImagePlus size={18} /> Add Photo
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={addImage}
          />
        </label>
      </div>

      <FieldLabel>Videos</FieldLabel>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {draft.videos.map((video, index) => (
          <div
            key={`${video}-${index}`}
            className="relative border border-border bg-background p-2"
          >
            <div className="h-28 flex items-center justify-center bg-black overflow-hidden">
              <video src={video} className="w-full h-full object-contain" />
            </div>
            <button
              type="button"
              onClick={() =>
                setDraft((current) => ({
                  ...current,
                  videos: current.videos.filter((_, i) => i !== index),
                }))
              }
              className="absolute right-1 top-1 rounded-full bg-foreground text-background p-1"
              aria-label="Remove video"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        <label className="min-h-28 border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary flex flex-col items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer">
          <FileVideo size={18} /> Add Video
          <input
            type="file"
            accept="video/*"
            className="sr-only"
            onChange={addVideo}
          />
        </label>
      </div>

      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

      <div className="flex gap-3 mt-6">
        <button
          disabled={busy || !draft.title.trim()}
          onClick={() => onSave({ ...draft, title: draft.title.trim() })}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-xs disabled:opacity-50"
        >
          <Save size={14} /> {busy ? "Uploading..." : "Save project"}
        </button>
        <button
          onClick={onCancel}
          className="border border-border px-6 py-3 uppercase tracking-widest text-xs hover:border-primary"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function AdminProjects() {
  const { projects, updateProjects } = useCatalog();
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-primary text-xs uppercase tracking-widest mb-2">
            Portfolio
          </p>
          <h2 className="font-serif text-4xl">Projects</h2>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 uppercase tracking-widest text-xs"
        >
          <Plus size={14} /> Add New Project
        </button>
      </div>
      <div className="border border-border divide-y divide-border">
        {projects.map((project) => (
          <div key={project.id} className="p-4 flex items-center gap-4">
            <div className="w-20 h-20 bg-[#f5f5f5] shrink-0 flex items-center justify-center overflow-hidden">
              {project.images[0] ? (
                <img
                  src={project.images[0]}
                  alt=""
                  className="w-full h-full object-contain"
                />
              ) : (
                <ImagePlus className="text-muted-foreground" size={18} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-xl truncate">{project.title}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                {project.images.length} photos · {project.videos.length} videos
              </p>
            </div>
            <button
              onClick={() => setEditing(project)}
              className="p-2 text-muted-foreground hover:text-primary"
              aria-label={`Edit ${project.title}`}
            >
              <Pencil size={17} />
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Delete ${project.title}?`))
                  updateProjects(
                    projects.filter((item) => item.id !== project.id),
                  );
              }}
              className="p-2 text-muted-foreground hover:text-destructive"
              aria-label={`Delete ${project.title}`}
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">No projects yet.</p>
        )}
      </div>

      {creating && (
        <div className="fixed inset-0 z-50 bg-foreground/50 overflow-y-auto p-4 md:p-10">
          <div className="max-w-4xl mx-auto mt-6">
            <ProjectForm
              project={{
                id: `project-${Date.now()}`,
                title: "",
                description: "",
                images: [],
                videos: [],
              }}
              onCancel={() => setCreating(false)}
              onSave={(project) => {
                updateProjects([...projects, project]);
                setCreating(false);
              }}
            />
          </div>
        </div>
      )}
      {editing && (
        <div className="fixed inset-0 z-50 bg-foreground/50 overflow-y-auto p-4 md:p-10">
          <div className="max-w-4xl mx-auto mt-6">
            <ProjectForm
              project={editing}
              onCancel={() => setEditing(null)}
              onSave={(project) => {
                updateProjects(
                  projects.map((item) =>
                    item.id === project.id ? project : item,
                  ),
                );
                setEditing(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function AdminReviews() {
  const { testimonials, updateTestimonials } = useCatalog();
  const [drafts, setDrafts] = useState(testimonials);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => setDrafts(testimonials), [testimonials]);

  const update = (id: string, patch: Partial<Testimonial>) =>
    setDrafts((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );

  const uploadScreenshot = async (
    id: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(id);
    setError(null);
    try {
      update(id, { image: await uploadImageFile(file) });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to upload screenshot",
      );
    } finally {
      setUploading(null);
    }
  };

  return (
    <div>
      <p className="text-primary text-xs uppercase tracking-widest mb-2">
        Social proof
      </p>
      <h2 className="font-serif text-4xl mb-8">Reviews</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {drafts.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-card border border-border p-5"
          >
            <FieldLabel>Type</FieldLabel>
            <select
              value={testimonial.type}
              onChange={(event) =>
                update(testimonial.id, {
                  type: event.target.value as Testimonial["type"],
                })
              }
              className="admin-input mb-4"
            >
              <option value="text">Text review</option>
              <option value="screenshot">Screenshot</option>
            </select>

            {testimonial.type === "text" ? (
              <>
                <FieldLabel>Name</FieldLabel>
                <input
                  value={testimonial.name ?? ""}
                  onChange={(event) =>
                    update(testimonial.id, { name: event.target.value })
                  }
                  className="admin-input mb-4"
                />
                <FieldLabel>Review text</FieldLabel>
                <textarea
                  value={testimonial.text ?? ""}
                  onChange={(event) =>
                    update(testimonial.id, { text: event.target.value })
                  }
                  className="admin-input min-h-24"
                />
              </>
            ) : (
              <>
                <div className="h-40 bg-[#f5f5f5] flex items-center justify-center overflow-hidden mb-3">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <ImagePlus className="text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <label className="inline-flex cursor-pointer items-center gap-1 text-[10px] uppercase tracking-wider text-primary hover:underline">
                    {uploading === testimonial.id
                      ? "Uploading..."
                      : "Upload Screenshot"}
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(event) =>
                        uploadScreenshot(testimonial.id, event)
                      }
                    />
                  </label>
                  {testimonial.image && (
                    <button
                      type="button"
                      onClick={() => update(testimonial.id, { image: "" })}
                      className="text-[10px] uppercase tracking-wider text-destructive hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {error && <p className="mt-5 text-sm text-destructive">{error}</p>}
      <button
        onClick={() => updateTestimonials(drafts)}
        className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-xs"
      >
        <Save size={14} /> Save reviews
      </button>
    </div>
  );
}

function AdminTranslations() {
  const { translations, updateTranslations } = useCatalog();
  const [drafts, setDrafts] = useState<Record<string, string>>(translations);
  const [search, setSearch] = useState("");
  useEffect(() => setDrafts(translations), [translations]);

  const rows = useMemo(
    () =>
      Object.keys(drafts)
        .filter((key) => key.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.localeCompare(b)),
    [drafts, search],
  );

  return (
    <div>
      <p className="text-primary text-xs uppercase tracking-widest mb-2">
        EN / AR
      </p>
      <h2 className="font-serif text-4xl mb-6">Translations</h2>

      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search English text..."
        className="admin-input mb-6"
      />

      <div className="border border-border divide-y divide-border max-h-[65vh] overflow-y-auto">
        {rows.map((key) => (
          <div key={key} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="text-sm text-muted-foreground">{key}</div>
            <input
              value={drafts[key]}
              onChange={(event) =>
                setDrafts((current) => ({
                  ...current,
                  [key]: event.target.value,
                }))
              }
              className="admin-input"
              dir="rtl"
            />
          </div>
        ))}
        {rows.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">
            No translations yet. Switch the site to Arabic once to auto-generate
            the first batch.
          </p>
        )}
      </div>

      <button
        onClick={() => updateTranslations(drafts)}
        className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-xs"
      >
        <Save size={14} /> Save translations
      </button>
    </div>
  );
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem("lmr-admin-auth") === "true",
  );
  const [tab, setTab] = useState<Tab>("products");
  const [editing, setEditing] = useState<Product | null>(null);
  const {
    products,
    categories,
    updateProducts,
    saveStatus,
    saveError,
    isLoading,
  } = useCatalog();
  const tabs: { id: Tab; label: string }[] = [
    { id: "products", label: "Products" },
    { id: "add", label: "Add New Product" },
    { id: "categories", label: "Categories" },
    { id: "offers", label: "Offers / Banners" },
    { id: "projects", label: "Projects" },
    { id: "reviews", label: "Reviews" },
    { id: "translations", label: "Translations" },
  ];

  if (!authenticated)
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-primary text-[10px] uppercase tracking-[0.3em]">
              La Maison Riche
            </p>
            <h1 className="font-serif text-2xl">Showroom Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`text-xs uppercase tracking-widest ${saveStatus === "error" ? "text-destructive" : saveStatus === "saving" ? "text-secondary" : "text-primary"}`}
            >
              {saveStatus === "saving"
                ? "Saving..."
                : saveStatus === "error"
                  ? "Save failed"
                  : saveStatus === "saved"
                    ? "Saved!"
                    : isLoading
                      ? "Loading..."
                      : ""}
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
            >
              <ArrowLeft size={14} /> Website
            </Link>
            <button
              onClick={() => {
                sessionStorage.removeItem("lmr-admin-auth");
                setAuthenticated(false);
              }}
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-6 py-8">
        {saveError && (
          <p className="mb-6 border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {saveError}
          </p>
        )}
        {isLoading && (
          <p className="mb-6 text-sm text-muted-foreground">
            Loading shared catalog data...
          </p>
        )}
        <nav className="flex gap-2 overflow-x-auto border-b border-border mb-10">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setTab(item.id);
                setEditing(null);
              }}
              className={`whitespace-nowrap px-4 py-3 text-xs uppercase tracking-widest border-b-2 transition-colors ${tab === item.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        {tab === "products" && (
          <AdminProducts onEdit={(product) => setEditing(product)} />
        )}
        {tab === "add" && (
          <ProductForm
            product={null}
            products={products}
            categories={categories}
            onSave={(product) => {
              updateProducts([...products, product]);
              setTab("products");
            }}
          />
        )}
        {tab === "categories" && <AdminCategories />}
        {tab === "offers" && <AdminOffers />}
        {tab === "projects" && <AdminProjects />}
        {tab === "reviews" && <AdminReviews />}
        {tab === "translations" && <AdminTranslations />}
        {editing && (
          <div className="fixed inset-0 z-50 bg-foreground/50 overflow-y-auto p-4 md:p-10">
            <div className="max-w-5xl mx-auto mt-6">
              <ProductForm
                product={editing}
                products={products}
                categories={categories}
                onCancel={() => setEditing(null)}
                onSave={(product) => {
                  updateProducts(
                    products.map((item) =>
                      item.id === product.id ? product : item,
                    ),
                  );
                  setEditing(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
