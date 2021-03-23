var message = [];
var dates = [];
class PublicMain {
    constructor(socket) {
        this.socket = socket;
        this.roomhost = location.pathname.split('/')[1];
        this.roomname = location.pathname.split('/')[2];
        this.roomid = 0;

        fetch('/apiaccount').then( (res) => res.json() ).then( (docs) => {
            console.log(docs);
            this.name = docs.name;
            this.color = docs.color;
            // document.getElementById("age").value = docs.age;
            // document.getElementById("pref").value = docs.pref;
            this.image = docs.image;
            
        });

        this.init();
    }

    init() {

        document.addEventListener('mousemove', event => this.onDocumentMouseMove(event), false);
        document.addEventListener('mousedown', event => this.onDocumentMouseDown(event), false);
        document.addEventListener('mouseup', event => this.onDocumentMouseUp(event), false);
        document.addEventListener('keydown', event => this.onDocumentKeyDown(event), false);
        document.addEventListener('keyup', event => this.onDocumentKeyUp(event), false);
        // document.addEventListener( 'scroll', onDocumentScroll, false );

        window.addEventListener('resize', event => this.onWindowResize(event), false);

        // this.renderer.setClearColor("#aaaaaa", 1.0);



        //   fetch('/apinew').then( (res) => res.json() ).then( (docs) => {
        //     console.log(docs)
        //     this.item1.setName(docs[0].roomhost + "/" + docs[0].roomname);
        //     this.item1.setVoxel(docs[0].voxel);
        //     if (docs.length >= 2) {
        //       this.item2.setName(docs[1].roomhost + "/" + docs[1].roomname);
        //       this.item2.setVoxel(docs[1].voxel);
        //       if (docs.length >= 3) {
        //         this.item3.setName(docs[2].roomhost + "/" + docs[2].roomname);
        //         this.item3.setVoxel(docs[2].voxel);
        //       }
        //     }
        //       // const array = [];
        //       // document.getElementById("publicroom").innerHTML = "<h1>public room</h1><br>";
        //       // for (const doc of docs) {
        //       //     if (doc.room) {
        //       //         for (const room of doc.room) {
        //       //             if (room.private == 1) {
        //       //             } else {
        //       //                 array.push({ date: room.date, account: doc.name, room: room.name});
        //       //             }
        //       //         }
        //       //     }
        //       // }
        //       // array.sort(function(a,b){
        //       //     return new Date(b.date) - new Date(a.date);
        //       // });
        //       // for (const a of array) {
        //       //     document.getElementById("publicroom").innerHTML += "<a href='" + location.href + a.account +'/' + a.room +"'>" + a.date + a.account + '/' + a.room + "<br>";
        //       // }
        //   });









        // document.getElementById("add1").addEventListener('click', () => {
        //   const voxels = this.item1.getVoxel();
        //   for (const voxel of voxels) {
        //     this.addVoxel(voxel);
        //   }

        //   this.socket.emit("puts",
        //   {
        //       userID: this.id,
        //       roomhost: this.roomhost,
        //       roomname: this.roomname,
        //       voxels: voxels,              
        //   }
        //   );

        //   // const voxels = [];
        //   // for (let i = 1; i < this.objects.length; ++i) {
        //   //   voxels.push({
        //   //     voxel: {
        //   //         x: Math.floor( this.objects[i].position.x / 50 ),
        //   //         y: Math.floor( this.objects[i].position.y / 50 ),
        //   //         z: Math.floor( this.objects[i].position.z / 50 ),
        //   //         m: this.objects[i].material.color,
        //   //         // i: this.materialIndex,
        //   //         a: this.objects[i].material.opacity,
        //   //     },
        //   //   });
        //   // }
        //   // this.item1.setVoxel(voxels);
        // }, false);
        // document.getElementById("add2").addEventListener('click', () => {
        //   const voxels = this.item2.getVoxel();
        //   for (const voxel of voxels) {
        //     this.addVoxel(voxel);
        //   }

        //   this.socket.emit("puts",
        //   {
        //       userID: this.id,
        //       roomhost: this.roomhost,
        //       roomname: this.roomname,
        //       voxels: voxels,              
        //   }
        //   );

        //   // const voxels = [];
        //   // for (let i = 1; i < this.objects.length; ++i) {
        //   //   voxels.push({
        //   //     voxel: {
        //   //         x: Math.floor( this.objects[i].position.x / 50 ),
        //   //         y: Math.floor( this.objects[i].position.y / 50 ),
        //   //         z: Math.floor( this.objects[i].position.z / 50 ),
        //   //         m: this.objects[i].material.color,
        //   //         // i: this.materialIndex,
        //   //         a: this.objects[i].material.opacity,
        //   //     },
        //   //   });
        //   // }
        //   // this.item2.setVoxel(voxels);
        // }, false);
        // document.getElementById("add3").addEventListener('click', () => {
        //   const voxels = this.item3.getVoxel();
        //   for (const voxel of voxels) {
        //     this.addVoxel(voxel);
        //   }

        //   this.socket.emit("puts",
        //   {
        //       userID: this.id,
        //       roomhost: this.roomhost,
        //       roomname: this.roomname,
        //       voxels: voxels,              
        //   }
        //   );

        //   // const voxels = [];
        //   // for (let i = 1; i < this.objects.length; ++i) {
        //   //   voxels.push({
        //   //     voxel: {
        //   //         x: Math.floor( this.objects[i].position.x / 50 ),
        //   //         y: Math.floor( this.objects[i].position.y / 50 ),
        //   //         z: Math.floor( this.objects[i].position.z / 50 ),
        //   //         m: this.objects[i].material.color,
        //   //         // i: this.materialIndex,
        //   //         a: this.objects[i].material.opacity,
        //   //     },
        //   //   });
        //   // }
        //   // this.item3.setVoxel(voxels);
        // }, false);
        // document.getElementById("color1").addEventListener('click', () => {
        //   this.rollOverMesh.material.color.set(document.getElementById("color1").value);
        //   this.cubeMaterial.push( new THREE.MeshLambertMaterial({ color: document.getElementById("color1").value, opacity: this.opacity, transparent: true  }) );
        //   this.materialIndex = this.cubeMaterial.length - 1;
        // }, false);
        // document.getElementById("color1").addEventListener('change', () => {
        //     this.rollOverMesh.material.color.set(document.getElementById("color1").value);
        //     this.cubeMaterial.push( new THREE.MeshLambertMaterial({ color: document.getElementById("color1").value, opacity: this.opacity, transparent: true  }) );
        //     this.materialIndex = this.cubeMaterial.length - 1;
        // }, false);
        // document.getElementById("alpha1").addEventListener('change', () => {
        //     this.opacity = document.getElementById("alpha1").value / 100;
        //     this.cubeMaterial.push( new THREE.MeshLambertMaterial({ color: document.getElementById("color1").value, opacity: this.opacity, transparent: true  }) );
        //     this.materialIndex = this.cubeMaterial.length - 1;
        // }, false);
        // document.getElementById("color2").addEventListener('click', () => {
        //     this.renderer.setClearColor(document.getElementById("color2").value, 1.0);
        //     this.render();
        // }, false);
        // document.getElementById("color2").addEventListener('change', () => {
        //     this.renderer.setClearColor(document.getElementById("color2").value, 1.0);
        //     this.render();
        // }, false);

        // document.getElementById("download").addEventListener('click', () => {

        //   const voxels = [];
        //   for (let i = 1; i < this.objects.length; ++i) {
        //     voxels.push({
        //       voxel: {
        //           x: Math.floor( this.objects[i].position.x / 50 ),
        //           y: Math.floor( this.objects[i].position.y / 50 ),
        //           z: Math.floor( this.objects[i].position.z / 50 ),
        //           m: this.objects[i].material.color,
        //           // i: this.materialIndex,
        //           a: this.objects[i].material.opacity,
        //       },
        //     });
        //   }
        //   // this.item1.setVoxel(voxels);




        //   const blob = new Blob([JSON.stringify(voxels)], {type: 'text/plain'});
        //   const url = URL.createObjectURL(blob);
        //   const a = document.createElement("a");
        //   document.body.appendChild(a);
        //   a.download = 'foo.txt';
        //   a.href = url;
        //   a.click();
        //   a.remove();
        //   URL.revokeObjectURL(url);
        // }, false);

        // this.camera.updateProjectionMatrix();
        // this.controls.update();

        this.socketio();


        this.loop();
    }

