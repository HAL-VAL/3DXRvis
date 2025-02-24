import * as THREE from 'three';
//import { OrbitControls } from "controls/OrbitControls.js";
// Ex1をやろうとしてる

/* シーンの実装 */
const scene = new THREE.Scene();

/* カメラの実装 */
// カメラはデフォルトで、Yを上にして-Z軸を見下ろします。
const camera = new THREE.PerspectiveCamera(
  75, //fov: 垂直方向に75度
  window.innerWidth / window.innerHeight, //aspect: デフォルトは300/150
  // 300x150pixel
  0.1, // near
  1000 // far
  // nearとfarはレンダリングされるカメラの前のスペース
);


/* レンダラーの実装 */
// const canvasElement = document.querySelector('#myCanvas') // 追加部分？
const canvas = document.querySelector('#c') // three.jsの基礎知識より
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});               // インスタンスの生成
/*
const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
});               // インスタンスの生成
*/
renderer.setSize(window.innerWidth, window.innerHeight);  // サイズの設定
document.body.appendChild(renderer.domElement);           // HTMLへの追加

/* ライトの実装 */
const color = 0xFFFFFF;                                     // 光の色
const intensity = 3;                                        // 光の強度
const light = new THREE.DirectionalLight(color, intensity); // ライトの生成
light.position.set(0, 0, 5);                                // ライトの配置
scene.add(light);                                           // シーンへの追加

/* シーンの背景色を変更 */
scene.background = new THREE.Color(0xAAAAAA); // ライトグレーの背景　背景色を16進数で設定　　0xffffff


/* 描画オブジェクトの実装 */
// 1つ目
const geometry_1 = new THREE.BoxGeometry(1, 1, 1);                    // ジオメトリの生成
const material_1 = new THREE.MeshStandardMaterial({ color: 0xff0000 });         // マテリアルの生成
const cube_1 = new THREE.Mesh(geometry_1, material_1);                    // メッシュの生成
scene.add(cube_1);                                                    // シーンへの追加

// 2つ目
const geometry_2 = new THREE.BoxGeometry(1, 1, 1);                    // ジオメトリの生成
const material_2 = new THREE.MeshStandardMaterial({ color: 0x00ff00 });         // マテリアルの生成
const cube_2 = new THREE.Mesh(geometry_2, material_2);                    // メッシュの生成
scene.add(cube_2);  

// 3つ目
const geometry_3 = new THREE.BoxGeometry(1, 1, 1);                    // ジオメトリの生成
const material_3 = new THREE.MeshStandardMaterial({ color: 0x0000ff });         // マテリアルの生成
const cube_3 = new THREE.Mesh(geometry_3, material_3);                    // メッシュの生成
scene.add(cube_3);

// オブジェクトの位置
cube_1.position.set(0, 0, 0); // Move the cube to the left
cube_2.position.set(0, 2, 1); // Move the sphere upward and slightly forward
cube_3.position.set(0, -1, -2); // Move the cone to the right and downward

//軸を追加する。
const axesHelper = new THREE.AxesHelper( 1000 ); // X軸:赤 Y軸:緑 Z軸:青
scene.add( axesHelper );


//グリッドを追加する。
const gridHelper = new THREE.GridHelper(2000, 500) //, 0x0000ff
// GridHelper (サイズ、分割数、colorCenterLine、colorGrid)
scene.add(gridHelper);


/* カメラの移動 */
camera.position.set(-3, 3, 20); //5, 5, 10
/* カメラのコントローラを作成 */
//const controls = new OrbitControls(camera, canvasElement);
camera.lookAt(0, 0, 0);


function main(){
    renderer.render(scene, camera);
}

/* アニメーション関数の定義 */
function animate() {
  requestAnimationFrame(animate); // 定期的な関数呼び出し

  /* 回転するアニメーション処理 */
  cube_1.rotation.x += 0.01;  // x軸方向
  cube_1.rotation.y += 0.01;  // y軸方向

  /* 再レンダリング */
  renderer.render(scene, camera);
}

animate(); // アニメーション関数の実行

//main();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    });
