const milkModel = require('./collections/milk');
async function refillMilk() {
    try {
        const doc = await milkModel.findOne({ date: new Date().toISOString().split('T')[0] });
        if (!doc) {
            await milkModel.create({
                date: new Date().toISOString().split('T')[0]
            });
            console.log("refilling the milk for today")
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = { refillMilk };