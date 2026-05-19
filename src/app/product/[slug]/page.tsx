import Link from "next/link";
import { products } from "../../../data/products";

function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find(
    (p) => createSlug(p.name) === slug || p.id === slug
  );

  if (!product) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Product not found</h1>
        <Link href="/">Back to deals</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <Link href="/">← Back to DealRadar Canada</Link>

      <div style={{ marginTop: "30px" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            maxHeight: "420px",
            objectFit: "cover",
            borderRadius: "20px",
            marginBottom: "30px",
          }}
        />

        <p>{product.category}</p>
        <h1>{product.name}</h1>

        <h2>
          {product.price}{" "}
          <span style={{ textDecoration: "line-through", opacity: 0.6 }}>
            {product.oldPrice}
          </span>
        </h2>

        <p>Deal Score: {product.dealScore}/100</p>
        <p>Discount: -{product.discountPercent}%</p>
        <p>Store: {product.store}</p>
        <p>Network: {product.affiliateNetwork}</p>

        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer sponsored"
          style={{
            display: "inline-block",
            marginTop: "25px",
            padding: "16px 28px",
            background: "#0066ff",
            color: "white",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          View Deal on {product.store}
        </a>
      </div>
    </main>
  );
}