    setRoom(room) {
      console.log(room);
      for (const voxel of room.voxel) {
          this.addVoxel(voxel);
      }
    }

    addVoxel(data) {
        const geometry = new THREE.BoxGeometry(50, 50, 50, 2, 2, 2);
        const material = new THREE.MeshLambertMaterial( { color: data.m, opacity: data.a, transparent: true } );
        const box = new THREE.Mesh(geometry, material);
        box.position.set(data.x * 50, data.y * 50, data.z * 50);
        box.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
        this.scene.add(box);
//        var edges = new THREE.EdgesGeometory(box, 0x000000);
        var edges = new THREE.EdgesGeometry(this.cubeGeo);
        this.lineBox.push( new THREE.LineSegments( edges, new THREE.LineBasicMaterial({ color: 0x000000 })) );
        this.lineBox[this.lineBox.length - 1].position.set(data.x * 50, data.y * 50, data.z * 50);
        this.lineBox[this.lineBox.length - 1].position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
        this.scene.add(this.lineBox[this.lineBox.length - 1]);

        this.objects.push( box );
        this.objectsMaterial.push(this.cubeMaterial[this.materialIndex]);

    }

    socketio() {
        this.socket.on('getUserId', (data) => {
            console.log("getUserId" + data);
            this.id = data;
            this.socket.emit('getUserId', {userid: data, roomhost: this.roomhost, roomname: this.roomname});
        });
        this.socket.on('connected', data => {
            if (data.roomid == this.roomid) {
                let messgeUnit = "";
                message = data.message;
                let num = message.length;
                if (message.length > 20) {
                    num = message.length - 20;
                } else {
                    num = 0;
                }
                for (let i = message.length - 1; i >= num; --i) {
                    messgeUnit +=  "<div style='display:flex; margin:5px;'><img src='" + message[i].image + "' width='48px' height='48px' style='float:left; background:" + message[i].color + ";'>" + "<span style='font-size:8px'>" + message[i].name + "<br>" + message[i].date.substr(5,5) + " " + message[i].date.substr(11,5) + "</span>" + "<span style='color:" + message[i].color + "'>" + message[i].text + "</span></div>";
                }
                document.getElementById("chat").innerHTML = messgeUnit;
            }


            // if (data.room.voxel.length > 0) {
            //   for (const voxel of data.room.voxel) {
            //       this.addVoxel(voxel);
            //   }
            // } else {
            //   fetch('/apinum').then( (res) => res.json() ).then( (num) => {
            //       fetch('/api/' + num + location.pathname).then( (res) => res.json() ).then( (room) => {
            //           this.setRoom(room);
            //       });
            //   });
            // }

        });
        this.socket.on('put', (data) => {
            console.log(data);

            if (data.userID != this.id) {
                this.addVoxel(data.voxel[data.voxel.length - 1]);
            }
            // var voxel = data.voxel[data.voxel.length - 1];//new THREE.Mesh(this.cubeGeo, this.cubeMaterial[this.materialIndex]);
            // // voxel.position.copy(intersect.point).add(intersect.face.normal);
            // // voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
            // this.scene.add(voxel);
            // var edges = new THREE.EdgesGeometry(this.cubeGeo);
            // this.lineBox.push( new THREE.LineSegments( edges, new THREE.LineBasicMaterial({ color: 0x000000 })) );
            // this.lineBox[this.lineBox.length - 1].position.//copy( intersect.point ).add( intersect.face.normal );
            // this.lineBox[this.lineBox.length - 1].position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );						
            // this.scene.add(this.lineBox[this.lineBox.length - 1]);

            
            // this.objects.push(voxel);
            // this.objectsMaterial.push(this.cubeMaterial[this.materialIndex]);

        });






            // socket.on('getUserId', () => {
            //     socket.emit('getUserId', id);
            // });
            // socket.on('connected', data => {
            //     id = data.userID;
            //     roomid = data.roomID;
            //     console.log(id);
            //     connected = true;


            //     message.length = 0;
            //     message = [];
            //     let messgeUnit = "";
            //     for (let j = 0; j < data.room.message.length; ++j) {
            //         message.push(data.room.message[j]);
            //     }
            //     let num = message.length;
            //     if (message.length > 20) {
            //         num = message.length - 20;
            //     } else {
            //         num = 0;
            //     }
            //     for (let i = message.length - 1; i >= num; --i) {
            //         messgeUnit += message[i] + "<br>";
            //     }

            //     document.getElementById("chat").innerHTML = messgeUnit;

            // });





        this.socket.on("recieveMessage", (data) => {
                if (data.roomid == this.roomid) {
                    let messgeUnit = "";
                    message.push(data.message[0]);
                    let num = message.length;
                    if (message.length > 20) {
                        num = message.length - 20;
                    } else {
                        num = 0;
                    }
                    for (let i = message.length - 1; i >= num; --i) {
                        messgeUnit +=  "<div style='display:flex; margin:5px;'><img src='" + message[i].image + "' width='48px' height='48px' style='float:left; background:" + message[i].color + ";'>" + "<span style='font-size:8px'>" + message[i].name + "<br>" + message[i].date.substr(5,5) + " " + message[i].date.substr(11,5) + "</span>" + "<span style='color:" + message[i].color + "'>" + message[i].text + "</span></div>";
                    }
                    document.getElementById("chat").innerHTML = messgeUnit;
                }
            });





    }
    sendMessage() {

        const contents = [{
            text:  document.getElementById("message").value,
            date: new Date(),
            userid: this.id,
            name: this.name,
            color: this.color,
            image: this.image
        }];
        contents.push();
        this.socket.emit("sendMessage",
          {
              roomid: this.roomid,
              message: contents
          }
        );
        document.getElementById("message").value = "";
    }




