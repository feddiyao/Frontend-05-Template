const UTF8_Encoding = (string) => {
    let utf8_arr = [];
    for (let objIndex in string) {
        let code = string.charCodeAt(objIndex)
        if (code >= 0 && code < 127) {
            utf8_arr.push(parseInt(('0000000' + code.toString(2)).slice(-8), 2).toString(16))
           
        } else if (code >= 127 && code < 2047) {
            code = ('00000' + code.toString(2)).slice(-11)
            let code1 = parseInt("110" + code.slice(0, 4), 2).toString(16)
            let code2 = parseInt("10" + code.slice(5, 10), 2).toString(16)
            utf8_arr.push(code1)
            utf8_arr.push(code2)

        } else if (code >= 2048 && code < 0xFFFF) {
            code = ('00000' + code.toString(2)).slice(-16)
            let code1 = parseInt(("1110" + code.slice(0, 4)), 2).toString(16)
            let code2 = parseInt("10" + code.slice(4, 10), 2).toString(16)
            let code3 = parseInt("10" + code.slice(10), 2).toString(16)
            utf8_arr.push(code1)
            utf8_arr.push(code2)
            utf8_arr.push(code3)
        } else if (code >= 65536 && code < 0x1FFFFF) {
            code = ('00000' + code.toString(2)).slice(-21)
            let code1 = parseInt(("11110" + code.slice(0, 3)), 2).toString(16)
            let code2 = parseInt("10" + code.slice(3, 9), 2).toString(16)
            let code3 = parseInt("10" + code.slice(9, 15), 2).toString(16)
            let code4 = parseInt("10" + code.slice(15), 2).toString(16)
            utf8_arr.push(code1)
            utf8_arr.push(code2)
            utf8_arr.push(code3)
            utf8_arr.push(code4)
        } else if (code >= 0x200000 && code < 0x3FFFFFF) {
            code = ('00000' + code.toString(2)).slice(-26)
            let code1 = parseInt(("111110" + code.slice(0, 2)), 2).toString(16)
            let code2 = parseInt("10" + code.slice(2, 8), 2).toString(16)
            let code3 = parseInt("10" + code.slice(8, 14), 2).toString(16)
            let code4 = parseInt("10" + code.slice(14, 20), 2).toString(16)
            let code5 = parseInt("10" + code.slice(20), 2).toString(16)
            utf8_arr.push(code1)
            utf8_arr.push(code2)
            utf8_arr.push(code3)
            utf8_arr.push(code4)
            utf8_arr.push(code5)
        } else if (code >= 0x4000000 && code < 0x7FFFFFFF) {
            code = ('00000' + code.toString(2)).slice(-26)
            let code1 = parseInt(("111110" + code.slice(0, 2)), 2).toString(16)
            let code2 = parseInt("10" + code.slice(2, 8), 2).toString(16)
            let code3 = parseInt("10" + code.slice(8, 14), 2).toString(16)
            let code4 = parseInt("10" + code.slice(14, 20), 2).toString(16)
            let code5 = parseInt("10" + code.slice(20), 2).toString(16)
            utf8_arr.push(code1)
            utf8_arr.push(code2)
            utf8_arr.push(code3)
            utf8_arr.push(code4)
            utf8_arr.push(code5)
        }
        
    }

    return utf8_arr;
}

console.log(UTF8_Encoding("A中一"))