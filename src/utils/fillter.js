const fillterMessageList = (arr, userName) => {
  return arr.map((item) => {
    if (item.userName === userName) {
      return {
        ...item,
        isMsgMe: true,
      };
    }
    return item;
  });
};

export { fillterMessageList };
