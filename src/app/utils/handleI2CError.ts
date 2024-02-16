export const handleI2CError = (err: Error) => {
    if (err) {
      console.log("Error writing to I2C bus: ", err);
    }
}