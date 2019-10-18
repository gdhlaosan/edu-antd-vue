// 额外的路由页面
export default [{
  path: 'teacherManageEdit',
  name: 'teacherManageEdit',
  component: () => import('@/views/contentPage/TeacherManageEdit.vue'),
  meta: {
    breadcrumb: ['教师管理', '教师管理', '新增教师'],
    preKey: 3047,
    key: 14
  }
}]
