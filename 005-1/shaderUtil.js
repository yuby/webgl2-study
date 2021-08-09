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

  static async shaderLoader(file) {
    const resp = await fetch(file);
    const shaderStr = await resp.text();

    return shaderStr
  }

  static async domShaderProgram(gl, vectFile, fragFile, doValidate) {
    const vShaderTxt = await ShaderUtil.shaderLoader(vectFile);
    const fShaderTxt = await ShaderUtil.shaderLoader(fragFile);
    const vShader = ShaderUtil.createShader(gl, vShaderTxt, gl.VERTEX_SHADER);
    const fShader = ShaderUtil.createShader(gl, fShaderTxt, gl.FRAGMENT_SHADER);

    const shaderProgram = ShaderUtil.createProgram(gl, vShader, fShader, doValidate);

    return shaderProgram;
  }

  static creatProgramFromSource(gl, vertSrc, fragSrc, doValidate) {
    const vShader = ShaderUtil.createShader(gl, vertSrc, gl.VERTEX_SHADER);
    const fShader = ShaderUtil.createShader(gl, fragSrc, gl.FRAGMENT_SHADER);

    return ShaderUtil.createProgram(gl, vShader, fShader, doValidate);
  }

  static getStandardAttribLocation(gl, program) {
    return {
      position: gl.getAttribLocation(program, ATTR_POSITION_NAME),
      norm: gl.getAttribLocation(program, ATTR_NORMAL_NAME),
      uv: gl.getAttribLocation(program, ATTR_UV_NAME),
    }
  }
}