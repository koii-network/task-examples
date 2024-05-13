const os = require('os');
const dummyComputation = () => {
    let dataStore = [];
    let startTime = Date.now();
    let memoryFilled = false;

    const hash = (input) => {
        let hash = 0, i, chr;
        if (input.length === 0) return hash;
        for (i = 0; i < input.length; i++) {
            chr = input.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    const computeIntensiveTask = () => {
        let result = 0;
        for (let i = 0; i < 1000; i++) {
            result += Math.sqrt(i);
        }
        return hash(result.toString());
    };
    const fillMemory = () => {
        const availableMemory = os.freemem(); // Get the available memory
        const memoryLimit = availableMemory / 5; 
        console.log(`Available memory: ${availableMemory / (1024 * 1024 * 1024)}GB, Limit: ${memoryLimit / (1024 * 1024 * 1024)}GB`);
        
        try {
            let memoryFilled = false; // Ensure this variable is declared
            let dataStore = []; // Ensure dataStore is declared to store the buffers
            for (let i = 0; memoryFilled === false; i++) {
                if (process.memoryUsage().rss > memoryLimit) {
                    console.log(`Approaching ${memoryLimit / (1024 * 1024 * 1024)}GB memory usage, stopping allocations.`);
                    memoryFilled = true; 
                    break; 
                }
    
                const smallBuffer = Buffer.alloc(1024, 'a'); // Allocate a small buffer
                dataStore.push(smallBuffer);
                if (i % 100 === 0) {
                    computeIntensiveTask(); // Placeholder for any intensive task
                }
            }
        } catch (e) {
            console.log('Memory filling stopped:', e);
        }
    };

    // Make sure continuous CPU work
    const continuousCPULoad = () => {
        const endTime = startTime + 1200000; // 20 minutes
        const compute = () => {
            if (Date.now() < endTime) {
                computeIntensiveTask();
                setImmediate(compute); // Schedule the next computation
            } else {
                console.log('20 minutes reached, stopping CPU work.');
            }
        };
        compute(); // Start continuous computation
    };

    fillMemory();
    console.log('Memory filled or limit reached. Continuing with CPU tasks.');
    continuousCPULoad(); // Initiate continuous CPU work until 10 minutes are up
};

module.exports = dummyComputation;  // Export the dummyComputation function


