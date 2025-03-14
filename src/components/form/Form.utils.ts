export const debounce = (fn: Function, delay: number) => {
	let timeoutId: NodeJS.Timeout;
	return (...args: any[]) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};
};



export const formatDate = (opts: {
	dateString: string, customFormat?: string, displayFormat?: string
}
): string => {
	if (!opts.dateString) return '';

	try {
		const date = new Date(opts.dateString);

		if (opts.customFormat) {
			let formatted = opts.customFormat;
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');

			formatted = formatted.replace('yyyy', year.toString());
			formatted = formatted.replace('mm', month);
			formatted = formatted.replace('dd', day);

			return formatted;
		}

		switch (opts.displayFormat) {
			case 'yyyy-mm-dd':
				return opts.dateString;
			case 'dd/mm/yyyy':
				return date.toLocaleDateString('en-GB');
			case 'mm/dd/yyyy':
				return date.toLocaleDateString('en-US');
			case 'dd-mm-yyyy':
				return date.toLocaleDateString('en-GB').replace(/\//g, '-');
			case 'mm-dd-yyyy':
				return date.toLocaleDateString('en-US').replace(/\//g, '-');
			case 'long':
				return date.toLocaleDateString(undefined, {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				});
			case 'abbr':
				return date.toLocaleDateString(undefined, {
					weekday: 'short',
					year: 'numeric',
					month: 'short',
					day: 'numeric',
				});
			case 'short':
				return date.toLocaleDateString(undefined, {
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				});
			case 'medium':
				return date.toLocaleDateString(undefined, {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				});
			default:
				return date.toLocaleDateString();
		}
	}
	catch {
		return opts.dateString;
	}
};
