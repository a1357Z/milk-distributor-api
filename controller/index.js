const milkModel = require('../collections/milk');
const orderModel = require('../collections/order')
const db = require('../database')
const {validStatus} = require('../enums')

const createOffer = async (req, res) => {
    try {
        const { quantity } = req.body;
        if (!quantity || quantity < 0) {
            return res.status(422).send("unprocessable entity");
        }
        const supply = await getMilkSupply();
        if (!supply) {
            return res.status(500).send("service not started for the day");
        }
        if (supply.quantity < quantity) {
            return res.status(422).send("not enough milk supply");
        }
        const order = await orderModel.create({ quantity, date: new Date().toISOString().split('T')[0] });
        supply.quantity = supply.quantity - quantity;
        await supply.save();
        return res.status(201).send({ message: "successfully placed order", order });
    } catch (error) {
        console.log(error)
        return res.status(500).send("something went wrong");
    }
}

const updateOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity: newQuantity } = req.body;
        if (!newQuantity || !id || newQuantity < 0) {
            return res.status(422).send("unprocessable entity");
        }
        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(422).send("order not found");
        }

        const supply = await getMilkSupply();
        if (!supply) {
            return res.status(500).send("service not started for the day");
        }
        const prevQuantity = order.quantity;
        if (newQuantity == prevQuantity) {
            return res.status(201).send({ message: "successfully updated order", order });
        } else if (newQuantity < prevQuantity) {
            const decrement = prevQuantity - newQuantity;
            order.quantity = newQuantity;
            // use case of a transaction
            await order.save();
            supply.quantity = supply.quantity + decrement;
            supply.save();
            return res.status(201).send({ message: "successfully updated order", order });
        } else {
            const increment = newQuantity - prevQuantity;
            if (supply.quantity < increment) {
                return res.status(422).send("not enough milk for this update");
            }
            order.quantity = newQuantity;
            // use case of a transaction
            await order.save();
            supply.quantity = supply.quantity - increment;
            supply.save();
            return res.status(201).send({ message: "successfully updated order", order });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send("something went wrong")
    }
}
const updateOfferStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status || !id || !validStatus.includes(status)) {
            return res.status(422).send("unprocessable entity");
        }
        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(422).send("order not found");
        }
        order.status = status;
        await order.save();
        return res.status(201).send({ message: "successfully updated order status", order });
    } catch (error) {
        console.log(error)
        return res.status(500).send("something went wrong")
    }
}
const deleteOffer = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(422).send("unprocessable entity");
        }
        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(422).send("order not found");
        }
        const supply = await getMilkSupply();
        if (!supply) {
            return res.status(500).send("service not started for the day");
        }
        const orderQuantity = order.quantity
        await order.remove();
        supply.quantity = supply.quantity + orderQuantity;
        await supply.save();
        return res.status(201).send("successfully deleted the order")
    } catch (error) {
        console.log(error)
        return res.status(500).send("something went wrong")
    }
}
const checkCapacity = async (req, res) => {
    try {
        const { date } = req.params;
        if (!date) {
            return res.status(422).send("date not found");
        }
        const supply = await getMilkSupply(date);
        if (!supply) {
            return res.status(500).send("service not started for the day");
        }
        return res.status(200).send({ supply })
    } catch (error) {
        console.log(error)
        return res.status(500).send("something went wrong")
    }
}

const getMilkSupply = async function (date = new Date().toISOString().split('T')[0]) {
    const supply = await milkModel.findOne({ date })
    return supply;
}

module.exports = {
    createOffer, updateOffer, updateOfferStatus, deleteOffer, checkCapacity
}