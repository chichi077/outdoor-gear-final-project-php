import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';

export function AdminGuard({ children }) {
	const { user } = useAuthUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (user && !user?.isAdmin) navigate('/');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	if (!user || !user.isAdmin) {
		return <div>Redirecting...</div>;
	}

	return children;
}
