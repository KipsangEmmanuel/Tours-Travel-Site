const parser = (result: any, single: boolean): any => {
  let key: any = result.recordset[0];
  let values: any = Object.values(key)[0];

  if (!values) {
    throw new Error("no results found");
  }

  if (single) {
    return JSON.parse(values)[0];
  }

  return JSON.parse(values);
};

export default parser;
