// fakeend_helper
// export const getAllVendorActivity=(id)=>{
//   return api.get(url.GET_ALL_VENDOR_ACTIVITY  + `/`+id)
// }
// export const getAllCustomerActivity=(id)=>{
//   return api.get(url.GET_ALL_ACTIVITY  + `/`+id)
// }

// url_helper
// export const GET_ALL_ACTIVITY = "/api/user-activity/view";
// export const GET_ALL_VENDOR_ACTIVITY = "api/vendor-activity/view"


// reducer.js
//     builder.addCase(getAllVendorActivity.fulfilled, (state, action) => {
//       state.vendorActivity = action.payload.data;
//     });
//     builder.addCase(getAllVendorActivity.rejected, (state, action) => {
//       state.error = action.payload.error || null;
//     });
    
//         builder.addCase(getAllCustomerActivity.fulfilled, (state, action) => {
//       state.customerActivity = action.payload.data;
//     });
//     builder.addCase(getAllCustomerActivity.rejected, (state, action) => {
//       state.error = action.payload.error || null;
//     });
    
    
// thunk.js
//   getAllCustomerActivity as getAllCustomerActivityApi,
//   getAllVendorActivity as getAllVendorActivityApi,
  
  
// export const  getAllVendorActivity = createAsyncThunk(
//   "ecommerce/getAllVendorActivity",
//   async (id) => {
//     try {
//       const response = getAllVendorActivityApi(id);
//       return response;
//     } catch (error) {
//       return error;
//     }
//   }
  
    
// );

// export const  getAllCustomerActivity = createAsyncThunk(
//   "ecommerce/getAllCustomerActivity",
//   async (id) => {
//     try {
//       const response = getAllCustomerActivityApi(id);
//       return response;
//     } catch (error) {
//       return error;
//     }
//   }
// );

// vendorFlow.jsx
// getAllVendorActivity as onGetActivityData
//   const [vendoractivityList, setVendoractivityList] = useState([]);
  
//     const activityData = createSelector(
//     (state) => state.Ecommerce.vendorActivity,
//     (vendorActivity) => vendorActivity
    
//       const acivityData = useSelector(activityData);

//   );
  
//     useEffect(()=>{
//     setVendoractivityList(acivityData)
//   },[acivityData])
  
//   useEffect(()=>{
//   dispatch(onGetActivityData(id))
// },[dispatch])

// CustomerOverView.jsx
// getAllCustomerActivity as onGetActivityData
//   const [activityList, setActivityLlist] = useState([]);
  
//     const activity = createSelector(
//     (state) => state.Ecommerce.customerActivity,
//     (customerActivity)=> customerActivity
//   );
  
//     const totalactivity = useSelector(activity)
    
//     useEffect(()=>{
//   dispatch(onGetActivityData(id))
// },[dispatch])

// useEffect(()=>{
//   setActivityLlist(totalactivity)
// },[totalactivity])




    
