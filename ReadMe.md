NOTE: You need mongodb on your system to run the server.

placing an order

    type: POST
    http://localhost:8000/add
    
    sample payload: 
    {
        "quantity": 20
    }

    sample response:
    {
        "message": "successfully placed order",
        "order": {
            "type": "cow",
            "quantity": 20,
            "status": "placed",
            "date": "2022-08-06",
            "_id": "62ee3d30128fa31130f4f133",
            "createdAt": "2022-08-06T10:06:40.743Z",
            "updatedAt": "2022-08-06T10:06:40.743Z",
            "__v": 0
        }
    }

updating an order

    type: PATCH
    req parameter: id
    http://localhost:8000/update/62ee3f77cd9e7334fefa738b
    
    sample payload: 
    {
        "quantity": 34
    }

    sample response:
    {
        "message": "successfully updated order",
        "order": {
            "_id": "62ee3f77cd9e7334fefa738b",
            "type": "cow",
            "quantity": 34,
            "status": "placed",
            "date": "2022-08-06",
            "createdAt": "2022-08-06T10:16:23.811Z",
            "updatedAt": "2022-08-06T10:16:48.926Z",
            "__v": 0
        }
    }

updating an order status

    type: PATCH
    req parameter: id
    validStatus = ["placed", "packed", "dispatched", "delivered"]
    http://localhost:8000/updateStatus/62ee3f77cd9e7334fefa738b
    
    sample payload: 
    {
        "status": "delivered"
    }

    sample response:
    {
        "message": "successfully updated order status",
        "order": {
            "_id": "62ee3f77cd9e7334fefa738b",
            "type": "cow",
            "quantity": 34,
            "status": "delivered",
            "date": "2022-08-06",
            "createdAt": "2022-08-06T10:16:23.811Z",
            "updatedAt": "2022-08-06T10:18:42.333Z",
            "__v": 0
        }
    }

deleting an order
    
    type: DELETE
    req parameter: id
    http://localhost:8000/delete/62ee3f77cd9e7334fefa738b

    sample response
    "successfully deleted the order"

get left milk for the day

    type: GET
    req parameter: 
        date
        Format: yyyy-mm-dd
    http://localhost:8000/checkCapacity/2022-08-06

    sample response:
    {
        "supply": {
            "_id": "62ee3d25128fa31130f4f130",
            "type": "cow",
            "quantity": 1000,
            "date": "2022-08-06",
            "__v": 0
        }
    }


