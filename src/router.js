import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AdminGuard } from './components/auth/AdminGuard';
import { AuthenticatedGuard } from './components/auth/AuthenticatedGuard';
import { UnAuthenticatedGuard } from './components/auth/UnAuthenticatedGuard';
import { LayoutWrapper } from './components/layout/LayoutWrapper';
import { CartPage } from './pages/Cart';
import { HomePage } from './pages/Home';
import { InteractiveGearExplorer } from './pages/InteractiveGearExplorer';
import Login from './pages/Login';
import ProductsComponent from './pages/Productscomponent';
import Environmental from './pages/about/Environmental';
import AdminPage from './pages/admin/AdminPage';
import { UserRegisterPage } from './pages/admin/UserRegister';
import { ProductPage } from './pages/product/Page';
import { ProductRegisterPage } from './pages/product/Register';


export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<LayoutWrapper titleKey="pages.home">
				<HomePage />
			</LayoutWrapper>
		),
	},
	{
		path: '/products/:id',
		element: (
			<LayoutWrapper titleKey="pages.products">
				<ProductPage />
			</LayoutWrapper>
		),
	},
	{
		path: '/products',
		element: (
			<LayoutWrapper titleKey="pages.products">
				<ProductsComponent />
			</LayoutWrapper>
		),
	},
	{
		path: '/interactive',
		element: (
			<LayoutWrapper titleKey="pages.interactive">
				<InteractiveGearExplorer />
			</LayoutWrapper>
		),
	},
	{
		path: '/environmental',
		element: (
			<LayoutWrapper titleKey="pages.environmental">
				<Environmental />
			</LayoutWrapper>
		)
	},
	{
		path: '/admin',
		element: (
			<AdminGuard>
				<LayoutWrapper titleKey="pages.admin">
					<AdminPage />
				</LayoutWrapper>
			</AdminGuard >
		),
	},
	{
		path: '/register',
		element: (
			<AdminGuard>
				<LayoutWrapper titleKey="Product Registration Form">
					<ProductRegisterPage />
				</LayoutWrapper>
			</AdminGuard >
		),
	},
	{
		path: '/userRegister',
		element: (
			// <AdminGuard>
			// 	<LayoutWrapper titleKey="pages.register">
			// 		<ProductRegisterPage />
			// 	</LayoutWrapper>
			// </AdminGuard >

			<LayoutWrapper titleKey="User Registration Form">
				<UserRegisterPage />
			</LayoutWrapper>
		),
	},
	{
		path: '/login',
		element: (
			<UnAuthenticatedGuard>
				<LayoutWrapper titleKey="pages.login">
					<Login />
				</LayoutWrapper>
			</UnAuthenticatedGuard>
		),
	},
	{
		path: '/cart',
		element: (
			<AuthenticatedGuard>
				<LayoutWrapper titleKey="pages.cart">
					<CartPage />
				</LayoutWrapper>
			</AuthenticatedGuard>
		),
	}
]);
