const { entireFileAsString } = require('./helpers/util');

const checkThatPassportContainsAllRequiredFields = (passport, required) => 
    Object.keys(required).every(field => 
         Object.keys(passport).includes(required[field])
    );

const createPassport = (data) => {
    const pieces = data.split(/\s/gm);
    const result = {};
    pieces.map(x => {
        if( x === '' ) {
            return;
        }
        const split = x.split(':');
        return result[split[0]] = split[1];
    }).filter(x => x !== undefined);
    return result;
};

const eyeColors = [
    'amb', 'blu', 'brn', 'gry', 'grn','hzl','oth'
];

const heightValidator = (x) => {
    const validFormat = /\d*(cm|in)/gm.test(x);
    if(!validFormat) return false;
    const matches = /(\d*)(cm|in)/gm.exec(x);
    return (
        (matches[2] === 'cm' && matches[1] >= 150 && matches[1] <= 193) ||
        (matches[2] === 'in' && matches[1] >= 59 && matches[1] <= 76)
    )
};

/*
byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
*/

const validators = {
    byr: (x) => /\d{4}/gm && x >= 1920 && x <= 2002,
    iyr: (x) => /\d{4}/gm && x >= 2010 && x <= 2020,
    eyr: (x) => /\d{4}/gm && x >= 2020 && x <= 2030,
    hgt: heightValidator,
    hcl: (x) => /#[\da-f]{6}/gm.test(x),
    ecl: (x) => eyeColors.includes(x),
    pid: (x) => /\d{9}/gm.test(x)
};

const validateField = (value, validator) => validator(value);

logValidatePassport = (passport, requiredFields) => {
    const overall = Object.values(requiredFields).every(val => {

        const isValid = validateField(passport[val], validators[val])
        //console.log(val, passport[val], isValid);
        return isValid;
    });
    console.log(`${JSON.stringify(passport)} is validOverall: ${overall}`)
    return overall
}

validatePassport = (passport, requiredFields) => 
    Object.values(requiredFields).every(val => 
        validateField(passport[val], validators[val]))


const removeAllNewLines = (data) => data.replace('\r\n', ' ');

(async () => {
    const requiredFields = {
        BIRTHYEAR: 'byr',
        ISSUE: 'iyr',
        EXPIRATION: 'eyr',
        HEIGHT: 'hgt',
        HAIR_COLOR: 'hcl',
        EYE_COLOR: 'ecl',
        PASSPORT_ID: 'pid',
    };
    const file = await entireFileAsString('./inputs/day4.input.txt');
    const arr = file.split('\r\n\r\n');
    const passports = arr.map(x => createPassport(removeAllNewLines(x)));
    const countOfValidPassports = passports.reduce((count, passport) => {
        return count + (checkThatPassportContainsAllRequiredFields(passport, requiredFields) ? 1 : 0)
    }
    , 0);
    console.log(countOfValidPassports);

    const validPassports = passports.filter(passport => {
        return checkThatPassportContainsAllRequiredFields(passport, requiredFields);
    });

    const completelyValidPassports = validPassports.reduce((count, passport) => 
        count + (logValidatePassport(passport, requiredFields) ? 1 : 0)
    , 0);
    console.log(completelyValidPassports);
})().catch(ex => {
    console.log(ex);
})

//createPassport()