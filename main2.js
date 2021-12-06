function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // Kotak kiri 
    const kotak1 = {
        colorAtas : [0.578, 0.156, 0.600], // warna  kotak atas (ungu)
        colorBawah : [0.156, 0.430, 0.600], // warna kotak bawah (biru)

        // titik-titik penyusun gambar kiri
        A : [-0.654, -0.388],
        B : [-0.023, -0.306],
        C : [-0.669, -0.111],
        D : [-0.023, -0.091],
        E : [-0.654, 0.412],
        F : [-0.095, 0.429]
        
    }

    // Kotak kanan
    const kotak2 = { 
        colorAtas : [0.578, 0.156, 0.600], // warna  kotak atas (ungu)
        colorBawah : [0.156, 0.430, 0.600], // warna kotak bawah (biru)

        // titik-titik penyusun gambar kanan
        A : [0.360, -0.343],
        B : [0.654, -0.480],
        C : [0.360, -0.091],
        D : [0.654, -0.232],
        E : [0.641, 0.146],
        F : [0.907, 0.045],
        G : [0.907, -0.230]
        
    }

    // kumpulan vertex pada gambar kiri dan kanan
    const vertices = [
        // objek kotak kiri
        ...kotak1.A, ...kotak1.colorAtas,
        ...kotak1.C, ...kotak1.colorAtas,
        ...kotak1.E, ...kotak1.colorAtas,
        ...kotak1.A, ...kotak1.colorAtas,
        ...kotak1.B, ...kotak1.colorAtas,
        ...kotak1.E, ...kotak1.colorAtas, 
        ...kotak1.B, ...kotak1.colorAtas,
        ...kotak1.D, ...kotak1.colorAtas,
        ...kotak1.E, ...kotak1.colorAtas, //warna biru atas //9

        ...kotak1.C, ...kotak1.colorBawah,
        ...kotak1.E, ...kotak1.colorBawah,
        ...kotak1.F, ...kotak1.colorBawah, 
        ...kotak1.D, ...kotak1.colorBawah,
        ...kotak1.E, ...kotak1.colorBawah,
        ...kotak1.G, ...kotak1.colorBawah,
        ...kotak1.E, ...kotak1.colorBawah,
        ...kotak1.F, ...kotak1.colorBawah,
        ...kotak1.G, ...kotak1.colorBawah, 
        ...kotak1.F, ...kotak1.colorBawah,
        ...kotak1.H, ...kotak1.colorBawah,
        ...kotak1.G, ...kotak1.colorBawah,
        ...kotak1.G, ...kotak1.colorBawah,
        ...kotak1.H, ...kotak1.colorBawah,
        ...kotak1.I, ...kotak1.colorBawah, //warna biru bawah //15
       
        // objek kotak kanan
        ...kotak2.A, ...kotak2.colorAtas,
        ...kotak2.C, ...kotak2.colorAtas,
        ...kotak2.D, ...kotak2.colorAtas,
        ...kotak2.C, ...kotak2.colorAtas,
        ...kotak2.D, ...kotak2.colorAtas,
        ...kotak2.H, ...kotak2.colorAtas, 

        ...kotak2.A, ...kotak2.colorAtas,
        ...kotak2.D, ...kotak2.colorAtas,
        ...kotak2.E, ...kotak2.colorAtas, 
        ...kotak2.A, ...kotak2.colorAtas,
        ...kotak2.B, ...kotak2.colorAtas,
        ...kotak2.E, ...kotak2.colorAtas,
        ...kotak2.B, ...kotak2.colorAtas,
        ...kotak2.E, ...kotak2.colorAtas,
        ...kotak2.F, ...kotak2.colorAtas, //9
        
        ...kotak2.D, ...kotak2.colorBawah,
        ...kotak2.G, ...kotak2.colorBawah,
        ...kotak2.I, ...kotak2.colorBawah,
        ...kotak2.G, ...kotak2.colorBawah,
        ...kotak2.H, ...kotak2.colorBawah,
        ...kotak2.K, ...kotak2.colorBawah, 
        ...kotak2.G, ...kotak2.colorBawah,
        ...kotak2.I, ...kotak2.colorBawah,
        ...kotak2.K, ...kotak2.colorBawah, //9

        ...kotak2.D, ...kotak2.colorBawah,
        ...kotak2.E, ...kotak2.colorBawah,
        ...kotak2.I, ...kotak2.colorBawah, 
        ...kotak2.E, ...kotak2.colorBawah,
        ...kotak2.I, ...kotak2.colorBawah,
        ...kotak2.J, ...kotak2.colorBawah,
        ...kotak2.E, ...kotak2.colorBawah,
        ...kotak2.F, ...kotak2.colorBawah,
        ...kotak2.J, ...kotak2.colorBawah, //9

        ...kotak2.I, ...kotak2.colorBawah,
        ...kotak2.J, ...kotak2.colorBawah,
        ...kotak2.L, ...kotak2.colorBawah,
        ...kotak2.I, ...kotak2.colorBawah,
        ...kotak2.K, ...kotak2.colorBawah,
        ...kotak2.L, ...kotak2.colorBawah, //6   
    ]

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

    gl.useProgram(shaderProgram);

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    var freeze = false;
    // Interactive graphics with mouse
    function onMouseClick(event) {
        freeze = !freeze;
    }
    document.addEventListener("click", onMouseClick);
    // Interactive graphics with keyboard
    function onKeydown(event) {
        if (event.keyCode == 32) freeze = true;
    }

    function onKeyup(event) {
        if (event.keyCode == 32) freeze = false;
    }
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);

    //Kecepatan  (NRP 0092 - Maxi)
    var speed = 0.0092;
    var change = 0;
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");

    function moveVertices() {
        if (vertices[206] < -1.0 || vertices[176] > 1.0) {
            speed = speed * -1; 
        }

        for (let i = 121; i < vertices.length; i += 5) { 
            vertices[i] = vertices[i] + speed; 
        }
    }

    function render() {
        moveVertices();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        change = change + speed;
        gl.uniform1f(uChange, change);

        gl.clearColor(0.910, 0.827, 0.555, 1.0); //warna krem
        gl.clear(gl.COLOR_BUFFER_BIT);
        var primitive = gl.TRIANGLES;
        var offset = 0;
        var nVertex = 63; 
        gl.drawArrays(primitive, offset, nVertex);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
