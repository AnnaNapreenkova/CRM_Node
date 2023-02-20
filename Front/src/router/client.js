export default [
    {
      path: "/client",
      name: "client-cab",
      component: () => import("@/views/client/ClientCab.vue"),
      meta: { auth: true, role: ("AdminClient" || "PartnerClient") },
      children: [ ],
    },    
    {
      path: "/services",
      name: "services-view",
      component: () => import("@/views/ServisesView.vue")
    },
    {
      path: "/service/:service",
      name: "service-selected",
      component: () => import("@/views/services/SelectedServiceView.vue")
    },    
    {
      path: "/service/callocation/:service",
      name: "callocation-service",
      component: () => import("@/views/services/CallocationServiceView.vue")
    },    
    {
      path: "/tickets",
      name: "tickets-page",
      component: () => import("@/views/TicketsView.vue")
    },  

]
  