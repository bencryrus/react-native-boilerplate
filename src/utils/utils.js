import { EJSON, ObjectId } from 'bson';

export const objectId = () => {
    return EJSON.deserialize(new ObjectId())
}

export const hexToRGB = (hex, alpha) => {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

export const isValidNumber = (input, type = "decimal") => {
    // Check if the input is a string
    if (typeof input !== "string") return false;
  
    // Regular expressions for integers and decimals
    const integerRegex = /^-?\d+$/; // Matches integers (e.g., "123", "-123")
    const decimalRegex = /^-?(\d+\.\d*|\.\d+)$/; // Matches decimals (e.g., "123.45", "-123.45")
  
    // Check based on the type parameter
    if(input === '') { return true }
    if (type === "integer") {
        return integerRegex.test(input);
    } else if (type === "decimal") {

        return integerRegex.test(input) || decimalRegex.test(input);
    } else {
        throw new Error('Invalid type parameter. Use "integer", "decimal", or "both".');
    }
};
