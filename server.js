import axios from 'axios';
import { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const APP_URL = import.meta.env.VITE_API_URL;

const initialState = {
	isLoading: false,
	error: null,
};

const ACTIONS = {
	SET_LOADING: 'SET_LOADING',
	SET_ERROR: 'SET_ERROR',
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case ACTIONS.SET_LOADING:
			return { ...state, isLoading: payload };
		case ACTIONS.SET_ERROR:
			return { ...state, error: payload };
		default:
			return state;
	}
};

export const useLogout = () => {
	const [state, dispatchLocal] = useReducer(reducer, initialState);
	const dispatch = useDispatch();

	const logoutHandler = async () => {
		dispatchLocal({ type: ACTIONS.SET_LOADING, payload: true });

		try {
			await axios.post(`${APP_URL}/api/logout`, {}, { withCredentials: true });

			dispatch(logout());
		} catch (error) {
			dispatchLocal({
				type: ACTIONS.SET_ERROR,
				payload: error.response?.data?.message || 'Logout failed',
			});
		} finally {
			dispatchLocal({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	return { logoutHandler, ...state };
};
