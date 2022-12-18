import { ChangeEvent, FC, Fragment, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HeaderContainer, HeaderContainerCell, YearLabel } from './Header.styled';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { calendarSelector, tasksSelector, useActions, useAppSelector } from '@/store';
import { createFileName, useScreenshot } from '@/hooks/useScreenshot';

import Ajv from 'ajv';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { Button } from '@/components/UI/Button.styled';
import { DayTasks } from '@/models';
import { TasksValidationSchema } from '@/utils/tasks.schema';
import { TbPhoto } from 'react-icons/tb';
import { checkJSONExtention } from '@/utils';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

interface HeaderProps {
	calendarRef: { current: any };
}

const Header: FC<HeaderProps> = ({ calendarRef }) => {
	const ajv = new Ajv();
	const validator = ajv.compile(TasksValidationSchema);

	const { nextMonth, prevMonth, setCurrentMonth, getWorlwideHolidays, setTasks } = useActions();
	const { monthIndex, currentYear } = useAppSelector(calendarSelector);
	const { tasks } = useAppSelector(tasksSelector);

	const inputRef = useRef<HTMLInputElement>(null);

	const [image, takeScreenShot] = useScreenshot({
		type: 'image/jpeg',
		quality: 1.0,
	});

	const downloadCalendarScreenshot = (image: any, { name = 'img', extension = 'jpg' } = {}) => {
		const a: HTMLAnchorElement = document.createElement('a');
		a.href = image;
		a.download = createFileName(extension, name);
		a.click();
		a.remove();
	};

	const downloadASJSON = () => {
		const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks));
		const a: HTMLAnchorElement = document.createElement('a');
		a.href = dataStr;
		a.download = `react-calendar.json`;
		a.click();
		a.remove();
	};

	const triggerInput = () => {
		inputRef?.current?.click();
	};

	const importCalendar = (e: ChangeEvent<HTMLInputElement>) => {
		const fileInput = e.target;
		if (!fileInput.files?.length) return;

		const file = fileInput.files[0];

		if (!checkJSONExtention(file.name)) {
			toast('Imported file should have .json extention', { type: 'warning', className: 'toast-message' });
			return;
		}

		const reader = new FileReader();

		reader.onload = (e: ProgressEvent<FileReader>) => {
			try {
				const data = JSON.parse(e.target?.result as string);

				//Validate uploaded JSON
				if (validator(data)) {
					setTasks(data as DayTasks);
					fileInput.value = '';
				} else {
					toast('Imported JSON is wrong format or empty', { type: 'error', className: 'toast-message' });
				}
			} catch (e) {
				toast('Imported file is invalid', { type: 'error', className: 'toast-message' });
			}
		};

		reader.readAsText(file);
	};

	useEffect(() => {
		getWorlwideHolidays(currentYear);
	}, [currentYear]);

	//Todo: remove box shadow when taking screenshot
	const downloadScreenshot = () => {
		calendarRef.current && takeScreenShot(calendarRef.current).then(downloadCalendarScreenshot);
	};

	return (
		<Fragment>
			<input type="file" hidden accept=".json" ref={inputRef} onChange={importCalendar} />
			<HeaderContainer>
				<HeaderContainerCell>
					<Button onClick={triggerInput}>
						Import <HiUpload />
					</Button>
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
					<Button onClick={downloadScreenshot}>
						Screenshot <TbPhoto />
					</Button>
					<Button onClick={downloadASJSON}>
						Download <HiDownload />
					</Button>
				</HeaderContainerCell>
			</HeaderContainer>
		</Fragment>
	);
};

export default Header;
