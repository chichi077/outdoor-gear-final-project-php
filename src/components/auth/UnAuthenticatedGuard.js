import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';

export function UnAuthenticatedGuard({ children }) {
	const { user } = useAuthUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate('/');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	if (user) {
		return <div>Redirecting...</div>;
	}

	return children;
}
