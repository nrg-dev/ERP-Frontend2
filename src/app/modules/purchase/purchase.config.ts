export const API_ENDPOINTS = {
  loadVendor: `/purchase/loadVendor`,
  loadPurchase: `/purchase/load`,
  getUnitPrice: `/purchase/getUnitPrice`,    
  getPurchase: `/purchase/get?id={param}`,
  save: `/purchase/save`,
  updatePurchase: `/purchase/update`,
  saveReturn: `/purchase/saveReturn`, 
  loadfilterData: `/purchase/loadfilterData`, 
  loadVendorItem: `/purchase/loadVendorItem`, 
  getVendorDetails: `/purchase/getVendorDetails?vendorname={param}`,     
  remove: `/purchase/remove?invoiceNumber={param}`,
  removePartId: `/purchase/removePartId`,  
  loadCategory: `/category/load`,
  loadCategoryName: `/category/loadCategoryName`,  
  loadItemName: `/item/loadItemName`,
  load: `/item/load`
};
