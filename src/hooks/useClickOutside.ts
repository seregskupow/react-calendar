import { RefObject, useEffect, useState } from 'react';

export const useClickOutside = (ref: RefObject<any>): boolean => {
	const [clickOutside, setClickOutside] = useState(false);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target)) {
				setClickOutside(true);
			} else setClickOutside(false);
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);

	return clickOutside;
};
