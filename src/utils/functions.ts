function keyBy(data: Array<Object>, key: string) {
  const map = new Map();

  data.map(item => {
    map.set(item[key], item);
  });

  return map;
}

function groupBy(data: Array<Object>, key: string) {
  const groups = {};

  for (const item of data) {
    let groupKey = item[key];

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(item);
  }

  return groups;
}

export {
  keyBy,
  groupBy
}
