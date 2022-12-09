import dayjs from 'dayjs';
import { FC, useEffect } from 'react';
import { Button } from '@/components/UI/Button.styled';
import { HeaderContainer, HeaderContainerCell, YearLabel } from './Header.styled';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TbPhoto } from 'react-icons/tb';

import { BsArrowCounterclockwise } from 'react-icons/bs';
import { calendarSelector, useActions, useAppSelector } from '@/store';
import { useScreenshot, createFileName } from 'use-react-screenshot';

interface HeaderProps {
	calendarRef: { current: any };
}

const Header: FC<HeaderProps> = ({ calendarRef }) => {
	const { nextMonth, prevMonth, setCurrentMonth, getYearHolidays } = useActions();
	const { monthIndex, holidays } = useAppSelector(calendarSelector);

	const [image, takeScreenShot] = useScreenshot({
		type: 'image/jpeg',
		quality: 1.0,
	});

	// useEffect(() => {
	// 	console.log({ holidays });
	// }, [holidays]);

	// useEffect(() => {
	// 	getYearHolidays(2022);
	// }, []);

	const download = (image: any, { name = 'img', extension = 'jpg' } = {}) => {
		const a = document.createElement('a');
		a.href = image;
		a.download = createFileName(extension, name);
		a.click();
	};

	//Todo: remove box shadow when taking screenshot
	const downloadScreenshot = () => calendarRef.current && takeScreenShot(calendarRef.current).then(download);

	return (
		<HeaderContainer>
			<HeaderContainerCell>
				<Button onClick={() => setCurrentMonth()}>
					Today <BsArrowCounterclockwise />
				</Button>
			</HeaderContainerCell>
			<HeaderContainerCell>
				<Button onClick={() => prevMonth()}>
					<FaChevronLeft />
				</Button>
				<YearLabel>{dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}</YearLabel>
				<Button onClick={() => nextMonth()}>
					<FaChevronRight />
				</Button>
			</HeaderContainerCell>
			<HeaderContainerCell>
				{' '}
				<Button onClick={() => downloadScreenshot()}>
					Screenshot <TbPhoto />
				</Button>
			</HeaderContainerCell>
		</HeaderContainer>
	);
};

export default Header;
