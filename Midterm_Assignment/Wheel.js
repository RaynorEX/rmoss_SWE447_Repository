// Wheel.js //
var canvas;
var gl;

var wheelParts = {
	Hub : undefined,
	Spoke1 : undefined,
	Spoke2 : undefined,
	Spoke3 : undefined,
	Spoke4 : undefined,
	Tire : undefined
}

var V;
var P;
var near = 10;
var far = 120;

var time = 0.0;
var timeDelta = 0.5

function init() {
	canvas = document.getElementById("webgl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) { alert("WebGL initialization failed"); }

	
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.enable(gl.DEPTH_TEST);
	
	for (var name in wheelParts) {
		var wheel = wheelParts[name] = new Sphere();
		
		wheel.uniforms = {
			color : gl.getUniformLocation(wheel.program, "color"),
			MV : gl.getUniformLocation(wheel.program, "MV"),
			P : gl.getUniformLocation(wheel.program, "P"),
		};
	}
	
	resize();
	
	window.requestAnimationFrame(render);
}



function render (){
	time += timeDelta;
	
	var ms = new MatrixStack();
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	V = translate(0.0, 0.0, -0.5*(near+far));
	ms.load(V);
	
	var name, wheel, data;
	
	name = "Hub"
	wheel = wheelParts[name];
	data = wheelVars[name];
	
	wheel.PointMode = false;
	
	ms.push();
	ms.scale(data.radius);
	gl.useProgram(wheel.program);
	gl.uniformMatrix4fv(wheel.uniforms.MV, false, flatten(ms.current()));
	gl.uniformMatrix4fv(wheel.uniforms.P, false, flatten(P));
	gl.uniform4fv(wheel.uniforms.color, flatten(data.color));
	wheel.render();
	ms.pop();
	
	name = "Spoke1";
	wheel = wheelParts[name];
	data = wheelVars[name];
	axis = [0.0, 1.0, 0.0];
	wheel.PointMode = false;
	
	ms.push();
	ms.rotate(0, axis)
	ms.translate(0, data.distance, 0);
	ms.scale(data.radius);
	gl.useProgram(wheel.program);
	gl.uniformMatrix4fv(wheel.uniforms.MV, false, flatten(ms.current()));
	gl.uniformMatrix4fv(wheel.uniforms.P, false, flatten(P));
	gl.uniform4fv(wheel.uniforms.color, flatten(data.color));
	wheel.render();
	ms.pop();
	
	name = "Spoke2";
	wheel = wheelParts[name];
	data = wheelVars[name];
	axis = [0.0, 1.0, 0.0];
	wheel.PointMode = false;
	
	ms.push();
	ms.rotate(90, axis)
	ms.translate(0, -data.distance, 0);
	ms.scale(data.radius);
	gl.useProgram(wheel.program);
	gl.uniformMatrix4fv(wheel.uniforms.MV, false, flatten(ms.current()));
	gl.uniformMatrix4fv(wheel.uniforms.P, false, flatten(P));
	gl.uniform4fv(wheel.uniforms.color, flatten(data.color));
	wheel.render();
	ms.pop();
	
	name = "Spoke3";
	wheel = wheelParts[name];
	data = wheelVars[name];
	axis = [0.0, 1.0, 0.0];
	wheel.PointMode = false;
	
	ms.push();
	ms.rotate(180, axis)
	ms.translate(data.distance, 0, 0);
	ms.scale(data.radius);
	gl.useProgram(wheel.program);
	gl.uniformMatrix4fv(wheel.uniforms.MV, false, flatten(ms.current()));
	gl.uniformMatrix4fv(wheel.uniforms.P, false, flatten(P));
	gl.uniform4fv(wheel.uniforms.color, flatten(data.color));
	wheel.render();
	ms.pop();
	
	name = "Spoke4";
	wheel = wheelParts[name];
	data = wheelVars[name];
	axis = [0.0, 1.0, 0.0];
	wheel.PointMode = false;
	
	ms.push();
	ms.rotate(0, axis)
	ms.translate(data.distance, 0, 0);
	ms.scale(data.radius);
	gl.useProgram(wheel.program);
	gl.uniformMatrix4fv(wheel.uniforms.MV, false, flatten(ms.current()));
	gl.uniformMatrix4fv(wheel.uniforms.P, false, flatten(P));
	gl.uniform4fv(wheel.uniforms.color, flatten(data.color));
	wheel.render();
	ms.pop();
	
	name = "Tire";
	wheel = wheelParts[name];
	data = wheelVars[name];
	axis = [0.0, 1.0, 0.0];
	wheel.PointMode = false;
	
	ms.push();
	ms.rotate(0, axis)
	ms.translate(0, 0, data.distance);
	ms.scale(data.radius);
	gl.useProgram(wheel.program);
	gl.uniformMatrix4fv(wheel.uniforms.MV, false, flatten(ms.current()));
	gl.uniformMatrix4fv(wheel.uniforms.p, false, flatten(P));
	gl.uniform4fv(wheel.uniforms.color, flatten(data.color));
	wheel.render();
	ms.pop();
	
	window.requestAnimationFrame(render);
}

function resize() {
	var w = canvas.clientWidth;
	var h = canvas.clientHeight;
	
	gl.viewport (0, 0, w, h);
	
	var fovy = 100.0;
	var aspect = w / h;
	
	P = perspective(fovy, aspect, near, far);
}

window.onload = init;
window.onresize = resize;