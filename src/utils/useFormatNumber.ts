const useFormatNumber = (num: number) => {
  let formattedNum;
  // console.log(num)
  if (num !== 0) {
    formattedNum = num?.toLocaleString("id-ID");
  } else {
    formattedNum = "";
  }

  return formattedNum;
};

export default useFormatNumber;
