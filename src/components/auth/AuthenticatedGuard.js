import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';

export function AuthenticatedGuard({ children }) {
	const { user } = useAuthUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) navigate('/login');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	if (!user) {
		return <div>Redirecting...</div>;
	}

	return children;
}
