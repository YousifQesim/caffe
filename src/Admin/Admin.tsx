import React from "react";
import AddCategoryItems from "./Components/AddCategoryItems";
import EditCategory from "./Components/EditCategory";
// import EditItems from "./Components/EditItems";
import ViewOrders from "./Components/ViewOrders";
import AdminNavbar from "./Components/AdminNavbar";



const Admin: React.FC = () => {
 

  return (
    <div className="min-h-screen my-4">
      

      <h1 className="font-roboto font-bold text-center text-white text-2xl mt-4">
        Admin Page
      </h1>
<AdminNavbar />
     
      <div>
        <AddCategoryItems />
      </div>

      <div>
        <EditCategory />
      </div>

      <div>
        {/* <EditItems /> */}
      </div>

      <div>
        <ViewOrders />
      </div>
      
    </div>
  );
};

export default Admin;
