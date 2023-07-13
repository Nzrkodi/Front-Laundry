export default{
  getRange(meta){
    let page = meta.page || 1;
    let limit = meta.limit || 10;
  
    let start = (page - 1) * limit + 1;
    let end = start + limit - 1;
  
    return {
      start: start,
      end: end
    };
  },
  getNumber(index, meta){
    const range = this.getRange(meta);
	  return range.start + index;
  }
}