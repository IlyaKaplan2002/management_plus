import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ProductTableRaw from 'modules/products/components/ProductTableRaw';
import { ProductData } from 'modules/projects/components/steps/SecondStep';
import { Product } from 'store/products/products.types';

interface ProductTableProps {
  products: (ProductData | Product)[];
  onDelete: (id: string) => void;
  onEdit: (data: ProductData | Product) => void;
  maxHeight?: number;
}

const ProductsTable = ({
  products,
  onDelete,
  onEdit,
  maxHeight,
}: ProductTableProps) => {
  return (
    <TableContainer sx={{ maxHeight: maxHeight || 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Cost</TableCell>
            <TableCell align="left" sx={{ width: 20 }} />
            <TableCell align="left" sx={{ width: 20 }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => {
            return (
              <ProductTableRaw
                key={product.id}
                product={product}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
