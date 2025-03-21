class Shape
{
    constructor()
    {
        this.buffer=gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        this.vertCount = 0;
        //Now we want to add color to our vertices information.
        this.vertices = [];
        var circleVerts = 8;
        var degStep = (2 * Math.PI)/circleVerts;
        var radius = 0.25;
        var height = 0.5;
        var color = [Math.random(), Math.random(), Math.random()];
        var writeColor = [0, 0, 0];
        this.moveDir = Math.random() * 2 * Math.PI;
        for (let i = 0; i < 2; i++) 
        {
            for (let j = 0; j < circleVerts; j++)
            {
                if (j % 2 == 0) {
                    writeColor[0] = color[0];
                    writeColor[1] = color[1];
                    writeColor[2] = color[2];
                } else {
                    writeColor[0] = color[0] - 0.1;
                    writeColor[1] = color[1] - 0.1;
                    writeColor[2] = color[2] - 0.1;
                }
                this.vertices.push((radius * Math.sin(j * degStep)), (radius * Math.cos(j * degStep)), (i - 0.5) * height, writeColor[0], writeColor[1], writeColor[2]);
                this.vertices.push(0, 0, (i - 0.5) * height, writeColor[0], writeColor[1], writeColor[2]);
                this.vertices.push((radius * Math.sin((j + 1) * degStep)), (radius * Math.cos((j + 1) * degStep)), (i - 0.5) * height, writeColor[0], writeColor[1], writeColor[2]);
                this.vertCount += 3;

                if (i == 0) {
                    this.vertices.push((radius * Math.sin(j * degStep)), (radius * Math.cos(j * degStep)), (i - 0.5) * height, writeColor[0], writeColor[1], writeColor[2]);
                    this.vertices.push((radius * Math.sin((j + 1) * degStep)), (radius * Math.cos((j + 1) * degStep)), (i - 0.5) * height, writeColor[0], writeColor[1], writeColor[2]);
                    this.vertices.push((radius * Math.sin(j * degStep)), (radius * Math.cos(j * degStep)), (i + 0.5) * height, writeColor[0], writeColor[1], writeColor[2]);
                    this.vertCount += 3;

                    this.vertices.push((radius * Math.sin((j + 1) * degStep)), (radius * Math.cos((j + 1) * degStep)), (i - 0.5) * height, writeColor[0], writeColor[1], writeColor[2]);
                    this.vertices.push((radius * Math.sin(j * degStep)), (radius * Math.cos(j * degStep)), (i + 0.5) * height, writeColor[0], writeColor[1], writeColor[2]);
                    this.vertices.push((radius * Math.sin((j + 1) * degStep)), (radius * Math.cos((j + 1) * degStep)), (i + 0.5) * height, writeColor[0], writeColor[1], writeColor[2]);
                    this.vertCount += 3;
                }
            }
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        this.loc = [0.0,0.0,0.0];
        this.rot = [0.0,0.0,0.0];
    }
    //Again this could be inherited ... but not always...not all objects
    
    render(program)
    {
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        
        //First we bind the buffer
        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        var size = 3;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        
        //Now we have to do this for color
        var colorAttributeLocation = gl.getAttribLocation(program,"vert_color");
        //We don't have to bind because we already have the correct buffer bound.
        size = 3;
        type = gl.FLOAT;
        normalize = false;
        stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element
        offset = 3*Float32Array.BYTES_PER_ELEMENT;									//size of the offset
        gl.enableVertexAttribArray(colorAttributeLocation);
        gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);
                
        var tranLoc  = gl.getUniformLocation(program,'transform');
        gl.uniform3fv(tranLoc,new Float32Array(this.loc));
        var thetaLoc = gl.getUniformLocation(program,'rotation');
        gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
        
        
        var primitiveType = gl.TRIANGLES;
        offset = 0;
        gl.drawArrays(primitiveType, offset, this.vertCount);
    }
}

myWebGL = null;

function loop()
{
gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

m.myTriangle[0].rot[1] += 0.015;
m.myTriangle[1].rot[0] += 0.015;
m.myTriangle[2].rot[2] += 0.015;


for(var i = 0; i < m.myTriangle.length; i++)
{
    if (i >= 3) {
        var dir = m.myTriangle[i].moveDir;
        m.myTriangle[i].loc[0]+= .01 * Math.cos(dir);
        m.myTriangle[i].loc[1]+= .01 * Math.sin(dir);
    }
    //m.myTriangle[i].loc[1]+= .001;
    m.myTriangle[i].render(m.myWEBGL.program );
}
requestAnimationFrame(loop);
}

class main
{	
    constructor()
    {
    
    this.myWEBGL = new WebGL_Interface();
    myWebGL= this.myWEBGL;
    this.myTriangle = [];
    for (let i = 0; i < 3; i++) {
        var temp = new Shape();
        this.myTriangle.push(temp);
        switch(i)
        {
            case(0):
                temp.loc = [0,0.5,0];
                break;
            case(1):
                temp.loc = [0.5,-0.5,0];
                break;
            case(2):
                temp.loc = [-0.5,-0.5,0];
                break;
        }	
    }
    this.name = "My Class";

    }
    
    static canvasHandle(event)
    {
        var rect = canvas.getBoundingClientRect();
        var realX = event.clientX - rect.left;
        var realY = event.clientY - rect.top;
        console.log(realX + ", " + realY);
        var x = -1 + 2*event.clientX/myCanvas.width;
        var y = -1 + 2*(myCanvas.height - event.clientY)/myCanvas.height;
        var temp = new Shape();
        temp.loc = [0,0,0];
        temp.rot = [0.25 * Math.PI,0.25 * Math.PI,0];
        m.myTriangle.push(temp);
        //temp.render(myWebGL.program);
    }
}