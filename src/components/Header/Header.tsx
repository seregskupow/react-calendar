import dayjs from 'dayjs';
import { FC } from 'react';
import { Button } from '@/components/UI/Button.styled';
import { HeaderContainer, YearLabel } from './Header.styled';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { BsArrowCounterclockwise } from 'react-icons/bs';
import { calendarSelector, useActions, useAppSelector } from '@/store';

interface HeaderProps {}

const Header: FC = () => {
	const { nextMonth, prevMonth, setCurrentMonth } = useActions();
	const { monthIndex } = useAppSelector(calendarSelector);

	return (
		<HeaderContainer>
			<Button onClick={() => setCurrentMonth()}>
				Today <BsArrowCounterclockwise />
			</Button>
			<Button onClick={() => prevMonth()}>
				<FaChevronLeft />
			</Button>
			<YearLabel>{dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}</YearLabel>
			<Button onClick={() => nextMonth()}>
				<FaChevronRight />
			</Button>
		</HeaderContainer>
	);
};

export default Header;
