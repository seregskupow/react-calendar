import { FC, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HeaderContainer, HeaderContainerCell, YearLabel } from './Header.styled';
import { calendarSelector, useActions, useAppSelector } from '@/store';
import { createFileName, useScreenshot } from '@/hooks/useScreenshot';

import { BsArrowCounterclockwise } from 'react-icons/bs';
import { Button } from '@/components/UI/Button.styled';
import { TbPhoto } from 'react-icons/tb';
import dayjs from 'dayjs';
import { getCurrentYear } from '@/utils/date';

interface HeaderProps {
	calendarRef: { current: any };
}

const Header: FC<HeaderProps> = ({ calendarRef }) => {
	const { nextMonth, prevMonth, setCurrentMonth, getWorlwideHolidays } = useActions();
	const { monthIndex, holidays, currentYear } = useAppSelector(calendarSelector);

	const [image, takeScreenShot] = useScreenshot({
		type: 'image/jpeg',
		quality: 1.0,
	});

	const download = (image: any, { name = 'img', extension = 'jpg' } = {}) => {
		const a = document.createElement('a');
		a.href = image;
		a.download = createFileName(extension, name);
		a.click();
	};

	useEffect(() => {
		getWorlwideHolidays(currentYear);
	}, [currentYear]);

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
