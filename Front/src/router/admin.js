export default [
    {
      path: "/admin",
      name: "admin-cab",
      component: () => import("@/views/admin/AdminCab.vue"),
      meta: { auth: true, role: "Admin" },
      children: [ ],
    },
    {
      path: "/profile",
      name: "profileView",
      component: () => import("@/views/ProfileView.vue")
    },

    {
      path: "/agreements",
      name: "agreements-view",
      component: () => import("@/views/admin/AdminAgreements.vue")
    },

    {
      path: "/agreements/:serviceId",
      name: "agreements-service-view",
      component: () => import("@/views/admin/AdminAgreements.vue")
    },

    {
      path: "/clients",
      name: "clients-view",
      component: () => import("@/views/admin/ClientsTab.vue")
    },
    {
      path: "/partners",
      name: "partners-view",
      component: () => import("@/views/admin/PartnersTab.vue")
    },
    {
      path: "/clientinfo",
      name: "clientinfo-view",
      component: () => import("@/views/ClientInfoView.vue")
    },
    {
      path: "/detail/:id",
      name: "client-detail",
      component: () => import("@/views/admin/ClientDetail"),
      meta: { auth: true, role: "admin" },
    },
]
  