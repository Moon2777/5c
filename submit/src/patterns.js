function pattern1(radius, time){
  let c = Math.cos(time);
  let s = Math.sin(time);

  let x = c;
  let z = s;
  let y = ((c ** 2) * (s ** 2));

  let v = [radius[0] * x, radius[1] * z + 1.25, radius[2] * y];

  return v;
}

function pattern2(radius, time){
  let c = Math.cos(3 * time);
  let s = Math.sin(2 * time);

  let x = c * (s ** 2);
  let z = s * (c ** 2);
  let y = (s ** 2);

  let v = [radius[0] * x, radius[1] * z + 1, radius[2] * y];
  return v;
}

function pattern3(radius, time){
  let c = Math.cos(time);
  let s = Math.sin(time);

  let x = c;
  let z = s;
  let y = c * s;

  let v = [radius[0] * x, radius[1] * z + 1, radius[2] * y];
  return v;
}

function makeWaves(seg, length, width, time){
  //console.log("Length of waves: ", vWaves.length);

  let a = ( (seg ** 2) * 18 );
  //console.log("predicted: ", a);

  let v = new Float32Array(a);
  let portion = length/seg;

  //console.log(portion);
  //return;

  let place = 0;
  for(let i = -(length/2); i < (length/2); i+=portion){
    for(let j = -(width/2); j < (width/2); j+=portion){
      console.log(i, j);
      //continue;
      // vertex 1
      v[place]   = i;
      v[place+1] = j;
      v[place+2] = 0;

      v[place+3] = (i -= portion);
      v[place+4] = j;
      v[place+5] = 0;

      v[place+6] = i;
      v[place+7] = (j -= portion);
      v[place+8] = 0;

      /*// vertex 2
      v[place+9] = (i += portion);
      v[place+10] = j;
      v[place+11] = 0;

      v[place+12] = i;
      v[place+13] = (j -= portion);
      v[place+14] = 0;

      v[place+15] = (i -= portion);
      v[place+16] = (j -= portion);
      v[place+17] = 0;

      place+=18;*/

    }
    //continue;
  }

  //console.log(v);
  return v;
  //console.log(vWaves[3]);
}
