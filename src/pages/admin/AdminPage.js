/* eslint-disable unicorn/consistent-function-scoping */
import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../../components/product/ProductCard';
import { GlobalDataStorage } from '../../constants';

function UserModal({ closeModal, email }) {
    const storage = useContext(GlobalDataStorage);

    const user = storage.users.get(String(email));

    const userCart = useMemo(() => storage.cart.adminLoadFromLocalStorage(user?.email), [user?.email, storage.cart]);

    if (!user) {
        console.error('User not found');
        closeModal()
        return null;
    }

    return (
        <div
            className='shadow border rounded p-4 border-dark-subtle'
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '40px',
                width: '80%',
                height: '80%',
                overflow: 'scroll',
            }}
        >
            <h2>All User Details</h2>
            <div className="d-flex flex-wrap justify-content-center gap-3">
                {[...userCart.values()].map((product) => {
                    const onChange = (toEditProduct, quantity) => {
                        storage.cart.adminUpdateProductQuantity(user.email, toEditProduct.id, quantity);
                    }

                    const onRemove = (toEditProduct) => {
                        storage.cart.adminRemoveProduct(user.email, toEditProduct.id);
                    }

                    return <ProductCard key={product.id} onChange={onChange} onRemove={onRemove} product={product} />;
                })}
            </div>
            <button onClick={closeModal} type="button">
                Close
            </button>
        </div>
    );
}

export default function AdminPage() {
    const { t } = useTranslation();
    const storage = useContext(GlobalDataStorage);
    const [modalOpen, setModalOpen] = useState('');

    const users = [...storage.users.values()];

    return (
        <div className="container p-3">
            <h2 className='w-100 mx-auto py-2'>{t('admin.title')}</h2>
            <table className='w-100'>
                <thead>
                    <tr>
                        <th>{t('admin.table.name')}</th>
                        <th>{t('admin.table.email')}</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {users.map(({ id, firstName, lastName, email }) => (
                        <tr key={id}>
                            <td>
                                {firstName} {lastName}
                            </td>
                            <td>{email}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        console.log('Open cart for user', id);
                                        setModalOpen(email);
                                    }}
                                    type="button"
                                >
                                    {t('admin.table.open_cart')}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalOpen && <UserModal closeModal={() => setModalOpen('')} email={modalOpen} />}
        </div>
    );
}
