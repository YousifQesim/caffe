import React from "react";
import AdminNavbar from "./Components/AdminNavbar";
import AddCategoryItems from "./Components/AddCategoryItems";
import EditCategory from "./Components/EditCategory";
import EditItems from "./Components/EditItems";
import ViewOrders from "./Components/ViewOrders";

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Admin Page Header */}
      <h1 className="font-roboto font-bold text-center text-2xl mt-4">
        Admin Page
      </h1>
      
      {/* Navbar */}
      <AdminNavbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Add Category/Items Section */}
        <div className="mb-8">
          <AddCategoryItems />
        </div>

        {/* Edit Category Section */}
        <div className="mb-8">
          <EditCategory />
        </div>

        {/* Edit Items Section */}
        <div className="mb-8">
          <EditItems />
        </div>

        {/* View Orders Section */}
        <div>
          <ViewOrders />
        </div>
      </div>
    </div>
  );
};

export default Admin;
