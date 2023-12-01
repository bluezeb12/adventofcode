import {readFileAsArray} from '../helpers/util';

const getCalibrationValue = (line) => {
    const re = /\d/g
    const nums = re.exec(line);
    return '' + nums[0] + nums[nums.length - 1];
}

(await () => {
    const input = await readFileAsArray('inputs/1-1.txt');
    const calibrationValues = input.map(getCalibrationValue);
    console.log(calibrationValues.reduce((a, c) => a+c));
})();
