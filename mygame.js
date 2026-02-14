 $(document).ready(function () {
        var canv = $("#canv")[0];
        var c = canv.getContext("2d");
        var r = 1;
        var s = 25;
        canv.width = s * 9;
        canv.height = s * 9;
        var level = 1;
        var n = level - 1;
        var temp1, temp2;

        $("#startCont").fadeIn(600);
        $("#startBut").on("click", function () {
            $("#startCont").fadeOut(700);
            $("#level").html("Level " + level);
            $("#area").fadeIn(500, draw);
        });
// the 3 levels walls//
        var lev1 = [[0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 5], [6, 6], [7, 5], [7, 4], [7, 3], [8, 0], [8, 1], [8, 2], [8, 3], [7, 0], [6, 0], [5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [1, 1], [1, 2], [3, 2], [4, 2], [3, 4]];
        var box1 = [[4, 3], [4, 4], [5, 2]];
        var tank1 = [[2, 2], [2, 3], [5, 5]];
        var ghost1 = [7, 1];

        temp1 = $.extend(true, [], box1);
        temp2 = ghost1.slice(0);
        // console.log("t1= "+ temp1)

        var lev2 = [[0, 4], [0, 5], [0, 6], [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [8, 7], [8, 6], [8, 5], [8, 4], [8, 3], [7, 3], [7, 2], [6, 2], [5, 2], [5, 1], [5, 0], [4, 0], [3, 0], [2, 0], [2, 1], [2, 2], [1, 2], [1, 3], [1, 4], [6, 5]];
        var box2 = [[4, 3], [3, 4], [4, 5], [5, 4]];
        var tank2 = [[3, 1], [4, 1], [4, 2], [5, 3]];
        var ghost2 = [6, 6];

        var lev3 = [[0, 2], [0, 3], [0, 4], [0, 5], [1, 5], [2, 5], [3, 5], [3, 6], [3, 7], [4, 7], [5, 7], [5, 6], [6, 6], [6, 5], [6, 4], [7, 4], [7, 3], [7, 2], [7, 1], [7, 0], [6, 0], [5, 0], [4, 0], [3, 0], [2, 0], [2, 1], [2, 2], [1, 2]];
        var box3 = [[3, 2], [4, 2], [5, 2], [3, 3], [2, 4]];
        var tank3 = [[3, 4], [4, 4], [5, 5], [5, 3], [4, 3]];
        var ghost3 = [2, 3];

        var levs = [lev1, lev2, lev3];
        var boxs = [box1, box2, box3];
        var tanks = [tank1, tank2, tank3];
        var ghosts = [ghost1, ghost2, ghost3];

        var b;
        var pr = 0;
        var pre = 0;
        var prev = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];

        // button 1,2,3,4,5
        $("#b1").on("click", function () {
            if (ifWall(levs[n], ghosts[n][0], ghosts[n][1] - 1, -1).val === false) {
                if (ifWall(boxs[n], ghosts[n][0], ghosts[n][1] - 1, -1).val === true) {
                    b = ifWall(boxs[n], ghosts[n][0], ghosts[n][1] - 1, -1);
                    if (ifWall(levs[n], boxs[n][b.pos][0], boxs[n][b.pos][1] - 1, -1).val === false) {
                        if (ifWall(boxs[n], boxs[n][b.pos][0], boxs[n][b.pos][1] - 1, b.pos).val === false) {
                            --boxs[n][b.pos][1];
                            --ghosts[n][1];
                            prev.pop();
                            prev.unshift([0, 1, 0, 1, b.pos]);
                            pre = 0;
                            if (pr < 5) {
                                pr++;
                            }
                            draw();
                        }
                    }
                } else {
                    --ghosts[n][1];
                    prev.pop();
                    prev.unshift([0, 1]);
                    pre = 0;
                    if (pr < 5) {
                        pr++;
                    }
                    draw();
                }
            }
        });
        $("#b2").on("click", function () {
            if (ifWall(levs[n], ghosts[n][0], ghosts[n][1] + 1, -1).val === false) {
                if (ifWall(boxs[n], ghosts[n][0], ghosts[n][1] + 1, -1).val === true) {
                    b = ifWall(boxs[n], ghosts[n][0], ghosts[n][1] + 1, -1);
                    if (ifWall(levs[n], boxs[n][b.pos][0], boxs[n][b.pos][1] + 1, -1).val === false) {
                        if (ifWall(boxs[n], boxs[n][b.pos][0], boxs[n][b.pos][1] + 1, b.pos).val === false) {
                            ++boxs[n][b.pos][1];
                            ++ghosts[n][1];
                            prev.pop();
                            prev.unshift([0, -1, 0, -1, b.pos]);
                            pre = 0;
                            if (pr < 5) {
                                pr++;
                            }
                            draw();
                        }
                    }
                } else {
                    ++ghosts[n][1];
                    prev.pop();
                    prev.unshift([0, -1]);
                    pre = 0;
                    if (pr < 5) {
                        pr++;
                    }
                    draw();
                }
            }
        });
        $("#b3").on("click", function () {
            if (ifWall(levs[n], ghosts[n][0] - 1, ghosts[n][1], -1).val === false) {
                if (ifWall(boxs[n], ghosts[n][0] - 1, ghosts[n][1], -1).val === true) {
                    b = ifWall(boxs[n], ghosts[n][0] - 1, ghosts[n][1], -1);
                    if (ifWall(levs[n], boxs[n][b.pos][0] - 1, boxs[n][b.pos][1], -1).val === false) {
                        if (ifWall(boxs[n], boxs[n][b.pos][0] - 1, boxs[n][b.pos][1], b.pos).val === false) {
                            --boxs[n][b.pos][0];
                            --ghosts[n][0];
                            prev.pop();
                            prev.unshift([1, 0, 1, 0, b.pos]);
                            pre = 0;
                            if (pr < 5) {
                                pr++;
                            }
                            draw();
                        }
                    }
                } else {
                    --ghosts[n][0];
                    prev.pop();
                    prev.unshift([1, 0]);
                    pre = 0;
                    if (pr < 5) {
                        pr++;
                    }
                    draw();
                }
            }
        });
        $("#b4").on("click", function () {
            if (ifWall(levs[n], ghosts[n][0] + 1, ghosts[n][1], -1).val === false) {
                if (ifWall(boxs[n], ghosts[n][0] + 1, ghosts[n][1], -1).val === true) {
                    b = ifWall(boxs[n], ghosts[n][0] + 1, ghosts[n][1], -1);
                    if (ifWall(levs[n], boxs[n][b.pos][0] + 1, boxs[n][b.pos][1], -1).val === false) {
                        if (ifWall(boxs[n], boxs[n][b.pos][0] + 1, boxs[n][b.pos][1], b.pos).val === false) {
                            ++boxs[n][b.pos][0];
                            ++ghosts[n][0];
                            prev.pop();
                            prev.unshift([-1, 0, -1, 0, b.pos]);
                            pre = 0;
                            if (pr < 5) {
                                pr++;
                            }
                            draw();
                        }
                    }
                } else {
                    ++ghosts[n][0];
                    prev.pop();
                    prev.unshift([-1, 0]);
                    pre = 0;
                    if (pr < 5) {
                        pr++;
                    }
                    draw();
                }
            }
        });
     $("#b5").on("click", function () {
         pr = 0;
         pre = 0;
         prev = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
         boxs[n] = $.extend(true, [], temp1);  //eval("box"+level);
         ghosts[n] = temp2.slice(0);  //eval("tank"+level);
         draw();
     });

// these are the functions below://
        function draw() {

            // var setInt = setInterval(function(){
            c.clearRect(0, 0, 300, 300);

            for (var j = 0; j < levs[n].length; j++) {
                wall(levs[n][j][0] * s, levs[n][j][1] * s);
            }
            for (var j3 = 0; j3 < tanks[n].length; j3++) {
                tank(tanks[n][j3][0] * s, tanks[n][j3][1] * s, 8);
            }
            for (var j2 = 0; j2 < boxs[n].length; j2++) {
                box(boxs[n][j2][0] * s, boxs[n][j2][1] * s);
            }
            ghost(ghosts[n][0] * s, ghosts[n][1] * s);

            if (ifSolved(boxs[n], tanks[n])) {
                levelUp();
                // clearInterval(setInt);
            }
            //},100)
        }

        function levelUp() {
            level++;
            n = level - 1;
            if (level > levs.length) {

                $("#finished").fadeIn(200);
                return;
            }
            $("#level").html("Level " + level);
            prev = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
            temp1 = $.extend(true, [], boxs[n]);
            temp2 = ghosts[n].slice(0);

            $("#congratsText").html("Congrats! <br> You Completed Level " + (level - 1));
            $("#nextBut").html("Let's Go To <br> Level " + level + " !");
            $("#nextLevel").fadeIn(500);
            $("#nextBut").on("click", function () {
                $("#nextLevel").fadeOut(200);
                draw();
            })
        }

        function ifSolved(arrS1, arrS2) {
            var icount = 0;
            for (var is1 = 0; is1 < arrS1.length; is1++) {
                for (var is2 = 0; is2 < arrS2.length; is2++) {
                    if (arrS2[is2][0] === arrS1[is1][0] && arrS2[is2][1] === arrS1[is1][1]) {
                        icount++;
                    }
                }
            }
            return icount === arrS1.length;
        }

        function ifWall(arr1, arr2x, arr2y, ex) {
            for (var ib = 0; ib < arr1.length; ib++) {
                if (ib === ex) {
                    continue;
                }
                if (arr2x === arr1[ib][0] && arr2y === arr1[ib][1]) {
                    return {
                        val: true,
                        pos: ib
                    }
                }
            }
            return {
                val: false,
                pos: null
            }
        }

        function ifCovered(cpair, carr) {
            for (var ic = 0; ic < carr.length; ic++) {
                if (cpair[0] === carr[ic][0] && cpair[1] === carr[ic][1]) {
                    return "#7CFC00";
                }
            }
            return "#fcfc90";
        }

        function ifOver(opair, oarr) {
            for (var io = 0; io < oarr.length; io++) {
                if (opair[0] === oarr[io][0] && opair[1] === oarr[io][1]) {
                    return "👽";
                }
            }
            return "👻";
        }

// functions of 4 elements//
        function ghost(yx, yy) {
            c.beginPath();
            c.arc(yx + r, yy + r, r, Math.PI, Math.PI / 180 * 270);
            c.arc(yx + s - r, yy + r, r, Math.PI / 180 * 270, 0);
            c.arc(yx + s - r, yy + s - r, r, 0, Math.PI / 180 * 90);
            c.arc(yx + r, yy + s - r, r, Math.PI / 180 * 90, Math.PI);
            c.closePath();

            c.fillText(ifOver([yx / s, yy / s], tanks[n]), yx + r, yy + 20);
        }

        function tank(px, py, pr) {
            c.beginPath();
            c.arc(px + pr, py + pr, pr, Math.PI, Math.PI / 180 * 270);
            c.arc(px + s - pr, py + pr, pr, Math.PI / 180 * 270, 0);
            c.arc(px + s - pr, py + s - pr, pr, 0, Math.PI / 180 * 90);
            c.arc(px + pr, py + s - pr, pr, Math.PI / 180 * 90, Math.PI);
            c.closePath();
            c.strokeStyle = "#7CFC00";
            c.fillStyle = "#FF69B4";
            c.stroke();
            c.fill();
            c.font = "20px sans-serif";

            c.fillText("🔮", px, py + 20);
        }

        function wall(ox, oy) {
            var frac = s / 4;
            c.beginPath();
            c.arc(ox + r, oy + r, r, Math.PI, Math.PI / 180 * 270);
            c.arc(ox + s - r, oy + r, r, Math.PI / 180 * 270, 0);
            c.arc(ox + s - r, oy + s - r, r, 0, Math.PI / 180 * 90);
            c.arc(ox + r, oy + s - r, r, Math.PI / 180 * 90, Math.PI);
            c.closePath();
            c.strokeStyle = "#f5ff66";
            c.fillStyle = "#d67404";
            c.stroke();
            c.fill();
            for (var fr1 = frac; fr1 < s; fr1 += frac) {
                c.beginPath();
                c.moveTo(ox, oy + fr1);
                c.lineTo(ox + s, oy + fr1);
                c.stroke();
            }
            c.beginPath();
            c.moveTo(ox + frac * 1.5, oy);
            c.lineTo(ox + frac * 1.5, oy + frac);
            c.stroke();

            c.beginPath();
            c.moveTo(ox + frac * 1.5, oy + frac * 2);
            c.lineTo(ox + frac * 1.5, oy + frac * 3);
            c.stroke();

            c.beginPath();
            c.moveTo(ox + frac * 2.5, oy + frac);
            c.lineTo(ox + frac * 2.5, oy + frac * 2);
            c.stroke();

            c.beginPath();
            c.moveTo(ox + frac * 2.5, oy + frac * 3);
            c.lineTo(ox + frac * 2.5, oy + frac * 4);
            c.stroke();
        }

        function box(bx, by) {
            c.beginPath();
            c.arc(bx + r, by + r, r, Math.PI, Math.PI / 180 * 270);
            c.arc(bx + s - r, by + r, r, Math.PI / 180 * 270, 0);
            c.arc(bx + s - r, by + s - r, r, 0, Math.PI / 180 * 90);
            c.arc(bx + r, by + s - r, r, Math.PI / 180 * 90, Math.PI);
            c.closePath();
            c.strokeStyle = "#6495ED";
            c.fillStyle = ifCovered([bx / s, by / s], tanks[n]);
            c.stroke();
            c.fill();
            c.font = "20px sans-serif";
            c.fillText("💎", bx + r, by + 20);
        }
    });
