export interface Holiday {
	date: string;
	localName: string;
	name: string;
	countryCode: string;
	fixed: boolean;
	global: boolean;
	counties: boolean;
	launchYear: number;
	types: HolidayType[];
}

enum HolidayType {
	Public = 'Public',
	Bank = 'Bank',
	School = 'School',
	Authorities = 'Authorities',
	Optional = 'Optional',
	Observance = 'Observance',
}
