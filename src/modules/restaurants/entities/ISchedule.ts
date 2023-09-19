interface IDay {
	start: string;
	end: string;
}

interface ISchedule {
	sun: IDay;
	mon: IDay;
	tue: IDay;
	wed: IDay;
	thu: IDay;
	fri: IDay;
	sat: IDay;
}

export { ISchedule };
