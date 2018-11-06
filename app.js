var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'SpotiPAY',
  // App id
  id: 'com.ismailbgr.spotipay',
  // Versiyon ?
  version:"Kapalı Beta 0.0.2a",

  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
  {
      name: 'signup',
      path: '/signup/',
      url: 'signup.html',
    },

    {
      name: 'login',
      path: '/login/',
      url: 'loginscr.html',
    },

    {
      name: 'about',
      path: '/about/',
      url: 'about.html',
    },
    
    {
      name: 'main',
      path: '/main/',
      url: 'main.html',
    },
    {
      name: 'admin',
      path: '/admin/',
      url: 'admin.html',
    },
    {
      name: 'settings',
      path: '/settings/',
      url: 'settings.html',
    },
  
  
  ],
  
    statusbar: {
    iosOverlaysWebview: true,
  },

 methods: {
    alert: function() {
      app.dialog.alert('Hello World');
    }
  },

  panel: {
    swipe: 'left',
  }

});

          var mainView = app.views.create('.view-main');


/*
Tarayıcı Manipülasyonları

*/




function alert(x,y,z,t) {
  app.dialog.alert(x,y,z,t);
  console.warn("Yanlış Fonksiyon Kullanıldı Lütfen Düzeltin");
}










/*

 SETTINGS AREA

This area Holds Settings functions


*/

var SETTINGS_SAVE;

function SETTINGS_Load() {
  
window.localStorage.SPSettings = window.localStorage.SPSettings || JSON.stringify({dark:true});


SETTINGS_SAVE = JSON.parse(localStorage.SPSettings);





  SETTINGS_Update();
}





function SETTINGS_Open(argument) {

  app.dialog.preloader("Yükleniyor...");
  app.router.navigate('/settings/');
  setTimeout(function() {

    


    if(SETTINGS_SAVE.dark == true){
document.getElementById("darkcheck").checked = true;

}else{

}

app.dialog.close();



  },1000);
}


function SETTINGS_Update(argument) {


  if( SETTINGS_SAVE.dark == true){
      document.getElementById("app").classList.add("theme-dark");
  //document.getElementById("app").classList.add("color-theme-green");
}else{
    document.getElementById("app").classList.remove("theme-dark");
  //document.getElementById("app").classList.remove("color-theme-green");
}


}


function SETTINGS_Dark(argument) {
  console.log(argument);
if (argument) {
  SETTINGS_SAVE.dark = true;
}else{
  SETTINGS_SAVE.dark = false;
}

localStorage.SPSettings = JSON.stringify(SETTINGS_SAVE);

SETTINGS_Update();
}






SETTINGS_Load();


SETTINGS_Update();







//Settings Area Over




//LOG İN OUT////////////////////////////////////

  
function login(x,y) {
    app.dialog.preloader("Lütfen Bekleyin");
    firebase.auth().signInWithEmailAndPassword(x, y).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  app.dialog.alert(error.message);
  }).then(function() {
    app.dialog.close();
  });

}

function logout() {

 app.dialog.alert('Çıkış Yapıldı','Çıkış Yap',function(){
  firebase.auth().signOut();
    location.reload();
  });
    }

    function signup(argument) {
app.dialog.prompt("Şu Anda Kapalı Betadayız ve Yeni Kayıt Kabul Etmiyoruz. Eğer Kayıt Kodunuz Varsa Giriniz","İzin Verilmedi",(x)=>{

firebase.database().ref("/options/signcode").once("value").then((snapshot)=>{
  

  if(x == snapshot.val()){
    app.router.navigate('/signup/',{
        ignoreCache: true,
      })
    }else{app.dialog.alert("Kod Yanlış!!!")}

})

  
});

//       app.router.navigate('/signup/',{
//   ignoreCache: true,
// })
    }


/////////////////////////////////////////////////



  function loginscr() {
    app.router.navigate("/login/",{
  ignoreCache: true,
});
  }


function reqpay() {
  app.dialog.preloader("İstek İşleniyor...");
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/request').set(true).catch(function(e) {
   app.dialog.close();
   app.dialog.alert("Bir Hata Oluştu");
  }).then(function (e) {
   app.dialog.close();
   app.dialog.alert("İstek Gönderildi");
   //document.getElementById("reqbtn").disabled = true;
   //document.getElementById("reqbtn").classList.add("disabled")
   //document.getElementById("reqbtn").innerHTML = "Ödeme Güncelleme Talebi İşlemde"
  });
}

