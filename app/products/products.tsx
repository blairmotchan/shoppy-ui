import getProducts from "./actions/get-products";
import Grid2 from "@mui/material/Unstable_Grid2";
import Product from "./product";
export default async function Products() {
  const products = await getProducts();

  return (
    <Grid2 container spacing={3}>
      {products.map((product) => (
        <Grid2 key={product.id} sm={6} lg={4} xs={12}>
          <Product product={product} />
        </Grid2>
      ))}
    </Grid2>
  );
}
