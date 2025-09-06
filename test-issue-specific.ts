import { verifyIranianNationalId, getPlaceByIranNationalId } from "./src";

// Test the specific national ID from the issue
const problemId = "2540201288";

console.log("Testing national ID:", problemId);
console.log("verifyIranianNationalId result:", verifyIranianNationalId(problemId));
console.log("getPlaceByIranNationalId result:", getPlaceByIranNationalId(problemId));

// Let's also verify manually with checksum calculation
function manualChecksumVerification(nationalId: string): boolean {
    if (nationalId.length !== 10) return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        const digit = parseInt(nationalId.charAt(i), 10);
        sum += digit * (10 - i);
    }
    
    const remainder = sum % 11;
    const checkDigit = parseInt(nationalId.charAt(9), 10);
    
    console.log(`Manual checksum for ${nationalId}:`);
    console.log(`Sum: ${sum}, Remainder: ${remainder}, Check digit: ${checkDigit}`);
    
    return (remainder < 2 && checkDigit === remainder) || (remainder >= 2 && checkDigit === 11 - remainder);
}

console.log("Manual checksum verification:", manualChecksumVerification(problemId));