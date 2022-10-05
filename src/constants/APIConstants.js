/// Description ///
// This will hold the constsnts associated with the API 
// ** WIll need to be updated when API for testing locally setup****
///API Name
const prodAPIName = "stockapi"
const localapi = "localapi"
export const APIName = process.env.NODE_ENV === 'development' ? localapi : prodAPIName