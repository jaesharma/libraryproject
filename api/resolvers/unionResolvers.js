export default {
  users: {
    __resolveType: (obj, context, info) => {
      return obj.userType;
    },
    // opinion: {
    //   __resolveType(obj, context, info){

    //   }
    // }
  },
};
