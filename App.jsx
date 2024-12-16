import React, { useState, useEffect } from "react"; // 導入 React 以及 useState 和 useEffect
import "./App.css"; // 導入樣式表

// 使用者表格元件
const UserTable = (props) => (
    <table className="tableStyle"> {/* 設定表格樣式 */}
        <thead>
            <tr>
                <th>Name</th> {/* 名稱欄位 */}
                <th>Username</th> {/* 使用者名稱欄位 */}
                <th>Actions</th> {/* 動作欄位 */}
            </tr>
        </thead>
        <tbody>
            {props.users.length > 0 ? ( // 如果有使用者資料
                props.users.map((user) => ( // 映射每個使用者資料
                    <tr key={user.id}> {/* 使用者資料行，使用者ID作為鍵 */}
                        <td>{user.name}</td> {/* 顯示使用者名稱 */}
                        <td>{user.username}</td> {/* 顯示使用者使用者名稱 */}
                        <td>
                            <button
                                onClick={() => {
                                    props.editRow(user); // 點擊編輯按鈕時調用 editRow 函數
                                }}
                            >
                                Edit
                            </button>
                            <button onClick={() => props.deleteUser(user.id)}> 
                                Delete {/* 點擊刪除按鈕時調用 deleteUser 函數 */}
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3}>No users</td> {/* 如果沒有使用者資料顯示此訊息 */}
                </tr>
            )}
        </tbody>
    </table>
);

// 新增使用者表單元件
const AddUserForm = (props) => {
    const initialFormState = { id: null, name: "", username: "" }; // 初始表單狀態
    const [user, setUser] = useState(initialFormState); // 使用者狀態

    // 處理輸入變更
    const handleInputChange = (event) => {
        const { name, value } = event.target; // 從事件中取得名稱和值
        setUser({ ...user, [name]: value }); // 更新使用者狀態
    };

    // 提交表單
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault(); // 防止預設動作
                if (!user.name || !user.username) return; // 如果名稱或使用者名稱為空則返回
                props.addUser(user); // 新增使用者
                setUser(initialFormState); // 重設表單狀態
            }}
        >
            <label>Name</label> {/* 名稱標籤 */}
            <input
                autocomplete="Off"
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange} // 處理輸入變更
            />
            <label>Username</label> {/* 使用者名稱標籤 */}
            <input
                autocomplete="Off"
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange} // 處理輸入變更
            />
            <button>Add new user</button> {/* 新增使用者按鈕 */}
        </form>
    );
};

// 編輯使用者表單元件
const EditUserForm = (props) => {
    const [user, setUser] = useState(props.currentUser); // 編輯中的使用者狀態

    // 處理輸入變更
    const handleInputChange = (event) => {
        const { name, value } = event.target; // 從事件中取得名稱和值
        setUser({ ...user, [name]: value }); // 更新使用者狀態
    };

    useEffect(() => {
        setUser(props.currentUser); // 當 currentUser 改變時更新使用者狀態
    }, [props]);

    // 提交表單
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault(); // 防止預設動作
                props.updateUser(user.id, user); // 更新使用者
            }}
        >
            <label>Name</label> {/* 名稱標籤 */}
            <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange} // 處理輸入變更
            />
            <label>Username</label> {/* 使用者名稱標籤 */}
            <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange} // 處理輸入變更
            />
            <button>Update user</button> {/* 更新使用者按鈕 */}
            <button
                onClick={() => props.setEditing(false)} // 點擊取消按鈕時取消編輯狀態
                className="button muted-button"
            >
                Cancel
            </button>
        </form>
    );
};

// 主應用程式元件
function App() {
    const usersData = [
        { id: 1, name: "Tania", username: "floppydiskette" },
        { id: 2, name: "Craig", username: "siliconeidolon" },
        { id: 3, name: "Ben", username: "benisphere" },
    ]; // 預設使用者資料

    const [users, setUsers] = useState(usersData); // 使用者狀態

    // 新增使用者函式
    const addUser = (user) => {
        user.id = users.length + 1; // 設定使用者ID
        setUsers([...users, user]); // 更新使用者陣列
    };

    // 刪除使用者函式
    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id)); // 過濾掉刪除的使用者
    };

    const [editing, setEditing] = useState(false); // 編輯狀態
    const initialFormState = { id: null, name: "", username: "" }; // 初始表單狀態
    const [currentUser, setCurrentUser] = useState(initialFormState); // 當前編輯中的使用者狀態

    // 編輯使用者函式
    const editRow = (user) => {
        setEditing(true); // 設定編輯狀態為 true
        setCurrentUser({
            id: user.id,
            name: user.name,
            username: user.username,
        }); // 設定當前編輯中的使用者
    };

    // 更新使用者函式
    const updateUser = (id, updatedUser) => {
        setEditing(false); // 設定編輯狀態為 false
        setUsers(users.map((user) => (user.id === id ? updatedUser : user))); // 更新使用者資料
    };

    return (
        <div className="App">
            <h1>React CRUD!</h1> {/* 主標題 */}
            <div>
                <div>
                    {editing ? (
                        <div>
                            <h2>Edit user</h2> {/* 編輯使用者子標題 */}
                            <EditUserForm
                                setEditing={setEditing} // 傳遞 setEditing 函式
                                currentUser={currentUser} // 傳遞當前編輯中的使用者
                                updateUser={updateUser} // 傳遞更新使用者函式
                            />
                        </div>
                    ) : (
                        <div>
                            <h2>Add user</h2> {/* 新增使用者子標題 */}
                            <AddUserForm addUser={addUser} /> {/* 傳遞新增使用者函式 */}
                        </div>
                    )}
                </div>
                <div>
                    <h2>View users</h2> {/* 檢視使用者子標題 */}
                    <UserTable
                        users={users} // 傳遞使用者資料
                        deleteUser={deleteUser} // 傳遞刪除使用者函式
                        editRow={editRow} // 傳遞編輯使用者函式
                    />
                </div>
            </div>
        </div>
    );
}

export default App; // 匯出主應用程式元件
