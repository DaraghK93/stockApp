/// Description ///
// This will hold the constsnts associated with the API 


/// API Name 
const prodAPIName = "stockapi"
const localapi    =  "stockapi"

export const APIName = process.env.NODE_ENV === 'development' ? localapi : prodAPIName;