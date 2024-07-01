import "./App.css";  // 導入樣式表

import React, { useState } from "react";  // 導入 React 和 useState 

// 預設使用者資料
const usersData = [
  { id: 1, name: "Tania", username: "floppydiskette" },
  { id: 2, name: "Craig", username: "siliconeidolon" },
  { id: 3, name: "Ben", username: "benisphere" },
];

// 使用者表格元件
const UserTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>  {/* 名稱欄位 */}
        <th>Username</th>  {/* 使用者名稱欄位 */}
        <th>Actions</th>  {/* 動作欄位 */}
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (  // 如果使用者陣列有資料
        props.users.map((user) => (  // 對每個使用者顯示一列
          <tr key={user.id}>
            <td>{user.name}</td>  {/* 顯示使用者名稱 */}
            <td>{user.username}</td>  {/* 顯示使用者名稱 */}
            <td>
              <button>Edit</button>  {/* 編輯按鈕 */}
              <button>Delete</button>  {/* 刪除按鈕 */}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>  {/* 沒有使用者的提示 */}
        </tr>
      )}
    </tbody>
  </table>
);

// 新增使用者表單元件
const AddUserForm = (props) => {
  const initialFormState = { id: null, name: "", username: "" };  // 初始表單狀態
  const [user, setUser] = useState(initialFormState);  // 使用者狀態

  // 處理輸入變更
  const handleInputChange = (event) => {
    const { name, value } = event.target;  // 從事件中取得名稱和值
    setUser({ ...user, [name]: value });  // 更新使用者狀態
  };

  // 提交表單時
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();  // 防止預設動作
        if (!user.name || !user.username) return;  // 如果名稱或使用者名稱為空則返回
        props.addUser(user);  // 新增使用者
        setUser(initialFormState);  // 重設表單狀態
      }}
    >
      <label>Name</label>  {/* 名稱標籤 */}
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
      />
      <label>Username</label>  {/* 使用者名稱標籤 */}
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleInputChange}
      />
      <button>Add new user</button>  {/* 新增使用者按鈕 */}
    </form>
  );
};

// 主應用程式元件
function App() {
  const [users, setUsers] = useState(usersData);  // 使用者狀態與設置函式

  // 新增使用者函式
  const addUser = (user) => {
    user.id = users.length + 1;  // 設定使用者ID
    setUsers([...users, user]);  // 更新使用者陣列
  };

  // 主要應用程式的返回
  return (
    <div className="App">
      <h1>React CRUD!</h1>  {/* 主標題 */}
      <div>
        <div>
          <h2>Add user</h2>  {/* 新增使用者子標題 */}
          <AddUserForm addUser={addUser} />  {/* 呼叫新增使用者表單 */}
        </div>
        <div>
          <h2>View users</h2>  {/* 檢視使用者子標題 */}
          <UserTable users={users} />  {/* 呼叫使用者表格 */}
        </div>
      </div>
    </div>
  );
}

export default App;  // 匯出主應用程式元件
