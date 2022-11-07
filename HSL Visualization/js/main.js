'use strict';

(() => {
    const canvas1 = document.getElementById('canvas1');
    if (typeof canvas1.getContext === 'undefined') {
    return;
    }
    const ctx = canvas1.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  const width = canvas1.width;
  const height = canvas1.height;
    canvas1.width *= dpr;
    canvas1.height *= dpr;
    ctx.scale(dpr, dpr);
    canvas1.style.width = width + 'px';
    canvas1.style.height = height + 'px';
    
    
    ctx.scale(1, -1);
    ctx.translate(0, -height);
    
    let isAnimation = true;
    let AnimeId_con;
    function controlAnimation() {
        renderShapes();
        circlePointer();
        AnimeId_con = requestAnimationFrame(controlAnimation);
    }
    
    function renderTexts() {
        ctx.save();
        ctx.scale(1, -1);   // 反転
        ctx.translate(0, 0);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fafafa';
        ctx.fill();
        ctx.font = 'bold 150px comic sans MS';
        ctx.fillStyle = '#c0c0c0';
        ctx.fillText('hsl', arc.X, -arc.Y + 60);
        ctx.font = 'bold 20px comic sans MS';
        ctx.fillStyle = '#888';
        ctx.fillText('A n g l e', arc.X, -arc.Y - arc.R + arc.minR + 10);
        ctx.fillText('H u e', arc.X, -arc.Y + arc.R + 30);
        ctx.fillStyle = '#ccc';
        ctx.fillText('0 / 360', arc.X, -arc.Y - arc.R + arc.minR + 70);
        ctx.fillText('90', arc.X + arc.R - arc.minR, -arc.Y + 10);
        ctx.fillText('180', arc.X, -arc.Y + arc.R - arc.minR + 5);
        ctx.fillText('270', arc.X - arc.R + arc.minR, -arc.Y + 8);
        
        ctx.fillStyle = '#555';
        ctx.fillText(`Saturation: ${ball.satu}%`, 560, -51);
        ctx.fillText(`Brightness: ${ball.bright}%`, 560, -22);
        ctx.fillText('SelectedColor', 660, -405);
        ctx.restore();
    }
    
    const arc = {
        X: 250, Y: 240, R: 180,
        minR: 30,
    };

    function renderShapes() {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.arc(arc.X, arc.Y, arc.R, 0, 2 * Math.PI); // (外枠円)
        ctx.fillStyle = '#eee';
        ctx.fill();
        ctx.strokeStyle = '#777';
        ctx.setLineDash([15, 15]);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(arc.X, arc.Y, arc.R - 64, 0, 2 * Math.PI); // (内枠円)
        ctx.stroke();
        
        // // テキストの描画開始
        renderTexts();
        // // テキストの描画終了
        
        ctx.lineWidth = 2;
        ctx.strokeRect(580, 210, 180, 180);
        ctx.fillStyle = ball.color;
        ctx.fillRect(580, 210, 180, 180);
        
        ctx.beginPath();    //　移動円
        ctx.arc(arc.X + ball.baX - ball.conX, arc.Y + ball.baY - ball.conY, arc.minR, 0, 2 * Math.PI);
        ctx.fill();
        ctx.lineWidth = 8;
        ctx.setLineDash([]);
        ctx.stroke();
    }
    
    const ball = {
        baX: 0, baY: 0,
            conX: 0, conY: 0,
            color: 'hsl', satu: '80', bright: '80',
        };
        let rad = -90;

    function circlePointer() {
            rad--;
        if (Math.abs(rad) > 450) {
            rad = -90;
        }
        ball.baX = arc.R * Math.cos(rad / 180 * Math.PI);
        ball.baY = arc.R * Math.sin(rad / 180 * Math.PI);
        ball.conX = arc.minR * Math.cos(rad / 180 * Math.PI);
        ball.conY = arc.minR * Math.sin(rad / 180 * Math.PI);
        ball.color = `hsl(${Math.abs(rad) + 90}, ${ball.satu}%, ${ball.bright}%)`;
        return ball;
    }
    
    
    const stop = document.getElementById('btn');
    
    stop.addEventListener('click', () => {
        if (isAnimation === false) {
            stop.textContent = 'Stop';
            Disabled();
            controlAnimation();
            return;
        }
        stop.textContent = 'Restart';
        Disabled();
        cancelAnimationFrame(AnimeId_con);
        console.log(ball.color);
    });
    
        const inputs = document.querySelectorAll('input')
        function Disabled() {
            inputs.forEach(input => {
                input.disabled = !input.disabled;
                input.value = '';
            });
            change.value = 'Change';
            isAnimation = !isAnimation;
        }
        
    
    const satu = document.getElementById('satu');
    const bright = document.getElementById('bright');
    const change = document.getElementById('change');
    change.addEventListener('click', () => {
        if (!(parseInt(satu.value, 10) >= 0 && parseInt(satu.value, 10) <= 100)) {
            if (!(parseInt(bright.value, 10) >= 0 && parseInt(bright.value, 10) <= 100)) {
                satu.value = 'NaN';
                bright.value = 'NaN';
                return;
            }
        }
        satuBright();
        stop.click();
    });
    
    function satuBright() {
            ball.satu = `${parseInt(satu.value, 10)}`;
            ball.bright = `${parseInt(bright.value, 10)}`;
            return ball;
        }
    
    renderShapes();
    circlePointer();
    renderShapes();
    console.log('canvas1 render finish');
    setTimeout(() => {
        controlAnimation();
        console.log('animation start');
    }, 1000);

    const canvas2 = document.getElementById('canvas2');
    if (typeof canvas2.getContext === 'undefined') {
    return;
    }
    const ctx2 = canvas2.getContext('2d');

  const width2 = canvas2.width;
  const height2 = canvas2.height;
    canvas2.width *= dpr;
    canvas2.height *= dpr;
    ctx2.scale(dpr, dpr);
    canvas2.style.width = width2 + 'px';
    canvas2.style.height = height2 + 'px';
    
    class BodyTrunck {
        constructor(human) {
            this.human = human;

            this.ctx = canvas2.getContext('2d');
        }
        
        ellipse(shiftX, shiftY, xR, yR, rotate, start, end) {   // true
            this.ctx.beginPath();
            this.ctx.ellipse(this.human.posi().X + shiftX, this.human.posi().Y + shiftY, xR, yR, rotate, start / 180 * Math.PI, end / 180 * Math.PI, true);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            this.ctx.fill();
        }
        
        eyeEllipse(shiftX, shiftY, xR, yR, color) {
            this.ctx.beginPath();
            this.ctx.ellipse(this.human.posi().X + shiftX, this.human.posi().Y + shiftY, xR, yR, 0, 0, 2 * Math.PI);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }
        
        back1() {
            this.ellipse(0, -30, 32, 35, 0, 250, 290);
        }
        stomach() {
            this.ellipse(0, 3, 25, 33, 0, 200, 340);
        }
        stomachBack() {
            this.ellipse(0, 10, 23, 30, 0, 215, 325);
        }
        waist() {
            this.ellipse(0, 24, 27, 20, 0, 210, 330);
        }
        waistBack() {
            this.ellipse(0, 24, 27, 20, 0, 0, 360);
        }
        shoulder() {
            this.ellipse(-20, -55, 5, 15,  Math.PI / 2.5, 250, 40);
            this.ellipse(20, -55, 5, 15, -Math.PI / 2.5, 140, 290);
        }
        neck() {
            this.ellipse(0, -60, 10, 20, 0, 0, 360);
        }
        head() {
            this.ellipse(0, -92, 20, 24, 0, 0, 360);
        }
        eye() {
            let num;
            num = this.human.squinting().squinting / 50;
            if (num > 3) {
                this.human.squinting().squinting = 0;
                num = this.human.squinting().squinting / 5;
            }
            // console.log(num);
            this.eyeEllipse(-9.5, -94, 5, 3 - num, '#fff');
            this.eyeEllipse(9.5, -94, 5, 3 - num, '#fff');
            this.eyeEllipse(-9.5, -94, 3, 3 - num, '#333');
            this.eyeEllipse(9.5, -94, 3, 3 - num, '#333');
        }
        chest() {
            this.ellipse(-12, -30, 20, 30, 0, 250, 125);
            this.ellipse(12, -30, 20, 30, 0, 55, 290);
        }
        chestBack() {
            this.ellipse(-12, -30, 20, 30, 0, 0, 360);
            this.ellipse(12, -30, 20, 30, 0, 0, 360);
        }
        center() {
            this.ellipse(0, -30, 32, 35, 0, 250, 290);
        }
    }
    class MovedLegs {
        constructor(human) {
            this.human = human;
            this.GiveJointLegs = new GiveJointLegs(human);
            this.ctx = canvas2.getContext('2d');
        }

        leftLegPosi(i, shiftX, shiftY, xR, yR, rotate, start, end) {   // true
            this.ctx.beginPath();
            this.ctx.ellipse(this.GiveJointLegs.valueSet().left[i].x - shiftX, this.GiveJointLegs.valueSet().left[i].y + shiftY, xR, yR, rotate, start / 180 * Math.PI, end / 180 * Math.PI, true);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            this.ctx.fill();
        }
        rightLegPosi(i, shiftX, shiftY, xR, yR, rotate, start, end) {   // true
            this.ctx.beginPath();
            this.ctx.ellipse(this.GiveJointLegs.valueSet().right[i].x - shiftX, this.GiveJointLegs.valueSet().right[i].y + shiftY, xR, yR, rotate, start / 180 * Math.PI, end / 180 * Math.PI, true);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            this.ctx.fill();
        }
        leftLegFill(i, shiftX, shiftY, xR, yR, rotate, start, end) {   // true
            this.ctx.beginPath();
            this.ctx.ellipse(this.GiveJointLegs.valueSet().left[i].x - shiftX, this.GiveJointLegs.valueSet().left[i].y + shiftY, xR, yR, rotate, start / 180 * Math.PI, end / 180 * Math.PI, true);
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            this.ctx.fill();
        }
        rightLegFill(i, shiftX, shiftY, xR, yR, rotate, start, end) {   // true
            this.ctx.beginPath();
            this.ctx.ellipse(this.GiveJointLegs.valueSet().right[i].x - shiftX, this.GiveJointLegs.valueSet().right[i].y + shiftY, xR, yR, rotate, start / 180 * Math.PI, end / 180 * Math.PI, true);
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            this.ctx.fill();
        }

        femurHidden() {
            this.leftLegFill(0, -36, -30, 27, 20, 0, 0, 360);
        }
        femurLeft() {
            // this.leftLegPosi(0, -18.5, 6, 16, 45, Math.PI / 45, 226, 336);
            this.leftLegPosi(0, -18.5, 6, 16, 45, Math.PI / 45, 0, 360);
            this.ctx.fillStyle = 'black';
            // this.ctx.fillRect(0, 0, 100, 100);
            // this.ctx.fillRect(this.human.posi().X + 18, this.human.posi().Y + 25, 100, 100);
        }
        femurRight() {
            // this.rightLegPosi(0, 18.5, 6, 16, 45, -Math.PI / 45, 204, 314);
            this.rightLegPosi(0, 18.5, 6, 16, 45, -Math.PI / 45, 0, 360);
        }
        femurBackLeft() {
            this.leftLegPosi(0, -18, 61, 16, 45, Math.PI / 45, 0, 360);
        }
        femurBackRight() {
            this.rightLegPosi(0, 18, 61, 16, 45, -Math.PI / 45, 0, 360);
        }
        kneesLeft() {
            // this.leftLegPosi(1, -35, -86, 12, 12, 0, 212, 345);
            this.leftLegPosi(1, -35, -86, 12, 12, 0, 0, 360);
            this.ctx.fillStyle = 'black';
            // this.ctx.fillRect(this.human.posi().X - 20, this.human.posi().Y + 105, 100, 100);
            // this.ctx.fillRect(this.human.posi().X + 20, this.human.posi().Y + 105, 100, 100);
        }
        kneesLeftHidden() {
            this.leftLegFill(0, -28.5, -62, 16, 45, Math.PI / 45, 180, 0);
        }
        kneesRight() {
            // this.rightLegPosi(1, 35, -86, 12, 12, 0, 195, 328);
            this.rightLegPosi(1, 35, -86, 12, 12, 0, 0, 360);
        }
        kneesRightHidden() {
            this.rightLegFill(0, 28.5, -62, 16, 45, -Math.PI / 45, 180, 0);
        }
        kneesBackLeft() {
            this.leftLegPosi(1, -20, 101, 12, 12, 0, 0, 360);
        }
        kneesBackRight() {
            this.rightLegPosi(1, 20, 101, 12, 12, 0, 0, 360);
        }
        calfLeft() {
            this.leftLegPosi(1, -33, -47, 12, 45, Math.PI / 60, 223, 318);
            // this.ctx.fillStyle = 'black';
            // this.ctx.fillRect(this.human.posi().X - 18, this.human.posi().Y + 25, 100, 100);
        }
        calfRight() {
            this.rightLegPosi(1, 33, -47, 12, 45, -Math.PI / 60, 222, 317);
        }
        calfBackLeft() {
            this.leftLegPosi(1, -23.5, 140, 12, 45, Math.PI / 60, 0, 360);
        }
        calfBackRight() {
            this.rightLegPosi(1, 23.5, 140, 12, 45, -Math.PI / 60, 0, 360);
        }
        footLeft() {
            this.leftLegPosi(2, -39, -165, 20, 10, -Math.PI / 60, 268, 310);
        }
        footRight() {
            this.rightLegPosi(2, 39, -165, 20, 10, Math.PI / 60, 230, 272);
            this.ctx.fillStyle = 'black';
            // this.ctx.fillRect(this.human.posi().X - 35, this.human.posi().Y + 178, 100, 100);
            // this.ctx.fillRect(this.human.posi().X + 35, this.human.posi().Y + 178, 100, 100);
        }
        footBackLeft() {
            this.leftLegPosi(2, -31, 191, 20, 10, -Math.PI / 60, 0, 360);
        }
        footBackRight() {
            this.rightLegPosi(2, 31, 191, 20, 10, Math.PI / 60, 0, 360);
        }

        legs() {
            this.GiveJointLegs.legs();
        }
    }
    class GiveJointLegs {
        constructor(human) {
            this.human = human;
            this.ctx = canvas2.getContext('2d');

            this.objArrLeft = [
                {x: -18, y: +27},
                {x: -28, y: +95},
                {x: -35, y: +178},
            ];
            this.objArrRight = [
                {x: +18, y: +27},
                {x: +28, y: +95},
                {x: +35, y: +178},
            ];
            this.value = {};
            this.leftLegPosi = [];
            this.rightLegPosi = [];
            this.object = {};
        }
        valueSet() {
            this.value = {
                left: this.objArrLeft,
                right: this.objArrRight,
            };
            return this.value;
        }
        posiObject(i, a, b) {
            this.object = {
                left: this.leftLegPosi,
                right: this.rightLegPosi,
            };
            this.object.left[i] = [this.human.posi().X - a, this.human.posi().Y + b];
            this.object.right[i] = [this.human.posi().X + a, this.human.posi().Y + b];
            return this.object;
        }
        formula(i) {
            const func = i => this.posiObject(i, Math.abs(this.objArrLeft[i].x || this.objArrRight[i].x), this.objArrLeft[i].y || this.objArrRight[i].y);
            return func(i);
        }
        calculatorLeft(num1, num2) {
            const calcArray = [
                -(this.formula(num1).left[num1][0] - this.formula(num2).left[num2][0]),
                -(this.formula(num1).left[num1][1] - this.formula(num2).left[num2][1]),
            ];
            return calcArray;
        }
        calculatorRight(num1, num2) {
            const calcuArray = [
                -(this.formula(num1).right[num1][0] - this.formula(num2).right[num2][0]),
                -(this.formula(num1).right[num1][1] - this.formula(num2).right[num2][1]),
            ];
            return calcuArray;
        }

        legs() {
            this.femurLeft();
            this.femurRight();
            this.femurHidden();
        }
        femurHidden() {
            const posi = this.formula(0).left[0];
            this.ctx.save();
                this.ctx.translate(...posi);
                new MovedLegs().femurHidden();
            this.ctx.restore();
        }
        femurLeft() {
            const left = this.formula(0).left[0];
            this.ctx.save();
                this.ctx.translate(...left);
                this.ctx.rotate(1 / 4 * Math.PI);
                new MovedLegs().femurLeft();
                // this.ctx.fillRect(0, 0, 100, 100);
                this.kneesLeft();
            this.ctx.restore();
        }
        femurRight() {
            const right = this.formula(0).right[0];
            this.ctx.save();
                this.ctx.translate(...right);
                this.ctx.rotate(-1 / 4 * Math.PI);
                new MovedLegs().femurRight();
                this.kneesRight();
            this.ctx.restore();
        }
        kneesLeft() {
            const left = this.calculatorLeft(0, 1);
            this.ctx.save();
                this.ctx.translate(...left);
                this.ctx.rotate(-1 / 4 * Math.PI);
                new MovedLegs().kneesLeft();
                new MovedLegs().calfLeft();
                this.kneesLeftHidden();
                this.footLeft();
                this.ctx.fillStyle = 'black';
                // this.ctx.fillRect(0, 0, 100, 100);
            this.ctx.restore();
        }
        kneesLeftHidden() {
            this.ctx.save();
                this.ctx.rotate(1 / 4 * Math.PI);
                new MovedLegs().kneesLeftHidden();
            this.ctx.restore();
        }
        kneesRight() {
            const right = this.calculatorRight(0, 1);
            this.ctx.save();
                this.ctx.translate(...right);
                this.ctx.rotate(1 / 4 * Math.PI);
                new MovedLegs().kneesRight();
                new MovedLegs().calfRight();
                this.kneesRightHidden();
                this.footRight();
            this.ctx.restore();
        }
        kneesRightHidden() {
            this.ctx.save();
                this.ctx.rotate(-1 / 4 * Math.PI);
                new MovedLegs().kneesRightHidden();
            this.ctx.restore();
        }
        footLeft() {
            const left = this.calculatorLeft(1, 2);
            this.ctx.save();
                this.ctx.translate(...left);
                // this.ctx.rotate(-1 / 4 * Math.PI);
                new MovedLegs().footLeft();
            this.ctx.restore();
        }
        footRight() {
            const right = this.calculatorRight(1, 2);
            this.ctx.save();
                this.ctx.translate(...right);
                // this.ctx.rotate(1 / 4 * Math.PI);
                new MovedLegs().footRight();
            this.ctx.restore();
        }
    }
    
    class MovedArms {
        constructor(human) {
            this.human = human;
            this.GiveJointArms = new GiveJointArms(human);
            this.ctx = canvas2.getContext('2d');
        }

        leftArmEllipse(i, shiftX, shiftY, xR, yR, rotate, start, end) {    // true
            this.ctx.beginPath();
            this.ctx.ellipse(shiftX - this.GiveJointArms.valueSet().left[i].x, shiftY - this.GiveJointArms.valueSet().left[i].y, xR, yR, rotate, start / 180 * Math.PI, end / 180 * Math.PI, true);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            this.ctx.fill();
        }
        rightArmEllipse(i, shiftX, shiftY, xR, yR, rotate, start, end) {    // true
            this.ctx.beginPath();
            this.ctx.ellipse(shiftX - this.GiveJointArms.valueSet().right[i].x, shiftY - this.GiveJointArms.valueSet().right[i].y, xR, yR, rotate, start / 180 * Math.PI, end / 180 * Math.PI, true);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            this.ctx.fill();
        }
        leftArmFill(i, shiftX, shiftY, xR, yR, rotate, start, end) {    // true
            this.ctx.beginPath();
            this.ctx.ellipse(shiftX - this.GiveJointArms.valueSet().left[i].x, shiftY - this.GiveJointArms.valueSet().left[i].y, xR, yR, rotate, start / 180 * Math.PI, end / 180 * Math.PI, true);
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            // this.ctx.fillStyle = 'orange';
            this.ctx.fill();
        }
        rightArmFill(i, shiftX, shiftY, xR, yR, rotate, start, end) {    // true
            this.ctx.beginPath();
            this.ctx.ellipse(shiftX - this.GiveJointArms.valueSet().right[i].x, shiftY - this.GiveJointArms.valueSet().right[i].y, xR, yR, rotate, start / 180 * Math.PI, end / 180 * Math.PI, true);
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            // this.ctx.fillStyle = 'orange';
            this.ctx.fill();
        }

        // leftArm() {
        shoulderLeft() {
            this.leftArmEllipse(1, -32.2, -48.4, 4, 11, 3 / 18 * Math.PI, 275, 84);
        }
        shoulderRight() {
            this.rightArmEllipse(1, 32.2, -48.4, 4, 11, -3 / 18 * Math.PI, 96, 265);
        }
        forearmLeft() {
            this.leftArmEllipse(0, -37.5, 11, 9, 32, 1 / 18 * Math.PI, 213, 300);
        }
        upperArmLeft() {
            this.leftArmEllipse(1, -27, -33, 12, 35, 2 / 18 * Math.PI, 220, 290);
        }
        handLeft() { 
            this.leftArmEllipse(2, -43, 48, 9, 14, 1 / 18 * Math.PI, 260, 300);             
        }
        // }

        // rightArm() {
        upperFillLeft() {
            this.leftArmFill(1, -15, -41, 13, 25, 3 / 18 * Math.PI, 0, 360);
            this.leftArmFill(1, -22, -24, 9, 20, -1 / 18 * Math.PI, 0, 360);
        }
        upperFillRight() {
            this.rightArmFill(1, +15, -41, 13, 25, -3 / 18 * Math.PI, 0, 360);
            this.rightArmFill(1, +22, -24, 9, 20, 1 / 18 * Math.PI, 0, 360);
        }
        forearmRight() {
            this.rightArmEllipse(0, 37.5, 11, 9, 32, -1 / 18 * Math.PI, 240, 328);
        }
        upperArmRight() {
            this.rightArmEllipse(1, 27, -33, 12, 35, -2 / 18 * Math.PI, 250, 320);
        }
        handRight() {
            this.rightArmEllipse(2, 43, 48, 9, 14, -1 / 18 * Math.PI, 240, 280);
        }
        // }

        arms() {
            this.GiveJointArms.arms();
        }
    }

    class GiveJointArms {
        constructor(human) {
            this.human = human;

            this.ctx = canvas2.getContext('2d');
            this.objArrLeft = [
                // {x: -41, y: -5},
                {x: -38, y: -11},
                {x: -27, y: -55},
                {x: -47, y: +38},
            ];
            this.objArrRight = [
                // {x: +41, y: -5},
                {x: +38, y: -11},
                {x: +27, y: -55},
                {x: +47, y: +38},
            ];
            this.value = {};
            this.leftArmPosi = [];
            this.rightArmPosi = [];
            this.object = {};
        }

        valueSet() {
            this.value = {
                left: this.objArrLeft,
                right: this.objArrRight,
            };
            return this.value;
        }
        posiObject(i, a, b) {
            this.object = {
                left: this.leftArmPosi,
                right: this.rightArmPosi,
            };
            this.object.left[i] = [this.human.posi().X - a, this.human.posi().Y + b];
            this.object.right[i] = [this.human.posi().X + a, this.human.posi().Y + b];
            // console.log(this.object);
            return this.object;
        }
        formula(i) {
            const func = i => this.posiObject(i, Math.abs(this.objArrLeft[i].x || this.objArrRight[i].x), this.objArrLeft[i].y || this.objArrRight[i].y);
            return func(i);
        }
        calculatorLeft(num, num2) {
            const calcArray = [
                -(this.formula(num).left[num][0] - this.formula(num2).left[num2][0]),
                -(this.formula(num).left[num][1] - this.formula(num2).left[num2][1])
            ];
            return calcArray;
        }
        calculatorRight(num, num2) {
            const calcArray = [
                -(this.formula(num).right[num][0] - this.formula(num2).right[num2][0]),
                -(this.formula(num).right[num][1] - this.formula(num2).right[num2][1])
            ];
            return calcArray;
        }

        arms() {
            // this.forearm();   // 0
            this.upperArm();  // 1
            // this.hand();      // 2
        }
        upperArm() {
            this.upperArmLeft();
            this.upperArmRight();
            this.upperFillLeft();
            this.upperFillRight();
        }
        upperFillLeft() {
            const left = this.formula(1).left[1];
            this.human.getCtx().save();
                this.human.getCtx().translate(...left);
                // this.human.getCtx().rotate(Math.PI);
                new MovedArms().upperFillLeft();
            this.human.getCtx().restore();
        }
        upperFillRight() {
            const right = this.formula(1).right[1];
            this.human.getCtx().save();
                this.human.getCtx().translate(...right);
                new MovedArms().upperFillRight();
            this.human.getCtx().restore();
        }
        upperArmLeft() {
            const left = this.formula(1).left[1];
            this.human.getCtx().save();
                this.human.getCtx().translate(...left);
                this.human.getCtx().rotate(this.human.angle().upper / 180 * Math.PI);
                new MovedArms().upperArmLeft();
                new MovedArms().shoulderLeft();
                this.forearmLeft();
            this.human.getCtx().restore();
        }
        upperArmRight() {
            const right = this.formula(1).right[1];
            this.human.getCtx().save();
                this.human.getCtx().translate(...right);
                this.human.getCtx().rotate(-this.human.angle().upper / 180 * Math.PI);
                new MovedArms().upperArmRight();
                new MovedArms().shoulderRight();
                this.forearmRight();
            this.human.getCtx().restore();
        }
        forearmLeft() {
            const left = this.calculatorLeft(1, 0);
            this.human.getCtx().save();
                this.human.getCtx().translate(...left);
                this.human.getCtx().rotate(this.human.angle().fore / 180 * Math.PI);
                new MovedArms().forearmLeft();
                this.handLeft();
                // this.ctx.fillStyle = 'black';
                // this.ctx.fillRect(0, 0, 100, 100);
            this.human.getCtx().restore();
        }
        forearmRight() {
            const right = this.calculatorRight(1, 0);
            this.human.getCtx().save();
                this.human.getCtx().translate(...right);
                this.human.getCtx().rotate(-this.human.angle().fore / 180 * Math.PI);
                new MovedArms().forearmRight();
                this.handRight();
            this.human.getCtx().restore();
        }
        handLeft() {
            const left = this.calculatorLeft(0, 2);
            this.human.getCtx().save();
                this.human.getCtx().translate(...left);
                this.human.getCtx().rotate(this.human.angle().hand / 180 * Math.PI);
                new MovedArms().handLeft();
                // this.ctx.fillStyle = 'black';
                // this.ctx.fillRect(0, 0, 100, 100);
            this.human.getCtx().restore();
        }
        handRight() {
            const right = this.calculatorRight(0, 2);
            this.human.getCtx().save();
                this.human.getCtx().translate(...right);
                this.human.getCtx().rotate(-this.human.angle().hand / 180 * Math.PI);
                new MovedArms().handRight();
            this.human.getCtx().restore();
        }
    }

    /**
     * @param {number} x X座表
     * @param {number} y Y座表
     * @param {number} size 体の大きさ
     */
    
    class Human  {
        constructor(x = 0, y = 0, size = 1) {
            this.BodyTrunck = new BodyTrunck(this);
            this.MovedArms = new MovedArms(this);
            this.MovedLegs = new MovedLegs(this);

            this.ctx = canvas2.getContext('2d');
            this.times = size;
            this.position = {
                X: x * this.times + 150,
                Y: y * this.times + 150,
            };
            this.ang = {
                fore: 0,
                upper: 0,
                hand: 0,
            };
            this.eye = {
                squinting: 0,
            };
            this.humanScale = [0.5 * this.times, 0.5 * this.times];

            this.ellipse();
        }
        
        posi() {
            return this.position;
        }
        getCtx() {
            return this.ctx;
        }
        angle() {
            return this.ang;
        }
        squinting() {
            return this.eye;
        }

        shoulder() {
            this.BodyTrunck.shoulder();
        }
        neck() {
            this.BodyTrunck.neck();
        }
        face() {
            this.BodyTrunck.head();
            this.BodyTrunck.eye();
        }
        armsBacks() {
            this.MovedArms.upperBacks();
        }
        arms() {
            this.MovedArms.arms();
        }
        center() {
            this.BodyTrunck.center();
        }
        bodyTrunckBacks() {
            this.BodyTrunck.waistBack();
            this.BodyTrunck.chestBack();
            this.BodyTrunck.back1();
            this.BodyTrunck.stomachBack();
        }
        bodyTrunck() {
            this.BodyTrunck.stomach();
            this.BodyTrunck.waist();
            this.BodyTrunck.chest();
        }
        legBacks() {
            this.MovedLegs.femurBack();
            this.MovedLegs.kneesBack();
            // this.MovedLegs.calfBack();
            this.MovedLegs.footBack();
            // this.MovedLegs.legs();
        }
        leg() {
            // this.MovedLegs.femur();
            // this.MovedLegs.knees();
            // // this.MovedLegs.calf();
            // this.MovedLegs.foot();
            this.MovedLegs.legs();
        }

        ellipse() {
            this.ctx.save();
            this.ctx.scale(...this.humanScale);
                this.neck();
                this.bodyTrunckBacks();
                // this.legBacks();
                this.center();
                this.bodyTrunck();
                this.shoulder();
                this.face();
                this.leg();
                this.arms();
            this.ctx.restore();
        }
        movigEllipse() {
            this.ctx.save();
            this.ctx.scale(...this.humanScale);
                this.neck();
                this.bodyTrunckBacks();
                // this.legBacks();
                this.center();
                this.bodyTrunck();
                this.shoulder();
                this.face();
                this.leg();
                this.arms();
            this.ctx.restore();
        }
    }

    /**
     * @param {number} x X座表
     * @param {number} y Y座表
     * @param {number} size 体の大きさ
     */

    class MovingHuman {
        constructor(x = 0, y = 0, size = 1) {
            this.Human = new Human(x, y, size);

            this.vrib = {
                eye: 1, ptn: 0,
            };
            this.ptn = [
                (sign, times) => {this.pattern1(sign, times)},
                (sign, times) => {this.pattern2(sign, times)},
            ];
            
            this.timeoutId1 = 'undefind';
            this.timeoutId2 = 'undefind';
        }
        
        squinting() {
            this.Human.squinting().squinting += this.vrib.eye;
            if (this.vrib.eye > 4) {
                this.vrib.eye = 1;
            }
        }
        armSelecter(num) {
            if (num === 0) {
                return this.Human.angle().upper;
            }
            if (num === 1) {
                return this.Human.angle().fore;
            }
        }
        pattern1(sign, times) {
            this.Human.angle().fore += sign * 0.5 * times;
            this.Human.angle().upper += sign * 1 * times;
            this.Human.angle().hand -= sign * 0.5 * times;
        }
        pattern2(sign, times) {
            this.Human.angle().fore += sign * 1 * times;
            this.Human.angle().upper += sign * 0.5 * times;
        }
        moving() {
            this.Human.getCtx().clearRect(0, 0, canvas2.width, canvas2.height);
            this.ptn[this.vrib.ptn](1, 0.75);
            this.squinting();
            // console.log(this.Human.squinting());

            this.Human.movigEllipse();

            this.timeoutId1 = setTimeout(() => {
                    this.moving();
                    if (this.armSelecter(this.vrib.ptn) > 120) {
                        clearTimeout(this.timeoutId1);
                        this.vrib.eye += Math.random() * 3;
                        this.movingBack();
                    }
            }, 10);
        }
        movingBack() {
            this.Human.getCtx().clearRect(0, 0, canvas2.width, canvas2.height);
            this.ptn[this.vrib.ptn](-1, 1.5);
            this.squinting();
            // console.log(this.Human.squinting());

            this.Human.movigEllipse();

            this.timeoutId2 = setTimeout(() => {
                    this.movingBack();
                    if (this.armSelecter(this.vrib.ptn) < 0) {
                        clearTimeout(this.timeoutId2);
                        this.vrib.eye += Math.random() * 3;
                        this.vrib.ptn += Math.floor(Math.random() * this.ptn.length);
                        if (this.vrib.ptn >= this.ptn.length) {
                            this.vrib.ptn = 0;
                        } 
                        this.moving();
                    }
            }, 10);
        }
    }

    // const human = new Human();
    // new Human(100, 0, 2);
    const prom = new Promise((resolve, reject) => {
        const human = new MovingHuman(100, 0, 2);
        console.log('human render finish');
        setTimeout(() => {
            resolve(human);
        }, 2000);
    });
    prom.then((human) => {
        human.moving();
        console.log('human moving start');
    });
    // new MovingHuman(100, 0, 1).moving();
    // console.log(new Human().angle()[2]);
    // new Human();

    // function animation() {
    //     requestAnimationFrame(animation);
    //     ctx.clearRect(0, 0, canvas2.width, canvas2.height);
    //     new Human(0, 0, 2);
    // }
    // animation();
    // console.log(new Human().angle());
})();