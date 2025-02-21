const fs = require('fs');

// Function to decode y values from different bases
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

// Function to read and parse JSON file
function readJSONFile(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
}

// Function to perform Lagrange interpolation to find the constant term c
function lagrangeInterpolation(points) {
    let c = 0;
    for (let i = 0; i < points.length; i++) {
        let [x_i, y_i] = points[i];
        let term = y_i;
        
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let [x_j, _] = points[j];
                term *= -x_j / (x_i - x_j);
            }
        }
        c += term;
    }
    return Math.round(c); // Round to nearest integer
}

// Main function
function findSecretConstant(filename) {
    const data = readJSONFile(filename);
    const { n, k } = data.keys; // Number of roots and required minimum
    let points = [];

    // Extract and decode the roots
    Object.keys(data).forEach(key => {
        if (key !== "keys") {
            const x = parseInt(key);
            const y = decodeValue(data[key].base, data[key].value);
            points.push([x, y]);
        }
    });

    // Sort points based on x values
    points.sort((a, b) => a[0] - b[0]);
    
    // Use only the first k points for interpolation
    const selectedPoints = points.slice(0, k);
    
    // Compute the secret constant
    const secret = lagrangeInterpolation(selectedPoints);
    console.log("Secret constant c:", secret);
    return secret;
}

// Example usage
findSecretConstant('testcase.json');