function removepay(argument) {

  app.dialog.preloader("İstek İşleniyor...");
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/request').set(false).catch(function(e) {
   app.dialog.close();
   app.dialog.alert("Bir Hata Oluştu");
  }).then(function (e) {
   app.dialog.close();
   app.dialog.alert("İstek Silindi");
  });

}

      function signin(name,surname,email,pass) {

        app.dialog.preloader("Lütfen Bekleyin");

        firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  app.dialog.alert(error.message);
  app.dialog.close();

          }).then(function() {
            firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/').set({
  isim: name,
  soyisim: surname
});
            app.dialog.close();
          });
      }











            var $$ = Dom7;
var $ptrContent = $$('.ptr-content');

$ptrContent.on('ptr:refresh', function (e) {
setTimeout(function(){
  app.ptr.done();
  location.reload(true);
},2000)
})

function refreshdata() {

setTimeout(function(){

  var data;
var dataa;
 firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/").once('value').then(
function(x){
data = x.toJSON()
}
).then(function(){
  document.getElementById("name").innerHTML = data.isim;
  document.getElementById("surname").innerHTML = data.soyisim;
  document.getElementById("kullID").innerHTML = firebase.auth().currentUser.uid
  if(data.request == true){
   //document.getElementById("reqbtn").disabled = true;
   //document.getElementById("reqbtn").classList.add("color-gray")
   //document.getElementById("reqbtn").innerHTML = "Ödeme Güncelleme Talebi İşlemde"

  }
  

  
}).then(function(){
firebase.database().ref("/options/").once('value').then(function(x){
  dataa = x.toJSON()
  
}).then(function() {
  document.getElementById("oay").innerHTML = dataa.öay;
  document.getElementById("ode").innerHTML = dataa.öde;
  if(dataa.showWarn == true){
    document.getElementById("warnbtn").style.display = "visible"
  }else{
    document.getElementById("warnbtn").style.display = "none"
  }


  let farkay = (new Date().getMonth()+1) - data.ödeme;
    console.log(farkay);

    if(farkay < 0){

      farkay = 12 - (farkay * -1);

    }

    console.log(new Date().getMonth()+1)
    console.log(data.ödeme)
    console.log(farkay);
    console.log(dataa.öde)

    document.getElementById("paystatus").innerHTML = farkay*dataa.öde;

})

})

app.ptr.done();

setTimeout(function(argument) {
  blankpopup.close();

  app.dialog.close();
},500)

},200)

}



function showWarn() {
  app.dialog.preloader("Uyarı Yükleniyor Lütfen Bekleyiniz...")


firebase.database().ref("options/warning").once("value").then(function (snapshot) {
app.dialog.close()

  var news = snapshot.val()

var warnsheet = app.sheet.create({
  content: '<div class="sheet-modal">'+
              '<div class="toolbar">'+
                '<div class="toolbar-inner">'+
                  '<div class="left"></div>'+
                  '<div class="right">'+
                    '<a class="link sheet-close"><div class="ios-only">Kapat</div><i class="f7-icons md-only">close</i></a>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class="sheet-modal-inner">'+
                '<div class="block">'+
                  '<h1>Önemli Uyarı</h1>'+
                  '<p>'+news+'</p>'+
                '</div>'+
              '</div>'+
            '</div>',
});
warnsheet.open();
})





}


function toast(text,icon,duration,type) {

  if(icon != ""){
  app.toast.create({
  icon: '<i class="f7-icons">'+icon+'</i>',
  text: text,
  position: type,
  closeTimeout: duration,
}).open()
}else{
  app.toast.create({
  text: text,
  position: type,
  closeTimeout: duration,
}).open()
}


}






          var blankpopup = app.popup.create({
  content: '<div class="popup" style="background:linear-gradient(black,#4CAF50);"></div>',
});



app.dialog.preloader("Yükleniyor...")




      function loggedin(isim,soyisim) {
        blankpopup.open();
         app.dialog.close();
        app.dialog.preloader("Merhaba " + isim + " " + soyisim);
        
        setTimeout(function(argument) {
          
          app.router.navigate('/main/')




refreshdata();


if(app.version != localStorage.SPVer){


// firebase.database().ref("options/yenilikler").once("value").then(function (snapshot) {
//   var news = snapshot.val()

var news = "<p>Ödenme Ödenmeme Durumu Yerine Borç Miktarı Eklendi</p>"

// Create full-layout notification
var Bildirim = app.notification.create({
  icon: '<img src="https://ismailbgr.github.io/spotipay/icon.png" width="16px" height="16px">',
  title: 'SpotiPAY',
  titleRightText: 'Şimdi',
  subtitle: 'Güncelleme '+ app.version,
  text: news+"<p>Kapatmak İçin Yukarı Kaydırın</p>",
  closeTimeout: 20000,
});

/*
var updatesheet = app.sheet.create({
  content: '<div class="sheet-modal">'+
              '<div class="toolbar">'+
                '<div class="toolbar-inner">'+
                  '<div class="left"></div>'+
                  '<div class="right">'+
                    '<a class="link sheet-close"><div class="ios-only">Tamam</div><i class="f7-icons md-only">close</i></a>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class="sheet-modal-inner">'+
                '<div class="block">'+
                  '<h1>Güncelleme '+app.version+'</h1>'+
                  '<h1>Yenilikler</h1>'+
                  '<p>'+news+'</p>'+
                '</div>'+
              '</div>'+
            '</div>',
});
*/
Bildirim.open();
localStorage.SPVer = app.version;
// })

}


        },2000)
      }
