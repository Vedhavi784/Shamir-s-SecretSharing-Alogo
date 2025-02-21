const input = {
    "keys": { "n": 10, "k": 7 },
    "1": { "base": "7", "value": "420020006424065463" },
    "2": { "base": "7", "value": "10511630252064643035" },
    "3": { "base": "2", "value": "101010101001100101011100000001000111010010111101100100010" },
    "4": { "base": "8", "value": "31261003022226126015" },
    "5": { "base": "7", "value": "2564201006101516132035" },
    "6": { "base": "15", "value": "a3c97ed550c69484" },
    "7": { "base": "13", "value": "134b08c8739552a734" },
    "8": { "base": "10", "value": "23600283241050447333" },
    "9": { "base": "9", "value": "375870320616068547135" },
    "10": { "base": "6", "value": "30140555423010311322515333" }
};

function convertToDecimal(base, value) {
    return BigInt(parseInt(value, base));
}

function getXYPairs(input) {
    let pairs = [];
    for (let i = 1; i <= input.keys.n; i++) {
        if (input[i]) {
            let x = BigInt(i);
            let y = convertToDecimal(parseInt(input[i].base), input[i].value);
            pairs.push([x, y]);
        }
    }
    return pairs.slice(0, input.keys.k); // Select first 'k' pairs
}

function lagrangeInterpolation(pairs) {
    let c = BigInt(0);
    let k = pairs.length;

    for (let i = 0; i < k; i++) {
        let xi = pairs[i][0];
        let yi = pairs[i][1];
        let term = yi;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = pairs[j][0];
                term *= BigInt(-xj) * modInverse(xi - xj);
            }
        }
        c += term;
    }
    return c;
}

function modInverse(n) {
    return n < 0n ? -n : n; // Simplified inverse handling
}

const xyPairs = getXYPairs(input);
const secret = lagrangeInterpolation(xyPairs);
console.log("Secret constant (c):", secret.toString());

