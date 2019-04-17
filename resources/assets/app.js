import Vue 	  	   from 'vue/dist/vue.js'
import Router 	   from 'vue-router';
import index 	     from './vue/index.vue';
import signin       from './vue/signin.vue';
import register       from './vue/register.vue';
import profile       from './vue/profile.vue';
import sidebar       from './vue/sidebar.vue';
import postjob       from './vue/postjob.vue';
import indexEmployer       from './vue/indexEmployer.vue';
import editEmployer       from './vue/editEmployer.vue';
import seekerpost       from './vue/seekerpost.vue';
import seekerViewPost       from './vue/seekerViewPost.vue';
import employerHome       from './vue/employerHome.vue';
import viewSeeker       from './vue/viewSeeker.vue';
import viewCompany       from './vue/viewCompany.vue';
import infoRequests       from './vue/infoRequests.vue';
import jobOffers       from './vue/jobOffers.vue';
import completedJob       from './vue/completedJob.vue';
import myApplications       from './vue/myApplications.vue';
import completedJobEmployer       from './vue/completedJobEmployer.vue';
import viewEmployees       from './vue/viewEmployees.vue';
import workHistory       from './vue/workHistory.vue';
import viewSeekerPosts       from './vue/viewSeekerPosts.vue';
import topbar       from './vue/topbar.vue';
import viewCompletedJobs       from './vue/viewCompletedJobs.vue';
import viewCompanyPosts       from './vue/viewCompanyPosts.vue';
import chat       from './vue/chat.vue';
import conversation       from './vue/conversation.vue';
// import jobdetails       from './vue/jobdetails.vue';
import axios from 'axios';
Vue.use(Router);
Vue.prototype.$uri = 'http://hire-express.pbgeabeif.com/api/index.php';
// Vue.prototype.$uri = "http://localhost/HireExpress1/api/index.php";
// Vue.prototype.$uriImage = "http://localhost/HireExpress1/profileimage/";
Vue.prototype.$uriImage = "http://hire-express.pbgeabeif.com/profileimage/";
Vue.component('sidebar', sidebar);
Vue.component('topbar', topbar);
// Vue.component('topnav', topnav);
// Vue.component('breadcrumbs', breadcrumbs);
// Vue.component('foot', foot);
// Vue.component('rightbar', rightbar);

const router = new Router({
  routes:[
  	{
  	  path: '/index',
  	  component: index   
  	},
    {
      path: '/',
      component: signin   
    },
    {
      path: '/register',
      component: register   
    },
    {
      path: '/profile',
      component: profile   
    }
    ,
    {
      path: '/postJob',
      component: postjob   
    },
    {
      path: '/indexEmployer',
      component: indexEmployer   
    },
    {
      path: '/editEmployer',
      component: editEmployer   
    },
    {
      path: '/seekerpost',
      component: seekerpost   
    },
    {
      path: '/seekerViewPost',
      component: seekerViewPost   
    },
    {
      path: '/employerHome',
      component: employerHome   
    },
    {
      path: '/viewSeeker/:userid',
      component: viewSeeker   
    },
    {
      path: '/viewCompany/:userid',
      component: viewCompany   
    },
    {
      path: '/infoRequests',
      component: infoRequests   
    },
    {
      path: '/jobOffers',
      component: jobOffers   
    },
    {
      path: '/completedJob/:userid',
      component: completedJob   
    },
    {
      path: '/completedJobEmployer',
      component: completedJobEmployer
    },
    {
      path: '/viewEmployees/:id',
      component: viewEmployees
    },
    {
      path: '/workHistory/:id',
      component: workHistory
    },
    {
      path: '/viewSeekerPosts/:userid',
      component: viewSeekerPosts
    },
    {
      path: '/viewCompletedJobs/:userid',
      component: viewCompletedJobs
    },
    {
      path: '/viewCompanyPosts/:userid',
      component: viewCompanyPosts
    },
    {
      path: '/chat/:userid',
      component: chat
    },
    {
      path: '/conversation/:userid/:senderid',
      component: conversation
    },
    {
      path: '/myApplications',
      component: myApplications
    },
    // {
    //   path: '/jobDetails/:id',
    //   component: jobdetails   
    // }
  ]
});

const app = new Vue ({
  el: '#express',
  router: router,

  mounted(){

    if(window.sessionStorage.getItem('userid') && window.sessionStorage.getItem('userid') != "undefined"){
        $('#user-nav').show();
        $('#profilename').html(window.sessionStorage.getItem('name'));
        // this.$router.push('/index');
    }
    else{
        $('#user-nav').hide();
        this.$router.push('/');
    }

  }

});