// Requirements
const mongoose = require("mongoose");
const express = require("express");
const AdminBro = require("admin-bro");
const AdminBroExpressjs = require("@admin-bro/express");
const bcrypt = require("bcryptjs");

//models
const Brands = require("./models/brand.model");
const Donors = require("./models/donor.model");
const Assets = require("./models/asset.model");
const Users = require("./models/user.model");
const Suppliers = require("./models/supplier.model");
const Categories = require("./models/category.model");
const Staff = require("./models/staff.model");
const Students = require("./models/student.model");
// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require("@admin-bro/mongoose"));

// express server definition
const app = express();

// RBAC functions
const canEditCars = ({ currentAdmin, record }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "admin" ||
      currentAdmin._id === record.param("ownerId"))
  );
};
const canModifyUsers = ({ currentAdmin }) =>
  currentAdmin && currentAdmin.role === "admin";

// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
  branding: {
    companyName: "Unitech SLSD",
  },
  //added by SLY
  dashboard: {
    component: AdminBro.bundle("./components/my-dashboard"),
  },
  resources: [
    //added by sly
    { resource: Brands },
    { resource: Suppliers },
    { resource: Categories },
    { resource: Students },
    { resource: Staff },
    //added by sly
    {
      //resource: Assets
      resource: Assets,
      options: {
        properties: {
            //lat: { isVisible: { list: false, show: false, edit: true, filter: true } },
            //lng: { isVisible: { list: false, show: false, edit: true, filter: true } },
          map: {
            //   components: {
            //     show: AdminBro.bundle('./components/my-dashboard'),
            //   },
               isVisible: {
                 show: true, view: false, edit: false, filter: false,
               },
            render:{
                show:(property,record,helpers)=>{
                    const html=
                    `
                    <h1>Hello</h1>
                    `
                    return html
                }
            }

          },
        },
      },
    }, //end
    {
      resource: Donors,
      options: {
        parent: {
          name: "Admin Content",
        },
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },
        actions: {
          edit: { isAccessible: canEditCars },
          delete: { isAccessible: canEditCars },
          new: {
            before: async (request, { currentAdmin }) => {
              request.payload = {
                ...request.payload,
                ownerId: currentAdmin._id,
              };
              return request;
            },
          },
        },
      },
    },
    {
      resource: Users,
      options: {
        parent: {
          name: "Admin Content",
          icon: "fas fa-cogs",
        },
        properties: {
          encryptedPassword: { isVisible: false },
          password: {
            type: "string",
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(
                    request.payload.password,
                    10
                  ),
                  password: undefined,
                };
              }
              return request;
            },
          },
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
        },
      },
    },
  ],
  rootPath: "/admin",
});

const ADMIN = {
  email: "admin@nictc.com",
  password: "admin",
};

// Build and use a router which will handle all AdminBro routes
const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN;
    } else {
      const user = await Users.findOne({ email });
      if (user) {
        const matched = await bcrypt.compare(password, user.encryptedPassword);
        if (matched) {
          return user;
        }
      }
      return false;
    }
    return false;
  },
  cookiePassword: "some-secret-password-used-to-secure-cookie",
});

app.use(adminBro.options.rootPath, router);

// Running the server
const run = async () => {
  await mongoose.connect("mongodb://202.1.39.189:27017/RBAC", {
    //await mongoose.connect("mongodb+srv://sly:noGoZone@nictc.ok4ic.mongodb.net/nictc?retryWrites=true&w=majority", {
    useNewUrlParser: true,
  });
  await app.listen(8080, () =>
    console.log(`Example app listening on port 8080!`)
  );
};

run();