    onWindowResize() {
        // this.camera.aspect = window.innerWidth / window.innerHeight;
        // this.camera.updateProjectionMatrix();
    
        // this.renderer.setSize(window.innerWidth, window.innerHeight);    
    }


    onDocumentMouseMove(event) {

    //     event.preventDefault();
    
    //     this.mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    
    //     this.raycaster.setFromCamera(this.mouse, this.camera);
    
    //     const intersects = this.raycaster.intersectObjects(this.objects);

    //     if (intersects.length > 0 && (intersects[0].object == this.plane || intersects[0].object == this.planeY ) ) {
    //       const intersect = intersects[ 0 ];
    //       this.rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
    //       this.rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

    //     }
    
    //     if (this.isShiftDown == false && intersects.length > 0) {
    
    //       const intersect = intersects[ 0 ];
    //       this.rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
    //       this.rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
    
    //     }
    

    //     if (this.isShiftDown && this.isMouseDown &&

    //       !(
    //         this.rollOverMesh.position.x == this.rollOverMeshBeforePos.x &&
    //         this.rollOverMesh.position.y == this.rollOverMeshBeforePos.y &&
    //         this.rollOverMesh.position.z == this.rollOverMeshBeforePos.z
    //         )


    //       ) {
    
    //         this.rollOverMeshBeforePos.set(this.rollOverMesh.position.x, this.rollOverMesh.position.y, this.rollOverMesh.position.z);
    
    //       event.preventDefault();
    
    //       this.mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    
    //       this.raycaster.setFromCamera(this.mouse, this.camera);
    
    //       const intersects = this.raycaster.intersectObjects(this.objects);
    
    //       if (intersects.length > 0) {
    
    //         const intersect = intersects[ 0 ];
    
    //         // delete cube
    
    //         if (this.anglePutFlag) {
    
    //           if (intersect.object !== this.plane) {
    
    //             this.scene.remove(intersect.object);
    
    //             this.objectsMaterial.splice(this.objectsMaterial.indexOf(intersect.object.material), 1);
    //             this.objects.splice(this.objects.indexOf(intersect.object), 1);
    
    //           }
    
    //           // create cube
    
    //         } else {
    
    //           if (this.colorChangeFlag) {
    //             if (intersect.object !== this.plane) {
    //               this.objects[ this.objects.indexOf(intersect.object) ].material = this.cubeMaterial[this.materialIndex];
    //             }
    //           } else {
    //             var voxel = new THREE.Mesh(this.cubeGeo, this.cubeMaterial[this.materialIndex]);
    //             voxel.position.copy(intersect.point).add(intersect.face.normal);
    //             voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
    //             this.scene.add(voxel);
    //             var edges = new THREE.EdgesGeometry(this.cubeGeo);
    //             this.lineBox.push( new THREE.LineSegments( edges, new THREE.LineBasicMaterial({ color: 0x000000 })) );
    //             this.lineBox[this.lineBox.length - 1].position.copy( intersect.point ).add( intersect.face.normal );
    //             this.lineBox[this.lineBox.length - 1].position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );						
    //             this.scene.add(this.lineBox[this.lineBox.length - 1]);

                
    //             this.objects.push(voxel);
    //             this.objectsMaterial.push(this.cubeMaterial[this.materialIndex]);

    //             this.socket.emit("put",
    //             {
    //                 userID: this.id,
    //                 roomhost: this.roomhost,
    //                 roomname: this.roomname,
    //                 voxel: {
    //                     x: Math.floor( voxel.position.x / 50 ),
    //                     y: Math.floor( voxel.position.y / 50 ),
    //                     z: Math.floor( voxel.position.z / 50 ),
    //                     m: voxel.material.color,
    //                     i: this.materialIndex,
    //                     a: this.opacity,
    //                 },
                    
    //             }
    //             );
    //           }
    
    //         }
    
    // //        this.render();
    
    //       }
    //     }





    //     this.render();
    
        // if (isShiftDown) {
        //     cameraAngle += mouse.x + mouse.y;
        //     camera.position.set(cameraZoom * Math.cos(Math.PI / 180.0 * cameraAngle), cameraZoom, cameraZoom * Math.sin(Math.PI / 180.0 * cameraAngle));
        //     camera.lookAt(0, 0, 0);
        // }
      }
    
