export default [
    {
      path: "/partner",
      name: "partner-cab",
      component: () => import("@/views/partner/PartnerCab.vue"),
      meta: { auth: true, role: "Partner" },
      children: [  ],
    },
    {
      path: "/partner/clients",
      name: "clients-cab",
      component: () => import("@/views/admin/ClientsTab.vue"),
      meta: { auth: true, role: "Partner" },
      children: [  ],
    },
    {
      path: "/addClient",
      name: "client-add",
      component: () => import("@/views/partner/FormAddClient.vue"),
      meta: { auth: true, role: "Partner"}
    }        
]
  