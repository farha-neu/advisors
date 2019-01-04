 var y = parseInt(document.getElementById("boldstuff2").innerHTML);
    var flag4 = false;
    function increase2()
    {
      if(!flag4 && !flag5){
      y+=1;
      document.getElementById('boldstuff2').innerHTML= y;
      document.getElementById('thumbs-up2').src='images/thumbs-up-1.png';
      flag4 = true;
      }
      else if(flag4){
        y-=1;
        document.getElementById('boldstuff2').innerHTML= y;
        document.getElementById('thumbs-up2').src='images/thumbs-up.png';
        flag4=false;
      }
    }
    
    var c = parseInt(document.getElementById("b2").innerHTML);
    var flag5 = false;
    function decrease2()
    {
      if(!flag5 && !flag4){
        c+=1;
        document.getElementById('b2').innerHTML= c;
        document.getElementById('thumbs-down2').src='images/thumbs-down1.png';
        flag5 = true;
      }
      else if(flag5){
        c-=1;
        document.getElementById('b2').innerHTML= c;
        document.getElementById('thumbs-down2').src='images/thumbs-down.png';
        flag5=false;
      }
    }
     var i = parseInt(document.getElementById("boldstuff").innerHTML);
    var flag = false;
    function increase()
    {
      if(!flag && !flag2){
      i+=1;
      document.getElementById('boldstuff').innerHTML= i;
      document.getElementById('thumbs-up').src='images/thumbs-up-1.png';
      flag = true;
      }
      else if(flag){
        i-=1;
        document.getElementById('boldstuff').innerHTML= i;
         document.getElementById('thumbs-up').src='images/thumbs-up.png';
        flag=false;
      }
    }
    var x = parseInt(document.getElementById("boldstuff1").innerHTML);
    var flag1 = false;
    function increase1()
    {
      if(!flag1 && !flag3){
        x+=1;
        document.getElementById('boldstuff1').innerHTML= x;
        document.getElementById('thumbs-up1').src='images/thumbs-up-1.png';
        flag1 = true;
      }
      else if(flag1){
        x-=1;
        document.getElementById('boldstuff1').innerHTML= x;
        document.getElementById('thumbs-up1').src='images/thumbs-up.png';
        flag1=false;
      }
    }

    var a = parseInt(document.getElementById("b").innerHTML);
    var flag2 = false;
    function decrease()
    {
      if(!flag2 && !flag){
        a+=1;
        document.getElementById('b').innerHTML= a;
        document.getElementById('thumbs-down').src='images/thumbs-down1.png';
        flag2 = true;
      }
      else if(flag2){
        a-=1;
        document.getElementById('b').innerHTML= a;
        document.getElementById('thumbs-down').src='images/thumbs-down.png';
        flag2=false;
      }
    }
    var b = parseInt(document.getElementById("b1").innerHTML);
    var flag3 = false;
    function decrease1()
    {
      if(!flag3 && !flag1){
        b+=1;
        document.getElementById('b1').innerHTML= b;
        document.getElementById('thumbs-down1').src='images/thumbs-down1.png';
        flag3 = true;
      }
      else if(flag3){
        b-=1;
        document.getElementById('b1').innerHTML= b;
        document.getElementById('thumbs-down1').src='images/thumbs-down.png';
        flag3=false;
      }
    }

    function myFunction() {
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        window.setTimeout('window.open("add-comment.html", "_self")',2000);
    }