var kullanici;
      firebase.auth().onAuthStateChanged(function(user) {
kullanici = user;
        if(user){
          var isimdata;
          var soyaddata;

   var isimRef = firebase.database().ref('users/'+user.uid+'/isim')
   isimRef.once('value').then(function(snapshot) {
   var isimdata = snapshot.val();
  var soyadRef = firebase.database().ref('users/'+user.uid+'/soyisim')
   soyadRef.once('value').then(function(snapshot) {
   var soyaddata = snapshot.val();
loggedin(isimdata,soyaddata);
   })
   })
  

   
        }else{
app.dialog.close();
        }

      })


      //TEST FOR APP


      var fullscreenerror = app.popup.create({
  content: '<div class="popup">'+
              '<div class="block text-align-center">'+
                '<h1>Hata</h1>'+
                '<p>Lütfen Uygulamayı Kurun</p>'+
                '<h2>Android</h2>'+
                '<p>Sağ Üstteki 3 Nokta Tuşuna Tıklayıp "Ana Ekrana Ekle" Tuşuna Basınız</p>'+
                '<h2>IOS</h2>'+
                '<p>Aşağıdaki Paylaş Tuşuna Basıp Alttaki Sıradan Ana Ekrana Ekle Tuşuna Basınız</p>'+
                '<h2>Eğer Uygulamayı Kurduysanız</h2>'+
                '<p>Reklam Engelleyicisini Kapatmayı Deneyin</p>'+
              '</div>'+
            '</div>'
});

      if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone == true) {
}else{



  if(location.hash != "#dev-mode"){
fullscreenerror.open();
}

var fullscreenerrorint = setInterval(function() {
  if(location.hash == "#dev-mode"){
fullscreenerror.close();
clearInterval(fullscreenerrorint)
}
},1000)
}

setInterval(function() {
  $$('.ptr-content').on('ptr:refresh', function (e) {
setTimeout(function(){
      //console.log("Yenile")
  refreshdata()
},2000)
})
},1000)


function changepass(argument) {
  

app.dialog.login("Şifrenizi Değiştirmek İçin E-Posta Ve Şifrenizi Yeniden Giriniz","Yeniden Giriş Yapın",function(uname,pass) {


var user = firebase.auth().currentUser;
var credential = firebase.auth.EmailAuthProvider.credential(
    uname,
    pass
);

// Prompt the user to re-provide their sign-in credentials

user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
  
  app.dialog.password("Yeni Şifrenizi Giriniz","Yeni Şifre",function(newpass) {
  
     app.dialog.password("Yeni Şifrenizi Tekrar Giriniz","Yeni Şifre Onaylama",function(confirmnewpass) {

     if(confirmnewpass == newpass){

      user.updatePassword(confirmnewpass).then(function() {
  app.dialog.alert("Şifre Değişimi Başarılı")
}).catch(function(error) {
  alert(error.errorMessage,"Bir Hata Oluştu")
});

     }else{
      app.dialog.alert("Şifreler Uyuşmuyor")
     }


     })

  })

}).catch(function(error) {
  app.dialog.alert("Yanlış E-Posta/Şifre");
  changepass();
});



})










}

//WIP

function gen_sign_code(){
 
let dictonary = ["a","c","e","f","1","3","4","6","8","9"];
let string = dictonary[Math.round(Math.random()*9)] + dictonary[Math.round(Math.random()*9)] + dictonary[Math.round(Math.random()*9)] + dictonary[Math.round(Math.random()*9)] + dictonary[Math.round(Math.random()*9)] + dictonary[Math.round(Math.random()*9)] + dictonary[Math.round(Math.random()*9)] + dictonary[Math.round(Math.random()*9)] + dictonary[Math.round(Math.random()*9)] + dictonary[Math.round(Math.random()*9)];

firebase.database().ref("/options/signcode").set(string)

return string;
}