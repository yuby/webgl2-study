class ShaderUtil {
  static domShaderSrc(id) {
    const elm = document.getElementById(id);
		if(!elm || elm.text == ""){ console.log(elmID + " shader not found or no text."); return null; }

		return elm.text.trim();
  }
   static createShader(gl, src, type) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
      console.error("Error compiling shader : " + src, gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
    }

    return shader;
   }

   static createProgram(gl, vShader, fShader, doValidate) {
    const program = gl.createProgram();

    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
			console.error("Error creating shader program.",gl.getProgramInfoLog(program));
			gl.deleteProgram(program); return null;
		}

		//Only do this for additional debugging.
		if(doValidate){
			gl.validateProgram(program);
			if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
				console.error("Error validating program", gl.getProgramInfoLog(program));
				gl.deleteProgram(program); return null;
			}
		}

    gl.detachShader(program, vShader);
		gl.detachShader(program, fShader);
		gl.deleteShader(fShader);
		gl.deleteShader(vShader);

    return program;
   }
}