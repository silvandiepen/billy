
export const formatCurrency = (
    number: number | bigint,
    options: {
        currency: string,
        locale?: string,
    } = {
            currency: 'EUR',
            locale: 'nl-NL'
        }
) => {
    return new Intl.NumberFormat(options.locale, {
        style: "currency",
        currency: options.currency.toUpperCase(),
    }).format(number);
}


export const numberToWords = (num: number): string => {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const thousands = ['', 'thousand'];

    if (num === 0) return 'zero';

    let words = [];

    for (let i = 0; num > 0; i++) {
        let tempNum = num % 100;
        if (tempNum > 10 && tempNum < 20) {
            words.push(teens[tempNum - 11]);
        } else {
            if (tempNum % 10 > 0) {
                words.push(ones[tempNum % 10]);
            }
            if (Math.floor(tempNum / 10) > 0) {
                words.push(tens[Math.floor(tempNum / 10)]);
            }
        }
        num = Math.floor(num / 100);
        if (num % 10 > 0) {
            words.push(ones[num % 10] + ' hundred');
            num = Math.floor(num / 10);
        }
        if (num > 0) {
            words.push(thousands[i]);
        }
    }
    return words.reverse().join(' ');
}