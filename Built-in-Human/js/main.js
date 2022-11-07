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
        requestAnimationFrame(renderShapes);
        requestAnimationFrame(circlePointer);
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
    
        window.addEventListener('load', () => {
        controlAnimation();
    });

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
    
    class Human {
        constructor(x = 0, y = 0, t = 1) {
            this.ctx = canvas2.getContext('2d');
            this.times = t;
            this.posiX = x * this.times + 150;
            this.posiY = y * this.times + 150;
            this.leftArmPosi = [this.posiX - 32, this.posiY - 48];
            this.rightArmPosi = [this.posiX + 32, this.posiY - 48];
        }
        
        ellipse(shiftX, shiftY, xR, yR, rotate) {
            this.ctx.beginPath();
            this.ctx.ellipse(this.posiX + shiftX, this.posiY + shiftY, xR, yR, rotate, 0, 2 * Math.PI);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            this.ctx.fill();
        }
        
        eyeEllipse(shiftX, shiftY, xR, yR, color) {
            this.ctx.beginPath();
            this.ctx.ellipse(this.posiX + shiftX, this.posiY + shiftY, xR, yR, 0, 0, 2 * Math.PI);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }

        moveLeftArmEllipse(shiftX, shiftY, xR, yR, rotate) {
            this.ctx.beginPath();
            this.ctx.ellipse(shiftX + 32, shiftY + 48, xR, yR, rotate, 0, 2 * Math.PI);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            this.ctx.fill();
        }

        moveRightArmEllipse(shiftX, shiftY, xR, yR, rotate) {
            this.ctx.beginPath();
            this.ctx.ellipse(shiftX - 32, shiftY + 48, xR, yR, rotate, 0, 2 * Math.PI);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            this.ctx.fill();
        }

        stomach() {
            this.ellipse(0, 3, 25, 33, 0);
        }
        waist() {
            this.ellipse(0, 27, 30, 20, Math.PI);
        }
        shoulder() {
            this.ellipse(-20, -55, 5, 15,  Math.PI / 2.5);
            this.ellipse(20, -55, 5, 15, -Math.PI / 2.5);
        }
        neck() {
            this.ellipse(0, -60, 10, 20, 0);
        }
        head() {
            this.ellipse(0, -92, 20, 24, 0);
        }
        eye() {
            this.eyeEllipse(-9.5, -94, 5, 3, '#fff');
            this.eyeEllipse(9.5, -94, 5, 3, '#fff');
            this.eyeEllipse(-9.5, -94, 3, 3, '#333');
            this.eyeEllipse(9.5, -94, 3, 3, '#333');
        }
        chest() {
            this.ellipse(-12, -30, 20, 25, 0);
            this.ellipse(12, -30, 20, 25, 0);
        }

        femur() {
            this.ellipse(-18, 61, 16, 45, Math.PI / 45);
            this.ellipse(18, 61, 16, 45, -Math.PI / 45);
        }
        calf() {
            this.ellipse(-24, 141, 11, 37, Math.PI / 60);
            this.ellipse(24, 141, 11, 37, -Math.PI / 60);
        }
        knees() {
            this.ellipse(-22, 105, 11, 11, 0);
            this.ellipse(22, 105, 11, 11, 0);
        }
        foot() {
            this.ellipse(-32, 181, 17, 10, -Math.PI / 60);
            this.ellipse(32, 181, 17, 10, Math.PI / 60);
        }

        leftArm() {
        // forearm()
            this.moveLeftArmEllipse(-47, 10, 8, 30, 1 / 9 * Math.PI);
        // upperArm()
            this.moveLeftArmEllipse(-35, -26, 10, 30, 1 / 18 * Math.PI);
        // hand()
            this.moveLeftArmEllipse(-60, 40, 9, 14, 1 / 9 * Math.PI);
        }
        rightArm() {
        // forearm()
            this.moveRightArmEllipse(47, 10, 8, 30, -1 / 9 * Math.PI);
        // upperArm()
            this.moveRightArmEllipse(35, -26, 10, 30, -1 / 18 * Math.PI);
        // hand()
            this.moveRightArmEllipse(60, 40, 9, 14, -1 / 9 * Math.PI);
        }

        leg() {
            this.femur();
            this.calf();
            this.knees();
            this.foot();
        }
        arms() {
            this.ctx.save();
            this.ctx.translate(...this.leftArmPosi);
            // this.ctx.rotate(Math.PI / 4);
            this.leftArm();
            this.ctx.restore();
            this.ctx.save();
            this.ctx.translate(...this.rightArmPosi);
            // this.ctx.rotate(-Math.PI / 4);
            this.rightArm();
            this.ctx.restore();
        }
        
        humanEllipse() {
            this.ctx.save();
            this.ctx.scale(0.5 * this.times, 0.5 * this.times)
            this.shoulder();
            this.neck();
            this.head();
            this.eye();
            this.arms();
            this.leg();
            this.waist();
            this.stomach();
            this.chest();
            this.ctx.restore();
        }
    }

    class HumanTTT extends Human {
        constructor(x = 0, y = 0, t = 1) {
            // this.ctx = canvas2.getContext('2d');
            // this.times = t;
            // this.posiX = x * this.times + 150;
            // this.posiY = y * this.times + 150;
            // this.leftArmPosi = [this.posiX - 32, this.posiY - 48];
            // this.rightArmPosi = [this.posiX + 32, this.posiY - 48];
            super(x = 0, y = 0, t = 1);
        }
        
        ellipse(shiftX, shiftY, xR, yR, rotate) {
            this.ctx.beginPath();
            this.ctx.ellipse(this.posiX + shiftX, this.posiY + shiftY, xR, yR, rotate, 0, 2 * Math.PI);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            this.ctx.fill();
        }
        
        eyeEllipse(shiftX, shiftY, xR, yR, color) {
            this.ctx.beginPath();
            this.ctx.ellipse(this.posiX + shiftX, this.posiY + shiftY, xR, yR, 0, 0, 2 * Math.PI);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }

        moveLeftArmEllipse(shiftX, shiftY, xR, yR, rotate) {
            this.ctx.beginPath();
            this.ctx.ellipse(shiftX + 32, shiftY + 48, xR, yR, rotate, 0, 2 * Math.PI);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            this.ctx.fill();
        }

        moveRightArmEllipse(shiftX, shiftY, xR, yR, rotate) {
            this.ctx.beginPath();
            this.ctx.ellipse(shiftX - 32, shiftY + 48, xR, yR, rotate, 0, 2 * Math.PI);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            this.ctx.fillStyle = 'hsl(20, 60%, 90%)';
            this.ctx.fill();
        }

        stomach() {
            this.ellipse(0, 3, 25, 33, 0);
        }
        waist() {
            this.ellipse(0, 27, 30, 20, Math.PI);
        }
        shoulder() {
            this.ellipse(-20, -55, 5, 15,  Math.PI / 2.5);
            this.ellipse(20, -55, 5, 15, -Math.PI / 2.5);
        }
        neck() {
            this.ellipse(0, -60, 10, 20, 0);
        }
        head() {
            this.ellipse(0, -92, 20, 24, 0);
        }
        eye() {
            this.eyeEllipse(-9.5, -94, 5, 3, '#fff');
            this.eyeEllipse(9.5, -94, 5, 3, '#fff');
            this.eyeEllipse(-9.5, -94, 3, 3, '#333');
            this.eyeEllipse(9.5, -94, 3, 3, '#333');
        }
        chest() {
            this.ellipse(-12, -30, 20, 25, 0);
            this.ellipse(12, -30, 20, 25, 0);
        }

        femur() {
            this.ellipse(-18, 61, 16, 45, Math.PI / 45);
            this.ellipse(18, 61, 16, 45, -Math.PI / 45);
        }
        calf() {
            this.ellipse(-24, 141, 11, 37, Math.PI / 60);
            this.ellipse(24, 141, 11, 37, -Math.PI / 60);
        }
        knees() {
            this.ellipse(-22, 105, 11, 11, 0);
            this.ellipse(22, 105, 11, 11, 0);
        }
        foot() {
            this.ellipse(-32, 181, 17, 10, -Math.PI / 60);
            this.ellipse(32, 181, 17, 10, Math.PI / 60);
        }

        leftArm() {
        // forearm()
            this.moveLeftArmEllipse(-47, 10, 8, 30, 1 / 9 * Math.PI);
        // upperArm()
            this.moveLeftArmEllipse(-35, -26, 10, 30, 1 / 18 * Math.PI);
        // hand()
            this.moveLeftArmEllipse(-60, 40, 9, 14, 1 / 9 * Math.PI);
        }
        rightArm() {
        // forearm()
            this.moveRightArmEllipse(47, 10, 8, 30, -1 / 9 * Math.PI);
        // upperArm()
            this.moveRightArmEllipse(35, -26, 10, 30, -1 / 18 * Math.PI);
        // hand()
            this.moveRightArmEllipse(60, 40, 9, 14, -1 / 9 * Math.PI);
        }

        leg() {
            this.femur();
            this.calf();
            this.knees();
            this.foot();
        }
        arms() {
            // this.ctx.save();
            // this.ctx.translate(...this.leftArmPosi);
            // // this.ctx.rotate(Math.PI / 4);
            // this.leftArm();
            // this.ctx.restore();
            // this.ctx.save();
            // this.ctx.translate(...this.rightArmPosi);
            // // this.ctx.rotate(-Math.PI / 4);
            // this.rightArm();
            // this.ctx.restore();
            super.arms();
        }
        
        humanEllipse() {
            // this.ctx.save();
            // this.ctx.scale(0.5 * this.times, 0.5 * this.times)
            // this.shoulder();
            // this.neck();
            // this.head();
            // this.eye();
            // this.arms();
            // this.leg();
            // this.waist();
            // this.stomach();
            // this.chest();
            // this.ctx.restore();
            super.humanEllipse();
        }
    }

        // new Human().humanEllipse();
        // const human = 
        new HumanTTT().humanEllipse();
})();