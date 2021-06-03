<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/demo.css" type="text/css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/sweet-alert.css">
    <style type="text/css">
        body { margin: 0; padding: 0; position: relative;  background-position: center; /*background-repeat: no-repeat;*/ width: 100%; height: 100%; background-size: 100% 100%; }

    </style>

    <script type="text/javascript" src="${pageContext.request.contextPath}/static/js/jquery.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/static/js/awardRotate.js"></script>
    <script src="${pageContext.request.contextPath}/static/js/sweet-alert.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ThreeCanvas.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/static/js/Snow.js"></script>

    <script type="text/javascript">
        var SCREEN_WIDTH = window.innerWidth;//
        var SCREEN_HEIGHT = window.innerHeight;
        var container;
        var particle;//粒子

        var camera;
        var scene;
        var renderer;

        var starSnow = 1;

        var particles = [];

        var particleImage = new Image();
        //THREE.ImageUtils.loadTexture( "img/ParticleSmoke.png" );
        //particleImage.src = 'images/ParticleSmoke.png';



        function init() {
            //alert("message3");
            container = document.createElement('div');//container：画布实例;
            document.body.appendChild(container);

            camera = new THREE.PerspectiveCamera( 50, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
            camera.position.z = 1000;
            //camera.position.y = 50;

            scene = new THREE.Scene();
            scene.add(camera);

            renderer = new THREE.CanvasRenderer();
            renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
            var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
            //alert("message2");
            for (var i = 0; i < 260; i++) {
                //alert("message");
                particle = new Particle3D( material);
                particle.position.x = Math.random() * 2000-1000;

                particle.position.z = Math.random() * 2000-1000;
                particle.position.y = Math.random() * 2000-1000;
                //particle.position.y = Math.random() * (1600-particle.position.z)-1000;
                particle.scale.x = particle.scale.y = 0.5;
                scene.add( particle );

                particles.push(particle);
            }

            container.appendChild( renderer.domElement );


            //document.addEventListener( 'mousemove', onDocumentMouseMove, false );
            document.addEventListener( 'touchstart', onDocumentTouchStart, false );
            document.addEventListener( 'touchmove', onDocumentTouchMove, false );
            document.addEventListener( 'touchend', onDocumentTouchEnd, false );

            setInterval( loop, 1000 / 40 );

        }

        var touchStartX;
        var touchFlag = 0;//储存当前是否滑动的状态;
        var touchSensitive = 80;//检测滑动的灵敏度;
        //var touchStartY;
        //var touchEndX;
        //var touchEndY;
        function onDocumentTouchStart( event ) {

            if ( event.touches.length == 1 ) {

                event.preventDefault();//取消默认关联动作;
                touchStartX = 0;
                touchStartX = event.touches[ 0 ].pageX ;
                //touchStartY = event.touches[ 0 ].pageY ;
            }
        }


        function onDocumentTouchMove( event ) {

            if ( event.touches.length == 1 ) {
                event.preventDefault();
                var direction = event.touches[ 0 ].pageX - touchStartX;
                if (Math.abs(direction) > touchSensitive) {
                    if (direction>0) {touchFlag = 1;}
                    else if (direction<0) {touchFlag = -1;};
                    //changeAndBack(touchFlag);
                }
            }
        }

        function onDocumentTouchEnd (event) {
            // if ( event.touches.length == 0 ) {
            // 	event.preventDefault();
            // 	touchEndX = event.touches[ 0 ].pageX ;
            // 	touchEndY = event.touches[ 0 ].pageY ;

            // }这里存在问题
            var direction = event.changedTouches[ 0 ].pageX - touchStartX;

            changeAndBack(touchFlag);
        }


        function changeAndBack (touchFlag) {
            var speedX = 20*touchFlag;
            touchFlag = 0;
            for (var i = 0; i < particles.length; i++) {
                particles[i].velocity=new THREE.Vector3(speedX,-10,0);
            }
            var timeOut = setTimeout(";", 800);
            clearTimeout(timeOut);

            var clearI = setInterval(function () {
                if (touchFlag) {
                    clearInterval(clearI);
                    return;
                };
                speedX*=0.8;

                if (Math.abs(speedX)<=1.5) {
                    speedX=0;
                    clearInterval(clearI);
                };

                for (var i = 0; i < particles.length; i++) {
                    particles[i].velocity=new THREE.Vector3(speedX,-10,0);
                }
            },100);


        }


        function loop() {
            for(var i = 0; i<particles.length; i++){
                var particle = particles[i];
                particle.updatePhysics();

                with(particle.position)
                {
                    if((y<-1000)&&starSnow) {y+=2000;}

                    if(x>1000) x-=2000;
                    else if(x<-1000) x+=2000;
                    if(z>1000) z-=2000;
                    else if(z<-1000) z+=2000;
                }
            }

            camera.lookAt(scene.position);

            renderer.render( scene, camera );
        }
    </script>
    <script type="text/javascript">

        $(function (){

            var rotateTimeOut = function (){
                $('#rotate').rotate({
                    angle:0,
                    animateTo:2160,
                    duration:8000,
                    callback:function (){
                        alert('网络超时，请检查您的网络设置！');
                    }
                });
            };
            var bRotate = false;

            var rotateFn = function (awards, angles, txt){
                bRotate = !bRotate;
                $('#rotate').stopRotate();
                $('#rotate').rotate({
                    angle:0,
                    animateTo:angles+1800,
                    duration:8000,
                    callback:function (){
                        /*alert(txt);*/

                        swal({   title: "获得"+txt+"红包",   imageUrl: "${pageContext.request.contextPath}/static/images/gx.png" }
                            ,function () {
                                $.ajax({
                                    type:"POST",
                                    url:"${pageContext.request.contextPath}/result/save",
                                    data:{prize:txt},
                                    success:function (data) {
                                        if ("success" == data) {
                                            alert("抽奖成功");
                                        } else {
                                            alert("抽奖失败");
                                        }
                                        //location.reload();
                                    }
                                });
                            }
                        );

                        bRotate = !bRotate;
                    }
                })
            };

            document.onkeydown=function(event){
                var e = event || window.event || arguments.callee.caller.arguments[0];

                if(e && e.keyCode==32){ // enter 键
                    $('showSweetAlert').css("display","none");
                    $('sweet-overlay').css("display","none");

                    if(bRotate)return;
                    var item = rnd(1,5);

                    switch (item) {
                        case 1:
                            //var angle = [26, 88, 137, 185, 235, 287, 337];
                            rotateFn(1, 55, '888元');
                            break;
                        case 2:
                            //var angle = [88, 137, 185, 235, 287];
                            rotateFn(2, 140, '388元');
                            break;
                        case 3:
                            //var angle = [137, 185, 235, 287];
                            rotateFn(3, 199, '188元');
                            break;
                        case 4:
                            //var angle = [137, 185, 235, 287];
                            rotateFn(4, 269, '88元');
                            break;
                        case 5:
                            //var angle = [185, 235, 287];
                            rotateFn(5, 341, '8元');
                            break;

                    }

                    console.log(item);

                }
            };

            $('.pointer').click(function (){

                if(bRotate)return;
                var item = rnd(1,5);

                switch (item) {
                    case 1:
                        //var angle = [26, 88, 137, 185, 235, 287, 337];
                        rotateFn(1, 55, '888元');
                        break;
                    case 2:
                        //var angle = [88, 137, 185, 235, 287];
                        rotateFn(2, 140, '388元');
                        break;
                    case 3:
                        //var angle = [137, 185, 235, 287];
                        rotateFn(3, 199, '188元');
                        break;
                    case 4:
                        //var angle = [137, 185, 235, 287];
                        rotateFn(4, 269, '88元');
                        break;
                    case 5:
                        //var angle = [185, 235, 287];
                        rotateFn(5, 341, '8元');
                        break;

                }

                console.log(item);
            });
        });
        function rnd(n, m){
            return Math.floor(Math.random()*(m-n+1)+n)
        }
    </script>

</head>
<body bgcolor="#eae0d9" id="body" onLoad="init()">
<div class="couten" style="position:fixed; width:100%; margin:0 auto; text-align:center; padding-top:5%">
    <div class="turntable-bg">
        <!--<div class="mask"><img src="${pageContext.request.contextPath}/static/images/award_01.png"/></div>-->
        <div class="pointer"><img src="${pageContext.request.contextPath}/static/images/pointer.png" alt="pointer"/></div>
        <div class="rotate" ><img id="rotate" src="${pageContext.request.contextPath}/static/images/turntable.png" alt="turntable" ></div>
    </div>
</div>

</body>
</html>
