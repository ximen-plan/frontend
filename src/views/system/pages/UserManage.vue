<template>
  <div>
    <!--数据表格-->
    <div class="table">
      <el-button @click="addUser">添加用户</el-button>
      <el-table
        :data="tableData"
        :stripe="true"
        style="width: 100%">
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="sex" :formatter="formatSex" label="性别" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="status" :formatter="(row,cloumn,cellValue) => cellValue == 0 ? '锁定' : '有效'" label="状态"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="pagination.searchKey"
              size="mini"
              @keyup.enter.native='search'
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">修改用户</el-button>
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
    <!--修改用户抽屉-->
    <div>
      <el-drawer
        title="我是标题"
        :visible.sync="editDrawer"
        :with-header="false">
        <div class="editUser-header"><span>用户修改</span></div>
        <div class="editUser-body">
          <el-form :model="editForm" status-icon  ref="editForm" label-width="150px">
            <el-form-item label="用户名:" prop="pass">
              <el-input style="width: 320px" v-model="editForm.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="checkPass">
              <el-input style="width: 320px" v-model="editForm.email" ></el-input>
            </el-form-item>
            <el-form-item label="手机:" prop="age">
              <el-input style="width: 320px" v-model.number="editForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="角色:" prop="roles">
              <el-select
                v-model="editForm.roles"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择角色"
                style="width: 320px">
                <el-option
                  v-for="item in roleList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门:" prop="dept">
              <el-input style="width: 320px" v-model.number="editForm.dept"></el-input>
            </el-form-item>
            <el-form-item label="状态:" prop="status">
              <el-radio v-model="editForm.status" :label="0">锁定</el-radio>
              <el-radio v-model="editForm.status" :label="1">有效</el-radio>
            </el-form-item>
            <el-form-item label="性别:" prop="sex">
              <el-radio v-model="editForm.sex" :label="0">男</el-radio>
              <el-radio v-model="editForm.sex" :label="1">女</el-radio>
              <el-radio v-model="editForm.sex" :label="2">保密</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="editSubmit('editForm')">提交</el-button>
              <el-button @click='editChanel'>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
    </div>
    <!--添加用户抽屉-->
    <div>
      <el-drawer
        :visible.sync="addDrawer"
        direction="ltr"
        :with-header="false">
        <div class="editUser-header"><span>添加用户</span></div>
        <div class="editUser-body">
          <el-form :model="addForm" status-icon  ref="addForm" label-width="150px">
            <el-form-item label="用户名:" prop="pass">
              <el-input style="width: 320px" v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="checkPass">
              <el-input style="width: 320px" v-model="addForm.email" ></el-input>
            </el-form-item>
            <el-form-item label="手机:" prop="age">
              <el-input style="width: 320px" v-model.number="addForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="角色:" prop="roles">
              <el-select
                v-model="addForm.roles"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择角色"
                style="width: 320px">
                <el-option
                  v-for="item in roleList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门:" prop="dept">
              <el-input style="width: 320px" v-model.number="addForm.dept"></el-input>
            </el-form-item>
            <el-form-item label="状态:" prop="status">
              <el-radio v-model="addForm.status" :label="0">锁定</el-radio>
              <el-radio v-model="addForm.status" :label="1">有效</el-radio>
            </el-form-item>
            <el-form-item label="性别:" prop="sex">
              <el-radio v-model="addForm.sex" :label="0">男</el-radio>
              <el-radio v-model="addForm.sex" :label="1">女</el-radio>
              <el-radio v-model="addForm.sex" :label="2">保密</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addSubmit('addForm')">提交</el-button>
              <el-button @click='addChanel'>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
    </div>
    <!--用户信息弹出层-->
    <div class="userInfo">
      <el-dialog
        title="用户信息"
        :visible.sync="userInfoVisible"
        width="30%"
        :before-close="handleClose">
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import * as userApi from '@/api/system/sysuser';
  import * as roleApi from '@/api/system/sysrole';
  import * as userRoleApi from '@/api/system/sysuserrole';
  import moment from 'moment';
  export default {
    name: 'UserManage',
    data(){
      return {
        userInfoVisible: false, //用户信息弹出层
        editDrawer: false,//修改用户抽屉状态
        addDrawer: false,//添加用户抽屉状态
        tableData: [], //表格数据
        pagination: {       //分页对象相关数据
          pageNumber: 1,
          pageSize: 10,
          total: 0,
          searchKey: undefined
        },
        editForm: {}, //修改表单
        addForm: {}, //添加表单
        roleList: [], //存放所有角色集合
        value: []
      }
    },
    methods:{
      //addUser
      addUser(){
        this.addDrawer = true;
        this.findAllRoles();
      },

      //添加取消按钮
      addChanel(){
        this.addDrawer = false;
        this.addForm = {};
      },

      //添加提交事件
      addSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          this.addForm.roleId = this.addForm.roles.join(',');
          userApi
            .add(this.addForm)
            .then(res => {
              if(res.flag){
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.page();
              }else{
                this.$message.error('操作失败');
              }
              this.addDrawer = false;
            })
        });
      },

      //编辑 抽屉打开
      handleEdit(index,row){
        //1.根据用户ID查询用户
        this.findUserById(row.userId);
        //2.查询所有的角色
        this.findAllRoles();
        this.editDrawer = true;
      },

      //根据ID查询用户
      findUserById(userId){
        userApi
          .findUserById({userId})
          .then(res => {
            this.editForm = res.data;
            if(res.data && res.data.roleId){
              this.editForm.roles = res.data.roleId.split(',');
              this.editForm.roles = this.editForm.roles.map(item => parseInt(item));
            }
          })
      },

      //查询所有的角色
      findAllRoles(){
        roleApi.
          findAllRoles()
          .then(res => {
            this.roleList = res.data;
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

      //分页查询
      page(){
        userApi
          .page(this.pagination)
          .then(res => {
            if(res.flag){
              this.tableData = res.data.rows;
              this.pagination.total = res.data.total;
            }
          })
      },

      //点击查询事假
      search(){
        this.pagination.pageNumber = 1;
        this.pagination.pageSize = 10;
        this.page()
      },

      //编辑提交事件
      editSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          this.editForm.roleId = this.editForm.roles.join(',');
          userApi
            .update(this.editForm)
            .then(res => {
              if(res.flag){
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.page();
              }else{
                this.$message.error('操作失败');
              }
              this.editDrawer = false;
            })
        });
      },

      //重置
      editChanel(){
        this.editDrawer = false;
        this.editForm = {};
      },

      formatSex(row,cloumn,cellValue){
        return cellValue == 0 ? '男' : (cellValue == 1 ? '女' : '保密')
      }

    },
    mounted() {
      //分页查询
      this.page();
    }
  }
</script>

<style scoped>
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

  .userInfo .el-dialog__body {
    height: 300px;
    /*border: 1px solid red;*/
  }

  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
