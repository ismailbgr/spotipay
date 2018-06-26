var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'SpotiPAY',
  // App id
  id: 'com.ismailbgr.spotipay',
  // Versiyon ?
  version:"Alpha 0.0.2",

  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [

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