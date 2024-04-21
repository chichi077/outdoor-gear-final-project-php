import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../components/product/ProductCard';
import { GlobalDataStorage } from '../constants';

export function CartPage() {
  const { t } = useTranslation();
  const storage = useContext(GlobalDataStorage)

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center gap-3 p-4">
        <h1

        >
          {t('cart.title')}
        </h1>

        <h1>
          {t('cart.total', {
            total: storage.cart.getTotal(),
          })}
        </h1>
      </div>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {storage?.cart?.getCartProducts()?.length > 0 && storage?.cart?.getCartProducts().map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}