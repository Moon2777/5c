import * as THREE from 'three';
import {OBJLoader} from 'three_objloader';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

main();

function main(){
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas, alpha: true});

  // Camera controls
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 75;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set( 0, 0, 0 );
  //camera.position.z = 10;

  // For rotating camera
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 1, 0);
  controls.update();

  // For render scene
  const scene = new THREE.Scene();




    // Ambient Light
    const a_color = 0xFFFFFF;
    const a_intensity = 0.125;
    const a_light = new THREE.AmbientLight(a_color, a_intensity);
    scene.add(a_light);

    // Directional Light
		const d_color = 0x001289;
    //const d_color = 0xFFFFFF;
		const d_intensity = 5;
		const d_light = new THREE.DirectionalLight( d_color, d_intensity );
		d_light.position.set( 1, 2, 0 );
		scene.add( d_light );

    const pointlights = [
      makeLight(0x00FFFF, 1, [1, 1, 1]),
      makeLight(0xFFFFFF, 1, [3, 1, 3]),
      makeLight(0xFFFF00, 1, [5, 1, 5])
    ]

    const offsets = [
      [1, 1, 1],
      [3, 1, 3],
      [5, 1, 5],
    ]

    pointlights.forEach((light, i) => {
      scene.add(light);
    });



  /*const boxWidth = 0.5;
  const boxHeight = 0.5;
  const boxDepth = 0.5;*/

  /*function makeCube(boxWidth, boxHeight, boxDepth){
    const geometry_cube = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    return geometry_cube;
  }*/
  //const geometry_cube = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeSphere(radius){
    const geometry_sphere = new THREE.SphereGeometry( radius, 16, 16 );
    return geometry_sphere;
  }
  //const geometry_sphere = new THREE.SphereGeometry( 0.5, 16, 16 );
  function makeCylinder(tRadius, bRadius, height){
    const geometry_cylinder = new THREE.CylinderGeometry(tRadius, bRadius, height);
    return geometry_cylinder;
  }
  //const geometry_cylinder = new THREE.CylinderGeometry(0.5, 0.5, boxHeight);
  function makeCone(radius, height, seg){
    const cone = new THREE.ConeGeometry( radius, height, seg );
    return cone;
  }


  const loader = new THREE.TextureLoader();

  const planeSize = 25;
  const f_texture = loader.load('../images/checker.png');
  f_texture.wrapS = THREE.RepeatWrapping;
  f_texture.wrapT = THREE.RepeatWrapping;
  f_texture.magFilter = THREE.NearestFilter;
  f_texture.colorSpace = THREE.SRGBColorSpace;
  const repeats = planeSize / 2;
  f_texture.repeat.set(repeats, repeats / 1.5);
  const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize/1.5 );
		const planeMat = new THREE.MeshPhongMaterial( {
			map: f_texture,
			side: THREE.DoubleSide,
		} );
    //console.log(planeGeo.attributes);
		const mesh = new THREE.Mesh( planeGeo, planeMat );
		mesh.rotation.x = Math.PI * - .5;
    mesh.position.z -= 5;
    //console.log(mesh.attributes);
		scene.add( mesh );


    const sandSize = 25;
    const f_texture2 = loader.load('../images/sand2.png');
    //f_texture2.wrapS = THREE.RepeatWrapping;
    //f_texture2.wrapT = THREE.RepeatWrapping;
    f_texture2.magFilter = THREE.NearestFilter;
    f_texture2.colorSpace = THREE.SRGBColorSpace;
    //const repeats2 = sandSize / 2;
    //f_texture2.repeat.set(sandSize, sandSize);
    const sandGeo = new THREE.PlaneGeometry( sandSize, sandSize/1.5 );
  		const sandMat = new THREE.MeshPhongMaterial( {
  			map: f_texture2,
  			side: THREE.DoubleSide,
  		} );
  		const sandMesh = new THREE.Mesh( sandGeo, sandMat );
  		sandMesh.rotation.x = Math.PI * - (.5 -.05);
      sandMesh.position.y -= 1.3;
      sandMesh.position.z += 11.55;
  		scene.add( sandMesh );

      //const seg = 3;
      const oceanSize = 25;
      const oceanGeo = new THREE.PlaneGeometry( oceanSize, oceanSize/1.5);
    	const oceanMat = make_material(0x4400E2);
      const oceanMesh = new THREE.Mesh( oceanGeo, oceanMat );
    	oceanMesh.rotation.x = Math.PI * - (.5);
      oceanMesh.position.y -= 1.5;
      oceanMesh.position.z += 11.55;

      scene.add(oceanMesh);

      //console.log(oceanGeo.attributes.position.array);
      //let vOcean = oceanGeo.attributes.position.array;
      //vOcean[0] = 10;
      //console.log(vOcean);

      //makeWaves(vOcean, seg, oceanSize, oceanSize/1.5);



  /*const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/wall.jpg' );
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.MeshBasicMaterial({
    map: texture
  });*/

  /*const materials = [
    new THREE.MeshBasicMaterial({map: loadColorTexture('../images/bocchi_1.jpg')}),
    new THREE.MeshBasicMaterial({map: loadColorTexture('../images/bocchi_2.jpg')}),
    new THREE.MeshBasicMaterial({map: loadColorTexture('../images/bocchi_3.png')}),
    new THREE.MeshBasicMaterial({map: loadColorTexture('../images/bocchi_4.jpg')}),
    new THREE.MeshBasicMaterial({map: loadColorTexture('../images/bocchi_5.jpg')}),
    new THREE.MeshBasicMaterial({map: loadColorTexture('../images/bocchi_6.png')}),
  ];*/


  function make_material(color){
    const material = new THREE.MeshPhongMaterial({color});
    return material;
  }

  /*const shapes = [
    makeInstance(geometry_cube,  [0,0.5,0], materials),
    makeInstance(geometry_sphere, [2,0.5,0],  make_material(0x8844aa) ),
    makeInstance(geometry_cylinder,  [-2,0.5,0], make_material(0xaa8844) ),
  ];*/

  const ff = [
    makeInstance(makeSphere(0.05), [0,1,0], make_material(0x00FFFF)),
    makeInstance(makeSphere(0.05), [0,1,0], make_material(0xFFFFFF)),
    makeInstance(makeSphere(0.05), [0,1,0], make_material(0xFFFF00)),
  ]

  const wd = [
    makeInstance(makeCylinder(0.05, 0.05, 1), [0,1,0], make_material(0x654321)),
    makeInstance(makeCylinder(0.05, 0.05, 1), [0,1,0], make_material(0x654321)),
    makeInstance(makeCylinder(0.05, 0.05, 1), [0,1,0], make_material(0x654321)),
    makeInstance(makeCylinder(0.05, 0.05, 1), [0,1,0], make_material(0x654321)),
  ]

  wd.forEach((item, i) => {
    item.rotation.x = ( (Math.PI/2) );
    item.rotation.z = ( i * (Math.PI/4) );

    item.position.y = 0;
    item.position.z = 1;
  });

  const fire = makeInstance(makeCone(1,1,4), [0,0,0], make_material(0xFF7F00));
  fire.position.y = -0.25;
  fire.position.z = 1;

  const fire_light = makeLight(0xFF7F00, 50, [0, 1, 1]);
  scene.add(fire_light);

  function makeTree(position){
    const b1 = makeInstance(makeCone(1,1,15), [0,0,0], make_material(0x007000));
    b1.position.x = position[0];
    b1.position.y = position[1] + 0.75;
    b1.position.z = position[2];
    //scene.add(b1);

    const b2 = makeInstance(makeCone(1,1,15), [0,0,0], make_material(0x007000));
    b2.position.x = position[0];
    b2.position.y = position[1] + 1.25;
    b2.position.z = position[2];
    //scene.add(b2);

    const b3 = makeInstance(makeCylinder(0.25,0.25,1.75), [0,0,0], make_material(0x533621));
    b3.position.x = position[0];
    b3.position.y = position[1] -0.5;
    b3.position.z = position[2];



    //return b1;
  }
  const stone = loader.load('../images/stone.webp');

  const stoneMat = new THREE.MeshPhongMaterial( {
    map: stone,
    side: THREE.DoubleSide,
  } );

  const base = makeInstance(makeCylinder(0.5,1.5,10), [-9,1,10], stoneMat);
  const lighthouse = new THREE.SpotLight(0xFAFFCB, 100);


  lighthouse.position.set(-9, 7, 10);
  lighthouse.target.position.set(0, -2,50);
  scene.add(lighthouse);
  scene.add(lighthouse.target)


  makeTree([10, 0.5, 0]);
  makeTree([5, 0.5, -9]);
  makeTree([-3, 0.5, 2]);
  makeTree([-7, 0.5, -4]);
  makeTree([0, 0.5, -6]);
  /*fire.scaleX = 0.25;
  fire.scaleY = 0.25;
  fire.scaleZ = 0.25;*/
  //fire.rotation.y = Math.PI / 2;



  //const cube = new THREE.Mesh(geometry, materials);
  //scene.add(cube);
  //cubes.push(cube);



  {
    const objLoader = new OBJLoader();
    const mltLoader = new MTLLoader();


    mltLoader.load('../../texturesChair/chair-for-videogame.mtl', (mtl) => {
      mtl.preload();
      objLoader.setMaterials(mtl);


      objLoader.load('../../texturesChair/chair-for-videogame.obj', (root) => {
        scene.add(root);
      });
    });
  }


  /*function updateCamera() {
    camera.updateProjectionMatrix();
  }*/

  /*const gui = new GUI();
  gui.add(camera, 'fov', 1, 180).onChange(updateCamera);
  const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
  gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(updateCamera);
  gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(updateCamera);*/



  function resizeRendererToDisplaySize( renderer ) {

  		const canvas = renderer.domElement;
  		const width = canvas.clientWidth;
  		const height = canvas.clientHeight;
  		const needResize = (canvas.width !== width) || (canvas.height !== height);

      if (needResize) {
  			renderer.setSize( width, height, false );
  		}

  		return needResize;
  	}

  //cube stuff
  function makeInstance(geometry, v, mat){


    const cube = new THREE.Mesh(geometry, mat);
    scene.add(cube);

    cube.position.x = v[0];
    cube.position.y = v[1];
    cube.position.z = v[2];

    return cube;
  }

  // light stuff
  function makeLight(color, intensity, position){

  const p_light = new THREE.PointLight(color, intensity);
  p_light.position.set(position[0], position[1], position[2]);

  return p_light;

  }

  function loadColorTexture(path){
    const texture = loader.load( path );
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
  }

  function render(time){
    time *= 0.001;
    //console.log(time);

    if (resizeRendererToDisplaySize( renderer )) {
			const canvas = renderer.domElement;
			camera.aspect = (canvas.clientWidth / canvas.clientHeight);
			camera.updateProjectionMatrix();
		}

    pointlights.forEach((light, i) => {
      let x = Math.cos(time);
      let z = Math.sin(time);
      let y = ((x**2) * (z ** 2));

      let offset = offsets[i];
      let ff_i = ff[i];

      let v;

      switch(i){
        case 0:
          v = pattern1(offsets[i], time);
          break;
        case 1:
          v = pattern2(offsets[i], time);
          break;
        case 2:
          v = pattern3(offsets[i], time);
          break;
      }

      //console.log(v);

      light.position.x = v[0];
      light.position.y = v[1];
      light.position.z = v[2];

      ff_i.position.x = v[0];
      ff_i.position.y = v[1];
      ff_i.position.z = v[2];

      /*light.position.x = (x * offset[0]);
      //light.position.y = (y * offset[1]);
      light.position.z = (z * offset[2]);

      ff_i.position.x = (x * offset[0]);
      //light.position.y = (y * offset[1]);
      ff_i.position.z = (z * offset[2]);*/

      //console.log(offset);
      //console.log(light.position);

    });
    /*let vOcean = oceanGeo.attributes.position;
    oceanGeo.needsUpdate;
    oceanGeo.attributes.position.set(makeWaves(vOcean));
    vOcean[0] = 10;
    vOcean[1] = 10;
    vOcean[2] = 10;
    console.log(vOcean);*/
    //oceanGeo.attributes.position.set(vOcean);
    //h

    oceanMesh.position.y = (0.5 * Math.sin(time * 0.5)) - 1.25;

    //let vOcean = oceanGeo.attributes.position.array;
    //oceanGeo.attributes.position.array.set(makeWaves(vOcean, seg, oceanSize, oceanSize/1.5, time));
    //oceanGeo.attributes.position.array.needsUpdate = true;
    //oceanMesh.needsUpdate = true;

    lighthouse.target.position.x = (10 * Math.sin(time));
    lighthouse.target.position.z = (49 + Math.sin(time));

    /*shapes.forEach( (cube,ndx ) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      //cube.rotation.x = rot;
      cube.rotation.y = rot;
    } );*/

    renderer.render( scene, camera );
    requestAnimationFrame( render );
  }

  requestAnimationFrame(render);

}
