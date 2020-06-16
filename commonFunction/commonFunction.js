const user= require("../model/userModel")
module.exports={

    validation: (arr, body) => {
        for (var i = 0; i < arr.length; i++) {
    
            var value = null;
            if (body[arr[i]] == undefined) {
                value = arr[i]
                i = i + 1
            }
        }
        return value;
    }


}

