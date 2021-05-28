var gl = null;
var cone = null;
attribute vec4 vPosition;

void main() 
{
     Cone-vertex-shader = vPosition;
     Cone-fragment-shader = vec4(1.0, 0.0, 0.0, 1.0);
}
function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 0.0, 1.0, 0.0, 1.0 );
	cone = new Cone( gl, n);
    
	render();
}

function render() {
	cone.render(cone);
    gl.clear( gl.COLOR_BUFFER_BIT );
}

window.onload = init;
