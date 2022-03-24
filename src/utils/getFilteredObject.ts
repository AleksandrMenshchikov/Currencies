function getFilteredObject(obj: any, key: string) {
  const newObj: any = {};
  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      if (
        k.toUpperCase().includes(key.toUpperCase()) ||
        obj[k].Name.toUpperCase().includes(key.toUpperCase())
      ) {
        newObj[k] = obj[k];
      } 
    }
  }
  return newObj;
}

export default getFilteredObject;
