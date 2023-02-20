export default [
    {
      path: "/manager",
      name: "manager-cab",
      component: () => import("@/views/manager/ManagerCab.vue"),
      meta: { auth: true, role: "Manager" },
      children: [ ],
    },        
]
  