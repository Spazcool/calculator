$(document).ready(function() {
    var inputs = [""],
        toScreen = "",
        opers = ["+", "-", "/", "*"],
        dotCount = 0,
        equalled = 0,
        nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    //CHANGE MATH SYMBOLS FOR EASE OF ACCESS
    function robotToHuman() {
        var replaced = "";
        for (var y = 0; y < toScreen.length; y++) {
            if (toScreen[y] === "*") {
                replaced = toScreen.replace("*", " x ");
            } else if (toScreen[y] === "/") {
                replaced = toScreen.replace("/", " &divide; ");
            }
        }
        return replaced;
    }

    //PUSH INPUTS TO SCREEN
    function updateScreen() {
        toScreen = inputs.join("");
        if (toScreen.includes("*") || toScreen.includes("/")) {
            $("#screen").html(robotToHuman());
        } else {
            $("#screen").html(toScreen);
        }
    }

    // CALCULATE AND PUSH TO SCREEN ON =
    function equalizer() {
        var ans = eval(toScreen).toFixed(2);
        equalled = 1;
        toScreen = inputs.join("");
        inputs = [ans];
        dotCount = 1;
        if (ans.length > 7) {
            $("#screen").html(Number(ans).toExponential());
        } else {
            $("#screen").html(ans);
        }
    }

    //ILLEGAL OPERATIONS
    function filter(input) {
        // STOPS 2 DOTS IN A ROW
        if (inputs[inputs.length - 1] === "." && input === ".") {
            // console.log("Too many dots.......");
            //IF EQUAL HAS BEEN HIT && INPUT IS NOT AN OPER HAVE THE ANSWER BE WIPED
            //FOR A NEW OPERATION TO TAKE PLACE
        } else if (equalled === 1 && nums.includes(Number(input))) {
            inputs = [""];
            inputs.push(input);
            //STOPS NONCONSECUTIVE DOTS
        } else if (inputs.includes(".") && input === ".") {
            if (inputs.includes(opers[0]) === true || inputs.includes(opers[1]) === true || inputs.includes(opers[2]) === true || inputs.includes(opers[3]) === true) {
                if (dotCount < 1) {
                    inputs.push(input);
                    dotCount += 1;
                }
            } else {
                // console.log("Still too many dots");
            }
            //START WITH A NUMBER NOT AN OPERATOR
        } else if (inputs.length === 1 && opers.includes(input) === false) {
            inputs.push(input);
            //STOPS 2 OPERATIONS IN A ROW
        } else if (opers.includes(inputs[inputs.length - 1]) === false) {
            inputs.push(input);
            //MAKE SURE ITS A NUM
        } else if (nums.includes(Number(input)) === true) {
            inputs.push(input);
        }
        equalled = 0;
        updateScreen();
    }

    //STARTS HERE WITH THE INPUTS
    $("button").click(function() {
        if (this.id === "ac") {
            inputs = [""];
            dotCount = 0;
            equalled = 0;
            updateScreen();
        } else if (this.id === "ce") {
            inputs.pop();
            updateScreen();
        } else if (this.id === "equal") {
            equalizer();
        } else {
            if (inputs[inputs.length - 1].indexOf("+", "-", "*", "/") === -1) {
                filter(this.id);
            } else {
                filter(this.id);
            }
        }
    });
});
