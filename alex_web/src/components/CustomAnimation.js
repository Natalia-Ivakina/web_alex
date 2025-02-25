import React, { useEffect } from 'react';

const CanvasAnimation = () => {

    useEffect(() => {
        function Particles(){
            this.colors = [
                '2, 21, 38',
                '3, 52, 110',
                '110, 172, 218',
                '60, 61, 55'
            ];
            this.blurry = true;
            this.border = false;
            this.minRadius = 5;
            this.maxRadius = 15;
            this.minOpacity = .005;
            this.maxOpacity = .2;
            this.minSpeed = .05;
            this.maxSpeed = .5;
            this.numParticles = 50;
            this.canvas = document.getElementById('canvas');
            this.ctx = this.canvas.getContext('2d');
        }

        Particles.prototype.init = function(){
            this.render();
            this.createCircle();
            this.animate(); // Start the animation
        };

        Particles.prototype._rand = function(min, max){
            return Math.random() * (max - min) + min;
        };

        Particles.prototype.render = function () {
            const wHeight = window.innerHeight;
            const wWidth = window.innerWidth;

            this.canvas.width = wWidth;
            this.canvas.height = wHeight;

            window.addEventListener('resize', () => this.render());
        };

        Particles.prototype.createCircle = function () {
            this.particles = []; // Store particles in an array

            for (let i = 0; i < this.numParticles; i++) {
                const color = this.colors[Math.floor(this._rand(0, this.colors.length))];

                this.particles[i] = {
                    radius: this._rand(this.minRadius, this.maxRadius),
                    xPos: this._rand(0, this.canvas.width),
                    yPos: this._rand(0, this.canvas.height),
                    xVelocity: this._rand(this.minSpeed, this.maxSpeed),
                    yVelocity: this._rand(this.minSpeed, this.maxSpeed),
                    color: `rgba(${color}, ${this._rand(this.minOpacity, this.maxOpacity)})`
                };
            }
        };

        Particles.prototype.draw = function(particle, i){
            const ctx = this.ctx;
            if (this.blurry === true ) {
                const grd = ctx.createRadialGradient(particle[i].xPos, particle[i].yPos, particle[i].radius, particle[i].xPos, particle[i].yPos, particle[i].radius/1.25);
                grd.addColorStop(1.000, particle[i].color);
                grd.addColorStop(0.000, 'rgba(34, 34, 34, 0)');
                ctx.fillStyle = grd;
            } else {
                ctx.fillStyle = particle[i].color;
            }

            if (this.border === true) {
                ctx.strokeStyle = '#fff';
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(particle[i].xPos, particle[i].yPos, particle[i].radius, 0, 2 * Math.PI, false);
            ctx.fill();
        };

        Particles.prototype.animate = function(){
            const self = this;

            function animateParticles() {
                self.clearCanvas();

                for (let i = 0; i < self.numParticles; i++) {
                    self.particles[i].xPos += self.particles[i].xVelocity;
                    self.particles[i].yPos -= self.particles[i].yVelocity;

                    if (self.particles[i].xPos > self.canvas.width + self.particles[i].radius || self.particles[i].yPos > self.canvas.height + self.particles[i].radius) {
                        self.resetParticle(i);
                    } else {
                        self.draw(self.particles, i);
                    }
                }

                requestAnimationFrame(animateParticles); // Recursively call animate
            }

            animateParticles(); // Start animation
        };

        Particles.prototype.resetParticle = function (i) {
            const random = this._rand(0, 1);

            if (random > 0.5) {
                this.particles[i].xPos = -this.particles[i].radius;
                this.particles[i].yPos = this._rand(0, this.canvas.height);
            } else {
                this.particles[i].xPos = this._rand(0, this.canvas.width);
                this.particles[i].yPos = this.canvas.height + this.particles[i].radius;
            }

            this.draw(this.particles, i);
        };

        Particles.prototype.clearCanvas = function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the whole canvas
        };

        // Initialize particles
        new Particles().init();
    }, []);

    return <canvas id="canvas" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1 }}></canvas>;
};

export default CanvasAnimation;