function parseYAML(yaml) {
    let result = [];
    let tempResult = {};
    let lineYAML = yaml.split('\r\n');
    lineYAML.pop();
    let key = 0;
    for (let i = 0; i < lineYAML.length; i++) {
        lineYAML[i] = lineYAML[i].split(':');
        if (lineYAML[i][1] === '') {
            if (key !== 0) {
                result[key - 1] = tempResult;
            }
            result[key] = {};
            tempResult = {};
            key = key + 1;
        } else {
            tempResult[lineYAML[i][0].trim()] = lineYAML[i][1].trim();
        }

    }
    if (key > 0)
        result[key - 1] = tempResult;
    return result;
}

console.log(parseYAML(`---
- id: 0
  question: bvbvnv
  theme: Element HTML
  answer: 'True'
  date: 14.01.2022 16:00:46
- id: 1
  question: hgfjgjghj
  theme: Unit Test
  answer: 'True'
  date: 14.01.2022 16:06:04`))