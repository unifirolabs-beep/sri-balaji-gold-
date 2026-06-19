import ProductDetailsClient from "./ProductDetailsClient";
import { PRODUCT_SLUG_MAP } from "@/app/products-data";

export async function generateStaticParams() {
  return Object.keys(PRODUCT_SLUG_MAP).map((slug) => ({
    slug: slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetailsClient slug={slug} />;
}
