<template>
  <div>
    <!--数据表格-->
    <div class="table">
      <el-button @click="addRole">添加角色</el-button>
      <el-table
        :data="tableData"
        :stripe="true"
        style="width: 100%">
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="roleName" label="角色" ></el-table-column>
        <el-table-column prop="remark" label="描述" ></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleEdit(scope.$index, scope.row)">修改角色</el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>

    <!--修改角色权限-->
    <!--修改角色-->
    <div>
      <el-drawer
        :visible.sync="editRoleDrawer"
        direction="ltr"
        :with-header="false">
        <div class="editUser-header"><span>修改角色</span></div>
        <div class="editUser-body">
          <el-form :model="editRoleForm" status-icon  ref="editRoleForm" label-width="150px">
            <el-form-item label="角色名称:" prop="roleName">
              <el-input style="width: 320px" v-model="editRoleForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="描述:" prop="remark">
              <el-input style="width: 320px" v-model="editRoleForm.remark" ></el-input>
            </el-form-item>
            <el-form-item label="上级菜单:" prop="sex">
              <el-tree
                :data="menulist"
                show-checkbox
                node-key="id"
                ref="vuetree"
                :default-checked-keys="defaultCheckedKeys"
                :props="defaultProps">
              </el-tree>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="editRoleSubmit('editRoleForm')">提交</el-button>
              <el-button @click='editRoleChanel'>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
  import * as roleApi from '@/api/system/sysrole';
  import * as sysmenuApi from '@/api/system/sysmenu';
  import * as rolepermissionApi from '@/api/system/sysrolepermission';
  export default {
    name: 'UserManage',
    data() {
      return {
        tableData: [],      //表格数据
        menulist: [],       //存放所有权限列表
        pagination: {       //分页对象相关数据
          pageNumber: 1,
          pageSize: 10,
          total: 0,
          searchKey: undefined
        },
        drawer: false,
        direction:'ttb',
        defaultProps: {
          children: 'children',
          label: 'permissionName'
        },
        checkedKeys: [],   //选中的key集合
        defaultCheckedKeys: [], //默认选中的key集合
        editRoleDrawer: false,
        editRoleForm: {}
      };
    },
    methods: {
      //编辑取消事件
      editRoleChanel(){
        this.editRoleDrawer = false;
      },
      //菜单选择事件(在表单提交中统一处理)
      getCheckedKeys(node,checkedNodes){
        //全选中和半选中节点
        this.checkedKeys = [...checkedNodes.checkedKeys,...checkedNodes.halfCheckedKeys];
      },

      //分页
      page(){
        roleApi
          .page(this.pagination)
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
          })
      },

      //每页条数切换
      handleSizeChange(val) {
        this.pagination.pageSize = val
        console.log(`每页 ${val} 条`);
      },

      //当前页切换
      handleCurrentChange(val) {
        this.pagination.pageNumber = val;
        console.log(`当前页: ${val}`);
      },

      //查询权限列表(菜单、按钮、api)
      menus(){
        sysmenuApi
          .menuAndButton()
          .then(res => {
            this.menulist = res.data;
          })
      },

      //修改用户按钮
      handleEdit(index,row){
        console.log(row)
        this.editRoleDrawer = true;
        this.editRoleForm = JSON.parse(JSON.stringify(row));
        //根据角色ID查询角色权限集合
        rolepermissionApi
          .findPermissionIdsByRoleIdExcludeExistChild({roleId:row.roleId})
          .then(res => {
            this.defaultCheckedKeys = res.data;
          })
      },

      //编辑提交事件
      editRoleSubmit(formName) {
        //全选中和半选中节点
        let checkedKeys = [...this.$refs.vuetree.getCheckedKeys(),...this.$refs.vuetree.getHalfCheckedKeys()]
        this.$refs[formName].validate((valid) => {
          this.editRoleForm.permissionIds = checkedKeys;
          roleApi
            .update(this.editRoleForm)
            .then(res => {
              if(res.flag){
                this.$message.success('操作成功');
              }else{
                this.$message.error('操作失败');
              }
              this.editRoleDrawer = false;
            })
        });
      },
    },

    //
    mounted() {
      //角色表格
      this.page();
      //权限列表（菜单和按钮）
      this.menus();
    }
  }
</script>

<style scoped>
  .table {
    margin-top: 10px;
  }
  .table {
    margin-top: 10px;
  }

  .pagination {
    margin-top: 10px;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-col:first-child {
    margin:10px;
  }

  .editUser-header {
    height: 55px;
    text-align: center;
    font: normal 20px/55px '黑体';
    border-bottom: 1px solid lightgray;
  }
  .editUser-body {
    margin-top: 20px;
  }
  .table {
    margin-top: 10px;
  }
</style>
