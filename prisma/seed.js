/**
 * Seed – 2–3 exempelprodukter med bilder (Unsplash, fri användning).
 * Kör: npx prisma db seed (eller node prisma/seed.js efter db push)
 */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categories = [
  { name: "Dirac", slug: "dirac", description: "Somaliska dirac – vardag och fest" },
  { name: "Baatis", slug: "baatis", description: "Baatis och traditionella plagg" },
  { name: "Unsi", slug: "unsi", description: "Rökelse, dofter och tillbehör" },
];

const products = [
  {
    name: "Dirac – färgstark",
    slug: "dirac-fargstark",
    description: "Klassiskt dirac i starka färger, bekvämt och snyggt för vardag och tillfällen.",
    priceCents: 34900,
    categorySlug: "dirac",
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
  },
  {
    name: "Baatis – enkel modell",
    slug: "baatis-enkel",
    description: "Enkel och snygg baatis, lätt att kombinera. Tillgänglig i flera färger.",
    priceCents: 27900,
    categorySlug: "baatis",
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
  },
  {
    name: "Unsi – naturrökelse",
    slug: "unsi-naturrokelse",
    description: "Äkta unsi (rökelse) för hemmet. Varm, behaglig doft.",
    priceCents: 12900,
    categorySlug: "unsi",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
  },
];

async function main() {
  const created = {};
  for (const c of categories) {
    created[c.slug] = await prisma.category.upsert({
      where: { slug: c.slug },
      create: c,
      update: { name: c.name, description: c.description },
    });
  }
  for (const p of products) {
    const cat = created[p.categorySlug];
    await prisma.product.upsert({
      where: { slug: p.slug },
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        priceCents: p.priceCents,
        imageUrl: p.imageUrl,
        categoryId: cat.id,
      },
      update: {
        name: p.name,
        description: p.description,
        priceCents: p.priceCents,
        imageUrl: p.imageUrl,
      },
    });
  }
  console.log("Seed klar: kategorier och 3 produkter skapade/uppdaterade.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
