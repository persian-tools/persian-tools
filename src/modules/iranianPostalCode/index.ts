
/**
 * iranianPostalCodeValidate
 *
 * @description Takes a postal code and validate with return a boolean.
 *
 *
 * @param postalCode as string
 * @return if postal code is valid return true , but if postal code is not valid return false
 */
const iranianPostalCodeValidate = (postalCode: string = ""): boolean => {
    const pc = postalCode.toString();
    if (/\D/g.test(pc)) return false;
  
    return (
      pc.length === 10 &&
      !pc.slice(0, 5).includes("2") &&
      !pc.slice(0, 5).includes("0") &&
      pc[4] !== "5" &&
      pc[5] !== "0" &&
      pc.slice(-4) !== "0000" &&
      !pc.split("").every((char) => char === pc[0])
    );
}


export default iranianPostalCodeValidate