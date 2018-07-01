var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'SpotiPAY',
  // App id
  id: 'com.ismailbgr.spotipay',
  // Versiyon ?
  version:"Alpha 0.0.3",

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


  function loginscr() {
    app.router.navigate("/login/")
  }

  function login(x,y) {
    app.dialog.preloader("Lütfen Bekleyin");
    firebase.auth().signInWithEmailAndPassword(x, y).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  app.dialog.alert(error.message);
  }).then(function() {
    app.dialog.close();
  })

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
  })
}

function removepay(argument) {

  app.dialog.preloader("İstek İşleniyor...");
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/request').set(false).catch(function(e) {
   app.dialog.close();
   app.dialog.alert("Bir Hata Oluştu");
  }).then(function (e) {
   
   app.dialog.alert("İstek Silindi");
  })

}

      function signin(name,surname,email,pass) {

        app.dialog.preloader("Lütfen Bekleyin");

        firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  app.dialog.alert(error.message)
  app.dialog.close();

          }).then(function() {
            firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/').set({
  isim: name,
  soyisim: surname
})
            app.dialog.close();
          })
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
  if(data.ödeme != new Date().getMonth()){
    document.getElementById("paystatus").innerHTML = "Ödenmedi";
    document.getElementById("paystatus").classList.add("color-red");
  }else{
    document.getElementById("paystatus").innerHTML = "Ödendi"
  }
}).then(function(){
firebase.database().ref("/options/").once('value').then(function(x){
  dataa = x.toJSON()
  
}).then(function() {
  document.getElementById("oay").innerHTML = dataa.öay;
  document.getElementById("ode").innerHTML = dataa.öde;
})

})

app.ptr.done();
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









app.dialog.preloader("Yükleniyor...")




      function loggedin(isim,soyisim) {
         app.dialog.close();
        app.dialog.preloader("Merhaba " + isim + " " + soyisim);
        
        setTimeout(function(argument) {
          app.dialog.close();
          app.router.navigate('/main/')




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
  if(data.ödeme != new Date().getMonth()){
    document.getElementById("paystatus").innerHTML = "Ödenmedi";
    document.getElementById("paystatus").classList.add("color-red");
  }else{
    document.getElementById("paystatus").innerHTML = "Ödendi"
  }
}).then(function(){
firebase.database().ref("/options/").once('value').then(function(x){
  dataa = x.toJSON()
  
}).then(function() {
  document.getElementById("oay").innerHTML = dataa.öay;
  document.getElementById("ode").innerHTML = dataa.öde;
})

})
 

if(app.version != localStorage.SPVer){


firebase.database().ref("options/yenilikler").once("value").then(function (snapshot) {
  var news = snapshot.val()

// Create full-layout notification
var Bildirim = app.notification.create({
  icon: '<img src="https://ismailbgr.github.io/spotipay/icon.png" width="16px" height="16px">',
  title: 'SpotiPAY',
  titleRightText: 'Şimdi',
  subtitle: 'Güncelleme '+ app.version,
  text: news+"<p>Kapatmak İçin Yukarı Kaydırın</p>",
  closeTimeout: 10000,
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
})

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
      console.log("Yenile")
  refreshdata()
},2000)
})
},1000)
