export const calculateMaleBFP = (waist: number, neck: number, height: number): number => {
    // Calculate the logarithms
    const logWaistNeck = Math.log10(waist - neck);
    const logHeight = Math.log10(height);

    // Calculate the denominator part of the formula
    const denominator = 1.0324 - 0.19077 * logWaistNeck + 0.15456 * logHeight;

    // Calculate the BFP
    const BFP = 495 / denominator - 450;

    return BFP;
}

export const calculateFemaleBFP = (waist: number, hip: number, neck: number, height: number): number => {
    // Calculate the logarithms
    const logWaistHipNeck = Math.log10(waist + hip - neck);
    const logHeight = Math.log10(height);

    // Calculate the denominator part of the formula
    const denominator = 1.29579 - 0.35004 * logWaistHipNeck + 0.22100 * logHeight;

    // Calculate the BFP
    const BFP = 495 / denominator - 450;

    return BFP;
}