    onDocumentMouseDown(event) {
    //   this.isMouseDown = true;
    //     if (this.isShiftDown) {
    
    
    //       event.preventDefault();
    
    //       this.mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    
    //       this.raycaster.setFromCamera(this.mouse, this.camera);
    
    //       var intersects = this.raycaster.intersectObjects(this.objects);
    
    //       if (intersects.length > 0) {
    
    //         var intersect = intersects[ 0 ];
    
    //         // delete cube
    
    //         if (this.anglePutFlag) {
    
    //           if (intersect.object !== this.plane) {
    
    //             this.scene.remove(intersect.object);
    
    //             this.objectsMaterial.splice(this.objectsMaterial.indexOf(intersect.object.material), 1);
    //             this.objects.splice(this.objects.indexOf(intersect.object), 1);
    
    //           }
    
    //           // create cube
    
    //         } else {
    
    //           if (this.colorChangeFlag) {
    //             if (intersect.object !== this.plane) {
    //               this.objects[ this.objects.indexOf(intersect.object) ].material = this.cubeMaterial[this.materialIndex];
    //             }
    //           } else {
    //             var voxel = new THREE.Mesh(this.cubeGeo, this.cubeMaterial[this.materialIndex]);
    //             voxel.position.copy(intersect.point).add(intersect.face.normal);
    //             voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
    //             this.scene.add(voxel);
    //             var edges = new THREE.EdgesGeometry(this.cubeGeo);
    //             this.lineBox.push( new THREE.LineSegments( edges, new THREE.LineBasicMaterial({ color: 0x000000 })) );
    //             this.lineBox[this.lineBox.length - 1].position.copy( intersect.point ).add( intersect.face.normal );
    //             this.lineBox[this.lineBox.length - 1].position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );						
    //             this.scene.add(this.lineBox[this.lineBox.length - 1]);

                
    //             this.objects.push(voxel);
    //             this.objectsMaterial.push(this.cubeMaterial[this.materialIndex]);

    //             this.socket.emit("put",
    //             {
    //                 userID: this.id,
    //                 roomhost: this.roomhost,
    //                 roomname: this.roomname,
    //                 voxel: {
    //                     x: Math.floor( voxel.position.x / 50 ),
    //                     y: Math.floor( voxel.position.y / 50 ),
    //                     z: Math.floor( voxel.position.z / 50 ),
    //                     m: voxel.material.color,
    //                     i: this.materialIndex,
    //                     a: this.opacity,
    //                 },
                    
    //             }
    //             );
    //           }
    
    //         }
    
    //         this.render();
    
    //       }
    //     }
    
    }
    onDocumentMouseUp(event) {
    //   this.isMouseDown = false;
    }
    onDocumentKeyDown(event) {
    
    //   switch (event.keyCode) {
  
    //     case 16: this.isShiftDown = true; this.controls.enabled = false; break;
    //     case 38:
    //       this.isUpKeyDown = true;
    //       if (this.isShiftDown) {
    //         this.plane.position.y += 50.0;
    //         this.gridHelper.position.y += 50.0;
    //       } else {
    //         this.planeY.position.x -= 50.0;
    //         this.gridHelperY.position.x -= 50.0;
    //       }  
    //       break;
    //     case 40:
    //       this.isDownKeyDown = true;
    //       if (this.isShiftDown) {
    //         this.plane.position.y -= 50.0;
    //         this.gridHelper.position.y -= 50.0;
    //       } else {
    //         this.planeY.position.x += 50.0;
    //         this.gridHelperY.position.x += 50.0;
    //       }  
    //       break;
  
    //   }
  
    }
  
    onDocumentKeyUp(event) {
  
    //   switch (event.keyCode) {
  
    //     case 16: this.isShiftDown = false; this.controls.enabled = true; break;
    //     case 38: this.isUpKeyDown = false; break;
    //     case 40: this.isDownKeyDown = true; break;
  
    //   }
  
    }
  

    render() {
//        this.renderer.setClearColor("#aaaaaa", 1.0);
        // this.renderer.render(this.scene, this.camera);
    }
    
    loop() {
        // this.render();
        var self = this;
        requestAnimationFrame(function(){ self.loop(); });
    }
}